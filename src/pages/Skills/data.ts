// We store data (like our skills list) in a separate file from the UI components.
// This is a great practice because it keeps our React code clean and makes it easy to update information later!

export const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export type Skill = {
  name: string;
  cat: string;
  icon: string;
  color: string;
};

export const SKILLS: Skill[] = [
  /* Languages */
  { name: "Python",     cat: "Language",  icon: `${CDN}/python/python-original.svg`,          color: "#3776AB" },
  { name: "SQL",        cat: "Database",  icon: `${CDN}/postgresql/postgresql-original.svg`,  color: "#336791" },
  { name: "SQL Server", cat: "Database",  icon: `${CDN}/microsoftsqlserver/microsoftsqlserver-plain.svg`, color: "#CC292B" },
  { name: "MySQL",      cat: "Database",  icon: `${CDN}/mysql/mysql-original.svg`,            color: "#00758F" },
  /* Data Analysis */
  { name: "Pandas",     cat: "Analysis",  icon: `${CDN}/pandas/pandas-original.svg`,          color: "#150458" },
  { name: "NumPy",      cat: "Analysis",  icon: `${CDN}/numpy/numpy-original.svg`,           color: "#013243" },
  /* Web Technologies */
  { name: "React",      cat: "Web Tech",  icon: `${CDN}/react/react-original.svg`,           color: "#61DAFB" },
  { name: "JavaScript", cat: "Web Tech",  icon: `${CDN}/javascript/javascript-original.svg`,  color: "#F7DF1E" },
  { name: "HTML5",      cat: "Web Tech",  icon: `${CDN}/html5/html5-original.svg`,            color: "#E34F26" },
  { name: "CSS3",       cat: "Web Tech",  icon: `${CDN}/css3/css3-original.svg`,              color: "#264DE4" },
  /* Tools */
  { name: "Git",        cat: "Tools",     icon: `${CDN}/git/git-original.svg`,                color: "#F05032" },
  { name: "GitHub",     cat: "Tools",     icon: `${CDN}/github/github-original.svg`,          color: "#ffffff"  },
  { name: "VS Code",    cat: "Tools",     icon: `${CDN}/vscode/vscode-original.svg`,          color: "#007ACC" },
  { name: "Jupyter",    cat: "Tools",     icon: `${CDN}/jupyter/jupyter-original.svg`,        color: "#F37626" },
];

export const CATEGORIES = ["All", "Language", "Database", "Analysis", "Web Tech", "Tools"];

export const CAT_COLOR: Record<string, string> = {
  All:      "#E8A045",
  Language: "#3776AB",
  Database: "#336791",
  Analysis: "#150458",
  "Web Tech": "#61DAFB",
  Tools:    "#F05032",
};

/* ── Vibe-Coding Terminal ─────────────────────────── */
export const CODE_LINES = [
  { text: "const umang = new DataAnalyst({", color: "#E8A045" },
  { text: '  name: "Umang Pandey",', color: "#61DAFB" },
  { text: '  stack: ["Python", "SQL", "Power BI"],', color: "#86efac" },
  { text: '  passion: "Unlocking insights from data",', color: "#c4b5fd" },
  { text: "  available: true,  // ✅ Open to Internship", color: "#6ee7b7" },
  { text: "});", color: "#E8A045" },
  { text: "", color: "" },
  { text: "umang.analyzeData({", color: "#f9a8d4" },
  { text: '  source: "📊 multiple databases (SQL, Excel)",', color: "#fcd34d" },
  { text: '  tools: ["Power BI", "Python (Pandas)", "SQL Server"],', color: "#7dd3fc" },
  { text: '  deliver: "actionable business insights",', color: "#6ee7b7" },
  { text: "});", color: "#f9a8d4" },
  { text: "", color: "" },
  { text: "// 🚀 Hands-on Analytics Projects", color: "#94a3b8" },
  { text: "// 🏆 Tata virtual internship experiences", color: "#94a3b8" },
  { text: "// 🎓 B.Tech CSE Student (Class of 2026)", color: "#94a3b8" },
];
