// Comprehensive Prompt Engineering Curriculum
// Progressive learning from beginner to advanced
// Based on industry best practices and real-world applications

export const promptLessons = [
  {
    id: 'intro',
    number: 0,
    title: '🎯 Welcome to Prompt Engineering!',
    slug: 'introduction',
    difficulty: 'Easy',
    sections: [
      {
        heading: 'What is Prompt Engineering?',
        content: `Prompt Engineering is the practice of designing and optimizing text inputs (prompts) to effectively communicate with Large Language Models (LLMs) like GPT-4, Claude, or Gemini.

It's both an art and a science that combines:
• Clear communication
• Understanding of AI behavior
• Iterative refinement
• Domain knowledge

Just as SQL allows you to query databases effectively, prompt engineering allows you to "query" AI models effectively.`,
        codeExample: `Poor Prompt:
"Tell me about Python"
→ Vague, could mean the snake, programming language, or Monty Python

Good Prompt:
"Explain the top 5 advantages of Python programming language for data science, with one sentence for each advantage."
→ Specific, clear scope, defined format, actionable`
      },
      {
        heading: 'Why Prompt Engineering Matters',
        content: `The same AI model can produce vastly different results based on prompt quality:

**Impact on Results:**
• Accuracy: 30-80% improvement with good prompts
• Relevance: Focused vs scattered information
• Efficiency: Saves time and API costs
• Consistency: Reproducible outputs

**Real-World Applications:**
• Content generation (blogs, emails, code)
• Data analysis and summarization
• Customer support automation
• Code generation and debugging
• Research and learning assistance`,
      },
      {
        heading: 'The Anatomy of a Good Prompt',
        content: `A well-structured prompt typically contains:

1. **Instruction:** What you want the AI to do
2. **Context:** Background information or constraints
3. **Input Data:** The specific content to process
4. **Output Format:** How you want the response structured

**Optional Elements:**
• Role/Persona: "You are a senior Python developer..."
• Examples: Few-shot learning demonstrations
• Constraints: Length limits, tone, style requirements`,
        codeExample: `[Role] You are a technical writer specializing in API documentation.

[Context] We're documenting a REST API for a task management system.

[Instruction] Write clear, concise documentation for the following endpoint:

[Input Data]
POST /api/tasks
Body: { "title": string, "priority": "low"|"medium"|"high" }

[Output Format]
Use markdown format with sections: Description, Request, Response, Example`
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Write a basic prompt asking the AI to explain machine learning',
        hint: 'Start with a clear, direct request',
        placeholder: 'Enter your prompt here...',
        sampleSolution: 'Explain machine learning in simple terms.',
        criteria: ['includes "explain" or "describe"', 'mentions "machine learning"']
      },
      {
        id: 2,
        task: 'Improve your prompt by specifying the audience (software engineers with no ML background)',
        hint: 'Add context about who the explanation is for',
        placeholder: 'Enter your improved prompt...',
        sampleSolution: 'Explain machine learning to software engineers who have no machine learning background. Use programming analogies where possible.',
        criteria: ['mentions audience', 'includes context']
      },
      {
        id: 3,
        task: 'Now add output format requirements: 3 paragraphs, include a real-world example',
        hint: 'Specify structure and requirements',
        placeholder: 'Enter your complete prompt...',
        sampleSolution: 'Explain machine learning to software engineers with no ML background. Write 3 paragraphs: (1) basic definition, (2) how it works, (3) a real-world example. Use programming analogies.',
        criteria: ['specifies format', 'mentions structure']
      }
    ]
  },
  {
    id: 'lesson-1',
    number: 1,
    title: '✍️ Writing Your First Prompts',
    slug: 'basic-prompts',
    difficulty: 'Easy',
    sections: [
      {
        heading: 'The Anatomy of a Prompt',
        content: `A basic prompt consists of an instruction or question. The clearer and more specific your instruction, the better the output. Think of it like giving directions to a helpful assistant.`,
        codeExample: `Basic Prompt:
"Write a product description"

Better Prompt:
"Write a 50-word product description for wireless headphones emphasizing battery life and comfort"`
      },
      {
        heading: 'Clarity is Key',
        content: `Vague prompts lead to vague outputs. Always be specific about what you want, how you want it formatted, and any constraints or requirements.`,
        codeExample: `Vague:
"Tell me about Python"

Specific:
"List 5 key advantages of using Python for data science, with one sentence explaining each"`
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Write a prompt to generate a professional email subject line about a project deadline',
        hint: 'Be specific about the context and tone',
        placeholder: 'Your prompt...',
        sampleSolution: 'Write a professional email subject line about extending a project deadline by one week.',
        criteria: ['mentions "email subject"', 'includes context about deadline']
      },
      {
        id: 2,
        task: 'Write a prompt to create a bullet-point list of 3 healthy breakfast ideas',
        hint: 'Specify the format (bullet points) and quantity (3 items)',
        placeholder: 'Your prompt...',
        sampleSolution: 'Create a bullet-point list of 3 healthy breakfast ideas that take less than 10 minutes to prepare.',
        criteria: ['specifies format', 'mentions quantity']
      },
      {
        id: 3,
        task: 'Write a prompt to explain a technical concept (APIs) to a non-technical person',
        hint: 'Specify both the topic and the audience',
        placeholder: 'Your prompt...',
        sampleSolution: 'Explain what APIs are to someone with no technical background, using a simple real-world analogy.',
        criteria: ['mentions audience', 'requests simple explanation']
      }
    ]
  },
  {
    id: 'lesson-2',
    number: 2,
    title: '🎨 Level Up with Context & Examples',
    slug: 'context-and-examples',
    difficulty: 'Easy',
    sections: [
      {
        heading: 'The Power of Context',
        content: `Providing context helps the AI understand the situation, constraints, and desired outcome. Context can include background information, target audience, tone, or use case.`,
        codeExample: `Without Context:
"Write a tweet about coffee"

With Context:
"Write a tweet about coffee for a specialty coffee shop's account. Tone should be warm and inviting. Include an emoji."`
      },
      {
        heading: 'Using Examples (Few-Shot Learning)',
        content: `Showing the AI examples of what you want is one of the most powerful techniques. This is called "few-shot learning" - you provide a few examples and the AI learns the pattern.`,
        codeExample: `Example-Based Prompt:
"Convert these product names to URL slugs:

Input: Premium Wireless Headphones
Output: premium-wireless-headphones

Input: Organic Green Tea (500g)
Output: organic-green-tea-500g

Input: Smart Home Security Camera
Output:"`
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Write a prompt with context to generate a LinkedIn post about learning AI (specify tone and length)',
        hint: 'Include details about tone, length, and purpose',
        placeholder: 'Your prompt...',
        sampleSolution: 'Write a 100-word LinkedIn post about learning AI. Tone should be professional yet enthusiastic. Include a call-to-action to engage with the post.',
        criteria: ['specifies tone', 'mentions length', 'includes platform context']
      },
      {
        id: 2,
        task: 'Create a few-shot prompt to convert city names to airport codes (provide 2 examples)',
        hint: 'Show the pattern with examples, then ask for a new conversion',
        placeholder: 'Your prompt...',
        sampleSolution: `Convert city names to airport codes:

New York → JFK
Los Angeles → LAX
Chicago →`,
        criteria: ['includes examples', 'shows clear pattern']
      }
    ]
  },
  {
    id: 'lesson-3',
    number: 3,
    title: '🎭 Become a Prompt Director',
    slug: 'role-based-prompting',
    difficulty: 'Medium',
    sections: [
      {
        heading: 'Assigning Roles',
        content: `You can ask the AI to take on a specific role or persona. This helps frame its responses with appropriate expertise, tone, and perspective.`,
        codeExample: `Role-Based Prompt:
"You are a senior software architect with 15 years of experience. Review this database schema and suggest improvements for scalability."`
      },
      {
        heading: 'Common Useful Roles',
        content: `Different roles work for different tasks:
- Expert/Specialist (for technical depth)
- Teacher/Tutor (for explanations)
- Editor/Critic (for feedback)
- Creative Writer (for storytelling)
- Analyst (for data interpretation)`,
        codeExample: `Examples:
"Act as a professional copywriter..."
"You are a Python expert..."
"As a UX designer, evaluate..."`
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Write a prompt where the AI acts as a fitness coach giving advice on building a workout routine',
        hint: 'Start with "You are..." or "Act as..."',
        placeholder: 'Your prompt...',
        sampleSolution: 'You are a certified fitness coach with expertise in strength training. Create a 3-day beginner workout routine for someone who wants to build muscle.',
        criteria: ['assigns role', 'provides specific task']
      },
      {
        id: 2,
        task: 'Create a prompt where the AI is a code reviewer examining a Python function',
        hint: 'Specify the role and what aspect to review',
        placeholder: 'Your prompt...',
        sampleSolution: 'Act as a senior Python developer reviewing code for best practices. Review this function and suggest improvements for readability and performance.',
        criteria: ['defines expert role', 'specifies review criteria']
      }
    ]
  },
  {
    id: 'lesson-4',
    number: 4,
    title: '📊 Master Output Formatting',
    slug: 'output-formatting',
    difficulty: 'Medium',
    sections: [
      {
        heading: 'Controlling Output Structure',
        content: `You can specify exactly how you want the output formatted: bullet points, numbered lists, tables, JSON, markdown, etc. This makes the output immediately usable.`,
        codeExample: `Format Specification:
"List the top 5 programming languages for web development. Format as:
1. Language Name - Key Strength
2. Language Name - Key Strength
..."`
      },
      {
        heading: 'Structured Data Formats',
        content: `For integration with code or systems, you can request structured formats like JSON, CSV, or markdown tables.`,
        codeExample: `JSON Output Request:
"Generate 3 user profiles with name, email, and role. Output as JSON array."

Expected Output:
[
  {"name": "Alice", "email": "alice@example.com", "role": "Developer"},
  ...
]`
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Write a prompt to get a comparison of React vs Vue as a markdown table with 3 criteria',
        hint: 'Specify markdown table format and the comparison criteria',
        placeholder: 'Your prompt...',
        sampleSolution: 'Create a markdown table comparing React and Vue across these criteria: Learning Curve, Performance, and Ecosystem. Include 2-3 rows.',
        criteria: ['requests table format', 'specifies criteria']
      },
      {
        id: 2,
        task: 'Create a prompt to generate a list of 5 book recommendations in JSON format with title and author',
        hint: 'Specify JSON structure and required fields',
        placeholder: 'Your prompt...',
        sampleSolution: 'Generate 5 science fiction book recommendations. Output as JSON array with fields: title, author, and year.',
        criteria: ['requests JSON format', 'specifies fields']
      }
    ]
  },
  {
    id: 'lesson-5',
    number: 5,
    title: '🧠 Think Step-by-Step (Chain of Thought)',
    slug: 'chain-of-thought',
    difficulty: 'Medium',
    sections: [
      {
        heading: 'Thinking Step-by-Step',
        content: `Chain of Thought (CoT) prompting asks the AI to show its reasoning process. This leads to more accurate and reliable answers, especially for complex problems.`,
        codeExample: `Without CoT:
"What is 15% of 240?"

With CoT:
"What is 15% of 240? Show your step-by-step calculation."`
      },
      {
        heading: 'When to Use CoT',
        content: `Chain of Thought is particularly useful for:
- Math problems
- Logic puzzles
- Multi-step reasoning
- Complex analysis
- Debugging
- Decision-making`,
        codeExample: `CoT Prompt:
"Analyze why this marketing campaign failed. Think through:
1. Target audience alignment
2. Messaging effectiveness
3. Channel selection
4. Timing
Then provide your conclusion."`
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Write a prompt asking the AI to solve a word problem step-by-step',
        hint: 'Include "step-by-step" or "show your work"',
        placeholder: 'Your prompt...',
        sampleSolution: 'If a train travels 120 miles in 2 hours, how long will it take to travel 300 miles at the same speed? Show your step-by-step calculation.',
        criteria: ['includes problem', 'requests step-by-step reasoning']
      },
      {
        id: 2,
        task: 'Create a prompt to debug why a website is loading slowly, asking for systematic analysis',
        hint: 'Ask the AI to think through different potential causes',
        placeholder: 'Your prompt...',
        sampleSolution: 'A website is loading slowly. Analyze potential causes by thinking through: server performance, asset optimization, database queries, and network issues. Then recommend solutions.',
        criteria: ['requests systematic thinking', 'asks for reasoning process']
      }
    ]
  },
  {
    id: 'lesson-6',
    number: 6,
    title: '🔬 Advanced: Self-Consistency Magic',
    slug: 'self-consistency',
    difficulty: 'Hard',
    sections: [
      {
        heading: 'What is Self-Consistency?',
        content: `Self-Consistency is a technique where you generate multiple independent reasoning paths for the same problem and choose the most consistent answer. This improves reliability for complex reasoning tasks.

**Process:**
1. Generate multiple independent solutions (3-5 typically)
2. Compare the answers
3. Select the majority answer or most consistent reasoning
4. Verify the logic across all paths

**When to Use:**
• High-stakes decisions
• Complex math or logic problems
• Ambiguous questions
• Verification of critical outputs
• When accuracy is more important than speed`,
        codeExample: `Prompt with Self-Consistency:
"Solve this problem using 3 different approaches:

Problem: A store has a 20% off sale, then adds 10% tax. Is this the same as adding 10% tax then taking 20% off?

Approach 1: Calculate with $100 example
Approach 2: Use algebraic formula  
Approach 3: Work backwards from final price

Compare all three results and explain which is correct."`
      },
      {
        heading: 'Combining Techniques',
        content: `Advanced prompt engineering often combines multiple techniques:

**CoT + Self-Consistency:**
Generate multiple step-by-step reasoning paths

**Role + Few-Shot + CoT:**
Expert persona with examples and reasoning

**Template + Constraints + Format:**
Reusable, bounded, structured outputs

**Best Practice:**
Start simple, add complexity only when needed. Each technique adds tokens and cost.`,
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Write a self-consistency prompt for this problem: "If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?"',
        hint: 'Ask for multiple solution approaches and comparison',
        placeholder: 'Your prompt...',
        sampleSolution: 'Solve this problem using 3 different methods: (1) rate calculation, (2) proportional reasoning, (3) unit analysis. Problem: If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets? Compare all three answers.',
        criteria: ['requests multiple approaches', 'asks for comparison']
      },
      {
        id: 2,
        task: 'Create a prompt combining Role + CoT for code review: Review a Python function for security vulnerabilities',
        hint: 'Assign expert role and request step-by-step analysis',
        placeholder: 'Your prompt...',
        sampleSolution: 'You are a senior security engineer specializing in Python. Review this function for security vulnerabilities. Think through each line step-by-step: (1) identify potential issues, (2) assess severity, (3) suggest fixes. [code here]',
        criteria: ['assigns expert role', 'requests systematic analysis']
      }
    ]
  },
  {
    id: 'lesson-7',
    number: 7,
    title: '🏭 Build Production-Ready Templates',
    slug: 'production-patterns',
    difficulty: 'Hard',
    sections: [
      {
        heading: 'Template Pattern',
        content: `Create reusable prompt templates with placeholders for dynamic content.

**Benefits:**
• Consistency across similar tasks
• Easy to maintain and update
• Scalable for production use
• Version control friendly
• Team collaboration

**Structure:**
[ROLE] + [CONTEXT] + [INSTRUCTION] + [INPUT] + [FORMAT]`,
        codeExample: `Email Response Template:

You are a customer support specialist for {COMPANY_NAME}.

Context: Customer {CUSTOMER_NAME} has issue: {ISSUE_DESCRIPTION}

Write a professional, empathetic email response that:
1. Acknowledges the issue
2. Provides solution: {SOLUTION}
3. Offers next steps

Tone: {TONE}
Length: {LENGTH} words`
      },
      {
        heading: 'Meta-Prompting',
        content: `Ask the AI to help you write better prompts or improve existing ones.

**Use Cases:**
• Prompt optimization
• Finding edge cases
• Generating test cases
• Improving clarity
• A/B testing variations`,
        codeExample: `Meta-Prompt Example:
"I want to create a prompt that generates product descriptions for an e-commerce site.

Help me design a prompt template that ensures:
- SEO-friendly content
- Highlights key features
- Includes emotional appeal
- 150-200 words
- Consistent format

Provide the template with placeholders."`
      },
      {
        heading: 'Constraint Pattern',
        content: `Explicitly define what the AI should NOT do, along with what it should do.

**Types of Constraints:**
• Length limits (min/max words)
• Forbidden topics or terms
• Required inclusions
• Format restrictions
• Tone boundaries
• Factual accuracy requirements`,
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Create a reusable template for generating blog post outlines with placeholders for: topic, target audience, word count, and key points',
        hint: 'Use {PLACEHOLDER} format and include clear structure',
        placeholder: 'Your template...',
        sampleSolution: 'Create a blog post outline for: {TOPIC}\n\nTarget Audience: {AUDIENCE}\nTarget Length: {WORD_COUNT} words\nKey Points to Cover: {KEY_POINTS}\n\nProvide: 1) Catchy title, 2) Introduction hook, 3) 3-5 main sections with subpoints, 4) Conclusion with CTA',
        criteria: ['includes placeholders', 'defines structure']
      },
      {
        id: 2,
        task: 'Write a constrained prompt for AI-generated code that must: use Python 3.10+, include type hints, have docstrings, no external dependencies, max 50 lines',
        hint: 'List both requirements (✓) and constraints (✗)',
        placeholder: 'Your prompt...',
        sampleSolution: 'Write a Python function that [task].\n\nRequirements:\n✓ Python 3.10+\n✓ Type hints for all parameters\n✓ Docstring with examples\n✓ Max 50 lines\n\nConstraints:\n✗ No external dependencies\n✗ No global variables\n✗ No print statements',
        criteria: ['lists requirements', 'specifies constraints']
      }
    ]
  },
  {
    id: 'lesson-8',
    number: 8,
    title: '🔄 Polish & Perfect Your Prompts',
    slug: 'iterative-refinement',
    difficulty: 'Hard',
    sections: [
      {
        heading: 'The Iteration Process',
        content: `Prompt engineering is iterative. Start simple, then refine based on results.

**Process:**
1. Start with basic prompt
2. Test and evaluate output
3. Identify gaps or issues
4. Add constraints, examples, or context
5. Repeat until satisfactory

**Tips:**
• Keep a prompt library of what works
• Version your prompts (v1, v2, v3)
• A/B test different approaches
• Document successful patterns
• Measure improvement objectively`,
        codeExample: `Iteration Example:

V1: "Summarize this article"
→ Too long, misses key points

V2: "Summarize this article in 3 sentences"
→ Better length, but still misses key points

V3: "Summarize this article in 3 sentences, focusing on: main argument, supporting evidence, and conclusion"
→ Perfect! Specific structure guides the output`
      },
      {
        heading: 'Testing & Evaluation',
        content: `**Evaluation Criteria:**
• Accuracy: Is the information correct?
• Relevance: Does it answer the question?
• Completeness: Are all requirements met?
• Format: Is the structure correct?
• Consistency: Same prompt = similar output?

**Testing Methods:**
• Edge cases: Test with unusual inputs
• Batch testing: Run on multiple examples
• Human evaluation: Get feedback
• Automated checks: Validate format/length
• A/B comparison: Compare variations`,
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Take this basic prompt and improve it through 3 iterations: "Write code to sort a list"',
        hint: 'Each iteration should add specificity: language, requirements, constraints',
        placeholder: 'Show V1, V2, V3 with improvements...',
        sampleSolution: 'V1: Write code to sort a list\nV2: Write Python code to sort a list of integers in ascending order\nV3: Write Python code to sort a list of integers in ascending order. Include: type hints, docstring, example usage, and handle empty list edge case',
        criteria: ['shows progression', 'adds specificity']
      }
    ]
  },
  {
    id: 'review-1',
    number: 9,
    title: '🏆 Final Boss: Your Capstone Project',
    slug: 'final-project',
    difficulty: 'Expert',
    sections: [
      {
        heading: 'Capstone Project',
        content: `Apply everything you've learned to build a complete prompt engineering system for a real-world use case.

**Your Task:**
Create a comprehensive prompt system for an AI-powered content generation tool.

**Requirements:**
1. Multiple prompt templates for different content types
2. Use advanced techniques (CoT, Few-Shot, Role-based)
3. Include constraints and validation criteria
4. Document your prompts with examples
5. Test with edge cases

**Deliverables:**
• 3 prompt templates
• Test cases for each
• Documentation of techniques used
• Iteration notes showing improvements`,
      },
      {
        heading: 'What You\'ve Learned',
        content: `**Fundamentals:**
- Prompt anatomy and structure
- Zero-shot vs Few-shot learning
- Clear instructions and context

**Intermediate:**
- Role-based prompting
- Output formatting
- Chain of Thought reasoning

**Advanced:**
- Tree of Thoughts
- Self-Consistency
- Production patterns
- Iterative refinement

**Next Steps:**
- Explore RAG (Retrieval-Augmented Generation)
- Learn about fine-tuning
- Study LangChain and agent frameworks
- Practice with real-world projects`,
      }
    ],
    exercises: [
      {
        id: 1,
        task: 'Write a comprehensive prompt combining role, context, and format: Ask the AI (as a data scientist) to explain A/B testing to a marketing team, formatted as bullet points',
        hint: 'Combine role assignment, audience context, and output format',
        placeholder: 'Your prompt...',
        sampleSolution: 'You are a data scientist. Explain A/B testing to a marketing team with no technical background. Format your explanation as 5 bullet points covering: what it is, why it matters, how it works, common pitfalls, and best practices.',
        criteria: ['assigns role', 'specifies audience', 'defines format']
      },
      {
        id: 2,
        task: 'Design a complete prompt template for generating technical blog posts that includes: role, context, structure requirements, and constraints',
        hint: 'Combine multiple techniques: role-based, structured output, constraints',
        placeholder: 'Your comprehensive template...',
        sampleSolution: `You are a senior technical writer specializing in {TECHNOLOGY}.

Context: Writing for {AUDIENCE} with {EXPERIENCE_LEVEL} experience.

Create a blog post about: {TOPIC}

Structure:
1. Engaging title (60-70 chars)
2. Introduction with hook (100 words)
3. 3 main sections with code examples
4. Conclusion with key takeaways
5. Call-to-action

Requirements:
✓ 1500-2000 words
✓ Include 3 code examples
✓ SEO-optimized
✓ Conversational tone

Constraints:
✗ No jargon without explanation
✗ No opinions without evidence
✗ No outdated information`,
        criteria: ['combines techniques', 'includes template structure', 'has constraints']
      },
      {
        id: 3,
        task: 'Create a self-consistency prompt for evaluating the quality of AI-generated content across multiple criteria',
        hint: 'Ask for multiple evaluation passes with different focus areas',
        placeholder: 'Your evaluation prompt...',
        sampleSolution: `Evaluate this AI-generated content using 3 different perspectives:

Perspective 1 - Technical Accuracy:
Check facts, code examples, and technical claims. Rate 1-10.

Perspective 2 - Readability:
Assess clarity, flow, and accessibility. Rate 1-10.

Perspective 3 - Completeness:
Verify all requirements are met. Rate 1-10.

Then provide:
- Overall score (average)
- Top 3 strengths
- Top 3 areas for improvement
- Recommendation: Accept/Revise/Reject`,
        criteria: ['multiple evaluation angles', 'systematic approach', 'clear output format']
      }
    ]
  }
];

// Helper function to get lesson by slug
export const getLessonBySlug = (slug) => {
  return promptLessons.find(lesson => lesson.slug === slug);
};

// Helper function to get next lesson
export const getNextLesson = (currentSlug) => {
  const currentIndex = promptLessons.findIndex(lesson => lesson.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === promptLessons.length - 1) return null;
  return promptLessons[currentIndex + 1];
};

// Helper function to get previous lesson
export const getPreviousLesson = (currentSlug) => {
  const currentIndex = promptLessons.findIndex(lesson => lesson.slug === currentSlug);
  if (currentIndex <= 0) return null;
  return promptLessons[currentIndex - 1];
};
