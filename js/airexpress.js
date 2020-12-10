var app = new Vue({
    el: "#airexpress",
    data: {
        // 控制实验步骤
        step:1,
        step_name: [
            "实验提示",
            "1.认知实验",
            "2.委托运输",
            "3.接单交货",
            "4.计算运费",
            "5.缮制航空货运单",
            "6.打板",
            "7.配载",
            "8.平衡",
            "9.货物装机",
            "10.空中运输",
            "11.接单接货",
            "12.提货",
            "13.不正常运输",
        ],

        // 第一步弹窗
        dialogVisible:false,
        weiTuoYunShuTips:false,//委托运输弹窗
        daBanTips:false,//打板选择题弹窗
        loading:false,
        loadText:'',
        // 加载
        fullscreenLoading: false,
        // 计算运费中嵌入公式
        length1:"",
        width1:"",
        height1:"",
        count1:"", //非困难难度
        lengthN:["","",""],
        widthN:["","",""],
        heightN:["","",""],
        countN:["","",""],
        // cargo_volume: 0,
        // volume_weight: 0,
        //双向数据绑定是否跳过第七步
        diff: 4,
        skip: "",
        level: "",
        isPingHeng: false,
        picPath: "", //平衡页面用来保存图片图片路径后续用来上传的。
        picIsUpload: false, //图片是否上传
    // canEnd:false,//能否生成实验报告
    packages: [
      [
        {
          packages_num: 3,
          packages_weight: 63,
          goods: "TOY",
          DIMS: "82×45×32cm×",
        },
      ],
      [
        {
          packages_num: 3,
          packages_weight: 294.6,
          goods: "Fresh Oranges",
          DIMS: "105×85×77cm×",
        },
      ],
      [
        {
          packages_num: 1,
          packages_weight: 56.8,
          goods: "Jewellery",
          DIMS: "64×86×60cm×",
        },
      ],
      [
        {
          packages_num: 2,
          packages_weight: 41.2,
          goods: "TOY",
          DIMS: "81.2×42.5×32cm×",
        },
      ],
      [
        {
          packages_num: 2,
          packages_weight: 80,
          goods: "Books",
          DIMS: "70×47×35cm×",
        },
        {
          packages_num: 3,
          packages_weight: 63,
          goods: "TOY",
          DIMS: "82×45×32cm×",
        },
        {
          packages_num: 1,
          packages_weight: 52,
          goods: "Shirts",
          DIMS: " 62×60×60cm×",
        },
      ],
    ],
    pag_total: [
      { nums: 3, weights: 63 },
      { nums: 3, weights: 294.6 },
      { nums: 1, weights: 56.8 },
      { nums: 2, weights: 41.2 },
      { nums: 6, weights: 195 },
    ],

    student_msg: {},

    // 实验步骤5数据
    celiang:{},

    goods: [
      {
        air_line: "Beijing, CHINA(BJS) To  Osaka, Japan (OSA)",
        goods: "玩具TOY",
        weight: "每件21.0kg，共3件",
        size: "82×45×32cm×3",
        beizhu: "无",
      },
      {
        air_line: "Beijing, CHINA(BJS) To  Osaka, Japan (OSA)",
        goods: "新鲜橘子（Fresh Oranges）",
        weight: "每件98.2Kgs，共3件",
        size: "118×86×64cm×3",
        beizhu: "无",
      },
      {
        air_line: "Beijing, CHINA(BJS) To  Osaka, Japan (OSA)",
        goods: "珠宝（Jewellery）",
        weight: "58.7kg",
        size: "64×86×60cm×1",
        beizhu: "17SDR=196CNY",
      },
      {
        air_line: "Beijing, CHINA(BJS) To  Osaka, Japan (OSA)",
        goods: "玩具（TOY）",
        weight: "每件21.0kg，共2件",
        size: "82×45×32cm×2",
        beizhu: "无",
      },
      {
        air_line: "Beijing, CHINA(BJS) To  Osaka, Japan (OSA)",
        goods: "书（Books）、玩具（Toys）及衬衫（Shirts）",
        weight: "80kg、63kg及52kg",
        size: "70×47×35cm×2、82×45×32cm×3及62×60×60cm×1",
        beizhu: "无",
      },
    ],
    // 简单，中等 难度的货运单需要绑定的数据。
    // 货物体积
    // 学生输入信息1
    stuInput1: {
      // 本数组中下标对应的分别为
      
      gross_weight: "",
      billing_weight: "",
      applicable_rate: "",
      // 货物体积：

      // 体积重量：

      // 货物毛重：

      // 计费重量：

      // 适用运价：

      // 航空运价
    },

    // 困难难度货运单 要绑定的数据
    stuInput2: [
      {
        // 本数组中下标对应的分别为
        // 货物体积：
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        // 体积重量：

        // 货物毛重：

        // 计费重量：

        // 适用运价：

        // 航空运价

        title: "货物一",
      },
      {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        title: "货物二",
      },
      {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        title: "货物三",
        total_freight: "",
      },
      {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        title: "总计",
      },
    ],
    // 实验步骤六数据

    // 绑定学生输入数据
    // 前二十二个
    StuInput1_0_40: [
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //5
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //10
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //15
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //20
      { ph: "货物数量", 0: "" },
      { ph: "货物重量", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //25
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "" },
      { ph: "货物总数量", 0: "" }, //30
      { ph: "货物总重量", 0: "" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //35
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //40
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //43
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },//45
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },//50
      { ph: "在此输入", 0: "" },
    ],
    // 简单
    StuInput2_0_40: [
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //5
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //10
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //15
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //20
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //25
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //30
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //35
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //40
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },//45
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },//50
      { ph: "在此输入", 0: "" },
    ],
    // 困难
    StuInput3_0_40: [
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //5
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //10
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //15
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //20
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //25
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //30
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" }, //35
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "100" }, //40
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //45
      { ph: "在此输入", 0: "100" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //50
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" }, //55
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },//60
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },
      { ph: "在此输入", 0: "" },//65
      { ph: "在此输入", 0: "" },
    ],
    // 第23，24 题选项

    // 实验步骤七数据
    choice: {
      choice1: [],
      choice2: [],
      choice3: [],
    },
    // 实验步骤八 数据
    // 控制页面显示
    index_08: 1,
    // 三个按钮的显示控制

    showOver: false,
    // 获取学生填写数据  配载与平衡
    // 配载数据
    peizai_data: {
      one: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
      },
      two: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: "",
        19: "",
        20: "",
        21: "",
      },
      three: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
      },
      four: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: "",
        19: "",
        20: "",
        21: "",
        22: "",
      },
    },
    // 平衡数据
    balance_data: {
      FINALPAX_ADCH: "",
      FINALPAX_INF: "",
      ZFW: "",
      TOW: "",
      STAB_TRIM_SET: "",
    },

    // 装机动画数据

    options: [
      {
        value: "470",
        label: "1053#平板车：货物470kg",
      },
      {
        value: "600",
        label: "1074#平板车：货物600kg",
      },
      {
        value: "500",
        label: "1212#平板车：货物500kg",
      },
      {
        value: "300",
        label: "1084#平板车：货物300kg",
      },
      {
        value: "820",
        label: "1034#平板车：货物820kg",
      },
      {
        value: "540",
        label: "1167#平板车：货物540kg",
      },
      {
        value: "450",
        label: "1123#平板车：货物450kg",
      },
    ],
    notice_data: {
      cargo_hold1: [],
      cargo_hold2: [],
      cargo_hold3: [],
      cargo_hold4: [],
    },

    // 十三步数据
    // abnormal_transportation_data:{
    //     subject_one:'',
    //     subject_two:'',
    // },

    choice_2: {
      choice4: [],
      choice5: [],
    },
    aaas: "",
    
  },
  created() {},
  methods: {
    // vr部分用到的函数
    // 外部js调用的函数
    zhuangjijieshu(that){
      that.step ++;
    },
    
    
    // 测试
    
    log4() {
      //console.log(this.aaas);
    },
    // 返回个人中心
    back() {
      window.location.href = "./usecenter.html";
    },
    // 开始实验按钮
    begin_ex() {
      
      if (this.skip != "" && this.level != "") {
        this.diff = this.student_msg.experiment_id - 1;
        //console.log(this.diff);
        this.student_msg.experiment_sign = Number(
          Math.random().toString().substr(3, 9) + Date.now()
        ).toString(36); // 生成随机唯一标识，
        // console.log(this.student_msg);
        var _this = this;
        pub._InitAxios({
          _url: pub._url, //公共接口
          ur: pub._DetailApi.saveExperimentReport, //保存实验开始
          data: this.student_msg,
          cbk: function (res) {
            _this.student_msg.student_id = res.data.student_id;
            delete _this.student_msg.user_id;
            sessionStorage.setItem(
              "student_msg",
              JSON.stringify(_this.student_msg)
            );
            _this.step = 2; // 调到第二步
            document.getElementById("VR").classList.remove('canvasShow')
            document.getElementById("step01").classList.remove('stepH0')
            //_this.openScreen();// 开启vr动画，全屏
            console.log("动画开始播放");
              //动画开始。
              readyToStart();
            console.log("开启全屏");
          },
          // cat:function(cat){
          //     console.log(cat);
          // }
        });
      } else {
        this.$alert("请完成上述选项", "温馨提示", {
          confirmButtonText: "确定",
        });
      }
    },

    // 页面跳转按钮
    toStep(val) {
      if (this.skip == "是" && val == 8) {
        this.step = val - 1;
      } else {
        this.step = val;
      }
    },
    weiTuoSave(){
      document.getElementById("step03").classList.remove("stepShow")
      var intNum = parseInt(this.student_msg.experiment_id);
      console.log(intNum);
        // 此次点击为跳转到接单接货页面。。交货部分动画开始，并且传参进去。
          this.step = 4; // 跳到下一页
          JiaoHuo(intNum);
    },
    saveTable(){
      document.getElementById("step05").classList.add("stepShow");
      setTimeout(()=>{
          this.step = 5;
        },1000)
    },
    saveToStep(val) {
      if (this.skip == "是" && val == 8) {
        this.step = val + 2;
        //跳过配载平衡时 装机动画开始
        // HuoWuZhuangJi()
      } else if (val == 3) {
        // 此次点击为跳到委托运输页面。。此时应该开启委托运输的动画
        this.dialogVisible = false
        this.step = val; //跳到第二步；
        // isShowVr();//动画半隐藏关掉
        // WeiTuoYunShu(); //开始委托运输页面动画
        weiTuoYunShu();
      } else if (val == 7) {
          //this.unityInstance.SendMessage("WebToUnityMgr",'DaBanStart'); //打板动画开始

        this.step = val;
      } else if (val == 9) {
        // 不跳过配载平衡页面，从配载平衡页面过来

        this.step = val;
      } else {
        this.step = val;
      }
    },

    // 生成实验报告
    end() {
      var _this = this;
      pub._InitAxios({
        _url: pub._url, //公共接口
        ur: pub._DetailApi.createExperimentReport, //生成实验报告接口
        data: this.student_msg,
        cbk: function (res) {
          sessionStorage.removeItem("student_msg");
          _this.$alert("恭喜完成实验！已成功生成实验报告！", "实验完成", {
            confirmButtonText: "确定",
            callback: (action) => {
              if (action === "confirm") {
                window.location.href = "./usecenter.html";
              } else {
                window.location.href = "./usecenter.html";
              }
            },
          });
        },
        // cat:function(cat){
        //     console.log(cat);
        // }
      });
    },

    // 定义一个对象判空函数 对象属性中有空或者有空数组就返回true
    objectIsNull(obj) {
      let empty = null;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] == null || obj[key] == "" || obj[key] == []) {
            empty = true;
            break;
          } else {
            empty = false;
          }
        }
      }
      return empty;
    },
    // 第五步测试  第五步计算运费提交数据按钮 ：功能先判断试卷难度 在判断填写值是否为空，空值提示是否提交，非空值直接提交
    subData05() {
      var _this = this;
      _this.writeInput()
      if (this.diff < 4) {
        var calculation_data = {
          ...this.stuInput1,
          cargo_volume: this.cargo_volume,
          volume_weight: this.volume_weight,
          air_freight:this.air_freightJD,
        };
        var post_data = { calculation_data, ...this.student_msg };
        console.log(post_data);
        if (this.objectIsNull(calculation_data)) {
          // 有空没填判断
          this.$confirm("该页面尚有数据未填写完整, 是否提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              // 点确定提交数据
              pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.saveCalculationParam, //保存计算运费接口
                data: post_data,
                cbk: function (res) {
                  //console.log(res);
                  document.getElementById("step06").classList.add("stepH0")
                  document.getElementById("step05").classList.remove("stepShow")
                  _this.step++;
                  _this.$alert('运费计算完毕！请根据托运书、复磅后的货物信息和其他信息，完成货运单的缮制。', '试验提示', {
                    confirmButtonText: '确定',
                  });
                },
                cat: function (cat) {
                  //console.log(cat);
                },
              });
            })
            .catch(() => {
              // 点不确定就不变
             
            });
        } else {
          // 非空值就直接提交
          pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.saveCalculationParam, //保存计算运费接口
            data: post_data,
            cbk: function (res) {
              //console.log(res);
              document.getElementById("step06").classList.add("stepH0")
              document.getElementById("step05").classList.remove("stepShow")
              _this.step++;
              _this.$alert('运费计算完毕！请根据托运书、复磅后的货物信息和其他信息，完成货运单的缮制。', '试验提示', {
                confirmButtonText: '确定',
              });
            },
            cat: function (cat) {
              //console.log(cat);
            },
          });
        }

        //console.log(post_data);
      } else if (this.diff == 4) {
        var {
          0: total_cargo_volume,
          1: total_volume_weight,
          2: total_gross_weight,
          3: total_billing_weight,
          4: total_applicable_rate,
          5: total_air_freight,
        } = this.stuInput2[3];
        var one = {
          total_cargo_volume:_this.cargo_volumeN4,
          total_volume_weight:_this.volume_weightN4,
          total_gross_weight,
          total_billing_weight,
          total_applicable_rate,
          total_air_freight:_this.air_freightN4,
        };
        var {
          0: cargo_volume,
          1: volume_weight,
          2: gross_weight,
          3: billing_weight,
          4: applicable_rate,
          5: air_freight,
        } = this.stuInput2[0];
        var two = {
          cargo_volume:_this.cargo_volumeN1,
          volume_weight:_this.volume_weightN1,
          gross_weight,
          billing_weight,
          applicable_rate,
          air_freight:_this.air_freightN1,
        };
        var {
          0: cargo_volume,
          1: volume_weight,
          2: gross_weight,
          3: billing_weight,
          4: applicable_rate,
          5: air_freight,
        } = this.stuInput2[1];
        var three = {
          cargo_volume:_this.cargo_volumeN2,
          volume_weight:_this.volume_weightN2,
          gross_weight,
          billing_weight,
          applicable_rate,
          air_freight:_this.air_freightN2,
        };
        var {
          0: cargo_volume,
          1: volume_weight,
          2: gross_weight,
          3: billing_weight,
          4: applicable_rate,
          5: air_freight,
          total_freight,
        } = this.stuInput2[2];
        var four = {
          cargo_volume:_this.cargo_volumeN3,
          volume_weight:_this.volume_weightN3,
          gross_weight,
          billing_weight,
          applicable_rate,
          air_freight:_this.air_freightN3,
          total_freight:_this.air_freightNA,
        };
        // var { student_id,
        //     experiment_id } = this.student_msg;
        // 要传的参数
        var calculation_data = {
          one,
          two,
          three,
          four,
        };
        var post_data = {
          calculation_data,
          ...this.student_msg,
        };
        console.log(post_data);
        if (
          this.objectIsNull(one) ||
          this.objectIsNull(two) ||
          this.objectIsNull(three) ||
          this.objectIsNull(four)
        ) {
          // console.log('有空值');
          // 有空值就在判断
          this.$confirm("该页面尚有数据未填写完整, 是否提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              
              // 点确定提交数据
              pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.saveCalculationParam, //保存计算运费接口
                data: post_data,
                cbk: function (res) {
                  document.getElementById("step06").classList.add("stepH0")
                  document.getElementById("step05").classList.remove("stepShow")
                  _this.step++;
                  _this.$alert('运费计算完毕！请根据托运书、复磅后的货物信息和其他信息，完成货运单的缮制。', '试验提示', {
                    confirmButtonText: '确定',
                  });
                },
                cat: function (cat) {
                  //console.log(cat);
                },
              });
            })
            .catch(() => {
              // 点不确定就不变
              
            });
        } else {
          // console.log('没空值');
          // 没空值就直接提交
          pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.saveCalculationParam, //保存计算运费接口
            data: post_data,
            cbk: function (res) {
              document.getElementById("step06").classList.add("stepH0")
              document.getElementById("step05").classList.remove("stepShow")
              _this.step++;
              _this.$alert('运费计算完毕！请根据托运书、复磅后的货物信息和其他信息，完成货运单的缮制。', '试验提示', {
                confirmButtonText: '确定',
              });
            },
            cat: function (cat) {
              //console.log(cat);
            },
          });
        }
      }
    },
    // 页面六测试 第六步缮制货运单 数据提交 ：功能先判断试卷难度 在判断填写值是否为空，空值提示是否提交，非空值直接提交
    subData06() {
      var _this = this;
      if (this.diff < 4 && this.diff != 2) {
        var step06_input = {};
        this.StuInput1_0_40.map((elem, i, arr) => {
          step06_input[i + 1] = elem[0];
          return step06_input;
        });
      } else if (this.diff == 2) {
        var step06_input = {};
        this.StuInput2_0_40.map((elem, i, arr) => {
          step06_input[i + 1] = elem[0];
          return step06_input;
        });
      } else if (this.diff == 4) {
        var step06_input = {};
        this.StuInput3_0_40.map((elem, i, arr) => {
          step06_input[i + 1] = elem[0];
          return step06_input;
        });
      }
      var waybill_data = { ...step06_input };
      //console.log(this.student_msg);
      //console.log(waybill_data);
      var post_data = { waybill_data, ...this.student_msg };
      if (this.objectIsNull(waybill_data)) {
        // 有空没填判断
        this.$confirm("该页面尚有数据未填写完整, 是否提交?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 点确定提交数据
            pub._InitAxios({
              _url: pub._url, //公共接口
              ur: pub._DetailApi.saveWaybillParam, //保存计算运费接口
              data: post_data,
              cbk: function (res) {
                document.getElementById("step06").classList.remove("stepH0")
                _this.step++;
                  window.gameInstance.SendMessage("WebToUnityMgr", "DaBanStart");
                // 打扮开始动画
                
                
                
              },
              // cat:function(cat){
              //     console.log(cat);
              // }
            });
            // axios.post('http://192.168.2.116:80/alt/vr/saveWaybillParam', post_data).then(res => {
            //     console.log(res);
            //     this.step++
            // }).catch(err => {
            //     console.log(err);
            // })
          })
          .catch(() => {
            // 点不确定就不变
            
          });
      } else {
        // 没空值就直接提交
        pub._InitAxios({
          _url: pub._url, //公共接口
          ur: pub._DetailApi.saveWaybillParam, //保存计算运费接口
          data: post_data,
          cbk: function (res) {
            document.getElementById("step06").classList.remove("stepH0")
            _this.step++;
              window.gameInstance.SendMessage("WebToUnityMgr", "DaBanStart");
          },
          // cat:function(cat){
          //     console.log(cat);
          // }
        });
      }
    },
    // 第七步测试  第六步打板 数据提交 ：判断填写值是否为空，空值提示是否提交，非空值直接提交
    subData07() {
      var _this = this;
      var subject_one = this.choice.choice1.sort().join("");
      var subject_two = this.choice.choice2.sort().join("");
      var subject_three = this.choice.choice3.sort().join("");
      var hitboard_data = { subject_one, subject_two, subject_three };
      var post_data = { hitboard_data, ...this.student_msg };
      //console.log(post_data);
      //console.log(hitboard_data);
      //console.log(this.objectIsNull(hitboard_data));
      // 判空
      if (this.objectIsNull(hitboard_data)) {
        // 有空没填判断
        this.$confirm("该页面尚有数据未填写完整, 是否提交?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 点确定提交数据
            pub._InitAxios({
              _url: pub._url, //公共接口
              ur: pub._DetailApi.saveHitboardParam, //保存计算运费接口
              data: post_data,
              cbk: function (res) {
                //console.log(res);
                if (_this.skip == "是") {
                    _this.step += 3;
                    _this.isPingHeng = true; //跳过时 飞机飞行正常
                    // 装机通知单隐藏，vr显示，调动画
                    document.getElementById('step07').classList.remove("stepShow");
                    // document.getElementById("step10").classList.add('stepH0');
                    // app.daBanTips = false;
                    HuoWuZhuangJi();
                    // HuoWuZhuangJi();
                } else {
                  document.getElementById("step07").classList.remove('stepShow');
                  document.getElementById("step08").classList.add("stepShow1");
                  document.getElementsByClassName("_box")[0].style.height = "0"
                  _this.$alert('装机前，请完成配载操作！', '试验提示', {
                    confirmButtonText: '确定',
                  });
                  _this.step++;
                }

              },
              // cat:function(cat){
              //     console.log(cat);
              // }
            });
          })
          .catch(() => {
            // 点不确定就不变

          });
      } else {
        // 没空值就直接提交
        pub._InitAxios({
          _url: pub._url, //公共接口
          ur: pub._DetailApi.saveHitboardParam, //保存计算运费接口
          data: post_data,
          cbk: function (res) {
            //console.log(res);
            if (_this.skip == "是") {
                _this.step += 3;
                _this.isPingHeng = true; //跳过时 飞机飞行正常
                // 装机通知单隐藏，vr显示，调动画
                // app.daBanTips = false;
                document.getElementById('step07').classList.remove("stepShow");
                // document.getElementById("step10").classList.add('stepH0');
                HuoWuZhuangJi();
                // HuoWuZhuangJi();
            } else {
              document.getElementById("step07").classList.remove('stepShow');
              document.getElementById("step08").classList.add("stepShow1");
              document.getElementsByClassName("_box")[0].style.height = "0"
              _this.$alert('装机前，请完成配载操作！', '试验提示', {
                confirmButtonText: '确定',
              });
              _this.step++;
              // app.daBanTips = false;
            }
          },
          // cat:function(cat){
          //     console.log(cat);
          // }
        });
      }
    },
    // 第八步测试 配载平衡判空
    log_peizai() {
      var _this = this;
      var peizai_data = { ...this.peizai_data };
      var post_data = {
        peizai_data,
        ...this.student_msg,
      };
     
      // 判空
      if (
        this.objectIsNull(peizai_data.one) ||
        this.objectIsNull(peizai_data.two) ||
        this.objectIsNull(peizai_data.three) ||
        this.objectIsNull(peizai_data.four)
      ) {
        // 有空没填判断
        this.$confirm("该页面尚有数据未填写完整, 是否提交?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            //console.log(123);
            // 点确定提交数据
            pub._InitAxios({
              _url: pub._url, //公共接口
              ur: pub._DetailApi.savePeizaiParam, //保存配载数据
              data: post_data,
              cbk: function (res) {
                document.getElementById("step08").classList.remove("stepShow1");
                document.getElementById("step09").classList.add("stepShow1")
               
                _this.step++;
              },
              // cat:function(cat){
              //     console.log(cat);
              // }
            });
          })
          .catch(() => {
            // 点不确定就不变
            //console.log(234);
          });
      } else {
        // 没空值就直接提交
        pub._InitAxios({
          _url: pub._url, //公共接口
          ur: pub._DetailApi.savePeizaiParam, //保存配载数据
          data: post_data,
          cbk: function (res) {
            document.getElementById("step08").classList.remove("stepShow1");
            document.getElementById("step09").classList.add("stepShow1")
            // document.getElementById("step08").classList.remove("stepShow")
            
            
            _this.step++;
          },
          // cat:function(cat){
          //     console.log(cat);
          // }
        });
      }
    },
    
    // 获取绘制的图片
    getImg() {
      var _this = this;
      const loading = this.$loading({
        lock: true,
        text: '平衡图上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var imgEle = document.getElementById("upImg");
      window.pageYoffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      new html2canvas(imgEle, {
        useCORS: true,
        // scrollY: 0,
        // scrollX: 0,
      }).then((canvas) => {
        var data = { imgStr: canvas.toDataURL("image/png").substr(22) }; // 导出图片
        axios.post(baseURL+pub._DetailApi.uploadCoverPic1,data).then(res=>{
                        //console.log(res);
                       this.picPath =  res.data.data.savaPath;
                       this.picIsUpload = true;
                      setTimeout(() => {
                        loading.close();
                        _this.log_pingheng()
                      }, 2000);
                       
                    }).catch(err=>{
                    	//console.log(err);
                    })
       
      });
    },
    log_pingheng() {
      var _this = this;
      var balance_data = {
        ...this.balance_data,
        picPath: this.picPath,
      };
      var post_data = {
        balance_data,
        ...this.student_msg,
      };
          pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.saveBalanceParam, //保存平衡数据
            data: post_data,
            cbk: function (res) {
              
              
              document.getElementById("step09").classList.remove("stepShow1")
              document.getElementById("step10").classList.add("stepShow1")
                _this.step++;
                _this.isPingHeng = res.data.result; //飞机平衡状态
                _this.$message({
                  type: 'success',
                  message: '上传成功'
                });
            },
          });
        // }
      
    },

    // 第九步测试
    log9() {
      var _this = this;
      var notice_data = { ...this.notice_data };
      var post_data = { notice_data, ...this.student_msg };
      //console.log(post_data);
      if (this.objectIsNull(notice_data)) {
        // 有空没填判断
        this.$confirm("该页面尚有数据未填写完整, 是否提交?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            //console.log(123);
            // 点确定提交数据
            pub._InitAxios({
              _url: pub._url, //公共接口
              ur: pub._DetailApi.saveNoticeParam, //保存装机数据
              data: post_data,
              cbk: function (res) {
                // 提交之后先让题目隐藏，在让动画显示
                document.getElementsByClassName("_box")[0].style.height = "auto"
                document.getElementById("step10").classList.remove('stepShow1');
                
                HuoWuZhuangJi();
                // _this.step++;
              },
              // cat:function(cat){
              //     console.log(cat);
              // }
            });
          })
          .catch(() => {
            // 点不确定就不变
            //console.log(234);
          });
      } else {
        // 没空值就直接提交
        pub._InitAxios({
          _url: pub._url, //公共接口
          ur: pub._DetailApi.saveNoticeParam, //保存装机数据
          data: post_data,
          cbk: function (res) {
            document.getElementsByClassName("_box")[0].style.height = "auto"
            document.getElementById("step10").classList.remove('stepShow1');
            HuoWuZhuangJi();
          },
          // cat:function(cat){
          //     console.log(cat);
          // }
        });
      }
    },

    // 第十步测试
    log10() {
      this.step++;
    },

    // 最后一步测试
    log11() {
      var _this = this;
      //console.log("1234");
      var subject_one = this.choice_2.choice4.sort().join("");
      var subject_two = this.choice_2.choice5.sort().join("");
      var abnormal_transportation_data = { subject_one, subject_two };
      var post_data = { abnormal_transportation_data, ...this.student_msg };
      console.log(post_data);
      // 判空
      if (this.objectIsNull(abnormal_transportation_data)) {
        // 有空没填判断
        this.$confirm("该页面尚有数据未填写完整, 是否提交?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            console.log(this.post_data);
            // 点确定提交数据
            pub._InitAxios({
              _url: pub._url, //公共接口
              ur: pub._DetailApi.saveAbnormalTransportationParam, //保存不正常运输数据
              data:post_data,
              cbk: function (res) {
                console.log("不正常运输接口");
                _this.end();
              },
              // cat:function(cat){
              //     console.log(cat);
              // }
            });
          })
          .catch(() => {
            // 点不确定就不变
            //console.log(234);
          });
      } else {
        // 没空值就直接提交
        pub._InitAxios({
          _url: pub._url, //公共接口
          ur: pub._DetailApi.saveAbnormalTransportationParam, //保存不正常运输数据
          data: post_data,
          cbk: function (res) {
            console.log("不正常运输接口");
            _this.end();
          },
          // cat:function(cat){
          //     console.log(cat);
          // }
        });
      }
    },

    // 步骤八切换页面
    // 切换下一页，最后一页时不显示
    changeNextPage() {
      if (this.index_08 < 5) {
        this.index_08++;
      }
    },
    changePrePage(val) {
      if (this.index_08 > 1) {
        this.index_08--;
      } else if (this.index_08 == 1) {
        // 存一下填的数据
        sessionStorage.setItem("peizai_data", JSON.stringify(this.peizai_data));
        sessionStorage.setItem("balance", JSON.stringify(this.balance_data));
        location.href = "./airexpress07.html";
      }
    },

    // 步骤九 互斥功能
    watchs(index) {
      // 将数组拼接，判断是否有重复的。
      // console.log('123');
      var newArr = this.notice_data.cargo_hold1
        .concat(this.notice_data.cargo_hold2)
        .concat(this.notice_data.cargo_hold3)
        .concat(this.notice_data.cargo_hold4);
      // console.log(newArr);
      // 判断数组是否重复
      var newary = newArr.sort();
      for (var i = 0; i < newary.length; i++) {
        if (newary[i] == newary[i + 1]) {
          // 含有重复的内容 提示并删除
          this.$alert("这个已经被选过了哦", "提示", {
            confirmButtonText: "确定",
            callback: (action) => {
              // 删掉
              indexs = "cargo_hold" + index;
              // 把这一个选项卡清空
              // 此处indexs是属性而不是下标
              this.notice_data[indexs] = [];
            },
          });
          // console.log('选项不能重复');
          // this.$message
        }
      }
    },

    dat() {
      // 返回当前时间函数
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      return `${year}-${month}-${day}`;
    },
    dateString(){
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      return `${year}年${month}月${day}日`;
    },
    tips() {
      this.$alert(
        '<strong>若您选择<span style="color:red">是</span>则会跳过步骤七-配载、步骤八-平衡，后面实验流程页面不显示该步骤！<br>若您选择<span style="color:red">否</span>则忽略该提示！</strong>',
        "温馨提示",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },

    writeInput() {
      var _this = this;
      var writeTable = document.getElementById("__01");
      //console.log(writeTable);
      writeTable.onclick = function (e) {
        // console.log( _this.diff==2?_this.StuInput2_0_40:(_this.diff==4?_this.StuInput3_0_40:_this.StuInput1_0_40));
        var par = e.target.parentNode;
        if (par.nodeName == "TD" && e.target.nodeName == "IMG" && par.dataset.sid ) {
          // console.dir(e.target)
          // console.log(111);
          var sid = par.dataset.sid - 1; //如果点击的是img且父元素上没有write类
          //console.log(sid + 1);
          
          if (sid == undefined) {
            return;
          } else {
            _this
              .$prompt(
                _this.diff == 2
                  ? _this.StuInput2_0_40[sid].ph
                  : _this.diff == 4
                  ? _this.StuInput3_0_40[sid].ph
                  : _this.StuInput1_0_40[sid].ph,
                "提示",
                {
                  closeOnClickModal:false,
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  // inputPattern:  /^\d+$|^\d+[.]?\d+$/, //数字正则
                  // inputErrorMessage: '格式不正确'
                }
              )
              .then(({ value }) => {
                // _this.$message({
                //   type: 'success',
                //   message: '你的邮箱是: ' + value
                // });
                var div = document.createElement("div");
                div.classList.add("showWrite");
                div.innerHTML = `<p>${value}</p>`;
                // console.log(value + sid);
                if (value == null) {
                  return;
                } else {
                  _this.diff == 2
                    ? (_this.StuInput2_0_40[sid][0] = value)
                    : _this.diff == 4
                    ? (_this.StuInput3_0_40[sid][0] = value)
                    : (_this.StuInput1_0_40[sid][0] = value);
                }
                // console.log(_this.StuInput1_0_40);
                par.classList.add("write");
                par.appendChild(div);
                //  console.dir(par)
                //  var span = document.createElement('span')
                //  span.innerText = value
                //  e.target.appendChild(span)
              })
              .catch(() => {
                _this.$message({
                  type: "info",
                  message: "取消输入",
                });
              });
          }
          //加上write
        } else if (e.target.classList.contains("showWrite")) {
          var sid = par.dataset.sid - 1;
          if (sid == undefined) {
            return;
          } else {
            _this.diff == 2
              ? (_this.StuInput2_0_40[sid][0] = "")
              : _this.diff == 4
              ? (_this.StuInput3_0_40[sid][0] = "")
              : (_this.StuInput1_0_40[sid][0] = "");
            e.target.parentNode.removeChild(e.target);
          }
        }
        // else if(e.target.className == 'showWrite'){
        //     var sid = e.target.parentNode.dataset.sid;
        //     if(sid==undefined){
        //         return
        //     }else{
        //     _this.StuInput1_0_40[sid][0] = '';
        //     console.log(_this.StuInput1_0_40);
        //     e.target.parentNode.classList.remove('write');
        //     }
        //     // console.log(sid);

        // }
      };
    },



    // 计算属性需要的函数
    
  },

  mounted() {
    var _this = this;
    //window.huoWuZhuangJiJieShu=function() {
     // _this.step++;
    //  document.getElementById("step11").classList.remove('stepH0')
    //  console.log('装机动画结束');
 // }
    window.jieHuoNeed = function(){
      _this.step++;
    }
    
  window.tiHuoNeed=function() {
    document.getElementById("VR").classList.add('canvasShow')
    document.getElementById('step14').classList.add("stepShow")
    _this.step++;
    console.log('提货场景结束');
    // 动画隐藏
}
  window.yunShuJieShuNeed = function(){
  _this.step++;
  //console.log("跳转下一步");
  // document.getElementById("step11").classList.remove('stepH0')
}
  window.ZhuangJiJieShuNeed = function() {
       _this.step++;
      //  document.getElementById("step11").classList.remove('stepH0');
       var ispingheng;
      if (_this.isPingHeng) { 
          console.log("true----")
          ispingheng = "True"
              //this.gameInstance.SendMessage("WebToUnityMgr", "KongZhongYunShuKaiShi",'True');
      } else if(!_this.isPingHeng ) {
          console.log("传递的布尔值----")
          ispingheng = "False"
              //this.gameInstance.SendMessage("WebToUnityMgr", "KongZhongYunShuKaiShi","False");
      }
      //console.log(ispingheng)
      return ispingheng;
    
  }  
window.celiangNeed = function(arr) {
    //console.log(arr);
    _this.celiang = arr;
    //console.log(_this.celiang);
}
      // window.zhuangjijieshu = this.zhuangjijieshu(that);
    
    // 实验最最开始：学生点击进来时 会先获取学生信息存到session中；
    // 页面挂载时，首先获取学生信息，存到data中
    var user_id = sessionStorage.getItem("user_id");
    if (null != user_id && user_id != "") {
      this.student_msg.user_id = user_id;
      //console.log(this.student_msg);
    }
    // 模拟当前步骤
  },
  watch: {
   
    // 获取实验难度数据到的数据放到参数中
    level(val) {
      // console.log(val,oldVal);
      if (val == "简单") {
        this.student_msg.experiment_id = "1";
      }
      if (val == "中等") {
        this.student_msg.experiment_id = `${parseInt(Math.random() * 3) + 2}`;
      }
      if (val == "困难") {
        this.student_msg.experiment_id = "5";
      }
    },

    // 观察实验进行到哪一步，来判断是否显示动画
    // step(val) {
      
    //   if (
    //     val == 2 ||
    //     val == 3 ||
    //     val == 4 ||
    //     val == 7 ||
    //     val == 10 ||
    //     val == 11 ||
    //     val == 12 ||
    //     val == 13
    //   ) {
    //     document.getElementById("VR").classList.remove('canvas2')
    //   } else if (val == 6) {
    //     this.writeInput();
    //   } else {
    //     document.getElementById("VR").classList.add('canvas2')
    //   }
    // },
  },
  computed:{
    // 非困难难度
    cargo_volume:{
      get:function(){
        if(this.count1!="" || this.length1!="" || this.width1!="" || this.height1!=""){
          return this.count1*this.length1*this.width1*this.height1;
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    volume_weight:{
      get:function(){
        if(this.count1!="" && this.length1!="" && this.width1!="" && this.height1!=""){
          var beforData =  ((this.count1*this.length1*this.width1*this.height1)/6000).toFixed(2).toString();
          var beforearrs = beforData.split(".");
          if(parseInt(beforearrs[1])<=50){
            return parseFloat(beforearrs[0])+0.5
          } else if(parseInt(beforearrs[1])>50){
            return (parseFloat(beforearrs[0])+1).toFixed(1)
          }
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    air_freightJD:{
      get:function(){
        if(this.stuInput1.billing_weight!="" && this.stuInput1.applicable_rate!=""){
          return (this.stuInput1.billing_weight * this.stuInput1.applicable_rate).toFixed(2);
        }else{
          return ""
        }
      },
      set:function(val){
        return val;
      }
    },
    
    //困难难度 体积，体积重量，运费
    cargo_volumeN1:{
      get:function(){
        if(this.countN[0]!="" || this.lengthN[0]!="" || this.widthN[0]!="" || this.heightN[0]!=""){
          return this.countN[0]*this.lengthN[0]*this.widthN[0]*this.heightN[0];
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    cargo_volumeN2:{
      get:function(){
        if(this.countN[1]!="" || this.lengthN[1]!="" || this.widthN[1]!="" || this.heightN[1]!=""){
          return this.countN[1]*this.lengthN[1]*this.widthN[1]*this.heightN[1];
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    cargo_volumeN3:{
      get:function(){
        if(this.countN[2]!="" || this.lengthN[2]!="" || this.widthN[2]!="" || this.heightN[2]!=""){
          return this.countN[2]*this.lengthN[2]*this.widthN[2]*this.heightN[2];
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    cargo_volumeN4:{
      get:function(){
        if(this.cargo_volumeN1!="" || this.cargo_volumeN2!="" || this.cargo_volumeN3!="" ){
          return this.cargo_volumeN1+this.cargo_volumeN2+this.cargo_volumeN3 
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    volume_weightN1:{
      get:function(){
        if(this.countN[0]!="" && this.lengthN[0]!="" && this.widthN[0]!="" && this.heightN[0]!=""){
          var beforData =  ((this.countN[0]*this.lengthN[0]*this.widthN[0]*this.heightN[0])/6000).toFixed(2).toString();
          var beforearrs = beforData.split(".");
          if(parseInt(beforearrs[1])<=50){
            return parseFloat(beforearrs[0])+0.5
          } else if(parseInt(beforearrs[1])>50){
            return (parseFloat(beforearrs[0])+1).toFixed(1)
          }
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    volume_weightN2:{
      get:function(){
        if(this.countN[1]!="" && this.lengthN[1]!="" && this.widthN[1]!="" && this.heightN[1]!=""){
          var beforData =  ((this.countN[1]*this.lengthN[1]*this.widthN[1]*this.heightN[1])/6000).toFixed(2).toString();
          var beforearrs = beforData.split(".");
          if(parseInt(beforearrs[1])<=50){
            return parseFloat(beforearrs[0])+0.5
          } else if(parseInt(beforearrs[1])>50){
            return (parseFloat(beforearrs[0])+1).toFixed(1)
          }
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    volume_weightN3:{
      get:function(){
        if(this.countN[2]!="" && this.lengthN[2]!="" && this.widthN[2]!="" && this.heightN[2]!=""){
          var beforData =  ((this.countN[2]*this.lengthN[2]*this.widthN[2]*this.heightN[2])/6000).toFixed(2).toString();
          var beforearrs = beforData.split(".");
          if(parseInt(beforearrs[1])<=50){
            return parseFloat(beforearrs[0])+0.5
          } else if(parseInt(beforearrs[1])>50){
            return (parseFloat(beforearrs[0])+1).toFixed(1)
          }
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    volume_weightN4:{
      get:function(){
        if(this.cargo_volumeN1!="" && this.cargo_volumeN2!="" && this.cargo_volumeN3!=""){
          var beforData =  ((this.cargo_volumeN1+this.cargo_volumeN2+this.cargo_volumeN3)/6000).toFixed(2).toString();
          var beforearrs = beforData.split(".");
          if(parseInt(beforearrs[1])<=50){
            return parseFloat(beforearrs[0])+0.5
          } else if(parseInt(beforearrs[1])>50){
            return (parseFloat(beforearrs[0])+1).toFixed(1)
          }
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    //运费
    air_freightN1:{
      get:function(){
        if(this.stuInput2[0][3]!="" && this.stuInput2[0][4]!="")  {
          return  (this.stuInput2[0][3] *this.stuInput2[0][4]).toFixed(2)
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    air_freightN2:{
      get:function(){
        if(this.stuInput2[1][3]!="" && this.stuInput2[1][4]!="")  {
          return  (this.stuInput2[1][3] *this.stuInput2[1][4]).toFixed(2)
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    air_freightN3:{
      get:function(){
        if(this.stuInput2[2][3]!="" && this.stuInput2[2][4]!="")  {
          return  (this.stuInput2[2][3] *this.stuInput2[2][4]).toFixed(2)
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    air_freightN4:{
      get:function(){
        if(this.stuInput2[3][3]!="" && this.stuInput2[3][4]!="")  {
          return  (this.stuInput2[3][3] *this.stuInput2[3][4]).toFixed(2)
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    },
    // 总运费
    air_freightNA:{
      get:function(){
        if(this.air_freightN1!="" && this.air_freightN2!="" && this.air_freightN3 !="" ){
          return  (this.stuInput2[0][3] *this.stuInput2[0][4] + this.stuInput2[1][3] *this.stuInput2[1][4]+this.stuInput2[2][3] *this.stuInput2[2][4]).toFixed(2)
        }else{
          return ""
        }
      },
      set:function(val){
        return val
      }
    }

  }
});

// 步骤八平衡页面绘制功能
(function () {
  var canvas = document.getElementById("canvas_02");
  var context = canvas.getContext("2d");
  var btnX = document.getElementById("btn_x");
  var btnY = document.getElementById("btn_y");
  // var clearEle = document.getElementById("clear");
  var drawStep = -1;
  var canvasHistory = [];
  var lineX = 0;
  var lineY = 0;
  var line_zhou = "x";
  var recored = [
    {
      lineX:null,
      lineY:null,
      msg0:null,
      msg1:null,
      msg2:null,
      msg3:null,
    },
    {
      lineX:null,
      lineY:null,
      msg0:null,
      msg1:null,
      msg2:null,
      msg3:null,
    },
    {
      lineX:null,
      lineY:null,
      msg0:null,
      msg1:null,
      msg2:null,
      msg3:null,
    },
    {
      lineX:null,
      lineY:null,
      msg0:null,
      msg1:null,
      msg2:null,
      msg3:null,
    },
  ]
  function getLocation(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
      x: (x - bbox.left) * (canvas.width / bbox.width),
      y: (y - bbox.top) * (canvas.height / bbox.height),
    };
  }
  function drawHorizontalLine(y) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.strokeStyle = "red";
    context.stroke();
    context.closePath();
  }
  function drawVerticalLine(x) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.strokeStyle = "red";
    context.stroke();
    context.closePath();
  }
  var message = document.querySelectorAll("#message>span");
  canvas.onclick = function (e) {
    var location = getLocation(e.clientX, e.clientY);
    
    if (line_zhou == "x") {
      if (lineX == 0) {
        drawStep++;
        if (drawStep < canvasHistory.length) {
          canvasHistory.length = drawStep; // 截断数组
        }
        // context.clearRect(0, 0, canvas.width, canvas.height);
        drawVerticalLine(location.x);
        message[0].innerHTML =
          "X1= 无油重量指数：" + (((location.x - 48.8) / 580) * 124).toFixed(2); //计算得出来的坐标
        lineX++;
      } else if (lineX == 1) {
        drawStep++;
        if (drawStep < canvasHistory.length) {
          canvasHistory.length = drawStep; // 截断数组
        }
        drawVerticalLine(location.x);
        message[1].innerHTML =
          "X2= 起飞重量指数：" + (((location.x - 48.8) / 580) * 124).toFixed(2);
        lineX++;
      } else if (lineX == 2) {
        return;
      }
    } else if (line_zhou == "y") {
      if (lineY == 0) {
        drawStep++;
        if (drawStep < canvasHistory.length) {
          canvasHistory.length = drawStep; // 截断数组
        }
        drawHorizontalLine(location.y);
        message[2].innerHTML =
          "Y1= 实际无油重量：" +
          (((423 - location.y) / 460) * 279 + 150).toFixed(2); //计算得出来的坐标
        lineY++;
      } else if (lineY == 1) {
        drawStep++;
        if (drawStep < canvasHistory.length) {
          canvasHistory.length = drawStep; // 截断数组
        }
        drawHorizontalLine(location.y);
        message[3].innerHTML =
          "Y2= 实际起飞重量：" +
          (((423 - location.y) / 460) * 279 + 150).toFixed(2);
        lineY++;
      } else if (lineY == 2) {
        return;
      }
    }
    canvasHistory.push(canvas.toDataURL());
    recored[drawStep].lineX = lineX;
    recored[drawStep].lineY = lineY;
    recored[drawStep].msg0 = message[0].innerHTML;
    recored[drawStep].msg1 = message[1].innerHTML;
    recored[drawStep].msg2 = message[2].innerHTML;
    recored[drawStep].msg3 = message[3].innerHTML;
  };
  document.getElementById("chexiao").onclick = function() {
    if (drawStep > 0 && drawStep < 4) {
      drawStep--;
      context.clearRect(0, 0, canvas.width, canvas.height);
      let canvasPic = new Image();
      canvasPic.src = canvasHistory[drawStep];
      canvasPic.addEventListener('load', () => {
        context.drawImage(canvasPic, 0, 0);
      });
      // console.log(drawStep);
      lineX = recored[drawStep].lineX ;
      lineY = recored[drawStep].lineY ;
      message[0].innerHTML = recored[drawStep].msg0 ;
      message[1].innerHTML = recored[drawStep].msg1 ;
      message[2].innerHTML = recored[drawStep].msg2 ;
      message[3].innerHTML = recored[drawStep].msg3 ;
    } else if(drawStep==0){
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawStep = -1;
      canvasHistory = [];
      lineX = 0;
      lineY = 0;
      message[0].innerHTML = null ;
      message[1].innerHTML = null ;
      message[2].innerHTML = null ;
      message[3].innerHTML = null ;
      recored = [
        {
          lineX:null,
          lineY:null,
          msg0:null,
          msg1:null,
          msg2:null,
          msg3:null,
        },
        {
          lineX:null,
          lineY:null,
          msg0:null,
          msg1:null,
          msg2:null,
          msg3:null,
        },
        {
          lineX:null,
          lineY:null,
          msg0:null,
          msg1:null,
          msg2:null,
          msg3:null,
        },
        {
          lineX:null,
          lineY:null,
          msg0:null,
          msg1:null,
          msg2:null,
          msg3:null,
        },
      ]
    }else{
      return
    }
  }
  btnX.onclick = function (e) {
    line_zhou = "x";
  };
  btnY.onclick = function (e) {
    line_zhou = "y";
  };
  // clearEle.onclick = function (e) {
  //   lineX = 0;
  //   lineY = 0;
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   for (var i = 0; i < message.length; i++) {
  //     message[i].innerHTML = "";
  //   }
  // };
})();

// tab切换
// 实验步骤二的tab切换js
var btns_02 = document.getElementsByClassName("navItem");
var targets_02 = document.getElementsByClassName("navCont");
for (var i = 0; i < btns_02.length; i++) {
  var btn_02 = btns_02[i];
  btn_02.index = i; //给每个按钮添加自定义属性，用来存储当前索引；
  btn_02.onclick = function () {
    // console.log('123');
    for (var j = 0; j < btns_02.length; j++) {
      btns_02[j].classList.remove("act");
      // 让每一个btn都清零类样式
    }
    this.classList.add("act"); //再给当前btn一个类样式
    for (var k = 0; k < targets_02.length; k++) {
      targets_02[k].style.display = "none";
      // 让每个显示区域都都不显示
    }
    targets_02[this.index].style.display = "block"; //再让对应下标的区域显示
  };
}
// 页面六 tab切换
// tab切换
var btns = document.getElementsByClassName("tab");
var targets = document.getElementsByClassName("target");
for (var i = 0; i < btns.length; i++) {
  var btn = btns[i];
  btn.index = i; //给每个按钮添加自定义属性，用来存储当前索引；
  btn.onclick = function () {
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.remove("current_06");
      // 让每一个btn都清零类样式
    }
    this.classList.add("current_06"); //再给当前btn一个类样式
    for (var k = 0; k < targets.length; k++) {
      targets[k].style.display = "none";
      // 让每个显示区域都都不显示
    }
    targets[this.index].style.display = "block"; //再让对应下标的区域显示
  };
}

// 上下拉隐藏显示动画功能
var boxEle = document.getElementsByClassName("_box");
var btnEle = document.getElementById("hand_btn");
var showEle = document.getElementById("show_box");
var hidEle = document.getElementById("hid_box");
var isShowVr = function () {
  if (boxEle[0].classList.contains("_hidden")) {
    boxEle[0].classList.remove("_hidden");
    showEle.style.display = "none";
    hidEle.style.display = "block";
  } else {
    boxEle[0].classList.add("_hidden");
    showEle.style.display = "block";
    hidEle.style.display = "none";
  }
};

