describe("User Registration Page", () => {
  beforeEach(() => {
    // Each test needs 'fresh state' !!
    // Tests should never rely on state left by previous tests !!
    // Every test must be able to work in isolation !!
    cy.visit("http://localhost:3003/"); // CAREFUL, SOME STUDENTS MIGHT BE ON A DIFFERENT PORT
  });

  // Helpers to centralize the CSS selectors and clean up the tests a bit.
  const usernameInput = () => cy.get("input[name=username]");
  const passwordInput = () => cy.get("input[name=password]");
  const emailInput = () => cy.get("input[name=email]");
  const favLanguageInput = () => cy.get("input[name=favLanguage]");
  const favLanguageInputJavascript = () => cy.get("input[value=javascript]");
  const favLanguageInputRust = () => cy.get("input[value=rust]");
  const submitButton = () => cy.get("input[type=submit]");
  const termsCheckbox = () => cy.get("input[name=agreement]");
  const favFood = () => cy.get("select[id=favFood]");
  const pizza = () => cy.get("option[value=pizza]");
  const spaghetti = () => cy.get("option[value=spaghetti]");
  const broccoli = () => cy.get("option[value=broccoli]");

  it("sanity check to make sure tests work", () => {
    // "it" is a test.
    // "expect" is an assertion.
    // There can be several assertions per test, but they all need to relate
    // to "the one thing" we're testing.
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5); // strict ===
    expect({}).not.to.equal({}); // strict ===
    expect({}).to.eql({}); // not strict
  });

  it("the proper elements are showing", () => {
    usernameInput().should("exist");
    passwordInput().should("exist");
    emailInput().should("exist");
    favLanguageInput().should("exist");
    submitButton().should("exist");
    termsCheckbox().should("exist");
    favLanguageInputJavascript().should("exist");
    favLanguageInputRust().should("exist");
    favFood().should("exist");
    pizza().should("exist");
    spaghetti().should("exist");
    broccoli().should("exist");
    // As usual, UI testing is easier if the HTML elements have unique identifiers on them.
    // This is selecting by text content, instead of by CSS selector:
    cy.contains("User Registration").should("exist");
    cy.contains(/user reGistration/i).should("exist");
  });

  describe("Filling out the inputs and cancelling", () => {
    // We use optional "describe" blocks to organize and group our tests.
    it("can navigate to the site", () => {
      cy.url().should("include", "localhost");
    });

    it("submit button starts out disabled", () => {
      submitButton().should("be.disabled");
    });

    it("can type in the username, email, and password inputs", () => {
      usernameInput().type("testuser").should("have.value", "testuser");
      passwordInput().type("testpassword").should("have.value", "testpassword");
      emailInput()
        .type("testemail@gmail.com")
        .should("have.value", "testemail@gmail.com");
    });

    it("can check the terms of service checkbox", () => {
      termsCheckbox().check().should("be.checked");
    });

    it("can select a favorite language", () => {
      favLanguageInputJavascript().check().should("be.checked");
      favLanguageInputRust().check().should("be.checked");
    });

    it("can select a favorite food", () => {
      cy.get("select[id=favFood]")
        .select("pizza")
        .should("have.value", "pizza");
      cy.get("select[id=favFood]")
        .select("spaghetti")
        .should("have.value", "spaghetti");
    });
  });
});
