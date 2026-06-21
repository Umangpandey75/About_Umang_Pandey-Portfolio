// ─────────────────────────────────────────────────────────────────────────────
// constants/skills.ts
// All skill data grouped into categories with full TypeScript types.
// ─────────────────────────────────────────────────────────────────────────────

export interface SkillCategory {
  /** Display title for the category group */
  title: string;
  /** Emoji icon representing the category */
  icon: string;
  /** Ordered list of skill / tool names */
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title:  "Programming & Databases",
    icon:   "💻",
    skills: [
      "Python",
      "SQL",
      "SQL Server",
      "MySQL",
    ],
  },
  {
    title:  "Data Visualization & BI",
    icon:   "📊",
    skills: [
      "Power BI",
      "Excel",
      "DAX",
    ],
  },
  {
    title:  "Data Analysis & Libraries",
    icon:   "📈",
    skills: [
      "Exploratory Data Analysis (EDA)",
      "Predictive Modeling",
      "Data Wrangling",
      "Data Cleaning",
      "Pandas",
      "NumPy",
      "Scikit-learn",
    ],
  },
  {
    title:  "Web Technologies",
    icon:   "🖥️",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
    ],
  },
  {
    title:  "DevOps & Tooling",
    icon:   "🛠️",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Jupyter Notebook",
    ],
  },
];
