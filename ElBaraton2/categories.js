
class Categoria{
	constructor(name,id){
		this.name = name;
		this.id = id;
		this.sublevels = [];
	}
}

(function(){

	function $(selector){
		return document.querySelector(selector);
	}

	function ElBaraton(catalogo){
		
		
	}
	function ElBaraton_View(){

	}
	function RecorrerCat(lista,categorias=[],padre=[]){
		var listaitems = document.createElement("ul");
		listaitems.setAttribute("class","menu-ul");
		//padre.appendChild(listaitems);
		for(var i=0; i<lista.length; i++){



			var item = document.createElement("li");
			var dir = document.createElement("a");
			dir.setAttribute("href","'##'");
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

	/*function RecorrerCat(lista,categorias=[],padre=[]){
		var listaitems = document.createElement("ul");
		listaitems.setAttribute("class","menu-ul")
		padre.appendChild(listaitems);
		for(var i=0; i<lista.length; i++){



			var item = document.createElement("li");
			var dir = document.createElement("a");
			dir.setAttribute("href","'##'");
			dir.setAttribute("id",lista[i].id);
			item.appendChild(dir);
			listaitems.appendChild(item);
			
			var cat = new Categoria(lista[i].name,lista[i].id,[]);
			dir.innerHTML = cat.name;
			
			if(lista[i].sublevels != undefined){
				
				var drop = document.createElement("span");
				item.setAttribute("class","submenu");
				drop.setAttribute("class","icon-down-open");
				dir.appendChild(drop);
				RecorrerCat(lista[i].sublevels,cat.sublevels,listaitems);
			}
			categorias.push(cat);

		}
	}*/

	
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
	
			var menu = document.getElementById("menu-lista");
			RecorrerCat(categorias.categories,categ,menu);
			//console.log($('.menu li:has(ul)'));
		  } else {
		    console.log("Error");
		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		  console.log("Error");
		};
		request.send();


	//});



})();



$(document).ready(function(){
	$('.menu li').click(function(e){
		e.preventDefault();
	});

	$('.menu li:has(ul)').click(function(e){
		$(this).children('ul').slideToggle();
		if ($(this).hasClass('activado')) {
			$(this).removeClass('activado');

		}else{
			$(this).addClass('activado');
		}
		
	});
});



