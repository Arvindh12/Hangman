var word ;
var guessCount = 0;
var totalWordsguessed ;
var totalWordsmissed ;
var besttime = {
    min : 0,
    sec : 0
}
var mintime = 0;
var sectime = 0;
var timer;
var istimerset = false;

/*Setting up local storage to store the game stats*/
if(JSON.parse(window.localStorage.getItem("hangmangamedata")) == null){
    let data = {
        "totalWordsguessed" : 0,
        "totalWordsmissed" : 0,
        "besttime" : {
            "min" : 0,
            "sec" : 0,
        }
    }
    window.localStorage.setItem("hangmangamedata",JSON.stringify(data))
    totalWordsguessed = 0;
    totalWordsmissed = 0;
    besttime.min = 0;
    besttime.sec = 0;
    console.log("setting")
}
else{
    let data = JSON.parse(window.localStorage.getItem("hangmangamedata"))
    totalWordsguessed = data.totalWordsguessed;
    totalWordsmissed = data.totalWordsmissed;
    besttime.min = data.besttime.min;
    besttime.sec = data.besttime.sec;
    console.log("getting" ,totalWordsguessed,besttime.min,besttime.sec,data.besttime.min,data.besttime.sec)
}

var imglist = ["https://www.proprofs.com/games/word-games/hangman/image/First.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Second.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Third.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Fourth.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Fifth.png",
              "https://www.proprofs.com/games/word-games/hangman/image/Hangman.gif",]

/*Initialize variables*/
var imgBox = document.getElementById("source")
var charbox = document.getElementById("charbox")
var life = document.getElementById("life")
var guessbox = document.getElementById("guessbox")
var displaymissed = document.getElementById("totalWordsmissed")
var displaytotalwords = document.getElementById("totalWordsguessed")
var currenttime = document.getElementById("currenttime")
var besttimebox =  document.getElementById("besttime")
var lasersound = document.getElementById("myAudio")
var failsound = document.getElementById("myAudio1")
var winsound = document.getElementById("myAudio2")

/*Get a random word from api*/
function getwordsfromapi(){
fetch("https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=6&maxLength=10&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
.then(data => data.json())
.then(data => {
    word= data[0].word;
    word = word.toUpperCase();
    render();})
.catch(err => {word = "PINEAPPLE";render()})  //If error fallback to word pineapple

}
getwordsfromapi();

/*Function to render the letters in char box and answer box*/
function render(){
    guessCount = 0;
    //life.innerText = `Lives Left: ${6-guessCount}`;
    life.innerText = "❤️".repeat(6-guessCount);
    displaytotalwords.innerText = `Total words guessed: ${totalWordsguessed}`;
    displaymissed.innerText = `Total words missed: ${totalWordsmissed}`;
    currenttime.innerText = `Current Time: ${mintime} : ${sectime}`;
    console.log(besttime.min,besttime.sec)
    besttimebox.innerText = `Best Time: ${besttime.min} : ${besttime.sec}`
    imgBox.src= "zero.png"
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

/*Function to handle the onclick event ie making guess*/
function onclickhandle(e){
    lasersound.play();
    //Set time is not set previously
    if(!istimerset){
      timer = setInterval(myTimer, 1000)
      istimerset = true;
    }
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
    //Logic to find if the player won
    if(isGameWon){
        winsound.play();
        console.log("gamewon")
        var letters = document.querySelectorAll(".char")
        letters.forEach(ele => {
            ele.className = "guess wrong";
            ele.onclick = null;
        })
        //console.log(letters)
        totalWordsguessed++;

        myTimerclear("win");
        istimerset = false;
        let data = {
            "totalWordsguessed" : totalWordsguessed,
            "totalWordsmissed" : totalWordsmissed,
            "besttime" : {
                "min" : besttime.min,
                "sec" : besttime.sec
            }
        }
        console.log(totalWordsguessed)
        window.localStorage.setItem("hangmangamedata",JSON.stringify(data))
        
        document.getElementById("modalmessage").innerText = "You WIN!!!"
    document.getElementById("id01").style.display='block'
    }
    //Logic to find if player lost the game
    if(guessCount == 6){
        failsound.play();
        
        console.log("gameover")
        var letters = document.querySelectorAll(".char")
        letters.forEach(ele => {
            ele.className = (word.indexOf(ele.innerText) == -1)? "guess wrong": "guess right"
            ele.onclick = null;
        })
        for(let i=0;i<word.length;i++){
        guessbox.children[i].innerText = word[i]       
    }
    totalWordsmissed++;
    let data = {
        "totalWordsguessed" : totalWordsguessed,
        "totalWordsmissed" : totalWordsmissed,
        "besttime" : {
            "min" : besttime.min,
            "sec" : besttime.sec
        }
    }
    //Update the local storage
    console.log(totalWordsmissed)
    window.localStorage.setItem("hangmangamedata",JSON.stringify(data))
    myTimerclear("lose");
    istimerset = false;
    document.getElementById("modalmessage").innerText = "You LOST"
    document.getElementById("id01").style.display='block'
}
    if(guessCount>0){
    imgBox.src=imglist[guessCount-1]
    life.innerText = `Lives Left: ${6-guessCount}`
    life.innerText = "❤️".repeat(6-guessCount);
}
    //console.log(imglist[guessCount-1])
}
//Restart button
function restartgamemodal(){
    document.getElementById('id01').style.display='none';
    getwordsfromapi();

}
//Function handler of setinterval
function myTimer(){
    if(sectime>=59){
        mintime++;
        sectime = 0;
    }
    else{
        sectime++
    }
    currenttime.innerText = `Current Time: ${mintime} : ${sectime}`
}
//Function to clear the timer and check if its the best time
function myTimerclear(stat){
    clearInterval(timer)
    if(stat == "win"){
    if(besttime.min*60 + besttime.sec > mintime*60 + sectime || (besttime.min == 0 && besttime.sec == 0)){
        besttime.min = mintime;
        besttime.sec = sectime;
    }
}
    mintime = 0;
    sectime = 0; 
}
//Function to reset stats in local storage
function resetstats(){
    window.localStorage.removeItem("hangmangamedata");
    let data = {
        "totalWordsguessed" : 0,
        "totalWordsmissed" : 0,
        "besttime" : {
            "min" : 0,
            "sec" : 0,
        }
    }
    window.localStorage.setItem("hangmangamedata",JSON.stringify(data))
    totalWordsguessed = 0;
    besttime.min = 0;
    besttime.sec = 0;
    totalWordsmissed = 0
    displaytotalwords.innerText = `Total words guessed: ${totalWordsguessed}`;
    displaymissed.innerText = `Total words missed: ${totalWordsmissed}`;
    besttimebox.innerText = `Best Time: ${besttime.min} : ${besttime.sec}`
}
//Function to restart the game with the same word
function restartgame(){
    myTimerclear("lose");
    istimerset = false;
    render();
}
