import SignupFactory from "../factories/SignupFactory";
import signupPage from "../pages/SignupPage";
//import signup from "../pages/SignupPage";

describe("Cadastro", () => {
  //nome suíte
  /* beforeEach(function () {
    cy.log("Tudo aqui é executado sempre ANTES de cada caso de teste");
    cy.fixture("entregador").then((massa) => {
      this.entregador = massa;
    });
  }); */

  /*  before(function () {
    cy.log(
      "Tudo aqui é executado uma única vez ANTES de todos os casos de testes"
    );
  });

  beforeEach(function () {
    cy.log("Tudo aqui é executado sempre ANTES de cada caso de teste");
  });

  after(function () {
    cy.log(
      "Tudo aqui é executado uma única vez DEPOIS de todos os casos de testes"
    );
  });

  afterEach(function () {
    cy.log("Tudo aqui é executado sempre DEPOIS de cada caso de teste");
  }); */

  it("Usuário deve se tornar um entregador", function () {
    //caso de teste 1

    var entregador = SignupFactory.entregador();

    signupPage.go();
    signupPage.fillForm(entregador);
    signupPage.submit();

    const expectedMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
    signupPage.modalContentShouldBe(expectedMessage);
  });

  it("CPF incorreto", function () {
    //caso de teste 2

    var entregador = SignupFactory.entregador();
    entregador.cpf = "0000000aq";

    signupPage.go();
    signupPage.fillForm(entregador);
    signupPage.submit();
    signupPage.alertMessageShouldBe("Oops! CPF inválido");
  });

  it("Email incorreto", function () {
    //caso de teste 3

    var entregador = SignupFactory.entregador();
    entregador.email = "user.com.br";

    signupPage.go();
    signupPage.fillForm(entregador);
    signupPage.submit();
    signupPage.alertMessageShouldBe("Oops! Email com formato inválido.");
  });

  it("Campos obrigatórios", function () {
    //caso de teste 4

    signupPage.go();
    signupPage.submit();
    signupPage.alertMessageShouldBe("É necessário informar o nome");
    signupPage.alertMessageShouldBe("É necessário informar o CPF");
    signupPage.alertMessageShouldBe("É necessário informar o email");
    signupPage.alertMessageShouldBe("É necessário informar o CEP");
    signupPage.alertMessageShouldBe(
      "É necessário informar o número do endereço"
    );
    signupPage.alertMessageShouldBe("Selecione o método de entrega");
    signupPage.alertMessageShouldBe("Adicione uma foto da sua CNH");
  });
});
