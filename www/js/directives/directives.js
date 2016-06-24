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

app.directive('eventiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/even-tiles.html'
    };
});

app.directive('oddtiles', function(){
    return {
        restrict: 'AE',
        replace: 'true', 
        templateUrl: 'templates/tiles/odd-tiles.html'
    };
});

