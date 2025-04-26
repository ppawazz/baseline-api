const { getDataFromDB } = require('../services/dbService');

async function getData(req, res) {
    try {
        const data = await getDataFromDB();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getData };
