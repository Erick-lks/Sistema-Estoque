
import api from "../Services/Api";

export default function Relatorios() {


  const baixarRelatorio = async () => {
    try {
      const response = await api.get("/Estoque/Relatorio", {
        responseType: "blob",
      });

      console.log("Status:", response.status);
      console.log("Tipo:", response.headers["content-type"]);
      console.log("Tamanho:", response.data.size);

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;
      link.download = "relatorio_estoque.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Não foi possível gerar o relatório.");
    }
  };

 return (
  <div className="min-h-screen bg-[#EBE4D6] px-6 py-10">

   
    <div className="max-w-6xl mx-auto">
      <h1 className="font-bold text-4xl md:text-5xl text-[#1D162C]">
        Relatórios
      </h1>

      <p className="mt-2 text-gray-500 text-lg">
        Consulte e compartilhe informações do estoque do Geladoces.
      </p>
    </div>

    <div className="max-w-6xl mx-auto mt-10">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Gerar relatório
          </h2>

          <p className="text-gray-500 mt-1">
            Escolha uma das opções abaixo para obter as informações do estoque.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

        
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 text-green-700 p-3 rounded-xl text-2xl">
                📊
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Relatório Excel
                </h3>

                <p className="text-sm text-gray-500">
                  Baixe os dados do estoque
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Gere um arquivo Excel contendo as informações atuais do estoque
              e suas movimentações.
            </p>

            <button
              onClick={baixarRelatorio}
              className="w-full flex items-center justify-center gap-2
                         bg-green-600 hover:bg-green-700
                         text-white font-semibold
                         px-5 py-3 rounded-xl
                         shadow-md hover:shadow-lg
                         transition-all duration-200"
            >
              📊 Exportar para Excel
            </button>

          </div>

      
        </div>

      </div>

    </div>

  </div>
);
}
