// nav切换显示
function toggleNav() {
	var lis = document.querySelectorAll(".header-nav-cxq>.nav-list-cxq>li")
	var navs = document.querySelectorAll("#J_navMenu-cxq>.container-cxq>ul")
	var con = document.querySelector("#J_navMenu-cxq")
	for (let i = 0; i < lis.length; i++) {
		lis[i].index = i
		lis[i].onmouseenter = function() {
			con.style.height = 200 + 'px'
			for (let i = 0; i < navs.length; i++) {
				navs[i].style.display = 'none'
			}
			navs[this.index].style.display = 'block'
		}
	}
	con.onmouseleave = function() {
		con.style.height = 0 + 'px'
	}

}

//轮播
var id = 0

function getstyle(el, property) { //获取样式（兼容IE）
	if (getComputedStyle) {
		return getComputedStyle(el)[property];
	} else {
		return el.currentStyle[property];
	}
}

function animate(el, properties) { //动画函数，从获取位置property运动到指定位置target
	clearInterval(el.timerId); //清空上个定时器，以免重复
	el.timerId = setInterval(function() { //在20ms内执行动画函数
		for (var property in properties) { //propertys为一个对象，可同时改变多个值（宽、高、透明度......)
			var current;
			var target = properties[property];
			if (property === 'opacity') { //透明度为小数且没单位，算法不同
				current = Math.round(parseFloat(getstyle(el, 'opacity')) * 100);
			} else {
				current = parseInt(getstyle(el, property));
			}
			var speed = (target - current) / 30; //速度先快后慢
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (property === 'opacity') {
				el.style.opacity = (current + speed) / 100;
			} else {
				el.style[property] = current + speed + 'px';
			}
		}

	}, 30)
}

function sliderPre() { //前一张
	preIndex = nextIndex;
	nextIndex--;
	if (nextIndex == -1) { //第一张的前一张是最后一张
		nextIndex = len - 1;
	}
	sliderTo(preIndex, nextIndex);

}

function sliderNext() { //下一张
	preIndex = nextIndex;
	nextIndex++;
	if (nextIndex == len) { //最后一张的下一张是第一张
		nextIndex = 0;
	}
	sliderTo(preIndex, nextIndex);
}

function sliderTo(pre, next) { //切换函数（用于上一张、下一张函数内来进行图片切换


	var bullets = document.querySelectorAll("#J_homeSwiper-cxq .swiper-pagination-cxq > a") //当前图片序号作为焦点被点亮
	bullets[pre].style.opacity = '1'
	bullets[next].style.opacity = '.4'

	var lis = document.querySelectorAll("#J_homeSwiper-cxq>.swiper-wrapper-cxq>.swiper-slide-cxq")
	animate(lis[pre], {
		opacity: 0
	}); //前一张透明度变为0
	animate(lis[next], {
		opacity: 100
	}); //后一张透明度变为1
}

function auto() { //自动轮播
	clearInterval(id); //清空之前定时器以免重复
	id = setInterval(function() { //定时器自动轮播下一张
		sliderNext();
	}, 2000)
}

function stopAuto() { //停止自动轮播
	clearInterval(id);
}

function play() { //轮播播放函数
	preIndex = 0;
	nextIndex = 0;
	len = document.querySelectorAll("#J_homeSwiper-cxq>.swiper-wrapper-cxq>.swiper-slide-cxq").length;


	document.querySelector("#J_homeSwiper-cxq .swiper-button-prev").onclick = function() { //点击向右向右箭头时图片变化
		sliderPre();
	}
	document.querySelector("#J_homeSwiper-cxq .swiper-button-next").onclick = function() {
		sliderNext();
	}

	var bullets = document.querySelectorAll("#J_homeSwiper-cxq .swiper-pagination-cxq > a") //点击下方序号时图片变化
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].index = i;
		bullets[i].onclick = function() {
			preIndex = nextIndex;
			nextIndex = this.index;
			sliderTo(preIndex, nextIndex);
		}
	}

	auto(); //自动轮播
	var slider = document.querySelector("#J_homeSwiper-cxq")
	slider.onmouseover = function() { //鼠标放上时停止自动轮播
		stopAuto();
	}
	slider.onmouseout = function() { //鼠标拿下时开始
		auto();
	}
}

//轮播图中的tab切换显示
function toggleTabInlb() {
	var aLis = document.querySelectorAll("#J_categoryList-cxq .category-item-cxq") //获取所有tab切换的li
	var aPanels = document.querySelectorAll("#J_categoryList-cxq li .children-cxq") //获取所有需要显示的面板
	var container = document.querySelector("#J_categoryList-cxq")
	for (let i = 0; i < aLis.length; i++) {
		aLis[i].index = i
		aPanels[i].index = i
		aLis[i].onmouseover = function() {
			for (let i = 0; i < aLis.length; i++) {
				aLis[i].classList.remove('cur')
			}
			for (let i = 0; i < aPanels.length; i++) {
				aPanels[i].style.display = 'none'
			}
			aLis[this.index].classList.add('cur')
			aPanels[this.index].style.display = 'block'
		}
	}
	//鼠标移出面板时隐藏面板
	for (let i = 0; i < aPanels.length; i++) {
		aPanels[i].onmouseleave = function() {
			for (let i = 0; i < aPanels.length; i++) {
				aPanels[i].style.display = 'none'
			}
		}
	}
	container.onmouseleave = function() {
		for (let i = 0; i < aPanels.length; i++) {
			aPanels[i].style.display = 'none'
		}
		for (let i = 0; i < aLis.length; i++) {
			aLis[i].classList.remove('cur')
		}
	}
}

//商品展示栏的切换显示
function toggleShowGoods() {
	var aLis = document.querySelectorAll("#tab-list-cxq > li")
	var aPanels = document.querySelectorAll("#span16-cxq > ul")
	for (let i = 0; i < aLis.length; i++) {
		aLis[i].index = i
		aPanels[i].index = i
		aLis[i].onmouseenter = function() {
			for (let i = 0; i < aLis.length; i++) {
				aLis[i].style.borderBottom = '2px solid rgba(0,0,0,0)'
				aLis[i].style.color = '#424242'
			}
			for (let i = 0; i < aPanels.length; i++) {
				aPanels[i].style.display = 'none'
			}
			aLis[this.index].style.borderBottom = '2px solid #ff6700'
			aLis[this.index].style.color = '#ff6700'
			aPanels[this.index].style.display = 'block'
		}
	}
}

function toggleShowGoodsA() {
	var aLis = document.querySelectorAll("#tab-list1-cxq > li")
	var aPanels = document.querySelectorAll("#span16-cxq-1 > ul")
	for (let i = 0; i < aLis.length; i++) {
		aLis[i].index = i
		aPanels[i].index = i
		aLis[i].onmouseenter = function() {
			for (let i = 0; i < aLis.length; i++) {
				aLis[i].style.borderBottom = '2px solid rgba(0,0,0,0)'
				aLis[i].style.color = '#424242'
			}
			for (let i = 0; i < aPanels.length; i++) {
				aPanels[i].style.display = 'none'
			}
			aLis[this.index].style.borderBottom = '2px solid #ff6700'
			aLis[this.index].style.color = '#ff6700'
			aPanels[this.index].style.display = 'block'
		}
	}
}

function toggleShowGoodsB() {
	var aLis = document.querySelectorAll("#tab-list2-cxq > li")
	var aPanels = document.querySelectorAll("#span16-cxq-2 > ul")
	for (let i = 0; i < aLis.length; i++) {
		aLis[i].index = i
		aPanels[i].index = i
		aLis[i].onmouseenter = function() {
			for (let i = 0; i < aLis.length; i++) {
				aLis[i].style.borderBottom = '2px solid rgba(0,0,0,0)'
				aLis[i].style.color = '#424242'
			}
			for (let i = 0; i < aPanels.length; i++) {
				aPanels[i].style.display = 'none'
			}
			aLis[this.index].style.borderBottom = '2px solid #ff6700'
			aLis[this.index].style.color = '#ff6700'
			aPanels[this.index].style.display = 'block'
		}
	}
}

function toggleShowGoodsC() {
	var aLis = document.querySelectorAll("#tab-list3-cxq > li")
	var aPanels = document.querySelectorAll("#span16-cxq-3 > ul")
	for (let i = 0; i < aLis.length; i++) {
		aLis[i].index = i
		aPanels[i].index = i
		aLis[i].onmouseenter = function() {
			for (let i = 0; i < aLis.length; i++) {
				aLis[i].style.borderBottom = '2px solid rgba(0,0,0,0)'
				aLis[i].style.color = '#424242'
			}
			for (let i = 0; i < aPanels.length; i++) {
				aPanels[i].style.display = 'none'
			}
			aLis[this.index].style.borderBottom = '2px solid #ff6700'
			aLis[this.index].style.color = '#ff6700'
			aPanels[this.index].style.display = 'block'
		}
	}
}

function toggleShowGoodsD() {
	var aLis = document.querySelectorAll("#tab-list4-cxq > li")
	var aPanels = document.querySelectorAll("#span16-cxq-4 > ul")
	for (let i = 0; i < aLis.length; i++) {
		aLis[i].index = i
		aPanels[i].index = i
		aLis[i].onmouseenter = function() {
			for (let i = 0; i < aLis.length; i++) {
				aLis[i].style.borderBottom = '2px solid rgba(0,0,0,0)'
				aLis[i].style.color = '#424242'
			}
			for (let i = 0; i < aPanels.length; i++) {
				aPanels[i].style.display = 'none'
			}
			aLis[this.index].style.borderBottom = '2px solid #ff6700'
			aLis[this.index].style.color = '#ff6700'
			aPanels[this.index].style.display = 'block'
		}
	}
}

//微信显示隐藏
function showHide() {
	var li = document.querySelector("#wx-cxq")
	var wx = document.querySelector("#J_followWxImg-cxq")
	// console.log(li,wx)
	li.onmouseenter = function() {
		wx.style.display = 'block'
	}
	li.onmouseleave = function() {
		wx.style.display = 'none'
	}
}

//滚轮监听
function scroll() {
	var Top = 0
	var backToTop = document.querySelector("#back-cxq")
	// console.log(backToTop)
	document.body.onscroll = function() {
		Top = document.documentElement.scrollTop || document.body.scrollTop
		// console.log(Top)
		if (Top >= 900) {
			backToTop.style.display = 'block'
		} else {
			backToTop.style.display = 'none'
		}
	}
}
