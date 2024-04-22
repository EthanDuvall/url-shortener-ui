describe("Can View home page", () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      body: {
        urls: [
          {
            id: 1,
            long_url: "https://images.unsplash.com/photo...",
            short_url: "http://localhost:3001/useshorturl/2",
            title: "Awesome photo",
          },
        ],
      },
    });
    cy.visit("http://localhost:3000");
  });

  it("can view the page title, form and the existing shortened URLs", () => {
    cy.get("h1").should("be.visible");
    cy.get("h1").contains("URL Shortener");

    cy.get("form").should("be.visible");
    cy.get("form").get("input[name='title']");
    cy.get("form").get("input[name='url']");

    cy.get(".url-holder").should("be.visible");
    cy.get(".url-holder")
      .children()
      .first()
      .contains("https://images.unsplash.com/photo...");
    cy.get(".url-holder")
      .children()
      .first()
      .contains("http://localhost:3001/useshorturl/2");
    cy.get(".url-holder").children().first().contains("Awesome photo");
  });
  it("can fill out form", () => {
    cy.get("form").should("be.visible");
    cy.get("form").get("input[name='title']");
    cy.get("form").get("input[name='url']");

    cy.get("form")
      .get("input[name='title']")
      .type("This is the title")
      .should("have.value", "This is the title");
    cy.get("form")
      .get("input[name='url']")
      .type("This is the Url")
      .should("have.value", "This is the Url");
  });
  it("can create new url", () => {
    cy.get("form").should("be.visible");
    cy.get("form").get("input[name='title']");
    cy.get("form").get("input[name='url']");

    cy.get("form")
      .get("input[name='title']")
      .type("This is the title")
      .should("have.value", "This is the title");
    cy.get("form")
      .get("input[name='url']")
      .type("This is the Url")
      .should("have.value", "This is the Url");
    cy.intercept("http://localhost:3001/api/v1/urls", {
      method: "POST",
      statusCode: 201,
      body: {
        id: 2,
        long_url: "This is the Url",
        short_url: "http://localhost:3001/useshorturl/1",
        title: "This is the title",
      },
    });
    cy.get("form").get("button").click();

    cy.get(".url-holder").children().should("have.length", 2);
    cy.get(".url-holder")
      .children()
      .first()
      .contains("https://images.unsplash.com/photo...");
    cy.get(".url-holder")
      .children()
      .first()
      .contains("http://localhost:3001/useshorturl/2");
    cy.get(".url-holder").children().first().contains("Awesome photo");

    cy.get(".url-holder").children().last().contains("This is the Url");
    cy.get(".url-holder")
      .children()
      .last()
      .contains("http://localhost:3001/useshorturl/1");
    cy.get(".url-holder").children().last().contains("This is the title");
  });
});
