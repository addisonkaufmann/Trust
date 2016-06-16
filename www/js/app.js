var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/summary');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

        .state('summary', {
            url: '/summary',
            templateUrl: 'templates/summary.html'
        })

         .state('info', {
            url: '/info',
            controller: 'dashCtrl',
            templateUrl: 'templates/info.html'
        })

         .state('profile', {
            url: '/profile',
            controller: 'dashCtrl',
            templateUrl: 'templates/profile.html'
        })

         .state('detail', {
            url: '/detail',
            controller: 'dashCtrl',
            templateUrl: 'templates/detail.html'
        })
        
        .state('ingredient', {
            url: '/ingredient',
            controller: 'dashCtrl',
            templateUrl: 'templates/ingredient.html'
        })
           .state('recipe', {
            url: '/recipe',
            controller: 'dashCtrl',
            templateUrl: 'templates/recipe.html'
        })

         .state('nutrition', {
            url: '/nutrition',
            controller: 'dashCtrl',
            templateUrl: 'templates/nutrition.html'
        })

         .state('water', {
            url: '/water',
            controller: 'dashCtrl',
            templateUrl: 'templates/water.html'
        })

         .state('co2impact', {
            url: '/co2impact',
            controller: 'dashCtrl',
            templateUrl: 'templates/co2impact.html'
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

// app.controller('scotchController', function($scope) {
    
//     $scope.message = 'test';
   
//     $scope.scotches = [
//         {
//             name: 'Macallan 12',
//             price: 50
//         },
//         {
//             name: 'Chivas Regal Royal Salute',
//             price: 10000
//         },
//         {
//             name: 'Glenfiddich 1937',
//             price: 20000
//         }
//     ];
    
// });

app.controller('dashCtrl', function($scope, $rootScope, $stateParams, $state){

    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){
            $state.current = toState;  
        });

    $scope.iconhome = 'img/icons/';
    $scope.tiles = {
        'profile': {
            'color': 'light-green',
            'content': 'Azienda agricola',
            'link': 'profile',
            'image': $scope.iconhome + 'profile_icon.png' ,
            'valid': true,
            'side': 'left'
        },
        'info': {
            'color': 'yellow',
            'content': 'Informazioni prodotto',
            'link': 'info',
            'image': $scope.iconhome + 'info_icon.png',
            'valid': true,
            'side': 'right',
            'data': {
                'carousel': [
                    {'image': 'img/farm.jpg', 'active':true},
                    {'image': 'img/river.jpg', 'active': false},
                    {'image': 'img/field.jpg', 'active':false},
                ]
            }
        },
        'detail': {
            'color': 'orange',
            'content': 'Dettagli prodotto',
            'image': $scope.iconhome + 'detail_icon.png',
            'valid': true,
            'link': 'detail',
            'side': 'left',
            'data': {
                'carousel': [
                    {'image': 'img/farm.jpg', 'active':true},
                    {'image': 'img/river.jpg', 'active': false},
                    {'image': 'img/field.jpg', 'active':false},
                ]
            }
        },
        'nutrition': {
            'color': 'red',
            'content': 'Valori nutrizionali',
            'image': $scope.iconhome + 'nutrition_icon.png',
            'link': 'nutrition',
            'valid': true,
            'side': 'right'
        },
        'co2impact': {
            'color': 'brown',
            'content': 'Impatto CO2',
            'image': $scope.iconhome + 'co2impact_icon.png',
            'link': 'co2impact',
            'valid': true,
            'side': 'left'
        },
        'ingredient': {
            'color': 'purple',
            'content': 'Ingredienti particolari',
            'image': $scope.iconhome + 'ingredient_icon.png',
            'link': 'ingredient',
            'valid': true,
            'side': 'right'
        },
        'water': {
            'color': 'blue',
            'content': 'Utilizzo acqua',
            'image': $scope.iconhome + 'water_icon.png',
            'link': 'water',
            'valid': true,
            'side': 'left'
        },
        'recipe': {
            'color': 'dark-green',
            'content': 'Ricette',
            'image': $scope.iconhome + 'recipe_icon.png',
            'link': 'recipe',
            'valid': true,
            'side': 'right'
        }
    };

    $scope.current = $scope.tiles[$state.current.name];
    // console.log($scope.current);

    $scope.deactivateCurrent = function(carousel, len){
        for (var i = 0; i < len; i++){
            if (carousel[i].active === true){
                carousel[i].active = false;
                console.log(i);
                return i;
            }
        }
    };

    $scope.activateNext = function(){
        var carousel = $scope.current.data.carousel;
        var len = carousel.length;
        var i = $scope.deactivateCurrent(carousel, len);
        carousel[ (i+1)%len ].active=true;

    };

    $scope.activatePrev = function(){
        var carousel = $scope.current.data.carousel;
        var len = carousel.length;
        var i = $scope.deactivateCurrent(carousel, len);
        carousel[ (i-1+len)%len ].active=true;
    };

    $scope.printCarousel = function(){
        console.log($scope.current.data.carousel);
    };
});


app.controller('socialCtrl', function($scope){
    $scope.iconhome = 'img/icons/';
    $scope.social = [
        {
            'name': 'facebook', 
            'icon': $scope.iconhome + 'social_facebook.png'
        }, 
        {
            'name': 'instagram', 
            'icon': $scope.iconhome + 'social_instagram.png'
        }, 
        {
            'name': 'twitter', 
            'icon': $scope.iconhome + 'social_twitter.png'
        }
    ];
});
app.controller('profileCtrl', function($scope) {
    $scope.iconhome = 'img/icons/';
    $scope.contacts = [
        {
            'image': $scope.iconhome + '../farm-logo.png',
            'link': 'Via indirizzo 12 - Stradella PV'
        },
        {
            'image': $scope.iconhome + '../farm-logo.png',
            'link': '+39 02 6745889'
        },
        {
            'image': $scope.iconhome + '../farm-logo.png',
            'link': 'stefano@rcantineravizza.it'
        },
        {
            'image': $scope.iconhome + '../farm-logo.png',
            'link': 'Via indirizza 12 - Stradella 20100 PV'
        },
        {
            'image': $scope.iconhome + '../farm-logo.png',
            'link': 'www.iltorrino.it'
        }
    ];
});


app.directive('social', function(){
    return {
        restrict: 'AE', 
        replace: 'true', 
        templateUrl: 'templates/social-row.html'

    };
});

app.directive('carousel', function(){
    return {
        restrict:'AE', 
        replace: 'true', 
        templateUrl: 'templates/carousel.html'
    };
});

app.directive('card', function(){
    return {
        restrict: 'AE', 
        replace: 'true', 
        templateUrl: 'templates/card.html'
    };
});

app.directive('header', function(){
    return {
        restrict: 'AE', 
        replace: 'true', 
        templateUrl: 'templates/header.html'
    };
});


