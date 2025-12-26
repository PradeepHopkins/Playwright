import test from "@playwright/test";
import { NavigationPage } from "../../page-objects/navigation-page";
import { FormLayoutsPage } from "../../page-objects/form-layouts-page";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
})

test('parametrized method', async ({ page }) => {

    const navigateTo = new NavigationPage(page)
    const onFormLayout = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await onFormLayout.submitUsingTheGridWithCredentialsAndSelectOption('Padeep@gamil.com', 'Test@124', 'Option 1')
    await onFormLayout.submitInlineFormWithNameEmailAndCheckbox('Jimmy Hopkins', 'hopkins@gmail.com', true)
})  