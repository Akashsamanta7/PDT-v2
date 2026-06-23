let gxlPoints =
Number(localStorage.getItem("gxlPoints")) || 0;

let blPoints =
Number(localStorage.getItem("blPoints")) || 0;

updateLeaderboard();

function winnerBase(type){

if(type==="1v1") return 20;
if(type==="2v2") return 30;
return 40;

}

function loserBase(type){

if(type==="1v1") return 10;
if(type==="2v2") return 15;
return 20;

}

function bonus(margin){

if(margin<=1) return 0;
if(margin===2) return 1;
if(margin===3) return 2;
if(margin===4) return 3;

return 4;

}

function generateResult(){

const matchNo =
document.getElementById("matchNo").value;

const type =
document.getElementById("matchType").value;

const winner =
document.getElementById("winner").value;

const loserRounds =
Number(document.getElementById("loserRounds").value);

if(!matchNo || !type || !winner){
    alert("Please fill all fields.");
    return;
}

if(loserRounds<0 || loserRounds>5){
    alert("Loser rounds must be between 0 and 5.");
    return;
}

const margin = 6 - loserRounds;

const winnerPoints =
winnerBase(type) + bonus(margin);

const loserPoints =
loserBase(type) - bonus(margin);

if(winner==="GXL"){
    gxlPoints += winnerPoints;
    blPoints += loserPoints;
}
else{
    blPoints += winnerPoints;
    gxlPoints += loserPoints;
}

localStorage.setItem("gxlPoints",gxlPoints);
localStorage.setItem("blPoints",blPoints);

updateLeaderboard();

document.getElementById("cardMatchNo").textContent = matchNo;
document.getElementById("cardWinner").textContent = winner;
document.getElementById("cardMode").textContent = type;
document.getElementById("cardScore").textContent = "6 - " + loserRounds;
document.getElementById("cardMargin").textContent = margin + " Rounds";
document.getElementById("cardGXL").textContent = gxlPoints;
document.getElementById("cardBL").textContent = blPoints;
document.getElementById("cardDate").textContent =
new Date().toLocaleString();

document.getElementById("popup").style.display="flex";

}

function updateLeaderboard(){

document.getElementById("gxlPoints").textContent =
gxlPoints + " Points";

document.getElementById("blPoints").textContent =
blPoints + " Points";

}

function closePopup(){
document.getElementById("popup").style.display="none";
}

function resetLeaderboard(){

if(confirm("Reset Leaderboard?")){

    gxlPoints = 0;
    blPoints = 0;

    localStorage.clear();

    updateLeaderboard();
}

}

function downloadCard(){

html2canvas(document.getElementById("scorecard"))
.then(canvas=>{

    const link = document.createElement("a");

    link.download = "PDT-Scorecard.png";

    link.href = canvas.toDataURL();

    link.click();
});

}

