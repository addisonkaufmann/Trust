var app = angular.module('app', ['ui.router', 'ngSanitize']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/summary');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ===========================

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
            controller: 'profileCtrl',
            templateUrl: 'templates/profile.html',
            resolve: {
                blurb: function($http){
                    return $http({method: 'GET', url: 'http://localhost:8080/trust/api/farm/public/1'});
                }
            }
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
            controller: 'nutritionCtrl',
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
            controller: 'dashCtrl',
            resolve: {
                // blurb:  function($http){
                //     // $http returns a promise for the url data

                //     var url = 'http://trust.techgapint.com/trust/api/farm/public/1/jsonp?callback=?';
                //     $.getJSON(url, function(jsonp){
                //         $("#jsonp-response").html(JSON.stringify(jsonp, null, 2));
                //     // return $http.jsonp('http://trust.techgapint.com/trust/api/farm/public/1');
                //     });
                // }
            }
        });
        
});

//  ===================  CONTROLLERS  ===================

app.controller('dashCtrl', function($scope, $http, $rootScope, $stateParams, $state, 
    bulkServ, iconhomeServ){

    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){
            $state.current = toState;  
        });

    //to be deleted upon completion of merge

    // $scope.tiles = {
    //     'profile': bulkServ.profile,
    //     'info': bulkServ.info,
    //     'detail': bulkServ.detail,
    //     'nutrition': bulkServ.nutrition,
    //     'co2impact': bulkServ.co2impact,
    //     'ingredient': bulkServ.ingredient,
    //     'water': bulkServ.water,
    //     'recipe': bulkServ.recipe
    // };

    // var url = 'http://trust.techgapint.com/trust/api/farm/public/1?alt=json&callback=JSON_CALLBACK';
    // $http.jsonp(url).success(function(data) {
    //     $scope.results = data.feed.entry;
    // });
    $scope.iconhome = iconhomeServ.iconhome;

 
    $scope.tiles = [
        bulkServ.profile,
        bulkServ.info,
        bulkServ.detail,
        bulkServ.nutrition,
        bulkServ.co2impact,
        bulkServ.ingredient,
        bulkServ.water,
        bulkServ.recipe
    ];

    $scope.menuicon = $scope.iconhome + 'menu_icon.png';




    //sets $scope.current to an array holding one object whose 
    //link (i.e 'profile', 'water') is the same as the name 
    //of the current state (also 'profile', 'water', etc)
    $scope.current = $scope.tiles.filter(function(obj){
        return obj.link === $state.current.name;
    });

    //changes $scope.current from an array of
    //one object to just a regular object
    if ($scope.current){
        $scope.current = $scope.current[0];
    }



    //used for the layout of the tiles on the dashboard when
    //there are a variable number of tiles present

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
   };

   if ($scope.numValidTiles === 5 || $scope.numValidTiles === 7){
        $scope.smallTiles = $scope.validTiles.slice(1, 
            $scope.numValidTiles);
        $scope.bigTile = $scope.validTiles[0];
        $scope.setSides($scope.smallTiles, $scope.smallTiles.length);
    }
    else {
        $scope.setSides($scope.validTiles, $scope.validTiles.length);
    }




    //code for the picture carousels

    $scope.deactivateCurrent = function(carousel, len){
        for (var i = 0; i < len; i++){
            if (carousel[i].active === true){
                carousel[i].active = false;
                return i;
            }
        }
    };

    $scope.activateNext = function(){
        var carousel = $scope.current.data.carousel;
        var len = carousel.length;
        var i = $scope.deactivateCurrent(carousel, len);
        carousel[ (i + 1) % len ].active = true;
    };

    $scope.activatePrev = function(){
        var carousel = $scope.current.data.carousel;
        var len = carousel.length;
        var i = $scope.deactivateCurrent(carousel, len);
        carousel[ (i - 1 + len) % len ].active = true;
    };

});




app.controller('socialCtrl', function($scope, $location, $window, $rootScope, 
    $anchorScroll, iconhomeServ){

    $scope.iconhome = iconhomeServ.iconhome;
    $scope.expand = false;
    

    $scope.showExpand = function(){
        $scope.expand = true;
    };

    $scope.hideExpand = function(){
        $scope.expand = false;
    };

    $scope.scrollToBottom = function(){
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





app.controller('profileCtrl', function($scope, bulkServ, iconhomeServ, blurb) {
    console.log(blurb);
    $scope.data= blurb.data;
    $scope.current = bulkServ.profile;
    $scope.iconhome = iconhomeServ.iconhome;
    $scope.menuicon = $scope.iconhome + 'menu_icon.png';
    
    $scope.address=angular.fromJson($scope.data.address);
    console.log($scope.address);

    /*mailing address, phonenumber, email, actual adress, website */
    $scope.contactinfo = [];

    if (angular.fromJson($scope.data.address).address){
        $scope.contactinfo.push({
            'type':'address',
            'img': $scope.iconhome + '../farm-logo.png', 
            'value': angular.fromJson($scope.data.address).address 
        });
    }

    if ($scope.data.website){
        //push to contact
        $scope.contactinfo.push({
            'type':'website',
            'img': $scope.iconhome + '../farm-logo.png', 
            'value': $scope.data.website 
        });
    }

    if ($scope.data.phone){
        //push
        $scope.contactinfo.push({
            'type':'phone',
            'img': $scope.iconhome + '../farm-logo.png', 
            'value': $scope.data.phone 
        });
    }

    if ($scope.data.email){
        //push
        $scope.contactinfo.push({
            'type':'email',
            'img': $scope.iconhome + '../farm-logo.png', 
            'value': $scope.data.email 
        });
    }
});



app.controller('nutritionCtrl', function($scope, bulkServ) {

    $scope.iconhome = bulkServ.iconhome;
    $scope.current = bulkServ.nutrition;
    $scope.menuicon = $scope.iconhome + 'menu_icon.png';


    // ==========  FUNCTIONS  ==========

    function populatePercentages() {
        for (var i = 0; i < $scope.charts.length; i++) {
            $scope.charts[i].percentage = 
                100 * $scope.charts[i].data/$scope.charts[i].total;
        }
    }

    function getDataArray(i) {
        return [$scope.charts[i].data, $scope.charts[i].total - $scope.charts[i].data];
    }

    //used to dynamically resize the charts on the page
    function innerCircleWidth() {
        return $('div.innerPercentage').width();
    }

    function headerHeight() {
        return $('div.innerPercentage h2').height();
    }



    $(window).resize(function() {
        $('div.innerPercentage').css({'height': innerCircleWidth() + 'px'});
        $('div.chart-title').css({'font-size': 0.25*innerCircleWidth() + 'px'});
        $('div.chart-data').css({'font-size': 0.12*innerCircleWidth() + 'px'});
        $('div.innerPercentage h2').css({'font-size': 0.30*innerCircleWidth() + 'px'});
        $('div.innerPercentage h2').css({'margin-top': -0.5*headerHeight() + 'px'});
        populatePercentages();
    });



    $scope.charts = [
        {
            name: 'Calories',
            color: 'rgba(255, 99, 132, 1)',
            data: 2000,
            total: 2000,
            valid: true
        },
        {
            name: 'Protein',
            color: 'rgba(155, 199, 32, 1)',
            data: 24,
            total: 30,
            valid: true
        },
        {
            name: 'Fat',
            color: 'rgba(124, 159, 64, 1)',
            data: 10,
            total: 20,
            valid: true
        }
    ];



    //Some standard formatting settings for all charts
    var options = {
        cutoutPercentage: 90,
        animation: {
            animateScale: true
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        }
    };

    var transparent = 'rgba(0, 0, 0, 0)';



    //must wait until the ng-repeat directive is finished, otherwise none
    //of the elements will be rendered on the page. In this case, all of the 
    //if(someElement.length) statements will evaluate to false because they do not
    //exist yet

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

        if ($('#Calories').length) {
            $scope.calorieChart = new Chart($('#' + $scope.charts[0].name), {
                type: 'doughnut',
                data: {
                    labels: ["", ""],
                    datasets: [{
                        data: getDataArray(0),
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            transparent
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            transparent
                        ],
                        borderWidth: 0
                    }]
                },
                options: options
            });
        }

        if ($('#Protein').length) {
            $scope.proteinChart = new Chart($('#' + $scope.charts[1].name), {
                type: 'doughnut',
                data: {
                    labels: ["", ""],
                    datasets: [{
                        data: getDataArray(1),
                        backgroundColor: [
                            'rgba(155, 199, 32, 1)',
                            transparent
                        ],
                        borderColor: [
                            'rgba(155, 199, 32, 1)',
                            transparent
                        ],
                        borderWidth: 0
                    }]
                },
                options: options
            });
        }

        if ($('#Fat').length) {
            $scope.fatChart = new Chart($('#' + $scope.charts[2].name), {
                type: 'doughnut',
                data: {
                    labels: ["", ""],
                    datasets: [{
                        data: getDataArray(2),
                        backgroundColor: [
                            'rgba(124, 159, 64, 1)',
                            transparent
                        ],
                        borderColor: [
                            'rgba(124, 159, 64, 1)',
                            transparent
                        ],
                        borderWidth: 0
                    }]
                },
                options: options
            });
        }

        $(window).trigger('resize');
    });


}); // end of nutrition controller








//  ===================  SERVICES  ===================

app.service('iconhomeServ', function() {
    this.iconhome = 'img/icons/';
});


app.service('bulkServ', function(iconhomeServ) {

    this.iconhome = iconhomeServ.iconhome;

    this.profile = {
        'color': 'light-green',
        'content': 'Azienda agricola',
        'link': 'profile',
        'image': this.iconhome + 'profile_icon.png' ,
        'valid': true,
        'side': 'left'
    };

    this.info = {
        'color': 'yellow',
        'content': 'Informazioni prodotto',
        'link': 'info',
        'image': this.iconhome + 'info_icon.png',
        'valid': true,
        'side': 'right',
        'data': {
            'carousel': [
                {'image': 'img/farm.jpg', 'active':true},
                {'image': 'img/river.jpg', 'active': false},
                {'image': 'img/field.jpg', 'active':false},
            ]
        }
    };

    this.detail = {
        'color': 'orange',
        'content': 'Dettagli prodotto',
        'image': this.iconhome + 'detail_icon.png',
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
    };

    this.nutrition = {
        'color': 'red',
        'content': 'Valori nutrizionali',
        'image': this.iconhome + 'nutrition_icon.png',
        'link': 'nutrition',
        'valid': true,
        'side': 'right'
    };

    this.co2impact = {
        'color': 'brown',
        'content': 'Impatto CO2',
        'image': this.iconhome + 'co2impact_icon.png',
        'link': 'co2impact',
        'valid': true,
        'side': 'left'
    };

    this.ingredient = {
        'color': 'purple',
        'content': 'Ingredienti particolari',
        'image': this.iconhome + 'ingredient_icon.png',
        'link': 'ingredient',
        'valid': true,
        'side': 'right'
    };

    this.water = {
        'color': 'blue',
        'content': 'Utilizzo acqua',
        'image': this.iconhome + 'water_icon.png',
        'link': 'water',
        'valid': true,
        'side': 'left'
    };

    this.recipe = {
        'color': 'dark-green',
        'content': 'Ricette',
        'image': this.iconhome + 'recipe_icon.png',
        'link': 'recipe',
        'valid': true,
        'side': 'right'
    };

});






//  ===================  DIRECTIVES  ===================


app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
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




//Tile layout directives

app.directive('eighttiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/8-tiles.html'
    };
});

app.directive('seventiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/7-tiles.html'
    };
});

app.directive('sixtiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/6-tiles.html'
    };
});

app.directive('fivetiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/5-tiles.html'
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

