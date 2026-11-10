<!-- Hide from old browsers
today = new Date() 
function CreateArray(n) {this.length = n
return this } 

day = new CreateArray(7)
day[0]="������"
day[1]="����һ"
day[2]="���ڶ�"
day[3]="������"
day[4]="������"
day[5]="������"
day[6]="������" 
 
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
document.write("���������ڣ�",today.getDate(),mySuffix,month[today.getMonth()],myYear," ")                   
           