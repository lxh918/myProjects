ZYStorage = {
	session:function(name,value){
		if(name && value){
			if(typeof value == 'object'){
				value = JSON.stringify(value)	
			}
			sessionStorage.setItem(name,value)
			return;
		};
		
		if(name){
			var value = sessionStorage.getItem(name);
			try{
				value  = JSON.parse(value)
			}catch(e){
				var texts = '错误信息是：'+e.description+
							'/n/n'+'点击按钮确认本次操作！'
				if(!confirm(texts)){
					window.location.href = 'http://www.baidu.com';
				}
			}
			return value;
		}
	},
	removeSession:function(name){
		sessionStorage.removeItem(name);
	},
	
	local:function(name,value){
		if(name  && value){
			if(typeof value == 'object'){
				value = JSON.stringify(value)
			}
			localStorage.setItem(name,value)
		};
		
		if(name){
			var value = localStorage.getItem(name)
			try{
				 value = JSON.parse(value)
			}catch(e){
				var texts = '您找的不是一个JSON数据'+
				'/n/n'+'错误信息：'+e.description+
					'/n/n'+'是否跳转的首页？'
				if(!confirm(texts)){
					window.location.href = 'http://www.baidu.com'
				}
			}
			return value
			 
		};
		
	
	},
	removeLocal:function(name){
		localStorage.removeItem(name);
	}
	
}
