angular.module('bigpanda', [])
    .service('CommentService', function ($http) {
        var self = this;
        this.comments = null;
        
        this.getComments = function () {
            return this.comments;
        };
        
        this.addComment = function (comment) {
            comment.avatar = "https://www.gravatar.com/avatar/" + md5(comment.email);
            $http
                .post('/save', comment)
                .success(function (data, status, headers, config) {});
            self.comments.push(comment);
        };

        $http
            .get('/get-comments')
            .success(function (data, status, headers, config) {
                self.comments = data;
            });
    })
    .controller('MainCtrl', function ($scope, CommentService) {
        $scope.comment = {};
        $scope.comments = CommentService;

        $scope.addComment = function () {
            CommentService.addComment($scope.comment);
            $scope.comment = {};
        }

    })


;