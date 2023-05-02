## Executando

Baixe, extraia e dê npm install, para executar utilize o comando:

**npm start** ou **npm run build**<br>
Acesse em http://localhost:3000

Insira nas variáveis de ambiente o link <br>
REACT_APP_BASE_URL = URL
### Desktop
![image](https://user-images.githubusercontent.com/101233631/235776215-ab73cc5a-317f-4fe8-a148-4e11481b4327.png)
![image](https://user-images.githubusercontent.com/101233631/235775124-7ca1fa3a-d0c4-462f-baef-a659a498c0be.png)
![image](https://user-images.githubusercontent.com/101233631/235775342-94a14b6e-43f4-45e4-808d-ce0638254123.png)
<br>
![image](https://user-images.githubusercontent.com/101233631/235775538-725de1bb-8117-49b7-8961-83e064145f25.png)
![image](https://user-images.githubusercontent.com/101233631/235776412-e86db48f-e371-4d6d-b02f-1170d170e62d.png)

### Mobile
A única diferença é o menu lateral e a tabela responsiva<br>
![image](https://user-images.githubusercontent.com/101233631/235777809-3d399bdd-2f62-40aa-96c0-bb262787d91e.png)
![image](https://user-images.githubusercontent.com/101233631/235778911-c3ed71a4-2ea7-4d09-a5c4-f87d1b18cbc3.png)

### Instruções

A tela inicial ou página principal mostra quando ocorrerá o próximo coffee até 5 dias depois do dia atual. Se for no dia atual, a tabela habilitará a opção de confirmar presença e, se passar da data, ficará um ícone de X se ele não esteve presente ou um V se esteve presente no dia.

Para criar um coffee, é necessário inserir o cpf de um colaborador já cadastrado e inserir pelo menos um produto. Quando digitar o(s) produto(s), no campo ficará minúsculo, mas quando visualizar na tabela estará maiúscula. Para enviar para os dados, é preciso clicar duas vezes no botão.

Para criar um colaborador, é preciso inserir um CPF válido e um nome que ainda não esteja cadastrado

Só é possível alterar o nome do colaborador se o nome que estiver tentando mudar não estiver cadastrado no sistema.

### O que há na aplicação

Utilização NativeQuery (SQL) para inserção, atualização, consulta e exclusão. <a href="https://github.com/gabrieleugenio1/desafio-back-end">Link do Back-End</a><br>
O nome do colaborador não pode existir.<br>
Não pode ter cpf iguais e precisa ser válido.<br>
O colaborador pode apenas atualizar o seu nome.<br>
Não pode repetir opção de café da manhã mesmo que seja outro colaborador.<br>
A data de realização do café é maior que a data atual.<br>
Aparece loading enquanto está dando carregando os dados das tabelas.
