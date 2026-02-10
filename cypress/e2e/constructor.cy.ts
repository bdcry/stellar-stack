const SELECTOR = {
  ingredientCard: '[data-cy="ingredient-card"]',
  ingredientDetails: '[data-cy="ingredient-details"]',
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  modalOverlay: '[data-cy="modal-overlay"]',
  topBunDropZone: '[data-cy="constructor-top-bun-drop-zone"]',
  bottomBunDropZone: '[data-cy="constructor-bottom-bun-drop-zone"]',
  fillingsDropZone: '[data-cy="constructor-fillings-drop-zone"]',
  orderButton: '[data-cy="order-button"]',
  orderDetails: '[data-cy="order-details"]',
  orderNumber: '[data-cy="order-number"]',
};

const openFirstIngredientModal = (): void => {
  cy.get(SELECTOR.ingredientCard).first().click();
  cy.get(SELECTOR.ingredientDetails).should('be.visible');
};

const closeModalByButton = (): void => {
  cy.get(SELECTOR.modalClose).click();
  cy.get(SELECTOR.modal).should('not.exist');
};

const closeModalByOverlay = (): void => {
  cy.get(SELECTOR.modalOverlay).click({ force: true });
  cy.get(SELECTOR.modal).should('not.exist');
};

const dragIngredientTo = (ingredientIndex: number, dropZoneSelector: string): void => {
  cy.get(SELECTOR.ingredientCard).eq(ingredientIndex).trigger('dragstart');
  cy.get(dropZoneSelector).trigger('drop');
};

const buildBurger = (): void => {
  dragIngredientTo(0, SELECTOR.topBunDropZone);
  cy.get(SELECTOR.topBunDropZone).should('contain', 'Краторная булка N-200i (верх)');
  cy.get(SELECTOR.bottomBunDropZone).should('contain', 'Краторная булка N-200i (низ)');
  dragIngredientTo(4, SELECTOR.fillingsDropZone);
  cy.get(SELECTOR.fillingsDropZone).should('contain', 'Соус фирменный Space Sauce');
  dragIngredientTo(5, SELECTOR.fillingsDropZone);
  cy.get(SELECTOR.fillingsDropZone).should(
    'contain',
    'Соус с шипами Антарианского плоскоходца'
  );
};

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.intercept('POST', '**/auth/token', {
      success: true,
      accessToken: 'Bearer fake-access-token',
      refreshToken: 'fake-refresh-token',
    });
    cy.intercept('GET', '**/auth/user', {
      success: true,
      user: { email: 'vitalik12@mail.ru', name: 'vitalik12' },
    });

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'fake-refresh-token');
        win.localStorage.setItem('accessToken', 'Bearer fake-access-token');
      },
    });

    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('should open and close ingredient modal by close button', () => {
    openFirstIngredientModal();
    closeModalByButton();
  });

  it('should open and close ingredient modal by overlay click', () => {
    openFirstIngredientModal();
    closeModalByOverlay();
  });

  it('should add ingredients to the constructor', () => {
    buildBurger();
  });

  it('should create an order and display order number', () => {
    buildBurger();

    cy.get(SELECTOR.orderButton).click();
    cy.wait('@createOrder');
    cy.get(SELECTOR.orderDetails).should('be.visible');
    cy.get(SELECTOR.orderNumber).should('contain', '100637');
  });
});
