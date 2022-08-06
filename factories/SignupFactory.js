var faker = require("faker");
var cpf = require("gerador-validador-cpf");

export default {
  entregador: function () {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();

    var data = {
      nome: `${firstName} ${lastName}`,
      cpf: cpf.generate(),
      email: faker.internet.email(firstName),
      whatsapp: "9999999999",

      endereco: {
        cep: "88818688",
        rua: "Rua Rosa Bonfante",
        numero: "185",
        complemento: "casa",
        bairro: "Laranjinha",
        cidade_uf: "Criciúma/SC",
      },
      metodo_entrega: "Moto",
      cnh: "cnh-digital.jpg",
    };

    return data;
  },
};
