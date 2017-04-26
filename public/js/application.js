var socket = io.connect();
var us;


socket.on('chat', function(datos){
	
	//alert(datos.info);
	var coment = datos.mensaje;
	color = colores(datos.color);
	$(".comentarios").append("<div><h5 style='color:"+color+";'>"+datos.user+":</h5><p>"+coment+"</p></div>");
	
	$("p").emoticonize();
	
});
//mostramos los ultimos mensajes al conectarnos
socket.on('ultimos mensajes', function (datos) {
	//console.log('llega');
		for (var i = datos.length - 1; i >= 0; i--) {
		  $(".comentarios").append("<div><h5>"+datos[i].user+":</h5><p>"+datos[i].mensaje+"</p></div>");
		};
		$("p").emoticonize();
})
socket.on('escribir', function(datos){
	
	//alert(datos.info);
	var user = datos;
	
	$(".comentarios").append("<p id='escribir'>"+user+" esta escribiendo</p>");
	if($(".comentarios").scrollTop() > $(".comentarios").prop('scrollHeight')-700) {
		$(".comentarios").animate({ scrollTop: $('.comentarios')[0].scrollHeight}, 1000);
	}
	
	
});
socket.on('unir', function(datos,users){
	
	
	$(".comentarios").append("<p style='color:yellow;'>"+datos+" se ha unido al chat</p>");
	$("#nickusers").children().remove();
	for (var i = 0; i <= users.length - 1; i++) {
		  $("#nickusers").append("<p id='"+users[i]+"' style='color:red;'>"+users[i]+"</p>");
	};
	
	$("p").emoticonize();

	
});
socket.on('borrar usuario', function(datos,users){
	

	$(".comentarios").append("<p style='color:yellow;'>"+datos+" se ha desconectado del chat</p>");
	$("#nickusers").children().remove();
	for (var i = 0; i <= users.length - 1; i++) {
		  $("#nickusers").append("<p id='"+users[i]+"' style='color:red;'>"+users[i]+"</p>");
	};
	
});
socket.on('borrar', function(){
	
	$('#escribir').remove();
	
	
});
socket.on('inicio', function(users){
	us=users;

});

$(document).ready(function(){
		socket.emit('inicio');
		$("#logindiv").css("display", "block");
		$("#login #cancel").click(function() {
			$(this).parent().parent().hide();
			});
			// Login form popup login-button click event.
			$("#loginbtn").click(function() {
			var name = $("#username").val();
			var repetido=false;
			for (var i = 0; i <= us.length - 1; i++) {
				 if(us.indexOf(name)>-1){
					 repetido=true;
					 break;
				 }
			};
			
			if(us.length>10){
				alert("Sala llena");
			}else if(repetido){
				alert("Nombre cogido");
			}else{
				if($("#username").val().length == 0){
					alert("Tienes que rellenar el campo");
				}else{
					$("#logindiv").css("display", "none");
					$("#cuadro").css("z-index", "1");
					//$(".comentarios").animate({ scrollTop: $('.comentarios')[0].scrollHeight}, 1000);
					socket.emit('unir', name);
				};
			}
			
		});

	socket.emit('ultimos mensajes');
	
	//funcion para detectar si estas escribiendo
	$("#coment").keydown(function(e){
             
        
		if($('#escribir').length == 0){
			//console.log(e);
			socket.emit('escribir');
		}
		
 
    }); 
	$("#coment").keyup(function(e) {
             
			 socket.emit('borrar');
            
    }); 
	//envio de comentarios y guardado en la bd
	$('.formu').on('submit', function(event){
			event.preventDefault();
			var mensaje = $('.text').val();
			var usuario= $('#username').val();
			var id='3';
			if($('.text').val().length == 0){
					alert("Tienes que rellenar el campo");
			}else{
				var comentario= {'user':usuario, 'mensaje': mensaje, 'id':id};

				$(".comentarios").append("<div style='color:green;'><h5>"+usuario+":</h5><p>"+mensaje+"</p></div>");
				if($(".comentarios").scrollTop() > $(".comentarios").prop('scrollHeight')-($(".comentarios").height()/2)-400) {
					$(".comentarios").animate({ scrollTop: $('.comentarios')[0].scrollHeight}, 1000);
				}
				$("p").emoticonize();
				$('.text').val("");
				socket.emit('chat', {'user':usuario, 'mensaje': mensaje, 'id':id});
			}

			

	});
	

});



function colores(color){
	
	if(color=='verde'){
		
		color='#2EFE2E';
	}
	
	return color;
	
}