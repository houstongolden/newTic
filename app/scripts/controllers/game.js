'use strict';

angular.module('gameLogicApp')
  .controller('MainCtrl', function ($scope, angularFire) {

  $scope.games =[];
  $scope.queue = {};

  $scope.player = "";
  $scope.gameId = -1;


  var games = new Firebase("https://tictactoeio.firebaseio.com/games");
  angularFire(games, $scope, "games").then(function() {
  

  var queue = new Firebase("https://tictactoeio.firebaseio.com/queue");
  angularFire(queue, $scope, "queue").then(function() {
  	if($scope.queue.gameId == undefined) {
  		console.log("I'm player 1");
  		$scope.player = "p1";
  		var newGame = {
  			board: ['', '', ''],
        		   ['', '', ''],
        		   ['', '', ''],
  			turn: 'p1',
  			win: false,
  			turnCount: 0
  		};

  		$scope.gameId = $scope.games.push(newGame) - 1;
  		$scope.queue.gameId = $scope.gameId;

  	  } else {
  	  	console.log("I'm player 2");
  	  	$scope.player = "p2";

  	  	$scope.gameId = $scope.queue.gameId;
  	  	$scope.queue = {};
  	  	console.log("Player 2's game is: " + $scope.gameId)
  	  }

  });
 });
  
});
