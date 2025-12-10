import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
    await page.getByRole('link', { name: 'Forms' }).click()
    await page.getByRole('link', { name: 'Datepicker' }).click()
})

test('Date Picker', async ({ page }) => {

    const dateSelector = page.getByPlaceholder('Form Picker')
    await dateSelector.click()
    // get by text, it is looking at partial match, not the exact match and to specify the exact match, 
    // we just need to provide the additional flag which will be {exact:True}.
    //And in this case, playwright will search exactly the number one value as a text.
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', { exact: true }).click()
    await expect(dateSelector).toHaveValue('Dec 30, 2025')
})

// Scenario:
// The system shall allow users to select dates dynamically rather than relying on a fixed preset date (e.g., June 1st). 
// Users must be able to choose dates such as the next day, any date within the following week, 
// or any date in the next month, in accordance with defined business rules.

test('Date Picker Dynamically', async ({ page }) => {

    const calenderInputField = page.getByPlaceholder('Form Picker')
    await calenderInputField.click()
    // Date is a JavaScript object that can perform a different operations with the date and time.
    // New is the keyword that will create a new instance of this object and we assign this instance to the
    // date variable and then we can access this variable to perform a different operations.

    let date = new Date(); // This creates a new Date object representing the current date and time.
    date.setDate(date.getDate() + 220); // setDate() updates the Date object to that new day. Adding +1 moves the date forward by one day.
    const expectedDate = date.getDate().toString() // date.getDate() returns the day of the month (1–31). .toString() converts that number into a string.
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    // Select Date and Month of Calender
    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
    while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('button [data-name="chevron-right"]').click()
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(calenderInputField).toHaveValue(dateToAssert)
})