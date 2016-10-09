angular.module('bigpanda', [])
    .controller('MainCtrl', function ($scope, $http) {
        $scope.comments = [];
        $scope.comment = {};
        $scope.loading = true;

        $scope.addComment = function () {
            $scope.comment.avatar = "https://www.gravatar.com/avatar/" + md5($scope.comment.email);
            $http
                .post('/save', $scope.comment)
                .success(function (data, status, headers, config) {});
            $scope.comments.push($scope.comment);
            $scope.comment = {};
        };


        $http
            .get('/get-comments')
            .success(function (data, status, headers, config) {
                $scope.comments = data;
                $scope.loading = false;
            });
    })


;