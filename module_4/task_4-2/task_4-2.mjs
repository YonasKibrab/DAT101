"use strict"; 
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const arrayPart1 = Array.from({ length: 20 }, function(_, i) {
    return i + 1;
});
arrayPart1.forEach(function(num) {
    printOut(num.toString());
}); 
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
printOut(arrayPart1.join(" - "));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const textPart3 = "Hei på deg, hvordan har du det?";
const wordsArray = textPart3.split(" ");
wordsArray.forEach(function(word, index) {
    printOut("Word " + index + ": " + word);
});
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const namesArray = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", 
    "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

function removeElement(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
        printOut(element + " removed.");
    } else {
        printOut(element + " not found.");
    }
}
removeElement(namesArray, "Ingrid");
printOut(namesArray.join(", "));
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const boysNames = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah", "Elias", "Isak",
    "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor", "Magnus"];
const allNames = namesArray.concat(boysNames);
printOut(allNames.join(", "));
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
// Create a TBook class and print its instances
function TBook(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
TBook.prototype.toString = function() {
    return this.title + " by " + this.author + ", ISBN: " + this.isbn;
};
const books = [
    new TBook("Book One", "Author A", "123-456"),
    new TBook("Book Two", "Author B", "234-567"),
    new TBook("Book Three", "Author C", "345-678")
];
books.forEach(function(book) {
    printOut(book.toString());
});
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const EWeekDays = {
    WeekDay1: { value: 0x01, name: "Mandag" },
    WeekDay2: { value: 0x02, name: "Tirsdag" },
    WeekDay3: { value: 0x04, name: "Onsdag" },
    WeekDay4: { value: 0x08, name: "Torsdag" },
    WeekDay5: { value: 0x10, name: "Fredag" },
    WeekDay6: { value: 0x20, name: "Lørdag" },
    WeekDay7: { value: 0x40, name: "Søndag" },
    Workdays: { value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10, name: "Arbeidsdager" },
    Weekends: { value: 0x20 + 0x40, name: "Helg" }
};
Object.keys(EWeekDays).forEach(function(key) {
    printOut(key + ": " + JSON.stringify(EWeekDays[key]));
});
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const randomNumbers = Array.from({ length: 35 }, function() {
    return Math.floor(Math.random() * 20) + 1;
});
randomNumbers.sort(function(a, b) {
    return a - b;
});
printOut("Ascending: " + randomNumbers.join(", "));
randomNumbers.sort(function(a, b) {
    return b - a;
});
printOut("Descending: " + randomNumbers.join(", "));
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const frequency = {};
randomNumbers.forEach(function(num) {
    frequency[num] = (frequency[num] || 0) + 1;
});
Object.entries(frequency)
    .sort(function([numA, freqA], [numB, freqB]) {
        return freqB - freqA || numA - numB;
    })
    .forEach(function([num, freq]) {
        printOut(num + " appears " + freq + " times");
    });
printOut(newLine);

printOut("--- Part 10 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const rows = 5, cols = 9;
const array2D = Array.from({ length: rows }, function(_, r) {
    return Array.from({ length: cols }, function(_, c) {
        return "Cell [" + r + "][" + c + "]";
    });
});
array2D.forEach(function(row) {
    row.forEach(function(cell) {
        printOut(cell);
    });
});
printOut(newLine);
 

