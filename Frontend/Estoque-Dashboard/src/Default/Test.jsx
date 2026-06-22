import { useState } from "react";

export default function Test() {
  const [form, setForm] = useState({
    produto: "",
    quantidade: "",
    precoUnitario: "",
  });

  const [vendas, setVendas] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function calcularTotal() {
    return (form.quantidade * form.precoUnitario).toFixed(2);
  }

  function registrarVenda() {
    if (!form.produto || form.quantidade <= 0) return;

    const novaVenda = {
      id: Date.now(),
      produto: form.produto,
      quantidade: Number(form.quantidade),
      precoUnitario: Number(form.precoUnitario),
      total: form.quantidade * form.precoUnitario,
    };

    setVendas([novaVenda, ...vendas]);

    // 🔥 AQUI FUTURO: chamada API para debitar stock
    // await api.post("/vendas", novaVenda)

    setForm({ produto: "", quantidade: "", precoUnitario: "" });
  }

  return (
    <div className="flex min-h-screen bg-[#ece3d6]">
      {/* CONTEÚDO */}
      <main className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center bg-[#7a3b10] text-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold">Gestão de Vendas</h2>

          <button className="bg-white text-[#7a3b10] px-4 py-2 rounded-full font-semibold">
            + Nova Venda
          </button>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white mt-6 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Registrar Venda Diária</h3>

          <div className="grid grid-cols-3 gap-4">
            <input
              name="produto"
              value={form.produto}
              onChange={handleChange}
              placeholder="Produto vendido"
              className="border p-2 rounded"
            />

            <input
              name="quantidade"
              type="number"
              value={form.quantidade}
              onChange={handleChange}
              placeholder="Quantidade"
              className="border p-2 rounded"
            />

            <input
              name="precoTotalPorItem"
              type="number"
              value={form.precoTotal}
              onChange={handleChange}
              placeholder="Preço Por Tipo"
              className="border p-2 rounded"
            />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="font-semibold text-[#7a3b10]">
              Total: € {calcularTotal()}
            </span>

            <button
              onClick={registrarVenda}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Registrar Venda
            </button>
          </div>
        </div>

        {/* TABELA DE VENDAS */}
        <div className="bg-white mt-6 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Histórico de Vendas</h3>

          <table className="w-full">
            <thead>
              <tr className="text-center border-b">
                <th>ID</th>
                <th>DATA</th>
                <th>Qtd</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {vendas.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Nenhuma venda registrada
                  </td>
                </tr>
              )}

              {vendas.map((v) => (
                <tr key={v.id} className="border-b">
                  <td>{v.id}</td>
                  <td>{v.produto}</td>
                  <td>{v.quantidade}</td>
                  <td>€ {v.precoUnitario}</td>
                  <td className="font-semibold">€ {v.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
