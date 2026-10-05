import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../Services/Api";
import { useState } from "react";

export default function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/Auth/Login", {
        cpf,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      console.log("Login realizado com sucesso");

    navigate("/", { replace: true });
    } catch (error) {
      console.error("Erro no login:", error);

      alert("Falha no Login, tente novamente!");
    }
  }

  return (
    <motion.div
      className="
        min-h-screen
        w-full
        bg-[#F5EFE6]
        flex
        items-center
        justify-center
        px-4
        py-8
        overflow-hidden
        relative
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      <motion.div
        className="
          absolute
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#E7DCCB]
          blur-3xl
          opacity-60
        "
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

   
      <motion.div
        className="
          relative
          z-10
          w-full
          max-w-[1200px]
          min-h-[700px]
          bg-[#FAF7F2]
          rounded-3xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
          lg:flex-row
        "
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >

        
        <div
          className="
            relative
            w-full
            lg:w-[52%]
            min-h-[320px]
            lg:min-h-[700px]
            bg-[#18181B]
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >

          
          <motion.div
            className="
              absolute
              w-[500px]
              h-[500px]
              rounded-full
              border
              border-[#EA580C]/20
            "
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="
              absolute
              w-[350px]
              h-[350px]
              rounded-full
              border
              border-[#EA580C]/30
            "
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="
              absolute
              w-4
              h-4
              rounded-full
              bg-[#EA580C]
              shadow-lg
              shadow-orange-900/40
            "
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

      
          <div className="relative z-10 text-center px-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >

              <div
                className="
                  w-16
                  h-1
                  bg-[#EA580C]
                  rounded-full
                  mx-auto
                  mb-8
                "
              />

              <h2
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-bold
                  text-[#FAF7F2]
                "
              >
                Sistema de Estoque
              </h2>

              <p
                className="
                  mt-5
                  text-[#A1A1AA]
                  text-base
                  lg:text-lg
                "
              >
                Gestão simples, organizada e eficiente.
              </p>

            </motion.div>

          </div>
        </div>

    
        <div
          className="
            w-full
            lg:w-[48%]
            flex
            items-center
            justify-center
            px-8
            sm:px-12
            lg:px-16
            xl:px-20
            py-14
            bg-[#FAF7F2]
          "
        >

          <div className="w-full max-w-md">

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >


              <h1
                className="
                  text-5xl
                  font-semibold
                  text-[#18181B]
                "
              >
                Login
              </h1>

              <p
                className="
                  mt-3
                  mb-10
                  text-[#71717A]
                "
              >
                Entre com seus dados para continuar.
              </p>

            </motion.div>

           
            <form onSubmit={handleLogin}>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-[#3F3F46]
                    mb-2
                  "
                >
                  CPF
                </label>

                <input
                  type="text"
                  placeholder="Digite seu CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="
                    w-full
                    bg-white
                    border
                    border-[#D6D3D1]
                    rounded-xl
                    px-4
                    py-3.5
                    text-[#18181B]
                    outline-none
                    transition
                    focus:border-[#EA580C]
                    focus:ring-2
                    focus:ring-[#EA580C]/20
                  "
                />

              </motion.div>

              
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-[#3F3F46]
                    mb-2
                  "
                >
                  Senha
                </label>

                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    bg-white
                    border
                    border-[#D6D3D1]
                    rounded-xl
                    px-4
                    py-3.5
                    text-[#18181B]
                    outline-none
                    transition
                    focus:border-[#EA580C]
                    focus:ring-2
                    focus:ring-[#EA580C]/20
                  "
                />

              </motion.div>

            
              <motion.button
                type="submit"
                className="
                  w-full
                  bg-[#EA580C]
                  text-white
                  py-3.5
                  rounded-xl
                  font-semibold
                  shadow-lg
                  shadow-orange-900/10
                  cursor-pointer
                "
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#C2410C",
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Entrar
              </motion.button>

            </form>

          </div>

        </div>

      </motion.div>

    </motion.div>
  );
}