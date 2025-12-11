import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page

    }

    async formLayoutsPage() {
        await this.selectGroupMenuItems('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage() {
        await this.selectGroupMenuItems('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async dialogPage() {

        await this.page.getByText('Dialog').click()
    }

    async windowPage() {
        await this.selectGroupMenuItems('Modal & Overlays')
        await this.page.getByText('Window').click()
    }

    async popoverPage() {
        await this.selectGroupMenuItems('Modal & Overlays')
        await this.page.getByText('Popover').click()
    }

    async ToastrPage() {
        await this.selectGroupMenuItems('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async TooltipPage() {
        await this.selectGroupMenuItems('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async calendarPage() {
        await this.selectGroupMenuItems('Extra Components')
        await this.page.getByText('Calendar').click()
    }

    async chartsPage() {
        await this.selectGroupMenuItems('Charts')
        await this.page.getByTitle('Echarts').click()
    }

    async smartTablePage() {

        await this.page.getByText('Smart Table').click()
    }

    async treeGridPage() {
        await this.selectGroupMenuItems('Tables & Data')
        await this.page.getByText('Tree Grid').click()
    }
    /* 
        async loginPage() {
            await this.selectGroupMenuItems('Auth')
            await this.page.getByText('Login').click()
        }
    
        async registerPage() {
            await this.selectGroupMenuItems('Auth')
            await this.page.getByText('Register').click()
        }
    
        async requestPasswordPage() {
            await this.selectGroupMenuItems('Auth')
            await this.page.getByText('Request Password').click()
        }
    
        async resetPasswordPage() {
            await this.selectGroupMenuItems('Auth')
            await this.page.getByText('Reset Password').click()
        } */

    async selectGroupMenuItems(groupItemTitle: string) {
        const menuItem = this.page.getByRole('link', { name: groupItemTitle, exact: true, });
        const expendState = await menuItem.getAttribute('aria-expanded')
        if (expendState == "false") {
            await menuItem.click()
        }
    }


}