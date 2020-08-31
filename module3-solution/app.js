(function(){
    'use strict';

    angular.module("restfulAngular",[])
    .controller("narrowDownController",narrowDownController)
    .service("menuSearchService",MenuSearchService)
    .directive("foundItems",FoundItems);

    narrowDownController.$inject = ['menuSearchService']

    function narrowDownController(MenuSearchService) {
        var menu = this
        var searchTerm
        menu.fooditems = []
        menu.narrow = []
        menu.errorMessage = ''
        menu.narrowDown = function(){
            // if (menu.fooditems.length!==0){
                searchTerm = menu.sTerm
                if (!searchTerm){
                    menu.errorMessage = "Nothing Found!!"
                    return
                }
                console.log(searchTerm)
                var promise = MenuSearchService.retriveMenu()
                promise.then(function(response){
                menu.fooditems = response.data
                console.log(response.data)
                })
                .catch(function (error){
                    console.log("Could Not recieve Data!!")
                });
            // }

            // menu.fooditems.foreach(function(elem){
            //     //code for getting the matching items
            // })
        };
        menu.deleteItem = function(index){
            menu.narrow.splice(index,1)
        }
    };

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http){
        var MenuService = this;
        MenuService.retriveMenu = function(){
            var response = $http({
                method:"GET",
                url:("https://davids-restaurant.herokuapp.com/menu_items.json")
            })
            return response
        };
};

function FoundItems(){
    var ddo ={
        templateUrl: "itemtemplate.html",
        scope : {
            list: "=myList"
        }
    };
    return ddo
}

})();