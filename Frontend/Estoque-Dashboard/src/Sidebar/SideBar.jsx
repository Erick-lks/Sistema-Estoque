import logoloja from "../assets/logoloja.png";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const links = [
    { to: "/", label: "Home", icon: "⌂" },
    { to: "/produtos", label: "Produtos", icon: "📦" },
    { to: "/vendas", label: "Vendas", icon: "💰" },
    { to: "/relatorios", label: "Relatórios", icon: "📊" },
    { to: "/configuracao", label: "Configuração", icon: "⚙️" },
  ];

  return (
    <>
     
      <aside
        className="
          hidden
          md:flex
          w-screen
          min-w-64
          h-screen
          bg-[#1D162C]
          text-white
          flex-col
          p-6
          gap-6
          shrink-0
        "
      >
        
        <div className="flex items-center gap-4">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={logoloja}
            alt="Logo"
          />

          <div>
            <h2 className="text-lg font-bold">
              HardwareStore
            </h2>

            <p className="text-sm text-gray-300">
              www.hardwarestore.com
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-3 mt-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                p-2
                rounded-lg
                transition-all
                duration-200
                hover:bg-white/10
                hover:text-gray-300
                ${
                  isActive
                    ? "text-[#AD65BD] bg-white/10 font-semibold"
                    : "text-white"
                }
                `
              }
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      
      <header
        className="
          md:hidden
          fixed
          top-0
          left-0
          right-0
          z-50
          h-16
          bg-[#1D162C]
          text-white
          flex
          items-center
          px-4
          shadow-lg
        "
      >
        <img
          src={logoloja}
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="ml-3">
          <h1 className="font-bold">
            HardwareStore
          </h1>

          <p className="text-xs text-gray-300">
            www.hardwarestore.com
          </p>
        </div>
      </header>

     
      <nav
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-50
          h-16
          bg-[#1D162C]
          text-white
          flex
          items-center
          justify-around
          shadow-[0_-4px_15px_rgba(0,0,0,0.25)]
        "
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `
              flex
              flex-col
              items-center
              justify-center
              text-[11px]
              gap-1
              transition
              ${
                isActive
                  ? "text-[#AD65BD] font-semibold"
                  : "text-gray-300"
              }
              `
            }
          >
            <span className="text-lg">
              {link.icon}
            </span>

            <span>
              {link.label === "Configuração"
                ? "Config."
                : link.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}