"use strict";

function _axios() {
  var para =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : {
          url: url,
          json: json,
          fn: fn,
        };

  $.ajax({
    type: "POST",
    url: para.url,
    contentType: "application/json",
    cache: true,
    async: true,
    data: para.json,
    dataType: "json",
    success: function success(res) {
      if (para.fn) {
        para.fn(res);
      }
    },
    error: function error(err) {
      //请求出错处理
      console.error(err.statusText);
      // alert("出情况了");
    },
  });
}

//oracle版本

var baseL = "http://39.96.165.101:80/";
//var baseL = "http://192.168.2.116:8083/";
var projectName = "alt/";
var baseURL = baseL + projectName;
// var webSocket_url = baseURL
// var url = baseURL
var pub = {
  // 公共接口地址
  _url: baseURL,
  _ul: baseL,
  // 详细接口api地址
  _DetailApi: {
    // 非实验部分
    departmentList: "student/createMessage", //创建留言
    getList: "student/listMessagePage", //留言分页列表
    listNewMessagePage: "student/listNewMessagePage", //查看留言消息分页列表
    removeNewMessage: "student/removeNewMessage", //解除留言提醒
    findReplyList: "student/findReplyList", //查询评论详情
    listReply: "student/listReply", //留言回复详情列表
    userReply: "student/userReply", //用户回复
    login: "student/login", //账号登录
    reg: "student/reg", //账号注册
    studentInfo: "student/studentInfo", //查询学生信息
    editPassword: "student/editPassword", //学生修改密码
    uploadPic: "student/uploadPic", //上传图片
    editStudent: "student/editStudent", //修改学生信息
    editStudentIphone: "student/editStudentIphone", //修改手机号
    findUserMessageExist: "student/findUserMessageExist", //查询用户留言是否存在
    downloadreport:"student/download?filename=" ,//下载实验报告接口
    // 实验部分
    getExperimentReportList: "student/listStudentExperimentReportPage", //获取学生查询实验报告列表
    saveExperimentReport: "student/saveExperimentReport", //新增实验报告
    saveLabelParam: "vr/saveLabelParam", //保存标记标签
    saveCalculationParam: "vr/saveCalculationParam", //保存计算运费数据
    saveWaybillParam: "vr/saveWaybillParam", //保存运货单数据
    saveHitboardParam: "vr/saveHitboardParam", //保存打板数据
    savePeizaiParam: "vr/savePeizaiParam", //保存配载数据
    uploadCoverPic1: "student/uploadCoverPic1", //上传图片接口
    saveBalanceParam: "vr/saveBalanceParam", //保存平衡数据
    saveNoticeParam: "vr/saveNoticeParam", //装机通知单
    saveReceiveOrdersGoodsParam: "vr/saveReceiveOrdersGoodsParam", //接单接货
    saveAbnormalTransportationParam: "vr/saveAbnormalTransportationParam", //不正常运输
    createExperimentReport: "vr/createExperimentReport", //生成实验报告
    saveTihuoParam: "vr/saveTihuoParam", //提货数据接口
    
  },

  /**
   * op 形参
   * @param {*} that this指向
   * @param {*} _url 公共接口地址
   * @param {*} ur 具体接口地址
   * @param {*} data 形参
   * @param {*} cbk 回调
   */
  _InitAjax(op) {
    $.ajax({
      type: "POST",
      // timeout : 1000, //超时时间设置，单位毫秒
      contentType: "application/json",
      url: op._url + op.ur,
      data: JSON.stringify(op.data),
      error: function (request) {},
      success: function (res) {
        op.cbk(res);
      },

      fail: function (r) {},
    });
  },
  _InitAxios(op) {
    var _op = op;
    axios({
      url: op._url + op.ur,
      method: "post",
      data: JSON.stringify(op.data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (res) {
        _op.cbk(res.data);
      })
      .catch(function (cat) {
        // _op.cat(cat)
      });
  },

  /**
   *  截取页面链接中的参数
   *  window.location
   *  window的location对象
   *  search
   *  得到的是url中query部分
   *  substr()
   *  返回一个从指定位置开始的指定长度的子字符串
   *  这里设置为1，是为了把url中的?号去掉
   *  split()
   *  将一个字符串分割为子字符串，然后将结果作为字符串数组返回
   *  这里就是把query部分以&为分割符，分割
   */
  _LinkParm: function (variable) {
    var query = window.location.search.substring(1); //截取查询字符串?后面的参数
    // console.log(variable);
    var vars = query.split("&"); // 用&符号将其分割起来
    // console.log(vars);
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // console.log(pair);
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
    var query1 = window.location.search.s;
  },

  /**
   * @param {*} event 输入框的值
   * @param {*} tgt 输入框绑定的值
   */
  _CheckPhone(event, tgt) {
    var phone = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phone.test(tgt)) {
      alert("输入正确的手机号！");
      tgt = "";
    }
  },

  /**
   * 数组转对象
   */
  _change_obj(arr) {
    var _obj = {};
    for (var it = 0; it < arr.length; it++) {
      for (var item in arr[it]) {
        _obj[item] = arr[it][item];
      }
    }
    return _obj;
  },

  /**
   *
   * @param {*} old_r 原有数组
   * @param {*} new_r 新数组 需要连接到原有数组之上
   */
  _Arr_concat(old_r, new_r) {
    var arr = old_r;
    var _r = new_r;
    var _c = arr.concat(_r);
    old_r = _c;

    return old_r;
  },

  /**
   * 判断是否为空字符串
   * @param {*} obj  传入形参 即需要判断的字符串
   */
  _isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  },
};
//获取URL参数
function getQueryVariable(variable) {
  var index;
  var query = window.location.search.substring(1);

  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");

    if (pair[0] == variable) {
      index = i;
    }
  }

  if (index >= 0) {
    return vars[index].split("=")[1];
  } else {
    return "";
  }
}
