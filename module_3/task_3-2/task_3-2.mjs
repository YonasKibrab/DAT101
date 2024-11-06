"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let oppTall = "";
let nedTall = "";

for (let i = 1; i <= 10; i++) {
    oppTall += i + " ";
}

for (let i = 10; i >= 1; i--) {
    nedTall += i + " ";
}

printOut("Telle opp: " + oppTall);
printOut("Telle ned: " + nedTall);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let gjetning = 45; // Sett et tall for gjetting
let tilfeldigTall;
let teller = 0;

do {
    tilfeldigTall = Math.floor(Math.random() * 60) + 1; // Generer tilfeldig tall mellom 1 og 60
    teller++;
} while (tilfeldigTall !== gjetning);

printOut("Gjetning av tallet " + gjetning + " tok " + teller + " forsøk.");
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
gjetning = Math.floor(Math.random() * 1000000) + 1; // Nytt tall mellom 1 og 1 million
tilfeldigTall = 0;
teller = 0;
const startTid = Date.now(); // Start tid

do {
    tilfeldigTall = Math.floor(Math.random() * 1000000) + 1; // Generer tilfeldig tall
    teller++;
} while (tilfeldigTall !== gjetning);

const sluttTid = Date.now(); // Slutt tid
const tidBrukt = sluttTid - startTid; // Tid i millisekunder

printOut("Gjetning av tallet " + gjetning + " tok " + teller + " forsøk og " + tidBrukt + " millisekunder.");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let primtall = [];
let tall = 2;

while (tall < 200) {
    let erPrimtall = true;

    for (let divisor = 2; divisor <= Math.sqrt(tall); divisor++) {
        if (tall % divisor === 0) {
            erPrimtall = false;
            break;
        }
    }

    if (erPrimtall) {
        primtall.push(tall);
    }
    tall++; // Increment "tall" in the while loop
}

printOut("Primtall mellom 1 og 200: " + primtall.join(", "));

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
for (let rad = 1; rad <= 7; rad++) {
    let radUtskrift = "";
    for (let kolonne = 1; kolonne <= 9; kolonne++) {
        radUtskrift += "K" + kolonne + "R" + rad + " ";
    }
    printOut(radUtskrift.trim());
}
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
for (let i = 0; i < 5; i++) {
    const karakter = Math.floor(Math.random() * 236) + 1; // Genererer karakter
    let karakterBokstav;

    if (karakter >= 89) {
        karakterBokstav = 'A';
    } else if (karakter >= 77) {
        karakterBokstav = 'B';
    } else if (karakter >= 65) {
        karakterBokstav = 'C';
    } else if (karakter >= 53) {
        karakterBokstav = 'D';
    } else if (karakter >= 41) {
        karakterBokstav = 'E';
    } else {
        karakterBokstav = 'F';
    }

    printOut("Karakter: " + karakter + " - Resultat: " + karakterBokstav);
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Dice Rolling Extravaganza");

const d1 = Math.ceil(Math.random() * 6);
const d2 = Math.ceil(Math.random() * 6);
const d3 = Math.ceil(Math.random() * 6);
const d4 = Math.ceil(Math.random() * 6);
const d5 = Math.ceil(Math.random() * 6);
const d6 = Math.ceil(Math.random() * 6);

let diceThrow = "";
diceThrow += d1.toString() + ",";
diceThrow += d2.toString() + ",";
diceThrow += d3.toString() + ",";
diceThrow += d4.toString() + ",";
diceThrow += d5.toString() + ",";
diceThrow += d6.toString();

printOut("diceThrow: " + diceThrow);

const count1 = (diceThrow.match(/1/g) || "").length;
const count2 = (diceThrow.match(/2/g) || "").length;
const count3 = (diceThrow.match(/3/g) || "").length;
const count4 = (diceThrow.match(/4/g) || "").length;
const count5 = (diceThrow.match(/5/g) || "").length;
const count6 = (diceThrow.match(/6/g) || "").length;

let diceCount = "";
diceCount += count1.toString() + ",";
diceCount += count2.toString() + ",";
diceCount += count3.toString() + ",";
diceCount += count4.toString() + ",";
diceCount += count5.toString() + ",";
diceCount += count6.toString() + ",";
printOut("diceCount: " + diceCount);

const equals1 = (diceCount.match(/1/g) || "").length;
const equals6 = (diceCount.match(/6/g) || "").length;

printOut("equals1: " + equals1.toString());
printOut("equals6: " + equals6.toString());

if(equals1 === 6) {
    printOut("Full straight");
}else if (equals6 === 1){
    printOut("Yatzy!");
}

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);


printOut("--- Part 9 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);


printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);
