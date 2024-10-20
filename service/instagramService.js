const puppeteer = require('puppeteer');
const request = require('./request')
const likeSelector = `div[role="button"] svg[aria-label="Like"]`

const commentSelector = `textarea[aria-label="Add a comment…"]`

module.exports = {
    igLike : async (id,url) => {
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
                await page.waitForNetworkIdle()
                // Menunggu selector siap 
                try {
                    await page.waitForSelector(likeSelector) 
                    // Kemudian klik
                    await page.click(likeSelector);
                    await page.click(likeSelector);
                } catch (error) {
                    await page.close()
                    await browser.close()
                    throw error
                }
                // tutup page
                await page.close()
                await browser.close()
            }
        } catch (error) {
            return error
        }
    },
    igComment : async (id, url, comment) => {
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
                await page.waitForNetworkIdle()
                try {
                    // Menunggu selector siap 
                    await page.waitForSelector(commentSelector)
                    // Fokus pada selector 
                    await page.focus(commentSelector)
                    // Menuliskan komentar 
                    await page.type(commentSelector, comment, { delay: 100 })
                    // melakukan enter 
                await page.keyboard.press('Enter')
                } catch (error) {
                    await page.close()
                    await browser.close()
                    throw error
                }
                await page.close()
                await browser.close()
            }
        } catch (error) {
            throw error
        }
    }
}