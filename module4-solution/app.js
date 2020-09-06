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
            menu.narrow = []
            searchTerm = menu.sTerm
            if (menu.fooditems.length===0){
                if (!searchTerm || searchTerm === ''){
                    menu.errorMessage = "Nothing Found!!"
                    return
                }
                var promise = MenuSearchService.retriveMenu()
                promise.then(function(response){
                menu.fooditems = response.data.menu_items
                menu.narrow = []
                for (let i=0;i<menu.fooditems.length;i++){
                    //code for getting the matching items
                    var patt = new RegExp("(^"+searchTerm.toLowerCase()+"|\\s"+searchTerm.toLowerCase()+")")
                    if (patt.test(menu.fooditems[i].name.toLowerCase()) === true || patt.test(menu.fooditems[i].description.toLowerCase()) === true)  
                    menu.narrow.push(menu.fooditems[i])
                }
                if  (menu.narrow.length===0)
                    menu.errorMessage="Nothing Found!!"
                else
                    menu.errorMessage=""
                })
                .catch(function (error){
                    console.log("Data Could Not Be Recieved!!")
                });

            }
            else{
            menu.narrow = []
            if (searchTerm === ''){
                menu.errorMessage = "Nothing Found!!"
                return
            }
            for (let i=0;i<menu.fooditems.length;i++){
                //code for getting the matching items
                var patt = new RegExp("(^"+searchTerm.toLowerCase()+"|\\s"+searchTerm.toLowerCase()+")")
                if (patt.test(menu.fooditems[i].name.toLowerCase()) === true || patt.test(menu.fooditems[i].description.toLowerCase()) === true)   
                menu.narrow.push(menu.fooditems[i])
                }
                if  (menu.narrow.length===0)
                menu.errorMessage="Nothing Found!!"
                else
                menu.errorMessage=""

            }
        };
        menu.deleteItem = function(index){
            menu.narrow.splice(index,1)
            if (menu.narrow.length!==0)
            menu.errorMessage=''
            else
            menu.errorMessage="No more Items!!"
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