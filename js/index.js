/*清除默认事件*/
document.addEventListener('touchstart',function(e){
	e.preventDefault();
});

(function(){
	setloading();
	setPers();
})();
/*根据屏幕大小适配景深*/
function setPers(){
	resetview();
	window.onresize = resetview;
	function resetview(){
		var deg=52.5;
		var view=document.querySelector('#view');
		var main=document.querySelector('#main');
		var height=document.documentElement.clientHeight;
		var R=Math.round(Math.tan(deg*Math.PI/180)*height*.5);
		view.style.perspective=view.style.WebkitPerspective=R+'px';
		css(main,'translateZ',R);
	}
}

/*图片预加载*/
function setloading(){
	var logoText=document.querySelector('.logo-text');
	var data=[];
	var num=0;
	for (var s in imgData){
		data=data.concat(imgData[s]);
	}
	for(var i=0;i<data.length;i++){
		var img=new Image();
		img.onload=function(){
			num++;
			logoText.innerHTML='已加载'+parseInt(num/data.length*100)+'%';
			if(num==data.length){
				anmt();
			}
		}
		img.src=data[i];
	}
}
/*加载完成的函数*/
function anmt(){
	var logo1=document.querySelector('.logo1');
	MoveTween({
		el:logo1,
		target:{opacity:0},
		time:1000,
		type:'easeOut',
		callBack:anmt1
	})
}
/*创建第二张logo让它显示出来*/
var rotateY1=0;
function anmt1(){
	var oimg=document.createElement('img');
	oimg.src=imgData.logo[0];
	var odiv=document.createElement('div');
	odiv.id="logo2";
	odiv.className='logo-image';
	odiv.appendChild(oimg);
	var view=document.querySelector('#view');
	view.appendChild(odiv);
	var logo1=document.querySelector('.logo1');
	view.removeChild(logo1);
	css(odiv,'translateZ',-2000);
	MoveTween({
		el:odiv,
		target:{translateZ:0},
		time:300,
		type:'easeBoth',
		callBack:anmt2
	});
}
/*隐藏第二张logo*/
function anmt2(){
	setTimeout(function(){
		MoveTween({
			el:logo2,
			target:{translateZ:-1000},
			time:1600,
			type:'easeInStrong',
			callBack:anmt3
		});
	},1000);
}
/*创建第三张LOGO*/
function anmt3(){
	var oimg=document.createElement('img');
	oimg.src=imgData.logo[1];
	var odiv=document.createElement('div');
	odiv.id="logo3";
	odiv.className='logo-image';
	odiv.appendChild(oimg);
	var view=document.querySelector('#view');
	var logo2=document.querySelector('#logo2');
	view.removeChild(logo2);
	view.appendChild(odiv);
	css(odiv,'translateZ',-1000);
	MoveTween({
		el:odiv,
		target:{translateZ:0},
		time:300,
		type:'easeBoth',
		callBack:anmt4
	});
}
/*隐藏第三张LOGO*/
function anmt4(){
	setTimeout(function(){
		var logo3=document.querySelector('#logo3')
		MoveTween({
			el:logo3,
			target:{translateZ:-500},
			time:1600,
			type:'easeInStrong',
			callBack:function(){
				view.removeChild(logo3);
				boomCreate();
			}
		});
	},1000);
}
/*生成爆炸效果*/
function boomCreate(){
	var iconLength=27;
	var logo4=document.createElement('div');
	logo4.id='logo4';
	var view=document.querySelector('#view');
	view.appendChild(logo4);
	var logo4Item=document.createElement('div');
	logo4Item.id='logo4Item';
	logo4.appendChild(logo4Item);
	css(logo4,'translateZ',-2000);
	css(logo4,'scale',10);
	for(var i=0;i<iconLength;i++){
		var span=document.createElement('span');
		span.className='icon';
		var url='url('+imgData.logoIco[i%9]+')';
		span.style.backgroundImage=url;
		logo4Item.appendChild(span);
		var degY=Math.random()*360;
		var degX=Math.random()*360;
		var R=20+(Math.random()*240);
		css(span,'rotateY',degY);
		css(span,'rotateX',degX);
		css(span,'translateZ',R);
	}
	var logo4Text=document.createElement('div');
	logo4Text.id='logo4Text';
	logo4Text.style.backgroundImage='url('+imgData.logo[2]+')';
	logo4.appendChild(logo4Text);
	
	MoveTween({
		el:logo4,
		target:{
			translateZ:0,
			scale:100
		},
		time:300,
		type:'easeOutStrong',
		callBack:function(){
			setTimeout(function(){
				anmt5();
			},300)
		}
	})
}
/*爆炸效果移除*/
function anmt5(){
	var view=document.querySelector('#view');
	var logo4=document.querySelector('#logo4');
	MoveTween({
		el:logo4,
		target:{
			translateZ:-2000,
			scale:10
		},
		time:2000,
		type:'easeInStrong',
		callBack:function(){
			view.removeChild(logo4);
			anmt6();
		}
	});
}
/*开场动画*/
function anmt6(){
	anmt7();
	anmt8();
	var bg=document.querySelector('#bg');
	var start=document.querySelector('#start');
	css(start,'translateZ',-2000);
	css(bg,'rotateY',25);
	var deg=360/imgData.bg.length;
	var Z=Math.floor(129/2/Math.tan(deg/2*Math.PI/180));
	var startDeg=180;
	for(var i=0;i<20;i++){
		var span=document.createElement('span');
		span.style.backgroundImage='url('+imgData.bg[i]+')';
		span.style.display='none'
		css(span,'rotateY',startDeg);
		css(span,'translateZ',-Z+5);
		startDeg-=deg;
		bg.appendChild(span);
	}
	var allspan=document.querySelectorAll('#bg span');
	var i=0;
	timer=setInterval(function(){
		allspan[i].style.display='block';
		i++;
		if(i==20){
			clearInterval(timer);
		}
	},3600/2/20);
	MoveTween({
		el:start,
		target:{
			translateZ:-160,
		},
		time:3600,
		type:'easeOut'
	});
	MoveTween({
		el:bg,
		target:{
			rotateY:740
		},
		time:3600,
		type:'linear',
	});
}
/*生成云朵效果*/
function anmt7(){
	var clound=document.querySelector('#clound');
	css(clound,'translateZ',300);
	var R=200+(Math.random()*150);
	for(var i=0;i<9;i++){
		var span=document.createElement('span');
		var deg=(360/9)*i;
		span.style.backgroundImage='url('+imgData.clound[i%3]+')';
		var x=Math.sin(deg*Math.PI/180)*R;
		var z=Math.cos(deg*Math.PI/180)*R;
		var y=(Math.random()-.5)*200;
		span.style.display='none';

		clound.appendChild(span);
		css(span,'translateX',x);
		css(span,'translateZ',z);
		css(span,'translateY',y);
	}
	var nub=0;
	var timer = setInterval(function(){
		clound.children[nub].style.display = "block";
		nub++;
		if(nub >= clound.children.length){
			clearInterval(timer);
		}
	},50);
	MoveTween({
		el:clound,
		target:{rotateY:360},
		time:3600,
		type:'easeBoth',
		callIn:function(){
			var deg=css(clound,'rotateY');
			var spanAll=clound.querySelectorAll('span');
			for(var i=0;i<spanAll.length;i++){
				css(spanAll[i],'rotateY',-deg);
			}
		},
		callBack:function(){
			clound.parentNode.removeChild(clound);
			bgShow();
		}
	});
}
/*设置陀螺仪*/
function settly(){
	var bg=document.querySelector('#bg');
	var pano=document.querySelector('#pano');
	var start=document.querySelector('#start');
	var last={};
	var init={};
	var now={};
	var startEl={};
	var lastTime=Date.now();
	window.isTouch=false;
	window.isstart=false;
	var dir=window.orientation;
	window.addEventListener('orientationchange',function(e){
		dir=window.orientation;
	})
	window.addEventListener('deviceorientation',function(e){
		var nowTime=Date.now();
		if(nowTime-lastTime<30){
			return;
		}
		switch(dir){
			case 0:
				var x=e.beta;
				var y=e.gamma;
				break;
			case 90:
				var x=e.gamma;
				var y=e.beta;
				break;
			case -90:
				var x=-e.gamma;
				var y=-e.beta;
				break;
			case 180:
				var x=-e.beta;
				var y=-e.gamma;
				break;
		}	
		if(isTouch){
			return;
		}
		lastTime=nowTime;
		if(!isstart){
			isstart=true;
			start.x=x;
			start.y=y;
			startEl.y=css(pano,'rotateY');
			startEl.x=css(start,'rotateX');
		}else{
			now.x=x;
			now.y=y;
			var dis={};
			dis.x=now.x-start.x;
			dis.y=(now.y-start.y);
			var deg={};
			deg.x=startEl.x+dis.x;
			deg.y=startEl.y-dis.y;
			if(deg.x>30){
				deg.x=30;
			}
			if(deg.x<-30){
				deg.x=-30;
			}
			MoveTween({
				el:bg,
				target:{
					rotateY:deg.y,
				},
				time:800,
				type:'easeOut',
			});
			MoveTween({
				el:pano,
				target:{
					rotateY:deg.y,
				},
				time:800,
				type:'easeOut',
			});
			MoveTween({
				el:start,
				target:{
					rotateX:deg.x,
				},
				time:800,
				type:'easeOut',
			});
		}
	});
}

/*设置滑屏事件*/
function setDarg(){
	var bg=document.querySelector('#bg');
	var start=document.querySelector('#start');
	var pano=document.querySelector('#pano');
	var start=document.querySelector('#start');
	var translateZ=css(start,'translateZ');
	var startPoint={x:0,y:0};
	var nowPoint={x:0,y:0};
	var dis={x:0,y:0};
	var eleDeg={y:0,x:0};
	var scale={x:129/18,y:1170/45};
	var disDeg={y:0,x:0};
	var btn=true;

	document.addEventListener('touchstart',function(ev){
		window.isTouch=true;
		disDeg.y=0;
		startPoint.x=ev.changedTouches[0].pageX;
		eleDeg.y=css(bg,'rotateY');
		startPoint.y=ev.changedTouches[0].pageY;
		eleDeg.x=css(start,'rotateX');
		clearInterval(start.timer);
		clearInterval(bg.timer);
		clearInterval(pano.timer);
	});
	document.addEventListener('touchmove',function(ev){
		nowPoint.x=ev.changedTouches[0].pageX;
		dis.x=nowPoint.x-startPoint.x;
		nowPoint.y=ev.changedTouches[0].pageY;
		dis.y=nowPoint.y-startPoint.y;
		disDeg.y=dis.x/scale.x;
		disDeg.x=dis.y/scale.y;
		var DegX=eleDeg.x+disDeg.x;
		if(DegX>30){
			DegX=30;
		}
		if(DegX<-30){
			DegX=-30;
		}
		css(bg,'rotateY',eleDeg.y-disDeg.y);
		css(start,'rotateX',DegX);
		css(pano,'rotateY',eleDeg.y-disDeg.y*.92);
		if(Math.abs(dis.x)>150){
			dis.x=150;
		}
		css(start,'translateZ',translateZ-Math.abs(dis.x));
	});
	document.addEventListener('touchend',function(){
		var panoY=css(pano,'rotateY');
		a=disDeg.y;
		if(disDeg.y>5){
			disDeg.y=5;
		}else if(disDeg.y<-5){
			disDeg.y=-5;
		}
		MoveTween({
			el:start,
			target:{
				translateZ:translateZ,
			},
			time:600,
			type:'linear'
		});
		MoveTween({
			el:bg,
			target:{rotateY:eleDeg.y-a},
			time: 600,
			type: "easeOut"
		});
		MoveTween({
			el:pano,
			target:{rotateY:eleDeg.y-a},
			time: 600,
			type: "easeOut",
			callBack:function(){
				isTouch=false;
				isstart=false;
			}
		});
	})
}
/*显示背景*/
function bgShow(){
	var pageBg=document.querySelector('#pageBg');
	MoveTween({
		el:pageBg,
		target:{opacity:100},
		time:1000,
		type:'easeBoth'
	})
}
/*生成漂浮层*/
function anmt8(){
	var pano=document.querySelector('#pano');
	css(pano,'rotateX',0);
	css(pano,'rotateY',-180);
	css(pano,'scale',0);
	var R=401;
	var deg=180;
	var pano1=document.createElement('div');
	var num=0;
	pano.appendChild(pano1);
	pano1.className='pano';
	css(pano1,'translateX',1.564);
	css(pano1,'translateZ',-9.877);
	for(var i=0;i<2;i++){
		var span=document.createElement('span');
		span.style.cssText='height:344px;margin-top:-172px';
		span.style.backgroundImage='url('+imgData.pano[num]+')';
		css(span,'translateY',-163);
		css(span,'rotateY',deg);
		css(span,'translateZ',-R);
		deg-=18;
		num++;
		pano1.appendChild(span);
	}
	var pano2=document.createElement('div');
	pano.appendChild(pano2);
	pano2.className='pano';
	css(pano2,'translateX',20.225);
	css(pano2,'translateZ',-14.695);
	for(var i=0;i<3;i++){
		var span=document.createElement('span');
		span.style.cssText='height:326px;margin-top:-163px';
		span.style.backgroundImage='url('+imgData.pano[num]+')';
		css(span,'translateY',278);
		css(span,'rotateY',deg);
		css(span,'translateZ',-R);
		deg-=18;
		num++;
		pano2.appendChild(span);
	}
	var pano3=document.createElement('div');
	pano.appendChild(pano3);
	pano3.className='pano';
	css(pano3,'translateX',22.175);
	css(pano3,'translateZ',-11.35);
	for(var i=0;i<4;i++){
		var span=document.createElement('span');
		span.style.cssText='height:195px;margin-top:-97.5px';
		span.style.backgroundImage='url('+imgData.pano[num]+')';
		css(span,'translateY',192.5);
		css(span,'rotateY',deg);
		css(span,'translateZ',-R);
		deg-=18;
		num++;
		pano3.appendChild(span);
	}
	var pano4=document.createElement('div');
	pano.appendChild(pano4);
	pano4.className='pano';
	css(pano4,'translateX',20.225);
	css(pano4,'translateZ',14.695);
	deg=90;
	for(var i=0;i<5;i++){
		var span=document.createElement('span');
		span.style.cssText='height:468px;margin-top:-234px';
		span.style.backgroundImage='url('+imgData.pano[num]+')';
		css(span,'translateY',129);
		css(span,'rotateY',deg);
		css(span,'translateZ',-R);
		deg-=18;
		num++;
		pano4.appendChild(span);
	}
	var pano5=document.createElement('div');
	pano.appendChild(pano5);
	pano5.className='pano';
	
	css(pano5,'translateX',-11.35);
	css(pano5,'translateZ',22.275);

	deg=18;
	for(var i=0;i<6;i++){
		var span=document.createElement('span');
		span.style.cssText='height:582px;margin-top:-291px';
		span.style.backgroundImage='url('+imgData.pano[num]+')';
		css(span,'translateY',256);
		css(span,'rotateY',deg);
		css(span,'translateZ',-R);
		deg-=18;
		num++;
		pano5.appendChild(span);
	}
	var pano6=document.createElement('div');
	pano.appendChild(pano6);
	pano6.className='pano';
	css(pano6,'translateX',-4.54);
	css(pano6,'translateZ',9.91);
	deg=18;
	for(var i=0;i<6;i++){
		var span=document.createElement('span');
		span.style.cssText='height:444px;margin-top:-222px';
		span.style.backgroundImage='url('+imgData.pano[num]+')';
		css(span,'translateY',-13);
		css(span,'rotateY',deg);
		css(span,'translateZ',-R);
		deg-=18;
		num++;
		pano6.appendChild(span);
	}
	setTimeout(function(){
		MoveTween({
			el:pano,
			target:{
				rotateY:20,
				scale:100,
			},
			time:1000,
			type:'easeOut',
			callBack:function(){
				css(pano,'rotateY',740);
				setDarg();
				settly();	
			}
		})
	},3300)
}