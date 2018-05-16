
class Categoria{
	constructor(name,id){
		this.name = name;
		this.id = id;
		this.sublevels = [];
	}
} 

function MostrarCatalogo(nivel){
		
	var productos_de_nivel = document.getElementsByClassName(nivel);
	var todos = document.getElementsByClassName("card-content");
	for(var i=0 ;i<todos.length;i++){
		var carta = todos[i].children[0];
		
		if(!nivel.includes('todo')&&!carta.className.includes(nivel)&& !carta.className.includes('NotShowCard') ){
			carta.className += ' NotShowCard';
		}else if (!nivel.includes('todo')&&carta.className.includes(nivel) && carta.className.includes('NotShowCard')){
			carta.className -= 'NotShowCard';
		}
		if(nivel.includes('todo') && carta.className.includes('NotShowCard')){
			carta.className-='NotShowCard';
		}
	}
}

function AgregarCarrito(){
		var carrito = document.getElementById('btn-carrito');
		var suma = parseInt(carrito.innerHTML)+1;
		carrito.innerHTML = suma;
	}
var catalogoOriginal = [];
var menu;
(function(){

	function $(selector){
		return document.querySelector(selector);
	}


 
	function MostrarCatalogo(cat,nivel=-1){
		
		var template_prods = ``;
		    for (var i in cat.products){
		    	//if(cat.products[i].available && (nivel==cat.products[i].sublevel_id || nivel==-1)){
			    	template_prods += `<div class="column is-one-quarter"> 
									<div class="card-content" id=${cat.products[i].available}>
										<div class="card ${cat.products[i].sublevel_id}">
										<div id='card'>
										
											<h2 class="title-card">${cat.products[i].name}</h2>
												
											<h3 class="subtitle">Precio: <strong> ${cat.products[i].price}</strong></h3>
												<p class="cantidad">(${cat.products[i].quantity})</p>

										<div class="card-footer">
											<a href="#"  onclick="AgregarCarrito()" class="button button-inline btn-agregar"><span id="span-agregar"><i class="icon-basket"></i></span></a>
										</div>
										</div>
										</div>
										
									</div>
									</div>`;
				//}
		    }
		    $('#catalogo').innerHTML = template_prods;
	}

	
	function ElBaraton_View(){

	}

	document.addEventListener('DOMContentLoaded',function(){
		// GET JSON PRODUCTS FILE
		var request = new XMLHttpRequest();
		request.open('GET', 'json/products.json', true);
		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    catalogoOriginal = JSON.parse(request.responseText);
		    MostrarCatalogo(catalogoOriginal);



		  } else {
		    console.log("Error");
		  }
		}
		request.onerror = function() {
		  // There was a connection error of some sort
		  console.log("Error");
		}
		request.send();

		

	});


	function RecorrerCat(lista,categorias=[],padre=[]){
		var listaitems = document.createElement("ul");
		listaitems.setAttribute("class","menu-ul");
		console.log(padre);
		//padre.appendChild(listaitems);
		for(var i=0; i<lista.length; i++){

			var item = document.createElement("li");
			var dir = document.createElement("a");
			dir.setAttribute("href","'#'");
			dir.setAttribute("id",lista[i].id);
			item.appendChild(dir);
			padre.appendChild(item);
			var cat = new Categoria(lista[i].name,lista[i].id,[]);
			dir.innerHTML = cat.name;
			
			if(lista[i].sublevels != undefined){
				var new_ul = document.createElement("ul");
				var drop = document.createElement("span");
				item.setAttribute("class","submenu");
				drop.setAttribute("class","icon-down-open");
				item.appendChild(new_ul);
				dir.appendChild(drop);

				RecorrerCat(lista[i].sublevels,cat.sublevels,new_ul);
			}
			categorias.push(cat);

		}
	}
 
	
	//document.addEventListener('DOMContentLoaded',function(){
		// GET JSON CATEGORIES FILE
		var categorias = ``;
		var request = new XMLHttpRequest();
		request.open('GET', 'json/categories.json', true);
		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    categorias = JSON.parse(request.responseText);

		    var categ = [];
	
			menu = document.getElementById("menu-lista");
			RecorrerCat(categorias.categories,categ,menu);
			
		  } else {
		    console.log("Error");
		  }
		}

		request.onerror = function() {
		  // There was a connection error of some sort
		  console.log("Error");
		}
		request.send();
		 
	//});

	

 
})();

$(document).ready(function(){
	
	$('.menu li').click(function(e){
		e.preventDefault();
		var nivel = $(this).children('a');
		nivel =nivel[0].id;
		MostrarCatalogo(nivel);
	});

	$('.menu li:has(ul)').click(function(e){
		e.preventDefault();
		if($(this).children('ul').length!=0){
			$(this).children('ul').slideToggle();
			if ($(this).hasClass('activado')) {
				$(this).removeClass('activado');
			}else{
				$(this).addClass('activado');
			}
		}
		var nivel = $(this).children('a');
		nivel =nivel[0].id;
		MostrarCatalogo(nivel);
   	

	});    

	
	/*$('.btn-agregar').click(function(e){
		var carrito = document.getElementById("btn-carrito");
		console.log(carrito);
		carrito.innerHTML = '6';
	});*/

	
});
