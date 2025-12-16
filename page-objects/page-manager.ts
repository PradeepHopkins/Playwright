import { Page } from "@playwright/test";
import { NavigationPage } from "./navigation-page";
import { DatePickerPage } from "./date-picker-page";
import { FormLayoutsPage } from "./form-layouts-page";

export class PageManager {

    private readonly page: Page
    private readonly navigation: NavigationPage
    private readonly datePicker: DatePickerPage
    private readonly formLayouts: FormLayoutsPage

    constructor(page: Page) {
        this.page = page
        this.navigation = new NavigationPage(this.page)
        this.formLayouts = new FormLayoutsPage(this.page)
        this.datePicker = new DatePickerPage(this.page)
    }

    navigateTo() {
        return this.navigation
    }

    onFormLayouts() {
        return this.formLayouts
    }

    onDatePicker() {
        return this.datePicker
    }

}
