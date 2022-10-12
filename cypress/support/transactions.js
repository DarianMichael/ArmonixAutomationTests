/// <reference types="Cypress" />
require('cypress-xpath');
import dayjs from 'dayjs';

const time = 2000;

Cypress.Commands.add('cTransacciones', () => {
  cy.visitUrl('https://pruebas.redsaludsa.com/aplicaciones/consultas360/#/mainView').then(() => {
    cy.wait(time);
    cy.url().should('eq', 'https://pruebas.redsaludsa.com/aplicaciones/consultas360/#/mainView');
    cy.xpath("//span[contains(.,'Transacciones')]").should("be.visible").click();
    cy.wait(time);
    cy.xpath("//span[contains(.,'Transacción')]").click();
    cy.wait(time);
  });
});

Cypress.Commands.add('typeContractNumber', (numberContract) => {
  cy.url().should('eq', 'https://pruebas.redsaludsa.com/aplicaciones/consultas360/#/transacciones/list')
  expect(numberContract).to.not.be.empty;
  cy.get('#numeroContrato').should("be.visible").type(numberContract);
  cy.get('button.btn').click();
  cy.wait(time);
});

Cypress.Commands.add('selContractOne', () => {
  cy.get(':nth-child(2) > :nth-child(1) > .centerMiddle > .fa').click();
  cy.wait(time);
});

Cypress.Commands.add('selContractTwo', () => {
  cy.xpath("(//i[@class='fa fa-file-text'])[2]").click();
  cy.wait(time);
});

Cypress.Commands.add('validateContract', (numContract) => {
  cy.filterForTransactionsService(numContract).then(s => {
    cy.wrap(s.data[0].EstadoContrato).as('status')
  })
  cy.getDefaulterDetailsService(numContract).then(s => {
    cy.wrap(s.Datos.NumeroCuotasMora).as('amountOfFees')
  })
  cy.get('@status').then(status => {
    cy.log('El contrato se encuentra: ' + status)
    if (status == 'Activo') {
      cy.get('@amountOfFees').then(amountOfFees => {
        cy.log('El contrato tiene ' + amountOfFees + ' cuotas en mora.')
        if (amountOfFees < 4) {
          cy.priceChange(numContract);
          cy.wait(time);
          cy.getMovementsService(numContract);
          cy.wait(time);
          cy.filterPaymentService(numContract);
        } else {
          cy.isDefaulter();
        }
      })
    } else {
      cy.isNotActive()
    }
  })
});

Cypress.Commands.add('isNotActive', () => {
  cy.get('h3').should("contain.text", "Contrato no está activo, no se procede al cambio.")
  cy.wait(time);
  cy.get('.confirm').click();
});

Cypress.Commands.add('isDefaulter', () => {
  cy.get('h3').should("contain.text", "Contrato con mas de 3 cuotas en mora, no procede al cambio.")
  cy.wait(time);
  cy.get('.confirm').click();
});

Cypress.Commands.add('menuChangeContractPrice', () => {
  cy.get('#menCambio > .caret').click();
  cy.wait(time);
  cy.xpath("//a[contains(.,'$priceChange')]".replace('$priceChange', 'Cambio Precio Contrato')).click();
  cy.wait(time);
});

Cypress.Commands.add('priceChange', (numContract) => {
  cy.isMultipleSelection(numContract).then(isMultipleSelection => {
    if (isMultipleSelection == true) {
      cy.get(':nth-child(3) > tr > :nth-child(2)').should('be.visible').click();
    } else {
      cy.xpath("(//td[contains(.,'1')])[8]").should('be.visible').click();
    }
  })
  cy.get(':nth-child(3) > .col-lg-4').should('not.be.empty').then(price => {
    let priced = price.text().replace('.', ',');
    cy.wrap(priced).as('price');
    cy.log('Valor seleccionado es: ' + priced);
  });
  cy.xpath('//button[normalize-space()="Guardar"]').should('have.attr', 'disabled')
  cy.wait(time);
  cy.get('#inpSol').type('Cambio Precio Prueba')
  cy.wait(time);
  cy.get('.m-t-md > :nth-child(1)').click();
  cy.wait(time);
  cy.get('.confirm').click()
  cy.wait(time);
  cy.get('.confirm').click()
});

Cypress.Commands.add('getCurrentDate', () => {
  const date = dayjs().date();
  const month = dayjs().month() + 1;
  const year = dayjs().year();
  let dateString;
  let monthString;
  if (date < 10) {
    dateString = '0' + date;
  } else {
    dateString = date;
  }

  if (month < 10) {
    monthString = '0' + month;
  } else {
    monthString = month;
  }
  const concatenatedDate = dateString + "/" + monthString + "/" + year;
  return (concatenatedDate);
});

Cypress.Commands.add('isMultipleSelection', (numContract) => {
  cy.filterPaymentService(numContract).then(amountMovement => {
    cy.wrap(amountMovement.total).as('amountMovement');
  });
  cy.get('@amountMovement').then(amountMovement => {
    if (amountMovement > 1) {
      return cy.wrap(true);
    }else{
      return cy.wrap(false);
    }
  });
});