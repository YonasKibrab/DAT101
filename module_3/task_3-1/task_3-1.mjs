"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Task 1, 2 and 3");
let wakeUpTime = 0; // Test med verdier som 6, 7 eller 8

if (wakeUpTime === 7) {
    printOut("Jeg våknet kl 7, så jeg rekker bussen til skolen.");
} else if (wakeUpTime === 8) {
    printOut("Jeg våknet kl 8, så jeg rekker toget til skolen.");
} else {
    printOut("Jeg våknet ikke kl 7 eller 8, så jeg må ta bilen til skolen.");
}
printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let number = -5; // Test med verdier som er nøytrale, positive eller negative

if (number > 0) {
    printOut("Positivt tall.");
} else if (number < 0) {
    printOut("Negativt tall.");
} else {
    printOut("Tallet er null.");
}
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const imageSize = Math.floor(Math.random() * 8) + 1; // Genererer et tall fra 1 til 8
printOut(`Bilde størrelse: ${imageSize} MP`); // Skriver ut den genererte bildestørrelsen

// Sjekker om bildestørrelsen er 4 MP eller større
if (imageSize >= 4) {
    printOut("Takk for bildet!"); 
} else {
    printOut("Bildet er for lite."); 
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
if (imageSize >= 6) {
    printOut("Bildet er for stort."); 
} else if (imageSize >= 4) {
    printOut("Takk for bildet!"); 
} else {
    printOut("Bildet er for lite."); 
}
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const monthList = ["January", "February", "Mars", "April", "Mai",
    "Jun", "Juli", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;

const monthName = monthList[Math.floor(Math.random() * noOfMonth)];

// Sjekker om månedens navn inneholder bokstaven "r"
if (monthName.includes("r")) {
printOut("Du må ta vitamin D.");
} else {
printOut("Du trenger ikke å ta vitamin D.");
}
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
// Tabell med antallet dager for hver måned
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 

// Finn indeksen til den tilfeldig valgte måneden
const monthIndex = monthList.indexOf(monthName);

// Hent antallet dager for den måneden
const numberOfDays = daysInMonth[monthIndex];

// Skriv ut måneden og dens antall dager
printOut(`Måneden ${monthName} har ${numberOfDays} dager.`);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
if (monthName === "Mars" || monthName === "April" || monthName === "Mai") {
    if (monthName === "April") {
        printOut("Galleriet er midlertidig åpnet i nabobygget.");
    } else {
        printOut("Galleriet er stengt.");
    }
} else {
    printOut("Galleriet er åpent.");
}
newLine();