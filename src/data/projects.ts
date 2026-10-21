export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    name: "Cabo Verde Biodiversity API",
    description:
      "An open API aggregating biodiversity data for Cabo Verde: GBIF, iNaturalist, Wikipedia and protected-area data merged with national legal lists and NGO reports extracted from PDFs, every figure traceable to its source. Redis read-through cache with stale-if-error fallback, graceful degradation when upstreams fail, rate limiting, HATEOAS links.",
    tech: ["Python", "FastAPI", "Redis", "Docker", "Railway"],
    url: "https://nosbiodiv.cv/docs",
    repo: "https://github.com/thypirate/biodiv-cv",
  },
  {
    name: "Tech Cases",
    description:
      "A timeline of legal cases against big tech companies, mostly over privacy, with sources for every case. A Turborepo monorepo: a Hono + SQLite API and a Next.js + Tailwind site, each deployed as its own Docker service.",
    tech: ["TypeScript", "Next.js", "Hono", "SQLite", "Tailwind", "Turborepo"],
    url: "https://web-production-cf11e.up.railway.app/",
    repo: "https://github.com/thypirate/tech-cases",
  },
  {
    name: "Interactive Resume",
    description:
      "This site! A top-down hub world built with React, PixiJS and TypeScript where each zone reveals a section of the portfolio.",
    tech: ["React", "PixiJS", "TypeScript"],
    url: "https://thypirate.github.io/my-resume/",
    repo: "https://github.com/thypirate/my-resume",
  },
  {
    name: "Europe Recycling",
    description:
      "An interactive 3D globe visualising municipal waste recycling rates across Europe, built with React, Three.js and react-globe.gl.",
    tech: ["React", "Three.js", "react-globe.gl"],
    repo: "https://github.com/thypirate/europe-recycling",
  },
  {
    name: "Mr. White VScode Extension",
    description: "A social deduction game in vscode.",
    tech: ["React", "TypeScript"],
    repo: "https://github.com/thypirate/vsmrwhite",
  },
  {
    name: "Red Clusters Detector",
    description:
      "A Python script that detects red clusters in images using OpenCV and NumPy.",
    tech: ["Python", "OpenCV", "NumPy"],
    repo: "https://github.com/thypirate/red-clusters-detector",
  },
];
