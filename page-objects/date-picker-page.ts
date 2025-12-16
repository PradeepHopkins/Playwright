import { expect, Page } from "@playwright/test";

export class DatePickerPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const commonDatePicker = this.page.getByRole('textbox', { name: 'Form Picker' })
        await commonDatePicker.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(commonDatePicker).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const commonDatePicker = this.page.getByRole('textbox', { name: 'Range Picker' })
        await commonDatePicker.click()
        const dateToStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToStart} - ${dateToEnd}`
        await expect(commonDatePicker).toHaveValue(dateToAssert)
    }

   private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        const date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthLong = date.toLocaleDateString('En-Us', { month: 'long' })
        const expectedMonthShort = date.toLocaleDateString('En-Us', { month: 'short' })
        const expectedYear = date.getFullYear()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        let calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('[data-name="chevron-right"]').click()
            calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return dateToAssert
    }

}
