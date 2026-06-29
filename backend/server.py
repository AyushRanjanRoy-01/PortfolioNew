from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'ayushranjanroy@gmail.com')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ========== MODELS ==========

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    content: str
    excerpt: str
    category: str
    tags: List[str] = []
    read_time: int = 5
    published: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    views: int = 0

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    category: str
    tags: List[str] = []
    read_time: int = 5
    published: bool = True

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    full_description: str = ""
    category: str
    tech_stack: List[str] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ProjectCreate(BaseModel):
    title: str
    description: str
    full_description: str = ""
    category: str
    tech_stack: List[str] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False

class TechNews(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    headline: str
    source: str
    source_url: str
    summary: str
    category: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class TechNewsCreate(BaseModel):
    headline: str
    source: str
    source_url: str
    summary: str
    category: str

class Comment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    post_id: str
    name: str
    email: str
    content: str
    parent_id: Optional[str] = None
    approved: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class CommentCreate(BaseModel):
    post_id: str
    name: str
    email: EmailStr
    content: str
    parent_id: Optional[str] = None

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    read: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class PageView(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page_type: str
    page_id: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# ========== BLOG ROUTES ==========

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(search: Optional[str] = None, category: Optional[str] = None, published_only: bool = True):
    query = {}
    if published_only:
        query["published"] = True
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
            {"tags": {"$regex": search, "$options": "i"}}
        ]
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    await db.blog_posts.update_one({"slug": slug}, {"$inc": {"views": 1}})
    return post

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate):
    post_obj = BlogPost(**post.model_dump())
    await db.blog_posts.insert_one(post_obj.model_dump())
    return post_obj

@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, post: BlogPostCreate):
    existing = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    update_data = post.model_dump()
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    updated = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return updated

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted"}

# ========== PROJECTS ROUTES ==========

@api_router.get("/projects", response_model=List[Project])
async def get_projects(category: Optional[str] = None):
    query = {} if not category or category == "All" else {"category": category}
    projects = await db.projects.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return projects

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@api_router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    project_obj = Project(**project.model_dump())
    await db.projects.insert_one(project_obj.model_dump())
    return project_obj

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project: ProjectCreate):
    existing = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    await db.projects.update_one({"id": project_id}, {"$set": project.model_dump()})
    updated = await db.projects.find_one({"id": project_id}, {"_id": 0})
    return updated

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"}

# ========== TECH NEWS ROUTES ==========

@api_router.get("/tech-news", response_model=List[TechNews])
async def get_tech_news(category: Optional[str] = None):
    query = {} if not category or category == "All" else {"category": category}
    news = await db.tech_news.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return news

@api_router.post("/tech-news", response_model=TechNews)
async def create_tech_news(news: TechNewsCreate):
    news_obj = TechNews(**news.model_dump())
    await db.tech_news.insert_one(news_obj.model_dump())
    return news_obj

@api_router.put("/tech-news/{news_id}", response_model=TechNews)
async def update_tech_news(news_id: str, news: TechNewsCreate):
    existing = await db.tech_news.find_one({"id": news_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="News not found")
    await db.tech_news.update_one({"id": news_id}, {"$set": news.model_dump()})
    updated = await db.tech_news.find_one({"id": news_id}, {"_id": 0})
    return updated

@api_router.delete("/tech-news/{news_id}")
async def delete_tech_news(news_id: str):
    result = await db.tech_news.delete_one({"id": news_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News not found")
    return {"message": "News deleted"}

# ========== COMMENTS ROUTES ==========

@api_router.get("/comments/{post_id}", response_model=List[Comment])
async def get_comments(post_id: str, include_pending: bool = False):
    query = {"post_id": post_id}
    if not include_pending:
        query["approved"] = True
    comments = await db.comments.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return comments

@api_router.get("/comments", response_model=List[Comment])
async def get_all_comments(pending_only: bool = False):
    query = {"approved": False} if pending_only else {}
    comments = await db.comments.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return comments

@api_router.post("/comments", response_model=Comment)
async def create_comment(comment: CommentCreate):
    comment_obj = Comment(**comment.model_dump())
    await db.comments.insert_one(comment_obj.model_dump())
    return comment_obj

@api_router.put("/comments/{comment_id}/approve")
async def approve_comment(comment_id: str):
    result = await db.comments.update_one({"id": comment_id}, {"$set": {"approved": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"message": "Comment approved"}

@api_router.delete("/comments/{comment_id}")
async def delete_comment(comment_id: str):
    result = await db.comments.delete_one({"id": comment_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"message": "Comment deleted"}

@api_router.get("/comments/count/{post_id}")
async def get_comment_count(post_id: str):
    count = await db.comments.count_documents({"post_id": post_id, "approved": True})
    return {"count": count}

# ========== CONTACT ROUTES ==========

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(message: ContactMessageCreate):
    message_obj = ContactMessage(**message.model_dump())
    await db.contact_messages.insert_one(message_obj.model_dump())
    
    # Send email notification
    if resend.api_key:
        try:
            html_content = f"""
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {message.name}</p>
            <p><strong>Email:</strong> {message.email}</p>
            <p><strong>Subject:</strong> {message.subject}</p>
            <p><strong>Message:</strong></p>
            <p>{message.message}</p>
            """
            params = {
                "from": SENDER_EMAIL,
                "to": [NOTIFICATION_EMAIL],
                "subject": f"Portfolio Contact: {message.subject}",
                "html": html_content
            }
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Contact notification email sent for {message.email}")
        except Exception as e:
            logger.error(f"Failed to send contact notification: {str(e)}")
    
    return message_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return messages

@api_router.put("/contact/{message_id}/read")
async def mark_message_read(message_id: str):
    result = await db.contact_messages.update_one({"id": message_id}, {"$set": {"read": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Marked as read"}

@api_router.delete("/contact/{message_id}")
async def delete_contact_message(message_id: str):
    result = await db.contact_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted"}

# ========== ANALYTICS ROUTES ==========

@api_router.post("/analytics/view")
async def record_page_view(page_type: str, page_id: str):
    view = PageView(page_type=page_type, page_id=page_id)
    await db.page_views.insert_one(view.model_dump())
    return {"message": "View recorded"}

@api_router.get("/analytics/summary")
async def get_analytics_summary():
    total_views = await db.page_views.count_documents({})
    blog_views = await db.page_views.count_documents({"page_type": "blog"})
    project_views = await db.page_views.count_documents({"page_type": "project"})
    pending_comments = await db.comments.count_documents({"approved": False})
    unread_messages = await db.contact_messages.count_documents({"read": False})
    
    return {
        "total_views": total_views,
        "blog_views": blog_views,
        "project_views": project_views,
        "pending_comments": pending_comments,
        "unread_messages": unread_messages
    }

# ========== SEED DATA ==========

@api_router.post("/seed")
async def seed_database():
    # Check if data already exists
    existing_posts = await db.blog_posts.count_documents({})
    if existing_posts > 0:
        return {"message": "Database already seeded"}
    
    # Seed Blog Posts
    blog_posts = [
        {
            "title": "Designing Reliable Multi-Agent Systems with LangGraph",
            "slug": "reliable-multi-agent-systems-langgraph",
            "content": """# Designing Reliable Multi-Agent Systems with LangGraph

A single LLM call is easy. A system of agents that stays reliable in production is hard. As I've built multi-agent workflows, a few patterns keep proving their worth.

## Model the workflow as a graph, not a chat

LangGraph lets you express agents as nodes and control flow as edges, with explicit state passed between them. Treating orchestration as a state machine — rather than an open-ended conversation — makes behaviour predictable and debuggable.

### Patterns that hold up

- **Supervisor / specialist split**: a supervisor routes work to focused specialist agents (triage, context-gathering, retrieval, synthesis) instead of one agent trying to do everything.
- **Explicit, typed state**: keep a single source of truth for what each node reads and writes.
- **Bounded loops**: cap retries and self-correction steps so the graph always terminates.
- **Human-in-the-loop gates**: pause before any irreversible action and require approval.

## Make it observable

You cannot fix what you cannot see. Instrument every node — inputs, outputs, token cost, latency — so a failed run tells you *which* agent went wrong and why.

```python
from langgraph.graph import StateGraph, END

def triage(state): ...
def gather_context(state): ...
def synthesize(state): ...

g = StateGraph(IncidentState)
g.add_node("triage", triage)
g.add_node("context", gather_context)
g.add_node("synthesize", synthesize)
g.set_entry_point("triage")
g.add_edge("triage", "context")
g.add_edge("context", "synthesize")
g.add_edge("synthesize", END)
app = g.compile()
```

## Conclusion

Reliable agent systems come from constraints: explicit state, bounded control flow, human gates, and deep observability. Start narrow, measure everything, and expand the graph only once each node earns its place.""",
            "excerpt": "Patterns for building multi-agent LLM systems that stay reliable in production: explicit state, supervisor/specialist routing, bounded loops, and human-in-the-loop gates.",
            "category": "AI/ML",
            "tags": ["LangGraph", "Multi-Agent", "LLM", "Agents"],
            "read_time": 7,
            "published": True
        },
        {
            "title": "The Rise of Vector Databases in AI Applications",
            "slug": "vector-databases-ai-applications",
            "content": """# The Rise of Vector Databases in AI Applications

With the explosion of AI and machine learning applications, traditional databases are showing their limitations when it comes to handling high-dimensional vector data.

## What are Vector Databases?

Vector databases are specialized systems designed to store, index, and query high-dimensional vectors efficiently. These vectors are numerical representations of data like text, images, or audio.

### Popular Options

- **Pinecone**: Fully managed, highly scalable
- **Weaviate**: Open-source with GraphQL interface
- **Milvus**: Enterprise-grade, distributed architecture
- **Chroma**: Lightweight, great for prototyping

## Use Cases

1. **Semantic Search**: Find similar documents based on meaning
2. **Recommendation Systems**: Match users with relevant content
3. **Image Similarity**: Find visually similar products
4. **RAG Applications**: Enhance LLMs with contextual knowledge

## Choosing the Right Solution

Consider these factors:
- Scale requirements
- Query latency needs
- Integration complexity
- Cost considerations

The vector database landscape is evolving rapidly, making it an exciting time to be in AI/ML engineering.""",
            "excerpt": "Explore the growing importance of vector databases in modern AI applications and how they're revolutionizing semantic search.",
            "category": "AI/ML",
            "tags": ["Vector Databases", "AI", "Machine Learning", "Embeddings"],
            "read_time": 6,
            "published": True
        },
        {
            "title": "Advanced RAG: Going Beyond Naive Retrieval",
            "slug": "advanced-rag-beyond-naive-retrieval",
            "content": """# Advanced RAG: Going Beyond Naive Retrieval

"Embed the docs, embed the question, return the top-k" gets you a demo. It rarely gets you grounded, trustworthy answers. Here's the stack of techniques that moves RAG from toy to production.

## Retrieve better

- **Hybrid search**: combine dense (semantic) retrieval with sparse keyword scoring (BM25). Each catches what the other misses.
- **Multi-query expansion**: rewrite the user's question into several phrasings and union the results, so retrieval doesn't hinge on one wording.
- **Reranking**: over-fetch candidates, then use a cross-encoder reranker to put the truly relevant chunks on top.

## Trust, then verify

- **Corrective RAG (CRAG)**: grade retrieved context for relevance before generating. If it's weak, rewrite the query or fall back — don't answer from thin air.
- **Citations**: tie every claim back to a source (document, page, section). If you can't cite it, don't say it.

## Measure, don't vibe

Quality is a number, not a feeling. A harness like RAGAS lets you track faithfulness, answer relevance and context precision as you tune each layer.

```text
question → multi-query → hybrid search → rerank → grade context
        → (rewrite if weak) → generate with citations
```

## Conclusion

Good RAG is a pipeline of small, measurable decisions — how you chunk, retrieve, rerank, and verify. Make every layer swappable, measure the impact, and keep the model honest with citations.""",
            "excerpt": "The techniques that take RAG from demo to production: hybrid search, multi-query expansion, reranking, corrective retrieval (CRAG), citations, and measurable evaluation.",
            "category": "AI/ML",
            "tags": ["RAG", "Retrieval", "LLM", "Embeddings"],
            "read_time": 8,
            "published": True
        },
        {
            "title": "Lessons from Building an AI-SRE Platform",
            "slug": "lessons-building-ai-sre-platform",
            "content": """# Lessons from Building an AI-SRE Platform

Building IncidentIQ — an AI platform that detects incidents, reasons about root cause, and proposes self-healing actions — taught me more about *trustworthy* AI than any tutorial could. A few lessons stuck.

## The model is the easy part

Wiring an LLM to summarise an incident takes an afternoon. The hard parts are everything around it: gathering the right context (logs, metrics, recent deploys), correlating noisy alerts, and grounding every conclusion in evidence rather than confident guesses.

## Confidence needs receipts

An RCA that says "the database is the problem" is useless without *why*. Every analysis should carry the evidence it used and a calibrated confidence score, so an on-call engineer can verify the reasoning in seconds.

## Automate cautiously, gate aggressively

Self-healing is powerful and dangerous. The rule I settled on: anything reversible and low-risk can run automatically; anything else stops at a human-in-the-loop approval. Trust is earned one safe action at a time.

## Observability is non-negotiable

An agent system that can't explain its own runs is unmaintainable. Tracing every agent step — inputs, outputs, cost, latency — turned debugging from guesswork into reading a timeline.

## Conclusion

Production AI is a reliability discipline as much as a modelling one. Ground your answers, surface your evidence, gate your actions, and instrument everything.""",
            "excerpt": "What building IncidentIQ taught me about production AI: context beats cleverness, conclusions need evidence, automate cautiously, and instrument everything.",
            "category": "AI/ML",
            "tags": ["AI-SRE", "Agents", "Reliability", "LangGraph"],
            "read_time": 6,
            "published": True
        }
    ]
    
    for post in blog_posts:
        post_obj = BlogPost(**post)
        await db.blog_posts.insert_one(post_obj.model_dump())
    
    # Seed Projects
    projects = [
        {
            "title": "Agentic Finance-Operations Automation",
            "description": "Production multi-agent platform that automates enterprise finance operations end-to-end — collections, disputes and helpdesk resolution.",
            "full_description": "A LangGraph multi-agent system (an orchestrator routing to specialist agents) that automates complex finance-operations workflows at enterprise scale. Specialist agents handle collections strategy, dispute resolution, payment-promise tracking and helpdesk categories, with human-in-the-loop checkpoints, RAG-grounded knowledge and end-to-end observability. Built on FastAPI, PostgreSQL and Azure OpenAI in a secure, multi-tenant cloud platform. (Enterprise work at Accenture.)",
            "category": "AI/ML",
            "tech_stack": ["LangGraph", "FastAPI", "PostgreSQL", "Azure OpenAI", "RAG", "Multi-Agent"],
            "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
            "featured": True
        },
        {
            "title": "Intelligent Document Extraction",
            "description": "A document-intelligence service that turns unstructured enterprise documents into structured, workflow-ready data.",
            "full_description": "An extraction service that ingests unstructured enterprise documents (invoices, remittances, correspondence), detects language and translates where needed, and extracts structured fields that feed downstream agentic workflows. Designed for accuracy and resilience at production volume. (Enterprise work at Accenture.)",
            "category": "AI/ML",
            "tech_stack": ["Python", "Document Intelligence", "NLP", "Azure AI"],
            "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
            "featured": False
        },
        {
            "title": "Agentic Platform Observability",
            "description": "An observability layer that makes multi-agent LLM workflows debuggable end-to-end.",
            "full_description": "A monitoring and metrics layer for agentic workflows — capturing per-agent inputs, outputs, cost, latency and status across every run, and turning opaque multi-agent pipelines into a readable, debuggable timeline. (Enterprise work at Accenture.)",
            "category": "AI/ML",
            "tech_stack": ["Python", "Observability", "Metrics", "Multi-Agent"],
            "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
            "featured": False
        },
        {
            "title": "IncidentIQ — AI-SRE Platform",
            "description": "Production-grade AI-SRE platform that automates incident detection, root-cause analysis and self-healing remediation.",
            "full_description": "A production-grade Site Reliability Engineering platform powered by a LangGraph multi-agent crew — Supervisor, Triage, Context, Knowledge and RCA agents — that reasons over a RAG knowledge base of runbooks and past incidents. It correlates noisy alerts, produces evidence-backed root-cause analyses with confidence scoring, and executes self-healing actions behind human-in-the-loop approval. Built on FastAPI, PostgreSQL + pgvector, Redis and Dramatiq, with OpenTelemetry observability and Kubernetes/Terraform infrastructure.",
            "category": "AI/ML",
            "tech_stack": ["Python", "FastAPI", "LangGraph", "PostgreSQL + pgvector", "Redis", "Kubernetes"],
            "github_url": "https://github.com/AyushRanjanRoy-01/IncidentIQ",
            "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
            "featured": True
        },
        {
            "title": "RAGGym — Learn RAG by Coding",
            "description": "An open-source “gym” for RAG interview prep: train by coding and by chatting with a corpus of books.",
            "full_description": "RAGGym turns passive reading into reps. Chat mode answers questions with cited, grounded responses from an advanced pipeline — hybrid (dense + BM25) search, multi-query expansion, reranking and corrective (CRAG) self-correction — every answer pointing back to book, page and section. Practice mode pulls a concept from the corpus, generates a coding exercise into your IDE, and an AI reviewer grades your solution against the source material. Every layer (LLM, embeddings, vector store, chunking, retrieval) is swappable via .env, with a RAGAS harness to measure quality as you tune.",
            "category": "AI/ML",
            "tech_stack": ["Python", "LangGraph", "Qdrant / Chroma", "FastEmbed", "RAGAS", "Streamlit"],
            "github_url": "https://github.com/AyushRanjanRoy-01/RAG-Project",
            "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
            "featured": True
        },
        {
            "title": "AI Startup Incubator",
            "description": "A LangGraph multi-agent workflow that ideates, validates and plans new ventures end-to-end.",
            "full_description": "An AI-powered startup incubator built as a multi-agent LangGraph workflow. Specialist agents collaborate to frame a problem, generate and stress-test ideas, analyse the market and produce a structured go-to-market plan — taking a raw concept through to a coherent venture outline.",
            "category": "AI/ML",
            "tech_stack": ["Python", "LangGraph", "LLMs", "Multi-Agent Systems"],
            "github_url": "https://github.com/AyushRanjanRoy-01/Startup_Incubator_LangGraph",
            "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
            "featured": True
        },
        {
            "title": "Student Stress Detection",
            "description": "ML pipeline that analyses behavioural and lifestyle signals to predict student stress levels.",
            "full_description": "A machine-learning project that explores and models student stress from behavioural, academic and lifestyle indicators. It covers data exploration, feature analysis, model training and evaluation in a reproducible notebook workflow, surfacing the factors most predictive of elevated stress.",
            "category": "AI/ML",
            "tech_stack": ["Python", "scikit-learn", "Pandas", "Jupyter"],
            "github_url": "https://github.com/AyushRanjanRoy-01/Student-Stress-Analysis-and-detection",
            "image_url": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
            "featured": False
        },
        {
            "title": "Hybrid Driver Alert System",
            "description": "Fuses computer-vision drowsiness cues with behavioural signals to warn fatigued drivers in real time.",
            "full_description": "A hybrid driver-safety system that combines computer-vision drowsiness detection (eye and face cues) with behavioural and sensor signals to identify fatigue and distraction, raising real-time alerts. The layered, hybrid approach reduces false alarms compared with single-signal methods.",
            "category": "AI/ML",
            "tech_stack": ["Python", "OpenCV", "Computer Vision", "Jupyter"],
            "github_url": "https://github.com/AyushRanjanRoy-01/hybrid-driver-alert-system",
            "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
            "featured": False
        },
        {
            "title": "EdTech Learning MVP",
            "description": "An end-to-end ed-tech learning platform MVP with a Python backend.",
            "full_description": "A fast, iterable ed-tech product MVP exploring structured lessons and content delivery end-to-end, with a Python backend. Built to validate the core learning-platform experience quickly.",
            "category": "Full Stack",
            "tech_stack": ["Python", "Full Stack", "REST API", "MVP"],
            "github_url": "https://github.com/AyushRanjanRoy-01/edtech-mvp-01",
            "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
            "featured": False
        }
    ]
    
    for project in projects:
        project_obj = Project(**project)
        await db.projects.insert_one(project_obj.model_dump())
    
    # Seed Tech News
    tech_news = [
        {
            "headline": "Snowflake Announces Cortex AI for Enterprise Analytics",
            "source": "TechCrunch",
            "source_url": "https://techcrunch.com",
            "summary": "Snowflake introduces Cortex AI, a suite of AI-powered features directly integrated into the data cloud platform, enabling SQL-based machine learning and LLM capabilities.",
            "category": "Cloud"
        },
        {
            "headline": "Apache Flink 2.0 Released with Major Performance Improvements",
            "source": "Apache Blog",
            "source_url": "https://flink.apache.org",
            "summary": "The latest Flink release brings significant performance enhancements, improved state management, and better Kubernetes integration for stream processing workloads.",
            "category": "Data"
        },
        {
            "headline": "GPT-5 Rumors: What We Know So Far",
            "source": "The Verge",
            "source_url": "https://theverge.com",
            "summary": "Industry insiders hint at GPT-5's capabilities including improved reasoning, longer context windows, and potentially multimodal video understanding.",
            "category": "AI"
        },
        {
            "headline": "Databricks Acquires MosaicML for $1.3B",
            "source": "Bloomberg",
            "source_url": "https://bloomberg.com",
            "summary": "Databricks strengthens its AI capabilities with the acquisition of MosaicML, enabling customers to train and deploy custom LLMs on their data platform.",
            "category": "AI"
        },
        {
            "headline": "Kubernetes 1.30 Introduces Native Sidecar Containers",
            "source": "CNCF Blog",
            "source_url": "https://kubernetes.io",
            "summary": "The latest Kubernetes release adds native support for sidecar containers, improving service mesh deployments and observability patterns.",
            "category": "DevOps"
        },
        {
            "headline": "AWS Announces Zero-ETL Integration Between Aurora and Redshift",
            "source": "AWS Blog",
            "source_url": "https://aws.amazon.com",
            "summary": "AWS eliminates the need for ETL pipelines between Aurora PostgreSQL and Redshift, enabling near-real-time analytics on operational data.",
            "category": "Cloud"
        },
        {
            "headline": "dbt Introduces Semantic Layer for Unified Metrics",
            "source": "dbt Blog",
            "source_url": "https://getdbt.com",
            "summary": "dbt Labs launches a semantic layer that allows data teams to define metrics once and use them across all BI tools, ensuring consistency.",
            "category": "Data"
        },
        {
            "headline": "OpenAI Releases GPT-4 Turbo with 128K Context Window",
            "source": "OpenAI Blog",
            "source_url": "https://openai.com",
            "summary": "The new GPT-4 Turbo model offers a 128K token context window, improved instruction following, and significantly reduced pricing.",
            "category": "AI"
        }
    ]
    
    for news in tech_news:
        news_obj = TechNews(**news)
        await db.tech_news.insert_one(news_obj.model_dump())
    
    # Seed Sample Comments
    posts = await db.blog_posts.find({}, {"_id": 0, "id": 1, "slug": 1}).to_list(4)
    if posts:
        comments = [
            {
                "post_id": posts[0]["id"],
                "name": "Alex Chen",
                "email": "alex@example.com",
                "content": "Great article! I've been using Airflow for about a year now, and these best practices really resonate with my experience.",
                "approved": True
            },
            {
                "post_id": posts[0]["id"],
                "name": "Sarah Johnson",
                "email": "sarah@example.com",
                "content": "Could you write a follow-up about integrating Airflow with Kubernetes? That would be super helpful!",
                "approved": True
            },
            {
                "post_id": posts[1]["id"],
                "name": "Mike Peters",
                "email": "mike@example.com",
                "content": "Vector databases are definitely the future. We switched to Pinecone last month and saw huge improvements in search quality.",
                "approved": True
            }
        ]
        
        for comment in comments:
            comment_obj = Comment(**comment)
            await db.comments.insert_one(comment_obj.model_dump())
    
    return {"message": "Database seeded successfully"}

@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}

# Include router and add middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
