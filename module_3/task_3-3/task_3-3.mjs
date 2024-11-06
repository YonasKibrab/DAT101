"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function dagensDato() {
    const idag = new Date();
    printOut(idag.toLocaleDateString("no-NB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
}
dagensDato();
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function dagensDatoOgObjekt() {
    const idag = new Date();
    printOut(idag.toLocaleDateString("no-NB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    return idag;
}

function dagerTil2XKO() {
    const iDag = dagensDatoOgObjekt();
    const lanseringsdato = new Date('2025-05-14');
    const forskjell = lanseringsdato - iDag;
    const dagerTilLansering = Math.ceil(forskjell / (1000 * 60 * 60 * 24));

    printOut(`Det er ${dagerTilLansering} dager igjen til 2XKO-lanseringen!`);
}
dagerTil2XKO();
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function sirkelUtregning(radius) {
    const diameter = 2 * radius;
    const omkrets = 2 * Math.PI * radius;
    const areal = Math.PI * Math.pow(radius, 2);

    printOut(`Diameter: ${diameter}`);
    printOut(`Omkrets: ${omkrets.toFixed(2)}`);
    printOut(`Areal: ${areal.toFixed(2)}`);
}
sirkelUtregning(5);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function rektangelUtregning(dim) {
    const omkrets = 2 * (dim.bredde + dim.hoyde);
    const areal = dim.bredde * dim.hoyde;

    printOut(`Omkrets: ${omkrets}`);
    printOut(`Areal: ${areal}`);
}
rektangelUtregning({ bredde: 5, hoyde: 10 });
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const ETemperaturType = { Celsius: 1, Fahrenheit: 2, Kelvin: 3 };

function convertTemperature(aTemperature, aType) {
  let Fahrenheit = 0;
  let Celsius = 0;
  let Kelvin = 0;
  switch (aType) {
    case ETemperaturType.Celsius:
      printOut("Convert from Celsius");
      //convert to Fahrenheit
      //Fahrenheit = (Kevin - 237.15)*9/5 + 32;
      Celsius = aTemperature;
      Fahrenheit = (Celsius * 9) / 5 + 32;
      Kelvin = Celsius + 237.15;
      break;
    case ETemperaturType.Fahrenheit:
      printOut("Convert from Fahrenheit");
      break;
    case ETemperaturType.Kelvin:
      printOut("Convert from Kelvin");
      break;
  } // End switch

  printOut("Celsius = " + Celsius.toFixed(0));
  printOut("Fahrenheit = " + Fahrenheit.toFixed(0));
  printOut("Kelvin = " + Kelvin.toFixed(0));
} // End function

convertTemperature(37.5, ETemperaturType.Celsius);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function calculateNetPrice(aPrice, aTaxGroup) {
    let net = NaN;
    let taxGroup = aTaxGroup.toUpperCase();
    let vat = NaN;
  
    printOut("taxGroup = " + taxGroup);
  
    switch (taxGroup) {
      case "NORMAL":
        vat = 25;
    }
  
    if (!Number.isNaN(vat)) {
      net = (100 * aPrice) / (vat + 100);
    }
  
    return net;
  }
  
  const netPrice1 = calculateNetPrice(100, "normal");
  if (Number.isNaN(netPrice1)) {
    printOut("Unknown VAT group!");
  } else {
    printOut("netPrice1 = " + netPrice1.toFixed(2));
  }
  
  const netPrice2 = calculateNetPrice(100, "goblins");
  if (Number.isNaN(netPrice1)) {
    printOut("Unknown VAT group!");
  } else {
    printOut("netPrice2 = " + netPrice2.toFixed(2));
  }
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function calculate(distance = null, time = null, speed = null) {
    // Count how many parameters are missing
    const missingParams = [distance, time, speed].filter(param => param === null).length;

    // If more than one parameter is missing, return NaN
    if (missingParams > 1) {
        return NaN;
    }

    // Calculate speed, time, or distance based on the provided values
    if (distance === null) {
        // Calculate distance: distance = speed * time
        if (speed !== null && time !== null) {
            return speed * time;
        } else {
            return NaN;
        }
    } else if (time === null) {
        // Calculate time: time = distance / speed
        if (speed !== null && distance !== null) {
            return distance / speed;
        } else {
            return NaN;
        }
    } else if (speed === null) {
        // Calculate speed: speed = distance / time
        if (distance !== null && time !== null) {
            return distance / time;
        } else {
            return NaN;
        }
    }
}

// Example usage:
console.log(calculate(100, 2));        // Should calculate speed: 50
console.log(calculate(null, 2, 50));   // Should calculate distance: 100
console.log(calculate(100, null, 50)); // Should calculate time: 2
console.log(calculate(100));           // Should return NaN, not enough info

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function utvidTekst(text, maxLength, char, before) {
    while (text.length < maxLength) {
        text = before ? char + text : text + char;
    }
    return text;
}
printOut(utvidTekst("Hei", 10, "*", true)); // Eksempel med tegn foran
printOut(newLine);
printOut(utvidTekst("Hei", 10, "*", false)); // Eksempel med tegn bak
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function testIfMathIsFun() {
    let op = 1;
    let line = 1;
    let ok;
    do {
      let sumLeft = 0;
      for (let left = 0; left < line + 1; left++) {
        sumLeft += op;
        op++;
      }
  
      let sumRight = 0;
      for (let right = 0; right < line; right++) {
        sumRight += op;
        op++;
      }
  
      ok = (sumLeft === sumRight);
      
      if (!ok) {
        printOut("Error in line " + line.toString());
        break;
      }
      
      line++;
  
      if (line > 200) {
        printOut("Math is Fun!");
        break;
      }
  
    } while (ok);
  }
  
  testIfMathIsFun();
  
  printOut(" ");
  
  
  const countTo = 10;
  function count(aNumber) {
    if (aNumber <= countTo) {
      printOut(aNumber.toString());
      count(aNumber + 1);
      printOut(aNumber.toString());
    }
  }
  count(1);

printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function beregnFakultet(n) {
    if (n <= 1) return 1;
    return n * beregnFakultet(n - 1);
}
printOut(`Fakultet av 5 er: ${beregnFakultet(5)}`);
printOut(newLine);
