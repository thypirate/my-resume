export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt",
      "Sass",
      "Tailwind",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Java",
      "Spring Boot",
      ".NET",
      "PHP",
    ],
  },
  {
    category: "Databases",
    items: ["SQL", "NoSQL", "MySQL"],
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "Docker", "Linux", "Apache", "NGINX", "GitHub", "GitLab"],
  },
  {
    category: "Languages",
    items: [
      "Portuguese (Fluent)",
      "English (Fluent)",
      "Spanish (B1)",
      "French (A2)",
    ],
  },
];
