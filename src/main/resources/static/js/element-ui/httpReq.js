/**
 * 未定义axios的全局的http接口的变量,已定义的在本目录下的文件 apis.js
 * @作者 田应平
 * @创建时间 2020-05-15 22:03
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
var refreshFlag = true;
var baseUri = urlPrefix;
//请求拦截器,好使!!!
axios.interceptors.request.use(function(config){
    let access = sessionStorage.getItem('accessToken');
    let refresh = sessionStorage.getItem('refreshToken');
    if(access != null && access.length > 0){
        if(refresh != null && refresh.length > 0){
            config.headers.accessToken = access;
            config.headers['refreshToken'] = refresh;
        }
    }
    config.headers["Content-type"] = "multipart/form-data";//不好使
    const formData = new FormData();
    const params = config.data;
    for(let key in params){
        if (params[key] != null){
            if(typeof (params[key])=='string'){
                var value = params[key].trim();
                if(value && value.length > 0){
                    formData.append(key.trim(),value);
                }
            }else{
                var value = params[key];
                if(value){
                    formData.append(key.trim(),value);
                }
            }
        }
    }
    config.data = formData;
    return config;

});
//响应拦截器,在实际应用中可以,好使!!!
axios.interceptors.response.use(function(data){
    if(data.data.code === 205){
        layerFn.noticeLogin();
        return {};
    }else if(data.data.code === 401){
        layerFn.alert(data.data.msg,data.data.code);
        return {};
    }else{
        const renewal = data.data.renewal;
        if(renewal){
            if(refreshFlag){
                refreshFlag = false;
                renewalToken();
            }
        }
        return data.data;
    }
});
httpReq = {
    /*httpReq.get(url,params,succeed,failure);*/
    get : function(url,params,succeed,failure){
        url = baseUri + url;
        axios.get(url,{
            params : params
        }).then(function (data){
            if(succeed){
                succeed(data);
            }
        }).catch(function (error){
            if(failure){
                failure(error);
            }
        });
    },
    download : function(url,params){
        url = baseUri + url;
        axios.get(url,{
            responseType: 'blob',
            params:params
        }).then(res => {
            let url = window.URL.createObjectURL(new Blob([res.data]));
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", this.$route.meta.title + ".xlsx");
            document.body.appendChild(link);
            link.click();
        });
    },
    /*httpReq.post(url,params,succeed,failure);*/
    post : function(url,params,succeed,failure){
        url = baseUri + url;
        axios.post(url,params).then(data =>{
            if(succeed){
                succeed(data);
            }
        }).catch(err =>{
            if(failure){
                failure(err);
            }
        });
    },
    /* 仅处理code为200的,httpReq.postSucceed(url,params,succeed,failure);*/
    postSucceed : function(url,params,succeed,failure){
        url = baseUri + url;
        axios.post(url,params).then(data =>{
            if(succeed){
                if(AppKey.code.code200 === data.code){
                    succeed(data);
                }else{
                    layerFn.alert(data.msg, data.code);
                }
            }
        }).catch(err =>{
            if(failure){
                failure(err);
            }
        });
    },
    /*httpReq.postFile(url,params,succeed,failure);*/
    postFile : function(url,params,succeed,failure){
        url = baseUri + url;
        axios.post(url,params,{
            'Content-Type':'multipart/form-data'
        }).then(data=>{
            if(succeed){
                succeed(data);
            }
        }).catch(err =>{
            if(failure){
                failure(err);
            }
        });
    },
    /*httpReq.postConfig(url,params,succeed,config,failure);*/
    postConfig : function(url,params,succeed,config,failure){
        url = baseUri + url;
        axios.post(url,params,config).then(function(data){
            if(succeed){
                succeed(data);
            }
        }).catch(err =>{
            if(failure){
                failure(err);
            }
        }).then(function(){});//始终会执行
    }
};

function renewalToken(){
    var params = {'accessToken': (sessionStorage.getItem('accessToken') || '')};
    httpReq.post('/user/renewalToken',params,(data)=>{
        setTimeout(function(){
            refreshFlag = true;
        },120000);//2分钟后又可以再刷新,同时防止重复刷新
        if(AppKey.code.code200 === data.code){
            var token = data.data;
            sessionStorage.setItem("accessToken",token.accessToken);
            sessionStorage.setItem("refreshToken",token.refreshToken);
        }else if(AppKey.code.code205 === data.code){
            layerFn.tokenLogin();
        }else{
            layerFn.alert(data.msg, data.code);
        }
    });
}