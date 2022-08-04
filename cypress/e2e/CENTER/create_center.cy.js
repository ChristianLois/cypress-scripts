// Author: Allen Tam
import COMPONENT_HEADER from "../../resources/COMPONENTS/HEADER/component_header.json";
import PAGE_HOME from "../../resources/PAGES/HOME/page_home.json";
import PAGE_LOGIN from "../../resources/PAGES/AUTHENTICATION/page_login.json";
import EXPECTED_LOGIN from "../../data/EXPECTED/AUTHENTICATION/expected_login.json";
import INPUT_LOGIN from "../../data/INPUTS/AUTHENTICATION/input_login.json";
import CENTER from "../../resources/PAGES/CENTER/page_center.json";
import EXPECTED_CENTER from "../../data/CENTER/CREATE_CENTER/expected_create_center.json";
import COMPONENT_CENTER from "../../resources/COMPONENTS/CENTER/component_center.json";
import { centerName } from "../../common.cy";

describe("create a center", () => {
  // Setup
  beforeEach(() => {
    cy.initPage();
    cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD);

    cy.url().should("include", EXPECTED_LOGIN.VALID.PATH_URL);
    cy.get(PAGE_HOME.TEXT_WELCOME).should(
      "contain.text",
      EXPECTED_LOGIN.VALID.TEXT_WELCOME
    );
    // Teardown
  });
  afterEach(() => {
    cy.get(COMPONENT_HEADER.DROPDOWN_MIFOS).trigger("mouseover");
    cy.get(COMPONENT_HEADER.BUTTON_LOGOUT).click();
    cy.get(PAGE_LOGIN.TEXTFIELD_USERNAME).should("be.visible");
  });
  it(
    "create a center",
    {
      tags: [
        "smoke_test",
        "create_a_center_Test_Case",
        "regression",
        "happy_path",
      ],
    },
    () => {
      cy.get(EXPECTED_CENTER.VALID_CENTER_CREATION.HEADER_TEXT).should(
        "contain.text",
        "Welcome, mifos"
      );
      cy.wait(1000);
      cy.get(COMPONENT_CENTER.NAVBAR_CENTER_BUTTON).click();
      cy.get(CENTER.CREATE_CENTER.TEXTFIELD_CENTER_NAME).type(centerName);
      cy.get(CENTER.CREATE_CENTER.SUBMIT_BTN).click();
      //assertion
      cy.url().should(
        "include",
        EXPECTED_CENTER.VALID_CENTER_CREATION.PATH_URL
      );
      cy.contains("Summary");

      //Delete Center
      cy.get(CENTER.DELETE_CENTER.DROPDOWN_BTN).click();
      cy.get(CENTER.DELETE_CENTER.DELETE_BTN).click();
      cy.get(CENTER.DELETE_CENTER.CONFIRM_BTN).click();
    }
  );
  it(
    "create an invalid center",
    {
      tags: [
        "smoke_test",
        "create_an_invalid_center",
        "regression",
        "negative",
      ],
    },
    () => {
      cy.get(EXPECTED_CENTER.VALID_CENTER_CREATION.HEADER_TEXT).should(
        "contain.text",
        "Welcome, mifos"
      );
      cy.wait(1000);
      cy.get(COMPONENT_CENTER.NAVBAR_CENTER_BUTTON).click();
      cy.get(CENTER.CREATE_CENTER.TEXTFIELD_CENTER_NAME).type(" ");
      cy.get(CENTER.CREATE_CENTER.SUBMIT_BTN).click();

      //assertion
      cy.url().should(
        "include",
        EXPECTED_CENTER.INVALID_CENTER_CREATION.PATH_URL
      );
      cy.contains("Required Field");
    }
  );
});
