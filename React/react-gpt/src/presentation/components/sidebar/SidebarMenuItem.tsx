import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  title: string;
  description: string;
  icon: string;
}

export const SidebarMenuItem = ({ to, title, description, icon }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center bg-teal-800 rounded-md p-2 transition-colors"
          : "flex justify-center items-center hover:bg-teal-800 rounded-md p-2 transition-colors"
      }
    >
      <i className={`${icon} text-2xl mr-4 text-teal-400`} />
      <div className="flex flex-col flex-grow">
        <span className="text-white text-lg font-semibold">{title}</span>
        <span className="text-gray-400 text-sm">{description}</span>
      </div>
    </NavLink>
  );
};
