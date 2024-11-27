"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

//--- Part 1 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
function cmbTask1CalculateClick() {
  var txtRectWidth = document.getElementById("txtRectWidth");
  var txtRectHeight = document.getElementById("txtRectHeight");
  var txtTask1Output = document.getElementById("txtTask1Output");
  
  var width = parseFloat(txtRectWidth.value);
  var height = parseFloat(txtRectHeight.value);

  if (isNaN(width) || isNaN(height)) {
      txtTask1Output.innerHTML = "Please enter valid numbers.";
  } else {
      var perimeter = 2 * (width + height);
      var area = width * height;
      txtTask1Output.innerHTML = "Perimeter: " + perimeter + ", Area: " + area;
  }
}

//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
var task2Words = [];
function txtTask2WordKeyPress(event) {
    var txtTask2Word = document.getElementById("txtTask2Word");
    var txtTask2Output = document.getElementById("txtTask2Output");

    if (event.key === "Enter") {
        var word = txtTask2Word.value.trim();
        if (word) {
            task2Words.push(word);
            txtTask2Output.innerHTML = "Word count: " + task2Words.length + "<br>Words: " + task2Words.join(", ");
            txtTask2Word.value = "";
        }
    }
}

//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
function cmbTask3Click() {
  var checkboxes = document.querySelectorAll("input[type='checkbox']");
  var txtTask3Output = document.getElementById("txtTask3Output");

  var selected = [];
  for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
          selected.push(checkboxes[i].value);
      }
  }

  txtTask3Output.innerHTML = "Selected: " + selected.join(", ");
}

//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
function cmbTask4Click() {
  var divTask4Cars = document.getElementById("divTask4Cars");
  var txtTask4Output = document.getElementById("txtTask4Output");

  divTask4Cars.innerHTML = ""; // Clear existing buttons

  for (var i = 0; i < CarTypes.length; i++) {
      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "carType";
      radio.value = CarTypes[i].caption;
      radio.onclick = function() {
          txtTask4Output.innerHTML = "Selected Car: " + this.value;
      };
      divTask4Cars.appendChild(radio);
      divTask4Cars.appendChild(document.createTextNode(CarTypes[i].caption));
      divTask4Cars.appendChild(document.createElement("br"));
  }
}

//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
function selectTask5AnimalsChange() {
  var selectTask5Animals = document.getElementById("selectTask5Animals");
  var txtTask5Output = document.getElementById("txtTask5Output");

  txtTask5Output.innerHTML = "Selected Animal: " + selectTask5Animals.value;
}

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
function cmbTask6Populate() {
  var selectTask6Girls = document.getElementById("selectTask6Girls");
  var txtTask6Output = document.getElementById("txtTask6Output");

  selectTask6Girls.innerHTML = ""; // Clear existing options

  for (var i = 0; i < GirlsNames.length; i++) {
      var option = document.createElement("option");
      option.value = GirlsNames[i];
      option.text = GirlsNames[i];
      selectTask6Girls.appendChild(option);
  }

  selectTask6Girls.onchange = function() {
      txtTask6Output.innerHTML = "Selected Name: " + this.value;
  };
}

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
function cmbAddMovieClick() {
  var txtMovieTitle = document.getElementById("txtMovieTitle");
  var selectMovieGenre = document.getElementById("selectMovieGenre");
  var txtMovieDirector = document.getElementById("txtMovieDirector");
  var txtMovieRating = document.getElementById("txtMovieRating");
  var tblMovies = document.getElementById("tblMovies");

  var title = txtMovieTitle.value;
  var genre = selectMovieGenre.value;
  var director = txtMovieDirector.value;
  var rating = txtMovieRating.value;

  var row = tblMovies.insertRow();
  row.insertCell(0).innerHTML = title;
  row.insertCell(1).innerHTML = genre;
  row.insertCell(2).innerHTML = director;
  row.insertCell(3).innerHTML = rating;
}