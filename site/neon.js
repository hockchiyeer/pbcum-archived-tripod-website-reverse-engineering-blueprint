var message="²» Ãð µÄ ÐÅ Äî"
var neonbasecolor="#000000"
var neontextcolor="#FFFF00"
var flashspeed=2  //in milliseconds
var n=0
if (document.all){
document.write('')
for (m=0;m<message.length;m++)
document.write('<span id="neonlight">'+message.charAt(m)+'</span>')
document.write('')
var tempref=document.all.neonlight
}
else
document.write(message)
function neon(){
if (n==0){
for (m=0;m<message.length;m++)
tempref[m].style.color=neonbasecolor
}
tempref[n].style.color=neontextcolor
if (n<tempref.length-1)
n++
else{
n=0
clearInterval(flashing)
setTimeout("beginneon()",1500)
return
}
}

function beginneon(){
if (document.all)
flashing=setInterval("neon()",flashspeed)
}
beginneon()