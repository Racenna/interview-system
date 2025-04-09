"use client";

import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import CustomAvatar from "./CustomAvatar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { interviewer } from "@/constants/vapi";
import { createFeedback } from "@/lib/actions/general.action";

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

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  type,
  interviewId,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage: SavedMessage = {
          role: message.role,
          content: message.transcript,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    const {
      success,
      feedbackId,
      message: errorMessage,
    } = await createFeedback({
      interviewId: interviewId!,
      userId: userId!,
      transcript: messages,
    });

    if (success && feedbackId) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
      toast.error(errorMessage);
      router.push("/");
    }
  };

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [callStatus, messages, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";

      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);

    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

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
            key={latestMessage}
            className={cn(
              "transition-opacity duration-500 opacity-0",
              "animate-fadeIn opacity-100"
            )}
          >
            {latestMessage}
          </p>
        </Card>
      )}
      <div className="w-full flex-center mt-5">
        {callStatus !== CallStatus.ACTIVE ? (
          <Button
            className="btn px-7 relative"
            disabled={callStatus === CallStatus.CONNECTING}
            onClick={handleCall}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-md bg-ring size-5/6 opacity-70",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            {isCallInactiveOrFinished ? "Call" : ". . ."}
          </Button>
        ) : (
          <Button
            className="btn px-7 bg-destructive hover:bg-destructive-hover"
            onClick={handleDisconnect}
          >
            End
          </Button>
        )}
      </div>
    </>
  );
};

export default Agent;
