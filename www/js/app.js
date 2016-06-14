var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/summary');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

        .state('summary', {
            url: '/summary',
            templateUrl: 'templates/summary.html'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'templates/dashboard.html',
            controller: 'dashCtrl'
        })
        
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'templates/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        .state('home.profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html'
        })

        .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'templates/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'templates/table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        
});

app.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});

app.controller('dashCtrl', function($scope){
    $scope.iconhome = 'img/icons/';
    $scope.tiles = [
        {
            'color': 'light-green',
            'content': 'Azienda agricola',
            'link': 'profile',
            'image': $scope.iconhome + 'profile_icon.png' ,
            'valid': true
        },
        {
            'color': 'yellow',
            'content': 'Informazioni prodotto',
            'image': $scope.iconhome + 'info_icon.png',
            'valid': true
        },
        {
            'color': 'orange',
            'content': 'Dettagli prodotto',
            'image': $scope.iconhome + 'detail_icon.png',
            'valid': true
        },
        {
            'color': 'red',
            'content': 'Valori nutrizionali',
            'image': $scope.iconhome + 'nutrition_icon.png',
            'valid': true
        },
        {
            'color': 'brown',
            'content': 'Impatto CO2',
            'image': $scope.iconhome + 'co2impact_icon.png',
            'valid': true
        },
        {
            'color': 'purple',
            'content': 'Ingredienti particolari',
            'image': $scope.iconhome + 'ingredient_icon.png',
            'valid': true
        },
        {
            'color': 'blue',
            'content': 'Utilizzo acqua',
            'image': $scope.iconhome + 'water_icon.png',
            'valid': true
        },
        {
            'color': 'dark-green',
            'content': 'Ricette',
            'image': $scope.iconhome + 'recipe_icon.png',
            'valid': true
    }
];
});

app.directive('social', function(){
    return {
        restrict: 'AE', 
        replace: 'true', 
        templateUrl: 'templates/social-row.html'

    }
});