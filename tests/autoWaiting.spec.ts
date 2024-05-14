import {expect, test} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()

    // const text = await successButton.textContent()
    // expect(text).toEqual('Data loaded with AJAX get request.')

    // await successButton.waitFor({state: 'attached'})
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //___ wait for the element
  //  await page.waitForSelector('.bg-success')

    //___ wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    //others:
    //await page.waitForTimeout(5000)
    //await page. waitForURL

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeout', async({page}) => {
    // test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
    // await successButton.click({timeout: 16000})
})