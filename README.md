## NodeJS TypeScript TypeORM and PostgresSQL

This is a simple REST API to a user registration developed

# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [Postgres](https://www.postgresql.org/download/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone https://github.com/manoel-lopes/user-registration-typescript-nodejs.git
```
- Install dependencies
```
cd <project_name>

npm i

or

yarn
```
- Create a `.env` on the root of your project with your database access credentials
```
DB_HOST = 'Your host'
DB_USER = 'Your database username'
DB_PASS = 'Your database password'
DB_NAME = 'Your database name'
```
- Create your database using the terminal
```
psql -U <user>
Password for user postgres: <password>
create database <database_name>;
```
You can also use SQL Shell or pgAdmin to create your database, as your prefer

- Run the migrations to create the project tables
```
npm run typeorm migration:run

or

yarn typeorm migration:run
```
# Start the server
- Run in development mode
```
npm run dev

or

yarn dev
```

## REST Architecture

- List all users - GET: http://localhost:3001/users

   . Em caso de sucesso retorna todos os planetas já cadastrados no banco de dados, cada planeta no formato JSON, contendo nome, clima, terreno e número de aparições.

- Get a user - GET: http://localhost:3001/users/:id
body:

  {
	"name": "user",
   "email": "user@email.com"
  }

response:

[
  {
	"name": "user",
   "email": "user@email.com"
  },
  {
	"name": "user2",
   "email": "user2@email.com"
  },
]
   
- Adicionar planeta - POST: http://localhost:3001/users/adicionar 
  
  . Adiciona um planeta ao banco de dados, sendo necessário inserir o nome, clima e terreno. O Id é gerado automaticamente, e o número de aparições também é gerado consumindo os dados da API Swapi. Caso o planeta não esteja contido no universo Star Wars, ele será cadastrado como tendo 0 aparições.
  
- Buscar planeta por Id - GET: http://localhost:3001/users/id/{inserir-id-aqui}

  . Utiliza o Id gerado automaticamente quando o planeta é adicionado ao banco de dados. Retorna o arquivo no formato JSON com sucesso caso exista. Para essa busca é necessário inserir o Id após /id/.
     
- Deletar um planeta por Id - DELETE: http://localhost:3001/users/id/deletar/{inserir-id-aqui}

   . Remove o planeta utilizando o Id que foi gerado automaticamente, utilizando o método DELETE. 

