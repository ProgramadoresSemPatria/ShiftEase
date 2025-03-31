ShiftEASE

Este projeto é um Software as a Service (SAAS) desenvolvido para empresas que operam em regime de plantões e turnos. A plataforma permite que os usuários tenham uma visão geral das escalas e que possam acessar suas próprias escalas individuais, de forma intuitiva e organizada.

🚀 Funcionalidades:

Painel do Funcionário: Exibição personalizada da escala individual.

Solicitação de Trocas de Turnos: Funcionários podem solicitar trocas de turnos.

Gerenciamento de Escalas: Criar, editar e visualizar turnos e escalas.

Gestão de Departamentos: Estruturação da empresa por setores.

Autenticação Robusta: Implementação de autenticação segura com tokens JWT.

🛠️ Tecnologias Utilizadas:

Back-end: Node.js, Nest, PostgreSQL

Front-end: React.js, Vite

⚡ Pré-requisitos:

NVM e Node.js (versão 20.11)

Yarn instalado

Docker Compose instalado

Configurar variáveis de ambiente de acordo com os arquivos .env.example

🔧 Passos para execução:

Acesse a pasta APPS/API e execute o comando para subir o banco no container Docker:
```yarn db:run```

Rode as migrações do Prisma:
```yarn prisma migrate dev```  

Execute a seed do banco de dados:
```yarn db:seed``` 

Para iniciar o projeto, execute o comando na pasta raiz:
```yarn dev```

✒️ Autores:

 [Lucas Franco](https://github.com/lcs-franco)  
 [Pablo Matheus](https://github.com/itspablomontes)  
 [Lucas Donato](https://github.com/LGDonato)  
