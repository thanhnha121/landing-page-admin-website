
App.controller("HomeController",
    [
        '$scope', '$timeout', '$http', '$interval', function ($scope, $timeout, $http, $interval) {
            $scope.listProducts = [];
            $scope.listCategories = [];
            $scope.fullName = '';
            $scope.email = '';
            $scope.phone = '';
            $scope.content = '';
            $scope.listPrices = [];

            $scope.sendMessage = function() {
                if ($scope.fullName.trim() == '') {
                    toastr.warning('Bạn chưa điền vào Họ tên!');
                    return;
                }
                if ($scope.email.trim() == '') {
                    toastr.warning('Bạn chưa điền vào Email!');
                    return;
                }
                if ($scope.phone.trim() == '') {
                    toastr.warning('Bạn chưa điền vào Số điện thoại!');
                    return;
                }
                if ($scope.content.trim() == '') {
                    toastr.warning('Bạn chưa điền vào nội dung!');
                    return;
                }
                var req = {
                    method: 'POST',
                    url: '/Home/SubmitMessage',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify({
                        email: $scope.email,
                        phone: $scope.phone,
                        fullname: $scope.fullName,
                        content: $scope.content,
                    })
                };

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.status) {
                        bootbox.alert('Gửi Email thành công, chúng tôi sẽ gửi lại phản hồi tới bạn trong thời gian sớm nhất có thể. Chân thành cảm ơn bạn!');
                    } else {
                        toastr.warning('Có lỗi khi gửi email!');
                        console.log(res);
                    }
                }, function (error) {
                    toastr.warning('Có lỗi khi gửi email!');
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

            $scope.getPrices = function () {
                var date = new Date();
                var req = {
                    method: 'GET',
                    url: 'https://bittrex.com/api/v2.0/pub/Markets/GetMarketSummaries?_=' + date.getTime(),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: {}
                }

                $http(req).then(function (res) {
                    res = res.data;
                    if (res.success) {
                        $scope.listPrices = res.result;
                        $scope.processListPrices();
                    } else {
                        console.log(res);
                    }
                }, function (error) {
                    $scope.listPrices = tmpPrices;
                    $('.marquee').fadeIn();
                    console.log(error);
                });
            };

            var tmpPrices = [{ "Market": { "MarketCurrency": "BTC", "BaseCurrency": "USDT", "MarketCurrencyLong": "Bitcoin", "BaseCurrencyLong": "Tether", "MinTradeSize": 1e-8, "MarketName": "USDT-BTC", "IsActive": true, "Created": "2015-12-11T06:31:40.633", "Notice": null, "IsSponsored": null, "LogoUrl": null }, "Summary": { "MarketName": "USDT - BTC", "High": 6782.78, "Low": 6122.00000001, "Volume": 9879.07002142, "Last": 6155.2, "BaseVolume": 62794983.90897339, "TimeStamp": "2017-11-12T02:02:13.16", "Bid": 6155.2, "Ask": 6170, "OpenBuyOrders": 9006, "OpenSellOrders": 6252, "PrevDay": 6781, "Created": "2015-12-11T06:31:40.633" }, "IsVerified": false }, { "Market": { "MarketCurrency": "DASH", "BaseCurrency": "USDT", "MarketCurrencyLong": "Dash", "BaseCurrencyLong": "Tether", "MinTradeSize": 1e-8, "MarketName": "USDT-DASH", "IsActive": true, "Created": "2017-07-21T01:08:49.413", "Notice": null, "IsSponsored": null, "LogoUrl": "https://bittrexblobstorage.blob.core.windows.net/public/49993d38-d344-4197-b449-c50c3cc13d47.png" }, "Summary": { "MarketName": "USDT - DASH", "High": 349.651046, "Low": 315.00000001, "Volume": 3856.0254591, "Last": 343.35313991, "BaseVolume": 1296534.2430572, "TimeStamp": "2017-11-12T02:02:19.33", "Bid": 342.19881848, "Ask": 342.7887946, "OpenBuyOrders": 609, "OpenSellOrders": 622, "PrevDay": 336, "Created": "2017-07-21T01:08:49.413" }, "IsVerified": false }, { "Market": { "MarketCurrency": "ETC", "BaseCurrency": "USDT", "MarketCurrencyLong": "Ethereum Classic", "BaseCurrencyLong": "Tether", "MinTradeSize": 1e-8, "MarketName": "USDT-ETC", "IsActive": true, "Created": "2017-07-14T17:10:10.72", "Notice": null, "IsSponsored": null, "LogoUrl": "https://bittrexblobstorage.blob.core.windows.net/public/efc96992-1993-4a91-84cf-c04fea919788.png" }, "Summary": { "MarketName": "USDT - ETC", "High": 20.27999999, "Low": 14.491, "Volume": 525031.18893287, "Last": 19.90000001, "BaseVolume": 9285045.74176546, "TimeStamp": "2017-11-12T02:02:08.223", "Bid": 19.88088791, "Ask": 19.90000001, "OpenBuyOrders": 980, "OpenSellOrders": 1353, "PrevDay": 14.949998, "Created": "2017-07-14T17:10:10.72" }, "IsVerified": false }, { "Market": { "MarketCurrency": "ETH", "BaseCurrency": "USDT", "MarketCurrencyLong": "Ethereum", "BaseCurrencyLong": "Tether", "MinTradeSize": 1e-8, "MarketName": "USDT-ETH", "IsActive": true, "Created": "2017-04-20T17:26:37.647", "Notice": null, "IsSponsored": null, "LogoUrl": "https://bittrexblobstorage.blob.core.windows.net/public/7e5638ef-8ca0-404d-b61e-9d41c2e20dd9.png" }, "Summary": { "MarketName": "USDT - ETH", "High": 319.7, "Low": 290, "Volume": 28767.30426953, "Last": 307.95457637, "BaseVolume": 8784857.45677138, "TimeStamp": "2017-11-12T02:02:20.783", "Bid": 307.95457637, "Ask": 308.3, "OpenBuyOrders": 2617, "OpenSellOrders": 3728, "PrevDay": 301.20682315, "Created": "2017-04-20T17:26:37.647" }, "IsVerified": false }, { "Market": { "MarketCurrency": "LTC", "BaseCurrency": "USDT", "MarketCurrencyLong": "Litecoin", "BaseCurrencyLong": "Tether", "MinTradeSize": 1e-8, "MarketName": "USDT-LTC", "IsActive": true, "Created": "2017-07-14T17:10:10.72", "Notice": null, "IsSponsored": null, "LogoUrl": "https://bittrexblobstorage.blob.core.windows.net/public/6defbc41-582d-47a6-bb2e-d0fa88663524.png" }, "Summary": { "MarketName": "USDT - LTC", "High": 63.5, "Low": 57.98000001, "Volume": 66970.99154591, "Last": 61.34268255, "BaseVolume": 4085368.06473641, "TimeStamp": "2017-11-12T02:02:22.94", "Bid": 61.21000001, "Ask": 61.22690326, "OpenBuyOrders": 1063, "OpenSellOrders": 2320, "PrevDay": 60.45, "Created": "2017-07-14T17:10:10.72" }, "IsVerified": true }, { "Market": { "MarketCurrency": "XMR", "BaseCurrency": "USDT", "MarketCurrencyLong": "Monero", "BaseCurrencyLong": "Tether", "MinTradeSize": 1e-8, "MarketName": "USDT-XMR", "IsActive": true, "Created": "2017-07-21T01:08:49.397", "Notice": null, "IsSponsored": null, "LogoUrl": "https://bittrexblobstorage.blob.core.windows.net/public/efcda24e-c6c3-4029-982c-15af2915fb08.png" }, "Summary": { "MarketName": "USDT - XMR", "High": 126, "Low": 102.5, "Volume": 21641.08444352, "Last": 120.59474471, "BaseVolume": 2530559.44135266, "TimeStamp": "2017-11-12T02:02:18.143", "Bid": 120.016, "Ask": 120.59474471, "OpenBuyOrders": 652, "OpenSellOrders": 717, "PrevDay": 108.00000015, "Created": "2017-07-21T01:08:49.397" }, "IsVerified": false }, { "Market": { "MarketCurrency": "XRP", "BaseCurrency": "USDT", "MarketCurrencyLong": "Ripple", "BaseCurrencyLong": "Tether", "MinTradeSize": 1e-8, "MarketName": "USDT-XRP", "IsActive": true, "Created": "2017-07-14T17:10:10.737", "Notice": null, "IsSponsored": null, "LogoUrl": "https://bittrexblobstorage.blob.core.windows.net/public/8101e36e-bfce-48a9-a7a6-368b6e9452dd.png" }, "Summary": { "MarketName": "USDT - XRP", "High": 0.214, "Low": 0.20069204, "Volume": 11301257.95279674, "Last": 0.2057126, "BaseVolume": 2324286.82186871, "TimeStamp": "2017-11-12T02:02:22.237", "Bid": 0.20571258, "Ask": 0.2057126, "OpenBuyOrders": 1114, "OpenSellOrders": 4084, "PrevDay": 0.20705999, "Created": "2017-07-14T17:10:10.737" }, "IsVerified": false }, { "Market": { "MarketCurrency": "ZEC", "BaseCurrency": "USDT", "MarketCurrencyLong": "ZCash", "BaseCurrencyLong": "Tether", "MinTradeSize": 1e-8, "MarketName": "USDT-ZEC", "IsActive": true, "Created": "2017-07-14T17:10:10.673", "Notice": null, "IsSponsored": null, "LogoUrl": "https://bittrexblobstorage.blob.core.windows.net/public/db51f5f5-3728-4e12-b32f-ea3f4825038b.png" }, "Summary": { "MarketName": "USDT - ZEC", "High": 268, "Low": 231.387, "Volume": 5271.04894493, "Last": 247.84785275, "BaseVolume": 1313531.5543752, "TimeStamp": "2017-11-12T02:02:13.3", "Bid": 247.84785275, "Ask": 248.6284323, "OpenBuyOrders": 944, "OpenSellOrders": 2510, "PrevDay": 242.5, "Created": "2017-07-14T17:10:10.673" }, "IsVerified": false }];

            $scope.processListPrices = function () {
                for (let i = 0; i < $scope.listPrices.length; i++) {
                    if ($scope.listPrices[i].Summary.MarketName != 'USDT-BTC'
                        && $scope.listPrices[i].Summary.MarketName != 'USDT-BCH'
                        && $scope.listPrices[i].Summary.MarketName != 'USDT-LTC'
                        && $scope.listPrices[i].Summary.MarketName != 'USDT-ZEC'
                        && $scope.listPrices[i].Summary.MarketName != 'USDT-ETH'
                        && $scope.listPrices[i].Summary.MarketName != 'USDT-ETC'
                        && $scope.listPrices[i].Summary.MarketName != 'USDT-DASH'
                        && $scope.listPrices[i].Summary.MarketName != 'USDT-XMR'
                        && $scope.listPrices[i].Summary.MarketName != 'USDT-XRP'
                    ) {
                        $scope.listPrices.splice(i, 1);
                        i--;
                    }
                }
                $scope.listPrices.forEach(item => {
                    item.Summary.MarketName = item.Summary.MarketName.replace('-', ' - ');
                });
                if ($scope.listPrices == undefined
                    || $scope.listPrices.length == 0) {
                    $scope.listPrices = tmpPrices;
                    $('.marquee').fadeIn();
                }
                else {
                    $('.marquee').fadeIn();
                }
            }


            $scope.onLoad = function () {
                $scope.getPrices();
                $scope.loadCates();
                $scope.loadCates();
            };

            $scope.onLoad();

        }
    ]
);
