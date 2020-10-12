/**
 * @作者 田应平
 * @创建时间 2020-05-28 16:41
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/

elementFn = new Vue({
    data : {
        title : '系统提示',
        connectError : '连接服务器失败',
        loadIndex:null
    },
    methods : {
        fnMessage : function(msg){
            this.$message({
                showClose: true,
                message : msg
            });
        },
        fnMsgError : function(msg){
            this.$message.error({
                showClose: true,
                message : msg,
                type : 'error'
            });
        },
        fnMsgSuccess : function(msg){
            this.$message({
                showClose: true,
                message : msg,
                type : 'success'
            });
        },
        fnNotify : function(msg,type){
            switch (type){
                case 1:
                    this.fnNotifySuccess(msg);
                    break;
                case 2:
                    this.fnNotifyError(msg);
                    break;
                case 3:
                    this.fnNotifyWarning(msg);
                    break;
                default:
                    this.fnNotifyInfo(msg);
                    break;
            }
        },
        fnNotifySuccess : function(msg){
            this.$notify({
                title: this.title,
                message: msg,
                type: 'success'
            });
        },
        fnNotifyWarning : function(msg){
            this.$notify({
                title: this.title,
                message: msg,
                type: 'warning'
            });
        },
        fnNotifyInfo : function(msg){
            this.$notify.info({
                title: this.title,
                message: msg,
                type: 'info'
            });
        },
        fnNotifyError : function(msg){
            this.$notify.error({
                title: this.title,
                message: msg,
                type: 'error'
            });
        },
        fnConfirm : function(msg,verify,cancel){
            this.$confirm(msg,this.title,{
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(verify){
                    verify();
                }
            }).catch(action => {
                if(cancel){
                    cancel();
                }
            });
        },
        fnFailure : function(msg){
            msg = (msg == null || msg.length <= 0) ? '连接服务器失败' : msg;
            this.fnNotifyWarning(msg);
        },
        fnAlert : function(html,title){
            title = (title == null || title.length <= 0) ? this.title : title;
            this.$alert(html,title,{
                dangerouslyUseHTMLString : true
            });
        },
        fnMsgbox : function(complete,title){
            title = (title == null || title.length <= 0) ? this.title : title;
            var h = this.$createElement;
            this.$msgbox({
                title: title,
                message: h('p', null, [
                    h('span',null,'内容可以是'),
                    h('i', {style:'color: #f00' }, 'VNode')
                ]),
                showCancelButton: true,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                confirmButtonText: '提交',
                cancelButtonText: '取消',
                beforeClose: (action,instance,done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                if(complete){
                    complete();
                }
            });
        },
        fnMsgboxs : function(msg){
            const h = this.$createElement;
            this.$msgbox({
                title: '查看货位'+msg+'信息',
                message: h('p', null, [
                    h('span',null,''+msg),
                    h('i', {style:'color:#2184d9'},'自定义样式影响的内容')//样式
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                console.info('确定回调');
            }).catch(action => {
                console.info('取消回调');
            });
            /*好使的,this.$alert('<div>'+code+'</div>','查看货位信息',{
                    dangerouslyUseHTMLString : true,
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(res =>{}).catch(err =>{});//不添加会报错 Uncaught (in promise) cancel

                this.$alert('<div>'+code+'</div>','查看货位'+code+'信息',{
                    dangerouslyUseHTMLString : true,
                    showConfirmButton : false
                }).then(res =>{}).catch(err =>{});//不添加会报错 Uncaught (in promise) cancel

                this.$axios.post(url,formData).then(res => {

                }).catch(err => {

                });
            */
        },
        loadOpen : function(msg){
            msg = (msg == null || msg.length <= 0) ? '正在操作,请稍候……' : msg;
            this.loadIndex = this.$loading({
                lock: true,
                text: msg,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.3)'
            });
        },
        loadClose : function(){
            if(this.loadIndex){
                this.loadIndex.close();
            }
        }
    }
});