### Requisitos Criação de novo Serviço
- Deve iniciar a pagina com os valores corretos;
- Deve exibir o painel de erro caso a busca de serviços retorne com erro;
- Deve iniciar o formulario para criação com os valores corretos;
  * Deve ser possível informar o nome do serviço;
  * Deve ser possível informar a descrição do serviço;
  * Não deve ser possível cadastrar serviços com nome inferior a 3 caracteres;
  * Não deve ser possível cadastrar serviço com o mesmo nome;
  * Deve exibir erro no helper do input nome do Serviço caso ocorram erros com o nome;
  * Quando fechada a tela de cadastro os dados do formulário devem ser resetados;
  * Ao criar um serviço com sucesso o mesmo deve ser adicionado ao topo da lista de serviços;

### Backlog

- No primeiro acesso a tela a consulta de serviços deve ser chamada apenas uma vez;
- Quando filtrar por status devem ser exibidos apenas resultados com o filtro informado;
- Ao pesquisar por serviços devem ser exibidos apenas resultados com o filtro informado;
- Deve exibir header e painel de informações de status;
- Deve iniciar com o os valores corretos;
  * Deve ser possível informar o preço do serviço;
  * Deve ser possível informar o tempo de execução do serviço;
  * Deve ser possível informar o status do serviço;

- Deve iniciar o formulario para edição com os valores corretos;
- Deve bloquear campos e exibir loading enquanto realizada gravação/eliminação;
- Deve ser possível eliminar o produto na tela de edição;
- Ao remover um serviço o mesmo deve ser eliminado da lista geral;
- Não deve ser chamada a rota para buscar dos serviços após a eliminação de um serviço;
- Deve exibir mensagem de retorno caso a edição retorne com erro;
- Deve exibir mensagem de retorno caso a eliminação retorne com erro;
- Ao editar um serviço o mesmo deve ser atualizada na lista geral sem mudar a ordem da lista;
- Exibir feedback ao criar um serviço com sucesso;
- Exibir feedback ao atualizar um serviço com sucesso;
- Exibir feedback ao eliminar um serviço com sucesso;

-- deve abrir dialog para confirmaação ao clicar para excluir um servico;
-- ao eliminar um serviço com sucesso deve direcionar para a tela de servicos;
-- ao eliminar um servico com sucesso o formulario deve ser resetado;
-- ao tentar eliminar um serviço e sem sucesso deve exibir a mensagem de erro;
