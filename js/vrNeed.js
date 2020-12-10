  
//加载完成
readyToStart = function () {
    console.log('开始了动画');
   
    this.gameInstance.SendMessage("WebToUnityMgr", 'BeginToRun')
    // console.log('airexpress')
    
}
showOpen = function(){
	 document.getElementById("open").classList.remove("disNone");
	 console.log("显示按钮");
};

// 认知实验结束
renZhiJieShu=function() {
//此处显示下部内容和下一步按钮
    document.getElementById('step02').style.height="auto";
    // 模拟动画结束
    // setTimeout(function(){
        // console.log('退出全屏');// 退出全屏
        console.log('调用了认知结束接口');
        // document.getElementById("VR").classList.add('canvasShow')
    //     // isShowVr();// 动画半隐藏
    // },3000);
    app.dialogVisible = true;
    gameInstance.SetFullscreen(0) //关闭全屏
},

weiTuoYunSHuJieShu=function(){
    // closeScreen()
    // document.getElementById('step03').style.height="auto";
    // app.weiTuoYunShuTips = true;
    document.getElementById("step03").classList.add("stepShow")
    console.log('委托运输结束')
    gameInstance.SetFullscreen(0) //关闭全屏
    // document.getElementById("VR").classList.add('canvasShow')
}

// 交货要用到的函数
jiaohuoneed = function(arr){
    
    var label_data = arr.toString();
    var student_msg = JSON.parse(sessionStorage.getItem('student_msg'));
    if(null!=student_msg && student_msg!=''){
        pub._InitAxios({
        _url: pub._url, //公共接口
        ur: pub._DetailApi.saveLabelParam,//保存实验标签
        data:{label_data,...student_msg},
        cbk:function(res){
            console.log('交货进行到这一步了');
            // document.getElementById('step04').style.height="auto";
            app.saveTable(); //跳转下一步试验
            
            // document.getElementsByClassName('_box')[0].style.height = 0; //动画隐藏
        },
        
    })
    }
};

// 交货结束
jiaoHuoJieShu=function(num1, num2, num3, num4, num5, num6, num7) {
    console.log("交火结束");
    // closeScreen();
    var arr = []
    for (var i = 1; i <= arguments.length; i++) {
        if (arguments[i - 1] == "True") {
            console.log(i);
            arr.push(i)
        } else {
            arr.push('8')
        }
    }
    console.log(num1,typeof(num1));
    console.log(arguments);
    jiaohuoneed(arr);
    gameInstance.SetFullscreen(0) //关闭全屏
    console.log(arr.toString());
},
// 打板结束
daBanJieShu=function() {
    // 显示打板选择题
    document.getElementById('step07').classList.add("stepShow");
    console.log('打板动画结束');
    gameInstance.SetFullscreen(0) //关闭全屏
    //app.daBanTips = true; //打开选择题弹窗
},
// 货物装机结束 ，，写在了vue里
// huoWuZhuangJiJieShu
// 接单接货
jieDanJieHuo=function(val1,val2,val3,val4) {
    console.log("调用了接单接货接口");
    console.log(val1,val2,val3,val4);
    var receive_orders_goods_data;
    if(val1 == "False"){
        receive_orders_goods_data = {
            status:val1.toString(),
            subject_one:val2.toString(),
            subject_two:val3.toString(),
            subject_three:val4.toString(),
        }
    }else{
        receive_orders_goods_data = {
            status:val1.toString(),
            subject_one:"ABCD",
            subject_two:"C",
            subject_three:"B",
        }
    } 
    console.log(receive_orders_goods_data);
    var student_msg = JSON.parse(sessionStorage.getItem('student_msg'));
    if(null!=student_msg && student_msg!=''){
        pub._InitAxios({
        _url: pub._url, //公共接口
        ur: pub._DetailApi.saveReceiveOrdersGoodsParam,//接单接货
        data:{receive_orders_goods_data,...student_msg},
        cbk:function(res){
            console.log(res);
            jieHuoNeed();
            console.log("接单接货接口发送了请求");
        },
        // cat:function(cat){
        //     console.log(cat);
        // }
    })
    }
    
    
}
// 提货结束
tiHuoJieShu=function(val1,val2){
    console.log("运行了提货按钮");
    var tihuo_data={
        status:val1.toString(),
        choice:val2.toString(),
    }
    var student_msg = JSON.parse(sessionStorage.getItem('student_msg'));
    console.log(tihuo_data);
    if(null!=student_msg && student_msg!=''){
        pub._InitAxios({
        _url: pub._url, //公共接口
        ur: pub._DetailApi.saveTihuoParam,//提货
        data:{tihuo_data,...student_msg},
        cbk:function(res){
            // 动画完全结束
            gameInstance.SetFullscreen(0);//关闭全屏
            tiHuoNeed();
        },
        // cat:function(cat){
        //     console.log(cat);
        // }
    })
    }
    
}

kongZhongYunShuJieShu= function(){
    console.log('调用了空中运输结束');
    this.gameInstance.SendMessage("WebToUnityMgr", "JieDanJieHuo");
    // gameInstance.SetFullscreen(0);//关闭全屏
    yunShuJieShuNeed();
};



openScreen = function() {
    // 全屏
    this.gameInstance.SetFullscreen(1)
    console.log("开启全屏");
},
    closeScreen = function() {
        // 退出全屏
        this.gameInstance.SetFullscreen(0)
},



weiTuoYunShu = function(){
    this.gameInstance.SendMessage("WebToUnityMgr",'WeiTuoYunShu')    
}

JiaoHuo = function(pramas){
    // console.log(pramas);
    // console.log(parseInt(pramas));
    // gameInstance.SetFullscreen(1) //kai全屏
    var intNum = parseInt(pramas);
    console.log(intNum);
    this.gameInstance.SendMessage("WebToUnityMgr",'JiaoHuo',intNum)
    // app.fullscreenLoading= true;
    console.log("交货")
}



HuoWuZhuangJi= function(){
    this.gameInstance.SendMessage("WebToUnityMgr","HuoWuZhuangJi"); //开始装机动画
    //gameInstance.SetFullscreen(1)//全屏
};


huoWuZhuangJiJieShu = function() {
    //this.gameInstance.SendMessage("WebToUnityMgr", "KongZhongYunShuKaiShi","True");
    var pingheng = ZhuangJiJieShuNeed();
    console.log(pingheng);
    this.gameInstance.SendMessage("WebToUnityMgr", "KongZhongYunShuKaiShi",pingheng);
    gameInstance.SetFullscreen(0)
}

//测量结束
//重量，数量，长度，宽 高
ceLiangJieShu = function(arr1,arr2,arr3,arr4,arr5) {
    console.log(arr1);
    console.log(arr2);
    console.log(arr3);
    console.log(arr4);
    console.log(arr5);
    arrs = {weight:arr1,count:arr2,length:arr3,width:arr4,height:arr5}
    console.log(arrs);
    celiangNeed(arrs);
}

// 鼠标滚动事件
