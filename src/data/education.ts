export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  highlights: string[];
}

export const education: Education[] = [
  {
    institution: "Instituto Superior de Engenharia do Porto",
    degree: "Master",
    field: "Software Engineering",
    period: "2019 – 2024",
    highlights: ["Portugal"],
  },
  {
    institution: "Universidade Jean Piaget",
    degree: "Degree",
    field: "Systems and Computer Engineering",
    period: "2012 – 2016",
    highlights: ["Cabo Verde"],
  },
];
