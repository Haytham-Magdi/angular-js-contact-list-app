
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

    .controller('myCtrl', ['$anchorScroll', '$scope', '$http',
        function ($anchorScroll, $scope, $http, mainUrl) {

            $scope.newContact = {
                firstName: 'hhh'
            }

            $scope.ComposeCharListItemLabelId = function(ch) {
                return 'lbl_' + ch;
            } 

            $scope.scrollToChar = function(ch) {
                $anchorScroll($scope.ComposeCharListItemLabelId(ch));
            } 

            $http({method: 'GET', url: 'http://localhost:3300/contacts'}).
            // $http({method: 'GET', url: mainUrl + '/contacts'}).
                then(function(response) {
                    $scope.fileContacts = response.data.data;
    
                    $scope.allContacts = $scope.fileContacts;

                    $scope.prepareFromAllContacts();

                }, function(response) {
                    // $scope.data = response.data || "Request failed";
                    $scope.errorMsg = "Error reading contacts.";
                });


            $scope.filterContacts = function(contacts) {
                return contacts.filter(function (elm) {
                    return elm.firstName && elm.lastName;
                });
            }

            $scope.extractAlphabetsFromContacts = function(contacts) {
                var c1;
                return contacts.map(function(elm, i){
                    return elm.firstName.slice(0, 1).toUpperCase()
                })
                .sort(function (a, b) { 
                    var v1 = (b > a) ? -1 : 1;
                    return v1;
                })
                .filter(function(elm){
                    var ret;
                    if(c1) {
                        ret = elm !== c1;
                    }
                    else {
                        ret = true;
                    }
                    c1 = elm;
                    return ret;
                });
            }

            $scope.prepareFromAllContacts = function() {

                $scope.filteredContacts = $scope.filterContacts($scope.allContacts);

                // var alphArr = [];
                // for (var idx='A'.charCodeAt(0),end='Z'.charCodeAt(0); idx <=end; ++idx) {
                //     alphArr.push(String.fromCharCode(idx));
                // } 
                // // alphArr.join();

                // $scope.alphabetList = alphArr;

                $scope.alphabetList = $scope.extractAlphabetsFromContacts($scope.filteredContacts);



                $scope.contactListItems = $scope.alphabetList
                // .filter(function (elm) {
                //     return elm.firstName && elm.lastName;
                // })
                .map(function (elm, i) {
                    return {
                        // type: 'char',
                        char: elm,
                        dispName: elm,
                    };
                })




                $scope.contactListItems = $scope.contactListItems.concat($scope.filteredContacts
                // .filter(function (elm) {
                //     return elm.firstName && elm.lastName;
                // })
                // .map(function (elm, i) {
                //     elm.firstName = elm.firstName || '';
                //     elm.lastName = elm.lastName || '';
                //     return elm;
                // })
                .map(function (elm, i) {
                    return {
                        // "type": 'contact',
                        "contact": elm,
                        "dispName": elm.firstName + ' ' + elm.lastName,
                    };
                })
                )
                .sort(function (a, b) { 
                    var v1 = (b.dispName.toLowerCase() > a.dispName.toLowerCase()) ? -1 : 1;
                    return v1;
                });


            }




            $http({method: 'GET', url: 'http://localhost:3300/recent-contact'}).
                then(function(response) {
                    $scope.recentContacts = response.data.data
                    .filter(function (elm) {
                        return elm.firstName && elm.lastName;
                    })
                    // .map(function (elm, i) {
                    //     elm.firstName = elm.firstName || '';
                    //     elm.lastName = elm.lastName || '';
                    //     return elm;
                    // })
                    .sort(function (a, b) { 
                        // var v1 = ((b.firstName || ' ').toLowerCase() > (a.firstName || ' ').toLowerCase()) ? -1 : 1;
                        var v1 = (b.firstName.toLowerCase() > a.firstName.toLowerCase()) ? -1 : 1;
                        return v1;
                    });
                }, function(response) {
                    // $scope.data = response.data || "Request failed";
                    $scope.errorMsg = "Error reading recent contacts.";
                });

        }]

    );










})();
