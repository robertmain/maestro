var nodejukeboxApp = angular.module('nodejukeboxApp', []);
 
nodejukeboxApp.controller('SearchResultCtrl', function SearchResultCtrl($scope) {
	$scope.search_results = [];
});

nodejukeboxApp.controller('PlaylistCtrl', function PlaylistCtrl($scope) {
	$scope.playlist = [];
});