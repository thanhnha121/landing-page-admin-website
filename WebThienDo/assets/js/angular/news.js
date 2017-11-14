
App.controller("NewsController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.loginInfo = {};
            $scope.listNews = [];
            $scope.title = '';
            $scope.newsId = 0;
            $scope.imgs = [];
            $scope.imgs2 = [];
            $scope.content = '';
            $scope.status = '';
            $scope.shortContent = '';
            $scope.mode = '';
            $scope.type = 'Tin Tức';


            $scope.editNewsClick = function(news) {
                $scope.mode = 'edit';
                $scope.title = news.Title;
                $scope.newsId = news.Id;
                $scope.imgs = [];
                $scope.imgs.push(news.BannerImage);
                $scope.status = news.Status;
                $scope.imgs2 = [];
                $scope.content = news.Contents;
                $scope.shortContent = news.ShortContent;
                $scope.type = news.Type;
                CKEDITOR.instances['editor2'].setData($scope.shortContent);
                CKEDITOR.instances['editor3'].setData($scope.content);
            };

            $scope.deleteNewsClick = function(news) {
                bootbox.alert('Chức năng đang được hoàn thiện!');
            };
            $scope.hideNewsClick = function(news) {
                bootbox.alert('Chức năng đang được hoàn thiện!');
            };

            $scope.getLoginInfo = function () {
                return {
                    username: $.cookie('username'),
                    token: $.cookie('token'),
                    lastLogin: $.cookie('lastLogin')
                }
            };

            $scope.getNews = function () {
                if ($scope.mode == 'add') {
                    $scope.shortContent = CKEDITOR.instances.editor.getData();
                    $scope.content = CKEDITOR.instances.editor1.getData();
                } else {
                    $scope.shortContent = CKEDITOR.instances.editor2.getData();
                    $scope.content = CKEDITOR.instances.editor3.getData();
                }
                setTimeout(() => {
                    $('.des > p > img').parent('p').addClass('p-img-center');
                }, 50);
            };

            $scope.validateNews = function() {
                $scope.getNews();
                if ($scope.title.trim() == '') {
                    toastr.warning('Bạn chưa nhập vào tiêu đề bài viết!');
                    return 0;
                }
                if ($scope.shortContent.trim() == '') {
                    toastr.warning('Bạn chưa nhập vào mô tả ngắn cho bài viết!');
                    return 0;
                }
                if ($scope.content.trim() == '') {
                    toastr.warning('Bạn chưa nhập vào nội dung bài viết!');
                    return 0;
                }
                if ($scope.type.trim() == '') {
                    toastr.warning('Bạn chưa chọn kiểu bài đăng!');
                    return 0;
                }
                return 1;
            };

            $scope.saveNewsClick = function () {
                if ($scope.validateNews()) {
                    var req = {
                        method: 'POST',
                        url: '/News/UpdateNews',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        data: JSON.stringify({
                            id: $scope.newsId,
                            title: $scope.title,
                            content: $scope.content,
                            shortContent: $scope.shortContent,
                            status: $scope.status,
                            bannerImage: $scope.imgs[0] ? $scope.imgs[0] : '',
                            type: $scope.type
                        })
                    };

                    $http(req).then(function (res) {
                        res = res.data;
                        if (res.status) {
                            toastr.success('Update thành công!');
                            $scope.loadNews();
                            $scope.mode = '';
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

            $scope.addNewNewsClick = function () {
                if ($scope.validateNews()) {
                    var req = {
                        method: 'POST',
                        url: '/News/AddNews',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        data: JSON.stringify({
                            title: $scope.title,
                            bannerImage: $scope.imgs[0] ? $scope.imgs[0] : '',
                            content: $scope.content,
                            shortContent: $scope.shortContent,
                            type: $scope.type
                        })
                    };

                    $http(req).then(function (res) {
                        res = res.data;
                        if (res.status) {
                            toastr.success('Thêm bài viết thành công!');
                            $scope.loadNews();
                            $scope.mode = '';
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

            $scope.loadNews = function () {
                var req = {
                    method: 'GET',
                    url: '/News/GetListNews',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: {}
                }

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.status) {
                        $scope.listNews = res.data;
                    } else {
                        toastr.warning('Lỗi tải xuống danh sách bài viết, vui lòng kiểm tra lại!');
                        console.log(res);
                    }
                }, function (error) {
                    toastr.warning('Lỗi tải xuống danh sách bài viết, vui lòng kiểm tra lại!');
                    console.log(error);
                });
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
                    $scope.loadNews();
                }
            };

            $scope.reset = function () {
                $scope.title = '';
                $scope.newsId = 0;
                $scope.imgs = [];
                $scope.imgs2 = [];
                $scope.content = '';
                $scope.status = '';
                $scope.shortContent = '';
                $scope.type = '';
                CKEDITOR.instances['editor'].setData('');
                CKEDITOR.instances['editor1'].setData('');
                CKEDITOR.instances['editor2'].setData('');
                CKEDITOR.instances['editor3'].setData('');
            };

            $scope.onLoad();

            $scope.uploadFile = function (formData, type) {
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

                if (type) {
                    $scope.imgs.push(url);
                } else {
                    $scope.imgs2.push(url);
                }
                $scope.$apply();
            }

            $scope.open_file = function (context, type = 1) {
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

                $scope.uploadFile(formData, type);
            };

        }
    ]
);
