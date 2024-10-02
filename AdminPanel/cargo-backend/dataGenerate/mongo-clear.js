const MongoClient = require('mongodb').MongoClient;
const dbConfig = require("../mongodb/dbConfig")
const config = dbConfig;
async function clearCollection(collectionName) {

    const url = `mongodb://${config.user}:${config.password}@${config.host}:27017/${config.dbName}`;
    const dbName = config.dbName;
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.deleteMany({});
        console.log('Successfully deleted', result.deletedCount, 'documents from the collection');
    } catch (err) {
        console.error('Failed to clear collection:', err);
    } finally {
        client.close();
    }
}
module.exports = clearCollection
