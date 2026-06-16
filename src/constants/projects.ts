// ─────────────────────────────────────────────────────────────────────────────
// constants/projects.ts
// All portfolio project data.
// ─────────────────────────────────────────────────────────────────────────────

export type TProject = {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  sourceCodeLink: string;
  liveLink?: string;
};

export const projects: TProject[] = [
  {
    name: "Heart-IQ — Cardiac Prediction System",
    description:
      "Built an end-to-end cardiac risk prediction web app that analyzes patient clinical profiles and outputs heart disease probability scores using a pre-trained Scikit-learn ML model. Features SMTP OTP recovery and interactive Plotly visualizations.",
    tags: [
      { name: "Python",        color: "blue-text-gradient"   },
      { name: "Streamlit",     color: "green-text-gradient"  },
      { name: "Scikit-learn",  color: "pink-text-gradient"   },
      { name: "Plotly",        color: "blue-text-gradient"   },
    ],
    image:          "/project_fakebuster.png",
    sourceCodeLink: "https://github.com/Umangpandey75/HeartIQ-4th-year-project",
    liveLink:       "https://heartiqsystem.streamlit.app/",
  },
  {
    name: "MindMapr-AI",
    description:
      "A Python-powered utility that leverages generative AI models to convert textual brainstorming and notes into structured, hierarchical visual mind maps.",
    tags: [
      { name: "Python",        color: "blue-text-gradient"   },
      { name: "Generative AI", color: "green-text-gradient"  },
      { name: "Data Viz",      color: "pink-text-gradient"   },
    ],
    image:          "/project_mindmetric.png",
    sourceCodeLink: "https://github.com/Umangpandey75/MindMapr-AI",
    liveLink:       "https://mindmetric001.vercel.app/",
  },
  {
    name: "EmailSarthi",
    description:
      "A lightweight email automation and broadcasting platform that lets users send batch emails and custom templates with structured input validation and logs.",
    tags: [
      { name: "HTML5",         color: "blue-text-gradient"   },
      { name: "CSS3",          color: "green-text-gradient"  },
      { name: "JavaScript",    color: "pink-text-gradient"   },
    ],
    image:          "/project_emailsarthi.png",
    sourceCodeLink: "https://github.com/Umangpandey75/EmailSarthi",
    liveLink:       "https://emailsarthi.vercel.app/",
  },
  {
    name: "Genderify-AI",
    description:
      "A full-stack image and video classification application designed to detect gender (male or female) in real-time. Features a high-accuracy, fine-tuned deep learning model served via a Python Flask API backend and an elegant, responsive React frontend.",
    tags: [
      { name: "Python",        color: "blue-text-gradient"   },
      { name: "TensorFlow",    color: "green-text-gradient"  },
      { name: "Flask & React", color: "pink-text-gradient"   },
    ],
    image:          "/project_genderify.png",
    sourceCodeLink: "https://github.com/Umangpandey75/Genderify-AI-",
    liveLink:       "https://genderifyai.vercel.app/",
  },
  {
    name: "Voice to Story Generator",
    description:
      "An AI-powered creative writing studio that transforms spoken conversations, voice recordings, and dialogue audio files into rich, stylized narrative stories. Built on the MERN stack with the official Google Gemini SDK.",
    tags: [
      { name: "Gemini SDK",    color: "blue-text-gradient"   },
      { name: "MERN Stack",    color: "green-text-gradient"  },
      { name: "Voice AI",      color: "pink-text-gradient"   },
    ],
    image:          "/project_voice_story.png",
    sourceCodeLink: "https://github.com/Umangpandey75/Voice-to-Story-Generator",
  },
  {
    name: "HR Analytics Dashboard",
    description:
      "An interactive Power BI report designed to analyze employee attrition, workforce demographics, salary distribution, and employee retention trends. Integrates CSV dataset, models complex DAX KPIs, and delivers data-driven insights.",
    tags: [
      { name: "Power BI",      color: "blue-text-gradient"   },
      { name: "DAX & Excel",   color: "green-text-gradient"  },
      { name: "Data Viz",      color: "pink-text-gradient"   },
    ],
    image:          "/project_hr_dashboard.png",
    sourceCodeLink: "https://github.com/Umangpandey75/HR-Analytics-Dashboard",
    liveLink:       "https://app.fabric.microsoft.com/groups/me/reports/06041f81-db2c-4ef0-a0b6-d6e97363aa51/1901196bc7c6d04666c9?ctid=8869cc11-7d78-4a5c-8378-b78ce12cb498&experience=power-bi",
  },
  {
    name: "Employee Performance Dashboard",
    description:
      "Engineered an interactive Power BI dashboard by integrating data from multiple sources (Excel, SQL Server, CSV), reducing manual reporting time by 10%. Designed complex DAX measures to derive KPIs including performance scores, attendance rates, and departmental comparisons.",
    tags: [
      { name: "Power BI",      color: "blue-text-gradient"   },
      { name: "SQL Server",    color: "green-text-gradient"  },
      { name: "Excel & DAX",   color: "pink-text-gradient"   },
    ],
    image:          "/project_gitglow.png",
    sourceCodeLink: "https://github.com/Umangpandey75",
  },
  {
    name: "SpeechTrans — AI Speech Translation",
    description:
      "An AI-based speech translation system that automatically converts English audio/video into natural, synchronized Hindi speech. Ideal for dubbing, translation accessibility, and cross-language communication.",
    tags: [
      { name: "Python",        color: "blue-text-gradient"   },
      { name: "Jupyter",       color: "green-text-gradient"  },
      { name: "AI Dubbing",    color: "pink-text-gradient"   },
    ],
    image:          "/project_yogaflow.png",
    sourceCodeLink: "https://github.com/Umangpandey75/SpeechTrans",
  },
  {
    name: "Resume-Builder",
    description:
      "A responsive client-side web application designed to help job-seekers build, preview, and format resume templates dynamically using structured input forms and print-ready styles.",
    tags: [
      { name: "HTML5 & CSS3",  color: "blue-text-gradient"   },
      { name: "JavaScript",    color: "green-text-gradient"  },
    ],
    image:          "/project_portfolio3d.png",
    sourceCodeLink: "https://github.com/Umangpandey75/Resume-Builder",
  },
  {
    name: "Vocal-AI",
    description:
      "A voice analytics and recording tool in Python that captures acoustic characteristics, performs local speech-to-text, and parses semantic keywords.",
    tags: [
      { name: "Python",        color: "blue-text-gradient"   },
      { name: "Voice Analysis", color: "green-text-gradient" },
      { name: "NLP",           color: "pink-text-gradient"   },
    ],
    image:          "/project_vocalai.png",
    sourceCodeLink: "https://github.com/Umangpandey75/Vocal-AI",
  },
];
