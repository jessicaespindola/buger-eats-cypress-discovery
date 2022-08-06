class SignupPage {
  go() {
    // acessa a pagina de cadastro
    cy.viewport(1440, 900); //tamanho da janela
    cy.visit("/");

    cy.get('a[href="/deliver"]').click();
    cy.get("#page-deliver form h1").should(
      "have.text",
      "Cadastre-se para  fazer entregas"
    );
  }

  fillForm(entregador) {
    //preencher o formulario
    cy.get('input[name="fullName"]').type(entregador.nome);
    cy.get('input[name="cpf"]').type(entregador.cpf);
    cy.get('input[name="email"]').type(entregador.email);
    cy.get('input[name="whatsapp"]').type(entregador.whatsapp);

    cy.get('input[name="postalcode"]').type(entregador.endereco.cep);
    cy.get('input[type=button][value="Buscar CEP"]').click();

    cy.get('input[name="address-number"]').type(entregador.endereco.numero);
    cy.get('input[name="address-details"]').type(
      entregador.endereco.complemento
    );

    //Verifica se as informações preenchidas estão corretas

    cy.get('input[name="address"]').should(
      "have.value",
      entregador.endereco.rua
    );
    cy.get('input[name="district"]').should(
      "have.value",
      entregador.endereco.bairro
    );
    cy.get('input[name="city-uf"]').should(
      "have.value",
      entregador.endereco.cidade_uf
    );

    //Seleciona o Método de entrega definido nas variaveis
    cy.contains(".delivery-method li", entregador.metodo_entrega).click();
    cy.get('input[accept^="image"]').attachFile("/images/" + entregador.cnh);
  }

  submit() {
    cy.get('form button[type="submit"]').click();
  }

  modalContentShouldBe(expectedMessage) {
    cy.get(".swal2-container .swal2-html-container").should(
      "have.text",
      expectedMessage
    );
  }

  alertMessageShouldBe(expectedMessage) {
    //cy.get(".alert-error").should("have.text", expectedMessage); //obtem o elemento e depois verifica se o texto é igual
    cy.contains(".alert-error", expectedMessage).should("be.visible");
  }
}
export default new SignupPage();
