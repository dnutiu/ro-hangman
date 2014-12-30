'use strict';
//General
var MOBILE_WIDH = 930;
var WINDOW_W = $(window).width();
// Sound initialization
ion.sound({
  sounds: [{
      name: "button_tiny",
      volume: 0.8,
      preload: true
    }, {
      name: "ta_da",
      volume: 0.8,
      preload: true
    }, {
      name: "sad_trombone",
      volume: 0.8,
      preload: true
    }

  ],
  volume: 0.5,
  path: "./sound/sounds/",
  preload: true
});

// Get word
// words array located in words.js
var word;
var incercari;
var missArray;
var charArray1;
var charArray2;
var missArray;

function newGame(wordList) {

  word = wordList[Math.floor(Math.random() * wordList.length)];
  incercari = 6;
  charArray1 = [];
  charArray2 = [];
  missArray = [];

  // Create the arrays
  for (var i = 0; i < word.length; i++) {
    charArray1[i] = '*';
  }

  for (var i = 0; i < word.length; i++) {
    charArray2[i] = word.charAt(i);
  }

  // Update page info
  $('.word').html(charArray1);
  $("#human").attr('src', "./img/" + incercari + ".png");
  $('#incercari').html(incercari);
  $('.litera_msg2').html();
}

// DOM Elements & Events
$(document).ready(function() {
  $('.footer-content').append("<p><span>Spanzuratoarea</span> <em>created by</em>" + "<span>@<a href=\"http://www.twitter.com/niutenisu\">Niutenisu</a></span><p>");

  var listaCuvinte = localStorage.getItem("listaCuvinte");
  if (listaCuvinte != null) {
    $("select[name=lista_cuvinte]").val(listaCuvinte);
    newGame(eval(listaCuvinte));
  } else {
    newGame(animale_eu);
  }

  $("select[name=lista_cuvinte]").on("change", function() {
    localStorage.setItem("listaCuvinte", $(this).val());
  }).next().click(function() {
    // eval for transforming string into object ref!!!
    newGame(eval($(this).prev().val())); // POSSIBLE EXPLOIT!!
    // prev for mobile <3
  });

  $('#game').fadeIn("slow");

});

$(document).on("keypress", function(e) {
  var key = e.keyCode || e.which;
  var key2 = String.fromCharCode(key).toLowerCase();

  ion.sound.play("button_tiny");

  $('.litera_msg').fadeIn('slow');
  $('.litera').html(key2);

  //already guessed, check,
  if (check(key2)) {
    $('.litera_msg2').html("aceasta litera se afla in cuvant.");
    updateArray(key2);
    $('.word').html(charArray1);
  } else {
    $('.litera_msg2').html("aceasta litera nu se afla in cuvant.");

    incercari--;

    if (incercari > -1) {
      $("#human").attr('src', "./img/" + incercari + ".png");
      $('#incercari').html(incercari);
      updateLetters(key2);
      if (incercari == 0)
        gameOver();
    }
  }

  // check if arrays are equal
  if (arraysEqual(charArray1, charArray2)) {
    gameWon();
  }
})

function gameWon() {
  if (WINDOW_W <= MOBILE_WIDH) {
    ion.sound.play("ta_da");
    alert("Felicita e tenersi per mano")
    window.location.reload(); // mobile
    return;
  }
  //alert("You're winner!");

  if (WINDOW_W > MOBILE_WIDH)
    $('#gamewon').fadeIn('slow');
  $(document).off(); // Detach keypress handler
  ion.sound.play("ta_da"); // Play victory sound

  $('#gamewon img').click(function() {
    window.location.reload();
  });

  $(document).on("keypress", function(e) {
    var key = e.keyCode || e.which;
    if (key == 13)
      window.location.reload(); // Da reset la handlere :-)
  });
}

function gameOver() {
  if (WINDOW_W <= MOBILE_WIDH) {
    ion.sound.play("sad_trombone");
    alert("Ai pierdut! CUVANT: " + word);
    window.location.reload(); // for mobile phones
    return; // for slower mobile phones
  }

  $('#incercari_msg').html("Game Over!");
  $('#lose_word').html(word);

  if (WINDOW_W > MOBILE_WIDH)
    $('#gameover').fadeIn('slow');
  $(document).off(); // Detach keypress handler
  ion.sound.play("sad_trombone");

  $('#gameover img').click(function() {
    window.location.reload();
  });
  $(document).on("keypress", function(e) {
    var key = e.keyCode || e.which;
    if (key == 13)
      window.location.reload();
  });
}

function check(guess) {
  return word.indexOf(guess) > -1;
}

function updateLetters(guess) {

  var len = missArray.length;
  if (!($.inArray(guess, missArray) > -1)) {
    missArray[len] = guess;
  }
  $('.litere').html(missArray + " ");

}

function updateArray(guess) {
  guess = guess.toLowerCase();

  for (i = 0; i < charArray1.length; i++) {
    if (charArray2[i] == guess) {
      charArray1[i] = guess;
    }
  }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
