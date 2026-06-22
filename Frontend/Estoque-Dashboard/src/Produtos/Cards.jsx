import api from "../Services/Api";
import { useEffect, useState } from "react";
export default function Cards({
  carregarProdutos,
  setProdutos,
  setTotalDepaginas,
}) {
  const filtrodeBaixoEstoque = async () => {
    try {
      const response = await api.get("/Estoque/baixo-estoque?page=0&size=10");

      const data = response.data;

      setProdutos(data.content || []);
      setTotalDepaginas(data.totalPages || 0);

      console.log("Filtrado Baixo Estoque com sucesso!");
    } catch (error) {
      console.error("Não foi possível filtrar!", error);
    }
  };
  const [cards, setCards] = useState({
    totalItens: 0,
    baixoEstoque: 0,
    produtosTotal: 0,
  });
  useEffect(() => {
    async function cardsInformacao() {
      try {
        const response = await api.get("/Estoque/total");
        setCards(response.data);
      } catch (error) {
        console.log("Erro de conexão ao Banco de Dados ", error);
      }
    }
    cardsInformacao();
  }, []);
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="bg-[#CEBC9A] rounded-2xl p-5 shadow">
        <h3 className="text-black">Total de Itens</h3>{" "}
        <p
          onClick={() => carregarProdutos()}
          className="text-3xl font-bold mt-2"
        >
          {cards.totalItens}
        </p>
      </div>
      <div
        onClick={() => filtrodeBaixoEstoque()}
        className="bg-[#CEBC9A] rounded-2xl p-5 shadow"
      >
        <h3 className="text-black">Itens em Baixo Estoque</h3>{" "}
        <p className="text-3xl font-bold mt-2 text-amber-900">
          {cards.baixoEstoque}
        </p>
      </div>
      <div className="bg-[#CEBC9A] rounded-2xl p-5 shadow">
        <h3 className="text-black">total de produtos</h3>
        <p className="text-3xl font-bold mt-2 ">{cards?.produtosTotal ?? 0}</p>
      </div>
    </div>
  );
}
