import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./src/App";

import Produtos from "./src/Produtos/Produtos";
import Vendas from "./src/Vendas/Vendas";
import HomePage from "./src/HomePage/HomePage";
import Relatorios from "./src/Relatorios/Relatorios";
import Configuracao from "./src/Configuracao/Configuracao";
import Usuarios from "./src/Usuarios/Usuarios";

import LoginPage from "./src/LoginPage/PageLogin";
import ProtectedRoute from "./src/LoginPage/ProtectedRoute";

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>

     

        <Route
          path="/login"
          element={<LoginPage />}
        />


        <Route element={<ProtectedRoute />}>

          <Route path="/" element={<App />}>

            <Route
              index
              element={<HomePage />}
            />

            <Route
              path="produtos"
              element={<Produtos />}
            />

            <Route
              path="vendas"
              element={<Vendas />}
            />

            <Route
              path="relatorios"
              element={<Relatorios />}
            />

            <Route
              path="usuarios"
              element={<Usuarios />}
            />

            <Route
              path="configuracao"
              element={<Configuracao />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}