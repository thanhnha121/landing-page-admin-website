App.controller("NewsViewController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.listNews = [];
            $scope.news = {};

            $scope.viewNews = function(news) {
                $scope.news = news;
                setTimeout(() => {
                    $('.des > p > img').parent('p').addClass('p-img-center');
                }, 50);
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
                        for (var i = 0; i < $scope.listNews.length; i++) {
                            if ($scope.listNews[i].Type != 'Tin Tức') {
                                $scope.listNews.splice(i, 1);
                                i--;
                            }
                        }
                        setTimeout(() => {
                            $('.td > p > img').parent('p').addClass('p-img-center');
                        }, 500);
                    } else {
                        toastr.warning('Lỗi tải xuống danh sách bài viết, vui lòng kiểm tra lại!');
                        console.log(res);
                    }
                }, function (error) {
                    toastr.warning('Lỗi tải xuống danh sách bài viết, vui lòng kiểm tra lại!');
                    console.log(error);
                });
            };

            $scope.onLoad = function () {
                $scope.loadNews();
            };

            $scope.onLoad();

        }
    ]
);
