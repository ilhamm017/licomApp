const request = require('./request')

module.exports = {
    accountCount : async () => {
        let fb = [] 
        let ig = []
        const list = await request.getBrowserList({
            page: 0,
            pageSize: 10000
        }).then(response => response.data.list);
        await list.forEach(element => {
            if (element.platform == 'https://www.facebook.com/') {
                fb.push(element)
            }
        });
        await list.forEach(element => {
            if (element.platform == 'https://www.instagram.com/') {
                ig.push(element)
            }
        });
        return {
            fb,
            ig
        }
    }
}