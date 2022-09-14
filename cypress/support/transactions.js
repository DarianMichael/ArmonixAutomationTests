require('cypress-xpath');

const time = 2000;

Cypress.Commands.add('transactiosCombo', () => {
    cy.get(':nth-child(9) > .has-arrow > .nav-label').should("be.visible").click();
    cy.wait(time);
    cy.get('.active > .nav > :nth-child(1) > a > .nav-label').click();
    cy.wait(time);
    cy.get('#numeroContrato').should("be.visible").type(81701);
    cy.wait(time);
    cy.get('button.btn').click();
    cy.wait(time);
    cy.get(':nth-child(2) > :nth-child(1) > .centerMiddle > .fa').click();
    cy.wait(time);
    cy.xpath("//span[@class='col-lg-2'][contains(.,'Anulado')]").should("not.contain.text", "Activo");
    cy.wait(time);
    cy.get('#menCambio > .caret').click();
    cy.wait(time);
    cy.get('#liCambio > .dropdown-menu > :nth-child(12) > a').click();
    cy.wait(time);
    cy.xpath("//h3[contains(.,'Contrato no está activo, no se procede al cambio.')]")
    .should("contain.text", "Contrato no está activo, no se procede al cambio.")
    cy.wait(time);
    cy.get('.confirm').click();
    cy.wait(time);
  });