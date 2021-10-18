
const bMenu = document.getElementById("buttonMenu");//donde estan dentro todos los botones que se crean
const clickZone = document.getElementById("mainImg");//la zona donde se clickea
const Score = document.getElementById("score");//el contenedor de la puntuacion
const mainImg = document.getElementById("mainImg");
const COSTMULTI=0.25;

let Game ={//donde se guardan los datos del juego
    pFuerza: 0,
    clickPower: 1,
    cost1kg : 20,
    numKg : 0,
    costProtes : 50,
    numProtes : 0,
    protesPower : 0.05,
    numCadenas : 0,
    costCadenas : 200,
    costAnime : 600,
    numAnime : 0,
    animePower : 1,
} 
if( localStorage.length != 0){//te carga los datos guardados
    //hay que modificarlo ya que si se anyade algo nuevo estos datos faltarian asi que necesita ser arreglado
    loadData();
}

function loadData(){
    Game = JSON.parse(localStorage.getItem("Game"));
}

/*
* Esta funcion toma dos strings,el numero actual (uno de los valores num de Game),
* un coste inicial, una classe para el buton y una funcion como parametros
* la funcion es la que se ejecutaria en el onclick y decuelce el elemento
* button construido. 
*/
function createButton(upgradeName, description, numero, cost, bClass, onclickFunction){
    let b = document.createElement("button");
    let sp = document.createElement("span");
    let infBox = document.createElement("div");
    let p = document.createElement("p");
    let num = document.createElement("p");
    num.innerText = "Tienes: " + numero;
    num.style.color = "#ce5221";
    infBox.className ="infoBox";
    p.innerText = description;
    infBox.appendChild(p);
    infBox.appendChild(num);
    sp.innerText = cost ? Math.round(cost) : "";
    b.innerText = upgradeName;
    b.appendChild(sp);
    b.onclick = onclickFunction;
    b.className = bClass;
    b.appendChild(infBox);
    return b
}

function setScore(){//funcion que te actualiza los pFuerza
    Score.innerText= "Puntos de Fuerza: " + Game.pFuerza.toFixed(1);
}

//cambia el color del coste
function insuficientePuntos(button, pagoEfectuado){
    pagoEfectuado ? button.childNodes[3].style.color = "green" : button.childNodes[3].style.color = "red";
    //anyadir animacion al pulsar alomejor
    setTimeout(() => {
        button.childNodes[3].style.color = "black";
    }, 1000);
}

function popUpOnClick(event) {
    let p = document.createElement('p');
    p.innerHTML = "+" + Game.clickPower.toFixed(1);
    //Set CSS styles so it appears where you clicked (Top left corner)
    p.className = "popUpOnClick";
    p.style.position = 'absolute';
    p.style.left     = event.clientX + 'px';
    p.style.top      = (event.clientY-40) + 'px';
    
    document.body.appendChild(p);
    setTimeout(()=>document.body.removeChild(p),1000);
  }

/*
esto seria un ejemplo de un boton basico que sube la fuerza 
asigana el valor del coste en el objeto Game
La variable CONSTMULTI sirve para incrementar el precio de la mejora
(Tener en cuenta que se ha cambiado para que ne le nombre haya que poner 
\ncost: para que se muestre el coste ya que asi tiene mas flexibilidad 
a la hora de que boton crear)
*/
buttonDeUnKg = createButton("+1kg \ncost: ","Añade 1Kg de peso (+0.1 al pulsar)", Game.numKg, Game.cost1kg, "upgradeButtons", function(){
    let comp = Game.pFuerza>=Game.cost1kg;
    if(comp){//si tienes su coste te deja comprarlo
    Game.clickPower +=0.1;
    Game.pFuerza -=Game.cost1kg;
    Game.cost1kg += Game.cost1kg*COSTMULTI;
    Game.numKg++;
    buttonDeUnKg.childNodes[3].innerText = (Game.cost1kg).toFixed(0);
    buttonDeUnKg.childNodes[4].childNodes[1].innerText = "Tienes: " + Game.numKg;
}
    insuficientePuntos(buttonDeUnKg,comp);
});
buttonDeProtes = createButton("Batido de proteínas \ncost: ","Gracias a sus proteinas ahora ganas fuerza pasivamente (+0.5 PF/s)",
    Game.numProtes, Game.costProtes, "upgradeButtons", function(){
    let comp = Game.pFuerza>=Game.costProtes;
    if(comp){//si tienes su coste te deja comprarlo
        Game.numProtes++;
        Game.pFuerza -=Game.costProtes;
        Game.costProtes += Game.costProtes*COSTMULTI;
        buttonDeProtes.childNodes[3].innerText = (Game.costProtes).toFixed(0);
        buttonDeProtes.childNodes[4].childNodes[1].innerText = "Tienes: " + Game.numProtes;
    }
        insuficientePuntos(buttonDeProtes,comp);
});
buttonGuardar = createButton("Guardar","", "","", "dataButtons", function(){
    localStorage.setItem("Game", JSON.stringify(Game));
});
buttonReset = createButton("Reset","", "","", "dataButtons", function(){
    let conf = confirm("Estas seguro de que quieres resetear tu datos una vez borrados no se podran recuperar!!");
    if(conf){
        localStorage.clear();
        location.reload();
    }
})
buttonDeCadenas = createButton("Cadenas \ncost: ","Ahora levantas cadenas de hierro (+1.2 al pulsar)",
                                Game.numCadenas, Game.costCadenas, "upgradeButtons", function()
{
    let comp = Game.pFuerza>=Game.costCadenas;
    if(comp){//si tienes su coste te deja comprarlo
    Game.clickPower +=1.2;
    Game.pFuerza -=Game.costCadenas;
    Game.costCadenas += Game.costCadenas*COSTMULTI;
    Game.numCadenas++;
    buttonDeCadenas.childNodes[3].innerText = (Game.costCadenas).toFixed(0);
    buttonDeCadenas.childNodes[4].childNodes[1].innerText = "Tienes: " + Game.numCadenas;
    }
    insuficientePuntos(buttonDeCadenas,comp);
});
buttonDeMotivacionAnime = createButton("Motivacion Anime \ncost: ","Te motivas leyendo anime y ahora puedes hacer ejercicio mientras duermes (+10.0 PF/s)",
    Game.numAnime, Game.costAnime, "upgradeButtons", function(){
    let comp = Game.pFuerza>=Game.costAnime;
    if(comp){//si tienes su coste te deja comprarlo
        Game.numAnime++;
        Game.pFuerza -=Game.costAnime;
        Game.costAnime += Game.costAnime*COSTMULTI;
        buttonDeMotivacionAnime.childNodes[3].innerText = (Game.costAnime).toFixed(0);
        buttonDeMotivacionAnime.childNodes[4].childNodes[1].innerText = "Tienes: " + Game.numAnime;
    }
        insuficientePuntos(buttonDeMotivacionAnime,comp);
});
//zona donde se agrega todos los botones
//IMPORTANTE el orden en que se agregan es en que aparecen!
bMenu.appendChild(buttonGuardar);
bMenu.appendChild(buttonReset);
bMenu.appendChild(buttonDeUnKg);
bMenu.appendChild(buttonDeProtes);
bMenu.appendChild(buttonDeCadenas);
bMenu.appendChild(buttonDeMotivacionAnime);

clickZone.onclick  = (e) =>{
    Game.pFuerza+= Game.clickPower;
    setScore();
    let img = mainImg.src.split("/");
    img[img.length-1] == "presbanca1.png" ? mainImg.src = "img/presbanca2.png" :  mainImg.src = "img/presbanca1.png";
    popUpOnClick(e);  
}

setInterval(() => {//bucle que se llama cada 0.5 seg para actualizar los datos
    Game.pFuerza += Game.protesPower*Game.numProtes + Game.animePower*Game.numAnime;
    setScore();
},100);

setInterval(()=>{//animacion de presbanca
    if(Game.numProtes > 0){
        let img = mainImg.src.split("/");
        img[img.length-1] == "presbanca1.png" ? mainImg.src = "img/presbanca2.png" :  mainImg.src = "img/presbanca1.png";  
    }
},2000)

//recordatorio si algunos datos no te cargan bien prueba a hacer reset o localStorage.clear()
console.log("recordatorio si algunos datos no te cargan bien prueba a hacer reset o localStorage.clear()");