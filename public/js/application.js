
var socket = io.connect();

socket.on('chat', function(datos){
	
	//alert(datos.info);
	var coment = datos.mensaje;
	color = colores(datos.color);
	$(".comentarios").append("<p><h5 style='color:"+color+";'>"+datos.user+":</h1>"+coment+"</p>");
	
	
});

$(document).ready(function() {

	//introducir usuario y verificarlo
	//var person = prompt("Please enter your name");
   // if (person == " ") {
	//	var person = prompt("Please enter your name");
   // }
	//
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
			}
		});
	//funcion para detectar si estas escribiendo
	$(document).keypress(function(e) {
             
            
            if(e.which <= 48 && e.which>=90) {
                  
            }
 
    }); 
	//envio de comentarios y guardado en la bd
	$('.formu').on('submit', function(event){
			event.preventDefault();
			var mensaje = $('.text').val();
			var usuario= 'iker';
			var id='3';
			var color = 'green';
			var comentario= {'user':usuario, 'mensaje': mensaje, 'id':id, 'color':color};
			
			//db.mensajes.insert({'user':usuario, 'mensaje': mensaje, 'id':id, 'color':color});
			
			socket.emit('chat', {'user':usuario, 'mensaje': mensaje, 'id':id, 'color':color});
			
			
	});
	

});



function colores(color){
	
	if(color=='verde'){
		
		color='#2EFE2E';
	}
	
	return color;
	
}