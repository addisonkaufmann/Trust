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


app.controller('co2impactCtrl', function($scope, $stateParams, Tiles, Icons, Charts){
    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('co2impact');
    $scope.menuicon = Icons.menu();

    $scope.chart = [{
        name: 'CO2',
        color: 'rgba(244, 89, 64, 1)',
        data: 15,
        total: 20,
        valid: true
    }];

    $(window).resize(function() { return Charts.resizeFunction($scope.chart); });
    Charts.createCharts($scope, $scope.chart);
});



app.controller('dashCtrl', function($scope, screenSize, $http, $timeout, $rootScope, $stateParams, $state, Icons, Tiles, TileClasses){

    $scope.size = '';

    if (screenSize.is('xs')) {$scope.size = 'xs';}
    if (screenSize.is('sm')) {$scope.size = 'sm';}
    if (screenSize.is('md')) {$scope.size = 'md';}
    if (screenSize.is('lg')) {$scope.size = 'lg';}

    screenSize.on('xs', function() {$scope.size = 'xs'; });
    screenSize.on('sm', function() {$scope.size = 'sm'; });
    screenSize.on('md', function() {$scope.size = 'md'; });
    screenSize.on('lg', function() {$scope.size = 'lg'; });


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

    $scope.animateLink = function(link, first, even) {

        var animateIn = '';
        var animateOut = '';

        if ($scope.size === 'xs' || $scope.size === 'sm'){
            if (even){
                $scope.animateDash = 'fadeOutLeft';
                animateIn = 'fadeInRight';
                animateOut = 'fadeOutRight'; 

            } else {
                $scope.animateDash = 'fadeOutRight';
                animateIn = 'fadeInLeft';
                animateOut = 'fadeOutLeft';
            }
        } else {
            $scope.animateDash = 'fadeOut';
            animateIn = 'fadeIn';
            animateOut = 'fadeOut';

        }
        console.log('going out with ' + animateOut);

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



app.controller('nutritionCtrl', function($scope, $stateParams, Tiles, Icons, Charts) {

    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }

    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('nutrition');
    $scope.menuicon = Icons.menu();

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

    $(window).resize(function() { return Charts.resizeFunction($scope.charts); });


    //must wait until the ng-repeat directive is finished, otherwise none
    //of the elements will be rendered on the page. In this case, all of the 
    //if(someElement.length) statements will evaluate to false because they do not
    //exist yet
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        Charts.createCharts($scope, $scope.charts);
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
            return 'http://localhost:8080/trust/api/file/getImageWithFarm/' + obj.farmId + '/normal/' + obj.image;
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



app.controller('summaryCtrl', function($window, $scope, $timeout, $state, data){
    $scope.data = data.data;
    // console.log($window.innerWidth);




    var imgUrl = 'http://localhost:8080/trust/api/file/getImageWithFarm/'+ $scope.data.id + '/normal/';
    $scope.logo= '';
    if ($scope.data.logo){
        $scope.logo =  imgUrl + $scope.data.logo;
    }

    $scope.animateExit = false;

    $scope.exit = function(){
        $scope.animateExit = true;
        $timeout(function() {
            $state.go('home');
        }, 1000);
    };

});



app.controller('waterCtrl', function($scope, $stateParams, Tiles, Icons, Charts){
    if ($stateParams.animateIn){
        $scope.animateIn = $stateParams.animateIn;
    } else {
        $scope.animateIn = 'fadeIn'; 
    }
    $scope.iconhome = Icons.home();
    $scope.current = Tiles.get('water');
    $scope.menuicon = Icons.menu();

    $scope.chart = [{
        name: 'Water',
        color: 'rgba(1, 259, 164, 1)',
        data: 7,
        total: 20,
        valid: true
    }];

    $(window).resize(function() { return Charts.resizeFunction($scope.chart); });
    Charts.createCharts($scope, $scope.chart);
});



app.controller('cardCtrl', function($scope){
    $scope.expand = false;
});




