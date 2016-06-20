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
        });
        
        // nested list with custom controller
        // .state('home.list', {
        //     url: '/list',
        //     templateUrl: 'templates/partial-home-list.html',
        //     controller: function($scope) {
        //         $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        //     }
        // })

       
        
        // nested list with just some random string data
        // .state('home.paragraph', {
        //     url: '/paragraph',
        //     template: 'I could sure use a drink right now.'
        // })

        // .state('home.profile', {
        //     url: '/profile',
        //     templateUrl: 'templates/profile.html'
        // })

        // .state('home.dashboard', {
        //     url: '/dashboard',
        //     templateUrl: 'templates/dashboard.html'
        // })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('about', {
        //     url: '/about',
        //     views: {
        //         '': { templateUrl: 'templates/partial-about.html' },
        //         'columnOne@about': { template: 'Look I am a column!' },
        //         'columnTwo@about': { 
        //             templateUrl: 'templates/table-data.html',
        //             controller: 'scotchController'
        //         }
        //     }
            
        // });
        
});

app.controller('dashCtrl', function($scope, $rootScope, $stateParams, $state){

    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){
            $state.current = toState;
            // console.log($state.current);
        });

    $scope.iconhome = 'img/icons/';
    $scope.tiles = [
        {   
            'color': 'light-green',
            'content': 'Azienda agricola',
            'link': 'profile',
            'image': $scope.iconhome + 'profile_icon.png' ,
            'valid': true,
            'side': 'left'
        },
        {
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
        {
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
        {
            'color': 'red',
            'content': 'Valori nutrizionali',
            'image': $scope.iconhome + 'nutrition_icon.png',
            'link': 'nutrition',
            'valid': true,
            'side': 'right'
        },
        {
            'color': 'brown',
            'content': 'Impatto CO2',
            'image': $scope.iconhome + 'co2impact_icon.png',
            'link': 'co2impact',
            'valid': true,
            'side': 'left'
        },
        {
            'color': 'purple',
            'content': 'Ingredienti particolari',
            'image': $scope.iconhome + 'ingredient_icon.png',
            'link': 'ingredient',
            'valid': true,
            'side': 'right'
        },
        {
            'color': 'blue',
            'content': 'Utilizzo acqua',
            'image': $scope.iconhome + 'water_icon.png',
            'link': 'water',
            'valid': true,
            'side': 'left'
        },
        {
            'color': 'dark-green',
            'content': 'Ricette',
            'image': $scope.iconhome + 'recipe_icon.png',
            'link': 'recipe',
            'valid': true,
            'side': 'right'
        }
    ];



    $scope.current = $scope.tiles.filter(function(obj){
        return obj.link === $state.current.name;
    });

    if ($scope.current){
            $scope.current=$scope.current[0];
            console.log($scope.current);
    }



    $scope.validTiles = $scope.tiles.filter(function(obj){
        return obj.valid === true;
    });


    $scope.numValidTiles = $scope.validTiles.length;

    $scope.setSides = function(array, len){
	    var i = 0;        
	    for (i; i < len; i++){
	        if (i%2 === 0){
	            array[i].side = 'left'; 
	        } else {
	            array[i].side = 'right';
	        }
	    } 
	    console.log($scope.validTiles);
   };

    if ($scope.numValidTiles === 5 || $scope.numValidTiles === 7){
    	$scope.smallTiles = $scope.validTiles.slice(1,$scope.numValidTiles);
    	$scope.bigTile = $scope.validTiles[0];
    	console.log($scope.validTiles);
    	console.log($scope.smallTiles);
    	console.log($scope.bigTile);
    	$scope.setSides($scope.smallTiles, $scope.smallTiles.length);
    } else {
    	$scope.setSides($scope.validTiles, $scope.validTiles.length);
    }
    // console.log($scope.numValidTiles);


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
});


app.controller('socialCtrl', function($scope, $location, $window, $rootScope, $anchorScroll){
    $scope.iconhome = 'img/icons/';
    $scope.expand = false;

    angular.element($window).bind('resize', function () {
    	console.log($window.innerHeight);	
	});

	

    $scope.showExpand = function(){
        $scope.expand = true;
        // console.log('expand is now ' + $scope.expand + '; innerheight: ' + $window.innerHeight);
    };

    $scope.hideExpand = function(){
        $scope.expand = false;
        console.log('expand is now ' + $scope.expand);
    };

    $scope.scrollToBottom = function(){
		console.log($window.innerHeight);
	    $("html,body").animate({ scrollTop: $window.innerHeight}, "slow");
    };

    $scope.scrollToTop = function(){
	    $("html,body").animate({ scrollTop: 0}, "slow");
    };



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
        },
        {
            'name': 'pinterest', 
            'icon': $scope.iconhome + 'social_pinterest.png'
        },
        {
            'name': 'reddit', 
            'icon': $scope.iconhome + 'social_reddit.png'
        },
        {
            'name': 'googleplus', 
            'icon': $scope.iconhome + 'social_googleplus.png'
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

// app.directive('scrollOnClick', function() {
//   return {
//     restrict: 'A',
//     link: function(scope, $elm) {
//       $elm.on('click', function() {
//         console.log("trying to scroll");
//         $("body").animate({scrollTop: $elm.getBoundingClientRect().top}, "slow");
//       });
//     }
//   };
// });



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

app.directive('eighttiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/8-tiles.html'
    };
});

app.directive('sixtiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/6-tiles.html'
    };
});

app.directive('fourtiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/4-tiles.html'
    };
});


app.directive('threetiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/3-tiles.html'
    };
});

app.directive('twotiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/2-tiles.html'
    };
});

app.directive('fivetiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/5-tiles.html'
    };
});

app.directive('seventiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/7-tiles.html'
    };
});

