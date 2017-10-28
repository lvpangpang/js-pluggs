(function ($) { 
    $.fn.pageing = function(options, ajax){ 
        // 注入的整体html结构
       var html = '总<span class="allNum"></span>条数据 <span class="now-page"></span>/<span class="allPage"></span>页 至 <input type="text"  class="index-target" /> 页 <a href="###" class="target" class="goPage">跳转</a><ul class="page-main" id="pageMain"><li class="block"><a href="###" class="prev unable-page"><i class="prev-i"></i></a></li><li class="block last"><a href="###" class="next"><i class="next-i"></i></a></li></ul>';
        // 初始化
        $(this).html('').append(html);
        var that = $(this);        
            oThis = $(this).find('ul');
            nowPageDom = $(this).find('.now-page'),//目前是第几页多少页元素(显示)
            indexTargetDom = $(this).find('.index-target'),//目前多少页元素（输入框）
            targetDom = $(this).find('.target'),//跳转元素
            totalNumDom = $(this).find('.allNum');//总共数据条数元素
            totalPageDom = $(this).find('.allPage');//总共数据页面元素
            prevDom = $(this).find('.prev'),//上一页元素
            nextDom = $(this).find('.next'),//下一页元素
            lastDom = nextDom.parent(),
            pageDom = $(this).find('.page');
            min = 0,
            index = 1,
            page = null,
            defaultOptions = {
                totalNum : 100,//总数据条数
                totalPage : 10,//总页数
                everyNum : 10,//每页显示多少条数据
                showPageNum : 5//最多显示多少页数
            },
            ajax = ajax || function() {},
            methodObject = {
                init : function() {
                    options = $.extend({}, defaultOptions, options);
                    if( options.totalNum===0 ) {
                        that.remove();
                    } else {
                        nowPageDom.text(index);
                        totalNumDom.text(options.totalNum);
                        totalPageDom.text(options.totalPage);
                        if( options.totalPage === 1 ) {
                            nextDom.addClass('unable-page');
                        }
                        pageDom.remove();
                        for(var i=1; i<= options.totalPage; i++) {
                            var $li = $('<li class="page"></li>'),
                                $a = $("<a href='###'></a>");
                            if( i===index ) {
                                $a.addClass('active');
                            }
                            $a.text(i);
                            $li.append($a);
                            lastDom.before($li);
                        }
                        pageDom = oThis.find('.page');
                        pageDom.hide();
                        this.show(index);
                        this.showPageindex(0, options.showPageNum, index-1);
                    }
                },
                // 样式控制方法
                show : function(index) {
                    oThis.find('a').removeClass('unable-page');
                    if( index===1 ) {
                        prevDom.addClass('unable-page');
                    } 
                    if(index === options.totalPage ) {
                        nextDom.addClass('unable-page');
                    }
                    oThis.find('a').removeClass('active');
                    pageDom.eq(index-1).children('a').addClass('active');
                    nowPageDom.text(index);
                },
                //显示控制方法
                showPageindex : function(min , max , index) {
                    if( index <= max/2 ) {
                        min = 0;
                        max = max;
                    } else if(options.totalPage - index <= Math.ceil(max/2) ){
                        min = options.totalPage - max;
                        max = options.totalPage;
                    } else {
                        min = Math.round(index - max/2);
                        max = Math.round(index + max/2);
                    }
                    pageDom.hide();
                    for(var i=min; i<max; i++) {
                        pageDom.eq(i).show();
                    }
                }
            };
        // 界面初始化
         methodObject.init();
        // 点击事件
        oThis.find('a').on('click' , function() {
            indexTargetDom.val('');
            oThis.find('li').each(function() {
                if( $(this).children('a').hasClass('active') ) {
                    index = $(this).index();
                }
            });
            if( $(this).hasClass('unable-page') ) {
                return;
            } else if( $(this).hasClass('prev') ) {
                index--;
            } else if( $(this).hasClass('next') ) {
                index++;
            } else {
                index = $(this).parent().index();
            }
            methodObject.show(index);
            methodObject.showPageindex(0, options.showPageNum, index-1);
            ajax(index);
        });
        // 点击跳转按钮事件
        targetDom.click(function() {
            index = indexTargetDom.val();
            if( index !== '' ) {
                index = parseInt(indexTargetDom.val()) ;
                if( index < 1 ) {
                    alert('输入页数不能小于1！');
                    return false;
                } else if ( index>options.totalPage ) {
                    alert('输入页数不能大于总页数！');
                    return false;
                } else {
                    methodObject.showPageindex(min , options.showPageNum, index-1);
                    methodObject.show(index);
                    ajax(index);
                }
            } else {
                alert('请输入页数');
            }  
        });
        // 限制只能输入数字
        indexTargetDom.keyup(function() {
            $(this).val($(this).val().replace(/\D/g,""));
        }).keydown(function() {
            $(this).val($(this).val().replace(/\D/g,""));
        });
    }; 
})(jQuery);