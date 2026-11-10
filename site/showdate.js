<!-- Hide from old browsers
today = new Date() 
function CreateArray(n) {this.length = n
return this } 

day = new CreateArray(7)
day[0]="星期日"
day[1]="星期一"
day[2]="星期二"
day[3]="星期三"
day[4]="星期四"
day[5]="星期五"
day[6]="星期六" 
 
month = new CreateArray(12)
month[0]="-1-"
month[1]="-2-"
month[2]="-3-"
month[3]="-4-"
month[4]="-5-"
month[5]="-6-"
month[6]="-7-"
month[7]="-8-"
month[8]="-9-"
month[9]="-10-"
month[10]="-11-"
month[11]="-12-"


modifier = new CreateArray(31)
var modifier = new String("")
var loop = 0
do {
    modifier[loop] = modifier.substring(loop * 2, 2 + (loop * 2));
    loop = loop + 1;
} while (loop < 32);
myDate = new String(today.getDate())
mySuffix = modifier[today.getDate()]
myYear = new String(today.getFullYear())
// -->
document.write("最后更新日期：",today.getDate(),mySuffix,month[today.getMonth()],myYear," ")                   
           