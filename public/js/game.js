Game = function () {

};

Master = function () {
   var MASK = "*"
   var master = MASK;
   var masked = MASK;
   var changeListener = null;

   this.__defineGetter__( "mask", function () {
      return masked;
   } );

   this.__defineGetter__( "word", function () {
      return master;
   } );

   this.__defineSetter__( "word", function ( value ) {
      master = value.toUpperCase();
      masked = master[0] + getMask( master.length - 1 );
      if (changeListener != null) {
         changeListener( master, masked );
      }
   } );

   this.addListener = function ( listener ) {
      changeListener = listener;
   }

   var getMask = function ( len ) {
      var out = '';
      while (len > 0) {
         out += MASK;
         len--;
      }
      return out;
   }

};

LetterVO = function ( letter ) {

   var _score = -1;
   letter = (letter == null ) ? "NULL" : letter.toUpperCase();

   this.__defineGetter__( "letter", function () {
      return letter;
   } );

   this.__defineGetter__( "score", function () {
      return _score;
   } );

   this.__defineGetter__( "class", function () {

      if (_score == 0) {
         return "btn-success";
      }

      else if (_score == 1) {
         return "btn-info";
      }

      else {
         return "btn-danger";
      }

   } );

   this.setScore = function ( score ) {
      _score = score;
   }
};


Word = function ( masterWord ) {

   var _letterData = [];
   var _masterWord = masterWord;
   var _word = "";

   this.__defineGetter__( "word", function () {
      return _word;
   } );

   this.__defineGetter__( "mask", function () {
      return "";
   } );

   this.__defineGetter__( "letters", function () {
      return _letterData;
   } );

   this.__defineGetter__( "score", function () {
      var out = 0;
      for (var i in _letterData) {
         out += _letterData[i].score;
      }
      return out;
   } );

   this.setWord = function ( word ) {

      for (var i = 0; i < word.length; i++) {
         _letterData.push( new LetterVO( word[i] ) );
      }
      _word = word.toUpperCase();
      new Score(_word,_masterWord.word,_letterData).calculateScores();
   };


};

Score = function ( word, masterWord, letters ) {

   var _ticked = masterWord;

   this.calculateScores = function () {

      var len = word.length;
      var letter;

      for (var i = 0; i < len; i++) {

         letter = letters[i];

         if (letter.letter == masterWord[i]) {
            letter.setScore( 0 );
            this.tickOff( letter.letter );
         }

         else if (masterWord.indexOf( letter.letter ) == -1) {
            letter.setScore( 2 )
         }

         else {
            if (this.tickOff( letter.letter )) {
               letter.setScore( 1 );
            }

            else{
               letter.setScore( 2 );
            }
         }
      }
   }

   this.tickOff = function ( letter ) {

      var index = _ticked.indexOf( letter );
      if (index == -1) {
         return false;
      }

      else {
         _ticked = _ticked.replace(letter, "*");
        return true;
      }
   }




};

Guesses = function ( master ) {

   var _words = [];

   this.__defineGetter__( "words", function () {
      return _words;
   } );

   this.add = function ( guess ) {
      const word = new Word( master );
      word.setWord( guess );
      _words.push( word );
   }

};