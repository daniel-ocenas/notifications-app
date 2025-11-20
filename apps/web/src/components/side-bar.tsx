import { ASSETS, ROUTES } from "@/utils/constants";
import Image from "next/image";

type NavLink = { label: string; href: string; icon: string; bold?: boolean };

const NAV_LINKS: NavLink[] = [
  {
    href: ROUTES.home,
    label: "Test city",
    icon: ASSETS.icons.globe,
    bold: true,
  },
  {
    href: ROUTES.announcements,
    label: "Announcements",
    icon: ASSETS.icons.announcements,
  },
];

function NavLinkItem({ href, label, icon, bold }: NavLink) {
  return (
    <a
      href={href}
      className={`flex row py-2 mb-2 pl-3 pr-4 hover:bg-custom-yellow rounded-md ${bold ? "font-bold" : ""}`}
    >
      {icon && (
        <Image
          src={icon}
          alt={`nav-link-icon`}
          width={16}
          height={16}
          className={"mr-3"}
        />
      )}
      {label}
    </a>
  );
}

export default function SideBar() {
  return (
    <aside className={"w-80 bg-custom-gray px-2 pt-2"}>
      {NAV_LINKS.map((navLink) => (
        <NavLinkItem key={navLink.label} {...navLink} />
      ))}
    </aside>
  );
}
