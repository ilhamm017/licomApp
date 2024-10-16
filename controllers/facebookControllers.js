const { accountCount } = require('../service/accountCounter')
const { like } = require('../service/facebookService')

module.exports = {
    facebookLike : async (value, url) => {
        try {
            // Mendapatkan data akun fb 
            const account = await accountCount().then((res) => {
                return res.fb
            })
            // Mengecek apakah melebihi batas maksimal like
            if (value > account.length) {
                return {
                    message: 'Melebihi batas maksimal like'
                }
            }
            // Melakukan like
            for (let i = 0; i < value; i++) {
                like(account[i].id, url)
            }
            return {
                message: 'Like berhasil'
            }
        } catch (error) {
            throw error
        }
    },
    facebookComment : async (value, url, comment) => {
        try {
            
        } catch (error) {
            
        }
    }
}