
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

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var mensaje = new Schema({
	
	user: String,
	mensaje: String,
	id: Number,
	color: String,
	
	
});
var mensaje = mongoose.model('mensaje', mensaje);


mongoose.connect('mongodb://localhost/chat', function(err){
	
	if(!err){
		
		console.log('Se ha conectado a la base de datos');
	}else{
		throw err;
	}
	
	
	
});
/*app.get('/nuevo', function(request, response){
	
	var m = new mensaje(
		{
			user: String,
			mensaje: String,
			id: Number,
			color: String,
		}
	);
	m.save(function(err){
		
		if(!err){
			response.write('creado');
			response.end();
		} else{
			response.write('fallo');
			response.end();
		}
		
	});
});*/
io.on('connection', function(client){
	
	console.log('cliente conectado');
	client.on('chat', function(datos){
		console.log('enviando mensaje');
		//db.mensajes.insert({'user':datos.user});
		io.emit('chat', datos);
		
		
	});
	client.on('escribir', function(datos){
		console.log('escribiendo');
		io.emit('escribir', datos);
	});
	client.on('borrar', function(datos){
		console.log('borrando');
		io.emit('borrar');
	});
	
});


server.listen(8080);