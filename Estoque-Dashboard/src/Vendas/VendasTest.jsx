import { useState } from "react";

export default function Vendas() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const [form, setForm] = useState({
    produto: "",
    quantidade: 1,
    precoUnitario: 0,
  });

  const [pesquisa, setPesquisa] = useState("");
  const [vendas, setVendas] = useState([]);

  const totalVendas = vendas.length;

  const itensVendidos = vendas.reduce((acc, item) => acc + item.quantidade, 0);

  const faturamento = vendas.reduce((acc, item) => acc + item.total, 0);

  const vendasFiltradas = vendas.filter((v) =>
    v.produto.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  const calcularTotal = () => {
    return (Number(form.quantidade) * Number(form.precoUnitario)).toFixed(2);
  };

  const fecharModal = () => {
    setMostrarModal(false);

    setForm({
      produto: "",
      quantidade: 1,
      precoUnitario: 0,
    });
  };

  const registrarVenda = () => {
    if (!form.produto) return;

    const novaVenda = {
      id: Date.now(),
      data: new Date().toLocaleDateString("pt-PT"),
      produto: form.produto,
      quantidade: Number(form.quantidade),
      precoUnitario: Number(form.precoUnitario),
      total: Number(form.quantidade) * Number(form.precoUnitario),
    };

    setVendas((prev) => [novaVenda, ...prev]);

    fecharModal();
  };

  return (
    <div className="flex-1 p-6 bg-[#ece3d6] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-[#8B3E00] rounded-2xl p-5 text-white">
        <h1 className="text-3xl font-bold">Gestão de Vendas</h1>

        <button
          onClick={() => setMostrarModal(true)}
          className="bg-white text-[#8B3E00] px-6 py-3 rounded-full font-semibold"
        >
          + Nova Venda
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-5 mt-6">
        <div className="bg-[#CDBB99] p-6 rounded-2xl">
          <h3 className="text-lg">Total de Vendas</h3>

          <p className="text-4xl font-bold mt-3">{totalVendas}</p>
        </div>

        <div className="bg-[#CDBB99] p-6 rounded-2xl">
          <h3 className="text-lg">Itens Vendidos</h3>

          <p className="text-4xl font-bold mt-3">{itensVendidos}</p>
        </div>

        <div className="bg-[#CDBB99] p-6 rounded-2xl">
          <h3 className="text-lg">Faturamento</h3>

          <p className="text-4xl font-bold mt-3">€ {faturamento.toFixed(2)}</p>
        </div>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow mt-6 p-6">
        <div className="flex justify-end mb-5">
          <input
            type="text"
            placeholder="Buscar venda..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="border p-3 rounded-lg w-80"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 h-14">
              <th>ID</th>
              <th>Data</th>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Preço</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {vendasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  Nenhuma venda encontrada
                </td>
              </tr>
            ) : (
              vendasFiltradas.map((venda) => (
                <tr key={venda.id} className="border-b h-14 text-center">
                  <td>{venda.id}</td>
                  <td>{venda.data}</td>
                  <td>{venda.produto}</td>
                  <td>{venda.quantidade}</td>
                  <td>€ {venda.precoUnitario.toFixed(2)}</td>
                  <td className="font-semibold">€ {venda.total.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[650px]">
            <h2 className="text-2xl font-bold text-[#8B3E00] mb-6">
              Registrar Venda
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Produto"
                value={form.produto}
                onChange={(e) =>
                  setForm({
                    ...form,
                    produto: e.target.value,
                  })
                }
                className="border p-4 rounded-lg w-full"
              />

              <input
                type="number"
                placeholder="Quantidade"
                value={form.quantidade}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantidade: e.target.value,
                  })
                }
                className="border p-4 rounded-lg w-full"
              />

              <input
                type="number"
                placeholder="Preço Unitário"
                value={form.precoUnitario}
                onChange={(e) =>
                  setForm({
                    ...form,
                    precoUnitario: e.target.value,
                  })
                }
                className="border p-4 rounded-lg w-full"
              />

              <div className="bg-[#ece3d6] rounded-xl p-5">
                <p className="text-gray-600">Total da Venda</p>

                <h3 className="text-4xl font-bold text-[#8B3E00]">
                  € {calcularTotal()}
                </h3>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={fecharModal}
                className="bg-gray-300 px-5 py-3 rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={registrarVenda}
                className="bg-[#8B3E00] text-white px-5 py-3 rounded-lg"
              >
                Salvar Venda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
