const MongoClient=require('mongodb').MongoClient,
    url='mongodb+srv://harkishen:Bbsr131@cluster0-3ynvj.mongodb.net/weatherdata?retryWrites=true';

// login operations
function loginOperations(req, res) {
    MongoClient.connect(url, (e, client) => {
        if(e) throw e;
        coll = client.db('weatherdata').collection('Administration_Information');
        try{
            let username = req.body.username,password=req.body.password;
            console.warn(username)
            let retrive = coll.findOne({"email":username}, (e, result) =>{
                if(e) console.error('Wrong Input, Admin form')
                console.debug(result);
                if(result['password']==password)
                    res.send(result);
                else    
                    res.send('incorrect passward')
            });
            client.close();
        }
        catch(e){
            console.error('Wrong input, admin form');
        }

    });
}

function fetchMessagesWebsite(req, res) {
    MongoClient.connect(url, (e, client) => {
        if(e) throw e;
        coll = client.db('weatherdata').collection('Client_Message');
        retrive = coll.find().toArray((e, result) => {
            if(e) console.error('err while retriving');
            console.debug(result);
            res.send(result);
            client.close();
        });
    });
}

module.exports = {
    loginOpt:loginOperations,
    messages: fetchMessagesWebsite,
}