
(function () {


angular.module('myApp')

    .constant("mainUrl", "http://localhost:3300")

    // .directive('myEnter', function () {
    //     return function (scope, element, attrs) {
    //         element.bind("keydown keypress", function (event) {
    //             if(event.which === 13) {
    //                 scope.$apply(function (){
    //                     scope.$eval(attrs.myEnter);
    //                 });

    //                 event.preventDefault();
    //             }
    //         });
    //     };
    // })

    .controller('myCtrl', ['$scope', '$http',
        function ($scope, $http, mainUrl) {
    
            $http({method: 'GET', url: 'http://localhost:3300/contacts'}).
            // $http({method: 'GET', url: mainUrl + '/contacts'}).
                then(function(response) {
                    $scope.allContacts = response.data.data;
                    $scope.contacts = $scope.allContacts.sort(function (a, b) { return b.firstName - a.firstName });
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

            var alphArr = [];
            for (var idx='A'.charCodeAt(0),end='Z'.charCodeAt(0); idx <=end; ++idx) {
                alphArr.push(String.fromCharCode(idx));
            } 
            // alphArr.join();
            $scope.alphabetList = alphArr;


        }]

    );










})();
