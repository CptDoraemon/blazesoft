import startCase from "lodash/startCase";

describe("test bookStore page", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  });

  // HELPERS
  const testBookName = "cypress test book name";
  const testBookCategory = "cypress test book name category";
  const testBookPrice = 2.99;
  const testBookDescription = "cypress test book name description";

  const testBookNameUpdated = "cypress test __updated__ book name";
  const testBookCategoryUpdated = "cypress test __updated__ book name category";
  const testBookPriceUpdated = 3.99;
  const testBookDescriptionUpdated = "cypress test __updated__ book name description";

  function editNewBook() {
    cy.contains("button", "Add Book").click();

    cy.get(`input[name="name"]`).type(testBookName);
    cy.get(`input[name="category"]`).type(testBookCategory);
    cy.get(`input[name="price"]`).type(testBookPrice.toString());
    cy.get(`input[name="description"]`).type(testBookDescription);
  }

  function addAndSaveNewBook() {
    editNewBook();
    cy.contains("button", "Save").click();
  }

  // add test book and update their values in the editing form, before cancel or save
  function editExistingBook() {
    addAndSaveNewBook();

    cy.contains(`[data-cy="book-item"]`, testBookName).should("have.length", 1);
    cy.contains(`[data-cy="book-item"]`, testBookName).contains("button", "Edit").should("be.visible").click();

    cy.contains(".MuiDialog-root", "Edit Book").should('be.visible');

    const valuesBeforeUpdate = {
      name: testBookName,
      category: testBookCategory,
      price: testBookPrice,
      description: testBookDescription
    };

    const valuesAfterUpdate = {
      name: testBookNameUpdated,
      category: testBookCategoryUpdated,
      price: testBookPriceUpdated,
      description: testBookDescriptionUpdated
    };

    // the form should be prefilled by the book value
    ["name", "category", "price", "description"].forEach(inputName => {
      cy.contains(".MuiDialog-root", "Edit Book").find(`input[name="${inputName}"]`)
        .should('be.visible')
        .should('have.attr', 'id', inputName)
        .should('have.attr', 'value', valuesBeforeUpdate[inputName]);

      cy.contains(".MuiDialog-root", "Edit Book").contains("label", startCase(inputName))
        .should('have.attr', 'for', inputName);
    });

    // should be able to update value
    ["name", "category", "price", "description"].forEach(inputName => {
      cy.contains(".MuiDialog-root", "Edit Book").find(`input[name="${inputName}"]`)
        .clear()
        .type(valuesAfterUpdate[inputName]);
    });
  }

  function testBookShouldExist() {
    cy.contains('[data-cy="book-item-name"]', testBookName);
    cy.contains('[data-cy="book-item-category"]', testBookCategory);
    cy.contains('[data-cy="book-item-price"]', testBookPrice.toString());
    cy.contains('[data-cy="book-item-description"]', testBookDescription);
  }

  function testBookShouldNotExist() {
    cy.contains('[data-cy="book-item-name"]', testBookName).should('not.exist');
    cy.contains('[data-cy="book-item-category"]', testBookCategory).should('not.exist');
    cy.contains('[data-cy="book-item-price"]', testBookPrice.toString()).should('not.exist');
    cy.contains('[data-cy="book-item-description"]', testBookDescription).should('not.exist');
  }

  function editedTestBookShouldExist() {
    cy.contains('[data-cy="book-item-name"]', testBookNameUpdated);
    cy.contains('[data-cy="book-item-category"]', testBookCategoryUpdated);
    cy.contains('[data-cy="book-item-price"]', testBookPriceUpdated.toString());
    cy.contains('[data-cy="book-item-description"]', testBookDescriptionUpdated);
  }

  function editedTestBookShouldNotExist() {
    cy.contains('[data-cy="book-item-name"]', testBookNameUpdated).should('not.exist');
    cy.contains('[data-cy="book-item-category"]', testBookCategoryUpdated).should('not.exist');
    cy.contains('[data-cy="book-item-price"]', testBookPriceUpdated.toString()).should('not.exist');
    cy.contains('[data-cy="book-item-description"]', testBookDescriptionUpdated).should('not.exist');
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
    cy.contains(`[data-cy="book-item"]`, testBookName).contains("button", "Delete").click();
    cy.contains("button", "No").click();
    testBookShouldExist();
  });

  it("should be able to delete book", () => {
    addAndSaveNewBook();
    testBookShouldExist();
    cy.contains(`[data-cy="book-item"]`, testBookName).contains("button", "Delete").click();
    cy.contains("button", "Yes").click();
    testBookShouldNotExist();
  });
})