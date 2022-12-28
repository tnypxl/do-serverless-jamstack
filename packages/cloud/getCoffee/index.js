const MongoClient = require('mongodb').MongoClient;

async function main() {
  const uri = process.env['DATABASE_URL'];
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const inventory = await client.db("do-coffee").collection("available-coffees").find().toArray();
    console.log(inventory);

    return {
      "body": inventory,
    }
  } catch (e) {
    console.error(e);

    return {
      "body": { "error": "There was a problem adding the email address to the database" },
      "statusCode": 400
    }
  } finally {
    await client.close();
  };
}

module.exports.main = main;