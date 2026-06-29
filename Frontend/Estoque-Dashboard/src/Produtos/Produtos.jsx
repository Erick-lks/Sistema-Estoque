import { useEffect, useState } from "react";
import Cards from "./Cards";
import api from "../Services/Api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalDePaginas, setTotalDepaginas] = useState(0);
  const [busca, setBusca] = useState("");

  const [erros, setErros] = useState({});

  function validar() {
    let novosErros = {};

    if (!form.produto.trim()) {
      novosErros.produto = "produto não pode ser vazio!";
    }

    if (!form.categoria.trim()) {
      novosErros.tipo = "Categoria é obrigatório!";
    }

    if (form.quantidade < 0) {
      novosErros.quantidade = "Quantidade não pode ser negativa!";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    console.log("Enviando  pro Backend", form);
    console.log(form.data.response);
  }

  const [form, setForm] = useState({
    id: "",
    produto: "",
    categoria: "",
    quantidade: "0",
  });

  const fecharModal = () => {
    setMostrarModal(false);
    setModoEdicao(false);
    setIdEditando(null);
    carregarProdutos();
    setForm({ id: "", produto: "", categoria: "", quantidade: "" });
  };
  const carregarProdutos = async (pagina = 0, termoBusca = "") => {
    try {
      const endpoint = termoBusca.trim()
        ? `/Estoque/buscar?categoria=${termoBusca}&page=${pagina}&size=10`
        : `/Estoque/listar?page=${pagina}&size=10`;

      const response = await api.get(endpoint);

      const data = response.data.body;

      setProdutos(data.content || []);
      setTotalDepaginas(data.totalPages || 0);
    } catch (error) {
      console.log("Erro ao carregar produtos", error);
    }
  };

  useEffect(() => {
    carregarProdutos(paginaAtual, busca);
  }, [paginaAtual]);
  async function salvarProduto() {
    try {
      const response = await api.post("/Estoque/cadastrar", {
        ...form,
        quantidade: Number(form.quantidade),
      });

      console.log("Novo Produto Cadastrado", response.data);
      setProdutos(response.data.body.content);
      fecharModal();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("Buscando:", busca);
    carregarProdutos(0, busca);
  }, [busca]);
  async function atualizarProduto() {
    try {
      const response = await api.put(`/Estoque/alterar/${idEditando}`, form);
      console.log("Produto Atualizado", response.data);

      fecharModal();
      carregarProdutos();
      setProdutos(response.data.body.content);
    } catch (error) {
      console.error(error);
    }
  }

  function editarProduto(produto) {
    setModoEdicao(true);
    setMostrarModal(true);
    setIdEditando(produto.id);

    setForm({
      id: produto.id ?? "",
      categoria: String(produto.categoria ?? ""),
      produto: String(produto.produto ?? ""),
      quantidade: Number(produto.quantidade ?? 0),
    });
  }
  async function excluirProduto(id) {
    try {
      const confirmacao = window.confirm(
        "Tem certeza que deseja excluir este produto?",
      );
      if (!confirmacao) return;

      await api.delete(`/Estoque/remover/${id}`);

      setProdutos(produtos.filter((p) => p.id !== id));

      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Não foi possível excluir o produto.");
    }
  }

  return (
    <div className="w-full h-full">
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center bg-[#1D162C] text-white p-4 rounded-xl">
          <h1 className="text-2xl font-semibold">Gerenciador de Estoque</h1>

          <button
            onClick={() => setMostrarModal(true)}
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-[#14d20aa6]"
          >
            + Novo Produto
          </button>

          {mostrarModal && (
            <div className="fixed inset-0 bg-transparent bg-opacity-10 flex justify-center items-center">
              <div className="bg-[#261d58] p-10 rounded-lg h-120 w-140">
                <h2 className="text-xl font-bold mb-4">
                  {modoEdicao ? "Editar Produto" : "Adicionar Produto"}
                </h2>

                <input
                  type="text"
                  placeholder="Produto"
                  value={form.produto || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      produto: e.target.value,
                    }))
                  }
                  className={`border w-full p-4 rounded mb-3 ${
                    erros.produto ? "border-red-500" : ""
                  }`}
                />
                {erros.produto && (
                  <p className="text-red-200 text-sm mb-2">{erros.produto}</p>
                )}

                <input
                  type="text"
                  placeholder="Categoria"
                  value={form.categoria || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      categoria: e.target.value,
                    }))
                  }
                  className={`border w-full p-4 rounded mb-3 ${
                    erros.categoria ? "border-red-500" : ""
                  }`}
                />
                {erros.categoria && (
                  <p className="text-red-200 text-sm mb-3">{erros.categoria}</p>
                )}

                <input
                  type="number"
                  placeholder="Quantidade"
                  value={form.quantidade || "0"}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      quantidade: Number(e.target.value),
                    }))
                  }
                  className={`border w-full p-4 rounded mb-3 ${
                    erros.quantidade ? "border-red-500" : ""
                  }`}
                />

                {erros.quantidade && (
                  <p className="text-red-200 text-sm mb-2">
                    {erros.quantidade}
                  </p>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={fecharModal}
                    className="px-4 py-2 bg-blue-700 rounded"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={() => {
                      if (!validar()) return;
                      modoEdicao ? atualizarProduto() : salvarProduto();
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    {modoEdicao ? "Atualizar" : "Salvar"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Cards
          carregarProdutos={carregarProdutos}
          setProdutos={setProdutos}
          setTotalDepaginas={setTotalDepaginas}
        />
        <div className="bg-white mt-6 p-4 rounded-2xl shadow">
          <div className="overflow-x-auto">
            <div className="flex justify-end mb-4 p-2  ">
              <input
                type="text"
                placeholder="Digite a categoria do Item"
                onChange={(e) => {
                  const valor = e.target.value;
                  setBusca(valor);
                  setPaginaAtual(0);
                  carregarProdutos(0, valor);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    buscarProdutos();
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-500 rounded-lg 
             focus:outline-none focus:ring-2 mr-3 focus:ring-black"
              />

              <button
                onClick={() => {
                  setPaginaAtual(0);
                  carregarProdutos(0, busca);
                }}
                className="bg-black text-white mr-2 px-4 py-2 rounded-lg"
              >
                Buscar
              </button>

              <button
                onClick={() => {
                  setBusca("");
                  setPaginaAtual(0);
                  carregarProdutos();
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Limpar
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-300 text-gray-800">
                  <th className="p-3">ID</th>
                  <th className="p-3">CATEGORIA</th>
                  <th className="p-3">PRODUTO</th>
                  <th className="p-3">QTD</th>
                  <th className="p-3">AÇÕES</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(produtos) && produtos.length > 0 ? (
                  produtos.map((produto) => (
                    <tr
                      key={produto.id}
                      className="text-center border-b hover:bg-gray-100"
                    >
                      <td className="p-3">{produto.id}</td>
                      <td className="p-3">{produto.categoria}</td>
                      <td className="p-3">{produto.produto}</td>
                      <td className="p-3">{produto.quantidade}</td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => editarProduto(produto)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => excluirProduto(produto.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      Nenhum produto encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalDePaginas }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPaginaAtual(index);
                    carregarProdutos(index, busca);
                  }}
                  className={`px-4 py-2 rounded transition ${
                    paginaAtual === index
                      ? "bg-black text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
