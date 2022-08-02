import { faker } from "@faker-js/faker";
const center = faker.name.findName();

describe("create a center", () => {
  beforeEach(() => {
    cy.initPage();
    cy.login("mifos", "password");
    cy.url().should("include", "/home");
  });
  it("create a center", () => {
    cy.get(".paddedleft strong").should("contain.text", "Welcome, mifos");
    cy.wait(1000);
    cy.get(".left-nav .fa-map-marker").click();
    cy.get("#name").type(center);
    cy.get("#save").click();
    //assertion
    cy.url().should("include", "/#/viewcenter/");
    cy.contains("Summary");
  });
  it("create an invalid center", () => {
    cy.get(".paddedleft strong").should("contain.text", "Welcome, mifos");
    cy.wait(1000);
    cy.get(".left-nav .fa-map-marker").click();
    cy.get("#name").type(" ");
    cy.get("#save").click();

    //assertion
    cy.url().should("include", "/#/createcenter");
    cy.contains("Required Field");
  });
});
