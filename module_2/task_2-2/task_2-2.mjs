"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const x = 2 + 3 * (2 - 4) * 6;
printOut("2 + 3 * (2 - 4) * 6 = " + x.toString());
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const meter = 25.34
let mm = 25.4
mm = mm / 1000
const inches = meter / mm;
const exactInches = inches.toFixed(2);
printOut("inches = " + exactInches.toString());
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const secondsInMinute = 60;
const minutesInHour = 60;
const hoursInDay = 24;
const part2_Answer = 
(3 * hoursInDay * minutesInHour) +
(12 * minutesInHour) + 
14 +
(45 / secondsInMinute);

printOut("part2_Answer =" + part2_Answer.toString());
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const numberOfMinutes = 6322.52;
let part4_Calc = numberOfMinutes / (60 * 24);
const part4_days = Math.floor(part4_Calc); 
printOut("Days = " + part4_days);

part4_Calc = part4_Calc - part4_days
part4_Calc = part4_Calc * hoursInDay;
const part4_Hours = Math.floor(part4_Calc);
printOut("Hours = " + part4_Hours);

part4_Calc = part4_Calc - part4_Hours;
part4_Calc = part4_Calc * minutesInHour;
const part4_Minutes = Math.floor(part4_Calc);
printOut("Minutes = " + part4_Minutes);

part4_Calc = part4_Calc - part4_Minutes;
part4_Calc = part4_Calc * secondsInMinute;
const part4_Seconds = Math.floor(part4_Calc);
printOut("Seconds = " + part4_Seconds);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const NOK = 76 / 8.6;
const USD = 8.6 / 76;
let amountUSD = 54;
const amountNOK = Math.round(amountUSD * NOK);
printOut( amountUSD + " dollars is " + amountNOK + " kroner ");
amountUSD = Math.round(amountNOK * USD);
printOut( amountNOK + " kroner is " + amountUSD + " dollars ");

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("There is much between heaven and earth that we do not understand.");
let str = "There is much between heaven and earth that we do not understand.";
printOut(str.trim().length.toString());
printOut(str.charAt(19));
printOut(str.substring(35,44));
printOut(str.indexOf("earth").toString());

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Is 5 greater than 3?");

printOut("true");

printOut("Is 7 greater than or equal to 7?");

printOut("true");

printOut("Is 'a' greater than 'b'?");

let a = "a";
let b = "b";

if (a > b) {

    printOut("true");    

} else {

    printOut("false");

}

printOut("Is '1' less than 'a'?")


if (1<a) {

    printOut("true");

}   else{

    printOut("false");

}

printOut("Is '2500' less than 'abcd'?")




let abcd = "abcd";

if (2500 < abcd) {

    printOut("true");

}   else{

    printOut("false");

}

printOut("'arne' is not equal to 'thomas'.")




let arne = "arne";

let thomas = "thomas";

if (arne = thomas) {

    printOut("true");

}   else{

    printOut("false");

}


printOut("(2 equals 5) is this statement true?");

printOut("false");

printOut("'abcd' is greater than 'bcd'?");


let bcd = "bcd";

if (abcd > bcd) {

    printOut("true");

}   else{

    printOut("false");

}

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let _254 = "254";

let number_254 = parseInt(_254, 10);

printOut(number_254.toString());


let _57_23 = "57.23";

let number_57_23 = parseFloat(_57_23, 10);

printOut(number_57_23.toString());


let _25_kroner = "25 kroner";

let number_25_kroner = parseInt(_25_kroner,10);

printOut(number_25_kroner.toString());

printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

let r = getRandomInt(1, 360);

printOut(r.toString());

printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let totalDays = 131;
let weeks = Math.ceil(totalDays / 7);
let days = totalDays % 7

printOut(`${totalDays} days is equal to ${weeks} weeks and ${days} days.`);

printOut(newLine);