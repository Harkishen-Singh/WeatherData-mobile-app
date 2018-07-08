const express=require('express'),
    app= express(),
    MongoClient=require('mongodb').MongoClient,
    bodyParser=require('body-parser'),
    DB=require('./dboperations');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req,res) => {
    console.debug('This Works, ready to server REST');
    res.send('This Works, ready to server REST');
});
app.post('/loginOperations', (req, res) => {
    DB.loginOpt(req,res);
});
app.post('/fetchClientMessages', (req, res) => {
    DB.messages(req,res);
});
app.post('/fetchPastWeather', (req, res) =>{
    DB.pastFetch(req,res);
});
const server = app.listen(5500, '0.0.0.0', e =>{
    if(e) throw e;
    console.warn('URL : '+server.address().address+'\t PORT : '+server.address().port);

})