const MongoClient=require('mongodb').MongoClient,
    url='mongodb://127.0.0.1:27017';

// login operations
function loginOperations(req, res) {
    MongoClient.connect(url, (e, client) => {
        if(e) throw e;
        coll = client.db('Weather_record_tests').collection('Administration_Information');
        try{
            let username = req.body.username,password=req.body.password;
            let retrive = coll.findOne({"email":username}, (e, result) =>{
                if(e) console.error('Wrong Input, Admin form')
                console.debug(result);
                if(result['password']==password)
                    res.send(result);
                else    
                    res.send('incorrect passward')
            });
        }
        catch(e){
            console.error('Wrong input, admin form');
        }
    });
}

module.exports = {
    loginOpt:loginOperations,
}