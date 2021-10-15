
const bMenu = document.getElementById("buttonMenu");//donde estan dentro todos los botones que se crean
const Canvas = document.getElementById("clickZone");//la zona donde se clickea
const Score = document.getElementById("score");//el contenedor de la puntuacion
const COSTMULTI=0.5;

let Game ={//donde se guardan los datos del juego
    pFuerza: 0,
    clickPower: 1,
    cost1kg : 20,
    costProtes : 50,
    numProtes : 0,
    protesPower : 0.05,
} 
if( localStorage.length != 0){//te carga los datos guardados
    Game = JSON.parse(localStorage.getItem("Game"));
}
/*
* Esta funcion toma un strings, un coste inicial y una funcion como parametros
* la funcion es la que se ejecutaria en el onclick y decuelce el elemento
* button construido. 
*/
function createButton(upgradeName, cost, onclickFunction){
    let b = document.createElement("button");
    let sp = document.createElement("span");
    sp.innerText = cost;
    b.innerText = upgradeName;
    b.appendChild(sp);
    b.onclick = onclickFunction;
    b.className = "upgradeButtons";
    return b
}

function setScore(){//funcion que te actualiza los pFuerza
    Score.innerText= "Puntos de Fuerza: " + Game.pFuerza.toFixed(1);
}

Canvas.onclick  = () =>{
    Game.pFuerza+= Game.clickPower;
    setScore();
}

function insuficientePuntos(button, pagoEfectuado){//cambia el color del coste
    pagoEfectuado ? button.childNodes[3].style.color = "green" : button.childNodes[3].style.color = "red";
    //anyadir animacion al pulsar alomejor
    setTimeout(() => {
        button.childNodes[3].style.color = "black";
    }, 1000);
}
/*
esto seria un ejemplo de un boton basico que sube la fuerza 
asigana el valor del coste en el objeto Game
La variable CONSTMULTI sirve para incrementar el precio de la mejora
(Tener en cuenta que se ha cambiado para que ne le nombre haya que poner 
\ncost: para que se muestre el coste ya que asi tiene mas flexibilidad 
a la hora de que boton crear)
*/
buttonDeUnKg = createButton("+1kg \ncost: ", Game.cost1kg, function(){
    let comp = Game.pFuerza>=Game.cost1kg;
    if(comp){//si tienes su coste te deja comprarlo
        Game.clickPower +=0.2;
        Game.pFuerza -=Game.cost1kg;
        Game.cost1kg += Game.cost1kg*COSTMULTI;
    }
    insuficientePuntos(buttonDeUnKg,comp);
});
bMenu.appendChild(buttonDeUnKg);

buttonDeProtes = createButton("Batido de proteínas \ncost: ", Game.costProtes, function(){
    let comp = Game.pFuerza>=Game.costProtes;
    if(comp){//si tienes su coste te deja comprarlo
        Game.numProtes++;
        Game.pFuerza -=Game.costProtes;
        Game.costProtes += Game.costProtes*COSTMULTI;
    }
    insuficientePuntos(buttonDeProtes,comp);
});
bMenu.appendChild(buttonDeProtes);

buttonGuardar = createButton("Guardar", "", function(){
    localStorage.setItem("Game", JSON.stringify(Game));
});
bMenu.appendChild(buttonGuardar);

setInterval(() => {//bucle que se llama cada 0.5 seg para actualizar los datos del navegador
    buttonDeUnKg.childNodes[3].innerText = (Game.cost1kg).toFixed(0);
    buttonDeProtes.childNodes[3].innerText = (Game.costProtes).toFixed(0);
    Game.pFuerza += Game.protesPower*Game.numProtes;
    setScore();
},100);

