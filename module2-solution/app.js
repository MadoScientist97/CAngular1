(function(){
    'use strict';
    angular.module("ShoppingListApp",[])
    .controller("buyListCtrl", buyLcontroller)
    .controller("doneListCtrl", doneLcontroller)
    .service("cartTransfer",cartTransfer);



    buyLcontroller.$inject = ['cartTransfer']
    function buyLcontroller(cartTransfer){
        var buyList = this
        buyList.itemList = cartTransfer.toBuyList 
        buyList.boughtIt = function(name){
            cartTransfer.boutghtItNow(name)
            buyList.itemList = cartTransfer.toBuyList
        }
    }
    doneLcontroller.$inject = ['cartTransfer']
    function doneLcontroller(cartTransfer){
        var boughtList = this
        boughtList.itemList = cartTransfer.boughtList
    }
    function cartTransfer(){
        var Items = [
            {
                name:'Candy' , 
                quantity:'1 Pack' 
            },
            {
                name:'Chocolate',
                quantity:'10 Bars'
            },
            {
                name:'Sausages',
                quantity:'2 packs'
            },
            {
                name:'Deodorant', 
                quantity:'1 bottle'
            },
            {
                name:'Milk',
                quantity:'2 liters'
            }]
        var transferService = this
        transferService.toBuyList = Items
        transferService.boughtList = []

        transferService.boutghtItNow = function(name){
            var boughtItem = transferService.toBuyList.find(item => item.name === name)
            transferService.toBuyList.splice(transferService.toBuyList.indexOf(boughtItem),1)
            transferService.boughtList.push(boughtItem)
        }
    }
})()