import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section>
        <div className="border-2">
          <h2>Interview card title</h2>
          <p className="text-lg">Some big text...</p>
          <Button asChild>
            <Link href="/interview">Text to start interview</Link>
          </Button>
        </div>
      </section>
      <section>
        <h2>Your interviews card title</h2>

        <div className="flex flex-wrap border-4">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          {/* <p>You haven&apos;t taken interview yet</p> */}
        </div>
      </section>
      <section>
        <h2>Take an interview card title</h2>

        <div className="border-4">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          {/* <p>There are no interviews available</p> */}
        </div>
      </section>
    </>
  );
};

export default page;
