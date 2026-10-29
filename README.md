📦 Sistema de Estoque
Java Spring Boot React Vite PostgreSQL License

Sistema web para gerenciamento de estoque desenvolvido com Spring Boot no backend e React + Vite no frontend.

O projeto permite controlar produtos em estoque através de uma interface moderna, consumindo uma API REST responsável pelo gerenciamento dos dados.

📑 Índice
Sobre
Funcionalidades
Tecnologias
Arquitetura
Estrutura do Projeto
Instalação
Executando o Projeto
Endpoints
Roadmap
Melhorias Futuras
Boas Práticas
Autor
📖 Sobre
O Sistema de Estoque foi desenvolvido para praticar conceitos de desenvolvimento Full Stack, aplicando arquitetura em camadas no backend e componentes reutilizáveis no frontend.

O projeto demonstra conhecimentos em:

Desenvolvimento de APIs REST
Organização em camadas
React moderno
Integração Frontend x Backend
Persistência de dados
DTO Pattern
Mapper Pattern
✨ Funcionalidades
Cadastro de produtos
Atualização de produtos
Exclusão de produtos
Consulta de produtos
Dashboard
Controle de quantidade em estoque
Pesquisa de produtos
Consumo de API REST
Interface responsiva
Consumo de API externa para frases motivacionais (Quote Service)
🛠 Tecnologias
Backend
Java
Spring Boot
Spring Web
Spring Data JPA
Maven
PostgreSQL
Docker
Frontend
React 19
Vite
Tailwind CSS
Axios
React Router DOM
Lucide React
Lottie
🏛 Arquitetura
O backend segue uma arquitetura em camadas:

Controller
      │
Service
      │
Repository
      │
Database
Também utiliza:

DTO Pattern
Mapper Pattern
Separação de responsabilidades
API REST
📂 Estrutura
Sistema-Estoque
│
├── Backend
│   ├── Controller
│   ├── DTOs
│   ├── Entity
│   ├── Mapper
│   ├── Repository
│   ├── Services
│   └── Dockerfile
│
└── Frontend
    └── Estoque-Dashboard
        ├── Components
        ├── Pages
        ├── Assets
        ├── Router
        └── Services
🚀 Instalação
Clone o projeto
git clone https://github.com/Erick-lks/Sistema-Estoque.git
Backend
Entre na pasta

cd Backend
Instale as dependências

mvn clean install
Execute

mvn spring-boot:run
Frontend
Entre na pasta

cd Frontend/Estoque-Dashboard
Instale as dependências

npm install
Execute

npm run dev
🌐 Endpoints
Método	Endpoint	Descrição
GET	/produtos	Lista produtos
GET	/produtos/{id}	Busca produto
POST	/produtos	Cadastra produto
PUT	/produtos/{id}	Atualiza produto
DELETE	/produtos/{id}	Remove produto
Os endpoints podem variar conforme a implementação atual do backend.

📸 Screenshots
Dashboard
Adicione uma captura da tela inicial.

Cadastro
Adicione uma captura do formulário de cadastro.

Listagem
Adicione uma captura da listagem de produtos.

🗺 Roadmap
Versão 1.1
 Paginação de produtos
 Ordenação por nome, preço e quantidade
 Pesquisa avançada
 Validação completa dos formulários
Versão 1.2
 Dashboard com gráficos
 Indicadores de estoque
 Produtos em baixa quantidade
 Exportação para Excel
Versão 1.3
 Histórico de movimentações
 Entrada e saída de estoque
 Registro de vendas
 Relatórios em PDF
Versão 2.0
 Login de usuários
 Spring Security
 JWT
 Controle de permissões
 Auditoria de operações
Melhorias Técnicas
 Swagger/OpenAPI
 Testes unitários (JUnit)
 Testes de integração
 Docker Compose
 CI/CD com GitHub Actions
 Deploy automatizado
 Monitoramento da aplicação
 Cache para consultas
📚 Boas práticas
Arquitetura em camadas
DTO Pattern
Mapper Pattern
Repository Pattern
Separação de responsabilidades
REST API
Componentização no React
Organização por módulos
Código reutilizável
🎯 Objetivos do Projeto
Consolidar conhecimentos em Java e Spring Boot.
Desenvolver aplicações Full Stack utilizando React.
Aplicar boas práticas de arquitetura de software.
Construir um projeto de portfólio voltado ao mercado.
👨‍💻 Autor
Erick Caetano

GitHub: https://github.com/Erick-lks
LinkedIn: https://www.linkedin.com/in/erickcaetano/
📄 Licença
Este projeto é disponibilizado para fins de estudo e desenvolvimento de portfólio.
