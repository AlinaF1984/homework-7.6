const bookOne = {
  title: "Гарри Поттер и философский камень",
  description: "Фантастика",
  author: "Дж. К. Роулинг",
};
const bookTwo = {
  title: "Гарри Поттер и Дары Смерти",
  description: "Фантастика",
  author: "Дж. К. Роулинг",
};
const bookThree = {
  title: "Война и мир",
  description: "Роман",
  author: "Л.Н.Толстой",
};

describe("login screen", () => {
  it("successfully logins with the valid credentials", () => {
    cy.visit("/");

    cy.login("bropet@mail.ru", "123");

    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("show error message on empty login", () => {
    cy.visit("/");

    cy.login(null, "123");

    cy.get("#mail")
      .then((element) => element[0].checkValidity())
      .should("be.false");

    cy.get("#mail")
      .then((element) => element[0].validationMessage)
      .should("contain", "Заполните это поле");
  });

  it("show error message on empty password", () => {
    cy.visit("/");

    cy.login("bropet@mail.ru", null);

    cy.get("#pass")
      .then((element) => element[0].checkValidity())
      .should("be.false");

    cy.get("#pass")
      .then((element) => element[0].validationMessage)
      .should("contain", "Заполните это поле");
  });
});

describe("Tests to check the functionality of working with books in favorites", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("bropet@mail.ru", "123");
    cy.addBook(bookOne,bookTwo,bookThree);
  });

  it("remove from favorites", () => {
    cy.contains("Add to favorite").click();
    cy.contains("Delete from favorite").should("be.visible");
    cy.contains("Delete from favorite").click();
    cy.contains("Add to favorite").should("be.visible");
  });

  it("add to favorites", () => {
    cy.contains("Add to favorite").click();
    cy.contains("Delete from favorite").should("be.visible");
  });

  it("Should remove all favorite books", () => {
    cy.addBook(bookOne);
    cy.addBook(bookTwo);
    cy.removeAllFavorite();
    cy.contains("Please add some book to favorit on home page!").should(
      "exist"
    );
  });
});
