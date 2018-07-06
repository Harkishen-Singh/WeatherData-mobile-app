const MongoClient=require('mongodb').MongoClient,
    url='mongodb://127.0.0.1:27017';

// login operations
function loginOperations(req, res) {
    MongoClient.connect(url, (e, client) => {
        if(e) throw e;
        coll = client.db('Weather_record_tests').collection('Administration_Information');
        let username = req.body.username,password=req.body.password;
        let retrive = coll.findOne({"email":username}, (e, result) =>{
            if(e) throw e;
            console.debug(result);
            res.send(result);
        });
    });
}

module.exports = {
    loginOpt:loginOperations,
}