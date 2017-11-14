
App.controller("CategoryController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.loginInfo = {};
            $scope.listCategories = [];
            $scope.mode = '';
            $scope.cateName = '';
            $scope.cateDes = '';
            $scope.cateId = 0;
            $scope.cateOrder = 0;
            $scope.cateStatus = '';

            $scope.editCateClick = function(c) {
                $scope.cateName = c.Name;
                $scope.cateDes = c.Descriptions;
                $scope.cateId = c.Id;
                $scope.cateStatus = c.Status;
                $scope.cateOrder = c.Order;
                $scope.mode = 'edit';
            };

            $scope.btnAddNewClick = function() {
                $scope.cateName = '';
                $scope.cateDes = '';
                $scope.cateId = 0;
                $scope.cateStatus = 'show';
                $scope.cateOrder = 0;
                $scope.mode = 'add';
            };

            $scope.hideCateClick = function (c) {
                var msg = c.Status == 'show'
                    ? 'Ẩn chuyên mục này? (Chuyên mục cùng sản phẩm sẽ không xuất hiện trên trang chủ và trang sản phẩm)'
                    : 'Hiện lại chuyên mục này? (Chuyên mục cùng sản phẩm sẽ xuất hiện trên trang chủ và trang sản phẩm)';
                bootbox.confirm(msg, result => {
                    if (result) {
                        c.Status = c.Status == 'show' ? 'hide' : 'show';
                        var req = {
                            method: 'POST',
                            url: '/Product/UpdateCate',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: JSON.stringify({
                                name: c.Name,
                                des: c.Descriptions,
                                status: c.Status,
                                order: c.Order,
                                cateId: c.Id,
                            })
                        };

                        $http(req).then(function (res) {
                            res = res.data;
                            if (res.status) {
                                toastr.success('Update thành công!');
                                $scope.reloadCateList();
                            } else {
                                toastr.warning('Có lỗi khi lưu, vui lòng kiểm tra lại!');
                                console.log(res);
                            }
                        }, function (error) {
                            toastr.warning('Có lỗi khi lưu, vui lòng kiểm tra lại!');
                            console.log(error);
                        });
                    }
                });
            };

            $scope.upCateClick = function (c) {
                bootbox.confirm('Đẩy lên top?', result => {
                    if (result) {
                        c.Order = getMaxOrder($scope.listCategories);
                        var req = {
                            method: 'POST',
                            url: '/Product/UpdateCate',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: JSON.stringify({
                                name: c.Name,
                                des: c.Descriptions,
                                status: c.Status,
                                order: c.Order,
                                cateId: c.Id,
                            })
                        };

                        $http(req).then(function (res) {
                            res = res.data;
                            if (res.status) {
                                toastr.success('Update thành công!');
                                $scope.reloadCateList();
                            } else {
                                toastr.warning('Có lỗi khi lưu, vui lòng kiểm tra lại!');
                                console.log(res);
                            }
                        }, function (error) {
                            toastr.warning('Có lỗi khi lưu, vui lòng kiểm tra lại!');
                            console.log(error);
                        });
                    }
                });
            };

            function getMaxOrder(array) {
                if (array.length == 0) {
                    return 1;
                } else {
                    var max = 0;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].Order > max) {
                            max = array[i].Order;
                        }
                    }
                    return max + 1;
                }
            }

            $scope.deleteCateClick = function(c) {
                bootbox.alert('Chức năng này tạm thời chưa được thực hiện!');
            };

            $scope.saveCateClick = function() {
                if ($scope.cateName.trim() == '') {
                    toastr.warning('Bạn cần nhập vào tên Chuyên mục!');
                    return;
                }
                if ($scope.cateDes.trim() == '') {
                    toastr.warning('Bạn cần nhập vào mô tả cho Chuyên mục!');
                    return;
                }
                if ($scope.cateId == undefined || $scope.cateId == 0) {
                    toastr.warning('Có lỗi, có thể chuyên mục chưa được chọn, vui lòng load lại trang!');
                    return;
                }
                var req = {
                    method: 'POST',
                    url: '/Product/UpdateCate',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify({
                        name: $scope.cateName,
                        des: $scope.cateDes,
                        status: $scope.cateStatus,
                        order: $scope.cateOrder,
                        cateId: $scope.cateId,
                    })
                };

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.status) {
                        toastr.success('Update thành công!');
                        $scope.reloadCateList();
                        $scope.mode = '';
                    } else {
                        toastr.warning('Có lỗi khi lưu, vui lòng kiểm tra lại!');
                        console.log(res);
                    }
                }, function (error) {
                    toastr.warning('Có lỗi khi lưu, vui lòng kiểm tra lại!');
                    console.log(error);
                });
            };

            $scope.addNewCateClick = function () {
                if ($scope.cateName == undefined
                    || $scope.cateName.trim() == ''
                ) {
                    toastr.warning('Bạn cần nhập vào tên Chuyên mục!');
                    return;
                } else if (checkExistsName($scope.listCategories, $scope.cateName)) {
                    toastr.warning('Tên chuyên mục đã tồn tại, vui lòng thử tên khác!');
                    return;
                } else {
                    var req = {
                        method: 'POST',
                        url: '/Product/AddCate',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        data: JSON.stringify({
                            title: $scope.cateName,
                            des: $scope.cateDes
                        })
                    }

                    $http(req).then(function (res) {
                        res = res.data;
                        if (res.status) {
                            toastr.success('Thêm mới thành công!');
                            $scope.listCategories.push(res.data);
                        } else {
                            toastr.warning('Có lỗi khi lưu, vui lòng kiểm tra lại!');
                            console.log(res);
                        }
                    }, function (error) {
                        toastr.warning('Có lỗi khi lưu, vui lòng kiểm tra lại!');
                        console.log(error);
                    });
                }

            };

            function checkExistsName(array, name) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].Title == name) {
                        return true;
                    }
                }
                return false;
            }

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

            $scope.reloadCateList = function () {
                var req = {
                    method: 'GET',
                    url: '/Product/GetListCates',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: {}
                }

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.status) {
                        $scope.listCategories = res.data;
                    } else {
                        toastr.warning('Lỗi tải xuống danh sách chuyên mục, vui lòng kiểm tra lại!');
                        console.log(res);
                    }
                }, function (error) {
                    toastr.warning('Lỗi tải xuống danh sách chuyên mục, vui lòng kiểm tra lại!');
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
                    $scope.reloadCateList();
                }
            };

            $scope.onLoad();

        }
    ]
);
