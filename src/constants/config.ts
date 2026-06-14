// ─────────────────────────────────────────────────────────────────────────────
// constants/config.ts
// Single source of truth for personal info, contact links, and site metadata.
// Import this anywhere — never hardcode these values inside components.
// ─────────────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  /** Full display name */
  name: string;
  /** One-line professional tagline shown in the hero */
  tagline: string;
  /** Short bio for the hero / meta description (~2 sentences) */
  bio_short: string;
  /** Extended bio for the About page */
  bio_long: string;
  /** Contact email */
  email: string;
  /** Contact phone (E.164 format) */
  phone: string;
  /** Physical location */
  location: string;
  /** GitHub profile URL */
  github: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /** Path / URL to downloadable résumé */
  resume_url: string;
  /** Current CGPA string */
  cgpa: string;
  /** HTML <title> tag string */
  html: { title: string };
}

export const config: SiteConfig = {
  name:       "Umang Pandey",
  tagline:    "Data Analyst · Python Developer · CS Student",
  bio_short:
    "A motivated Computer Science student skilled in Python, SQL, and Power BI. Experienced in data analysis, dashboard building, and delivering data-driven insights.",
  bio_long:
    "I am a Computer Science student at NITRA Technical Campus, Ghaziabad, with a passion for data analysis and visualization. My academic projects and internships have allowed me to gain hands-on experience in python data libraries, SQL databases, and Power BI dashboards. I learn fast, take ownership of what I build, and enjoy transforming complex datasets into clear, actionable visual insights to support strategic decision-making.",
  email:      "umangpandey.co@gmail.com",
  phone:      "+91 7518593228",
  location:   "Ghaziabad, Uttar Pradesh, India",
  github:     "https://github.com/Umangpandey75",
  linkedin:   "https://linkedin.com/in/umang-pandey-01b486273",
  resume_url: "/resume.pdf",
  cgpa:       "CSE",
  html: {
    title: "Umang Pandey | Portfolio",
  },
};
