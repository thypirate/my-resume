export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    name: "Interactive Resume",
    description:
      "This site! A top-down hub world built with React, PixiJS and TypeScript where each zone reveals a section of the portfolio.",
    tech: ["React", "PixiJS", "TypeScript"],
    repo: "https://github.com/thypirate/recycling",
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
