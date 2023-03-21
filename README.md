## Introdução

A aplicação foi desenvolvida como projeto de conclusão de curso do DevEvolution da IXCSoft, consiste em uma aplicação nodeJS Express que fornece uma série de recursos para gerenciar pedidos e produtos. Essa documentação tem como objetivo fornecer todas as informações necessárias para a utilização do sistema.

## Configuração inicial

Para iniciar o sistema, certifique-se de que o seu ambiente possua o NodeJS e MongoDB instalados. Após isso, siga as instruções abaixo:

1. Clone o repositório do projeto para o seu computador.
2. Abra um terminal e navegue até a pasta raiz do projeto.
3. Execute o comando `npm install` para instalar as dependências do projeto e 'npm install pm2 -g' para instalar globalmente o processo de deploy da aplicação.
4. Execute o comando `pm2 start` no terminal acessando o diretório da aplicação para iniciar. Estará disponível para acesso em http://localhost:3000/. Basta acessar em seu navegador.

## Autenticação

A autenticação é baseada em passport e tokens JWT utilizada em todas as rotas da aplicação. Para obter um token e utilizar as rotas via API no Insomnia ou Postman, é necessário criar um usuário, realizar o login e acesar a tela de API, porém irei explicar logo mais tarde!









## Considerações finais
Esperamos que essa documentação seja útil para utilizar a aplicação de forma correta e eficiente.
