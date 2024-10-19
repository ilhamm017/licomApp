const { URL } = require('url');
const { accountCount } = require('../service/accountCounter')
const { facebookLike, facebookComment } = require('./facebookControllers');
const path = require('path')

module.exports = {
    main : async (req, res) => {
        const { url, action, value, comment } = req.body;
        try {
            const parsedUrl = new URL(url);
            let result = null
            // Mendapatkan data akun fb 
            const account = await accountCount().then((res) => {
                return res.fb
            })
            // Mengecek apakah melebihi batas maksimal like
            if (value > account.length) {
                throw new Error('Melebihi batas maksimal like')
            }
            // Memeriksa apakah URL adalah Facebook atau Instagram
            switch (parsedUrl.hostname) {
                case 'www.facebook.com':
                    // Proses data jika URL adalah Facebook
                    if (action === 'like') {
                        result = await facebookLike(account, value, url);
                    } else if (action === 'comment') {
                        result = await facebookComment(account, value, url, comment);
                    } else {
                        throw ({ message: 'Action tidak valid. Hanya "like" atau "comment" yang didukung.' });
                    }
                    console.log('Ini adalah URL Facebook. Lakukan proses A.');
                    break;
                case 'www.instagram.com':
                    // Proses data jika URL adalah Instagram
                    console.log('Ini adalah URL Instagram. Lakukan proses B.');
                    break;
                default:
                throw new Error('URL tidak valid. Hanya URL Facebook atau Instagram yang didukung.');
            }
            return res.status(200).json({
                message: result.message
            })
        } catch (error) {
            console.error(error.message)
            return res.status(500).json({
                message: error.message
            })
        }
    },
    web : async (req,res) => {
        try {
            const indexPath = path.join(__dirname, '../public', 'index.html');
            return res.sendFile(indexPath);
        } catch (error) {
            console.error(error.message)
            return res.status(500).json({
                message: error.message
            })
        }
    }
}