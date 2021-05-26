function getHistory() {
    return document.getElementById("history-value").innerText;
}
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}
function getOutput() {
    return document.getElementById("output-value").innerText;
}
function printOutput(num) {
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    }
    else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}
function findDotAtLastIndex(a){
    String(a)
    return a.substr(a.length-1) == "." && Number(a) != NaN;
}
function test(a){
    var b = a.length
    
    return b;
}
function getFormattedNumber(num) {
    if (num=="-") {
        return "";
    }
    else if (num == "."){
        return "0.";
    }
    if (String(num).length > 12){
        return "Syntax Error"
    }
    if(isNaN(Number(num))){
        num = num.substr(0,num.length-1);
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    var numString = String(num);
    if (numString.endsWith(".")){
        return value + "."
    }
    else if(numString.includes(".")){
        var ind = numString.indexOf(".")
        if (numString.substr(ind+1) == Number(0)){
            return value + numString.substr(ind,4);
        }
        else if(numString.endsWith("0")){
            count = 0
            for (i = ind+1; i < ind + 4 && i < numString.length ; i++){
                if(numString.charAt(i) == "0"){
                    count++ ;
                }
                else{
                    count = 0;
                }
            }
            let str = ""
            for (i = 0 ; i < count ; i++){
                str += "0"
            }
            return value + str ;
        }
    }
    return value;
}
function reverseNumberFormat(num) {
    return num.replace(/,/g,'');
}

var operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
     operator[i].addEventListener('click',function(){
         if (this.id == "clear"){
             printHistory("");
             printOutput("");
         }
         else if(this.id=="backspace"){
             var output = reverseNumberFormat(getOutput()).toString();
             if (output == "Syntax Error"){
                 output = ""
                 printOutput(output);
             }
             else if(output){
                 output = output.substr(0,output.length-1);
                 printOutput(output);
             }
         }
         else {
             var output = getOutput();
             var history = getHistory();
             if (output=="" && history !="") {
                 if (isNaN(history[history.length-1])) {
                     history = history.substr(0,history.length-1);
                 }
             }
             if (output!="" || history != "") {
                 output = output==""?output: reverseNumberFormat(output);
                 history = history+output;
                 if (this.id == "=") {
                     var result = eval(history);
                     printOutput(result);
                     printHistory("");
                 }
                 else{
                     history = history+this.id;
                     printHistory(history);
                     printOutput("");
                 }
             }
         }         

     });
}
var number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
     number[i].addEventListener('click',function(){
         var output = reverseNumberFormat(getOutput());
         if(output!=NaN){
             output += this.id;
             printOutput(output); 
         }
     });
}
