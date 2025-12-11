import test from "@playwright/test";
import { NavigationPage } from "../../page-objects/navigation-page";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
})

test('Navigate form Page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.ToastrPage()
    await navigateTo.TooltipPage()
    await navigateTo.calendarPage()
    await navigateTo.chartsPage()
    await navigateTo.datePickerPage()
    await navigateTo.formLayoutsPage()
    await navigateTo.windowPage()
})