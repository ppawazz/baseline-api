const { getDataFromDB, createDataInDB, deleteAllDataFromDB, countDataFromDB } = require('../services/dbService');

async function getData(req, res) {
    try {
        const data = await getDataFromDB();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createData(req, res) {
    try {
        const count = parseInt(req.params.count) || 10; 
        
        if (count <= 0 || count > 1000) {
            return res.status(400).json({ message: 'Count must be between 1 and 1000' });
        }
        
        const createdData = await createDataInDB(count);
        res.status(201).json({
            message: `Successfully created ${count} new products`,
            count: createdData.length,
            data: createdData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteAllData(req, res) {
    try {
        const result = await deleteAllDataFromDB();
        res.json({
            message: 'All products have been deleted',
            count: result.rowCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function countData(req, res) {
    try {
        const count = await countDataFromDB();
        res.json({
            message: 'Products count retrieved successfully',
            count: count
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getData, createData, deleteAllData, countData };
