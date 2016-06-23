app.controller('dashCtrl', function($scope, $http, $rootScope, $stateParams, $state, 
    bulkServ, iconhomeServ){

    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){
            $state.current = toState;  
        });

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
});



app.controller('detailCtrl', function($scope, data, bulkServ, iconhomeServ){

    $scope.iconhome = iconhomeServ.iconhome;
    $scope.menuicon = $scope.iconhome + 'menu_icon.png';
    $scope.current=bulkServ.detail;
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


app.controller('recipeCtrl', function($scope,$stateParams, $rootScope, $state, $http,  data, bulkServ, iconhomeServ){
    $rootScope.$on('$stateChangeSuccess', function(event, toState){
        if (toState.params && toState.params.defaultChild){
            $state.go(toState.params.defaultChild);     
        }
        $state.current=toState;
    });
    // console.log($stateParams);

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


    $scope.iconhome = iconhomeServ.iconhome;
    $scope.menuicon = $scope.iconhome + 'menu_icon.png';
    $scope.current=bulkServ.recipe;
    $scope.data = data.data;
    // console.log($scope.data.list);
    // $scope.currentItem = {};
    // $scope.cacheItem = function(item){
    //     $scope.currentItem=item;
    //     console.log(item);
    //     $state.go('recipe.detail',{id : item.id} );
    // };
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





app.controller('profileCtrl', function($scope, bulkServ, iconhomeServ, data) {
    console.log(data);
    $scope.data= data.data;
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





app.controller('infoCtrl', function($scope, bulkServ, iconhomeServ, data) {

    $scope.current = bulkServ.info;

    $scope.iconhome = iconhomeServ.iconhome;
    $scope.menuicon = $scope.iconhome + 'menu_icon.png';

    $scope.data = data.data.productDescr;

});


