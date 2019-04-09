## poposlides
poposlides是一个Jquery轮播插件，大小仅5KB

查看演示：[https://po-po.github.io/JQPlugin/poposlides/](https://po-po.github.io/JQPlugin/poposlides/)

##### 使用参数
```javascript
auto:true,             //自动播放
nav:true,              //切换按钮
playspeed:3500,        //自动播放速度
fadespeed:500,         //淡入淡出速度
loop:true,             //循环播放
pagination:true,       //页码显示
pagecenter:true,       //页码居中
trigger:"click",       //页面触发类型click/mouseover
prev:".prev",          //上一页按钮
next:".next"           //下一页按钮
```

## popodatetime
popodatetime移动端日期时间选择控件

查看演示：[https://po-po.github.io/JQPlugin/popodatetime/](https://po-po.github.io/JQPlugin/popodatetime/)

##### 使用方法
```javascript
//日期时间选择
$(".datetime-1").popodatetime({
container: ".box .screen"
});
//日期选择
$(".datetime-2").popodatetime({
container: ".box .screen",
time: false
});
//时间选择
$(".datetime-3").popodatetime({
container: ".box .screen",
date: false
});
```
