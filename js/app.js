/*
app.js, main Angular application script
define your module and controllers here
*/
"use strict";

angular.module('App1', ['ui.bootstrap'])
.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'xMbe73waTmoZKeMgLhj0fa4AChPcBUgXimOjdVPT';
    $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'QOsKZimqGNzneqGGbum5zygQqRUJb8FkmptPKYVj';
    
})

.controller('CommentsController', function($scope, $http) {
    var commentsUrl = 'https://api.parse.com/1/classes/comments';
    $scope.refreshComments = function() {
        $scope.loading = true;
        $http.get(commentsUrl + '?order=-score')
        .success(function(data) {
            $scope.comments = data.results;
        })
        .error(function(err) {
            $scope.errorMessage = err;
        })
        .finally(function() {
            $scope.loading = false;
        });
    };

    $scope.refreshComments();    
    $scope.newComment = {score: 0};
    $scope.addComment = function() {
        if($scope.newComment.rating) {
            $scope.loading = true;
            $http.post(commentsUrl, $scope.newComment)
            .success(function(responseData) {
                $scope.newComment.objectId = responseData.objectId;
                $scope.comments.push($scope.newComment);
                $scope.newComment = {score: 0};
            })

            .error(function(err) {
                $scope.errorMessage(err);
                console.log(err);
            })

            .finally(function () {
                $scope.loading = false;
                $scope.refreshComments();
            });
        }
    };
    
    $scope.removeComment = function(comment) {
        if(confirm("Do you want to create a biased rating for this product?")) {
            $scope.loading = true;
            $http.delete(commentsUrl + '/' + comment.objectId, comment)
            .success(function(responseData) {
                $scope.refreshComments();
            })
            .error(function(err) {
                $scope.errorMessage(err);
                console.log(err);
            })
        }
    };
    
    $scope.incrementScore = function(comment, amount) {
        if(comment.score === 0) {
            comment.score = 0;
        }
        $http.put(commentsUrl + '/' + comment.objectId, { score: { __op: "Increment", amount: amount} })
        .success(function(responseData) {
            comment.score = responseData.score;
        })
        .error(function(err) {
            console.log(err);
        })
    };
});
