var myApp = angular.module('myApp',[]);
var counter = 0;
myApp.controller('CanvasCtrl', ["$scope","$timeout", function($scope,$timeout){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var squareSize = 10;
        // setup
    canvas.width = 600;
    canvas.height = 400;
    context.globalAlpha = 1.0;
    context.beginPath();

    $timeout(moveRandom,2000);


    function Square () {
        this.x=0;
        this.y=canvas.height-squareSize;
        this.color="#" + Math.random().toString(16).slice(2, 8);
        this.move= function(right,up,doo){
                 eraseSquare(doo)
                 if(right){
                    doo.x=doo.x+squareSize;
                 }else{
                    doo.x=doo.x-squareSize;
                 }

                 if(up){
                     doo.y=doo.y+1
                 }

                 drawSquare(doo);
              }
    }

    var obj=[];

    $scope.addData = function() {
    //100 just for fun
        for(var i=0;i<100;i++){
            var doo = new Square();
            obj.push(doo);
            drawSquare(doo);
        }
    };



    function drawSquare(data) {
        //context.beginPath();
        context.fillStyle=data.color;
        context.fillRect(data.x, data.y,squareSize,squareSize);
        //context.stroke();
    }
    function eraseSquare(data) {
        context.beginPath();
        context.clearRect(data.x, data.y,squareSize,squareSize);
        context.stroke();
    }

     function moveRandom(){
        angular.forEach(obj,function(doo){
            move(Math.random()<.5,Math.random()<.5,doo);
        });

        $timeout(moveRandom,1000);
     }



     function move(right,up,doo){
         eraseSquare(doo)
         if(right){
            doo.x=doo.x+squareSize;
            if(doo.x>canvas.width){
                doo.x=doo.x-squareSize;
            }
         }else{
            doo.x=doo.x-squareSize;
            if(doo.x<0){
                doo.x=doo.x+squareSize;
            }
         }

         if(up){
             doo.y=doo.y-squareSize
             if(doo.y<0){
                 doo.y=doo.y+squareSize;
             }
         }else{
            doo.y=doo.y+squareSize
             if(doo.y>canvas.height-squareSize){
                 doo.y=doo.y-squareSize;
             }
         }

         drawSquare(doo);
      }


}]);