var word = "PINEAPPLLE";
var guessCount = 0;
var imglist = ["https://www.proprofs.com/games/word-games/hangman/image/First.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Second.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Third.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Fourth.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Fifth.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Hangman.gif",]
var imgBox = document.getElementById("source")
var charbox = document.getElementById("charbox")
var life = document.getElementById("life")
for (let i=65;i<65+26;i++){
    var div = document.createElement("div");
    div.setAttribute("class","char")
    div.innerText=String.fromCharCode(i);
    div.onclick =onclickhandle
    charbox.appendChild(div)
}
var guessbox = document.getElementById("guessbox")
for (let i =0 ; i<word.length;i++){
    var div = document.createElement("div");
    div.setAttribute("class","guess")
    div.innerText="___"
    guessbox.appendChild(div)

}
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
    }
    if(guessCount == 6){
        console.log("gameover")
    }
    if(guessCount>0){
    imgBox.src=imglist[guessCount-1]
    life.innerText = `Lives Left: ${quessCount-5}`
}
    //console.log(imglist[guessCount-1])
}