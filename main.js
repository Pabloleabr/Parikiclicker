
const bMenu = document.getElementById("buttonMenu");
const Canvas = document.getElementById("clickZone");
const Score = document.getElementById("score");
const COSTMULTI = 0.2;
const Game = {
    pFuerza: 0,
    clickPower: 1,
    cost1kg : 20,
}
/*
* Esta funcion toma un strings un number y una funcion como parametros
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
    Score.innerText= Math.floor(Game.pFuerza* 100) / 100;
}

Canvas.onclick  = () =>{
    Game.pFuerza+= Game.clickPower;
    setScore();
}

//esto seria un ejemplo de un boton basico que sube la fuerza 
//asigana el valor del coste en el objeto Game
buttonDeUnKg = createButton("+1kg", Game.cost1kg,function(){
    if(Game.pFuerza>=Game.cost1kg){//si tienes su coste te deja comprarlo
        Game.clickPower +=0.2;
        Game.pFuerza -=Game.cost1kg;
        Game.cost1kg += Game.cost1kg*COSTMULTI;
    }
});
bMenu.appendChild(buttonDeUnKg);

setInterval(() => {
    buttonDeUnKg.childNodes[3].innerText = Game.cost1kg;
    setScore();
},500);