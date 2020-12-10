var app = new Vue({
    el: "#app",
    data: {
        show1: false,
        currentPage:1,
        currentPage3:1,
        pageSize: 5,
        totalCount:0,
        totalPage:0,
        replyInfoList: "",
        message_id: "",
        title: "",
        content: "",
        reply:"",
        create_time: "",
        textarea2: "",
        user_id:"",
        message_head_portrait: "",
        message_student_name: "",
        head_portrait: "",
        student_name: "",
        onLogin:false,
        downLogin:true,
        from_leaving:false,
    },
    created() {

        //拿到上一个有页面的message_id
        var message_id = getQueryVariable('message_id');
        var from_leaving = getQueryVariable('aim');
        //console.log(from_leaving);
        this.from_leaving = from_leaving
        //赋值给data中的message_id
        this.message_id = message_id;
        //console.log('message_id:'+message_id)
        // var user_id=getQueryVariable('user_id');
        var user_id=sessionStorage.getItem("user_id");
        //console.log('user_id:'+user_id)
        this.user_id=user_id;
        if (null==user_id || user_id==""){
            this.downLogin=true;
            
            //window.location.href = '../html/log.html';
        }else{
            this.downLogin=false;
            this.onLogin=true;
            this.user_id=user_id;
            this.judgeLog(); 
        }  
        this.replyInfo();
        this.listReply();
    },
    methods: {
        // 查询学生信息
        judgeLog(){
            var _this = this;
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.studentInfo,//查询学生信息接口
                    data: {"user_id":_this.user_id },
                    cbk: function cbk(res) {
                        //console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            _this.head_portrait=baseL + res.data.head_portrait;
                            _this.student_name=res.data.student_name;
                            
                        }
                    }
            });
        },
        //点击跳转个人中心页面
        handleCommand(command) {
            //console.log(2222222)
            if(command=='a'){
                //console.log(this.user_id)
                window.location.href = '../html/usecenter.html';
            }else{
                this.user_id="";
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
          },
        // 点击跳转登录注册页面
        lo(){
            window.location.href = '../html/log.html';
        },
        re(){
            window.location.href = '../html/reg.html';
        },

        //个人评论详情
        replyInfo() {
            var _this = this;
            //console.log(_this.message_id)
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.findReplyList,//查询评论详情接口
                data: { "message_id": _this.message_id },
                cbk: function cbk(res) {
                    //console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                    // _this.currentPage3=res.
                        var item = res.data;
                        //console.log(item);
                        _this.title = item.title;
                        _this.content = item.content;
                        _this.create_time = item.create_time;
                        _this.message_head_portrait = baseL + item.head_portrait;
                        _this.message_student_name = item.student_name;
                    }
                }
            });
        },

        //查询评论详情分页列表
        listReply() {
            var _this = this;
            //console.log(_this.message_id)

            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.listReply,//查询评论详情分页列表接口
                data: { "pageSize":_this.pageSize,"pageNum":_this.currentPage,"message_id": _this.message_id },
                cbk: function cbk(res) {
                    //console.log(res);
                    if (res.code == 0 && res.msg == "success") {
                        _this.currentPage=res.data.currPage;
                        _this.pageSize=res.data.pageSize;
                        _this.totalCount=res.data.totalCount;
                        _this.totalPage=res.data.totalPage;
                        //console.log(_this.totalPage);
                        _this.replyInfoList = res.data.list;
                    }
                }
            });
        },

        //用户回复
        userReply(obj){
            var _this = this;
            //console.log(_this.message_id)
            //console.log(_this.user_id)
            // var txtb = document.querySelector(".iqb");
            // console.log(txtb);
                showStatus.hide('.iqb');
                if(obj){
                    if (_this.textarea2 == '' || null) {
                        this.$message.error('未填写回复信息！');
                    } else {
                        pub._InitAxios({
                            _url: pub._url, //公共接口
                            ur: pub._DetailApi.userReply,//用户回复接口
                            data: { "message_id":_this.message_id,"user_id":_this.user_id,"content": _this.textarea2 },
                            cbk: function cbk(res) {
                                // console.log(res);
                                if (res.code == 200 && res.msg == "success") {
                                    _this.$message({
                                        message: '留言提交成功',
                                        type: 'success'
                                    });
                                    _this.textarea2 = '';
                                    _this.listReply();
                                    return;
                                }
                                return this.$message.error('留言提交失败，请检查网络设置');
                            }
                        });
                    }
                }else{
                    _this.textarea2 = '';
                    _this.$message.error('取消发布');
                }
        },

        //点击询问控制回复框的显示隐藏
        show(){
            var _this=this;
            
            if(null==_this.user_id || _this.user_id == ""){
                
                this.$confirm('请先登录, 是否继续?', '提示', {
                    confirmButtonText: '去登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = '../html/log.html';
                }).catch(() => {
                        
                });
            }else{
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.findUserMessageExist,//查询用户留言是否存在
                    data: { "message_id":_this.message_id,"user_id":_this.user_id },
                    cbk: function cbk(res) {
                        
                        if (res.code == 200 && res.msg == "success") {
                            if(document.querySelector(".iqb").style.display=="block"){
                                document.querySelector(".iqb").style.display='none';
                            }else{
                                document.querySelector(".iqb").style.display="block";
                            }
                        }else{
                             _this.$message.error(res.msg);
                        }
                        
                    }
                });
            }
           
            
        },

        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            // this.pageSize=val;
            // this.listReply();
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.currentPage=val;
            this.listReply();
        }
    },
    // watch:{
    //     title(val){
    //         if(val!=''){
    //             timers();
    //         }
    //     }
    // },
   
})
