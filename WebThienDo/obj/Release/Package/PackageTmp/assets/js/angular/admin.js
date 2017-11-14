
App.controller("AdminController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.loginInfo = {};

            $scope.getLoginInfo = function () {
                return {
                    username: $.cookie('username'),
                    token: $.cookie('token'),
                    lastLogin: $.cookie('lastLogin')
                }
            };

            $scope.isLogged = function () {
                $scope.loginInfo = $scope.getLoginInfo();
                if ($scope.loginInfo.username != undefined && $scope.loginInfo.token != undefined) {
                    return true;
                }
                return false;
            };

            $scope.onLoad = function () {
                if (!$scope.isLogged()) {
                    toastr.warning('Bạn chưa đăng nhập hệ thống!');
                    $timeout(() => {
                        window.location.href = window.location.origin + '/Login';
                    }, 2000);
                }
            };

            $scope.onLoad();

        }
    ]
);
