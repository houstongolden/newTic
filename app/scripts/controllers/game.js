'use strict'
angular.module('newTicApp')
//on line 4, I deleted a space between 'function' and '('
  .controller('TicTacToeCntl', ['$scope', 'angularFire', function($scope, angularFire) {
    // $scope.board=[];
    $scope.games = [];
    $scope.queue = {};

    var ref = new Firebase("https://tictactoeio.firebaseio.com/board")
    var promise = angularFire(ref, $scope, "board");

    // bind $scope.games to firebase
    var games = new Firebase("https://game-logic-tehpeh.firebaseio.com/games");
    angularFire(games, $scope, "games").then(function () {

      // bind $scope.queue to firebase
      var queue = new Firebase("https://game-logic-tehpeh.firebaseio.com/queue");
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
                  ];
            turn: 'p1',
            win: false,
            turnCount: 0,
            waiting: true
          };

  promise.then(function(){

    $scope.cellStyle= {
        'height': '150px',
        'width': '150px',
        'border': '1px solid white',
        'text-align': 'center',
        'vertical-align': 'middle',
        'cursor': 'pointer'
    };
 

    $scope.update = function(user) {
      $scope.master = angular.copy(user);
    };


    $scope.reset = function(){
      $scope.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      $scope.nextMove = 'X';
      $scope.winner = '';

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
        };

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
     
    $scope.dropPiece = function(row, col){
      if (!$scope.winner && !$scope.board[row][col]) {
        $scope.board[row][col] = $scope.nextMove;
        $scope.nextMove = $scope.nextMove == 'X' ? 'O' : 'X';
      }
      $scope.grade();
    };
     
    $scope.reset();
    $scope.$watch(function(){ return $location.search().board;}, readUrl);

    function setUrl() {
      var rows = [];
      angular.forEach($scope.board, function(row) {
        rows.push(row.join(','));
      });
      $location.search({board: rows.join(';') + '/' + $scope.nextMove});
    };
     
    $scope.grade = function(){
      var b = $scope.board;
      $scope.winner =
        row(0) || row(1) || row(2) ||
        col(0) || col(1) || col(2) ||
        diagonal(-1) || diagonal(1);
      function row(row){ return same(b[row][0], b[row][1], b[row][2]);};
      function col(col){ return same(b[0][col], b[1][col], b[2][col]);};
      function diagonal(i){ return same(b[0][1-i], b[1][1], b[2][1+i]);};
      function same(a, b, c){ return (a==b && b==c) ? a : '';};
      
    };
     
    function readUrl(value){
      if (value) {
        value = value.split('/');
        $scope.nextMove = value[1];
        angular.forEach(value[0].split(';'), function(row, col){
          $scope.board[col] = row.split(',');
        });
        grade();
      }
    }
  }

  });

}]);
