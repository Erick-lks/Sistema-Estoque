import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import Loading from "../assets/Loading.json";

export default function TelaDefault() {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Loading,
    });

    return () => anim.destroy();
  }, []);

  return (
    <div>
      <main className="flex-1 bg-[#EBE4D6] p-6 w-full h-full">
        <div className="flex justify-between items-center bg-amber-900 text-white p-4 rounded-xl">
          <h1 className="text-2xl font-semibold">Serviço em desenvolvimento</h1>
        </div>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div ref={containerRef} className="h-100 w-80" />

          <h2 className="mt-4 text-gray-600">
            Em breve este recurso será liberado
          </h2>
        </div>
      </main>
    </div>
  );
}
