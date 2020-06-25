var word = "PINEAPPLLE";
var guessCount = 0;
var totalWordsguessed = 0; 
var imglist = ["https://www.proprofs.com/games/word-games/hangman/image/First.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Second.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Third.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Fourth.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Fifth.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Hangman.gif",]
var imgBox = document.getElementById("source")
var charbox = document.getElementById("charbox")
var life = document.getElementById("life")
var guessbox = document.getElementById("guessbox")
var displaytotalwords = document.getElementById("totalWordsguessed")
function render(){
    guessCount = 0;
    life.innerText = `Lives Left: ${6-guessCount}`;
    displaytotalwords.innerText = `Total words guessed: ${totalWordsguessed}`;
    imgBox.src= "https://www.publicdomainpictures.net/pictures/30000/nahled/plain-white-background.jpg"
    charbox.innerHTML = "";
    guessbox.innerHTML = "";
for (let i=65;i<65+26;i++){
    var div = document.createElement("div");
    div.setAttribute("class","char")
    div.innerText=String.fromCharCode(i);
    div.onclick =onclickhandle
    charbox.appendChild(div)
}

for (let i =0 ; i<word.length;i++){
    var div = document.createElement("div");
    div.setAttribute("class","guess")
    div.innerText="___"
    guessbox.appendChild(div)

}
}
render();
function onclickhandle(e){
    var a = e.target.innerText;
    e.target.onclick = null;
    var isGameWon = true;
    if(word.indexOf(a) == -1){
        e.target.setAttribute("class","guess wrong");
        guessCount++;}
    else
    for  (let i =0 ; i<word.length;i++){
    if(word[i] == a){
        guessbox.children[i].innerText =  a;
        e.target.setAttribute("class","guess right")
    }
    }
    for(let i=0;i<word.length;i++){
        if(guessbox.children[i].innerText == "___"){
            isGameWon = false;
        }
    }
    console.log(guessCount)
    if(isGameWon){
        console.log("gamewon")
        var letters = document.querySelectorAll(".char")
        letters.forEach(ele => {
            ele.className = "guess wrong";
            ele.onclick = null;
        })
        //console.log(letters)
        totalWordsguessed++;
        document.getElementById("modalmessage").innerText = "You WIN!!!"
    document.getElementById("id01").style.display='block'
    }
    if(guessCount == 6){
        console.log("gameover")
        var letters = document.querySelectorAll(".char")
        letters.forEach(ele => {
            ele.className = (word.indexOf(ele.innerText) == -1)? "guess wrong": "guess right"
            ele.onclick = null;
        })
        for(let i=0;i<word.length;i++){
        guessbox.children[i].innerText = word[i]       
    }
    document.getElementById("modalmessage").innerText = "You LOST"
    document.getElementById("id01").style.display='block'
}
    if(guessCount>0){
    imgBox.src=imglist[guessCount-1]
    life.innerText = `Lives Left: ${6-guessCount}`
}
    //console.log(imglist[guessCount-1])
}

function restartgame(){
    document.getElementById('id01').style.display='none';
    render();

}