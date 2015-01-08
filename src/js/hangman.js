var cheats = false;
/**
 * A class for the old game called Hangman.
 */
function Hangman() {
	var word;
	var life;
	var missedLetters;
	var charArray1;
	var charArray2;

	/**
	 * Used to initialize the game.
	 * @param  {array} wordList An array of words used to play the game.
	 */
	this.newGame = function(wordList) {
		word = wordList[Math.floor(Math.random() * wordList.length)];
		life = 6;
		charArray1 = []; // word with stars
		charArray2 = []; // plain word
		missedLetters = [];

		// Fill Arrays
		for (var i = 0; i < word.length; i++) {
			charArray1[i] = '*'
		}

		for (var i = 0; i < word.length; i++) {
			charArray2[i] = word.charAt(i);
		} 
	}

	/**
	 * Checks if the letter is in the word.
	 * @param  {char} guess The letter.
	 */
	this.check = function(guess) {
		guess = guess.toLowerCase();
		return word.indexOf(guess) > -1;
	}

	/**
	 * Performs the necessary tasks if the letter is guessed.
	 * @param  {char} guess Letter.
	 */
	this.guessed = function(guess) {
		guess = guess.toLowerCase();

		for (i = 0; i < charArray1.length; i++) {
			if (charArray2[i] == guess) {
				charArray1[i] = guess;
			}
		}
	}

	/**
	 * Performs the necessary tasks in the letter is not guessed.
	 * @param  {char} guess Letter.
	 */
	this.missed = function(guess) {
		life--;
		guess = guess.toLowerCase();
		var len = missedLetters.length;
		if (!($.inArray(guess, missedLetters) > -1)) {
			missedLetters[len] = guess;
		}
	}

	/**
	 * Checks if the game is finished.
	 * @return {boolean}   Returns true if the game is won.
	 */
	this.gameIsFinished = function() {
		var a = charArray1;
		var b = charArray2; 

		if (a === b) return true;
  		if (a == null || b == null) return false;
  		if (a.length != b.length) return false;

  		for (var i = 0; i < a.length; ++i) {
    		if (a[i] !== b[i]) return false;
 		}
  		return true;
	}
	/**
	 * Checks the life.
	 * @return {int} Returns the tries the player has left.
	 */
	this.getLife = function() {
		return life;
	}

	this.setLife = function(life) {
		if (cheats) life = life;
	}

	/**
	 * Used to get the for for displaying after the game is over.
	 * @return {string} Returns the word.
	 */
	this.getWord = function() {
		if (life == 0 && !cheats)
			return word;
		if (cheats)
			return word;
	}

	/**
	 * Placeholder for word. Eg: ****
	 * @return {array} Returns the word array.
	 */
	this.getWordArray = function() {
		return charArray1;
	}

	/**
	 * Get the letters that have been typed but are not the the word.
	 * @return {array} Get the missed letters.
	 */
	this.getMissedLetters = function () {
		return missedLetters;
	}
}
