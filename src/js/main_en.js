(function() {
    //General
    var h = new Hangman();
    var MOBILE_WIDH = 930;
    var WINDOW_W = $(window).width();
    var mobileSiteUrl = "../m"; // relative path
    //Redirect to MobileSite
    if (WINDOW_W <= MOBILE_WIDH) {
        window.location.replace(mobileSiteUrl);
    }

    $(document).ready(function() {
        var listaCuvinte = localStorage.getItem("listaCuvinte");
        if (listaCuvinte != null) {
            $("select[name=lista_cuvinte]").val(listaCuvinte);
            h.newGame(eval(listaCuvinte));
        } else {
            h.newGame(animale_eu);
        }
        // Update page info
        $('.word').html(h.getWordArray());
        $("#human").attr('src', "../img/" + h.getLife() + ".png");
        $('#incercari').html(h.getLife());
        $('.litera_msg2').html();
        $("select[name=lista_cuvinte]").on("change", function() {
            localStorage.setItem("listaCuvinte", $(this).val());
        }).next().click(function() {
            window.location.reload();
        });
        $('#game').fadeIn("slow");
    });
    $(document).on("keypress", function(e) {
        var k = e.keyCode || e.which;
        var key = String.fromCharCode(k).toLowerCase();
        ion.sound.play("button_tiny");
        $('.litera_msg').fadeIn('slow');
        $('.litera').html(key);
        if (h.check(key)) {
            $('.litera_msg2').html("this letter is in the word.");
            h.guessed(key);
            $('.word').html(h.getWordArray());
        } else {
            $('.litera_msg2').html("this letter is not in the word.");
            h.missed(key);
            if (h.getLife() > -1) {
                $("#human").attr('src', "../img/" + h.getLife() + ".png");
                $('#incercari').html(h.getLife());
                $('.litere').html(h.getMissedLetters() + "");
                if (h.getLife() == 0)  					
                	gameOver();
            }
        }
        if (h.gameIsFinished()) {
            gameWon();
        }
    });

    function gameWon() {
        if (WINDOW_W <= MOBILE_WIDH) {
            ion.sound.play("ta_da");
            alert("Felicita e tenersi per mano")
            window.location.reload(); // mobile
            return;
        }
        //alert("You're winner!");
        if (WINDOW_W > MOBILE_WIDH) $('#gamewon').fadeIn('slow');
        $(document).off(); // Detach keypress handler
        ion.sound.play("ta_da"); // Play victory sound
        $('#gamewon img').click(function() {
            window.location.reload();
        });
        $(document).on("keypress", function(e) {
            var key = e.keyCode || e.which;
            if (key == 13) window.location.reload(); // Reset handlers :-)
        });
    }

    function gameOver() {
        if (WINDOW_W <= MOBILE_WIDH) {
            ion.sound.play("sad_trombone");
            alert("You lost! Word: " + h.getWord());
            window.location.reload(); // for mobile phones
            return; // for slower mobile phones
        }
        $('#incercari_msg').html("Game Over!");
        $('#lose_word').html(h.getWord());
        if (WINDOW_W > MOBILE_WIDH) $('#gameover').fadeIn('slow');
        $(document).off(); // Detach keypress handler
        ion.sound.play("sad_trombone");
        $('#gameover img').click(function() {
            window.location.reload();
        });
        $(document).on("keypress", function(e) {
            var key = e.keyCode || e.which;
            if (key == 13) window.location.reload();
        });
    }
})();

