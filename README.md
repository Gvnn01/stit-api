# stit-api
API do teste da stit
## Linguagem
 - Javascript
## Gerenciador de pacotes utilziado
 - npm
## Dependências utlizadas
 - body-parser (npm install body-parser)
 - express (npm install express)
 - jsonwebtoken (npm install jsonwebtoken)
 - nodemon (npm install nodemon)
## Comandos para inicialização e uso da api
 - Executar 'npm run start' para subir a api
 - Utilizar um disparador de requisições (nodemon ou postman) para acessar as seguintes rotas: <br/>
  (GET) http://localhost:3333/ - Home <br/>
  (POST) http://localhost:3333/login - Efetuar login utilizando no corpo da requisição um email e senha dos usuarios cadastrados no arquivo users.json </br>
  (GET) http://localhost:3333/products/:organizationName?tags=tag,tag - Efetuar a busca por itens correpondentes ao orgnizationName passado que estejam de acordo ao nivel do usuário. Caso sejam passadas tags, também serão consideradas <br/>
  
## Demonstração de funcionamento por imagens
 - Ao efetuar o login, será devolvida uma mensagem confirmando a autenticação junto com o token jwt
 ![Slide 1](https://user-images.githubusercontent.com/60143476/137523948-e591a21e-e813-416b-9db9-7693d808cc25.png)
 - Após efetuar o login, utilizando o token retornado pela requisição de login no header da requisição de busca, são retornados os itens e a quantidade de acordo com o nível do usuário mais o organizationName passado
 ![Slide 2](https://user-images.githubusercontent.com/60143476/137523960-ce580c22-8d43-4f79-9dc8-6993e16d6365.png)
 - Caso sejam passadas tags elas também serão consideradas
 ![Slide 3](https://user-images.githubusercontent.com/60143476/137523976-e2a64107-7d1a-4927-aee4-7d2a5f33bfec.png) 
