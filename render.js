function createAudioFiles(id,scr){
   let audio = document.createElement("audio");
   audio.setAttribute("id" ,id)
   audio.innerHTML = `<source src="${scr}" type="audio/mp3">`
   return audio
}
function createDivTags(id,text){
    var div = document.createElement("div")
    div.setAttribute("id",id)
    div.innerText=text
    return div
}
var root = document.getElementById("root")
root.appendChild(createAudioFiles("myAudio","laser.mp3"))
root.appendChild(createAudioFiles("myAudio1","fail-trombone-02.mp3"))
root.appendChild(createAudioFiles("myAudio2","TaDa.mp3"))

/* Header */
var div = document.createElement("div")
div.setAttribute("id","header")
var h1 = document.createElement("h1")
h1.innerText="Hang Man Game";
div.appendChild(h1)
root.appendChild(div)

/* Content */
var div1 = document.createElement("div")
div1.setAttribute("id","content")
var div2 = document.createElement("div")
div2.setAttribute("id","c1")
div2.appendChild(createDivTags("besttime","Best Time: 0"))
div2.appendChild(createDivTags("currenttime","Current Time: "))
var div = document.createElement("div")
var button = document.createElement("button")
button.setAttribute("onclick","restartgame()")
button.innerText="Restart game!!!";
div.appendChild(button)
div2.appendChild(div)
var div = document.createElement("div")
var button = document.createElement("button")
button.setAttribute("onclick","resetstats()")
button.innerText=" Reset Stats ";
div.appendChild(button)
div2.appendChild(div)
div2.appendChild(createDivTags("totalWordsguessed","Total words guessed:"))
div2.appendChild(createDivTags("totalWordsmissed","Total words missed:"))
div1.appendChild(div2)
var div2 = document.createElement("div")
div2.setAttribute("id","c2")
var div3 = document.createElement("div")
div3.setAttribute("id","hangman")
var spanElement = document.createElement("span")
spanElement.setAttribute("id","life")
spanElement.innerText = "❤️❤️❤️❤️❤️❤️";
div3.appendChild(spanElement)
var img = document.createElement("img")
img.setAttribute("id","source")
img.setAttribute("src","")
div3.appendChild(img)
div2.appendChild(div3)
div2.appendChild(createDivTags("charbox",""))
div1.appendChild(div2)
var div2 = document.createElement("div")
div2.setAttribute("id","c3")
div2.appendChild(createDivTags("guessbox",""))
div1.appendChild(div2)
root.appendChild(div1)

/*Modal*/
var div1 = document.createElement("div");
div1.setAttribute("id","id01")
div1.setAttribute("class","modal")
var div2 = document.createElement("div");
div2.setAttribute("class","modal-content")
var div3 = document.createElement("div");
div3.setAttribute("class","container")
var h1 = document.createElement("h1")
h1.setAttribute("id","modalmessage")
div3.appendChild(h1)
var p = document.createElement("p")
p.innerText = "Do you want to play again?"
div3.appendChild(p)
var div4 = document.createElement("div");
div4.setAttribute("class","clearfix")
var button = document.createElement("button")
button.setAttribute("class","deletebtn")
button.setAttribute("onclick","restartgamemodal()")
button.setAttribute("type","button")
button.innerText = "PLAY AGAIN"
div4.appendChild(button)
div3.appendChild(div4)
div2.appendChild(div3)
div1.appendChild(div2)
root.appendChild(div1)