'use strict';

/* Services */


angular.module( 'myApp.services', [] )

   .factory( 'master', function () {
      return  new Master();
   } )

   .factory( 'guesses', ['master', function ( master ) {
      return new Guesses( master );
   } ] )

   .factory( 'wordService', ['$http', '$q', function ( $http, $q ) {
      return {
         getRandomWord: function ( min, max ) {
            var defer = $q.defer();
            min = ( min == null) ? 5 : min;
            max = ( max == null) ? 8 : max;
            $http.get( 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=30000&maxCorpusCount=60000&minDictionaryCount=10&maxDictionaryCount=50&minLength='
                  + min
                  + '&maxLength='
                  + max
                  + '&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive&api_key=9d6000cddc367eae571020e50d10199c936bd9639681e53e0' )

               .success( function ( data, status, headers, config ) {
                  defer.resolve( data.word );
               } );
            return defer.promise;
         },

         validateWord: function ( word ) {
            var defer = $q.defer();
            $http.get( 'http://api.wordnik.com:80/v4/words.json/search/'
                  + word
                  + '?caseSensitive=false&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&skip=0&limit=10' +
                  '&api_key=9d6000cddc367eae571020e50d10199c936bd9639681e53e0' )

               .success( function ( data, status, headers, config ) {
                  defer.resolve( {success: (data.totalResults != 0), word: word } );
               } );

            return defer.promise;
         }
      }
   }
   ] )
;


