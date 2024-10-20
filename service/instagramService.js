const puppeteer = require('puppeteer');
const request = require('./request')
const likeSelector = `div.x1i10hfl.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x6s0dn4.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.x78zum5.xl56j7k.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha.xcdnw81[role="button"][tabindex="0"]`

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
                try {
                    await page.waitForSelector(likeSelector) 
                    // Fokus pada selector 
                    await page.focus(likeSelector) 
                    // Kemudian klik
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
            return error
        }
    }
}