import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./src/App";
import Produtos from "./src/Produtos/Produtos";
import Vendas from "./src/Vendas/Vendas";
import HomePage from "./src/HomePage/HomePage";
import Relatorios from "./src/Relatorios/Relatorios";
import Configuracao from "./src/Configuracao/Configuracao";

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="vendas" element={<Vendas />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="configuracao" element={<Configuracao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
