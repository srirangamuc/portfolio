export const personalInfo = {
  name: "Srirangam Umesh Chandra",
  tagline: "AI Engineer & Backend Architect",
  bio: "A Computer Science student who spends more time talking to LLMs and distributed systems than actual humans. I specialize in building things that scale—whether it's a high-throughput Go backend or a RAG pipeline that actually remembers what you said two minutes ago. Currently on a mission to reduce latency until it's basically time travel and trying to convince my code that 'it works on my machine' is a valid deployment strategy.",
  highlights: [
    "Expertise in LLM Orchestration, RAG systems, and Autonomous Agents",
    "Scalable Backend Architect (Golang, Python, Django, FastAPI)",
    "Cloud Native & DevOps enthusiast (AWS, Docker, Kubernetes, CI/CD)",
  ],
  email: "dev.srirangam.uc@gmail.com",
  github: "https://github.com/srirangamuc",
  linkedin: "https://www.linkedin.com/in/srirangam-umesh-chandra",
  leetcode: "https://leetcode.com/xinirs",
};

export const experiences = [
  {
    role: "Data Science & Backend Intern",
    company: "Silo Fortune",
    period: "Aug 2025 – Present",
    description:
      "Architected a real-time orchestration layer for Gau Sampurna using WebSockets and LiveKit. Built a scalable time-series forecasting pipeline for 1,000+ market series, achieving a 93.6% reduction in API latency through multi-level Redis caching and optimized execution plans.",
  },
  {
    role: "Software Development Engineer Intern",
    company: "LifeCykul",
    period: "May 2025 – Aug 2025",
    description:
      "Spearheaded the legacy migration of Campus.Life, refactoring PHP/SQL monoliths into modular Django ORM architectures. Designed and deployed a standalone URL Shortener Microservice to ensure isolated scaling.",
  },
  {
    role: "Undergraduate Researcher",
    company: "IIIT Sri City",
    period: "Jul 2024 – Present",
    description:
      "Developed a Medical VQA System using T5 and PathGenCLIP, achieving 85.4% accuracy on TCGA datasets. Implemented SBERT for clinical reasoning validation, outperforming traditional BLEU metrics.",
  },
  {
    role: "Generative AI Developer",
    company: "Stealth Startup",
    period: "Nov 2024 – Feb 2025",
    description:
      "Engineered a RAG pipeline utilizing a fine-tuned T5 model for automated purchase order summarization.",
  },
  {
    role: "Junior Machine Learning Intern",
    company: "Omdena (France Chapter)",
    period: "Jul 2024 – Sep 2024",
    description:
      "Automated data pipelines using BeautifulSoup and Selenium to aggregate 1,000+ housing listings. Built a Streamlit and Plotly dashboard that reduced manual data review time by 60%.",
  },
];

export const projects = [
  {
    name: "SBucket",
    description:
      "High-performance S3-compatible object storage system built in Go. Achieved 40 MB/s throughput for large file transfers with optimized buffer management.",
    tech: ["Go", "MinIO", "PostgreSQL", "JWT", "Docker"],
    link: "https://github.com/code-cults/sbucket",
    linkLabel: "GitHub",
  },
  {
    name: "Agromart",
    description:
      "E-commerce platform with compound indexing and server-side Redis caching, reducing data retrieval time by 40%.",
    tech: ["MERN Stack", "Redis", "MongoDB", "Chart.js"],
    link: "https://agromart-mern-frontend.onrender.com",
    linkLabel: "Live",
  },
  {
    name: "Book Recommendation Engine",
    description:
      "End-to-end NLP pipeline achieving 92% Precision and 95% Recall using TF-IDF and Cosine Similarity.",
    tech: ["Python", "Scikit-learn", "Scrapy", "Pandas"],
    link: "https://github.com/srirangamuc/",
    linkLabel: "GitHub",
  },
];

export const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "Golang", "SQL", "R", "Java", "JavaScript"],
  },
  {
    category: "AI & Data Science",
    skills: ["PyTorch", "Transformers", "LangChain", "RAG", "LLMs", "Computer Vision", "Time-Series Analysis"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS (ECS, SageMaker, S3)", "Docker", "Kubernetes", "CI/CD", "GitHub Actions"],
  },
  {
    category: "Backend & Systems",
    skills: ["Django", "FastAPI", "Redis", "PostgreSQL", "MinIO", "Microservices", "System Design"],
  },
];

export const education = {
  degree: "B.Tech (Hons.) — Computer Science",
  institution: "IIIT Sri City",
  period: "2022 – 2026",
  cgpa: "8.68 / 10",
};

export const leadership = [
  "Led AI outreach programs and technical workshops under the AI for Society group at IIIT Sri City.",
  "Coordinated logistics for Abhisarga '24 festival, managing operations for 2000+ attendees.",
];