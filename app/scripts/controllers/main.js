'use strict'

angular.module('newTicApp')

  .controller('TicTacToeCntl', ['$scope', 'angularFire', function($scope, angularFire) {
    $scope.board=[];
    var ref = new Firebase("https://tictactoeio.firebaseio.com/board")
    var promise = angularFire(ref, $scope, "board");

  promise.then(function(){

    $scope.cellStyle= {
        'height': '150px',
        'width': '150px',
        'border': '1px solid black',
        'text-align': 'center',
        'vertical-align': 'middle',
        'cursor': 'pointer'
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
    

    $scope.$watch(function() {
      return $scope.winner;
    })


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
  });
}]);










 
    // $scope.Player1 = {name: 'Player1'};
    // $scope.Player2 = {name: 'Player2'};

    // $scope.update = function(user) {
    //   $scope.master = angular.copy(user);
    // };




// $scope.board = {
  

// player_turn: 1,

// ticTacToe: [[{val:'', r:0,c:0},{val:'',r:0,c:1},{val:'',r:0,c:2}],
// [{val:'',r:1,c:0},{val:'',r:1,c:1},{val:'',r:1,c:2}],
// [{val:'', r:2,c:0},{val:'',r:2,c:1},{val:'',r:2,c:2}]],

// players_in_room: 0,

// game_ended: false,



// };





    // $scope.levelUp = function(){
    //   $scope.board = [
    //     ['', '', '', ''],
    //     ['', '', '', ''],
    //     ['', '', '', ''],
    //     ['', '', '', '']
    //   ];
    //   $scope.nextMove = 'X';
    //   $scope.winner = '';

    // };

     







// $scope.queue = {}

// angularFire(ref, $scope, "queue", {})

// if $scope.queue != {}
//   join
// else I am 'Player2'
//   create
// I am 'Player3'



// $scope.games = {
//   board: [[],[],[]]
//   gameWon: false
//   Player1:
//   Player2:
//   Player3:
//   turn: ""

// }

// var ref = new Firebase.games

// var id = ref.push

// $scope.queue = {
//   gameID: "id"

// }




// var sideLength = 8;

// for(r = 0; r < sideLength; ++r)
// {
//   var myNewArray = [];
//   $scope.othello.push([]);
//   for(c = 0; c<sideLength; ++c)
//   {
//     myNewArray.push( {val: '', r:c, c:c} )
//   }
// }

// var midPoint = Math.floor(sideLength / 2)
// $scope.TicTacToeCntl[midPoint-1][midPoint].val=$scope.TicTacToeCntl[midPoint-1][midPoint].val="X";
// $scope.TicTacToeCntl[midPoint-1][midPoint].val=$scope.TicTacToeCntl[midPoint-1][midPoint].val="X";

 
  // $scope.reset = function() {
  //   $scope.board = [
  //     [{val: '', r:0, c:0}, {val: '', r:0, c:1}, {val: '', r:0, c:2}],
  //     [val: '', r:1, c:0}, {val: '', r:1, c:1}, {val: '', r:1, c:2}],
  //     [val: '', r:2, c:0}, {val: '', r:2, c:1}, {val: '', r:2, c:2}]
  //   ];
  //   $scope.nextMove = 'X';
  //   $scope.winner = '';

  // };