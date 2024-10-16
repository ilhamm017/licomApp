const { URL } = require('url');
const { facebookLike, facebookComment } = require('./facebookControllers');

module.exports = {
    main : async (req, res) => {
        const { url, action, value, comment } = req.body;
        try {
            const parsedUrl = new URL(url);
            let result = null
            switch (parsedUrl.hostname) {
                case 'www.facebook.com':
                    // Proses data jika URL adalah Facebook
                    if (action === 'like') {
                        result = await facebookLike(value, url);
                    } else if (action === 'comment') {
                        result = await facebookComment(value, url, comment);
                    } else {
                        return res.status(400).json({ message: 'Action tidak valid. Hanya "like" atau "comment" yang didukung.' });
                    }
                    console.log('Ini adalah URL Facebook. Lakukan proses A.');
                    break;
                case 'www.instagram.com':
                    // Proses data jika URL adalah Instagram
                    console.log('Ini adalah URL Instagram. Lakukan proses B.');
                    break;
                default:
                return res.status(400).json({ message: 'URL tidak valid. Hanya URL Facebook atau Instagram yang didukung.' });
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
    }
}