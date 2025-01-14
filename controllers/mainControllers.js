const { URL } = require('url');
const { accountCount } = require('../service/accountCounter')
const { facebookLike, facebookComment } = require('./facebookControllers');
const { instagramComment, instagramLike} = require('./instagramControllers')
const path = require('path')

module.exports = {
    main : async (req, res) => {
        const { url, action, value, comment } = req.body;
        try {
            const parsedUrl = new URL(url);
            let result = null
            let account = ''
            // Memeriksa apakah URL adalah Facebook atau Instagram
            switch (parsedUrl.hostname) {
                case 'www.facebook.com':
                    // Proses data jika URL adalah Facebook
                    // Mendapatkan data akun fb 
                    account = await accountCount().then((res) => {
                        return res.fb
                    })
                    // Mengecek apakah melebihi batas maksimal like
                    if (value > account.length) {
                        throw new Error('Melebihi batas maksimal like')
                    }
                    if (action === 'like') {
                        result = await facebookLike(account, value, url);
                    } else if (action === 'comment') {
                        result = await facebookComment(account, value, url, comment);
                    } else {
                        throw ({ message: 'Action tidak valid. Hanya "like" atau "comment" yang didukung.' });
                    }
                    break;
                case 'www.instagram.com':
                    // Proses data jika URL adalah Instagram
                    // Mendapatkan data akun fb 
                    account = await accountCount().then((res) => {
                        return res.ig
                    })
                    // Mengecek apakah melebihi batas maksimal like
                    if (value > account.length) {
                        throw new Error('Melebihi batas maksimal like')
                    }
                    if (action === 'like') {
                        result = await instagramLike(account, value, url);
                    } else if (action === 'comment') {
                        result = await instagramComment(account, value, url, comment);
                    } else {
                        throw ({ message: 'Action tidak valid. Hanya "like" atau "comment" yang didukung.' });
                    }
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