import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
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

  console.log("Feedback:", feedback);

  return <div>feedback page in progress</div>;
};

export default Page;
