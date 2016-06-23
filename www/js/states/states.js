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
            controller: 'infoCtrl',
            templateUrl: 'templates/info.html',
            resolve: {
                data: function($http) {
                    return $http({method: 'GET', url: 'http://trust.techgapint.com/trust/api/timeline/getTimelineByFarmIdAndProductionId/1/243'});
                }
            }
        })

        .state('profile', {
            url: '/profile',
            controller: 'profileCtrl',
            templateUrl: 'templates/profile.html',
            resolve: {
                data: function($http){
                    return $http({method: 'GET', url: 'http://localhost:8080/trust/api/farm/public/13'});
                }
            }
        })

        .state('detail', {
            url: '/detail',
            controller: 'detailCtrl',
            templateUrl: 'templates/detail.html',
            resolve: {
                data: function($http){
                    return $http({method: 'GET', url: 'http://trust.techgapint.com/trust/api/timeline/getTimelineByFarmIdAndProductionId/13/171'});
                }
            }
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
            }
        });
        
});
