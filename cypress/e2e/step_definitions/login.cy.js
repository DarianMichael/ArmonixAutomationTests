import {
    Given,
    When,
    And,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  
  Given("Un usuario abre la página web", () => {
    cy.visitUrl();
  });

  When("Un usuario ingresa el nombre de usuario {string}", (username) => {
    cy.typeUsername(username);
  });

  When("Un usuario proporciona credenciales incorrectas {string}{string}", (username, password) => {
    cy.log(username);
    cy.log(password);
    cy.typeUsername(username);
    cy.typePassword(password);
  });

  And("Un usuario ingresa la contraseña {string}", (password) => {
    cy.typePassword(password);
  });

  And("Un usuario hace click en el botón de inicio de sesión", () => {
    cy.clickLogin();
  });

  Then("El título de la página contendrá {string}", (title) => {
    cy.validateTitle(title);
  });

  Then("Se muestra el mensaje de error {string}", (errorMessage) => {
    cy.errorMessage(errorMessage);
  });

  Then("Despliega combo transacciones", () => {
    cy.transactiosCombo();
  });
