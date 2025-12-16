import test from "@playwright/test"
import { PageManager } from "../../page-objects/page-manager"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
})

test('Page Object Manager', async ({page}) => {

    const pageManager = new PageManager(page)
    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayouts().submitInlineFormWithNameEmailAndCheckbox('Hopkins', 'Jimmyhopkins@gmail.com', true)
    await pageManager.navigateTo().datePickerPage()
    await pageManager.onDatePicker().selectCommonDatePickerDateFromToday(8)
})