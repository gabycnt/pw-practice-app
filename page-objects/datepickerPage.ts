import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{

//    private readonly page: Page

    constructor(page: Page){
//        this.page = page
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, enfDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(enfDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        //create a JS object (Date); new creates a new Instance
        let date  = new Date()
        date.setDate(date.getDate()+numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleString('EN-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('EN-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        //await page.locator('[class="day-cell ng-star-inserted]').getByText('14').click()

        //await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()


        return dateToAssert
        
    }
}