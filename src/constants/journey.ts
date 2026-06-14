// ─────────────────────────────────────────────────────────────────────────────
// constants/journey.ts
// Timeline data for the Journey & Achievements page — chronological order.
// ─────────────────────────────────────────────────────────────────────────────

export type JourneyType =
  | "achievement"
  | "education"
  | "community"
  | "recognition"
  | "certification";

export interface JourneyItem {
  /** Unique slug for React key / DOM id */
  id: string;
  /** Human-readable date label shown on the card (e.g. "April 2023") */
  date: string;
  /** ISO-style sort key for correct chronological ordering (YYYY-MM) */
  sortKey: string;
  /** Headline title of the milestone */
  title: string;
  /** Supporting detail / organisation / location */
  body: string;
  /** Category tag — drives icon colour in the timeline */
  type: JourneyType;
}

export const journeyItems: JourneyItem[] = [
  {
    id:      "tata-analytics-2025",
    date:    "July 2025",
    sortKey: "2025-07",
    title:   "Data Analytics Intern — TATA (Forage)",
    body:    "Performed Exploratory Data Analysis (EDA) using Python and GenAI to detect anomalies, analyze quality, and identify risk indicators.",
    type:    "certification",
  },
  {
    id:      "tata-viz-2025",
    date:    "May 2025",
    sortKey: "2025-05",
    title:   "Data Visualisation Trainee — TATA (Forage)",
    body:    "Executed visual analytics, framing business scenarios, designing dashboards in Power BI, and delivering data-driven insights.",
    type:    "certification",
  },
  {
    id:      "oracle-analytics-cert",
    date:    "2024",
    sortKey: "2024-06",
    title:   "Data Analytics Certification",
    body:    "Certified by Oracle in foundational and advanced Data Analytics concepts.",
    type:    "certification",
  },
  {
    id:      "azure-sql-cert",
    date:    "2024",
    sortKey: "2024-08",
    title:   "Microsoft Azure SQL Certified",
    body:    "Microsoft certification in Azure SQL database implementation and management.",
    type:    "certification",
  },
  {
    id:      "google-python-cert",
    date:    "2023",
    sortKey: "2023-10",
    title:   "Crash Course on Python",
    body:    "Google certification covering Python programming, data structures, and automation scripting.",
    type:    "certification",
  },
  {
    id:      "infosys-web-cert",
    date:    "2023",
    sortKey: "2023-12",
    title:   "Web Development (Frontend)",
    body:    "Infosys Springboard certification covering HTML5, CSS3, JavaScript, and React basics.",
    type:    "certification",
  },
  {
    id:      "btech-cse-2022",
    date:    "August 2022",
    sortKey: "2022-08",
    title:   "B.Tech CSE Begun",
    body:    "NITRA Technical Campus, Ghaziabad. Pursuing Bachelor of Technology in Computer Science and Engineering.",
    type:    "education",
  },
  {
    id:      "intermediate-2021",
    date:    "March 2021",
    sortKey: "2021-03",
    title:   "Intermediate Completed",
    body:    "MPVM Ganga Gurukulam, Prayagraj. Completed science stream education.",
    type:    "education",
  },
];
