/**
 * Created by popo on 2015/12/10.
 */
(function($) {
    $.fn.popodatetime = function (options) {
        var settings = $.extend({
            date: true,         //显示日期
            time: true,         //显示时间
            container: "body"   //控件容器
        }, options);

        return this.each(function (){
            var $this = $(this);
            $this.attr("readonly",true);

            function runDateTime(){
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day  = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();

                var beginyear = year-50;
                var endyear = year+50;

                //判断闰年
                function isLeapYear(year){
                    if((year%4==0&&year%100!=0)||year%400==0){
                        return true;
                    }else{
                        return false;
                    };
                };

                //年
                function yearStr(){
                    var str="";
                    for(var i=beginyear;i<=endyear;i++){
                        str+='<div class="swiper-slide">'+ i +'</div>';
                    };
                    return str;
                };

                //月
                function monthStr(){
                    var str="";
                    for(var i=1;i<=12;i++){
                        if(i<10){
                            i="0"+i;
                        };
                        str+='<div class="swiper-slide">'+ i +'</div>'
                    };
                    return str;
                };

                //日
                function dayStr(){
                    var str="";
                    for(var i=1;i<=31;i++){
                        if(i<10){
                            i="0"+i;
                        };
                        str+='<div class="swiper-slide">'+ i +'</div>'
                    };
                    return str;
                };

                //时
                function hourStr(){
                    var str="";
                    for(var i=0;i<=23;i++){
                        if(i<10){
                            i="0"+i;
                        };
                        str+='<div class="swiper-slide">'+ i +'</div>'
                    };
                    return str;
                };

                //分
                function minuteStr(){
                    var str="";
                    for(var i=0;i<=59;i++){
                        if(i<10){
                            i="0"+i;
                        };
                        str+='<div class="swiper-slide">'+ i +'</div>'
                    };
                    return str;
                };

                //结果
                function getResult(year,month,day,hour,minute){
                    if(settings.date!=false && settings.time!=false){
                        $(".popodatetime .result").html(year+"年"+month+"月"+day+"日"+hour+"时"+minute+"分");
                        $(".popodatetime .result").attr("data-value",year+"-"+month+"-"+day+" "+hour+":"+minute);
                    }else if(settings.date==false){
                        $(".popodatetime .result").html(hour+"时"+minute+"分");
                        $(".popodatetime .result").attr("data-value",hour+":"+minute);
                    }else{
                        $(".popodatetime .result").html(year+"年"+month+"月"+day+"日");
                        $(".popodatetime .result").attr("data-value",year+"-"+month+"-"+day);
                    };

                }

                //联动日期
                function scrollDate(){
                    var y = $(".year .swiper-slide-active").text();
                    var m = $(".month .swiper-slide-active").text();
                    var d = $(".day .swiper-slide-active").text();
                    var h = $(".hour .swiper-slide-active").text();
                    var mi = $(".minute .swiper-slide-active").text();
                    var dbox = $(".day .swiper-slide");
                    if(m==4||m==6||m==9||m==11){
                        swiperDay.removeSlide(30)
                    }
                    else if(m==2){
                        if(isLeapYear(y)==false ) {
                            swiperDay.removeSlide([28, 29, 30]);
                        }else{
                            swiperDay.removeSlide([29,30]);
                            if(dbox.last().text()==28){
                                swiperDay.appendSlide('<div class="swiper-slide">29</div>');
                            };
                        }
                    }else{
                        if(dbox.last().text()==30){
                            swiperDay.appendSlide('<div class="swiper-slide">31</div>');
                        }else if(dbox.last().text()==29){
                            swiperDay.appendSlide('<div class="swiper-slide">30</div><div class="swiper-slide">31</div>');
                        }else if(dbox.last().text()==28){
                            swiperDay.appendSlide('<div class="swiper-slide">29</div><div class="swiper-slide">30</div><div class="swiper-slide">31</div>');
                        };
                    };
                    getResult(y,m,d,h,mi);
                };

                //联动时间
                function scrollTime(){
                    var y = $(".year .swiper-slide-active").text();
                    var m = $(".month .swiper-slide-active").text();
                    var d = $(".day .swiper-slide-active").text();
                    var h = $(".hour .swiper-slide-active").text();
                    var mi = $(".minute .swiper-slide-active").text();
                    getResult(y,m,d,h,mi);
                };

                //日期滚动
                var swiperYear = new Swiper('.popodatetime .scroll .year', {
                    slidesPerView: 3,
                    spaceBetween: 0,
                    centeredSlides: true,
                    direction: 'vertical',
                    mousewheelControl : true,
                    onInit: function(swiper){
                        swiper.appendSlide(yearStr());
                    },
                    onSlideChangeEnd: function(){
                        scrollDate();
                    }
                });
                var swiperMonth = new Swiper('.popodatetime .scroll .month', {
                    slidesPerView: 3,
                    spaceBetween: 0,
                    centeredSlides: true,
                    direction: 'vertical',
                    mousewheelControl : true,
                    onInit: function(swiper){
                        swiper.appendSlide(monthStr());
                    },
                    onSlideChangeEnd: function(){
                        scrollDate();
                    }
                });
                var swiperDay = new Swiper('.popodatetime .scroll .day', {
                    slidesPerView: 3,
                    spaceBetween: 0,
                    centeredSlides: true,
                    direction: 'vertical',
                    mousewheelControl : true,
                    onInit: function(swiper){
                        swiper.appendSlide(dayStr());
                    },
                    onSlideChangeEnd: function(){
                        scrollDate();
                    }
                });

                //如果已经选择了日期时间则下次打开滚动到已选时间
                if($this.val()!="" && escape($this.val()).indexOf( "%u" )<0){
                    var str = String($this.val());
                    str=str.match(/\d+/g);
                    var arr = new Array();
                    arr = str;
                    if(settings.date==false || settings.time==false ){
                        year = arr[0];
                        month = arr[1];
                        day = arr[2];
                        hour = arr[0];
                        minute = arr[1];
                    }else{
                        year = arr[0];
                        month = arr[1];
                        day = arr[2];
                        hour = arr[3];
                        minute = arr[4];
                    };
                };

                //滚动到当前日期
                var ybox = $(".year .swiper-slide");
                var mbox = $(".month .swiper-slide");
                var dbox = $(".day .swiper-slide");
                for(var i=0;i<ybox.length;i++){
                    if(ybox.eq(i).text()==year){
                        swiperYear.slideTo(i, 0, false);
                        break;
                    };
                };
                for(var i=0;i<mbox.length;i++){
                    if(mbox.eq(i).text()==month){
                        swiperMonth.slideTo(i, 0, false);
                        break;
                    };
                };
                for(var i=0;i<dbox.length;i++){
                    if(dbox.eq(i).text()==day){
                        swiperDay.slideTo(i, 0, false);
                        break;
                    };
                };

                //时间滚动
                var swiperHour = new Swiper('.popodatetime .scroll .hour', {
                    slidesPerView: 3,
                    spaceBetween: 0,
                    centeredSlides: true,
                    direction: 'vertical',
                    mousewheelControl : true,
                    onInit: function(swiper){
                        swiper.appendSlide(hourStr());
                    },
                    onSlideChangeEnd: function(){
                        scrollTime();
                    }
                });
                var swiperMinute = new Swiper('.popodatetime .scroll .minute', {
                    slidesPerView: 3,
                    spaceBetween: 0,
                    centeredSlides: true,
                    direction: 'vertical',
                    mousewheelControl : true,
                    onInit: function(swiper){
                        swiper.appendSlide(minuteStr());
                    },
                    onSlideChangeEnd: function(){
                        scrollTime();
                    }
                });

                //滚动到当前时间
                var hourbox = $(".popodatetime .scroll .hour .swiper-slide");
                var minutebox = $(".popodatetime .scroll .minute .swiper-slide");
                for(var i=0;i<hourbox.length;i++){
                    if(hourbox.eq(i).text()==hour){
                        swiperHour.slideTo(i, 0, false);
                        break;
                    };
                };
                for(var i=0;i<minutebox.length;i++){
                    if(minutebox.eq(i).text()==minute){
                        swiperMinute.slideTo(i, 0, false);
                        break;
                    };
                };

                //显示当前时间
                var y = $(".year .swiper-slide-active").text();
                var m = $(".month .swiper-slide-active").text();
                var d = $(".day .swiper-slide-active").text();
                var h = $(".hour .swiper-slide-active").text();
                var mi = $(".minute .swiper-slide-active").text();
                getResult(y,m,d,h,mi);
            };

            function datetimeStr(){
                var str='';
                var dateTitStr ="",dateStr="";
                var timeTitStr ="",timeStr="";

                //日期标题
                dateTitStr +='<li>年</li>';
                dateTitStr +='<li>月</li>';
                dateTitStr +='<li>日</li>';

                //时间标题
                timeTitStr +='<li>时</li>';
                timeTitStr +='<li>分</li>';

                //日期主体
                dateStr +='<div class="swiper-container year"><div class="swiper-wrapper"></div></div>';
                dateStr +='<div class="swiper-container month"><div class="swiper-wrapper"></div></div>';
                dateStr +='<div class="swiper-container day"><div class="swiper-wrapper"></div></div>';

                //时间主体
                timeStr +='<div class="swiper-container hour"><div class="swiper-wrapper"></div></div>';
                timeStr +='<div class="swiper-container minute"><div class="swiper-wrapper"></div></div>';

                //判断初始化参数需要那一部分控件
                if(settings.date==false){
                    dateTitStr ="";
                    dateStr="";
                }else if(settings.time==false){
                    timeTitStr ="";
                    timeStr="";
                };

                str +='<div class="popodatetime">';
                str +='<div  class="main">';
                str +='<div class="datetime">';
                str +='<div class="result"></div>';
                str +='<ul class="title">';
                str += dateTitStr;
                str += timeTitStr;
                str +='</ul>';
                str +='<div class="scroll">';
                str += dateStr;
                str += timeStr;
                str +='</div>';
                str +='<div class="button">';
                str +='<a href="javascript:void(0)" class="btn-1">确定</a>';
                str +='<a href="javascript:void(0)" class="btn-2">取消</a>';
                str +='</div>';
                str +='</div>';
                str +='</div>';
                str +='<div class="cover">';
                str +='</div>';
                return str;
            };

            function hideDatetime(){
                $(".popodatetime").addClass("close");;
                var t = setInterval(function(){
                    $(".popodatetime").remove();
                    t = clearInterval(t)
                },500);
            };

            //触发控件
            $this.click(function(){
                if(settings.date==false && settings.time==false){
                    alert("错误：date和time不能同时为false!")
                }else{
                    $(settings.container).append(datetimeStr());
                };
                runDateTime();
                if(settings.time==false){
                    $(".popodatetime .main").addClass("mode-1");
                }else if(settings.date==false){
                    $(".popodatetime .main").addClass("mode-2");
                };
                $(".popodatetime .cover,.popodatetime .button .btn-2").click(function(){
                    hideDatetime();
                });
                $(".popodatetime .button .btn-1").click(function(){
                    $this.val($(".result").attr("data-value"));
                    hideDatetime();
                });
            });
        });
    };
})(jQuery);
