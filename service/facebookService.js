const puppeteer = require('puppeteer');
const request = require('./request')
const likeSelector = `div.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Like"][role="button"]`
const commentSelector = `div.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.notranslate[aria-label="Write a comment…"]`

module.exports = {
    fbLike : async (id,url) => {
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
                await page.waitForNetworkIdle()
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
            throw error
        }
    },
    fbComment : async (id, url, comment) => {
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
                await page.waitForNetworkIdle()
                try {
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