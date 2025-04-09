import Link from "next/link";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const Page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user!.id),
    await getLatestInterviews({ userId: user!.id }),
  ]);

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;

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
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
                interviewId={interview.id}
              />
            ))
          ) : (
            <p>You haven&apos;t taken interview yet</p>
          )}
        </div>
      </section>
      <section>
        <h2 className="mb-7 text-2xl font-semibold">
          Take an interview card title
        </h2>

        <div className="flex flex-wrap items-stretch w-full flex-col lg:flex-row">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
                interviewId={interview.id}
              />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
