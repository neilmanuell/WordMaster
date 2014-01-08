'use strict';

/* jasmine specs for services go here */
describe( 'service', function () {

   beforeEach( module( 'myApp.services' ) );

   describe( 'Score', function () {
      var score;
      var letters;

      beforeEach( function () {
         var guess = "GYOOSBY";
         var masterWord = "GOODBYE";
         var master = new Master();
         master.word = masterWord;
         var word = new Word( master );
         word.setWord( guess );
         letters = word.letters;
         score = new Score( guess, masterWord, letters )
      } );

      describe( 'calculateScores', function () {

         beforeEach( function () {
            score.calculateScores();
         } );

         it( 'should set score at 0 index as 0', function () {
            expect( letters[0].score ).toEqual( 0 );
         } );

         it( 'should set score at 1 index as 1', function () {
            expect( letters[1].score ).toEqual( 1 );
         } );

         it( 'should set score at 2 index as 0', function () {
            expect( letters[2].score ).toEqual( 0 );
         } );

         it( 'should set score at 3 index as 1', function () {
            expect( letters[3].score ).toEqual( 1 );
         } );

         it( 'should set score at 4 index as 2', function () {
            expect( letters[4].score ).toEqual( 2 );
         } );

         it( 'should set score at 5 index as 1', function () {
            expect( letters[5].score ).toEqual( 1 );
         } );

         it( 'should set score at 6 index as 2', function () {
            expect( letters[6].score ).toEqual( 2 );
         } );
      } );

   } );

   describe( 'Word', function () {

      var word;

      beforeEach( function () {
         var master = new Master();
         master.word = "goodbye";
         word = new Word( master );
      } );

      describe( "by default", function () {
         it( 'should have empty array of letters', function () {
            expect( word.letters.length ).toEqual( 0 );
         } );

         it( 'should have empty string value for word property', function () {
            expect( word.word ).toEqual( "" );
         } );
      } );

      describe( "after word is set", function () {

         beforeEach( function () {
            word.setWord( "gyoosby" );
         } );

         it( 'should set word value with upper case', function () {
            expect( word.word ).toEqual( "GYOOSBY" );
         } );

         it( 'should set letters array to same length as the word value', function () {
            expect( word.letters.length ).toEqual( word.word.length );
         } );

         it( 'should create LetterVOs for each letters value', function () {
            expect( word.letters[0] instanceof LetterVO ).toBeTruthy();
         } );

         it( 'should set correct letter for each LetterVO', function () {
            expect( word.letters[0].letter ).toEqual( "G" );
            expect( word.letters[3].letter ).toEqual( "O" );
            expect( word.letters[6].letter ).toEqual( "Y" );
         } );

         it( 'should set correct score for each LetterVO', function () {
            expect( word.letters[0].score ).toEqual( 0 );
            expect( word.letters[1].score ).toEqual( 1 );
            expect( word.letters[2].score ).toEqual( 0 );
            expect( word.letters[3].score ).toEqual( 1 );
            expect( word.letters[4].score ).toEqual( 2 );
            expect( word.letters[5].score ).toEqual( 1 );
            expect( word.letters[6].score ).toEqual( 2 );
         } );

      } );

   } );

   describe( 'LetterVO', function () {

      it( 'should return the letter passed in constructor as uppercase', function () {
         expect( new LetterVO( "a" ).letter ).toEqual( 'A' );
      } );

      it( 'should by default have a score of -1', function () {
         expect( new LetterVO( "a" ).score ).toEqual( -1 );
      } );

      it( 'should return the class value of btn-success for score of 0', function () {
         var letter = new LetterVO( "a" );
         letter.setScore( 0 );
         expect( letter.class ).toEqual( "btn-success" );
      } );

      it( 'should return the class value of btn-info for score of 1', function () {
         var letter = new LetterVO( "a" );
         letter.setScore( 1 );
         expect( letter.class ).toEqual( "btn-info" );
      } );

      it( 'should return the class value of btn-danger for score of 2', function () {
         var letter = new LetterVO( "a" );
         letter.setScore( 2 );
         expect( letter.class ).toEqual( "btn-danger" );
      } );

   } );

   describe( 'guesses', function () {

      it( 'should increase its length when word is added', inject( function ( guesses ) {
         guesses.add( "gnomons" );
         expect( guesses.words.length ).toBe( 1 );
      } ) );

      it( 'should add instanceof Word to words', inject( function ( guesses ) {
         guesses.add( "gnomons" );
         expect( guesses.words[0] instanceof Word ).toBeTruthy();
      } ) );

      it( 'should add instanceof Word to words', inject( function ( guesses ) {
         guesses.add( "gnomons" );
         expect( guesses.words[0].word ).toBe( "GNOMONS" );
      } ) );

   } );


} );
