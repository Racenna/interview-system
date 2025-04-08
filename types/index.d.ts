type FormType = "sign-in" | "sign-up";

interface User {
  id: string;
  name: string;
  email: string;
}

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
  companyLogo: CompanyIcon;
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

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

interface SignInParams {
  email: string;
  idToken: string;
}
