import LogoLoja from "../assets/LogoLoja.jpeg";
import { NavLink } from "react-router-dom";
export default function SideBar() {
  return (
    <>
      <aside className="w-64 h-screen bg-amber-900  transition-[width,margin] duration-700 ease-in-out text-white flex flex-col p-6 gap-6">
        <div className="flex items-center gap-4">
          <img className="w-16 h-16 rounded-full" src={LogoLoja} alt="Logo" />
          <div>
            <h2 className="text-lg font-bold">Geladoces</h2>
            <p className="text-sm">@GeladocesInst</p>
          </div>
        </div>

        <nav className="flex flex-col gap-3 mt-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-yellow-300" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-amber-500" : ""}`
            }
          >
            Produtos
          </NavLink>
          <NavLink
            to="/vendas"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-amber-500" : ""}`
            }
          >
            Vendas
          </NavLink>
          <NavLink
            to="/relatorios"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-amber-500" : ""}`
            }
          >
            Relatorios
          </NavLink>
          <NavLink
            to="/configuracao"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-amber-500" : ""}`
            }
          >
            Configuração de Alertas
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
