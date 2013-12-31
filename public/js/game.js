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

Letter = function ( index, word, master ) {

   master = master.toUpperCase();
   word = word.toUpperCase();
   var m = master[index];
   var l = word[index];
   var c = 'NULL';
   var s = -1;

   this.__defineGetter__( "valid", function () {
      return false
   } );

   this.__defineGetter__( "letter", function () {
      return l;
   } );

   this.__defineGetter__( "score", function () {

      if (s > -1) {
         return s;
      }

      if (l == m) {
         c = 'btn-success';
         return 0;
      }

      if (( master.search( l ) != -1)) {
         c = 'btn-info';
         return 1;
      }

      else {
         c = 'btn-danger';
         return 2;
      }
   } );

   this.__defineGetter__( "class", function () {

      if (c != "NULL") {
         return c;
      }

      else {
         this.score;
         return c;
      }

   } );
};


Word = function ( master ) {

   var _letterData = [];
   var _master = master.word;
   var _word = "";

   this.__defineGetter__( "word", function () {
      return _word;
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


   this.add = function add( word ) {
      for (var i = 0; i < word.length; i++) {
         _letterData.push( new Letter( i, word, _master ) );
      }
      _word = word
   };

   var refresh = function () {
      _letterData.length = 0;
   }


};

Guesses = function ( master ) {

   var _words = [];

   this.__defineGetter__( "words", function () {
      return _words;
   } );

   this.add = function ( guess ) {
      const word = new Word( master );
      word.add( guess );
      _words.push( word );
   }

};