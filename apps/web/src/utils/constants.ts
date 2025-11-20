import { MultiselectOptionType } from "@/ui/multi-select";

export const PREDEFINED_TAGS: MultiselectOptionType[] = [
  { label: "Community Events", value: "Community Events" },
  { label: "Crime & Safety", value: "Crime & Safety" },
  { label: "Culture", value: "Culture" },
  { label: "Discounts & Benefits", value: "Discounts & Benefits" },
  { label: "Emergencies", value: "Emergencies" },
  { label: "For Seniors", value: "For Seniors" },
  { label: "Health", value: "Health" },
  { label: "Kids & Family", value: "Kids & Family" },
];

// Centralized app routes to avoid hardcoded strings across the app
export const ROUTES = {
  home: "/",
  announcements: "/announcements",
  announcementsNew: "/announcements/new",
  announcementDetails: (id: string) => `/announcements/${id}`,
};

// Static assets base paths
const iconsBasePath: string = "/static/icons";
export const ASSETS = {
  icons: {
    edit: `${iconsBasePath}/edit.svg`,
    globe: `${iconsBasePath}/globe.svg`,
    announcements: `${iconsBasePath}/announcements.svg`,
  },
};
