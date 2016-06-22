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