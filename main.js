
const bMenu = document.getElementById("buttonMenu");
const Canvas = document.getElementById("clickZone");
const Score = document.getElementById("score");
const COSTMULTI=0.5;
const Game = {
    pFuerza: 0,
    clickPower: 1,
    cost1kg : 20,
    costProtes : 50,
    numProtes : 0,
    protesPower : 0.25,
}
/*
* Esta funcion toma un strings, un coste inicial y una funcion como parametros
* la funcion es la que se ejecutaria en el onclick y decuelce el elemento
* button construido. P
*/
function createButton(upgradeName, cost, onclickFunction){
    let b = document.createElement("button");
    let sp = document.createElement("span");
    sp.innerText = cost;
    b.innerText = `${upgradeName} \ncost: `;
    b.appendChild(sp);
    b.onclick = onclickFunction;
    b.className = "upgradeButtons";
    return b
}

function setScore(){
    Score.innerText= "Puntos de Fuerza: " + Game.pFuerza.toFixed(0);
}

Canvas.onclick  = () =>{
    Game.pFuerza+= Game.clickPower;
    setScore();
}

/*
esto seria un ejemplo de un boton basico que sube la fuerza 
asigana el valor del coste en el objeto Game
La variable CONSTMULTI sirve para incrementar el precio de la mejora
*/
buttonDeUnKg = createButton("+1kg", Game.cost1kg, function(){
    if(Game.pFuerza>=Game.cost1kg){//si tienes su coste te deja comprarlo
        Game.clickPower +=0.2;
        Game.pFuerza -=Game.cost1kg;
        Game.cost1kg += Game.cost1kg*COSTMULTI;
    }
});

buttonDeProtes = createButton("Batido de proteínas", Game.costProtes, function(){
    if(Game.pFuerza>=Game.costProtes){//si tienes su coste te deja comprarlo
        Game.numProtes++;
        Game.pFuerza -=Game.costProtes;
        Game.costProtes += Game.costProtes*COSTMULTI;
    }
});
bMenu.appendChild(buttonDeUnKg);
bMenu.appendChild(buttonDeProtes);

setInterval(() => {
    buttonDeUnKg.childNodes[3].innerText = (Game.cost1kg).toFixed(0);
    buttonDeProtes.childNodes[3].innerText = (Game.costProtes).toFixed(0);
    Game.pFuerza += Game.protesPower*Game.numProtes;
    setScore();
},500);

