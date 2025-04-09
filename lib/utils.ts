import { techAlias, techVersionsSvg } from "@/constants/devIconData";
import { companiesLogo } from "@/constants/companiesLogoData";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const TECH_ICON_BASE_URL =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const COMPANY_LOGO_BASE_URL = "https://img.logo.dev";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTechIcons = (techStack: string[]): TechIcon[] => {
  const iconURLs = techStack.map((techName) => {
    const alias = techAlias[techName.toLowerCase()] ?? "";
    const versionSvg = techVersionsSvg[alias]?.[0] ?? ""; // mostly "original" or "plain"

    return {
      techName,
      techAlias: alias,
      url: `${TECH_ICON_BASE_URL}/${alias}/${alias}-${versionSvg}.svg`,
    };
  });

  return iconURLs;
};

export const getRandomCompanyLogo = (): CompanyIcon => {
  const randomIndex = Math.floor(Math.random() * companiesLogo.length);
  return {
    companyName: companiesLogo[randomIndex],
    url: `${COMPANY_LOGO_BASE_URL}/${companiesLogo[randomIndex]}.com`,
  };
};
