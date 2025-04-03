import Link from "next/link";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { dummyInterviews } from "@/constants/dummyData";
import { Card, CardContent } from "@/components/ui/card";

const page = () => {
  return (
    <>
      <section className="mb-12">
        <Card className="w-full sm:max-w-lg">
          <CardContent>
            <h2 className="text-2xl font-semibold leading-none">
              Get Interview with AI
            </h2>
            <p className="my-3">
              Practice interview questions and get instant feedback.
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/interview">Start an Interview</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="mb-7 text-2xl font-semibold">
          Your interviews card title
        </h2>

        <div className="flex flex-wrap items-stretch w-full flex-col lg:flex-row">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          {/* <p>You haven&apos;t taken interview yet</p> */}
        </div>
      </section>
      <section>
        <h2 className="mb-7 text-2xl font-semibold">
          Take an interview card title
        </h2>

        <div className="flex flex-wrap items-stretch w-full flex-col lg:flex-row">
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
