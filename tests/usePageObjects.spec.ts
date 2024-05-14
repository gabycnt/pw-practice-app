import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
// import { NavigationPage } from '../page-objects/navigationPage'
// import { FormLayoutsPage } from '../page-objects/formLayoutPage'
// import { DatepickerPage } from '../page-objects/datepickerPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    //create an instance of the Page manager/page fixture
    const pm = new PageManager(page)
    //const navigateTo = new NavigationPage(page)
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toasterPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)

    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatepickerPage = new DatepickerPage(page)

    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true)

    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)

    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6,15)
})