App.controller("LoginController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.username = '';
            $scope.password = '';
            $scope.loginInfo = {};

            $scope.login = function () {
                if ($scope.checkLogin()) {
                    var req = {
                        method: 'POST',
                        url: '/Login/AngularLogin',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        data: JSON.stringify({
                            username: $scope.username,
                            password: $scope.password
                        })
                    }

                    $http(req).then(function (res) {
                        res = res.data;
                        if (res.status) {
                            toastr.success('Đăng nhập thành công, đang chuyển đến trang quản lý dành cho Admin!');
                            var info = res.data;
                            info.lastLogin = new Date();
                            $scope.saveSession(info);

                            $timeout(() => {
                                window.location.href = window.location.origin + '/Admin';
                            }, 2000);
                        } else {
                            toastr.warning('Đăng nhập không thành công, kiểm tra lại tài khoản hoặc mật khẩu!');
                            console.log(res);
                        }
                    }, function (error) {
                        console.log(error);
                        toastr.error('Có lỗi trong quá trình đăng nhập hệ thống, kiểm tra lại hoặc báo cho Admin!');
                    });
                }
            };

            $scope.checkLogin = function () {
                if ($scope.username.trim() == '') {
                    toastr.warning('Bạn chưa điền vào username!');
                    return false;
                }
                if ($scope.password.trim() == '') {
                    toastr.warning('Bạn chưa điền vào mật khẩu!');
                    return false;
                }
                return true;
            };

            $scope.getLoginInfo = function () {
                return {
                    username: $.cookie('username'),
                    token: $.cookie('token'),
                    lastLogin: $.cookie('lastLogin')
                }
            };

            $scope.saveSession = function (info) {
                $.cookie('username', info.username, { expires: 3600 });
                $.cookie('token', info.token, { expires: 3600 });
                $.cookie('lastLogin', info.lastLogin, { expires: 3600 });
            };

            $scope.isLogged = function () {
                $scope.loginInfo = $scope.getLoginInfo();
                if ($scope.loginInfo.username != undefined && $scope.loginInfo.token != undefined) {
                    return true;
                }
                return false;
            };

            $scope.onLoad = function () {
                if (window.location.href.toLowerCase().indexOf('login') != -1
                    && $scope.isLogged()
                ) {
                    toastr.warning('Bạn đã đăng nhập hệ thống!');
                    $timeout(() => {
                        window.location.href = window.location.origin;
                    }, 2000);
                }
            };

            $scope.onLoad();

        }
    ]
);
