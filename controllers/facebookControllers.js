const { fbLike, fbComment } = require('../service/facebookService')

module.exports = {
    facebookLike : async (account, value, url) => {
        try {
            // Melakukan like secara berurutan dan menunggu setiap like selesai
            const likePromises = [];
            for (let i = 0; i < value; i++) {
                likePromises.push(fbLike(account[i].id, url));
            }
            // Menunggu semua like selesai sebelum mengembalikan respons
            await Promise.all(likePromises);

            return { message: 'Like berhasil' };
        } catch (error) {
            throw error
        }
    },
    facebookComment : async (account, value, url, comment) => {
        try {
            // Melakukan komentar sebanyak yang dibutuhkan
            const commentPromises = [];
            for (let i = 0; i < value; i++) {
                commentPromises.push(fbComment(account[i].id, url, comment));
            }
            // Menunggu semua komentar selesai sebelum mengembalikan respons
            await Promise.all(commentPromises);

            return { message: 'Komentar berhasil' };
        } catch (error) {
            throw error
        }
    }
}