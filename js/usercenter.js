var app =new Vue({
    el:'#app',
    data:{
        user_id:"",
        head_portrait:"",
        view_head_portrait:"",
        iphone:"",
        eidtIphone:"",
        password:"",//验证密码
        student_name:"",
        sex:"",
        isos:"",
        onLogin:false,
        downLogin:true,
        errStatus:false,
        errMsg:"",
        editPassword:{
            errorStatus:false,
            errorMsg:"",
            old_password:"",
            new_password:"",
            confirm_password:"",
        },
        tableData:'',
        tabledatas: [],
        // 分页效果
        currentPage3:1,
        pageSize: 5,
        currPage:1,
        totalPage:1,
        totalCount:0,
        //消息分页
        pageSizeM: 5,
        currPageM: 1,
        // totalPage: 0,
        totalCountM: 0,
        totalPageM:1,
    },
    created(){
        // var user_id=getQueryVariable('user_id');
        var user_id=sessionStorage.getItem("user_id")
        
        this.user_id=user_id;
        if (null==user_id || user_id==""){
            this.downLogin=true;
            window.location.href = '../html/log.html';
        }else{
            this.downLogin=false;
            this.onLogin=true;
            this.user_id=user_id;
            this.centerLog();
            
        }
        this.centerLog();
    },
    methods:{
        // 实验报告分页效果
          handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.currPage = val;
            this.getReport();
          },
        messCenter(){
            window.location.href="../html/messageList.html";
        },

        //消息分页
        handleSizeChangeM(val) { 
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeM(val) {
            this.currPageM = val;
            this.getinit();
        },
        
        // 基本信息
        centerLog(){
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.studentInfo,//查询学生信息接口
                data: {"user_id":_this.user_id },
                cbk: function cbk(res) {
                    
                    if (res.code == 200 && res.msg == "success") {
                        _this.head_portrait=res.data.head_portrait;
                        
                        _this.view_head_portrait=baseL + res.data.head_portrait;
                        _this.student_name=res.data.student_name;
                        if(null!=res.data.iphone && res.data.iphone!=""){
                            var str=res.data.iphone.split('');
                            for(var i=0;i<str.length;i++){
                                if (i === 3 | i === 4 | i === 5 | i === 6) {
                                    str[i] = '*'
                                }   
                            }
                            _this.iphone=str.join('');
                        }else{
                            _this.iphone="1**********"
                        }
                        
                        
                        
                        _this.sex=res.data.sex;
                        var isosStatus=res.data.isos;
                        
                        if(_this.sex==0){
                            $('#nv').attr('class','value');

                        }else{
                            $('#nan').attr('class','value');
                        }
                        if(isosStatus== 'os'){
                            _this.isos='本校学生';
                        }else{
                            _this.isos='外校学生';
                        }
                    }
                }
            });
        },
        //点击跳转个人中心页面
        handleCommand(command) {
            
            if(command=='a'){
                //console.log(this.user_id)
                window.location.href = '../html/usecenter.html?user_id='+this.user_id;
            }else{
                this.user_id="";
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
          },

        // 修改密码
        subEditPwd(){
            var _this = this;
            //console.log(_this.editPassword)
            if(_this.editPassword.old_password==""){
                
                _this.editPassword.errorStatus=true;
                _this.editPassword.errorMsg="旧密码不能为空";
                return;
            }else if(_this.editPassword.new_password==""){
                
                _this.editPassword.errorStatus=true;
                _this.editPassword.errorMsg="新密码不能为空";
                return;
            }else if(_this.editPassword.confirm_password==""){
                
                _this.editPassword.errorStatus=true;
                _this.editPassword.errorMsg="确认密码不能为空";
                return;
            }else{
                _this.editPassword.errorStatus=false;
                _this.editPassword.errorMsg="";
                
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.editPassword,//学生修改密码接口
                    data: {"old_password":_this.editPassword.old_password, "new_password":_this.editPassword.new_password, "confirm_password":_this.editPassword.confirm_password, "user_id":_this.user_id},
                    cbk: function cbk(res) {
                        //console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            $(".password").css("display","none");
                            $(".p_result").css("display","block");
                            _this.user_id="";
                            _this.$alert('密码修改成功，即将跳转到登录页面！','提示信息',{
                                confirmButtonText: '确定',
                                callback: action => {
                                    if(action === 'confirm'){
                                        sessionStorage.removeItem("user_id");
                                        window.location.href="../html/log.html"
                                    }else{
                                        sessionStorage.removeItem("user_id");
                                        window.location.href="../html/log.html"
                                    }
                                    
                                }
                            })
                            
                        }else{
                            _this.editPassword.errorStatus=true;
                            _this.editPassword.errorMsg=res.msg;
                        }
                    }
                });
            }
        },

        // 修改手机号
        Editphone(){
            var _this = this;
            if(_this.password==""){
                
                
                _this.errStatus=true;
                _this.errMsg="验证密码不能为空";
            }else if(_this.eidtIphone==""){
                
                _this.errStatus=true;
                _this.errMsg="修改手机号不能为空";
                return;
            }else{
                _this.errStatus=false;
                _this.errMsg="";
                
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.editStudentIphone,//修改手机号接口
                    data: {"password":_this.password, "iphone":_this.eidtIphone, "user_id":_this.user_id},
                    cbk: function cbk(res) {
                        //console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            
                            $(".ph_password").css("display","none");
                            $(".ph_result").css("display","block");
                                _this.centerLog();
                        }else{
                            _this.errStatus=true;
                            _this.errMsg=res.msg;
                        }
                    }
                });
            }
        },

        //修改学生信息
        saveStudent(){
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.editStudent,//修改学生信息接口
                data: {"student_name":_this.student_name, "sex":_this.sex, "head_portrait":_this.head_portrait, "user_id":_this.user_id},
                cbk: function cbk(res) {
                    //console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        _this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                }
            });
        },
        // 获取实验报告成绩
        getReport(){
            var _this = this;
            pub._InitAxios({
                _url:pub._url,
                ur: pub._DetailApi.getExperimentReportList,//修改学生信息接口
                data:{'user_id':_this.user_id,"pageSize":_this.pageSize,"pageNum":_this.currPage},
                cbk:function cbk(res){
                    _this.tableData = res.data.list
                    _this.totalPage = res.data.totalPage;
                    console.log(res);
                        
                   
                }
            })
        },
        showReport(val){
            pub._InitAxios({
                _url:pub._url,
                ur: pub._DetailApi.downloadreport + val.experimentReport_path,//修改学生信息接口
                cbk:function cbk(res){
                    window.location.href=this._url+this.ur
                    console.log(res);
                }
            })
            
        },
        //留言列表
        getinit() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.listNewMessagePage,
                data: { "pageSize": _this.pageSizeM, "pageNum": _this.currPageM, "user_id": _this.user_id },
                cbk: function cbk(res) {
                    //console.log(res);
                    if (res.code == 0 && res.msg == "success") {
                        // 分页
                        _this.totalCountM = res.data.totalCount;
                        _this.totalPageM = res.data.totalPage;

                        var list = res.data.list;
                        
                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            item.head_portrait = baseL + item.head_portrait;
                            //新消息提醒
                            if (item.new_message_status == 'Y') {
                                item.new_message_status = true;
                            } else {
                                item.new_message_status = false;
                            }
                        }
                        
                        _this.tabledatas = list;
                        // _this.view();

                    }
                }
            });
        },
        // 解除留言提醒
        remove(message_id) {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.removeNewMessage,
                data: { "message_id": message_id ,"user_id":_this.user_id},
                cbk: function cbk(res) {
                    //console.log(res);
                    if (res.code == 200) {
                        window.location.href = '../html/read.html?message_id=' + message_id;
                    }
                }
            });
        },
        // 通过ajax上传头像
        uploadPic(){
            var _this=this;
            // 获取头像并上传
            var formFile = new FormData();
        　　var imgfile = document.querySelector('#uploadImg');//获取input
        　　var file = imgfile.files[0]; //获取文件对象\
        　　formFile.append("file", file); //加入文件对象
            $.ajax({
            　　type:"post",
            　　url:pub._url+pub._DetailApi.uploadPic,//上传图片
            　　data:formFile,
            　　//是否预处理,默认值为true,这里改成false
            　　processData:false,
                dataType:"json",
            　　//是否设置内容,默认值为true,这里改成false
            　　contentType:false,
            　　success:function(res){
                //console.log(res);
            　　　　
                    var src=baseL+res.data.src;
                    //console.log(src);
                    _this.head_portrait=res.data.src;
                    _this.view_head_portrait=src;
                    _this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
            　　},
            　　error:function(data){
                //console.log(data);
                    _this.$message.error('上传失败');
            　　}
            });
        },

        // 点击登录注册的跳转
        lo(){
            window.location.href = '../html/log.html';
        },
        re(){
            window.location.href = '../html/reg.html';
        },

        // 重新登录跳转
        reLogin(){
            window.location.href = '../html/log.html';
        },

        // 选择男或者女
        nan(){
            this.sex="1";
            $('#nv').removeClass('value');
            $('#nan').attr('class','value');
        },
        nv(){
            this.sex="0";
            $('#nan').removeClass('value');
            $('#nv').attr('class','value');
        },
    }
})



