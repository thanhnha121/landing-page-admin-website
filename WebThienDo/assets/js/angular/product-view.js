
App.controller("ProductViewController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.listProducts = [];
            $scope.listCategories = [];

            $scope.getShortString = function (descriptions) {

                if (descriptions == undefined || descriptions.trim() == '') {
                    return '';
                } else if (descriptions.length > 50) {
                    return descriptions.substring(0, 47) + '...';
                } else {
                    return descriptions;
                }
            };

            $scope.loadProducts = function () {
                var req = {
                    method: 'GET',
                    url: '/Product/GetListProducts',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: {}
                }

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.status) {
                        $scope.listProducts = res.data;
                        $scope.loadCates();
                    } else {
                        toastr.warning('Lỗi tải xuống danh sách sản phẩm, vui lòng kiểm tra lại!');
                        console.log(res);
                    }
                }, function (error) {
                    console.log(error);
                    toastr.warning('Lỗi tải xuống danh sách sản phẩm, vui lòng kiểm tra lại!');
                });
            };

            $scope.loadCates = function () {
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
                        $scope.processPvsC();
                    } else {
                        toastr.warning('Lỗi tải xuống danh sách chuyên mục, vui lòng kiểm tra lại!');
                        console.log(res);
                    }
                }, function (error) {
                    toastr.warning('Lỗi tải xuống danh sách chuyên mục, vui lòng kiểm tra lại!');
                    console.log(error);
                });
            };

            $scope.processPvsC = function() {
                for (let i = 0; i < $scope.listCategories.length; i++) {
                    $scope.listCategories[i].listProducts = [];
                    $scope.listProducts.forEach(item => {
                        if (item.Category.Id == $scope.listCategories[i].Id) {
                            $scope.listCategories[i].listProducts.push(item);
                        }
                    });
                }    

            };

            $scope.onLoad = function () {
                $scope.loadProducts();
            };

            $scope.onLoad();

        }
    ]
);
