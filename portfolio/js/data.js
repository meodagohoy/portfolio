// EDITABLE PORTFOLIO DATA — update contact links, resume path, and project links here.
const portfolioData = {
  name: "Romeo Dagohoy",
  shortName: "Romeo",
  title: "Aspiring Full-Stack Developer & AI Engineer",
  email: "your.email@example.com", // [ADD EMAIL]
  phone: "+63 XXX XXX XXXX", // [ADD PHONE]
  github: "https://github.com/yourusername", // [ADD GITHUB]
  linkedin: "https://www.linkedin.com/in/yourusername", // [ADD LINKEDIN]
  resumePath: "assets/Romeo-Dagohoy-Resume.pdf", // Add the real file here before setting resumeAvailable to true.
  resumeAvailable: false,
  profileImage: "assets/images/profile.jpg", // [ADD PROFILE PHOTO]
  otherLink: "", // [ADD LINK]
  nav: [
    "HOME",
    "ABOUT",
    "SKILLS",
    "PROJECTS",
    "EXPERIENCE",
    "EDUCATION",
    "LEARNING",
    "CONTACT",
  ],
  statuses: [
    ["WEB APPLICATIONS", "complete"],
    ["AI AUTOMATION", "complete"],
    ["FULL-STACK DEVELOPMENT", "partial"],
    ["PYTHON", "queued"],
  ],
  traits: [
    "PROBLEM SOLVER",
    "FAST LEARNER",
    "DETAIL-ORIENTED",
    "CREATIVE",
    "PERSISTENT",
    "ADAPTABLE",
  ],
  skills: [
    ["HTML", "INTERMEDIATE"],
    ["CSS", "INTERMEDIATE"],
    ["JavaScript", "BASIC"],
    ["Git", "INTERMEDIATE"],
    ["GitHub", "INTERMEDIATE"],
    ["Bootstrap", "BASIC"],
    ["Figma", "BEGINNER"],
    ["VS Code", "INTERMEDIATE"],
    ["AI Tools", "INTERMEDIATE"],
  ],
  learning: ["JavaScript", "AI / Automation", "Python"],
  projects: [
    {
      number: "01",
      featured: true,
      type: "FEATURED AI BUILD",
      name: "MODERATOR",
      subtitle: "AI-Powered Content Moderation Assistant",
      description:
        "An AI-powered assistant built with Microsoft Copilot Studio to support content moderation workflows by reviewing content against defined policies and providing an approval or rejection recommendation with an explanation for its decision.",
      role: "CREATOR / CONTENT MODERATOR",
      platform: "MICROSOFT COPILOT STUDIO",
      tags: ["AI", "AUTOMATION", "PROMPT ENGINEERING", "CONTENT ANALYSIS"],
      challenge:
        "Creating detailed yet concise instructions that produce accurate, consistent decisions.",
      learned: [
        "Prompt engineering",
        "Clear instructions",
        "Knowledge design",
        "Agent behavior",
        "Iterative testing",
        "Output accuracy",
      ],
      workflow: [
        "CONTENT",
        "AI AGENT",
        "POLICY ANALYSIS",
        "DECISION",
        "APPROVE / REJECT",
        "REASONING",
      ],
      imagePath: "assets/images/moderator/sanitized-preview.jpg",
      link: null,
      linkLabel: "PORTFOLIO-SAFE DETAILS ONLY",
    },
    {
      number: "02",
      featured: false,
      type: "WEB APPLICATION",
      name: "AnimePlaka",
      subtitle: "Anime Website & Tracking Platform",
      description:
        "An anime-focused website designed for browsing anime and tracking viewing activity.",
      tags: ["HTML", "CSS", "JAVASCRIPT"],
      details: [
        "Anime browsing",
        "User accounts",
        "Watch history",
        "Ongoing / completed tracking",
      ],
      note: "Created the project’s unique name and brand, and contributed to the website concept and development.",
      imagePath: "assets/images/animeplaka/preview.jpg",
      link: null,
      linkLabel: "COMING SOON",
    },
    {
      number: "03",
      featured: false,
      type: "WEB EXPERIENCE",
      name: "Tindog",
      subtitle: "Dog Dating & Discovery Website",
      description:
        "A playful web experience inspired by modern dating platforms, redesigned around browsing and discovering dogs.",
      tags: ["HTML", "CSS", "BOOTSTRAP"],
      details: [
        "Dog profile browsing",
        "Matching-inspired interface",
        "Responsive UI",
        "Card-based presentation",
      ],
      note: "Draft contribution: Designed and developed the website interface and core user experience using HTML, CSS, and Bootstrap.",
      imagePath: "assets/images/tindog/preview.jpg",
      link: null,
      linkLabel: "[GITHUB LINK]",
    },
    {
      number: "04",
      featured: false,
      type: "ACADEMIC PROJECT",
      name: "Online Grading\nManagement System",
      subtitle: "Academic Web Development Project",
      description: "A digital solution for school-related grading management.",
      tags: ["[TO BE CONFIRMED]"],
      details: [
        "Technologies: [TO BE CONFIRMED]",
        "Features: [TO BE CONFIRMED]",
        "Contribution: [TO BE CONFIRMED]",
      ],
      note: "This project may later be recreated and updated as a stronger portfolio build.",
      imagePath: "",
      link: null,
      linkLabel: "[TO BE ADDED]",
    },
  ],
  experience: [
    {
      date: "JUN 2026 — PRESENT",
      company: "ACCENTURE",
      title: "Trust & Safety New Associate",
      description:
        "Developing rigor around content moderation, policy-based decision making, attention to detail, and process improvement. This professional context sharpened my interest in practical AI applications, prompt engineering, and building helpful AI agents.",
    },
    {
      date: "6-MONTH INTERNSHIP",
      company: "REGISTRY OF DEEDS",
      title: "IT Support Intern",
      description:
        "Supported system maintenance, hardware and network-related needs, computer updates, and basic troubleshooting.",
    },
  ],
  education: {
    school: "Pamantasan ng Lungsod ng San Pablo",
    degree: "Bachelor's Degree — Web & Game Development",
    detail: "4-year program",
    capstone: "[TO BE ADDED]",
  },
  certifications: [
    [
      "01",
      "[ADD CERTIFICATION NAME]",
      "ACCENTURE",
      "[ADD DATE]",
      "[ADD CREDENTIAL LINK]",
    ],
    [
      "02",
      "[ADD CERTIFICATION NAME]",
      "[ADD ORGANIZATION]",
      "[ADD DATE]",
      "[ADD CREDENTIAL LINK]",
    ],
  ],
};
