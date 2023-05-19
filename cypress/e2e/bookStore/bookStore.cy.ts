import startCase from "lodash/startCase";

describe("test bookStore page", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  });

  // HELPERS
  const bookValueKeys = ["name", "category", "price", "description"];

  const testBookValues: {[key: string]: string} = {
    name: "cypress test book name",
    category: "cypress test book name category",
    price: "2.99",
    description: "cypress test book name description"
  };

  const testBookValuesAfterEdition: {[key: string]: string} = {
    name: "cypress test __updated__ book name",
    category: "cypress test __updated__ book name category",
    price: "3.99",
    description: "cypress test __updated__ book name description"
  };

  function editNewBook() {
    cy.contains("button", "Add Book").click();

    bookValueKeys.forEach(key => {
      cy.get(`input[name="${key}"]`).type(testBookValues[key]);
    });
  }

  function addAndSaveNewBook() {
    editNewBook();
    cy.contains("button", "Save").click();
  }

  // add test book and update their values in the editing form, before cancel or save
  function editExistingBook() {
    addAndSaveNewBook();

    cy.contains(`[data-cy="book-item"]`, testBookValues.name).should("have.length", 1);
    cy.contains(`[data-cy="book-item"]`, testBookValues.name).contains("button", "Edit").should("be.visible").click();

    cy.contains(".MuiDialog-root", "Edit Book").should('be.visible');

    // the form should be prefilled by the book value
    ["name", "category", "price", "description"].forEach(inputName => {
      cy.contains(".MuiDialog-root", "Edit Book").find(`input[name="${inputName}"]`)
        .should('be.visible')
        .should('have.attr', 'id', inputName)
        .should('have.attr', 'value', testBookValues[inputName]);

      cy.contains(".MuiDialog-root", "Edit Book").contains("label", startCase(inputName))
        .should('have.attr', 'for', inputName);
    });

    // should be able to update value
    ["name", "category", "price", "description"].forEach(inputName => {
      cy.contains(".MuiDialog-root", "Edit Book").find(`input[name="${inputName}"]`)
        .clear()
        .type(testBookValuesAfterEdition[inputName]);
    });
  }

  function testBookShouldExist() {
    bookValueKeys.forEach(key => {
      cy.contains(`[data-cy="book-item-${key}"]`, testBookValues[key]);
    });
  }

  function testBookShouldNotExist() {
    bookValueKeys.forEach(key => {
      cy.contains(`[data-cy="book-item-${key}"]`, testBookValues[key]).should('not.exist');
    });
  }

  function editedTestBookShouldExist() {
    bookValueKeys.forEach(key => {
      cy.contains(`[data-cy="book-item-${key}"]`, testBookValuesAfterEdition[key]);
    });
  }

  function editedTestBookShouldNotExist() {
    bookValueKeys.forEach(key => {
      cy.contains(`[data-cy="book-item-${key}"]`, testBookValuesAfterEdition[key]).should('not.exist');
    });
  }


  // TESTS

  it("test book should not exist on fresh set up", () => {
    testBookShouldNotExist();
  });

  it("should be able to add new book", () => {
    addAndSaveNewBook();
    testBookShouldExist();
  });

  it("should not add new book if clicking cancel in the form", () => {
    editNewBook();
    cy.contains("button", "Cancel").click();
    testBookShouldNotExist();
  });


  it("should be able to cancel editing book", () => {
    editExistingBook();
    cy.contains(".MuiDialog-root", "Edit Book").contains("button", "Cancel").click();
    testBookShouldExist();
    editedTestBookShouldNotExist();
  });

  it("should be able to save edited book", () => {
    editExistingBook();
    cy.contains(".MuiDialog-root", "Edit Book").contains("button", "Save").click();
    testBookShouldNotExist();
    editedTestBookShouldExist();
  });

  it("should be able to cancel deleting book", () => {
    addAndSaveNewBook();
    testBookShouldExist();
    cy.contains(`[data-cy="book-item"]`, testBookValues.name).contains("button", "Delete").click();
    cy.contains("button", "No").click();
    testBookShouldExist();
  });

  it("should be able to delete book", () => {
    addAndSaveNewBook();
    testBookShouldExist();
    cy.contains(`[data-cy="book-item"]`, testBookValues.name).contains("button", "Delete").click();
    cy.contains("button", "Yes").click();
    testBookShouldNotExist();
  });
})