const { like } = require('../service/facebookService')

module.exports = {
    facebookLike : async (value, url) => {
        try {
            // Melakukan like secara berurutan dan menunggu setiap like selesai
            const likePromises = [];
            for (let i = 0; i < value; i++) {
                likePromises.push(like(account[i].id, url));
            }
            // Menunggu semua like selesai sebelum mengembalikan respons
            await Promise.all(likePromises);

            return { message: 'Like berhasil' };
        } catch (error) {
            throw error
        }
    },
    facebookComment : async (value, url, comment) => {
        try {
            // Melakukan komentar sebanyak yang dibutuhkan
            const commentPromises = [];
            for (let i = 0; i < value; i++) {
                commentPromises.push(comment(account[i].id, url, comment));
            }
            // Menunggu semua komentar selesai sebelum mengembalikan respons
            await Promise.all(commentPromises);

            return { message: 'Komentar berhasil' };
        } catch (error) {
            throw error
        }
    }
}