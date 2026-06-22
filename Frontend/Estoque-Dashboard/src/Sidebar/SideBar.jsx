import logoloja from "../assets/logoloja.png";
import { NavLink } from "react-router-dom";
export default function SideBar() {
  return (
    <>
      <aside className="w-84 h-screen bg-[#1D162C]  transition-[width,margin] duration-700 ease-in-out text-white flex flex-col p-6 gap-6">
        <div className="flex items-center gap-4">
          <img className="w-16 h-16 rounded-full" src={logoloja} alt="Logo" />
          <div>
            <h2 className="text-lg font-bold">HardwareStore</h2>
            <p className="text-sm">www.hardwarestore.com</p>
          </div>
        </div>

        <nav className="flex flex-col gap-3 mt-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-[#AD65BD]" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-[#AD65BD]" : ""}`
            }
          >
            Produtos
          </NavLink>
          <NavLink
            to="/vendas"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-[#AD65BD]" : ""}`
            }
          >
            Vendas
          </NavLink>
          <NavLink
            to="/relatorios"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-[#AD65BD]" : ""}`
            }
          >
            Relatorios
          </NavLink>
          <NavLink
            to="/configuracao"
            className={({ isActive }) =>
              `cursor-pointer hover:text-gray-300 ${isActive ? "text-[#AD65BD]" : ""}`
            }
          >
            Configuração de Alertas
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
