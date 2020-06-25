var word = "pineapple";
var charbox = document.getElementById("charbox")
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
    div.innerText="__"
    guessbox.appendChild(div)

}
function onclickhandle(e){
    console.log(e)
}