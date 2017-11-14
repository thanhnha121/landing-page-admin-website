
App.controller("EmailController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.listEmails = [];

            $scope.deleteCateClick = function(c) {
                bootbox.alert('Chức năng này tạm thời chưa được thực hiện!');
            };

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

            $scope.deleteEmailClick = function (c) {
                bootbox.alert('Chức năng này tạm thời chưa được thực hiện!');
            };

            $scope.reloadEmailList = function () {
                var req = {
                    method: 'GET',
                    url: '/Admin/GetListEmails',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: {}
                }

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.status) {
                        $scope.listEmails = res.data;
                    } else {
                        toastr.warning('Lỗi tải xuống danh sách Email, vui lòng kiểm tra lại!');
                        console.log(res);
                    }
                }, function (error) {
                    toastr.warning('Lỗi tải xuống danh sách Email, vui lòng kiểm tra lại!');
                    console.log(error);
                });
            };

            $scope.onLoad = function () {
                if (!$scope.isLogged()) {
                    toastr.warning('Bạn chưa đăng nhập hệ thống!');
                    $timeout(() => {
                        window.location.href = window.location.origin + '/Login';
                    },
                        2000);
                } else {
                    $scope.reloadEmailList();
                }
            };

            $scope.onLoad();

        }
    ]
);
