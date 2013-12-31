'use strict';

/* jasmine specs for services go here */
describe( 'service', function () {
   beforeEach( module( 'myApp.services' ) );


   describe( 'Master', function () {

      it( 'should return ? by default', inject( function ( master ) {
         expect( master.word ).toEqual( '*' );
      } ) );

      it( 'should return value passed to set method in upper case', inject( function ( master ) {
         master.word = "Hello";
         expect( master.word ).toEqual( 'HELLO' );
      } ) );

      it( 'should return masked word', inject( function ( master ) {
         master.word = "Hello";
         expect( master.mask ).toEqual( 'H****' );
      } ) );

      it( 'should call change listener when value is set', inject( function ( master ) {
         var wordRecieved;
         master.addListener( function ( word ) {
            wordRecieved = word;
         } );
         master.word = "Hello";
         expect( wordRecieved ).toEqual( 'HELLO' );
      } ) );

   } );

   describe( 'Letter', function () {
      var letterOne;
      var letterTwo;
      var letterThree;
      var word = 'grandma';
      var master = 'goodbye';

      beforeEach( function () {
         letterOne = new Letter( 0, word, master );
         letterTwo = new Letter( 4, word, master );
         letterThree = new Letter( 6, word, master );
      } );

      it( 'should return the letter at the index passed in uppercase', function () {
         expect( letterOne.letter ).toEqual( 'G' );
         expect( letterTwo.letter ).toEqual( 'D' );
         expect( letterThree.letter ).toEqual( 'A' );
      } );

      it( 'should return the score at the index passed in', function () {
         expect( letterOne.score ).toEqual( 0 );
         expect( letterTwo.score ).toEqual( 1 );
         expect( letterThree.score ).toEqual( 2 );
      } );

      it( 'should return the class determined from the score', function () {
         expect( letterOne.class ).toEqual( "btn-success" );
         expect( letterTwo.class ).toEqual( "btn-info" );
         expect( letterThree.class ).toEqual( "btn-danger" );
      } );

   } );

   describe( 'guesses', function () {

      it( 'should increase its length when word is added', inject( function ( guesses ) {
         guesses.add( "grandma" );
         expect( guesses.words.length ).toBe( 1 );
      } ) );

      it( 'should add instanceof Word to words', inject( function ( guesses ) {
         guesses.add( "grandma" );
         expect( guesses.words[0] instanceof Word).toBeTruthy(  );
      } ) );

      it( 'should add instanceof Word to words', inject( function ( guesses ) {
         guesses.add( "grandma" );
         expect( guesses.words[0].word ).toBe( "grandma" );
      } ) );


   } );


} );
