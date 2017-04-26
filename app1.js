
var express = require('express');
var app = express();

var num_users=0;
var users=[" "];

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
	id: Number
	
	
});
var mensaje = mongoose.model('mensaje', mensaje);


mongoose.connect('mongodb://localhost/chat', function(err){
	
	if(!err){
		
		console.log('Se ha conectado a la base de datos');
	}else{
		throw err;
	}
	
	
	
});

io.on('connection', function(client){
	
	console.log('cliente conectado');
	//nuevo mensaje
	client.on('chat', function(datos){
	console.log('enviando mensaje');
		//db.mensajes.insert({'user':datos.user});
	var m = new mensaje(
		{
			user: datos.user,
			mensaje: datos.mensaje,
			id: datos.id
		}
	);
	m.save(function(err){
		
		if(!err){
			console.log('guardado');
		} else{
			console.log('error guardando');
		}
		
	});
		client.broadcast.emit('chat', datos);
		
		
	});
	//escribiendo
	client.on('escribir', function(){
		console.log('escribiendo');
		io.emit('escribir', client.name);
	});
	//borrar escribiendo
	client.on('borrar', function(datos){
		console.log('borrando');
		io.emit('borrar');
	});
	//ultimos mensajes
	client.on('ultimos mensajes', function(datos){
		console.log('mostrando ultimos mensajes');
	var query = mensaje.find({}).sort({'_id': -1}).limit(50);

		query.exec(function(err, doc){
			
			if(!err){
				console.log('mostrando');
				client.emit('ultimos mensajes', doc);
			} else{
				console.log('error mostrando');
			}
			
		});
		
	});
	
	//conexion de usuario
	client.on('unir', function(nombre){
		
			num_users=num_users+1;
			users[num_users]=nombre;
			client.name=nombre;
			console.log('cliente conectado');
			console.log(users[num_users]);
			io.emit('unir',client.name,users);
		
		
	});
	//desconexion de usuario
	client.on('disconnect', function(){
		num_users=num_users-1;
		var pos=users.indexOf(client.name);
		users.splice(pos,1);
		io.emit('borrar usuario', client.name,users);
	
	});
	client.on('inicio', function(){		
		io.emit('inicio', users);
	});
	
});


server.listen(8080);