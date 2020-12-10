var app = new Vue({
    el: "#app",
    data: {
        account_num:"",
        grade:"",
        student_name:"",
        major:"",
        password:"",
        upassword:"",
        errorStatus:false,
        errorMsg:"",
        user_id:""
    },
    created(){
        // console.log(errorStatus)
    },
    methods: {
        judgeReg(){
            

                var _this = this;
            if(_this.account_num==""){
                _this.errorStatus=true;
                _this.errorMsg="学号不能为空";
                return;
            }else if(_this.grade==""){
                _this.errorStatus=true;
                _this.errorMsg="班级不能为空";
                return;
            }else if(_this.student_name==""){
                _this.errorStatus=true;
                _this.errorMsg="姓名不能为空";
                return;
            }else if(_this.major==""){
                _this.errorStatus=true;
                _this.errorMsg="专业不能为空";
                return;
            }else if(_this.password==""){
                _this.errorStatus=true;
                _this.errorMsg="密码不能为空";
                return;
            }else if(_this.upassword==""){
                _this.errorStatus=true;
                _this.errorMsg="确认密码不能为空";
                return;
            } else if(_this.password != _this.upassword){
                _this.errorStatus=true;
                _this.errorMsg="两次密码输入不一致";
                return;
            }else{
                _this.errorStatus=false;
                _this.errorMsg="";
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.reg, //注册接口
                    data: { "account_num": _this.account_num, "grade":_this.grade, "student_name":_this.student_name, "major":_this.major, "password":_this.password, "upassword":_this.password },
                    cbk: function cbk(res) {
                        //console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            var user_id=res.data;
                            //console.log(user_id);
                            sessionStorage.user_id=user_id;
                            _this.errorStatus=false;
                            _this.errorMsg="";
                            window.location.href = '../index.html?user_id=' + user_id;
                        }else{
                            _this.errorStatus=true;
                            _this.errorMsg=res.msg;
                        }1
                    }
                });
            }
        }
     
       
      
    },
})