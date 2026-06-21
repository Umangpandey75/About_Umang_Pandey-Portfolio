// We define a Type here (TypeScript) to make sure every achievement object has exactly these fields.
// This prevents us from accidentally misspelling 'title' or forgetting to add a 'date'.
export type Achievement = {
  date: string;
  /** Numeric sort key: YYYYMM — higher = more recent */
  sortKey: number;
  title: string;
  org: string;
  story: string;
  badge: string;
  type: "education" | "achievement" | "activity" | "cert" | "honor";
  image?: string;
  position?: string;
  color: string;
  verifyLink?: string;
  certificatePdf?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    date: "Feb 2026",
    sortKey: 202602,
    type: "cert",
    color: "#00CEA8",
    badge: "✈️",
    title: "Data Science Job Simulation-British Airways",
    org: "British Airways · Forage Virtual Internship",
    position: "Virtual Intern",
    story: "Completed virtual tasks simulating the role of a data scientist at British Airways. Scraped and analyzed customer review data using Python, performed sentiment analysis using NLP, and built predictive models to forecast booking behavior, gaining experience in translating raw data into actionable airline passenger insights.",
    verifyLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/tMjbs76F526fF5v3G/NjynCWzGSaWXQCxSX_tMjbs76F526fF5v3G_uSyhGSqWcrm23gkA6_1755582508855_completion_certificate.pdf",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/overlay/Certifications/1088455084/treasury/?profileId=ACoAAELP0JcBDyvB3pNsFgJqWAkGsjp-_KzMHAA",
  },
  {
    date: "Jan 2026",
    sortKey: 202601,
    type: "cert",
    color: "#4285F4",
    badge: "🤖",
    title: "Introduction to Generative AI",
    org: "Google",
    position: "Certified",
    story: "Completed the foundational course on Generative AI concepts offered by Google. Learned about Large Language Models (LLMs), deep learning architecture, prompt engineering techniques, and the applications of GenAI tools in building intelligent, conversational products.",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/PD2TLSXPNN7C",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/overlay/Certifications/1086248784/treasury/?profileId=ACoAAELP0JcBDyvB3pNsFgJqWAkGsjp-_KzMHAA",
  },
  {
    date: "2025",
    sortKey: 202512,
    type: "cert",
    color: "#E8A045",
    badge: "🧠",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    org: "Oracle",
    position: "Certified",
    story: "Acquired deep insights into foundational artificial intelligence concepts and Oracle Cloud Infrastructure (OCI) AI Services. Gained proficiency in deploying prebuilt machine learning models, understanding Generative AI architecture, LLMs, and executing retrieval-augmented generation (RAG) tasks in cloud systems.",
    verifyLink: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B937A7B8BCB9DB4EB342F6D0B77643543DAC1AC7D2F89BDE23E090568168D02E",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/overlay/Certifications/1908391158/treasury/?profileId=ACoAAELP0JcBDyvB3pNsFgJqWAkGsjp-_KzMHAA",
  },
  {
    date: "Aug 2025",
    sortKey: 202508,
    type: "cert",
    color: "#38BDF8",
    badge: "📊",
    title: "Data Analytics Job Simulation-Deloitte Australia",
    org: "Deloitte Australia · Forage Virtual Internship",
    position: "Virtual Intern",
    story: "Completed virtual tasks simulating the role of a data analyst at Deloitte Australia. Conducted data quality assessments, created dynamic analysis dashboards to track business metrics, and prepared client-ready presentations explaining statistical findings and data insights.",
    verifyLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_uSyhGSqWcrm23gkA6_1754109775800_completion_certificate.pdf",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/overlay/Certifications/1087845262/treasury/?profileId=ACoAAELP0JcBDyvB3pNsFgJqWAkGsjp-_KzMHAA",
  },
  {
    date: "July 2025",
    sortKey: 202507,
    type: "cert",
    color: "#22C55E",
    badge: "📊",
    title: "Data Analytics Intern — TATA",
    org: "TATA Group · Forage Virtual Internship",
    position: "Virtual Intern",
    story: "Completed a comprehensive virtual data analytics internship with TATA. Performed exploratory data analysis (EDA) using Python data tools and generative AI helpers to identify key risk indicators, clean datasets, and locate anomalies for predictive modeling workflows. It taught me that real-world data is messy, and data cleaning is 80% of the value.",
    verifyLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_uSyhGSqWcrm23gkA6_1753686819627_completion_certificate.pdf",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/overlay/Certifications/1004763147/treasury/?profileId=ACoAAELP0JcBDyvB3pNsFgJqWAkGsjp-_KzMHAA",
  },
  {
    date: "July 2025",
    sortKey: 202507,
    type: "cert",
    color: "#6B48FF",
    badge: "📈",
    title: "Data Visualisation Trainee — TATA",
    org: "TATA Group · Forage Virtual Internship",
    position: "Trainee",
    story: "Acquired trainee experience working on visual analysis representing business scenarios. Designed dashboard mockups in Power BI and formulated reports to help managers support critical decision-making. Built my first DAX calculated columns to analyze regional sales performances.",
    verifyLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_uSyhGSqWcrm23gkA6_1755420833575_completion_certificate.pdf",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/overlay/Certifications/1088264090/treasury/?profileId=ACoAAELP0JcBDyvB3pNsFgJqWAkGsjp-_KzMHAA",
  },
  {
    date: "2024",
    sortKey: 202408,
    type: "cert",
    color: "#E8A045",
    badge: "💾",
    title: "Data Analytics Certification",
    org: "Oracle",
    position: "Certified",
    story: "Learned core concepts of SQL database queries, data analysis methods, database structures, and management under the Oracle learning platform. Developed a strong appreciation for relational databases.",
    verifyLink: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=9A54AEAA3A02A266893D0D220B761166ACF900B733F4365719EDA85C57B8957B",
    certificatePdf: "https://collection.cloudinary.com/duvmtxeuy/0cb4c82f14b9e969cdb5784afc16fd09",
  },
  {
    date: "2024",
    sortKey: 202407,
    type: "cert",
    color: "#CC292B",
    badge: "☁️",
    title: "Microsoft Azure SQL Certified",
    org: "Microsoft",
    position: "Certified",
    story: "Acquired certification in deploying, configuring, and querying databases using Microsoft Azure SQL services, building the necessary foundational knowledge for cloud databases.",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/MA2KEMOILNA8",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/overlay/Certifications/1042048101/treasury/?profileId=ACoAAELP0JcBDyvB3pNsFgJqWAkGsjp-_KzMHAA",
  },
  {
    date: "2023",
    sortKey: 202312,
    type: "cert",
    color: "#6B48FF",
    badge: "💻",
    title: "Web Development (Frontend Developer)",
    org: "Infosys Springboard",
    position: "Certified",
    story: "Certified in frontend technologies including HTML5, CSS3, JavaScript, and React framework basics, establishing clean UI building capabilities.",
    verifyLink: "https://www.linkedin.com/in/umang-pandey-01b486273/details/certifications/",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/details/certifications/",
  },
  {
    date: "2023",
    sortKey: 202310,
    type: "cert",
    color: "#3776AB",
    badge: "🐍",
    title: "Crash Course on Python",
    org: "Google",
    position: "Certified",
    story: "Completed the foundational Python programming course offered by Google, developing solid skills in automation scripts, loops, data structures, and object-oriented paradigms.",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/LALQ7HXGTJ45",
    certificatePdf: "https://www.linkedin.com/in/umang-pandey-01b486273/overlay/Certifications/1085918453/treasury?profileId=ACoAAELP0JcBDyvB3pNsFgJqWAkGsjp-_KzMHAA",
  },
  {
    date: "Aug 2022 – Present",
    sortKey: 202208,
    type: "education",
    color: "#E8A045",
    badge: "🎓",
    title: "B.Tech in Computer Science and Engineering",
    org: "NITRA Technical Campus, Ghaziabad",
    position: "Undergraduate",
    story: "Began my undergraduate studies in Computer Science and Engineering. Deeply exploring database architectures, Python programming, web stacks, data structures, and algorithms. Actively engaging in data science and analytics projects.",
  },
  {
    date: "2020 – 2021",
    sortKey: 202004,
    type: "education",
    color: "#00CEA8",
    badge: "🏫",
    title: "Intermediate (Science Stream)",
    org: "MPVM Ganga Gurukulam, Prayagraj",
    position: "Student",
    story: "Completed intermediate schooling focused on the science stream, building solid analytical and mathematics foundations before starting engineering studies.",
  },
];

export const TYPE_LABEL: Record<string, string> = {
  education:   "Education",
  achievement: "Achievement",
  activity:    "Activity",
  cert:        "Certification",
  honor:       "National Honor",
};

export const FILTERS = ["All", "Education", "Certification", "Resume"];

