import { NavLink } from "react-router-dom";
import logo from "../../public/images/logo.png";

function Logo() {
  return (
    <NavLink to="/home" className="flex items-center justify-center gap-2">
      <img
        src={logo}
        alt="The Chapter Den Logo"
        className="h-[5rem] w-[5rem]"
      />

      <h1 className="text-3xl font-medium text-gray-800">The Chapter Den</h1>
    </NavLink>
  );
}

export default Logo;
