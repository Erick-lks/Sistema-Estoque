
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [salvando, setSalvando] = useState(false);

  const envioEmAndamento = useRef(false);
  const numeroRequisicao = useRef(0);

  const [form, setForm] = useState({
    id: "",
    produto: "",
    categoria: "",
    quantidade: "",
  });

  // Aceita tanto respostas com "body" como respostas diretas.
  const obterDados = (response) => {
    return response?.data?.body ?? response?.data ?? {};
  };

  function validar() {
    const novosErros = {};

    if (!form.produto.trim()) {
      novosErros.produto = "Produto não pode ser vazio!";
    }

    if (!form.categoria.trim()) {
      novosErros.categoria = "Categoria é obrigatória!";
    }

    const quantidade = Number(form.quantidade);

    if (
      String(form.quantidade).trim() === "" ||
      !Number.isFinite(quantidade) ||
      !Number.isInteger(quantidade) ||
      quantidade < 0
    ) {
      novosErros.quantidade =
        "Introduza uma quantidade inteira igual ou superior a zero!";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  const carregarProdutos = useCallback(
    async (pagina = 0, termoBusca = "") => {
      const requisicaoAtual = ++numeroRequisicao.current;

      try {
        const termo = termoBusca.trim();

        const endpoint = termo
          ? `/Estoque/Buscar?categoria=${encodeURIComponent(termo)}&page=${pagina}&size=10`
          : `/Estoque/Listar?page=${pagina}&size=10`;

        const response = await api.get(endpoint);

        // Evita que uma resposta antiga substitua uma pesquisa recente.
        if (requisicaoAtual !== numeroRequisicao.current) {
          return;
        }

        const dados = obterDados(response);

        const lista = Array.isArray(dados)
          ? dados
          : Array.isArray(dados.content)
            ? dados.content
            : [];

        setProdutos(lista);

        setTotalDepaginas(
          Array.isArray(dados)
            ? dados.length > 0 ? 1 : 0
            : Number(dados.totalPages) || 0
        );
      } catch (error) {
        if (requisicaoAtual !== numeroRequisicao.current) {
          return;
        }

        console.error(
          "Erro ao carregar produtos:",
          error.response?.status,
          error.response?.data ?? error.message
        );

        setProdutos([]);
        setTotalDepaginas(0);
      }
    },
    []
  );

  // Pesquisa e paginação usam apenas este efeito.
  useEffect(() => {
    carregarProdutos(paginaAtual, busca);
  }, [paginaAtual, busca, carregarProdutos]);

  function abrirModal() {
    setModoEdicao(false);
    setIdEditando(null);
    setForm({
      id: "",
      produto: "",
      categoria: "",
      quantidade: "",
    });
    setErros({});
    setMostrarModal(true);
  }

  function fecharModal() {
    if (envioEmAndamento.current) return;

    setMostrarModal(false);
    setModoEdicao(false);
    setIdEditando(null);
    setErros({});
    setForm({
      id: "",
      produto: "",
      categoria: "",
      quantidade: "",
    });
  }

  function editarProduto(produto) {
    setModoEdicao(true);
    setMostrarModal(true);
    setIdEditando(produto.id);
    setErros({});

    setForm({
      id: produto.id ?? "",
      categoria: String(produto.categoria ?? ""),
      produto: String(produto.produto ?? ""),
      quantidade:
        produto.quantidade == null
          ? ""
          : String(produto.quantidade),
    });
  }

  async function salvarProduto() {
    if (envioEmAndamento.current || !validar()) return;

    envioEmAndamento.current = true;
    setSalvando(true);

    try {
      const produtoParaSalvar = {
        produto: form.produto.trim(),
        categoria: form.categoria.trim(),
        quantidade: Number(form.quantidade),
      };

      const response = await api.post(
        "/Estoque/Cadastrar",
        produtoParaSalvar
      );

      console.log("Produto cadastrado:", response.data);

      setMostrarModal(false);
      setModoEdicao(false);
      setIdEditando(null);
      setErros({});
      setForm({
        id: "",
        produto: "",
        categoria: "",
        quantidade: "",
      });

      // Evita uma segunda chamada quando a página atual já é zero.
      if (paginaAtual === 0) {
        await carregarProdutos(0, busca);
      } else {
        setPaginaAtual(0);
      }
    } catch (error) {
      console.error(
        "Erro ao cadastrar produto:",
        error.response?.status,
        error.response?.data ?? error.message
      );

      setErros({
        geral:
          error.response?.data?.mensagem ??
          error.response?.data?.message ??
          "Não foi possível cadastrar o produto.",
      });
    } finally {
      envioEmAndamento.current = false;
      setSalvando(false);
    }
  }

  async function atualizarProduto() {
    if (
      envioEmAndamento.current ||
      idEditando == null ||
      !validar()
    ) {
      return;
    }

    envioEmAndamento.current = true;
    setSalvando(true);

    try {
      const produtoParaAtualizar = {
        produto: form.produto.trim(),
        categoria: form.categoria.trim(),
        quantidade: Number(form.quantidade),
      };

      const response = await api.put(
        `/Estoque/Alterar/${idEditando}`,
        produtoParaAtualizar
      );

      console.log("Produto atualizado:", response.data);

      setMostrarModal(false);
      setModoEdicao(false);
      setIdEditando(null);
      setErros({});
      setForm({
        id: "",
        produto: "",
        categoria: "",
        quantidade: "",
      });

      await carregarProdutos(paginaAtual, busca);
    } catch (error) {
      console.error(
        "Erro ao atualizar produto:",
        error.response?.status,
        error.response?.data ?? error.message
      );

      setErros({
        geral:
          error.response?.data?.mensagem ??
          error.response?.data?.message ??
          "Não foi possível atualizar o produto.",
      });
    } finally {
      envioEmAndamento.current = false;
      setSalvando(false);
    }
  }

  async function excluirProduto(id) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmacao) return;

    try {
      // Mantido o PATCH da tua implementação de remoção lógica.
      await api.patch(`/Estoque/Remover/${id}`);

      const listaAtualizada = produtos.filter(
        (produto) => produto.id !== id
      );

      if (listaAtualizada.length === 0 && paginaAtual > 0) {
        setPaginaAtual((pagina) => pagina - 1);
      } else {
        await carregarProdutos(paginaAtual, busca);
      }

      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error(
        "Erro ao excluir produto:",
        error.response?.status,
        error.response?.data ?? error.message
      );

      alert(
        error.response?.data?.mensagem ??
        error.response?.data?.message ??
        "Não foi possível excluir o produto."
      );
    }
  }

  return (
    <div className="w-full h-full">
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center bg-[#1D162C] text-white p-4 rounded-xl">
          <h1 className="text-2xl font-semibold">
            Gerenciador de Estoque
          </h1>

          <button
            onClick={abrirModal}
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

                {erros.geral && (
                  <p className="text-red-200 text-sm mb-3">
                    {erros.geral}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Produto"
                  value={form.produto || ""}
                  disabled={salvando}
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
                  <p className="text-red-200 text-sm mb-2">
                    {erros.produto}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Categoria"
                  value={form.categoria || ""}
                  disabled={salvando}
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
                  <p className="text-red-200 text-sm mb-3">
                    {erros.categoria}
                  </p>
                )}

                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Quantidade"
                  value={form.quantidade}
                  disabled={salvando}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      quantidade: e.target.value,
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
                    type="button"
                    onClick={fecharModal}
                    disabled={salvando}
                    className="px-4 py-2 bg-blue-700 rounded"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    disabled={salvando}
                    onClick={() =>
                      modoEdicao
                        ? atualizarProduto()
                        : salvarProduto()
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                  >
                    {salvando
                      ? "A guardar..."
                      : modoEdicao
                        ? "Atualizar"
                        : "Salvar"}
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
            <div className="flex justify-end mb-4 p-2">
              <input
                type="text"
                placeholder="Digite a categoria do Item"
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPaginaAtual(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPaginaAtual(0);
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 mr-3 focus:ring-black"
              />

              <button
                type="button"
                onClick={() => setPaginaAtual(0)}
                className="bg-black text-white mr-2 px-4 py-2 rounded-lg"
              >
                Buscar
              </button>

              <button
                type="button"
                onClick={() => {
                  setBusca("");
                  setPaginaAtual(0);
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
                    <td
                      colSpan={5}
                      className="p-4 text-center text-gray-500"
                    >
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
                  onClick={() => setPaginaAtual(index)}
                  disabled={salvando}
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
