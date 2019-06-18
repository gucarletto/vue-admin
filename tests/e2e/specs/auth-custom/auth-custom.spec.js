const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Custom Auth Test', () => {
  const view = 'login'
  const user = {
    username: 'vue-admin@camba.coop',
    password: '123456'
  }

  /**
   * At the moment, in order to test the custom auth component,
   * it is needed to provide it in the demo app and set this boolean to true
   */
  let hasCustomAuth = false

  function skipIfCustomAuth (testAction) {
    if (hasCustomAuth) {
      testAction()
    }
  }

  beforeEach('Visits the auth url', () => {
    cy.visit(`/#/${view}`)
  })

  it('The url path should be /login', () => {
    skipIfCustomAuth(() =>
      cy.url().should('include', `/${view}`)
    )
  })

  it('Login View should render a title: Sign In', () => {
    skipIfCustomAuth(() => {
      const createViewTitleText = UI_CONTENT.CUSTOM_AUTH_CONTAINER_TITLE
      const createViewTitleContainer = cy.getElement({
        constant: UI_NAMES.CUSTOM_AUTH_CONTAINER_TITLE,
        elementType: 'div',
        elementProp: 'name'
      })
  
      createViewTitleContainer.should('contain', createViewTitleText)
    })
  })

  it('The {username} input is filled when a user types in', () => {
    skipIfCustomAuth(() => {
      const input = cy.getElement({
        constant: UI_NAMES.CUSTOM_AUTH_USERNAME_INPUT,
        elementType: 'input',
        elementProp: 'name'
      })
  
      input.type(user.username)
      input.should('have.value', user.username)
    })
  })

  it('The {username} input is filled when a user types in', () => {
    skipIfCustomAuth(() => {
      const input = cy.getElement({
        constant: UI_NAMES.CUSTOM_AUTH_PASSWORD_INPUT,
        elementType: 'input',
        elementProp: 'name'
      })
  
      input.type(user.password)
      input.should('have.value', user.password)
    })
  })

  it('The Sign In button is disabled when no username and password were given', () => {
    skipIfCustomAuth(() => {
      const button = cy.getElement({
        constant: UI_NAMES.CUSTOM_AUTH_SIGN_IN_BUTTON,
        elementType: 'button',
        elementProp: 'name'
      })
      button.click()
      button.should('be.disabled')
    })
  })

})
