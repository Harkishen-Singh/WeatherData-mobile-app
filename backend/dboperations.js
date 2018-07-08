const MongoClient=require('mongodb').MongoClient,
    url='mongodb+srv://harkishen:Bbsr131@cluster0-3ynvj.mongodb.net/weatherdata?retryWrites=true',
    url2='mongodb+srv://harkishen:Bbsr131@cluster0-zmd3i.mongodb.net/Weather_record_tests?retryWrites=true';

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

function pastWeatherFetch(req,res) {
    MongoClient.connect(url2, (e, client) => {
        if(e) throw e;
        let date = req.body.date, place=req.body.place;
        date_string = String(date);
        let year = date_string.substring(0,4), month = date_string.substring(5,7), day=date_string.substring(8,10);
        console.warn(date)
        searcher = 'rec__'+year+'_'+month+'_'+day;
        console.warn(searcher);
        coll=client.db('Weather_record_tests').collection(searcher);
        retrive = coll.find({"city":place}).toArray((e, result2)=>{
            if(e) {console.error('err while retriving past data ');throw e;}
            if(result2.length>=2)
                result2.pop();
            console.debug(result2)
            res.send(result2)
            client.close();
        }); 
    });
}

module.exports = {
    loginOpt:loginOperations,
    messages: fetchMessagesWebsite,
    pastFetch:pastWeatherFetch,
}