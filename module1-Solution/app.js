(function(){
    'use strict';
    angular.module("FoodList",[])
    .controller("LunchCountController", LunchCountController);
    LunchCountController.$inject = ['$scope']
    function LunchCountController($scope){
    $scope.lunchList = ''
    $scope.TestCount = function (){
        var stList = []
        stList = $scope.lunchList.split(',')
        var count = stList.length
        for (var i = 0;i<stList.length;i++){
            if (stList[i]==='')
            count-=1;
        }
        if (count === 0)
            $scope.ResMessage = "Please Enter Data First" ;    
        else if (count < 4)
            $scope.ResMessage = "Enjoy!" ;    
        else
            $scope.ResMessage = "Too much!" ;    
        
    };
}
})()