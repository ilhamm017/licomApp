const { puppeteer } = require('puppeteer');
const request = require('./request')

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
                await page.waitForSelector('#actions_10233271367156574 > table > tbody > tr > td:nth-child(1) > a')
                // Menunggu 1 detik sebelum klik
                await page.waitForTimeout(1000); 
                // Kemudian klik
                await page.click('#actions_10233271367156574 > table > tbody > tr > td:nth-child(1) > a');
                await page.close()
            }
        } catch (error) {
            throw error
        }
    }
}