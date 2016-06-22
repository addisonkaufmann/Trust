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
                data: function($http){
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
            }
        });
        
});
