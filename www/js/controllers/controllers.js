app.controller('carouselCtrl', function($scope, Images){
    $scope.getCarousel = function(obj){
        console.log(obj);
        var car = Images.getAll(obj);
        console.log(car);
        return car;
    };

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






app.controller('co2impactCtrl', function($scope, $stateParams, Tiles, Icons){
    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('co2impact');
    $scope.menuicon = Icons.menu();
});



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

        var animateIn = '';
        var animateOut = '';

        if (first){
            $scope.animateDash = 'fadeOutDown';
            animateIn = 'fadeInDown';
            animateOut = 'fadeOutUp';

        } else {
            if (even){
                $scope.animateDash = 'fadeOutLeft';
                animateIn = 'fadeInRight';
                animateOut = 'fadeOutRight'; 

            } else {
                $scope.animateDash = 'fadeOutRight';
                animateIn = 'fadeInLeft';
                animateOut = 'fadeOutLeft';
            }
        }

        $timeout(function() {
            $state.go(link, { animateIn: animateIn, animateOut: animateOut });
        }, 200);
    };
});



app.controller('detailCtrl', function($rootScope, $scope, $stateParams, data, Tiles, Icons){

    // $scope.expand = false;
    // console.log($scope.expand);



    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.menuicon = Icons.menu();
    $scope.current=Tiles.get('detail');
    $scope.data = data.data;

});



app.controller('headerCtrl', function($scope, $state, $stateParams, $timeout){
    $scope.animateOut = '';

    $scope.goHome = function(){
        if ($stateParams.animateOut){
            $scope.animateOut = $stateParams.animateOut;
        }
        $timeout(function() {
            $state.go('home');
        }, 300);
    };
});



app.controller('infoCtrl', function($scope, $stateParams, Tiles, Icons, data) {


    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }

    $scope.current = Tiles.get('info');

    $scope.iconhome = Icons.home();
    $scope.menuicon = Icons.menu();

    $scope.data = data.data;


    $scope.title = $scope.data.productDescr[0];
    $scope.img = $scope.data.productDescr[1];
    $scope.info = $scope.data.productDescr[2];

});



app.controller('ingredientCtrl', function($scope, $stateParams, Tiles, Icons){
    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('ingredient');
    $scope.menuicon = Icons.menu();
});



app.controller('nutritionCtrl', function($scope, $stateParams, $timeout, Tiles, Icons) {

    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
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
        animateIn: {
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


});



app.controller('profileCtrl', function($scope, $stateParams, Contacts, Tiles, Icons, data) {
    
    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }

    $scope.data = data.data;
    $scope.current = Tiles.get('profile');
    $scope.iconhome = Icons.home();
    $scope.menuicon = Icons.menu();


    var imgUrl = 'http://localhost:8080/trust/api/file/getImageWithFarm/' + $scope.data.id + '/normal/';
    if ($scope.data.logo){
        $scope.logo =  imgUrl + $scope.data.logo;
    } else {
        $scope.logo = '';
    }

    if ($scope.data.presentationImage){
        $scope.profilepic = imgUrl + $scope.data.presentationImage;
    } else {
        $scope.profilepic = 'img/no_image_profile.png';
    }

    $scope.backgroundpic = '';

    $scope.contacts = Contacts.all($scope.data);
});





    



app.controller('recipeCtrl', function($scope, $stateParams, $rootScope, $state, $http,  $q, Recipes, data, Icons, Tiles){
    // console.log('before');
    // console.log(data);
    // console.log('after');
    $scope.iconhome = Icons.home();
    $scope.menuicon = Icons.menu();
    $scope.current = Tiles.get('recipe');
    $scope.data = data.data;


    Recipes.getAll($scope.data.totalItems).then(function(d) {
        $scope.tester = d;
        $scope.data = d.data;
        // console.log(d.data);
    }); 


    // console.log($scope.tester);

    $scope.getImage = function(obj){
        if (obj.image){
            return 'http://localhost:8080/trust/api/file/getImageWithFarm/' 
            + obj.farmId + '/normal/' + obj.image;
        } else {
            return 'img/no_image_recipe.png';
        }
    };




    $rootScope.$on('$stateChangeSuccess', function(event, toState){
        $state.current=toState;   
    });

    if ($state.current.name === 'recipe.detail' && $stateParams.id === 0){
        $state.go('recipe.list');
    }

    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }

    if ($state.current.name === 'recipe.detail'){
        $http({ method : "GET",
            url : 'http://localhost:8080/trust/api/timeline/getTimelineByFarmIdAndMenuRecipeId/15/' + $stateParams.id})
        .then(function mySuccess(response) {
            $scope.detail = response.data;
        }, function myError(response) {
            $scope.detail = response.statusText;
        });
    }   

    if ($stateParams.id){
        $scope.id = $stateParams.id;
    }


    
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



app.controller('summaryCtrl', function($scope, $timeout, $state, data){
    $scope.data = data.data;

    var imgUrl = 'http://localhost:8080/trust/api/file/getImageWithFarm/'+ $scope.data.id + '/normal/';
    $scope.logo =  imgUrl + $scope.data.logo;

    $scope.animateExit = false;

    $scope.exit = function(){
        $timeout(function() {
            $state.go('home');
        }, 1000);
    };

});



app.controller('waterCtrl', function($scope, $stateParams, Tiles, Icons){
    // console.log($stateParams.animateIn);
    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('water');
    $scope.menuicon = Icons.menu();
});

app.controller('cardCtrl', function($scope){
    $scope.expand = false;
 
});




