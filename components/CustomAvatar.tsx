import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CSSProperties } from "react";

interface CustomAvatarProps {
  name: string;
  className?: string;
  src?: string;
}

const CustomAvatar = ({ name, src, className }: CustomAvatarProps) => {
  const sizeMatch = className?.match(/size-(\d+)/);
  const avatarSize = sizeMatch ? sizeMatch[1] : "8"; // size-8 is default style for Avatar component

  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <Avatar
      className={className}
      style={
        { "--avatar-size": `var(--spacing)*${avatarSize}` } as CSSProperties
      }
    >
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="text-[calc(var(--avatar-size)/2)]">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
