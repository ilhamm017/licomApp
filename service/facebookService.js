const puppeteer = require('puppeteer');
const request = require('./request')
const likeSelector = `div.x1i10hfl.xjbqb8w.x1qjc9v5.x26u7qi[aria-label="Like"][role="button"]`
const commentSelector = `div.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.notranslate[aria-label="Write a comment…"]`

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
                // Menunggu selector siap 
                await page.waitForSelector(likeSelector) 
                // Fokus pada selector 
                await page.focus(likeSelector) 
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
    },
    comment : async (id, url, comment) => {
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
                // Menunggu selector siap 
                await page.waitForSelector(commentSelector)
                // Fokus pada selector 
                await page.focus(commentSelector)
                // Menuliskan komentar 
                await page.type(commentSelector, comment, { delay: 100 })
            }
        } catch (error) {
            throw error
        }
    }
}