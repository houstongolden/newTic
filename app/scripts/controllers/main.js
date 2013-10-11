'use strict';

angular.module('newTicApp')
  .controller('TicTacToeCntl', function ($scope, angularFire) {
    // these will be bound to firebase, set default values
    $scope.games = [];
    $scope.queue = {};

    // bind $scope.games to firebase
    var games = new Firebase("https://tictactoeio.firebaseio.com/games");
    angularFire(games, $scope, "games").then(function () {

      // bind $scope.queue to firebase
      var queue = new Firebase("https://tictactoeio.firebaseio.com/queue");
      angularFire(queue, $scope, "queue").then(function () {

        // is there a game on the queue?
        if ($scope.queue.gameId == undefined) {
          // no game on the queue
          console.log("I'm player 1");
          // record the fact that I'm player one
          $scope.player = "p1";

          // make a new game
          var newGame = {
            board: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                  ],
            turn: 'p1',
            win: false,
            turnCount: 0,
            waiting: true
          };

          // add the new game to the list of games
          $scope.gameId = $scope.games.push(newGame) - 1;
          // record where that new game was added (as gameId, it's the index in the array)
          $scope.queue.gameId = $scope.gameId;
          console.log("Player 1's game is: " + $scope.gameId);

        } else {
          // a game on the queue
          console.log("I'm player 2");
          // record the fact that I'm player two
          $scope.player = "p2";

          // save the gameId from the queue
          $scope.gameId = $scope.queue.gameId;
          // delete the queue
          $scope.queue = {};
          console.log("Player 2's game is: " + $scope.gameId);
          // it's game time!
        }
      });

    });

    $scope.hello = function () {
      // this is how we access a cell on our board
      $scope.games[$scope.gameId].board[0] = "Hello!";


      $scope.playMove = function(cell) {
        if ((!$scope.games[$scope.gameId].waiting) && ($scope.player == $scope.games[$scope.gameId].turn)) {
          if ($scope.player == 'p1') {
            cell.mark = 'X';
          } else {
            cell.mark = 'O';
          }

          // swap players
          if ($scope.games[$scope.gameId].turn == 'p1') {
            $scope.games[$scope.gameId].turn = 'p2';
          } else {
            $scope.games[$scope.gameId].turn = 'p1';
          }
        }
      };


    };
  });
