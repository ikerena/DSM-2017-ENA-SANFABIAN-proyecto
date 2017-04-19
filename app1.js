
var express = require('express');
var app = express();


//var port =process.env.PORT || 8080;
app.set('view engine','jade');
app.use(express.static('public'));
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

mongoose.connect('mongodb://localhost/chat', function(err){
	
	if(!err){
		
		console.log('Se ha conectado a la base de datos');
	}else{
		throw err;
	}
	
	
	
});
io.on('connection', function(client){
	
	console.log('cliente conectado');
	client.on('chat', function(datos){
		console.log('enviando mensaje');
		io.emit('chat', datos);
		
		
	});
	
});


server.listen(8080);