import { IoSearch } from "react-icons/io5";
import { GiCarKey } from "react-icons/gi";
import { MenuRoot } from "./Menu";

export function Navbar() {
  return (
    <div className="header">
      <div className="content">
        <MenuRoot>
          <h1>C</h1>
        </MenuRoot>
        <label>
          <IoSearch />
          <input placeholder="Buscar veículos FIAT" />
        </label>
        <MenuRoot>
          <GiCarKey />
        </MenuRoot>
      </div>
      <div className="notifications">
        <span>3</span>
      </div>
    </div>
  );
}
