var MongoClient = require('mongodb').MongoClient;
// mongo.connect('mongodb+srv://harkishen:Bbsr131@cluster0.mongodb.net/weatherdata', (e, database)=>{
//     if(e) throw e;
//     conn=database.db('weatherdata');
//     conn.collection('Client_Message').find().toArray((e, result)=>{
//         console.warn(result);
//     });
// });

MongoClient.connect('mongodb+srv://harkishen:Bbsr131@cluster0-3ynvj.mongodb.net/weatherdata?retryWrites=true', (e, client) => {
    if(e) throw e;
    coll = client.db('weatherdata').collection('Client_Message');
    retrive = coll.find().toArray((e, result) => {
        if(e) console.error('err while retriving');
        console.debug(result);
        client.close();
    });
});