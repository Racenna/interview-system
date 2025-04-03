import { cn, getTechIcons } from "@/lib/utils";
import CustomAvatar from "@/components/CustomAvatar";
import CustomTooltip from "@/components/CustomTooltip";

interface TechIconsProps {
  techStack: string[];
}

const TechIcons = ({ techStack }: TechIconsProps) => {
  const techIcons = getTechIcons(techStack);
  const displayTechIcons = techIcons.slice(0, 3);
  const hiddenTechIcons = techIcons.slice(3);

  return (
    <div className="flex">
      {displayTechIcons.map(({ techName, techAlias, url }, index) => (
        <CustomTooltip key={techAlias} content={techName}>
          <CustomAvatar
            className={cn("bg-muted border-1", index >= 1 && "-ml-2")}
            name={techAlias}
            src={url}
          />
        </CustomTooltip>
      ))}
      {!!hiddenTechIcons.length && (
        <CustomTooltip
          content={hiddenTechIcons.map(({ techName }) => techName).join(", ")}
        >
          <CustomAvatar
            className="bg-muted border-1 -ml-2"
            name={`+ ${hiddenTechIcons.length}`}
          />
        </CustomTooltip>
      )}
    </div>
  );
};

export default TechIcons;
