import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface CustomTooltipProps {
  children: ReactNode;
  content: string;
}

const CustomTooltip = ({ children, content }: CustomTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
