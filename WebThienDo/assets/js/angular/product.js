
App.controller("ProductController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.loginInfo = {};
            $scope.listProducts = [];
            $scope.listCategories = [];
            $scope.title = '';
            $scope.productId = 0;
            $scope.imgs = [];
            $scope.detail = '';
            $scope.cate = {};
            $scope.mode = '';

            $scope.reset = function() {
                $scope.title = '';
                $scope.productId = 0;
                $scope.imgs = [];
                $scope.detail = '';
                $scope.cate = {};
                $scope.status = '';
                $scope.order = 0;
            };

            $scope.getShortString = function (descriptions) {
                if (descriptions == undefined || descriptions.trim() == '') {
                    return '';
                } else if (descriptions.length > 50) {
                    return descriptions.substring(0, 47) + '...';
                } else {
                    return descriptions;
                }
            };

            $scope.liCateClick = function (c) {
                $scope.cate = c;
            };

            $scope.deleteProductClick = function (c) {
                bootbox.alert('Chức năng này tạm thời chưa được thực hiện!');
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

            $scope.hideProductClick = function (p) {
                var msg = p.Status == 'show'
                    ? 'Ẩn chuyên mục này? (Chuyên mục cùng sản phẩm sẽ không xuất hiện trên trang chủ và trang sản phẩm)'
                    : 'Hiện lại chuyên mục này? (Chuyên mục cùng sản phẩm sẽ xuất hiện trên trang chủ và trang sản phẩm)';
                bootbox.confirm(msg, result => {
                    if (result) {
                        var tmpImgs = [];
                        p.Images.forEach(item => {
                            tmpImgs.push(item.Url);
                        });
                        p.Status = p.Status == 'show' ? 'hide' : 'show';
                        var req = {
                            method: 'POST',
                            url: '/Product/UpdateProduct',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: JSON.stringify({
                                title: p.Title,
                                des: p.Descriptions,
                                status: p.Status,
                                order: p.Order,
                                cateId: p.Category.Id,
                                id: p.Id,
                                imgs: tmpImgs
                            })
                        };

                        $http(req).then(function (res) {
                            res = res.data;
                            if (res.status) {
                                toastr.success('Update thành công!');
                                $scope.loadProducts();
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

            $scope.saveProductClick = function () {
                $scope.detail = CKEDITOR.instances.editor1.getData();
                var req = {
                    method: 'POST',
                    url: '/Product/UpdateProduct',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify({
                        title: $scope.title,
                        des: $scope.detail,
                        status: $scope.status,
                        order: $scope.order,
                        cateId: $scope.cate.Id,
                        id: $scope.productId,
                        imgs: $scope.imgs
                    })
                };

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.status) {
                        toastr.success('Update thành công!');
                        $scope.loadProducts();
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

            $scope.upProductClick = function (p) {
                bootbox.confirm('Đẩy lên top?', result => {
                    if (result) {
                        var tmpImgs = [];
                        p.Images.forEach(item => {
                            tmpImgs.push(item.Url);
                        });

                        p.Order = getMaxOrder($scope.listProducts);
                        var req = {
                            method: 'POST',
                            url: '/Product/UpdateProduct',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: JSON.stringify({
                                title: p.Title,
                                des: p.Descriptions,
                                status: p.Status,
                                order: p.Order,
                                cateId: p.Category.Id,
                                id: p.Id,
                                imgs: tmpImgs
                            })
                        };

                        $http(req).then(function (res) {
                            res = res.data;
                            if (res.status) {
                                toastr.success('Update thành công!');
                                $scope.loadProducts();
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

            $scope.editProductClick = function (p) {
                $scope.mode = 'edit';
                $scope.cate = p.Category;
                $scope.title = p.Title;
                $scope.detail = p.Descriptions;
                $scope.status = p.Status;
                $scope.order = p.Order;
                $scope.imgs = [];
                $scope.productId = p.Id;
                p.Images.forEach(item => {
                    $scope.imgs.push(item.Url);
                });
                CKEDITOR.instances['editor1'].setData($scope.detail);
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

            $scope.onLoad = function () {
                if (!$scope.isLogged()) {
                    toastr.warning('Bạn chưa đăng nhập hệ thống!');
                    $timeout(() => {
                        window.location.href = window.location.origin + '/Login';
                    },
                        2000);
                } else {
                    $scope.loadProducts();
                    $scope.loadCates();
                }
            };

            $scope.addNewProductClick = function () {
                if ($scope.cate == undefined || $scope.cate.Id == undefined) {
                    toastr.warning('Bạn cần chọn Chuyên mục cho sản phẩm!');
                    return;
                }
                if ($scope.title == undefined || $scope.title.trim() == '') {
                    toastr.warning('Bạn cần nhập vào tên Sản phẩm!');
                    return;
                } else if ($scope.imgs.length == 0) {
                    toastr.warning('Bạn cần chọn ít nhất 1 ảnh cho sản phẩm!');
                    return;
                }

                $scope.detail = CKEDITOR.instances.editor.getData();
                if ($scope.detail == undefined || $scope.detail.trim() == '') {
                    toastr.warning('Bạn cần nhập vào thông tin cho sản phẩm!');
                    return;
                }

                $scope.callAddProduct($scope.detail);
            };

            $scope.callAddProduct = function (content) {
                var req = {
                    method: 'POST',
                    url: '/Product/AddProduct',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify({
                        cateId: $scope.cate.Id,
                        content: content,
                        title: $scope.title,
                        imgs: $scope.imgs
                    })
                }

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.status) {
                        toastr.success('Thêm mới thành công!');
                        $scope.listProducts.push(res.data);
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
                    } else {
                        toastr.warning('Lỗi tải xuống danh sách chuyên mục, vui lòng kiểm tra lại!');
                        console.log(res);
                    }
                }, function (error) {
                    toastr.warning('Lỗi tải xuống danh sách chuyên mục, vui lòng kiểm tra lại!');
                    console.log(error);
                });
            };

            $scope.onLoad();
            $scope.uploadFile = function (formData) {
                var url = '';
                try {
                    $.ajax({
                        url: 'http://devchat.zamba.vn/api.php?mod=file&cmd=Upload',
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST',
                        dataType: 'JSON',
                        success: (data) => {
                            if (data.status) {
                                url = data.link_file;
                                if (url == undefined || url == '') {
                                    toasrt.warning('API upload ảnh lỗi, vui lòng kiểm tra lại!');
                                    return;
                                }
                            } else {
                                toastr.error('Có lỗi trong quá trình tải lên, vui lòng thử lại!');
                                console.log(data);
                            }
                        },
                        error: (err) => {
                            toastr.error('Có lỗi trong quá trình tải lên, vui lòng thử lại!');
                            console.log(err);
                        },
                        async: false
                    });
                } catch (err) {
                    toastr.error('Có lỗi trong quá trình tải lên, vui lòng thử lại!');
                    console.log(err);
                }

                $scope.imgs.push(url);
                $scope.$apply();
            }

            $scope.open_file = function (context) {
                if ($scope.imgs.length >= 5) {
                    toastr.warning('Số lượng ảnh tải lên đã đạt tối đa!');
                    return;
                }
                var fileExt = $(context).val().slice(($(context).val().lastIndexOf(".") - 1 >>> 0) + 2);
                fileExt = fileExt.toLowerCase();
                if (fileExt == undefined || fileExt == "") {
                    $(context).val('');
                    return;
                }
                var img = context.files[0];
                var formData = new FormData();
                if (fileExt !== "jpg" && fileExt !== "png"
                    && fileExt !== "gif" && fileExt !== "jpeg"
                ) {
                    $(context).val('');
                    toastr.warning('File bạn chọn không phải là hình ảnh!');
                    return;
                } else if (img.size > 5242880) {
                    $(context).val('');
                    toastr.warning('Dung lượng ảnh không vượt quá 5MB!');
                    return;
                }
                formData.append("file", img);
                formData.append("type", 'file');

                $scope.uploadFile(formData);
            };

        }
    ]
);
