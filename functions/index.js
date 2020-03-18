const dotenv = require('dotenv');
dotenv.config();

const functions = require('firebase-functions');

const axios = require('axios');

const exportFunction = async (req, res) => {
    const testCases = []
    try {
        if (!req) res.json('There is no request!');
        if (!req.query) res.json('There is no query params!');

        const response = await axios.get(`${process.env.CRUD_API_ENDPOINT}/robust-dashboard-testing/test-cases`)

        testCases.push(...response.data)
    } catch (e) {
        res.json(`Get credentials from get testCases CRUD STEP error: ${e.message}`);
    }
    res.json(testCases);
}
//
exports.testRunner = functions.region('europe-west2').https.onRequest(exportFunction);
exports.scheduledTestRunner = functions.region('europe-west2').pubsub.schedule('every 55 minutes').onRun(exportFunction);
