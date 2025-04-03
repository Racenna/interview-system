type FormType = "sign-in" | "sign-up";

interface Interview {
  id: string;
  userId: string;
  role: string;
  type: string;
  techStack: string[];
  level: string;
  questions: string[];
  finalized: boolean;
  createdAt: string;
}

interface Feedback {
  id: string;
  totalScore: number;
  createdAt: string;
  finalAssessment: string;
  // TODO - fields
}

interface TechIcon {
  techName: string;
  techAlias: string;
  url: string;
}

interface CompanyIcon {
  companyName: string;
  url: string;
}
