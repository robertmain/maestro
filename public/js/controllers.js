var nodejukeboxApp = angular.module('nodejukeboxApp', []);
 
nodejukeboxApp.controller('VideoListCtrl', function VideoListCtrl($scope) {
  $scope.videos = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
  ];
});