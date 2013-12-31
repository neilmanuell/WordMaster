'use strict';

/* Controllers */

angular.module( 'myApp.controllers', [] )

   .controller( 'AppCtrl', [ 'master', 'wordService', function ( master, wordService ) {
      wordService.getRandomWord( 5, 7 )
         .then( function ( word ) {
            master.word = word;
         } );

   }] )

   .controller( 'MasterWordCtrl', [ '$scope', 'master', function ( $scope, master ) {
      master.addListener( function ( word, mask ) {
         $scope.master = mask;
      } )

   }] )

   .controller( 'GuessCtrl', [ '$scope', 'guesses', function ( $scope, guesses ) {
      $scope.guesses = guesses.words;
      // $scope.word = guesses;
   }] )

   .controller( 'SubmitCtrl', [ '$scope', 'guesses', 'master', 'wordService', function ( $scope, guesses, master, wordService ) {
      $scope.guessedWord = '';
      $scope.master = master;
      $scope.allowSubmit = false;

      $scope.submitGuess = function () {
         $scope.validate()
            .then( function ( data ) {
               if (data.success) {
                  $scope.addGuess( data.word );
               }
               else {
                  $scope.disallowGuess( data.word );
               }

            } );

      }

      $scope.addGuess = function ( word ) {
         $scope.showAlert = false;
         $scope.message = "Yep! " + word + " is a word alright";
         guesses.add( word );
         $scope.guessedWord = '';
      };

      $scope.disallowGuess = function ( word ) {
         $scope.showAlert = true;
         $scope.message = word + " is not a word, is it?";
         $scope.allowSubmit = false;
      };

      $scope.validate = function () {
         return wordService.validateWord( $scope.guessedWord );
      };

      $scope.$watch( 'guessedWord', function ( newVal, oldVal ) {
         $scope.showAlert = ($scope.guessedWord.length != master.word.length);
         if ($scope.showAlert) {
            $scope.message = "guess is only " + $scope.guessedWord.length + " in length.  it needs to be " + master.word.length;
            $scope.allowSubmit = false;
         }
         else {
            $scope.message = "You may submit your word now";
            $scope.allowSubmit = true;

         }
      } );

   }] );





