import { Page } from "@playwright/test";

export class FormLayoutsPages {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    /**
       * Fill and submit Using the Grid form
    */
    async submitUsingTheGridWithCredentialsAndSelectOption(eMail: string, password: string, option: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(eMail)
        await usingTheGridForm.getByRole('textbox', { name: 'password' }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: option }).check({ force: true })
        await usingTheGridForm.getByRole('button', { name: 'Sign in' }).click()
    }

    /**
     * This method fill out the Inline form user details
     * @param name - should be first and last name
     * @param email - valid user email for test user
     * @param rememberMe - true or false if user session to be safed 
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email)
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({ force: true })
            await inlineForm.getByRole('button').click()
        }
    }

}