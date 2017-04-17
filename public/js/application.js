
//var socket = io();

/*socket.on('chat', function(datos){
	
	//alert(datos.info);
	var coment = datos.info;
	$(".comentarios").append("<p>"+coment+"</p>");
	
	
});*/

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
		}
		});
	//funcion para detectar si estas escribiendo
	$(document).keypress(function(e) {
             
            
            if(e.which <= 48 && e.which>=90) {
                  
            }
 
    }); 

		$('.formu').on('submit', function(event){
			event.preventDefault();
			var mensaje = $('.text').val();
			var usuario= 'sdfds';
			var id='3';
			var color = 'verde';
			var comentario= {'user':usuario; 'mensaje': mensaje; 'id':id; 'color':color;}
			db.mensajes.insert({comentario});
			
			socket.emit('chat', {info: mensaje});
			
			
		});
	

});