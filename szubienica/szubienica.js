var haslo = "Bez pracy nie ma kolaczy";
haslo = haslo.toUpperCase();

var haslo1 = "";
var dlugosc = haslo.length;
var ile_skuch = 0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

for (i=0; i<dlugosc; i++)
{
	if(haslo.charAt(i) == " ") haslo1 = haslo1 + " ";
	else haslo1 = haslo1 + "-";
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;

var ciag_liter = 'A B C D E F G H I J K L M N O P R S T U W Y Z';
litery = ciag_liter.split(" ");

function start()
{
	var tresc_diva = ''
	for (i=0; i<=(litery.length-1); i++)
	{
		var element = "lit"+i;
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		if ( (i+1) % 8 == 0) tresc_diva = tresc_diva + '<div style="clear:both;"</d>'
	}

	document.getElementById("alfabet").innerHTML = tresc_diva;

	wypisz_haslo();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce > this.lenghth -1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

function sprawdz(nr)
{
	var trafiona = false;
	
	for(i=0; i<dlugosc; i++)
	{
		if(haslo.charAt(i) == litery[nr])
		{
			haslo1 = haslo1.ustawZnak(i, litery[nr]);
			trafiona = true;
		}
	}
	if(trafiona == true)
	{
		yes.play();
		var element = "lit"+nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		wypisz_haslo();
	}
	else
	{
		no.play();
		var element = "lit"+nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick", ";");
	
		ile_skuch++;
		var obraz = "img/s"+ile_skuch+".jpg";
		document.getElementById("szubienica").innerHTML = '<img src="'+obraz+'"/>'
	}
	
	if(haslo == haslo1)
	{
		document.getElementById("alfabet").innerHTML = "Wygrana! poprawne haslo: " + haslo + '<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	}

	if(ile_skuch >= 9)
	{
		document.getElementById("alfabet").innerHTML = "Przegrana! poprawne haslo: " + haslo + '<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	}

}




