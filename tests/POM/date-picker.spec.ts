import test from "@playwright/test";
import { NavigationPage } from "../../page-objects/navigation-page";
import { DatePickerPage } from "../../page-objects/date-picker-page";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
})

test('Date Picker Method', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onDatePicker = new DatePickerPage(page)
    await navigateTo.datePickerPage()
    await onDatePicker.selectCommonDatePickerDateFromToday(5)
    await onDatePicker.selectDatepickerWithRangeFromToday(10, 16)
})