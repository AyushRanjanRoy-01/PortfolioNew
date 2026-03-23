// Comprehensive Prompt Engineering Documentation
// Organized by categories for easy navigation

export const promptDocumentation = {
  fundamentals: {
    title: "Fundamentals",
    icon: "BookOpen",
    sections: [
      {
        id: "what-is-prompting",
        title: "What is Prompt Engineering?",
        content: `Prompt engineering is the practice of designing and optimizing text inputs (prompts) to effectively communicate with Large Language Models (LLMs) like GPT-4, Claude, or Gemini. It's both an art and a science that combines clear communication, understanding of AI behavior, and iterative refinement.

**Why It Matters:**
- The same AI model can produce vastly different results based on prompt quality
- Good prompts save time, tokens, and improve accuracy
- Essential skill for AI engineers, developers, and power users
- Bridges the gap between human intent and AI understanding`,
        examples: [
          {
            title: "Poor Prompt",
            code: "Tell me about Python",
            result: "Vague, could mean the snake, programming language, or Monty Python"
          },
          {
            title: "Good Prompt",
            code: "Explain the top 5 advantages of Python programming language for data science, with one sentence for each advantage.",
            result: "Specific, clear scope, defined format, actionable"
          }
        ]
      },
      {
        id: "anatomy-of-prompt",
        title: "Anatomy of a Good Prompt",
        content: `A well-structured prompt typically contains:

**1. Instruction:** What you want the AI to do
**2. Context:** Background information or constraints
**3. Input Data:** The specific content to process
**4. Output Format:** How you want the response structured

**Optional Elements:**
- Role/Persona: "You are a senior Python developer..."
- Examples: Few-shot learning demonstrations
- Constraints: Length limits, tone, style requirements`,
        examples: [
          {
            title: "Complete Prompt Structure",
            code: `[Role] You are a technical writer specializing in API documentation.

[Context] We're documenting a REST API for a task management system.

[Instruction] Write clear, concise documentation for the following endpoint:

[Input Data]
POST /api/tasks
Body: { "title": string, "priority": "low"|"medium"|"high" }

[Output Format]
Use markdown format with sections: Description, Request, Response, Example`,
            result: "Comprehensive, leaves no ambiguity"
          }
        ]
      },
      {
        id: "zero-shot-few-shot",
        title: "Zero-Shot vs Few-Shot Learning",
        content: `**Zero-Shot:** Asking the model to perform a task with no examples.
- Relies on model's pre-trained knowledge
- Works well for common tasks
- Less control over output format

**Few-Shot:** Providing examples before asking for the task.
- Shows the model the pattern you want
- More consistent output format
- Better for specialized or unusual tasks

**One-Shot:** A single example (middle ground)`,
        examples: [
          {
            title: "Zero-Shot",
            code: "Translate 'Hello, how are you?' to French.",
            result: "Bonjour, comment allez-vous?"
          },
          {
            title: "Few-Shot",
            code: `Translate to French:
English: Good morning
French: Bonjour

English: Thank you
French: Merci

English: Hello, how are you?
French:`,
            result: "Bonjour, comment allez-vous? (with learned pattern)"
          }
        ]
      }
    ]
  },
  
  techniques: {
    title: "Advanced Techniques",
    icon: "Zap",
    sections: [
      {
        id: "chain-of-thought",
        title: "Chain of Thought (CoT)",
        content: `Chain of Thought prompting asks the AI to show its reasoning process step-by-step. This leads to more accurate answers, especially for complex problems.

**When to Use:**
- Math and logic problems
- Multi-step reasoning
- Complex analysis
- Debugging and troubleshooting

**Variations:**
- **Zero-shot CoT:** "Let's think step by step..."
- **Few-shot CoT:** Provide examples with reasoning
- **Self-consistency:** Generate multiple reasoning paths`,
        examples: [
          {
            title: "Without CoT",
            code: "If a train travels 120 miles in 2 hours, how long to travel 300 miles?",
            result: "May give answer without showing work"
          },
          {
            title: "With CoT",
            code: "If a train travels 120 miles in 2 hours, how long to travel 300 miles? Let's solve this step by step.",
            result: "Step 1: Calculate speed = 120/2 = 60 mph\nStep 2: Time = 300/60 = 5 hours\nAnswer: 5 hours"
          }
        ]
      },
      {
        id: "tree-of-thoughts",
        title: "Tree of Thoughts (ToT)",
        content: `Tree of Thoughts explores multiple reasoning paths simultaneously, evaluating each branch before proceeding. More advanced than linear Chain of Thought.

**How It Works:**
1. Generate multiple possible next steps
2. Evaluate each option
3. Choose the best path or explore multiple
4. Backtrack if needed

**Best For:**
- Strategic planning
- Game playing (chess, puzzles)
- Creative problem solving
- Complex decision making`,
        examples: [
          {
            title: "ToT Prompt",
            code: `Solve this puzzle using Tree of Thoughts:
"You have 3 jugs: 8L, 5L, and 3L. The 8L jug is full. Get exactly 4L in the 8L jug."

Consider multiple approaches:
1. List possible first moves
2. Evaluate each move's potential
3. Choose the most promising path
4. Show your reasoning tree`,
            result: "Explores multiple solution paths systematically"
          }
        ]
      },
      {
        id: "role-prompting",
        title: "Role-Based Prompting",
        content: `Assigning a specific role or persona to the AI helps frame responses with appropriate expertise, tone, and perspective.

**Common Roles:**
- Expert/Specialist (technical depth)
- Teacher/Tutor (explanations)
- Critic/Reviewer (feedback)
- Creative Writer (storytelling)
- Analyst (data interpretation)

**Benefits:**
- Consistent tone and style
- Domain-specific knowledge activation
- Appropriate level of detail`,
        examples: [
          {
            title: "Role-Based Prompt",
            code: `You are a senior DevOps engineer with 10 years of experience in Kubernetes.

Review this deployment configuration and suggest improvements for production readiness:
[YAML config here]`,
            result: "Response will be technical, experienced, focused on production concerns"
          }
        ]
      },
      {
        id: "self-consistency",
        title: "Self-Consistency",
        content: `Generate multiple reasoning paths for the same problem and choose the most consistent answer. Improves reliability for complex reasoning tasks.

**Process:**
1. Generate multiple independent solutions
2. Compare the answers
3. Select the majority answer or most consistent reasoning

**Use Cases:**
- High-stakes decisions
- Complex math problems
- Ambiguous questions
- Verification of critical outputs`,
        examples: [
          {
            title: "Self-Consistency Prompt",
            code: `Solve this problem 3 different ways and compare:
"A store has a 20% off sale, then adds 10% tax. Is this the same as adding 10% tax then taking 20% off?"

Approach 1: Calculate with $100 example
Approach 2: Use algebraic formula
Approach 3: Work backwards from final price

Compare results and explain.`,
            result: "Multiple verification paths increase confidence"
          }
        ]
      }
    ]
  },
  
  bestPractices: {
    title: "Best Practices",
    icon: "CheckCircle",
    sections: [
      {
        id: "clarity-specificity",
        title: "Clarity and Specificity",
        content: `**Be Specific:**
- Define exact requirements
- Specify format, length, style
- Provide constraints and boundaries

**Be Clear:**
- Use simple, direct language
- Avoid ambiguity
- One task per prompt (usually)

**Common Mistakes:**
- Vague instructions: "Make it better"
- Multiple conflicting requests
- Assuming context the AI doesn't have`,
        examples: [
          {
            title: "Vague",
            code: "Write about AI",
            result: "Too broad, unpredictable output"
          },
          {
            title: "Specific",
            code: "Write a 200-word explanation of how transformer models work, suitable for software engineers with no ML background. Include an analogy.",
            result: "Clear scope, audience, length, and requirements"
          }
        ]
      },
      {
        id: "iterative-refinement",
        title: "Iterative Refinement",
        content: `Prompt engineering is iterative. Start simple, then refine based on results.

**Process:**
1. Start with basic prompt
2. Test and evaluate output
3. Identify gaps or issues
4. Add constraints, examples, or context
5. Repeat until satisfactory

**Tips:**
- Keep a prompt library of what works
- Version your prompts
- A/B test different approaches
- Document successful patterns`,
        examples: [
          {
            title: "Iteration Example",
            code: `V1: "Summarize this article"
→ Too long

V2: "Summarize this article in 3 sentences"
→ Misses key points

V3: "Summarize this article in 3 sentences, focusing on: main argument, supporting evidence, and conclusion"
→ Perfect!`,
            result: "Each iteration improves specificity"
          }
        ]
      },
      {
        id: "context-management",
        title: "Context Management",
        content: `**Provide Necessary Context:**
- Background information
- Domain-specific knowledge
- Relevant constraints
- Target audience

**Avoid Context Overload:**
- Don't include irrelevant information
- Be concise but complete
- Structure context clearly

**Context Window Limits:**
- Most models have token limits (4K-128K)
- Prioritize most relevant context
- Use summarization for long documents`,
        examples: [
          {
            title: "Good Context",
            code: `Context: This is for a B2B SaaS product targeting enterprise customers. Our brand voice is professional but approachable.

Task: Write a product description for our new analytics dashboard.`,
            result: "Relevant context guides appropriate tone and content"
          }
        ]
      }
    ]
  },
  
  patterns: {
    title: "Prompt Patterns",
    icon: "Layout",
    sections: [
      {
        id: "template-pattern",
        title: "Template Pattern",
        content: `Create reusable prompt templates with placeholders for dynamic content.

**Benefits:**
- Consistency across similar tasks
- Easy to maintain and update
- Scalable for production use

**Structure:**
\`\`\`
[ROLE] + [CONTEXT] + [INSTRUCTION] + [INPUT] + [FORMAT]
\`\`\``,
        examples: [
          {
            title: "Email Response Template",
            code: `You are a customer support specialist for {COMPANY_NAME}.

Context: Customer {CUSTOMER_NAME} has issue: {ISSUE_DESCRIPTION}

Write a professional, empathetic email response that:
1. Acknowledges the issue
2. Provides solution: {SOLUTION}
3. Offers next steps

Tone: {TONE}
Length: {LENGTH}`,
            result: "Reusable template for consistent responses"
          }
        ]
      },
      {
        id: "meta-prompting",
        title: "Meta-Prompting",
        content: `Ask the AI to help you write better prompts or improve existing ones.

**Use Cases:**
- Prompt optimization
- Finding edge cases
- Generating test cases
- Improving clarity`,
        examples: [
          {
            title: "Meta-Prompt",
            code: `I want to create a prompt that generates product descriptions for an e-commerce site.

Help me design a prompt template that ensures:
- SEO-friendly content
- Highlights key features
- Includes emotional appeal
- 150-200 words
- Consistent format

Provide the template with placeholders.`,
            result: "AI helps design better prompts"
          }
        ]
      },
      {
        id: "constraint-pattern",
        title: "Constraint Pattern",
        content: `Explicitly define what the AI should NOT do, along with what it should do.

**Types of Constraints:**
- Length limits
- Forbidden topics
- Required inclusions
- Format restrictions
- Tone boundaries`,
        examples: [
          {
            title: "Constrained Prompt",
            code: `Write a blog post about AI ethics.

Requirements:
✓ 500-600 words
✓ Include 3 real-world examples
✓ Cite sources

Constraints:
✗ No technical jargon
✗ Don't discuss specific companies
✗ Avoid political bias
✗ No speculation about AGI`,
            result: "Clear boundaries prevent unwanted content"
          }
        ]
      }
    ]
  },
  
  glossary: {
    title: "Glossary",
    icon: "Book",
    sections: [
      {
        id: "key-terms",
        title: "Key Terms",
        content: `**Prompt:** The input text given to an AI model to generate a response.

**Token:** The basic unit of text processing (roughly 0.75 words in English).

**Temperature:** Controls randomness in responses (0 = deterministic, 1 = creative).

**Top-p (Nucleus Sampling):** Sampling from the smallest set of tokens whose cumulative probability exceeds p.

**Top-k:** Sampling only from the k most probable next tokens.

**Context Window:** The maximum amount of text (in tokens) the model can process at once.

**System Message:** Initial instructions that set the AI's behavior for the entire conversation.

**Few-Shot Learning:** Providing examples in the prompt to guide the model's behavior.

**Zero-Shot Learning:** Asking the model to perform a task without examples.

**Chain of Thought (CoT):** Prompting technique that encourages step-by-step reasoning.

**Tree of Thoughts (ToT):** Exploring multiple reasoning paths simultaneously.

**Embedding:** Vector representation of text that captures semantic meaning.

**Fine-tuning:** Training a pre-trained model on specific data to specialize it.

**RAG (Retrieval-Augmented Generation):** Combining retrieval from a knowledge base with generation.

**Vector Database:** Database optimized for storing and querying high-dimensional embeddings (Pinecone, Weaviate, Chroma).

**Hallucination:** When the AI generates plausible-sounding but incorrect information.

**Grounding:** Anchoring AI responses to factual, verifiable information.

**Tool Calling / Function Calling:** Ability to define external functions the model can invoke.

**Agent:** AI system that can use tools, make decisions, and take actions autonomously.

**Instruction Tuning:** Training models to follow instructions better.

**RLHF (Reinforcement Learning from Human Feedback):** Training technique using human preferences.`,
        examples: []
      }
    ]
  },
  
  resources: {
    title: "Resources & Tools",
    icon: "ExternalLink",
    sections: [
      {
        id: "tools",
        title: "Prompt Engineering Tools",
        content: `**Prompt Testing & Development:**
- OpenAI Playground
- Anthropic Console
- PromptBase (marketplace)
- LangChain (framework)

**Prompt Libraries:**
- Awesome ChatGPT Prompts
- FlowGPT
- PromptHero

**Evaluation Tools:**
- PromptFoo (testing)
- LangSmith (monitoring)
- Weights & Biases (tracking)`,
        examples: []
      },
      {
        id: "learning-resources",
        title: "Learning Resources",
        content: `**Official Documentation:**
- OpenAI Prompt Engineering Guide
- Anthropic Claude Prompting Guide
- Google Gemini Best Practices

**Courses:**
- DeepLearning.AI - ChatGPT Prompt Engineering
- Coursera - Prompt Engineering Specialization

**Communities:**
- r/PromptEngineering
- LangChain Discord
- OpenAI Community Forum

**Research Papers:**
- "Chain-of-Thought Prompting Elicits Reasoning"
- "Tree of Thoughts: Deliberate Problem Solving"
- "ReAct: Synergizing Reasoning and Acting"`,
        examples: []
      }
    ]
  }
};

// Helper function to get all sections flattened
export const getAllSections = () => {
  const allSections = [];
  Object.values(promptDocumentation).forEach(category => {
    category.sections.forEach(section => {
      allSections.push({
        ...section,
        categoryTitle: category.title,
        categoryIcon: category.icon
      });
    });
  });
  return allSections;
};

// Helper function to search documentation
export const searchDocumentation = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = [];
  
  Object.entries(promptDocumentation).forEach(([categoryKey, category]) => {
    category.sections.forEach(section => {
      const titleMatch = section.title.toLowerCase().includes(lowerQuery);
      const contentMatch = section.content.toLowerCase().includes(lowerQuery);
      
      if (titleMatch || contentMatch) {
        results.push({
          ...section,
          categoryKey,
          categoryTitle: category.title,
          categoryIcon: category.icon
        });
      }
    });
  });
  
  return results;
};
