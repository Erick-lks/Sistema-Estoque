import { useEffect, useState } from "react";
import { Sparkles, RefreshCw, TrendingUp } from "lucide-react";
import bussinescard from "../assets/bussinescard.jpg";
import api from "../Services/Api";
import { SlUser } from "react-icons/sl";

export default function HomePage() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState({
    totalItens: 0,
    baixoEstoque: 0,
    produtosTotal: 0,
  });
  const autoresBusiness = [
    "Steve Jobs",
    "Elon Musk",
    "Jeff Bezos",
    "Bill Gates",
    "Warren Buffett",
    "Tony Robbins",
  ];

  async function traduzirTexto(texto) {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
          texto,
        )}`,
      );

      const data = await response.json();

      return data[0].map((item) => item[0]).join("");
    } catch (error) {
      return texto;
    }
  }

  async function carregarMensagem() {
    try {
      setLoading(true);

      const response = await api.get("api/mensagem");

      const data = response.data;

      if (!data) return;

      const traduzida = await traduzirTexto(data.q);

      setQuote({
        texto: traduzida,
        autor: data.a,
      });
    } catch (error) {
      console.error("Erro ao carregar mensagem:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    carregarMensagem();
  }, []);

  useEffect(() => {
    async function cardsInformacao() {
      try {
        const response = await api.get("Estoque/total");
        console.log("Dados dos Cards ", response.data);
        setCards(response.data);
      } catch (error) {
        console.log("Erro de conexão ao Banco de Dados ", error);
      }
    }
    cardsInformacao();
  }, []);

  return (
    <main className="flex-1 bg-[#ECE6DB] p-8 overflow-auto min-h-screen">
      <div className="mb-4">
        <h1 className="text-5xl flex items-center gap-3 font-bold  text-black">
          Olá, Administrador <SlUser />
        </h1>

        <p className="text-zinc-600 mt-2 text-lg">
          Bem-vindo de volta ao seu painel de gestão.
        </p>
      </div>

      <section
        className="
          relative
          overflow-hidden
 
          p-10
          flex
          items-center
          shadow-2xl    
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${bussinescard})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />

        <div className="absolute top-[-50px] right-[-50px] w-[100px] h-[100px] bg-orange-400/20 blur-3xl rounded-full" />

        <div className="relative z-5 max-w-3xl text-white">
          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-white/10
              backdrop-blur-md
              px-5
              py-2
              rounded-full
              mb-8
              border
              border-white/10
            "
          >
            <Sparkles size={13} />
            <span className="font-medium">Inspiração do dia</span>
          </div>

          {loading ? (
            <h2 className="text-2xl font-bold">Carregando inspiração...</h2>
          ) : (
            <>
              <h2
                className="
                  text-3xl
                  font-bold
                  leading-tight
                "
              >
                “{quote?.texto}”
              </h2>

              <p className="mt-8 text-xl text-zinc-300">— {quote?.autor}</p>
            </>
          )}

          <button
            onClick={carregarMensagem}
            className="
              mt-10
              flex
              items-center
              gap-3
              bg-[#0e0799]
              hover:bg-[#72adec]
              px-6
              py-4
              rounded-2xl
              font-semibold
              transition
              hover:scale-105
              shadow-lg
            "
          >
            <RefreshCw size={18} />
            Nova mensagem
          </button>
        </div>

        <div
          className="
            absolute
            right-12
            bottom-12
            hidden
            lg:flex
            items-center
            justify-center
            w-28
            h-28
            rounded-full
            bg-white/10
            backdrop-blur-md
            border
            border-white/10
          "
        >
          <TrendingUp size={50} className="text-white" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-zinc-500 font-medium">Produtos cadastrados</h3>

          <p className="text-5xl font-bold mt-4 text-black">
            {cards?.produtosTotal ?? 0}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-zinc-500 font-medium">Vendas do mês</h3>

          <p className="text-5xl font-bold mt-4 text-black">"Implementar"</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-zinc-500 font-medium">
            Total de Itens Cadastrados
          </h3>

          <p className="text-5xl font-bold mt-4 text-black ">
            {cards.totalItens}
          </p>
        </div>
      </section>
    </main>
  );
}
