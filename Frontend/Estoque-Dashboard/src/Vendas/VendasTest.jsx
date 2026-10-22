import { useEffect, useState } from "react";
import api from "../Services/Api";

export default function VendasTest() {
  const [vendas, setVendas] = useState([]);
  const [vendasDiarias, setVendasDiarias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [vendaEditando, setVendaEditando] = useState(null);
  const [vendaDiariaSelecionada, setVendaDiariaSelecionada] = useState(null);
const [mostrarVendaDiaria, setMostrarVendaDiaria] = useState(false);


  const [form, setForm] = useState({
    quantidadeVendida: 1,
    plataforma: "",
    valorTotal: 0,
  });

  function editarVenda(venda) {
  setVendaEditando(venda);

  setForm({
    quantidadeVendida: venda.quantidadeVendida,
    plataforma: venda.plataforma,
    valorTotal: venda.valorTotal
  });

  setMostrarModal(true);
}


function visualizarVendaDiaria(vendaDiaria) {
  setVendaDiariaSelecionada(vendaDiaria);
  setMostrarVendaDiaria(true);
}


  async function listarVendas() {
    try {
      const response = await api.get("/Vendas/listarVendas");

      if (response.status === 204 || !response.data) {
        setVendas([]);
        return;
      }

      setVendas(response.data);
    } catch (error) {
      console.error("Erro ao listar vendas:", error);
      alert("Erro ao carregar as vendas.");
    }
  }

  async function listarVendasDiarias() {
    try {
      const response = await api.get(
        "/Vendas/listarVendasDiaria"
      );

      if (response.status === 204 || !response.data) {
        setVendasDiarias([]);
        return;
      }

      setVendasDiarias(response.data);
    } catch (error) {
      console.error(
        "Erro ao listar vendas diárias:",
        error
      );
    }
  }

  useEffect(() => {
    listarVendas();
    listarVendasDiarias();
  }, []);

  function alterarForm(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const quantidade =
    Number(form.quantidadeVendida) || 0;

  const valorTotal =
    Number(form.valorTotal) || 0;

  async function registrarVenda() {
    if (!form.plataforma) {
      alert("Selecione uma plataforma.");
      return;
    }

    if (quantidade <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    if (valorTotal <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    const dadosVenda = {
      quantidadeVendida: quantidade,
      plataforma: form.plataforma,
      valorTotal: valorTotal,
    };

    try {
      setCarregando(true);

      await api.post(
        "/Vendas/cadastrarVenda",
        dadosVenda
      );

      alert("Venda cadastrada com sucesso!");

      setForm({
        quantidadeVendida: 1,
        plataforma: "",
        valorTotal: 0,
      });

      setMostrarModal(false);

      await listarVendas();
    } catch (error) {
      console.error(
        "Erro ao cadastrar venda:",
        error
      );

      alert("Erro ao cadastrar venda.");
    } finally {
      setCarregando(false);
    }
  }

  async function excluirVenda(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta venda?"
    );

    if (!confirmar) return;

    try {
      setCarregando(true);

      await api.delete(
        `/Vendas/removerVenda/${id}`
      );

      alert("Venda excluída com sucesso.");

      await listarVendas();
    } catch (error) {
      console.error(
        "Erro ao excluir venda:",
        error
      );

      alert("Erro ao excluir venda.");
    } finally {
      setCarregando(false);
    }
  }

  async function fecharDia() {
    if (vendas.length === 0) {
      alert("Não existem vendas para fechar.");
      return;
    }

    const confirmar = window.confirm(
      "Deseja fechar o dia? Todas as vendas pendentes serão agrupadas."
    );

    if (!confirmar) return;

    try {
      setCarregando(true);

      await api.post("/Vendas/diaria");

      alert("Dia fechado com sucesso!");
       setVendas([]);

      await listarVendas();
      
      await listarVendasDiarias();
    } catch (error) {
      console.error(
        "Erro ao fechar dia:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Erro ao fechar o dia."
      );
    } finally {
      setCarregando(false);
    }
  }

async function alterarVenda() {
  try {
    const dados = {
      quantidadeVendida: Number(form.quantidadeVendida),
      plataforma: form.plataforma,
      valorTotal: Number(form.valorTotal)
    };

    const response = await api.put(
      `/Vendas/alterarVenda/${vendaEditando.id}`,
      dados
    );

    console.log("Venda atualizada:", response.data);

    fecharModal();

    await listarVendas();

    alert("Venda atualizada com sucesso!");
  } catch (error) {
    console.error("Erro:", error);
    console.error("Resposta:", error.response?.data);
  }
}
  const totalVendas = vendas.length;

  const itensVendidos = vendas.reduce(
    (total, venda) =>
      total +
      Number(venda.quantidadeVendida || 0),
    0
  );

  const faturamento = vendas.reduce(
    (total, venda) =>
      total +
      Number(venda.valorTotal || 0),
    0
  );

  function fecharModal() {
    setMostrarModal(false);

    setForm({
      quantidadeVendida: 1,
      plataforma: "",
      valorTotal: 0,
    });
  }


  async function excluirVendaDiaria(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta Dia de Venda?"
    );

    if (!confirmar) return;

    try {
      setCarregando(true);

      await api.delete(
        `/Vendas/removerVendaDiaria/${id}`
      );

        alert("Venda Diaria excluída com sucesso.");

      await listarVendasDiarias();
    } catch (error) {
      console.error(
        "Erro ao excluir venda Diaria:",
        error
      );

      alert("Erro ao excluir Venda Diaria.");
    } finally {
      setCarregando(false);
    }
  }


  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-[#1D162C]">
            Gestão de Vendas
          </h1>

          <p className="text-gray-500 mt-1">
            Controle das vendas realizadas
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={fecharDia}
            disabled={
              carregando ||
              vendas.length === 0
            }
            className="bg-[#CDBB99] text-[#1D162C] px-5 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            Fechar Dia
          </button>

          <button
            onClick={() =>
              setMostrarModal(true)
            }
            className="bg-[#1D162C] text-white px-5 py-3 rounded-lg font-semibold"
          >
            + Nova Venda
          </button>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-5 mb-6">

        <div className="bg-[#CDBB99] rounded-2xl p-6">
          <p className="text-gray-700">
            Total de Vendas
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalVendas}
          </h2>
        </div>

        <div className="bg-[#CDBB99] rounded-2xl p-6">
          <p className="text-gray-700">
            Itens Vendidos
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {itensVendidos}
          </h2>
        </div>

        <div className="bg-[#CDBB99] rounded-2xl p-6">
          <p className="text-gray-700">
            Faturamento
          </p>

          <h2 className="text-3xl font-bold mt-2">
            R$ {faturamento.toFixed(2)}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Vendas
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-100">

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Plataforma
                </th>

                <th className="p-4 text-left">
                  Quantidade
                </th>

                <th className="p-4 text-left">
                  Valor Total
                </th>

                <th className="p-4 text-center">
                  Ações
                </th>

              </tr>
            </thead>

            <tbody>

              {vendas.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    Nenhuma venda cadastrada.
                  </td>
                </tr>

              ) : (

                vendas.map((venda) => (

                  <tr
                    key={venda.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {venda.id}
                    </td>

                    <td className="p-4">
                      {venda.plataforma}
                    </td>

                    <td className="p-4">
                      {venda.quantidadeVendida}
                    </td>

                    <td className="p-4 font-semibold">
                      R$
                      {Number(
                        venda.valorTotal
                      ).toFixed(2)}
                    </td>

                   

                    <td className="p-4 text-center">

                        
   <button
onClick={() => editarVenda(venda)}                            className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-blue-600   mr-3"
                          >
                            Editar 
                          </button>

                      <button
                        onClick={() =>
                          excluirVenda(
                            venda.id
                          )
                        }
                        disabled={carregando}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                      >
                        Excluir
                      </button>

                      

                      

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6 mt-5">

        <h2 className="text-xl font-bold mb-5">
          Vendas Diárias
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Data
                </th>

                <th className="p-4 text-left">
                  Valor Diário
                </th>

                <th className="p-4 text-center">
                  Vendas
                </th>

                <th className="p-4 text-center">
                  Ações </th>

              </tr>

            </thead>

            <tbody>

              {vendasDiarias.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    Nenhuma venda diária cadastrada.
                  </td>

                </tr>

              ) : (

                vendasDiarias.map(
                  (vendaDiaria) => (

                    <tr
                      key={vendaDiaria.id}
                      className="border-b"
                    >

                      <td className="p-4">
                        {vendaDiaria.id}
                      </td>

                      <td className="p-4">
                        {vendaDiaria.data
                          ? new Date(
                              vendaDiaria.data
                            ).toLocaleString(
                              "pt-BR"
                            )
                          : "-"}
                      </td>

                      <td className="p-4 font-semibold">
                        R$
                        {Number(
                          vendaDiaria.valorDiario ||
                            0
                        ).toFixed(2)}
                      </td>

                      <td className="p-4 text-center">
                        {vendaDiaria.vendas
                          ?.length || 0}
                      </td>

                       <td className="p-4 text-center ">
 <button
  onClick={() => visualizarVendaDiaria(vendaDiaria)}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
>
  Visualizar
</button>

                      <button
                        onClick={() =>
                        excluirVendaDiaria(vendaDiaria.id)
                        }
                        disabled={carregando}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                      >
                        Excluir
                      </button>

                    </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {mostrarModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-7 w-[450px]">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-[#8B3E00]">
                Nova Venda
              </h2>

              <button
                onClick={fecharModal}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>

            </div>

            <label className="block mb-2 font-semibold">
              Plataforma
            </label>

            <select
              name="plataforma"
              value={form.plataforma}
              onChange={alterarForm}
              className="border w-full p-3 rounded-lg mb-4"
            >

              <option value="">
                Selecione uma plataforma
              </option>

              <option value="NOVE_NOVE_FOOD">
                99 Food
              </option>

                <option value="IFOOD">
                Ifood
              </option>

  <option value="VENDA_DIRETA">
                Venda Direta
              </option>
            </select>

            <label className="block mb-2 font-semibold">
              Quantidade
            </label>

            <input
              type="number"
              name="quantidadeVendida"
              min="1"
              value={form.quantidadeVendida}
              onChange={alterarForm}
              className="border w-full p-3 rounded-lg mb-4"
            />

            <label className="block mb-2 font-semibold">
              Valor Total
            </label>

            <input
              type="number"
              name="valorTotal"
              min="0"
              step="0.01"
              value={form.valorTotal}
              onChange={alterarForm}
              className="border w-full p-3 rounded-lg mb-6"
            />

            <div className="bg-[#ece3d6] rounded-xl p-4 mb-6">

              <p className="text-gray-600">
                Total da Venda
              </p>

              <p className="text-3xl font-bold text-[#8B3E00]">
              R$ {valorTotal.toFixed(2)}
              </p>

            </div>

            <div className="flex justify-end gap-3">

              <button
                onClick={fecharModal}
                disabled={carregando}
                className="bg-gray-300 px-5 py-3 rounded-lg"
              >
                Cancelar
              </button>

            <button
  onClick={vendaEditando ? alterarVenda : registrarVenda}
  disabled={carregando}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
>
  {vendaEditando ? "Atualizar Venda" : "Cadastrar Venda"}
</button>



            </div>

            

          </div>
          

        </div>

      )}

      {mostrarVendaDiaria && vendaDiariaSelecionada && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-7 w-[600px] max-h-[80vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-[#8B3E00]">
            Venda Diária #{vendaDiariaSelecionada.id}
          </h2>

          <p className="text-gray-500">
            {new Date(
              vendaDiariaSelecionada.data
            ).toLocaleDateString("pt-BR")}
          </p>
        </div>

        <button
          onClick={() => setMostrarVendaDiaria(false)}
          className="text-gray-500 text-xl"
        >
          ✕
        </button>

      </div>

      <div className="bg-[#ece3d6] rounded-xl p-4 mb-6">

        <p className="text-gray-600">
          Total da Venda Diária
        </p>

        <p className="text-3xl font-bold text-[#8B3E00]">
          R$ {Number(
            vendaDiariaSelecionada.valorDiario
          ).toFixed(2)}
        </p>

      </div>

      <h3 className="font-bold text-lg mb-3">
        Vendas realizadas
      </h3>

      <div className="space-y-3 ">

        {vendaDiariaSelecionada.vendas?.map((venda) => (

          <div
            key={venda.id}
            className="border rounded-xl p-4 flex items-center justify-between"
          >

            <div>
              <p className="font-bold">
                {venda.plataforma}
              </p>

              <p className="text-gray-600">
                Quantidade: {venda.quantidadeVendida}
              </p>

              <p className="text-gray-600">
                Valor: R$ {Number(
                  venda.valorTotal
                ).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => editarVenda(venda)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Editar
            </button>

          </div>

        ))}

      </div>

      <div className="flex justify-end mt-6">

        <button
          onClick={() => setMostrarVendaDiaria(false)}
          className="bg-gray-300 px-5 py-3 rounded-lg"
        >
          Fechar
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}