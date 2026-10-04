import { useState } from "react";
import api from "../Services/Api";

export default function Usuarios() {
  // ==============================
  // CADASTRO
  // ==============================

  const [form, setForm] = useState({
    nomeCompleto: "",
    cpf: "",
    perfil: "GERENTE",
  });

  // ==============================
  // PESQUISA
  // ==============================

  const [cpfPesquisa, setCpfPesquisa] = useState("");
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

  // ==============================
  // ESTADOS
  // ==============================

  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [pesquisando, setPesquisando] = useState(false);
  const [resetandoSenha, setResetandoSenha] = useState(false);

  // ==============================
  // ALTERAÇÃO DOS CAMPOS
  // ==============================

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMensagem("");

    setErros((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  // ==============================
  // LIMPAR FORMULÁRIO
  // ==============================

  function limparFormulario() {
    setForm({
      nomeCompleto: "",
      cpf: "",
      perfil: "GERENTE",
    });

    setErros({});
    setMensagem("");
  }

  // ==============================
  // VALIDAR CADASTRO
  // ==============================

  function validarCadastro() {
    const novosErros = {};

    if (!form.nomeCompleto.trim()) {
      novosErros.nomeCompleto = "Nome completo é obrigatório!";
    }

    if (!form.cpf.trim()) {
      novosErros.cpf = "CPF é obrigatório!";
    }

    if (!form.perfil) {
      novosErros.perfil = "Selecione um perfil!";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  // ==============================
  // CADASTRAR USUÁRIO
  // ==============================

  async function cadastrarUsuario(e) {
    e.preventDefault();

    if (!validarCadastro()) {
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const response = await api.post("/Auth/Registro", {
        nomeCompleto: form.nomeCompleto,
        cpf: form.cpf,
        perfil: form.perfil,
      });

      console.log("Usuário cadastrado:", response.data);

      setMensagem(
        "Usuário cadastrado com sucesso! A senha padrão foi criada."
      );

      setTipoMensagem("sucesso");

      limparFormulario();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);

      if (error.response?.status === 400) {
        setMensagem(
          error.response.data || "CPF já cadastrado."
        );
      } else if (error.response?.status === 401) {
        setMensagem(
          "Você não possui permissão para cadastrar usuários."
        );
      } else if (error.response?.status === 403) {
        setMensagem(
          "Apenas administradores podem cadastrar usuários."
        );
      } else {
        setMensagem(
          "Não foi possível cadastrar o usuário."
        );
      }

      setTipoMensagem("erro");
    } finally {
      setCarregando(false);
    }
  }

  // ==============================
  // PESQUISAR USUÁRIO
  // ==============================

  async function pesquisarUsuario() {
    if (!cpfPesquisa.trim()) {
      setMensagem("Digite um CPF para pesquisar. A implementar");
      setTipoMensagem("erro");
      return;
    }

    setPesquisando(true);
    setMensagem("");
    setUsuarioEncontrado(null);

    try {
      const response = await api.get(
        `/auth/buscar?cpf=${cpfPesquisa}`
      );

      setUsuarioEncontrado(response.data);

      setMensagem("Usuário encontrado.");
      setTipoMensagem("sucesso");
    } catch (error) {
      console.error("Erro ao pesquisar usuário:", error);

      if (error.response?.status === 404) {
        setMensagem("Nenhum usuário encontrado para esse CPF.");
      } else if (error.response?.status === 403) {
        setMensagem(
          "Você não possui permissão para pesquisar usuários."
        );
      } else {
        setMensagem("Erro ao pesquisar usuário.");
      }

      setTipoMensagem("erro");
    } finally {
      setPesquisando(false);
    }

    
  }

  // ==============================
  // RESETAR SENHA
  // ==============================

  async function resetarSenha() {
    if (!usuarioEncontrado?.cpf) {
      return;
    }

    const confirmar = window.confirm(
      `Deseja realmente resetar a senha do usuário ${usuarioEncontrado.nomeCompleto}?`
    );

    if (!confirmar) {
      return;
    }

    setResetandoSenha(true);
    setMensagem("");

    try {
      await api.put(
        `/auth/resetar-senha?cpf=${usuarioEncontrado.cpf}`
      );

      setMensagem(
        "Senha resetada com sucesso! A senha padrão foi definida."
      );

      setTipoMensagem("sucesso");
    } catch (error) {
      console.error("Erro ao resetar senha:", error);

      if (error.response?.status === 404) {
        setMensagem("Usuário não encontrado.");
      } else if (error.response?.status === 403) {
        setMensagem(
          "Apenas administradores podem resetar senhas."
        );
      } else {
        setMensagem("Não foi possível resetar a senha.");
      }

      setTipoMensagem("erro");
    } finally {
      setResetandoSenha(false);
    }
  }

  return (
    <div className="w-full h-full">
      <main className="flex-1 p-6 overflow-auto">

        {/* ===================================== */}
        {/* CABEÇALHO */}
        {/* ===================================== */}

        <div className="flex justify-between items-center bg-[#1D162C] text-white p-4 rounded-xl">
          <div>
            <h1 className="text-2xl font-semibold">
              Gerenciador de Usuários
            </h1>

            <p className="text-sm text-gray-300 mt-1">
              Cadastre, pesquise e gerencie os usuários do sistema
            </p>
          </div>
        </div>

        {/* ===================================== */}
        {/* MENSAGEM */}
        {/* ===================================== */}

        {mensagem && (
          <div
            className={`mt-6 p-3 rounded-lg ${
              tipoMensagem === "sucesso"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {mensagem}
          </div>
        )}

        {/* ===================================== */}
        {/* PESQUISA DE USUÁRIO */}
        {/* ===================================== */}

        <div className="bg-white mt-6 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Pesquisar usuário
          </h2>

          <div className="flex flex-col md:flex-row gap-3">

            <input
              type="text"
              placeholder="Digite o CPF do usuário"
              value={cpfPesquisa}
              onChange={(e) => setCpfPesquisa(e.target.value)}
              maxLength={14}
              className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D162C]"
            />

            <button
              type="button"
              onClick={pesquisarUsuario}
              disabled={pesquisando}
              className="px-6 py-3 bg-[#1D162C] text-white rounded-lg hover:bg-[#2b2142] transition disabled:opacity-50"
            >
              {pesquisando
                ? "Pesquisando..."
                : "Pesquisar"}
            </button>

          </div>

          {/* RESULTADO DA PESQUISA */}

          {usuarioEncontrado && (
            <div className="mt-6 border border-gray-200 rounded-xl p-5">

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Usuário encontrado
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Nome completo
                  </p>

                  <p className="font-medium text-gray-800">
                    {usuarioEncontrado.nomeCompleto}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    CPF
                  </p>

                  <p className="font-medium text-gray-800">
                    {usuarioEncontrado.cpf}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Perfil
                  </p>

                  <p className="font-medium text-gray-800">
                    {usuarioEncontrado.perfil}
                  </p>
                </div>

              </div>

              <div className="flex justify-end mt-5">

                <button
                  type="button"
                  onClick={resetarSenha}
                  disabled={resetandoSenha}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {resetandoSenha
                    ? "Resetando..."
                    : "Resetar senha"}
                </button>

              </div>

            </div>
          )}
        </div>

        {/* ===================================== */}
        {/* CADASTRO */}
        {/* ===================================== */}

        <div className="bg-white mt-6 p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Cadastrar novo usuário
          </h2>

          <form onSubmit={cadastrarUsuario}>

            {/* NOME */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>

              <input
                type="text"
                name="nomeCompleto"
                placeholder="Digite o nome completo"
                value={form.nomeCompleto}
                onChange={handleChange}
                className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D162C] ${
                  erros.nomeCompleto
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {erros.nomeCompleto && (
                <p className="text-red-500 text-sm mt-1">
                  {erros.nomeCompleto}
                </p>
              )}

            </div>

            {/* CPF */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>

              <input
                type="text"
                name="cpf"
                placeholder="Digite o CPF"
                value={form.cpf}
                onChange={handleChange}
                maxLength={14}
                className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D162C] ${
                  erros.cpf
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {erros.cpf && (
                <p className="text-red-500 text-sm mt-1">
                  {erros.cpf}
                </p>
              )}

            </div>

            {/* PERFIL */}

            <div className="mt-4">

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Perfil de acesso
              </label>

              <select
                name="perfil"
                value={form.perfil}
                onChange={handleChange}
                className={`border w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1D162C] ${
                  erros.perfil
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="GERENTE">
                  Gerente
                </option>

                <option value="ADMIN">
                  Administrador
                </option>
              </select>

              {erros.perfil && (
                <p className="text-red-500 text-sm mt-1">
                  {erros.perfil}
                </p>
              )}

            </div>

            {/* BOTÕES */}

            <div className="flex justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={limparFormulario}
                className="px-5 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
              >
                Limpar
              </button>

              <button
                type="submit"
                disabled={carregando}
                className="px-5 py-2 bg-[#1D162C] text-white rounded-lg hover:bg-[#2b2142] transition disabled:opacity-50"
              >
                {carregando
                  ? "Cadastrando..."
                  : "Cadastrar usuário"}
              </button>

            </div>

          </form>
        </div>

      </main>
    </div>
  );
}