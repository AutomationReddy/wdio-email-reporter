describe('Browser actions', () => {
    it('test input field', async () => {
    browser.url('https://devexpress.github.io/testcafe/example/')
    const nameinput = await $('#developer-name')
    nameinput.waitForExist()
    nameinput.setValue('Michael')
    browser.pause(3000)
    nameinput.clearValue()
    })
    it('click populate', async () => {
    const btnPopulate = await $('#populate')
    btnPopulate.waitForExist()
    btnPopulate.click()
    })
    })