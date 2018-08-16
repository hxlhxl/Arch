
export function setupNgRoutes($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            // templateUrl: 'app/partials/index.html',
            template: require('app/partials/index.html'),
            controller: 'IndexCtrl',
        })
        .when('/login', {
            template: require('app/partials/login.html'),
            controller: 'LoginCtrl'
        })
        .when('/auth/github/callback', {
            template: require('app/partials/oauth.html'),
            controller: 'OauthCtrl'
        })
        .otherwise({
            // templateUrl: 'app/partials/error.html',
            template: require('app/partials/error.html'),
            controller: 'ErrorCtrl'
        });
}
