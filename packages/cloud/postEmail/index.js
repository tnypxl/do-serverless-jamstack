const MongoClient = require('mongodb').MongoClient;

async function main(params) {
  const uri = process.env['DATABASE_URL'];
  const client = new MongoClient(uri);
  const newEmail = params.email

  try {
    await client.connect();
    const inventory = await client.db("do-coffee").collection("email-list").insertOne({ subscriber: newEmail });
    console.log(inventory);

    return {
      "body": inventory,
    }
  } catch (e) {
    console.error(e);

    return {
      "body": { "error": "There was a problem retrieving data." },
      "statusCode": 500
    }
  } finally {
    await client.close();
  };
}