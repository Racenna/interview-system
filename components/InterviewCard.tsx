import React from "react";
import dayjs from "dayjs";
import placeholderImage from "@/assets/react.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

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
  userId,
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

  return (
    <div className="border-2 m-1 w-[360px] max-sm:w-full">
      <div>
        <div>
          <div>
            <p>{normalizedType}</p>
          </div>
          <Image
            src={placeholderImage}
            alt="placeholder"
            width={45}
            height={45}
            className="rounded-full border-2"
          />

          <h3>{role} interview</h3>

          <div>
            <div>
              (calendar img) <p>{formattedDate}</p>
            </div>

            <div>
              (star/rating img) <p>{feedback?.totalScore || "N/A"}/100</p>
            </div>
          </div>
          <p className="line-clamp-2">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills."}
          </p>
        </div>
        <div>
          <p>Tech Icons</p>

          <Button asChild>
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
