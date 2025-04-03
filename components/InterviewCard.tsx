import dayjs from "dayjs";
import { getRandomCompanyLogo } from "@/lib/utils";

import TechIcons from "./TechIcons";
import { CalendarDays, Star } from "lucide-react";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomAvatar from "@/components/CustomAvatar";

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techStack: string[];
  createdAt?: string;
}

const InterviewCard = ({
  interviewId,
  // userId,
  role,
  type,
  techStack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");
  const { companyName, url: companyLogoUrl } = getRandomCompanyLogo();

  return (
    <Card className="sm:w-[360px] mb-7 last:mb-0 sm:last:mb-7 sm:mr-7">
      <CardContent>
        <div className="flex flex-row items-start justify-between">
          <CustomAvatar
            className="w-16 h-16 "
            src={companyLogoUrl}
            name={companyName}
          />
          <Badge variant="secondary" className="text-base h-7">
            {normalizedType}
          </Badge>
        </div>

        <h3 className="mt-5 text-2xl font-semibold capitalize">
          {role} Interview
        </h3>

        <div className="flex gap-5 mt-5">
          <div className="flex items-center gap-2">
            <CalendarDays /> <p>{formattedDate}</p>
          </div>

          <div className="flex items-center gap-2">
            <Star /> <p>{feedback?.totalScore || "---"}/100</p>
          </div>
        </div>

        <p className="line-clamp-2 mt-5">
          {feedback?.finalAssessment ||
            "You haven't taken the interview yet. Take it now to improve your skills."}
        </p>

        <div className="flex justify-between items-center mt-5">
          <TechIcons techStack={techStack} />

          <Button asChild>
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}/`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewCard;
