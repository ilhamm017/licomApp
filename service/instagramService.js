const puppeteer = require('puppeteer');
const request = require('./request')
const likeSelector = `div[role="button"].x6s0dn4.x78zum5.xl56j7k`
const commentSelector = `textarea[aria-label="Tambahkan komentar…"]`

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
                // Menunggu selector siap 
                await page.waitForSelector(likeSelector) 
                // Fokus pada selector 
                await page.focus(likeSelector) 
                // Kemudian klik
                await page.click(likeSelector);
                // tutup page
                await page.close()
            }
        } catch (error) {
            throw error
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
                // Menunggu selector siap 
                await page.waitForSelector(commentSelector)
                // Fokus pada selector 
                await page.focus(commentSelector)
                // Menuliskan komentar 
                await page.type(commentSelector, comment, { delay: 100 })
                // melakukan enter 
                await page.keyboard.press('Enter')
                await page.close()
            }
        } catch (error) {
            throw error
        }
    }
}