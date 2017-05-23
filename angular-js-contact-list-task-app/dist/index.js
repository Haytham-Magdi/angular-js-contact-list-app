
(function () {


angular.module('myApp');

app.controller('myCtrl', ['$scope', '$http',
    function ($scope, $http) {
  
    $http({method: 'GET', url: 'contacts.json'}).
                    then(function(response) {
                        $scope.data = response.data;
                        // console.log("Read file", $scope.url, "successfully.");
                        console.log("Read file successfully.");
                        console.log($scope.data);
                    }, function(response) {
                        $scope.data = response.data || "Request failed";
                        console.log("Error reading.");
                    });


        $scope.carname = "Volvo";
    }]

);










})();
