var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider) {
	// 首页路由
	$stateProvider.state('index', {
		url: '',
		views: {
			'nav': {
				templateUrl: '礼无忧/index/nav.html',
				controller: 'indexController'
			},
			'mian': {
				templateUrl: '礼无忧/index/mian.html',
				controller: 'indexMianController'
			},
			'footer': {
				templateUrl: '礼无忧/index/footer.html',
				controller: 'footerController'
			}

		}

	});
	// 分类路由
	$stateProvider.state('index.fenlei', {
			url: '/fenlei:id',
			views: {
				'mian@': {
					templateUrl: '礼无忧/fenlei/fenlei.html',
					resolve: {
						'fenleiData': function($http, $stateParams) {
							var id = $stateParams.id;
							console.log(id)
							return $http({
								url: 'fenlei',
								method: 'GET',
								params: {
									'id': id
								}
							}).success(function(data) {
								var dataObj = JSON.parse(data);
								console.log(dataObj)

							})
						}
					},
					controller: 'indexFlController'
				}
			}
		})
		// 详情路由
	$stateProvider.state('index.detailed', {
		url: '/detailed?id?path?title',
		views: {
			'mian@': {
				templateUrl: '礼无忧/detailed/detailed.html',
				controller: 'detailedController',
				resolve: {
					'detailedData': function($stateParams, $http) {
						console.log($stateParams)

						return $http({
							url: '/xiangqing',
							method: 'GET',
							params: {
								id: $stateParams.id,
								path: $stateParams.path
							}
						})
					}
				}
			}
		}
	})

	// 购物路由
	$stateProvider.state('index.gwmian', {
		url: '/shoping123',
		views: {
			'mian@': {
				templateUrl: '礼无忧/shopping/main.html',
				controller: 'gwController'
			}
		}
	})

	// 历史记录路由
	$stateProvider.state('index.lishi', {
		url: '/lishililu',
		views: {
			'mian@': {
				templateUrl: '礼无忧/history/history.html',
				controller: 'lsController'
			}
		}
	})

})

//=========================路由控制器			

//index控制器
app.controller('indexController', function($state, $scope, $interval) {

		$scope.name = '管管帅帅哒';
		$scope.isTrue = false;
		$scope.isBaidu = false;
		$scope.skipHome = function(event) {
			window.location.href = 'index.html'
		}
		$('title').text('礼无忧')
		$(document).scroll(function(event) {

			var step = $(this).scrollTop()
			var fd = $('#fudong:hidden');

			if(step > 600) {
				fd.fadeIn(500)

			} else {
				var fd = $('#fudong');
				fd.fadeOut(500)
			}
		})
		$scope.spObj = ZYStorage.local('shopping') ? ZYStorage.local('shopping') : false;

		$interval(function() {
			$scope.soppingNum = ZYStorage.local('shopping') ? ZYStorage.local('shopping').length : '';
			$scope.spObj = ZYStorage.local('shopping') ? ZYStorage.local('shopping') : false;
			var hash = window.location.hash
			if(hash != '#/shoping123') {
				$scope.isHome = false;
				$('#gouwuche').css('display', 'none')
				$('#indexheader:hidden').css('display', 'block')
			}
			zongjia()
		}, 300)
		zongjia()

		function zongjia() {
			if(!$scope.spObj[0]) {
				return
			}
			var arrnum = []
			$scope.length = $scope.spObj.length;
			$scope.spObj.forEach(function(item, index) {
				arrnum.push(item.price * item.num)
			})

			$scope.zongji = arrnum.reduce(function(prev, next) {
				return prev + next
			})

		}

		$scope.remove = function(id, beizhu) {
			var arr = [];
			$scope.spObj.forEach(function(item, index) {
				if(id == item.id && beizhu == item.beizhu) {

				} else {
					arr.push(item)
				}
			})
			if(!arr[0]) {
				$scope.spObj = arr;
				$('#gdbody').fadeOut()
				ZYStorage.removeLocal('shopping')
				zongjia()
				return
			}
			$scope.spObj = arr;
			ZYStorage.local('shopping', arr)

		}

		$('#shoping').hover(function() {
			$('#gwall:hidden').fadeIn(30)
			$('#userdiv').animate({
				height: 'hide'
			}, 100)
		})

		$('#indexheader').hover(function() {

		}, function() {
			$('#gwall').animate({
				height: 'hide'
			}, 300)
			$('#userdiv').animate({
				height: 'hide'
			}, 300)
		})

		$('#gwall').hover(function() {
			$('#userdiv').animate({
				height: 'hide'
			}, 300)
		}, function() {
			$('#gwall').fadeOut(300)
		})
		$('#user').hover(function() {
			$('#gwall').fadeOut(300)

			$('#userdiv:hidden').animate({
				height: 'show'
			}, 100)
		})

		$scope.go = function() {

			$state.go('index.gwmian')
		}

		$scope.clickgo = function(id, title, path) {

			$state.go('index.detailed', {
				title: title,
				id: id,
				path: path
			})
		}
		console.log($scope.spObj)
		$scope.tohistory = function() {

			$state.go('index.lishi')
		}

		// 百度信誉
		$('#shouqi').click(function() {
			$scope.height = $('#baidu').height();
			$('#baidu').animate({
				height: 0,
				width: 0
			}, 700, function() {
				$('.baidu:hidden').fadeIn(100)
			})
		})

		$('.baidu').click(function() {

			$('#baidu').animate({
				height: $scope.height + 5 + 'px',
				width: '222px'
			}, 300, function() {
				$('.baidu').fadeOut(1)
			})
		})

		$scope.clickGuan = function() {
			var value = $('#bdinput input').val().trim()
			var urls = 'https://www.baidu.com/baidu?wd= ' + value + '&tn=monline_4_dg&ie=utf-8'

			window.open(urls)
		}
	})
	// index.mian 控制器
app.controller('indexMianController', function($state, $scope, $interval) {

	$(document).ready(function() {
		var items = $('.item:hidden')

		function banner(index, traget) {
			$('.item').hide()
			console.log(index)
			if(index == 1) {
				$($('.item')[0]).fadeIn(400)
				$($('.item')[1]).hide()
				$('#banner-bottom i').css('border', 'none')
				$(traget).css('border', 'solid 2px red')
				return
			}
			$('#banner-bottom i').css('border', 'none')
			$(traget).css('border', 'solid 2px red')
			$(items[index]).fadeIn(400)
			if(index == 0) index = 1
			var urls = '../../img/banner0' + (index) + '.jpg'
			console.log(urls)
			$('#banner').css('background-image', 'url(' + urls + ')')
		}

		$('#banner-bottom i').hover(function() {
			var index = $(this).index() + 1
			banner(index, this)
		}, function() {

		})

	});

})

//分类控制器
app.controller('indexFlController', function($scope, $stateParams, $state, fenleiData, $timeout, $filter) {

		$scope.data = fenleiData.data;;
		var isdui, isdz;
		var path = $stateParams.id;

		//		 $scope.hoves = function($event){
		//		 	alert(0)
		//		 	var taget = $event.target;
		//		 	$(taget).css('box-shadow',' 0 0 0px black')
		//		 }

		var maxnum = 16;
		var zongye = $scope.data.bodyObj.length;
		var objs = $scope.data.bodyObj;
		$scope.num = 0;
		$scope.btnNum = parseInt(Math.ceil(zongye / maxnum));
		$scope.path = $stateParams.id;
		$('title').text(path)

		$scope.detailed = function(id, title) {
			//			alert('您点击的商品是：' + title)
			$state.go('index.detailed', {
				title: title,
				id: id,
				path: path

			})
		}
		pages(zongye, maxnum);
		addBtn();
		pageBtnClick();

		function bb() {
			if(isdui) {
				setTimeout(function() {
					$('.flitem').fadeOut(10)
				}, 50)
			} else if(isdz) {
				setTimeout(function() {
					$('.flitem[data-dz="nodz"]').fadeOut(10)
				}, 50)
			}
		}

		function pageBtnClick() {
			$('.pageitem').click(function() {
				$('.pageitem').css('background', '');
				$('.pageitem').css('color', '#a9a9a9');
				$(this).css('background', '#a4a4a4');
				$(this).css('color', '#F5F5F5');
				var index = $(this).index();
				maxnum = 16;
				$scope.num = maxnum * index;
				maxnum = maxnum * (index + 1)
				pages(zongye, maxnum);
			})
		}

		function addBtn() {
			$scope.btnNum = parseInt(Math.ceil($scope.data.bodyObj.length / 16));
			if(!$scope.btnNum) $scope.btnNum = 1
			$('#pages').html('')
			for(var i = 1; i <= $scope.btnNum; i++) {

				$('#pages').append('<a class="pageitem">' + i + '</a>')
			}
			$('.pageitem')[0].style.background = '#a4a4a4'
			$('.pageitem')[0].style.color = '#F5F5F5'
		}

		function pages(zongye, maxnum, iscs) {
			$scope.goods = []
			var strs = $scope.num;
			maxnum = maxnum > zongye ? zongye : maxnum;
			console.log('起始是---' + strs);
			console.log('最大max是---' + maxnum)
			if(iscs) {
				strs = 0;
				maxnum = 16;
			}

			for(var i = strs; i < maxnum; i++) {
				$scope.goods.push($scope.data.bodyObj[i])
			}

			$timeout(function() {　
				$scope.date = new Date();
			}, 20)
			bb()

		}

		function pageclick(isjia) {
			console.log('点击button有---- ' + $scope.btnNum)
			if($scope.btnNum == 1) return
			if(isjia) {
				if(maxnum > zongye) return
				maxnum = 16;
				console.log('点击button有---- ' + $scope.btnNum)
				var num = $scope.num / maxnum;
				$scope.num = num++ == $scope.btnNum ? $scope.btnNum : num;
				$scope.num = maxnum * num;
				maxnum = maxnum * (num + 1)

			} else {
				maxnum = 16;
				var num = $scope.num / maxnum;
				$scope.num = num-- ? num-- : 0;
				$scope.num = maxnum * (num + 1);
				maxnum = maxnum * (num + 1 + 1)
				num++
			}
			pages(zongye, maxnum);
			$('.pageitem').css('background', '');
			$('.pageitem').css('color', '#a9a9a9');
			$('.pageitem')[num].style.background = '#a4a4a4'
			$('.pageitem')[num].style.color = '#F5F5F5'
		}

		$('.barleft').click(function() {
			pageclick(false)
		})

		$('.barright').click(function() {
			pageclick(true)
		})

		$scope.toggle = function(str) {
			var id = '#' + str;
			if(id == '#tj') {
				if(isdui) {
					$(id).text('')
					$('#dz').css('cursor', 'pointer')
					$('.flitem').fadeIn('300')
				} else {
					$(id).text('√')
					$('#dz').css('cursor', 'not-allowed')
					$('.flitem').fadeOut('300')

				}
				isdui = !isdui
			}

			if(id == '#dz') {
				if(isdz) {
					$(id).text('')

					if(isdui) {
						$('.flitem[data-dz="nodz"]').fadeOut('300')

						return
					}
					$('.flitem:hidden').fadeIn('300')
				} else {
					if(!isdui) $(id).text('√')
					$('.flitem[data-dz="nodz"]').fadeOut('300')
				}
				isdz = !isdz
			}　

		}

		$scope.smallToBig = function(event) {
			$scope.data.bodyObj = $filter('orderBy')($scope.data.bodyObj, 'price', false)
			pages(zongye, maxnum, true)

		}
		$scope.bigToSmall = function(event) {
			$scope.data.bodyObj = $filter('orderBy')($scope.data.bodyObj, 'price', true)
			pages(zongye, maxnum, true);

		}
		$('#maintitle a').click(function() {
			$('#maintitle a').css('color', 'black');
			$(this).css('color', 'red');
		})
		$scope.custom = function(min, max, isAll) {
			if(isAll) {
				min = 0;
				max = 100000
			}　
			var arr = [];
			objs.forEach(function(item, index) {
				if(item.price > min && item.price < max)
					arr.push(item)
			})
			$scope.data.bodyObj = arr;
			addBtn()
			$scope.num = 0;
			maxnum = 16;
			pages(zongye, maxnum, true);
			pageBtnClick();
			console.log('商品共:' + $scope.data.bodyObj.length)
			console.log('按钮应该有几个—— ' + $scope.btnNum)
		}　

		$('.fltitle a').click(function() {
			$('.fltitle a').css('color', 'black')
			this.style.color = 'red';
		})

		$('.dhfl a').click(function() {
			$('.dhfl a').css('color', 'black')
			this.style.color = 'red';
		})

		//历史存储

	})
	//详情页面控制器
app.controller('detailedController', function($state, $scope, detailedData, $stateParams) {
	var path = $stateParams.path;
	$scope.isAll = true;
	$scope.xqObj = JSON.parse(detailedData.data.xq);
	$scope.tjObj = detailedData.data.tj
	$scope.xqObj.path = path;
	$scope.canshu = $scope.xqObj.detailed.shineComment.split('&')
	$scope.showlength = $scope.xqObj.detailed.seek.seekImage.length;
	$scope.alllength = $scope.showlength + 　$scope.xqObj.detailed.seek.seekAll.length;
	$('title').text($stateParams.title)
	$scope.title = $stateParams.title;
	$scope.over = function(event) {
		var taget = $('#bigimage img');
		taget[0].src = event.target.src;
	}
	historys($scope.xqObj)
	$scope.maxnum = 3;
	$scope.zongye = $scope.xqObj.detailed.seek.seekAll.length;
	$scope.btnNum = parseInt(Math.ceil($scope.zongye / $scope.maxnum));

	$scope.clickImg = function() {
		$scope.isAll = false;
		arrs = $scope.xqObj.detailed.seek.seekImage;
		var max = parseInt(Math.ceil(arrs.length / $scope.maxnum));
		$scope.pageClick(1)
		btnAdd(max)
		btnClick(arrs.length, arrs)
	}
	$scope.clickAll = function() {
		$scope.isAll = true;
		arrs = $scope.xqObj.detailed.seek.seekAll;
		var max = parseInt(Math.ceil(arrs.length / $scope.maxnum));
		showlist(0, $scope.maxnum, arrs);
		btnAdd(max)
		btnClick(arrs.length, arrs)

	}

	var arrays = $scope.xqObj.detailed.seek.seekAll;
	btnAdd($scope.btnNum);
	showlist(0, $scope.maxnum, arrays);
	btnClick($scope.zongye, arrays);

	function btnAdd(max) {
		$('#pages').html('');
		for(var i = 1; i <= max; i++) {
			$('#pages').append('<a class="pageitem">' + i + '</a>')
		}
		var start = $('.pageitem')[0]
		$(start).addClass('active')
	}

	function showlist(start, end, arrs) {
		$scope.commnetAll = []
		console.log('start是--- ' + start)
		console.log('end是------ ' + end)
		for(var i = start; i < end; i++) {
			$scope.commnetAll.push(arrs[i])
		}
	}

	function btnClick(zongye, arrs) {
		$('#pages a').click(function() {
			$(".pageitem").removeClass("active");
			$(this).addClass('active');
			var start = $(this).index() * $scope.maxnum;
			var end = ($(this).index() + 1) * $scope.maxnum
			if(!start)
				end = $scope.maxnum
			if(end > zongye)
				end = zongye
			showlist(start, end, arrs)
		})
	}

	$scope.pageClick = function(pp) {

		var active = $('.active');
		if($scope.isAll) {
			arrs = $scope.xqObj.detailed.seek.seekAll;
			var btnNum = parseInt(Math.ceil(arrs.length / $scope.maxnum));
		} else {
			arrs = $scope.xqObj.detailed.seek.seekImage;
			var btnNum = parseInt(Math.ceil(arrs.length / $scope.maxnum));
		}

		if(pp > 0) {
			var start = (active.index() + 1) * $scope.maxnum;
			var end = (active.index() + 2) * $scope.maxnum
		} else {
			var start = (active.index() - 1) * $scope.maxnum;
			var end = active.index() * $scope.maxnum;
			start = start < 0 ? (btnNum - 1) * $scope.maxnum : start

			end = end ? end : arrs.length;
			console.log('start:' + start + 'end:' + end)
		}

		$(".pageitem").removeClass("active");
		var i = active.index() + pp
		$('.pageitem').eq(i).addClass('active');

		if(start > arrs.length) {
			start = 0;
			end = 3;
			$('.pageitem').eq(0).addClass('active');
		} else if(end >= arrs.length) {
			end = arrs.length;
		}
		showlist(start, end, arrs)
	}
	$('.toggle').click(function() {
		$('.toggle').css('color', 'black');
		$(this).css('color', 'red')
	})

	$(document).scroll(function(event) {
		var step = $(this).scrollTop()
		if(step > 650) {
			$('.xqnavtop:hidden').fadeIn();
			$('.xqnavbottom').hide();

		} else {

			$('.xqnavtop').hide()
			$('.xqnavbottom').fadeIn()

		}

		$scope.scrolls = function() {
			if(!$('#xqcontent')[0]) return
			var xqtop = $('#xqcontent')[0].offsetTop;

			var cstop = $('#cs')[0].offsetTop;
			var pjtop = $('#pj')[0].offsetTop;
			if(step > xqtop - 80) {　
				$('.xqnav a').css('color', 'black');
				$('.xqnav a').eq(0).css('color', 'red')
			} else {
				$('#xqnav:hidden a').eq(0).css('color', 'red')
			}

			if(step > cstop - 200) {　
				$('.xqnav a').css('color', 'black');
				$('.xqnav a').eq(1).css('color', 'red')
			}
			if(step > pjtop - 130) {

				$('.xqnav a').css('color', 'black');
				$('.xqnav a').eq(2).css('color', 'red')
			}
		}

		$scope.scrolls()

	})

	$scope.scroll = function(id) {
		$('html, body').animate({
			scrollTop: $(id).offset().top - 100
		}, 800);
	}

	$scope.ckimg = function() {
		$('html, body').animate({
			scrollTop: 0
		}, 300);
	}
	$scope.mouseover = function($event) {
		var target = $event.target;
		$(target).animate({
			opacity: '0.22'
		}, 550)
	}

	$scope.mouseout = function($event) {
			var target = $event.target;
			$(target).stop();
			$(target).css('opacity', '1')

		}　
		//喜欢推荐
	$scope.xhtjBtn = parseInt(Math.ceil($scope.tjObj.length / 5));
	$('#xhtjcontent').css('width', $scope.xhtjBtn * 1200 + 'px');
	$('#xhbottom').css('width', $scope.xhtjBtn * 30 + 'px')
	xhBtn()

	function xhBtn() {
		for(var i = 0; i < $scope.xhtjBtn; i++) {
			$('#xhbottom').append('<i ></i>')　
		}
		$('#xhbottom i').eq(0).css('background', 'white')
		$('#xhbottom i').eq(0).css('border', 'solid 2px red')
	}

	$('#xhbottom i').hover(function() {
			var index = $(this).index()
			$('#xhtjcontent').animate({
				left: '-' + index * 1200 + 'px'
			}, 450)
			$('#xhbottom i').css('background', '#a4a4a4')
			$('#xhbottom i').css('border', 'none')
			$(this).css('background', 'white')
			$(this).css('border', 'solid 2px red')
		}, function() {

		})　
		///////////////////////////////////////////

	// 点击购买

	$('#gxdz span').click(function() {
		var index = $(this).index();
		$(this).css('border', 'solid 2px red')
		$(this).attr('data-active', 'true')
		$('#gxdz span').eq(index - 2).css('border', 'solid 2px #e8e8e8')
		$('#gxdz span').eq(index - 2).attr('data-active', '')
	})
	$('#gxdz span').hover(function() {
		$(this).css('border', 'solid 2px red')
	}, function() {
		var istrue = $(this).attr('data-active')
		if(!istrue) {
			$(this).css('border', 'solid 2px #e8e8e8');
			$(this).attr('data-active', '');
		}

	})

	$('#lwkw span').click(function() {
		$(this).css('border', 'solid 2px red')
		$(this).attr('data-active', 'true')
	})

	// go go go go go go  go go 

	function arrs(arr, obj) {
		dataarr = [];
		var isTrue = true;
		for(var i = 0; i < arr.length; i++) {
			var data = arr[i]
			if(data.id == obj.id && data.beizhu == obj.beizhu) {
				isTrue = false;
				console.log('id和备注重复');
				data.num = data.num += 1
			}
			dataarr.push(data)
		}

		if(isTrue) {
			dataarr.push(obj)
		}
		return dataarr
	}

	$('#go a').click(function() {
		var gxactiv = $('#gxdz span').attr('data-active');
		var gxactiv1 = $('#gxdz span').eq(1).attr('data-active');
		var lwactiv = $('#lwkw span').attr('data-active');
		if(!gxactiv && !gxactiv1) {
			alert('亲 , 您要选择 规格哦')
			return
		} else if(!lwactiv) {
			alert('亲 , 您要选择 款式哦')
		} else {

			$('#indexheader').css('display', 'none')
			$('#gouwuche:hidden').css('display', 'block')
			$state.go('index.gwmian')
			var arr
			var xqObj = $scope.xqObj;
			var beizhu = $('#gxdz').find('span[data-active="true"]')[0].innerText;
			if(!ZYStorage.local('shopping')) {
				arr = []

				arr.push({
					id: xqObj.timeStamp,
					title: xqObj.title,
					price: xqObj.price,
					beizhu: beizhu,
					num: 1,
					img: xqObj.detailed.smallImage[0],
					path: path

				})
				ZYStorage.local('shopping', arr)
			} else {
				arr = ZYStorage.local('shopping')

				var obj = {
					id: xqObj.timeStamp,
					title: xqObj.title,
					price: xqObj.price,
					num: 1,
					beizhu: beizhu,
					img: xqObj.detailed.smallImage[0],
					path: path

				}
				ZYStorage.local('shopping', arrs(arr, obj))
			}

		}

	})

	// 喜欢购买

	$scope.detailed = function($event, title) {

		var id = $event.target.id;
		console.log($event.target.id)
		$state.go('index.detailed', {
			title: title,
			id: id,
			path: path

		})
	}

	// 本地历史记录存储

	function historys(obj) {
		var isTorage = ZYStorage.session('history');
		var obj = {
			title: obj.title,
			price: obj.price,
			dz: obj.isdz,
			id: obj.timeStamp,
			urls: obj.bigImage,
			num: 1,
			dates: new Date(),
			path: obj.path

		}
		if(!isTorage) {
			var arr = [];
			arr.push(obj)
			ZYStorage.session('history', arr);
		} else {
			var torage = ZYStorage.session('history');
			var arr = []
			var isRepeat = true;
			torage.forEach(function(item, index) {
				if(item.id == obj.id) {
					item.num = item.num += 1;
					isRepeat = false;
				}
				arr.unshift(item)
			})
			if(isRepeat) {
				console.log(arr)
				arr.unshift(obj)
				console.log(arr)

			}
			ZYStorage.session('history', arr)
		}
	}

	console.log(ZYStorage.session('history'))

})

// index.footer 控制器
app.controller('footerController', function($scope, $interval) {
	$interval(function() {
		$scope.isHome = true;
		var hash = window.location.hash
		if(hash) {
			$scope.isHome = false;
		}
	}, 300)
})

// 购物车 控制器
app.controller('gwController', function($scope, $interval, $stateParams, $state) {
	$('#indexheader').css('display', 'none')
	$('#gouwuche:hidden').css('display', 'block');
	$scope.spdata = ZYStorage.local('shopping') ? ZYStorage.local('shopping') : false;
	zongjia()
	$('title').text('我的购物车')
	if(!$scope.spdata) {
		$('#heji').hide()
	}

	function zongjia() {
		if(!$scope.spdata) return
		var arrnum = []
		$scope.spdata.forEach(function(item, index) {
			arrnum.push(item.price * item.num)
			console.log(item)
		})

		$scope.zongji = arrnum.reduce(function(prev, next) {
			return prev + next
		})

	}

	$scope.jia = function(id, data, $event) {
		var beizhu = data.beizhu;
		var arr = []
		if(data.num > 4) {
			alert('限购5件')
			return
		}
		$event.target.style.cursor = 'pointer';
		$scope.spdata.forEach(function(item, index) {
			if(item.id == id && item.beizhu == beizhu) {
				item.num = item.num += 1
			}
			arr.push(item)
		})
		$scope.spdata = arr
		ZYStorage.local('shopping', arr)
		console.log($scope.spdata)
		zongjia($scope.spdata)
	}
	$scope.jian = function(id, data, $event) {

		if(data.num == 1) {
			$event.target.style.cursor = 'not-allowed';
			return
		}
		$event.target.style.cursor = 'pointer';
		var beizhu = data.beizhu;
		var arr = []
		$scope.spdata.forEach(function(item, index) {
			if(item.id == id && item.beizhu == beizhu) {

				item.num = item.num + (-1)
			}
			arr.push(item)
		})
		ZYStorage.local('shopping', arr)
		console.log($scope.spdata)
		zongjia($scope.spdata)
	}

	$scope.remove = function(id, beizhu) {

		var arr = [];
		$scope.spdata.forEach(function(item, index) {
			if(id == item.id && beizhu == item.beizhu) {

			} else {
				arr.push(item)
			}
		})
		if(!arr[0]) {
			$('#heji').fadeOut(20)
			$scope.spdata = false;
			ZYStorage.removeLocal('shopping');
			return
		} else {
			$scope.spdata = arr;
			ZYStorage.local('shopping', arr)

		}
		console.log('爱你一万年')
		zongjia($scope.spdata)
	}

	$scope.detailed = function(id, title, path) {
		$state.go('index.detailed', {
			title: title,
			id: id,
			path: path
		})
	}

})

// 历史记录 控制器

app.controller('lsController', function($scope, $state) {
	$scope.isShow = ZYStorage.session('history') ? true : false;
	$scope.historyObj = ZYStorage.session('history');
	$('title').text('历史记录')
	$scope.hoveShow = function($event) {
		var target = $event.target;
		var tiem = $(target).find('#showtiem');
		tiem.animate({
			left: '5px'
		}, 500)
	}

	$scope.leavHide = function($event) {
		var target = $event.target;
		var tiem = $(target).find('#showtiem');
		tiem.stop()
		tiem.animate({
			left: '-265px'
		}, 300)
	}
	$scope.clickgo = function(id, title, path) {

		$state.go('index.detailed', {
			title: title,
			id: id,
			path: path
		})
	}

})