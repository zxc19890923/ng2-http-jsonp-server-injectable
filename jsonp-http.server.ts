1. 定义服务
import {Injectable} from "@angular/core";
import {Http, Jsonp} from "@angular/http";
import "rxjs/operator/map";
@Injectable()
export class HttpServer {
  constructor(public jsonp: Jsonp, public http: Http) {

  }
  // 参数说明: url: 请求的服务器接口地址   params: 传递的参数对象
  // get请求
  httpGet(url, params) {
    return this.http.get(url, {search: params}).map(res=>res.json);
  }
  // post请求
  httpPost(url, params) {
    return this.http.post(url, {search: params}).map(res=>res.json);
  }
  // jsonp跨域请求
  jsonpGet(url, params) {
    return this.jsonp.get(url, {search: params}).map(res=>res.json());
  }
}
2. 使用服务获取后台数据，调用服务的方法
 import {Component} from "@angular/core";
 import {URLSearchParams} from "@angular/http";
 import {HttpServer} from "./http.server.ts";
 ...
 @Component({
  ...
  // 这是在某一个组件中引入组件，其实获取数据的组件，应该在module.ts文件中引入，所有组件中都可以使用
  providors: [HttpServer]
 })
 
  // 使用服务
    var params = new URLSearchParams();
    params.set("callback", "JSONP_CALLBACK");
    httpServer.jsonpGet("http://localhost:3000/users", params).subscribe(res=> {
      console.log(res);
    });
