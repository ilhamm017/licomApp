const puppeteer = require('puppeteer');
const request = require('./request')
const likeSelector = `div[aria-label="Like"][role="button"].x1i10hfl.xjbqb8w.x1qjc9v5.x26u7qi`

module.exports = {
    like : async (id,url) => {
        try {
            // Membuka browser
            const res = await request.openBrowser({
                id,
                args: [],
                loadExtensions: false,
                extractIp: false
            })
            if (res) {
                let wsEndpoint = res.data.ws
                const browser = await puppeteer.connect({
                    browserWSEndpoint: wsEndpoint,
                    defaultViewport: null
                })
                const page = await browser.newPage()
                await page.goto(url)
                await page.waitForSelector(likeSelector) 
                // Kemudian klik
                const result = await page.click(likeSelector);
                if (result) {
                    console.log(true)
                } else {
                    console.log(false)
                }
                await page.close()
            }
        } catch (error) {
            throw error
        }
    }
}