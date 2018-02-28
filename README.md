# webAuto
gulp combined with webpack build demo

##问题与解决
1. 用import载入模块，报错 :unexpected token import  
  <p>原因：浏览器不能识别es6,编译时确保所有模块用babel解析为es5</p>
  <p>解决：< https://elanderson.net/2016/09/unexpected-token-import-with-gulp/ > </p>
新建.babelrc文件
 
```
{
 "presets": [ "es2015"]

}
```

将gulpfile.js改为gulpfile.babel.js
2. 错误：Maximum call stack size exceeded
  <p>原因： npm版本与配套node不搭，npm降级处理</p>
 <p>解决： 命令行：npm install npm@4.4.4 -g </p> 
注：windows下nvm版本切换有问题
node路径在C:\node\nodejs ，nvm list 当前下载node版本， nvm use 8.7.0会在node路径替换为相应版本，但不知道为什么输node -v不变
<p>相应node版本里如C:\node\nvm\v8.7.0有默认下载的npm，复制到C:\node\nvm\npm\node_modules\npm里可直接替换</p>

3. 在gulp.watch里只写主路径，写第二个路径会报错
4. webpack打包后保错jQuery is not defined
    原因：jQuery未映射到全局  
    
    解决 http://m.blog.csdn.net/qq129169/article/details/71734863   方法4不错 
    https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
5. 浏览器同步更新使用browser-sync插件， 全局安装，静态页通过单独的端口访问可视化控制页面。可视化界面允许控制所有的设备，同步推送更新等
等。
+ 用gulp任务，启动browser-sync会给默认localhost:3000到静态页入口。 baseDir是根目录，其它页面换url即可
+ 未用gulp任务，直接在命令行输入下列命令，实现不同浏览器同步更新，便于调试：
```
// --files 路径是相对于运行该命令的项目（目录） 
browser-sync start --server --files "css/*.css, *.html"
// 如果你的文件层级比较深，您可以考虑使用 **（表示任意目录）匹配，任意目录下任意.css 或 .html文件。 
browser-sync start --server --files "**/*.css, **/*.html"
```

6. 对应第三方插件
 * 目前bootstrap，不能直接import，无用，bootstrap用html引用，用bootstrap.js时要引用jquery
   * 其它使用jquery的插件可以打包引用
