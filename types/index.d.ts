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
  interviewId: string;
  totalScore: number;
  categoryScores: {
    name: string;
    score: number;
    comment: string;
  }[];
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
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

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
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

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}
