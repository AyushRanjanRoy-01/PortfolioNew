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
            "title": "Building Scalable Data Pipelines with Apache Airflow",
            "slug": "building-scalable-data-pipelines-airflow",
            "content": """# Building Scalable Data Pipelines with Apache Airflow

In today's data-driven world, building robust and scalable data pipelines is crucial for any organization. Apache Airflow has emerged as the go-to orchestration tool for data engineers worldwide.

## Why Airflow?

Airflow provides a powerful platform to programmatically author, schedule, and monitor workflows. Its Python-based DAG definitions make it incredibly flexible and easy to integrate with existing systems.

### Key Features

- **Dynamic Pipeline Generation**: Create pipelines programmatically using Python
- **Extensible**: Easy to create custom operators and hooks
- **Scalable**: Distributed execution with Celery or Kubernetes
- **Rich UI**: Monitor and troubleshoot pipelines with ease

## Best Practices

1. **Keep DAGs Idempotent**: Ensure your tasks can be rerun without side effects
2. **Use Templating**: Leverage Jinja templating for dynamic parameters
3. **Implement Proper Error Handling**: Use retries and alerts effectively
4. **Monitor Resource Usage**: Set appropriate pool sizes and concurrency limits

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def process_data(**context):
    # Your data processing logic here
    pass

with DAG('data_pipeline', start_date=datetime(2024, 1, 1)) as dag:
    task = PythonOperator(
        task_id='process',
        python_callable=process_data
    )
```

## Conclusion

Airflow is an essential tool in any data engineer's toolkit. Start small, iterate, and scale as your needs grow.""",
            "excerpt": "Learn how to build robust and scalable data pipelines using Apache Airflow, the industry-standard orchestration tool.",
            "category": "Data Engineering",
            "tags": ["Airflow", "Data Pipelines", "Python", "Orchestration"],
            "read_time": 8,
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
            "title": "Mastering dbt for Modern Data Transformation",
            "slug": "mastering-dbt-data-transformation",
            "content": """# Mastering dbt for Modern Data Transformation

dbt (data build tool) has revolutionized how data teams approach data transformation, bringing software engineering best practices to analytics.

## The dbt Philosophy

dbt advocates for the ELT (Extract, Load, Transform) pattern, pushing transformations to the warehouse where compute is cheap and scalable.

### Core Concepts

- **Models**: SQL SELECT statements that define transformations
- **Tests**: Data quality assertions
- **Documentation**: Auto-generated docs from YAML configs
- **Macros**: Reusable SQL snippets

## Project Structure

```
models/
├── staging/
│   ├── stg_customers.sql
│   └── stg_orders.sql
├── intermediate/
│   └── int_order_items.sql
└── marts/
    └── dim_customers.sql
```

## Best Practices

1. Use staging models to clean raw data
2. Implement generic and singular tests
3. Document all models with descriptions
4. Use refs() for all model dependencies
5. Leverage incremental models for large datasets

dbt has become essential for modern data teams, enabling faster, more reliable analytics.""",
            "excerpt": "A comprehensive guide to using dbt for efficient and maintainable data transformations in your data warehouse.",
            "category": "Data Engineering",
            "tags": ["dbt", "Data Transformation", "SQL", "Analytics"],
            "read_time": 7,
            "published": True
        },
        {
            "title": "Career Lessons from 5 Years in Data Engineering",
            "slug": "career-lessons-data-engineering",
            "content": """# Career Lessons from 5 Years in Data Engineering

Reflecting on my journey in data engineering, I've gathered some insights that I wish someone had shared with me earlier.

## Technical Growth

1. **Master the Fundamentals**: SQL and Python are your bread and butter
2. **Understand Distributed Systems**: Know how Spark, Kafka, and similar tools work under the hood
3. **Learn Cloud Platforms**: AWS, GCP, or Azure - pick one and go deep

## Soft Skills Matter

Data engineering isn't just about writing code. Communication with stakeholders, understanding business requirements, and collaborating with data scientists are equally important.

## Continuous Learning

The field evolves rapidly. What's hot today might be legacy tomorrow. Stay curious:
- Follow industry blogs and podcasts
- Experiment with new tools in personal projects
- Attend conferences and meetups

## Work-Life Balance

Burnout is real. Take care of yourself:
- Set boundaries with on-call responsibilities
- Don't sacrifice personal time for work
- Find hobbies outside of tech

The journey is long. Pace yourself and enjoy the ride.""",
            "excerpt": "Personal reflections and career advice from five years working as a data engineer in various organizations.",
            "category": "Career",
            "tags": ["Career", "Data Engineering", "Professional Growth"],
            "read_time": 5,
            "published": True
        }
    ]
    
    for post in blog_posts:
        post_obj = BlogPost(**post)
        await db.blog_posts.insert_one(post_obj.model_dump())
    
    # Seed Projects
    projects = [
        {
            "title": "Real-Time Analytics Platform",
            "description": "Built a real-time analytics platform processing 10M+ events daily using Kafka, Spark Streaming, and Snowflake.",
            "full_description": "A comprehensive real-time analytics platform designed to process and analyze millions of events per day. The system uses Kafka for event streaming, Spark Streaming for processing, and Snowflake for storage and analytics. Features include real-time dashboards, anomaly detection, and automated alerting.",
            "category": "Data Engineering",
            "tech_stack": ["Apache Kafka", "Spark Streaming", "Snowflake", "Python", "Airflow"],
            "github_url": "https://github.com",
            "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
            "featured": True
        },
        {
            "title": "ML Feature Store",
            "description": "Designed and implemented a feature store for ML models, reducing feature engineering time by 60%.",
            "full_description": "An enterprise-grade feature store that enables data scientists to discover, share, and reuse features across ML projects. Built with Feast and Redis for low-latency feature serving, integrated with the existing data warehouse for batch features.",
            "category": "AI/ML",
            "tech_stack": ["Feast", "Redis", "Python", "dbt", "PostgreSQL"],
            "github_url": "https://github.com",
            "image_url": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
            "featured": True
        },
        {
            "title": "Data Quality Framework",
            "description": "Created a comprehensive data quality framework with Great Expectations and custom validators.",
            "full_description": "A robust data quality framework that ensures data reliability across the organization. Includes automated testing, data profiling, lineage tracking, and integration with Slack for alerting. Reduced data incidents by 80%.",
            "category": "Data Engineering",
            "tech_stack": ["Great Expectations", "Python", "Airflow", "PostgreSQL"],
            "github_url": "https://github.com",
            "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
            "featured": False
        },
        {
            "title": "RAG-Powered Documentation Assistant",
            "description": "Built an AI assistant that helps engineers find answers from internal documentation using RAG.",
            "full_description": "An intelligent documentation assistant powered by Retrieval-Augmented Generation. Uses vector embeddings to search through thousands of internal documents and provides contextual answers. Integrated with Slack for easy access.",
            "category": "AI/ML",
            "tech_stack": ["LangChain", "OpenAI", "Pinecone", "Python", "FastAPI"],
            "github_url": "https://github.com",
            "live_url": "https://demo.example.com",
            "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
            "featured": True
        },
        {
            "title": "Cloud Cost Optimizer",
            "description": "Developed a tool to analyze and optimize cloud spending, saving $200K annually.",
            "full_description": "An automated cloud cost optimization tool that analyzes AWS spending patterns and recommends cost-saving measures. Features include unused resource detection, rightsizing recommendations, and reserved instance planning.",
            "category": "Full Stack",
            "tech_stack": ["Python", "AWS", "React", "PostgreSQL", "Terraform"],
            "github_url": "https://github.com",
            "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
            "featured": False
        },
        {
            "title": "Streaming ETL Pipeline",
            "description": "Designed a streaming ETL pipeline for IoT sensor data using AWS Kinesis and Lambda.",
            "full_description": "A serverless streaming ETL pipeline that processes IoT sensor data in real-time. Uses AWS Kinesis for data ingestion, Lambda for processing, and S3 for storage. Includes data validation, transformation, and loading into Redshift for analytics.",
            "category": "Data Engineering",
            "tech_stack": ["AWS Kinesis", "Lambda", "S3", "Redshift", "Python"],
            "github_url": "https://github.com",
            "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
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
