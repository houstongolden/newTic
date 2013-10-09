function TicTacToeCntl($scope, $location) {
  $scope.cellStyle= {
    'height': '150px',
    'width': '150px',
    'border': '1px solid black',
    'text-align': 'center',
    'vertical-align': 'middle',
    'cursor': 'pointer'
  };
 
 $scope.Player1 = {name: 'Player1'}
 $scope.Player2 = {name: 'Player2'}
 
  $scope.update = function(user) {
    $scope.master = angular.copy(user);
  };


  $scope.reset = function() {
    $scope.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    $scope.nextMove = 'X';
    $scope.winner = '';

  };

  $scope.levelUp = function() {
  $scope.board = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ];
  $scope.nextMove = 'X';
  $scope.winner = '';

};

 
  $scope.dropPiece = function(row, col) {
    if (!$scope.winner && !$scope.board[row][col]) {
      $scope.board[row][col] = $scope.nextMove;
      $scope.nextMove = $scope.nextMove == 'X' ? 'O' : 'X';
    }
    $scope.grade();
  };
 
  $scope.reset();
  $scope.$watch(function() { return $location.search().board;}, readUrl);
 
  function setUrl() {
    var rows = [];
    angular.forEach($scope.board, function(row) {
      rows.push(row.join(','));
    });
    $location.search({board: rows.join(';') + '/' + $scope.nextMove});
  }
 
  $scope.grade = function() {
    var b = $scope.board;
    $scope.winner =
      row(0) || row(1) || row(2) ||
      col(0) || col(1) || col(2) ||
      diagonal(-1) || diagonal(1);
    function row(row) { return same(b[row][0], b[row][1], b[row][2]);}
    function col(col) { return same(b[0][col], b[1][col], b[2][col]);}
    function diagonal(i) { return same(b[0][1-i], b[1][1], b[2][1+i]);}
    function same(a, b, c) { return (a==b && b==c) ? a : '';};
    console.log("hey");
  }
 
  function readUrl(value) {
    if (value) {
      value = value.split('/');
      $scope.nextMove = value[1];
      angular.forEach(value[0].split(';'), function(row, col){
        $scope.board[col] = row.split(',');
      });
      grade();
    }
  }
};


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







// 'use strict';

// angular.module('newTicApp')
//   .controller('MainCtrl', function ($scope) {
//     $scope.awesomeThings = [
//       'HTML5 Boilerplate',
//       'AngularJS',
//       'Karma'
//     ];
//   });

// var turn = 1;
// var cellArray = [["", "", ""], ["", "", ""], ["", "", ""]];
// function playBox(){
// 	 if(event.target.innerHTML == "") {
// 		switch(turn) {
// 			case 1:
// 			event.target.innerHTML = "X";
// 			break;
// 			case 2:
// 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// 			break;
// 			case 3:
// 			event.target.innerHTML = "X";
// 			break;
// 			case 4:
// 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// 			break;
// 			case 5:
// 			event.target.innerHTML = "X";
// 			break;
// 			case 6:
// 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// 			break;
// 			case 7:
// 			event.target.innerHTML = "X";
// 			break;
// 			case 8:
// 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// 			break;
// 			case 9:
// 			event.target.innerHTML = "X";
// 			break;
// 		}

// 	} 
// 	turn = turn+1;


// 	for(var r=0;r<=2;++r)
// 	{	
// 		for(c=0;c<=2;++c)
// 		{
// 		cellArray[r][c] = 
// 		document.getElementById("cell"+(r+1)+"_"+(c+1)).innerHTML;
// 		}


// 	for(c=0;c<=2;++c)
// 		{	
// 		if(cellArray[0][c] == cellArray[1][c] &&
// 			cellArray[1][c] == cellArray[2][c] &&
// 			cellArray[0][c] != "")

// 		{if(cellArray [0][c].indexOf("my-baby-photo")>=0)
// 		// alert("Houston won in column " + (c+1));
// 		document.getElementById("pop_up").style.display = "block";
// 		else
// 		alert("X won in column " + (c+1));
// 		}

// 		if(cellArray[r][0] == cellArray[r][1] &&
// 			cellArray[r][1] == cellArray[r][2] &&
// 			cellArray[r][0] != "")

// 		{if(cellArray [r][0].indexOf("my-baby-photo")>=0)
// 		// alert("Houston won in column " + (r+1));
// 		document.getElementById("pop_up").style.display = "block";
// 		else
// 		alert("X won in column " + (r+1));
// 		}

// 		}
// 	}
// 		if(cellArray[0][0] == cellArray[1][1] &&
// 			cellArray[1][1] == cellArray[2][2] &&
// 			cellArray[0][0] != "")

// 		{if(cellArray [0][0].indexOf("my-baby-photo")>=0)
// 		document.getElementById("pop_up").style.display = "block";
// 		else
// 		alert("X won diagonally ");
// 		}

// 		if(cellArray[0][2] == cellArray[1][1] &&
// 			cellArray[1][1] == cellArray[2][0] &&
// 			cellArray[0][2] != "")

// 		{if(cellArray [0][2].indexOf("my-baby-photo")>=0)
// 		// alert("Houston won diagonally ");
// 		document.getElementById("pop_up").style.display = "block";
// 		else
// 		alert("X won diagonally ");
// }
// }







// function getPresentationData(){

//     var data = {};

//     data.title = 'My Site Title';

//     data.pages = [];
//     data.subMenu = [];



//     data.subMenu[0] = {};    
//     data.subMenu[0].list = [];
//     data.subMenu[0].list[0] = {heading:'Profile', number: '1'};
//     data.subMenu[0].list[1] = {heading:'Background', number: '2'};
//     data.subMenu[0].list[2] = {heading:'What is KAM', number: '3'};

//     data.pages[0] = {};
//     data.pages[0].menuTitle = 'Introduction';
//     data.pages[0].slides = [];
//     data.pages[0].slides[0] = {heading:'profile', speaker: 'Me', title:'Expert ', img:'content/3.jpg', video:'content/videos/3.m4v'};
//     data.pages[0].slides[1] = {heading:'profile', speaker: 'Me', title:'Expert ', img:'content/4.jpg', video:'content/videos/3.m4v'};
//      ...


//     data.subMenu[1] = {};    
//     data.subMenu[1].list = [];
//     data.subMenu[1].list[0] = {heading:'2 Profile', number: '1'};
//     data.subMenu[1].list[1] = {heading:'2 Background', number: '2'};
//     data.subMenu[1].list[2] = {heading:'2 What is KAM', number: '3'};

//     data.pages[1] = {};
//     data.pages[1].menuTitle = 'Cases';
//     data.pages[1].slides = [];
//     data.pages[1].slides[0] = {heading:'profile', speaker: 'Me', title:'Expert ', img:'content/3.jpg', video:'content/videos/3.m4v'};
//     data.pages[1].slides[1] = {heading:'profile', speaker: 'Me', title:'Expert ', img:'content/4.jpg', video:'content/videos/3.m4v'};
//     ...


//     data.pages[2] = {};
//     data.pages[2].menuTitle = 'Valdsff ns';
//     data.pages[2].slides = [];
//     data.pages[2].slides[0] = {heading:'asdf asdf asdfles', speaker: 'asdf asdfas', title:'Expert ', img:'casdf.jpg', video:'content/df3.m4v'};

//     return data;
// }

// function presentationController($scope, $location){

//     $scope.data = getPresentationData();

//     $scope.currPage = 0;
//     $scope.currSlide = 0;
//     $scope.currMenu = 0;

//     $scope.goToPage = function(pageIndex){
//         $('.slide-container').hide();
//         $scope.currSlide = 0; 
//         $scope.currPage = pageIndex;
//         $('.slide-container').fadeIn(500);
//     };
// }

// $scope.goToSpecificPage = function(pageIndex, slideIndex){ 

//         $('.slide-container').hide();
//         $scope.currSlide = slideIndex; 
//         $scope.currPage = pageIndex;
//         $('.slide-container').fadeIn(500);
//     };












// // var turn = 1;
// // var cellArray = [["", "", ""], ["", "", ""], ["", "", ""]];
// // function playBox(){
// // 	 if(event.target.innerHTML == "") {
// // 		switch(turn) {
// // 			case 1:
// // 			event.target.innerHTML = "X";
// // 			break;
// // 			case 2:
// // 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// // 			break;
// // 			case 3:
// // 			event.target.innerHTML = "X";
// // 			break;
// // 			case 4:
// // 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// // 			break;
// // 			case 5:
// // 			event.target.innerHTML = "X";
// // 			break;
// // 			case 6:
// // 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// // 			break;
// // 			case 7:
// // 			event.target.innerHTML = "X";
// // 			break;
// // 			case 8:
// // 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// // 			break;
// // 			case 9:
// // 			event.target.innerHTML = "X";
// // 			break;
// // 			case 10:
// // 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// // 			break;
// // 			case 11:
// // 			event.target.innerHTML = "X";
// // 			break;
// // 			case 12:
// // 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// // 			break;
// // 			case 13:
// // 			event.target.innerHTML = "X";
// // 			break;
// // 			case 14:
// // 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// // 			break;
// // 			case 15:
// // 			event.target.innerHTML = "X";
// // 			break;
// // 			case 16:
// // 			event.target.innerHTML = "<img src=\"http://cloud-media.com/wp-content/uploads/2013/09/my-baby-photo.jpg\" />";
// // 			break;

// // 		}

// // 	} 
// // 	turn = turn+1;


// // 	for(var r=0;r<=3;++r)
// // 	{	
// // 		for(c=0;c<=3;++c)
// // 		{
// // 		cellArray[r][c] = 
// // 		document.getElementById("cell"+(r+1)+"_"+(c+1)).innerHTML;
// // 		}


// // 	for(c=0;c<=3;++c)
// // 		{	
// // 		if(cellArray[0][c] == cellArray[1][c] &&
// // 			cellArray[1][c] == cellArray[2][c] && 
// // 			cellArray[2][c] == cellArray[3][c] &&
// // 			cellArray[0][c] != "")

// // 		{if(cellArray [0][c].indexOf("my-baby-photo")>=0)
// // 		// alert("Houston won in column " + (c+1));
// // 		document.getElementById("pop_up").style.display = "block";
// // 		else
// // 		alert("X won in column " + (c+1));
// // 		}

// // 		if(cellArray[r][0] == cellArray[r][1] &&
// // 			cellArray[r][1] == cellArray[r][2] &&
// // 			cellArray[r][2] == cellArray[r][3] &&
// // 			cellArray[r][0] != "")

// // 		{if(cellArray [r][0].indexOf("my-baby-photo")>=0)
// // 		// alert("Houston won in column " + (r+1));
// // 		document.getElementById("pop_up").style.display = "block";
// // 		else
// // 		alert("X won in column " + (r+1));
// // 		}

// // 		}
// // 	}
// // 		if(cellArray[0][0] == cellArray[1][1] &&
// // 			cellArray[1][1] == cellArray[2][2] &&
// // 			cellArray[2][2] == cellArray[3][3] &&
// // 			cellArray[0][0] != "")

// // 		{if(cellArray [0][0].indexOf("my-baby-photo")>=0)
// // 		document.getElementById("pop_up").style.display = "block";
// // 		else
// // 		alert("X won diagonally ");
// // 		}

// // 		if(cellArray[0][2] == cellArray[1][1] &&
// // 			cellArray[1][1] == cellArray[2][0] &&
// // 			cellArray[2][0] == cellArray[2][2] &&
// // 			cellArray[0][2] != "")

// // 		{if(cellArray [0][2].indexOf("my-baby-photo")>=0)
// // 		// alert("Houston won diagonally ");
// // 		document.getElementById("pop_up").style.display = "block";
// // 		else
// // 		alert("X won diagonally ");
// // }
// // }

