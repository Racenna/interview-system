import Agent from "@/components/Agent";
import CustomAvatar from "@/components/CustomAvatar";
import TechIcons from "@/components/TechIcons";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: RouteParams) => {
  const { id: interviewId } = await params;
  const interview = await getInterviewById(interviewId);
  const user = await getCurrentUser();

  if (!interview || !user) redirect("/");

  const normalizedType = /mix/gi.test(interview.type)
    ? "Mixed"
    : interview.type;
  const { companyName, url: companyLogoUrl } = interview.companyLogo;

  return (
    <div>
      <div className="flex  flex-row flex-wrap  items-center gap-4 mb-4">
        <CustomAvatar name={companyName} src={companyLogoUrl} />
        <h3 className="">{interview.role} Interview</h3>
        <TechIcons techStack={interview.techStack} />
        <Badge variant="secondary" className="text-base h-7 mt-1 ml-4">
          {normalizedType}
        </Badge>
      </div>

      <Agent
        type="interview"
        userId={user.id}
        userName={user.name}
        interviewId={interviewId}
        questions={interview.questions}
      />
    </div>
  );
};

export default Page;
