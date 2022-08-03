// Author: Allen Tam

import { centerName } from "../../common.cy";

describe("create a center", () => {
  // Setup
  beforeEach(() => {
    cy.initPage();
    cy.login("mifos", "password");
    cy.url().should("include", "/home");
    // Teardown
  });
  afterEach(() => {
    cy.get("#user-dropdown").trigger("mouseover");
    cy.get("#logout").click();
    cy.get("#uid").should("be.visible");
  });
  it("create a center", { tags: ["@happy_path"] }, () => {
    cy.get(".paddedleft strong").should("contain.text", "Welcome, mifos");
    cy.wait(1000);
    cy.get(".left-nav .fa-map-marker").click();
    cy.get("#name").type(centerName);
    cy.get("#save").click();
    //assertion
    cy.url().should("include", "/#/viewcenter/");
    cy.contains("Summary");

    //Delete Center
    cy.get("span.btn-group.dropdown > .btn.btn-primary").click();
    cy.get(".lli.ng-binding,[has-permission='DELETE_CENTER']").click();
    cy.get(".modal-body > .btn-primary").click();
  });
  it("create an invalid center", { tags: ["@negative"] }, () => {
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
