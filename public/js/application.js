
var socket = io.connect();

socket.on('chat', function(datos){
	
	//alert(datos.info);
	var coment = datos.mensaje;
	color = colores(datos.color);
	$(".comentarios").append("<div><h5 style='color:"+color+";'>"+datos.user+":</h5><p>"+coment+"</p></div>");
	$("p").emoticonize();
	
});
//mostramos los ultimos mensajes al conectarnos
socket.on('ultimos mensajes', function (datos) {
	console.log('llega');
		for (var i = 0; i <= datos.length - 1; i++) {
		  $(".comentarios").append("<div><h5>"+datos[1].user+":</h5><p>"+datos[i].mensaje+"</p></div>");
		};
})
socket.on('escribir', function(datos){
	
	//alert(datos.info);
	var user = datos.user;
	$(".comentarios").append("<p id='escribir'>Iker esta escribiendo</p>");
	
	
});
socket.on('unir', function(datos){
	

	$(".comentarios").append("<p style='color:yellow;'>"+datos+" se ha unido al chat</p>");
	
	
});
socket.on('borrar usuario', function(datos){
	

	$(".comentarios").append("<p style='color:yellow;'>"+datos+" se ha desconectado del chat</p>");
	
	
});
socket.on('borrar', function(){
	
	$('#escribir').remove();
	
	
});
$(document).ready(function(){

		$("#logindiv").css("display", "block");
		$("#login #cancel").click(function() {
			$(this).parent().parent().hide();
			});
			// Login form popup login-button click event.
			$("#loginbtn").click(function() {
			var name = $("#username").val();

			if (name == ""){
			alert("Tienes que rellenar el campo");
			}else{
			$("#logindiv").css("display", "none");
			$("#cuadro").css("z-index", "1");
			socket.emit('unir', name);
			}
		});

	socket.emit('ultimos mensajes');
	//funcion para detectar si estas escribiendo
	$("#coment").keydown(function(e){
             
        
		var usuario= 'iker';
		if($('#escribir').length == 0){
			console.log(e);
			socket.emit('escribir', {'user':usuario});
		}
		
 
    }); 
	$("#coment").keyup(function(e) {
             
			 socket.emit('borrar');
            
    }); 
	//envio de comentarios y guardado en la bd
	$('.formu').on('submit', function(event){
			event.preventDefault();
			var mensaje = $('.text').val();
			var usuario= 'iker';
			var id='3';
			var comentario= {'user':usuario, 'mensaje': mensaje, 'id':id};
			
			$(".comentarios").append("<div style='color:green;'><h5>"+usuario+":</h5><p>"+mensaje+"</p></div>");
			
			socket.emit('chat', {'user':usuario, 'mensaje': mensaje, 'id':id});
			
			
	});
	

});



function colores(color){
	
	if(color=='verde'){
		
		color='#2EFE2E';
	}
	
	return color;
	
}