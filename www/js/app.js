var app = angular.module('app', ['ui.router', 'ngSanitize', 'matchMedia', 'angular-loading-bar','chart.js', 'pascalprecht.translate']);


// $(window).load(function() {
//     $('body').addClass('loaded');
// });


app.config(function($translateProvider){
	var url = 'http://localhost:8080/trust/api/language/13/';

	$translateProvider.useStaticFilesLoader({
		prefix : url,
		suffix : ''
	});

	// $translateProvider.useUrlLoader(url);
	$translateProvider.preferredLanguage('en');


	// traslate, default language
	// $translateProvider.preferredLanguage('it');

	// traslate, sanitize strategy
	$translateProvider.useSanitizeValueStrategy('sanitize');

});

