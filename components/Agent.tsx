import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import CustomAvatar from "./CustomAvatar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  type: "generate" | "interview";
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  questions?: string[];
}

const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true;
  const callStatus = CallStatus.CONNECTING as unknown;
  const messages = [
    "Message 1. lorem lorem lorem lorem lorem",
    "Message 2. lorem lorem ...",
    "Message 3. Lorem?",
  ];
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-between w-full sm:flex-row">
        <Card className="flex-center flex-col w-full">
          <div className="flex-center relative ">
            <div className="flex-center z-10 bg-muted size-28 rounded-full">
              <Bot className="size-18" />
            </div>
            {isSpeaking && (
              <span className="absolute rounded-full animate-ping bg-muted-foreground opacity-100 size-18" />
            )}
          </div>
          <h3>AI Interviewer</h3>
        </Card>
        <Card className="hidden flex-col w-full sm:flex-center">
          <div className="flex-center relative">
            <CustomAvatar name={userName} className="z-10 size-28" />
            {isSpeaking && (
              <span className="absolute rounded-full animate-ping bg-muted-foreground opacity-100 size-18" />
            )}
          </div>
          <h3>{userName}</h3>
        </Card>
      </div>
      {messages.length > 0 && (
        <Card className="flex-center mt-5 p-3 min-h-12">
          <p
            key={lastMessage}
            className={cn(
              "transition-opacity duration-500 opacity-0",
              "animate-fadeIn opacity-100"
            )}
          >
            {lastMessage}
          </p>
        </Card>
      )}
      <div className="w-full flex-center mt-5">
        {callStatus !== CallStatus.ACTIVE ? (
          <Button className="btn px-7 relative">
            <span
              className={cn(
                "absolute animate-ping rounded-md bg-ring size-5/6 opacity-70",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            {callStatus === CallStatus.INACTIVE ||
            callStatus === CallStatus.FINISHED
              ? "Call"
              : ". . ."}
          </Button>
        ) : (
          <Button className="btn px-7 bg-destructive hover:bg-destructive-hover">
            End
          </Button>
        )}
      </div>
    </>
  );
};

export default Agent;
