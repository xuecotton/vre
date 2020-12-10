var app = new Vue({
    el: "#app",
    data: {
        account_num:"",
        password:"",
        errorStatus:"",
        errorMsg:"",
        user_id:""
    },
    created(){
        window.judgeLog = this.judgeLog
        // console.log('账号：'+this.account_num+',密码：'+this.password);
    },
    methods: {
        judgeLog(){
            var _this = this;
            if(_this.account_num==""){
                _this.errorStatus=true;
                _this.errorMsg="账号不能为空";
                return;
            }else if(_this.password==""){
                _this.errorStatus=true;
                _this.errorMsg="密码不能为空";
                return;
            }else if(_this.account_num!="" && _this.password.Length != ""){
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.login,
                    data: { "account_num": _this.account_num,"password":_this.password },
                    cbk: function cbk(res) {
                        //console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            var user_id=res.data.user_id;
                            sessionStorage.user_id=user_id;
                            _this.errorStatus=false;
                            _this.errorMsg="";
                            sessionStorage.setItem("user_id",user_id);
                            window.location.href = '../index.html';
                        }else{
                            _this.errorStatus=true;
                            _this.errorMsg=res.msg;
                        }
                    }
                });
            }
        },
        
    },
    mounted(){
        
    },
});
document.onkeyup = function(e){
    var ev = document.all ? window.event : e;
    if(ev.keyCode==13) {
        judgeLog()
    }
}


