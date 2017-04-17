var express = require('express');
var app = express();


var port =process.env.PORT || 8080;
app.set('view engine','jade');
app.use(express.static('public'));
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser= require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat' function(err){
	
	if(!err){
		
		console.log(''Se ha conectado a la base de datos);
	}else{
		throw err;
	}
	
	
	
});
app.listen(8080, function(){
	
	console.log('escuchando en el puerto 8080');
	
});



io.on('connection', function(client){
	
	console.log('cliente conectado');
	client.on('chat', function(datos){
		console.log('enviando mensaje');
		io.emit('chat', datos);
		
		
	});
	
	
});





server.listen(port);