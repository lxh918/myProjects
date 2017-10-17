var express = require('express');

var multer = require('multer');

var fs = require('fs')

var app = express();

app.use(express.static('publi'))
/*
var girlArr = [];

function girlData(num, isClearFile,isTrue) {
	var snData = {
		title: '羊咩咩水壶袋',
		price: Math.floor(Math.random()*(800-80)+80),
		commentNum: 3,
		bigImage: 'http://img3.liwuyou.com/images/201609/source_img/3513_P_1473059092162.jpg!220',
		detailed: {
			smallImage: ['http://img3.liwuyou.com/images/201609/source_img/3513_P_1473059092162.jpg!pro500.jpg',
				'http://img4.liwuyou.com/images/201411/source_img/3513_P_1415164822943.jpg!pro500.jpg',
				'http://img5.liwuyou.com/images/201411/source_img/3513_P_1415164823239.jpg!pro500.jpg',
				'http://img2.liwuyou.com/images/201411/source_img/3513_P_1415164817996.jpg!pro500.jpg',
				'http://img5.liwuyou.com/images/201411/source_img/3513_P_1415164822959.jpg!pro500.jpg'
			],

			bigtitle: '羊咩咩暖水袋',
			smalltitle: '这个冬天再也不用担心她的手会很冰冷的啦，送一个羊咩咩暖水袋，造型超萌，毛茸茸的摸上去非常柔软舒服！而且是让每一位消费者放心的水电分离模式，安全再加一把锁哦！在冬季，无论她是否在你身边，都可以为你心上在乎的那个她，送上一片温暖！ ',
			customPrice: '88',
			goodsData: ['http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_01(2203).jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_02(5156).jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_03.jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_04.jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_05.jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_06(7026).jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_07.jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_08.jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_09(7350).jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E6%AF%9B%E7%BB%92%E5%B0%8F%E7%BE%8A%E6%83%85%E9%A1%B5-%E6%94%B9_10.jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/8(8575)(3800).jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/10(4062)(7482).jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/11(1387)(3024).jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E7%BE%8A%E6%9A%96%E6%89%8B%E5%AE%9D%20%20%E5%8C%85%E8%A3%85.jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E5%86%85%E9%A1%B5%E5%AE%98%E7%BD%91_02(4020).jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E5%86%85%E9%A1%B5%E5%AE%98%E7%BD%91_03.jpg',
				'http://liwuyou.b0.upaiyun.com/images/upload/Image/%E5%86%85%E9%A1%B5%E5%AE%98%E7%BD%91_04.jpg',
			],
			parameter: [''],
			shineComment: '名称： 羊咩咩暖水袋  & 内容：管管最帅！ 羊羊暖水袋一个（ 水电分离） & 材质： 超短绒毛（ 内填充PP棉) & 颜色： 棕色 & 充电情况： 通电时指示灯亮， 充电完成后指示灯灭， 发出滴滴的声音拔下电源即可 &最高温度： 70 度 &包装： 精美包装',
			tishi:'特别提示：（ 内容：管管最帅！） 请保持充电接口的干燥， 充电时请勿使用！ 儿童请在家长监护下使用！',
			seek: {
				seekAll: [{
					seekTitle: 'US00004C37C',
					time: new Date(),
					textContent: '盆友很喜欢~ 说很实用'
				}, {
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '棒棒哒！ 很喜欢哦！'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '女朋友不喜欢！ 恶心死我了！'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '爱你一万年，爱你一万年'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '春眠不觉晓，处处闻啼鸟'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '夜来风雨声，花落知多少'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '林花谢了春红'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '太匆匆'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '无奈朝来寒雨晚来风'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '胭脂泪'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '相留醉'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '几时重'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '自是人声长恨'
				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '水长东	'
				}],
				seekImage: [{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				},{
					seekTitle: 'US000052E06  ',
					time: new Date(),
					textContent: '很好的礼物！ 很喜欢哦！',
					images: ['http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051383834536244.jpg!480', 'http://img3.liwuyou.com/images/shaidan/201701/10/159206/1484051388022045367.jpg!480', 'http://img5.liwuyou.com/images/shaidan/201701/10/159206/1484051394119029304.jpg!480']

				}]
			}
		}
	}

	snData.timeStamp = num;
	snData.isdz = isTrue;
	girlArr.push(snData)
	
	if(!isClearFile) return;
	fs.mkdir(__dirname + '/dataAll', function(err) {
		var path =  'dataAll/'+num+'.txt'	
		if(!err) return
		fs.writeFile(path, JSON.stringify(snData), function(err) {
			if(err) {
				console.error(err);
			} else {
				console.log('写入成功');
			}
		});
	});
}

for(var i = 0; i < 50; i++) {

	var mathNum = new Date().getTime() + Math.floor(Math.random() * 10000);
	
	var random = Math.random()*10
	var isTrue = random>5;
	console.log(isTrue)
	girlData(mathNum,true,isTrue)

}
var snObj = {
	category: ['项链', '手链', '戒指', '耳环'],
	bodyObj: girlArr
}

fs.writeFile('goodsData/少女心饰.txt', JSON.stringify(snObj), {
	flag: 'a'
}, function(err) {
	if(err) {
		console.error(err);
	} else {
		console.log('写入成功');
	}
});*/

// fs.writeFile(filename,data,[options],callback);
/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

app.get('/fenlei', function(request, response) {
	var path = 'goodsData/' + request.query.id + '.txt';
	console.log(path)
	fs.readFile(path, {
		flag: 'r+',
		encoding: 'utf8'
	}, function(err, data) {
		if(data) {
			response.send(data)
		}
	});

})
app.get('/xiangqing', function(request, response) {
	var tjArr = [];
	var path = 'dataAll/' + request.query.id + '.txt';
	var tuijianPath = 'goodsData/' + request.query.path + '.txt';
	console.log(path)
	var  xq; 
	fs.readFile(path, {
		flag: 'r+',
		encoding: 'utf8'
	}, function(err, data) {
		if(data) {
			xq = data
			fs.readFile(tuijianPath, {
				flag: 'r+',
				encoding: 'utf8'
			}, function(err, data) {
				if(data) {

					var bodyObj = JSON.parse(data).bodyObj;
					var minNum = Math.floor(Math.random() * (20 - 3) + 3);
					var maxNum = Math.floor(Math.random() * (bodyObj.length - minNum) + minNum)
					for(var i = minNum; i < maxNum; i++) {
						tjArr.push(bodyObj[i])
					}
					var xqdata = {
						xq: xq,
						tj: tjArr
					}
					response.send(xqdata)
				}
			});
		}
	});

})
app.listen('8080', function() {
	console.log('服务器已经打开！')
})