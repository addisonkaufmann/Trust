app.controller('dashCtrl', function($scope, $http, $timeout, $rootScope, $stateParams, $state, Icons, Tiles, TileClasses){

    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){
            $state.current = toState;  
        });

    $scope.iconhome = Icons.home();
    $scope.tiles = Tiles.all();

    $scope.menuicon = Icons.menu();

    $scope.current = Tiles.get($state.current.name);
    if ($scope.current && $scope.current.length === 1){
        $scope.current = $scope.current[0];
    }

    $scope.validTiles = Tiles.getValid();

    $scope.numValidTiles = $scope.validTiles.length;

    $scope.tilesize = 'tile-' + $scope.numValidTiles;

    $scope.tileclasses = TileClasses.get($scope.numValidTiles);

    $scope.classes = $scope.tileclasses.classes;
    $scope.first = $scope.tileclasses.first;

    $scope.exitLeft = false;
    $scope.exitRight = false;
    $scope.exitDown = false;

    $scope.animateLink = function(link, first, even) {
        // console.log(link);
        // console.log(side);
        // if (side === 'left'){
        //     $scope.exitLeft = true;
        // } else if (side === 'right'){
        //     $scope.exitRight = true;
        // }

        var animation = '';

        if (first){
            $scope.exitDown = true;
            animation = 'fadeInDown';

        } else {
            if (even){
                $scope.exitRight = true;
                animation = 'fadeInRight'; 
            } else {
                $scope.exitLeft = true;
                animation = 'fadeInLeft';
            }
        }

        $timeout(function() {
            $state.go(link, { animate: animation });
        }, 200);


    };


});

app.controller('summaryCtrl', function($scope, $timeout, $state, data){
    $scope.data = data.data;
    console.log(data);

    $scope.animateExit = false;

    $scope.exit = function(){
        $timeout(function() {
            $state.go('home');
        }, 1000);
    };

});

app.controller('detailCtrl', function($scope, $stateParams, data, Tiles, Icons){
    if ($stateParams.animate){
        $scope.animation = $stateParams.animate;
    } else {
        $scope.animation = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.menuicon = Icons.menu();
    $scope.current=Tiles.get('detail');
    $scope.data = data.data;
    console.log($scope.data);
});

app.controller('carouselCtrl', function($scope){

    $scope.carousel = [
        {'image': 'img/farm.jpg', 'active':true},
        {'image': 'img/river.jpg', 'active': false},
        {'image': 'img/field.jpg', 'active':false},
    ];

    $scope.deactivateCurrent = function(carousel, len){
        for (var i = 0; i < len; i++){
            if (carousel[i].active === true){
                carousel[i].active = false;
                return i;
            }
        }
    };

    $scope.activateNext = function(){
        var carousel = $scope.carousel;
        var len = carousel.length;
        var i = $scope.deactivateCurrent(carousel, len);
        carousel[ (i + 1) % len ].active = true;
    };

    $scope.activatePrev = function(){
        var carousel = $scope.carousel;
        var len = carousel.length;
        var i = $scope.deactivateCurrent(carousel, len);
        carousel[ (i - 1 + len) % len ].active = true;
    };

});


app.controller('recipeCtrl', function($scope, $stateParams, $rootScope, $state, $http,  data, Icons, Tiles){
    $rootScope.$on('$stateChangeSuccess', function(event, toState){
        $state.current=toState;
    });

    if ($stateParams.animate){
        $scope.animation = $stateParams.animate;
    } else {
        $scope.animation = 'fadeIn'; 
    }

    if ($state.current.name === 'recipe.detail'){
        $http({ method : "GET",
            url : 'http://localhost:8080/trust/api/timeline/getTimelineByFarmIdAndMenuRecipeId/15/' + $stateParams.id})
        .then(function mySuccess(response) {
            console.log(response);
            $scope.detail = response.data;
        }, function myError(response) {
            $scope.detail = response.statusText;
        });
    }   

    $scope.iconhome = Icons.home();
    $scope.menuicon = Icons.menu();
    $scope.current = Tiles.get('recipe');
    $scope.data = data.data;
});


app.controller('socialCtrl', function($scope, $state, $location, $window, $rootScope, 
    $anchorScroll, Icons, Social){

    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState){
            $state.current = toState;  
        });

    $scope.state = $state.current.name;

    $scope.iconhome = Icons.home();
    $scope.social = Social.all();

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

    
});


app.controller('profileCtrl', function($scope, $stateParams,Tiles, Icons, Contact, data) {
    
    if ($stateParams.animate){
        $scope.animation = $stateParams.animate;
    } else {
        $scope.animation = 'fadeIn'; 
    }

    $scope.data= data.data;
    $scope.current = Tiles.get('profile');
    $scope.iconhome = Icons.home();
    $scope.menuicon = Icons.menu();

    $scope.contactinfo = [];

    var mything = new Contact('mytype', 'myimg', 'myval');
    console.log(mything);

    if (angular.fromJson($scope.data.address).address){
        $scope.contactinfo.push(
            new Contact('address', $scope.iconhome + '../farm-logo.png', angular.fromJson($scope.data.address).address)
        );
    }

    if ($scope.data.website){
        $scope.contactinfo.push(
            new Contact('address', $scope.iconhome + '../farm-logo.png', $scope.data.website)
        );
    }

    if ($scope.data.phone){
        $scope.contactinfo.push(
            new Contact('phone', $scope.iconhome + '../farm-logo.png', $scope.data.phone)
        );
    }

    if ($scope.data.email){
        $scope.contactinfo.push(
            new Contact('email', $scope.iconhome + '../farm-logo.png', $scope.data.email)
        );
    }
});



app.controller('nutritionCtrl', function($scope, $stateParams, $timeout, Tiles, Icons) {

    if ($stateParams.animate){
        $scope.animation = $stateParams.animate;
    } else {
        $scope.animation = 'fadeIn'; 
    }

    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('nutrition');
    $scope.menuicon = Icons.menu();


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



app.controller('infoCtrl', function($scope, $stateParams, Tiles, Icons, data) {

    if ($stateParams.animate){
        $scope.animation = $stateParams.animate;
    } else {
        $scope.animation = 'fadeIn'; 
    }

    $scope.current = Tiles.get('info');

    $scope.iconhome = Icons.home();
    $scope.menuicon = Icons.menu();

    $scope.data = data.data;
    console.log($scope.data);


    $scope.title = $scope.data.productDescr[0];
    $scope.img = $scope.data.productDescr[1];
    $scope.info = $scope.data.productDescr[2];

});

app.controller('co2impactCtrl', function($scope, $stateParams, Tiles, Icons){
    if ($stateParams.animate){
        $scope.animation = $stateParams.animate;
    } else {
        $scope.animation = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('co2impact');
    $scope.menuicon = Icons.menu();
});

app.controller('ingredientCtrl', function($scope, $stateParams, Tiles, Icons){
    if ($stateParams.animate){
        $scope.animation = $stateParams.animate;
    } else {
        $scope.animation = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('ingredient');
    $scope.menuicon = Icons.menu();
});

app.controller('waterCtrl', function($scope, $stateParams, Tiles, Icons){
    console.log($stateParams.animate);
    if ($stateParams.animate){
        $scope.animation = $stateParams.animate;
    } else {
        $scope.animation = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('water');
    $scope.menuicon = Icons.menu();
});


