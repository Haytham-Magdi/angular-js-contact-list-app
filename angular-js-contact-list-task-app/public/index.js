
(function () {


angular.module('myApp')

    .constant("mainUrl", "http://localhost:3300")

    .controller('myCtrl', ['$scope', '$http',
        function ($scope, $http, mainUrl) {
    
            $http({method: 'GET', url: 'http://localhost:3300/contacts'}).
            // $http({method: 'GET', url: mainUrl + '/contacts'}).
                then(function(response) {
                    $scope.allContacts = response.data.data;
                    $scope.contacts = $scope.allContacts;
                }, function(response) {
                    // $scope.data = response.data || "Request failed";
                    $scope.errorMsg = "Error reading contacts.";
                });

            $http({method: 'GET', url: 'http://localhost:3300/recent-contact'}).
                then(function(response) {
                    $scope.recentContacts = response.data.data;
                }, function(response) {
                    // $scope.data = response.data || "Request failed";
                    $scope.errorMsg = "Error reading recent contacts.";
                });
        }]

    );










})();
