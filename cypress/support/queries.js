require('cypress-xpath');

const time = 2000;

Cypress.Commands.add('cQueries', () => {
    cy.xpath("//span[contains(.,'Consultas')]").should("be.visible").click();
    cy.wait(time);
    cy.xpath("(//span[contains(.,'Contratos')])[1]").click();
    cy.wait(time);
});

  Cypress.Commands.add('typeNumberContract', (numberContract) =>{
    expect(numberContract).to.not.be.empty;
    cy.xpath("//input[@name='numeroContrato']").should('be.visible').type(numberContract);
    cy.wait(time);
    cy.xpath("//button[@type='submit']").click();
  });

  Cypress.Commands.add('seeQuotes', () =>{
    cy.get('#cotizacionesTab').should('be.visible').click();
  });

  Cypress.Commands.add('validateNumberAmountOfDelinquent', () =>{
    cy.get('#divResultadoBusquedaCotizaciones > .col-lg-12 > :nth-child(2) > p').then(($numberDelinquent) =>{
        cy.log($numberDelinquent.text())
        if(parseInt($numberDelinquent.text()) >= 4){

        }
    })
  });