var marqueewidth=300  //marquee's width 
var marqueeheight=200  //marquee's height
var speed=1 //scroll speed
if(document.marquee.speed.value != '') speed = document.marquee.speed.value;
var marqueecontents = document.marquee.content.value;
if (marqueecontents==""){marqueecontents = ""}
//var marqueecontents='<P ALIGN="//eft">'

if (true)
document.write('<marquee id="marq1" direction="up" scrollDelay="105" scrollAmount='+speed+' style="width:'+marqueewidth+';height:'+marqueeheight+'">'+marqueecontents+'</marquee>')

function regenerate()
{
	window.location.reload()
}

function setScroller( speed ) {
  document.getElementById("marq1").scrollAmount = speed; 
}  

function regenerate2()
{
	if (document.layers)
	{
		setTimeout("window.onresize=regenerate",450)
		intializemarquee()
	}
}

function intializemarquee()
{
	document.cmarquee01.document.cmarquee02.document.write(marqueecontents)
	document.cmarquee01.document.cmarquee02.document.close()
	thelength=document.cmarquee01.document.cmarquee02.document.height
	scrollit()
}

function scrollit()
{
	if (document.cmarquee01.document.cmarquee02.top>=thelength*(-1)){
		document.cmarquee01.document.cmarquee02.top-=speed
	setTimeout("scrollit()",100)
}
	else
	{
	document.cmarquee01.document.cmarquee02.top=marqueeheight
	scrollit()
	}
}
window.onload=regenerate2