import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import dayjs from "dayjs";
import { CalendarDays, Star } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: RouteParams) => {
  const { id: interviewId } = await params;

  const user = await getCurrentUser();
  const interview = await getInterviewById(interviewId);

  if (!interview || !user) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId,
    userId: user.id,
  });

  if (!feedback) return <div>Feedback not found</div>;

  const formattedDate = dayjs(feedback.createdAt).format("MMM D, YYYY");

  return (
    <div>
      <h1>Feedback o the Interview - {interview.role}</h1>
      <div className="flex gap-5 mt-5">
        <div className="flex gap-2">
          <CalendarDays /> <p>{formattedDate}</p>
        </div>
        <div className="flex gap-2">
          <Star /> <p>{feedback.totalScore}/100</p>
        </div>
      </div>
      <div className="mt-5">
        {feedback.categoryScores.map((category, idx) => (
          <div key={category.name} className="not-first:mt-2">
            <b>
              {idx + 1}. {category.name} - Score: {category.score}
            </b>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <b>Strengths:</b>{" "}
        {feedback.strengths.map((strength) => (
          <p key={strength}>{strength}</p>
        ))}
      </div>
      <div className="mt-5">
        <b>Area for improvement:</b>{" "}
        <span>{feedback.areasForImprovement.join(", ")}</span>
      </div>
      <div className="mt-5">
        <b>Final assessment:</b> <span>{feedback.finalAssessment}</span>
      </div>
      <div className="flex justify-center mt-5">
        <Button asChild>
          <Link href="/">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
