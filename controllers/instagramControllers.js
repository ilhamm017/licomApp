const { igComment, igLike } = require('../service/instagramService')

module.exports = {
    instagramLike : async (account, value, url) => {
        try {
            // Melakukan like secara berurutan dan menunggu setiap like selesai
            const likePromises = [];
            for (let i = 0; i < value; i++) {
                const job = await igLike(account[i].id, url)
                likePromises.push(job);
            }
            // Menunggu semua like selesai sebelum mengembalikan respons
            await Promise.all(likePromises);

            return { message: 'Like berhasil' };
        } catch (error) {
            throw error
        }
    },
    instagramComment : async (account, value, url, comment) => {
        try {
            // Melakukan komentar sebanyak yang dibutuhkan
            const commentPromises = [];
            for (let i = 0; i < value; i++) {
                const job = await igComment(account[i].id, url, comment)
                commentPromises.push(job);
            }
            // Menunggu semua komentar selesai sebelum mengembalikan respons
            await Promise.all(commentPromises);

            return { message: 'Komentar berhasil' };
        } catch (error) {
            throw error
        }
    }
}