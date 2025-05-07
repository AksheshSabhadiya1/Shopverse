
const db = require('../../config/database')

const getContact =  async(req, res)=> {
    const [contactData] = await db.execute('SELECT * FROM contact')
    return res.json(contactData)
}

module.exports = {getContact}