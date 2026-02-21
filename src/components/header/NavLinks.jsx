import { NavLink } from "react-router";

const baseStyle = "font-bold text-[18px] leading-[26px] transition-colors";
const activeStyle = "text-primary";
const normalStyle = "text-gray-600 hover:text-gray-800";

export default function NavLinks() {
  return (
    <nav className="flex gap-2 md:gap-5 lg:gap-6">
      <NavLink
        to="/boards"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : normalStyle}`
        }
      >
        자유게시판
      </NavLink>
      <NavLink
        to="/items"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : normalStyle}`
        }
      >
        중고마켓
      </NavLink>
    </nav>
  );
}
