export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export const experience: Experience[] = [
  {
    company: "NiW IT Services and Consulting — Portugal",
    role: "Lead Developer & Front End Developer",
    period: "2023 – Present",
    description:
      "Responsible for international project technical overview and architecture design. Led website development and optimization, managed project support and REST integrations.",
    tech: [
      "Nuxt 3",
      "Vue.js",
      "TypeScript",
      "Sass",
      "NestJS",
      "GitHub",
      "GitLab",
    ],
  },
  {
    company: "Jamhubsolutions — Portugal",
    role: "Full Stack Developer",
    period: "2021 – 2022",
    description:
      "Maintained and optimized legacy web platform end-to-end. Handled front-end UI modernization alongside back-end Java/Spring services and REST integrations.",
    tech: [
      "jQuery",
      "JSP",
      "Java",
      "Spring Boot",
      "MySQL",
      "GulpJS",
      "ReactJS",
      "GitLab",
    ],
  },
  {
    company: "Unitel T+ — Cabo Verde",
    role: "Information Systems Assistant",
    period: "2018 – 2019",
    description:
      "Responsible for test planning and execution across manual and automated test suites. Developed internal tooling to support QA workflows.",
    tech: ["Selenium", "C#", "SpecFlow"],
  },
  {
    company: "Prime Consulting — Cabo Verde",
    role: "Intern",
    period: "2016 – 2017",
    description:
      "Designed layouts and developed websites for client projects, maintaining and extending existing codebases.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
      "GulpJS",
      "CoffeeScript",
      "Bootstrap 3",
      "PHP",
    ],
  },
];
