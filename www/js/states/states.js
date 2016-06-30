app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/summary');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ===========================

        .state('summary', {
            url: '/summary',
            controller: 'summaryCtrl',
            templateUrl: 'templates/summary.html',
            resolve: {
                data: function($http){
                    return $http({method: 'GET', url: 'http://localhost:8080/trust/api/farm/public/13'});
 
                }
            } 
        })

        .state('info', {
            url: '/info',
            controller: 'infoCtrl',
            templateUrl: 'templates/info.html',
            params: {
                animateIn: '',
                animateOut: ''
            },
            resolve: {
                data: function($http){
                    return $http({method: 'GET', url: 'http://localhost:8080/trust/api/timeline/getTimelineByFarmIdAndProductionId/13/171'});

                }
            }
        })

        .state('profile', {
            url: '/profile',
            controller: 'profileCtrl',
            templateUrl: 'templates/profile.html',
            params: {
                animateIn: '',
                animateOut: ''
            },
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
            params: {
                animateIn: '',
                animateOut: ''
            },
            resolve: {
                data: function($http){
                    return $http({method: 'GET', url: 'http://localhost:8080/trust/api/timeline/getTimelineByFarmIdAndProductionId/13/171'});
                }
            }
        })
        
        .state('ingredient', {
            url: '/ingredient',
            controller: 'ingredientCtrl',
            templateUrl: 'templates/ingredient.html',
            params: {
                animateIn: '',
                animateOut: ''
            }
        })
        
        .state('recipe', {
            url: '/recipe',
            controller: 'recipeCtrl',
            templateUrl: 'templates/recipe.html', 
            params: {
                defaultChild: 'recipe.list',
                animateIn: '',
                animateOut: ''
            },
            resolve: {
                data: function($http){
                    return $http({method: 'GET', url: 'http://localhost:8080/trust/api/timeline/getRecipeByFarmIdAndProductionId/15/221/0/2'});
                }
            }
        })

        .state('recipe.list', {
            url:'/list', 
            controller: 'recipeCtrl', 
            templateUrl: 'templates/recipe-list.html',
        })

        .state('recipe.detail', {
            url: '/detail', 
            controller: 'recipeCtrl', 
            templateUrl: 'templates/recipe-detail.html',
            params: {
                'id': 0
            }
        })

        .state('nutrition', {
            url: '/nutrition',
            controller: 'nutritionCtrl',
            templateUrl: 'templates/nutrition.html',
            params: {
                animateIn: '',
                animateOut: ''
            }
        })

        .state('water', {
            url: '/water',
            controller: 'waterCtrl',
            templateUrl: 'templates/water.html',
            params: {
                animateIn: '',
                animateOut: ''
            }
        })

        .state('co2impact', {
            url: '/co2impact',
            controller: 'co2impactCtrl',
            templateUrl: 'templates/co2impact.html',
            params: {
                animateIn: '',
                animateOut: ''
            }
        })

        .state('home', {
            url: '/home',
            templateUrl: 'templates/dashboard.html',
            controller: 'dashCtrl',
            params: {
                animateIn: '',
                animateOut: ''
            }
        });
        
});
