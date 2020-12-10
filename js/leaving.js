var app = new Vue({
    el: "#app",
    data: {
        show1: false,
        currentPage3: 1,
        tabledata: [],
        title: '',
        content: '',
        count: '',
        pageSize: 5,
        currPage: 1,
        user_id:"",
        head_portrait:"",
        student_name:"",
        onLogin:false,
        downLogin:true
    },
    created() {
        this.getinit();
        // var user_id=getQueryVariable('user_id');
        var user_id=sessionStorage.getItem("user_id");
        //console.log('user_id:'+user_id)
        if (null==user_id || user_id==""){
            this.downLogin=true;
            // window.location.href = '../html/log.html';
        }else{
            this.downLogin=false;
            this.onLogin=true;
            this.user_id=user_id;
            this.judgeLog();
        }  
        this.judgeLog();
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
                        if (res.code == 200 && res.msg == "success") {
                            _this.head_portrait=baseL + res.data.head_portrait;
                            _this.student_name=res.data.student_name;
                            
                        }
                    }
            });
        },
         //点击跳转个人中心页面
         handleCommand(command) {
        
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

        // 阅读全文跳转详情页面
        go_read(message_id){
            //console.log(1111,message_id)
            window.location.href = '../html/read.html?message_id=' + message_id+"&aim=le";
        },

        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currPage = val;
            this.getinit();
        },

        getinit() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.getList,//留言分页列表
                data: { "pageSize": _this.pageSize, "pageNum": _this.currPage },
                cbk: function cbk(res) {
                    
                    _this.total = res.data.totalPage;
                    if (res.code == 0 && res.msg == "success") {
                        var list = res.data.list;
                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            item.head_portrait = baseL + item.head_portrait;
                            //console.log(item.title);
                           
                        }
                         list[0].title;
                         list[0].content;
                        _this.tabledata = list;
                        
                    }
                }
            });
            // var query={
            //   _url:pub._ur,
            //   ur:'',
            //   data:{},
            //   cbk:function(res){
            //     console.log(res);
            //   }
            // }
            // pub._InitAxios(query);
        },
        addup(index, likenum) {
            var addup = Number(this.tabledata[index].likenum);
            this.$set(this.tabledata[index], 'likenum', addup + 1);
            //console.log(this.tabledata)
            var addown = Number(this.tabledata[index].likenum)
        },
        update() {
            //console.log(this.title, this.content)
            var _this = this;
            if(null==_this.user_id || _this.user_id==""){
                this.$confirm('请先登录, 是否继续?', '提示', {
                    confirmButtonText: '去登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = '../html/log.html';
                }).catch(() => {
                        
                });
            }else if(_this.title == '') {
                this.$message.error('未提交留言标题');
            } else if (_this.content == '') {
                this.$message.error('未提交留言内容');
            } else {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.departmentList,//创建留言
                    data: { "title": this.title, "content": this.content, "user_id": this.user_id },
                    cbk: function cbk(res) {
                        // console.log(res);
                        if (res.code == "200" && res.msg == "success") {
                            _this.title = '';
                            _this.content = '';
                            _this.getinit();
                            _this.$message({
                                message: '留言提交成功',
                                type: 'success'
                            });
                            return;
                        }
                        return this.$message.error('留言提交失败，请检查网络设置');
                    }
                });
            }

        },
    },
})