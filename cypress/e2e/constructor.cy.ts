describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json',
    });
    cy.intercept('POST', '**/orders', {
      fixture: 'order.json',
    });
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'fake-refresh-token');
      win.localStorage.setItem('accessToken', 'Bearer fake-access-token');
    });
    cy.intercept('POST', '**/auth/token', {
      success: true,
      accessToken: 'Bearer fake-access-token',
      refreshToken: 'fake-refresh-token',
    });
    cy.intercept('GET', '**/auth/user', {
      success: true,
      user: { email: 'vitalik12@mail.ru', name: 'vitalik12' },
    });
    cy.visit('/');
  });

  it('should open and close ingredient modal by close button', () => {
    cy.get('[data-cy="ingredient-card"]').first().click();
    cy.get('[data-cy="ingredient-details"]').should('be.visible');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should open and close ingredient modal by overlay click', () => {
    cy.get('[data-cy="ingredient-card"]').first().click();
    cy.get('[data-cy="ingredient-details"]').should('be.visible');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should add ingredients to the constructor', () => {
    cy.get('[data-cy="ingredient-card"]').first().trigger('dragstart');
    cy.get('[data-cy="constructor-top-bun-drop-zone"]').trigger('drop');
    cy.get('[data-cy="constructor-top-bun-drop-zone"]').should(
      'contain',
      'Краторная булка N-200i (верх)'
    );
    cy.get('[data-cy="constructor-bottom-bun-drop-zone"]').should(
      'contain',
      'Краторная булка N-200i (низ)'
    );

    cy.get('[data-cy="ingredient-card"]').eq(4).trigger('dragstart');
    cy.get('[data-cy="constructor-fillings-drop-zone"]').trigger('drop');
    cy.get('[data-cy="constructor-fillings-drop-zone"]').should(
      'contain',
      'Соус фирменный Space Sauce'
    );

    cy.get('[data-cy="ingredient-card"]').eq(5).trigger('dragstart');
    cy.get('[data-cy="constructor-fillings-drop-zone"]').trigger('drop');
    cy.get('[data-cy="constructor-fillings-drop-zone"]').should(
      'contain',
      'Соус с шипами Антарианского плоскоходца'
    );
  });

  it('should create an order and display order number', () => {
    cy.get('[data-cy="ingredient-card"]').first().trigger('dragstart');
    cy.get('[data-cy="constructor-top-bun-drop-zone"]').trigger('drop');
    cy.get('[data-cy="constructor-top-bun-drop-zone"]').should(
      'contain',
      'Краторная булка N-200i (верх)'
    );
    cy.get('[data-cy="constructor-bottom-bun-drop-zone"]').should(
      'contain',
      'Краторная булка N-200i (низ)'
    );

    cy.get('[data-cy="ingredient-card"]').eq(4).trigger('dragstart');
    cy.get('[data-cy="constructor-fillings-drop-zone"]').trigger('drop');
    cy.get('[data-cy="constructor-fillings-drop-zone"]').should(
      'contain',
      'Соус фирменный Space Sauce'
    );

    cy.get('[data-cy="ingredient-card"]').eq(5).trigger('dragstart');
    cy.get('[data-cy="constructor-fillings-drop-zone"]').trigger('drop');
    cy.get('[data-cy="constructor-fillings-drop-zone"]').should(
      'contain',
      'Соус с шипами Антарианского плоскоходца'
    );

    cy.get('[data-cy="order-button"]').click();
    cy.get('[data-cy="order-details"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '100637');
  });
});
