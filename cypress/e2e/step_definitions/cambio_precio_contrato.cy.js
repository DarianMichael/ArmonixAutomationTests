import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

Given("Un usuario se loggea en Armonix {string}{string}", (username, password) => {
  cy.session('Login', () => {
    cy.visitUrl();
    cy.log(username)
    cy.log(password)
    cy.typeUsername(username);
    cy.typePassword(password);
    cy.clickLogin();
    cy.getTokenService(username, password);
  });
});

When("Un usuario abre el catalogo Transacciones y busca por el numero de contrato {string}", (numContract) => {
  cy.cTransacciones();
  cy.typeContractNumber(numContract);
});

Then('Un usuario procede al cambio del precio del contrato segun los requerimientos {string}', (numContract) => {
  cy.selContractOne()
  cy.menuChangeContractPrice()
  cy.validateContract(numContract)
});


