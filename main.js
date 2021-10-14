
const Canvas = document.getElementById("clickZone");
const Score = document.getElementById("score")
const Game = {
    pFuerza: 0,
    clickPower: 1,
}

Canvas.onclick  = () =>{
    console.log("funciona");
    Game.pFuerza+= Game.clickPower;
    Score.innerText=Game.pFuerza;
}