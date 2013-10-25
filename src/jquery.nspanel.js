//
//  jquery.nspanel.js
//  jq plugin
//
//  Created by sang alfred on 20/10/2013.
//
//
// TODO:
// 1，增加声明周期回调
// 2，增加模板支持
// 
// History:
// 2013-10-21 增加进出动画速度，单位毫秒（marco觉得速度快比较库）
// 增加栈
// 
;(function($) {   

	//--------------------- public methods --------------------------
	function plog(info){
    if (window.console && window.console.log)    
      window.console.log('LOG: ' + info ); 
	}
	
	function pp(type,info){
   		plog(' [-'+type+'-]  '+info)
	}
	
	/**
	 * hide
	 */ 
	function hide_current_panel(new_panel_id,opt){
		//显示前一个页面
		show_pre_panel(opt);
		
		//在_viewstack中移除已返回的panel
		viewstack_pop(opt);
		
		//隐藏当前页面 		
		$( "#" + new_panel_id ).animate({
		  // opacity: 0.25,
			left:'100%',
			width:'100%'
		  }, opt.animation.speed_out ,function(){
			  $(this).hide();
		  });
	}
	
	/**
	 * show
	 */ 
	function show_current_panel(new_panel_id,opt){
		//隐藏前一个页面 		
		// sid_push(sid); 
		
		//显示当前页面
		$( "#" + new_panel_id ).show().animate({
		  // opacity: 0.25,
			left:0,
			width:'100%'
		  }, opt.animation.speed_in ,function(){
				hide_pre_panel(opt);
		 });
	}
	
	/**
	 * @param context 		: 插件上下文
	 * @param opt		  		: 插件配置选项
	 */ 
	function create_section_dom(context,opt){
		var _new_panel_id = get_new_panel_id(context,opt);
		
		if($('#' +_new_panel_id).text().length >0){
			plog('已加载过此section  id='+_new_panel_id);
			return;   
		}else{
			_create_section(_new_panel_id,opt);
		}
	}
	
	function show_pre_panel(opt){
		_get_pre_panel(opt).show();
	}

	function hide_pre_panel(opt){
		_get_pre_panel(opt).hide();
	}
	
	function viewstack_push(opt,new_panel){
		opt._viewstack.push( new_panel );
	}
	
	function viewstack_pop(opt){
		opt._viewstack.pop();
	}

	function get_level(opt){
		return opt._viewstack.length == 1 ? 0 : opt._viewstack.length - 1;
	}
	
	/**
	
		<a href='#' class='sectionloader' url='section/apply/s3'>
			<img src='images/apply/pic1.png' width='98%' height='120px'/>
		</a>
	
	 * 例子：3_2_section_apply_s4
	 *
	 *    3是层级
	 *    2是此section中a标签的index（从1开始） 
	 *    section_apply_s4是a标签中的url
	 */ 
	function get_new_panel_id(context,opt){
		var _new_panel_id = get_level(opt) + '_' 
											  + context.item_number 
												+ '_' 
												+ $(context).attr('url').split('/').join('_');
		return _new_panel_id;
	}
	
	//--------------------- private methods --------------------------
	function _create_section(id,opt){
		var section_html = "<section id='" + id +"'></section>";
		$('body').append(section_html);
		$('#' + id).css(opt.section_style);
	}
  
	function _get_pre_panel(opt){
		if(opt._viewstack.length < 2){
			plog('stack exception....');
			return;
		}
		return opt._viewstack[opt._viewstack.length - 2];
	}
	
	//----------------------- jquery   plugin  -----------------------
  $.fn.panel = function(options) {       
		// init var
    var opts = $.extend({}, $.fn.panel.defaults, options);    
		//当前item在自己归属的section中的index
		var i = 0;
		
		//start plugin here
    return this.each(function() {    
      $this = $(this);    
			i++;
			//用于生成_new_panel_id
			$this.item_number = i;
			
      // 合并所有的配置项
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;  
		
			//init viewstack
			// 保证首次调用插件，当前页入栈
			if(o._viewstack.length == 0){
				 o._viewstack.push($('.panel_content').first());
			}
			
			// 创建新panel的唯一标识
			// _new_panel_id= 0_2_section_apply_s3 
			var _new_panel_id =  get_new_panel_id($this,o);
			
			plog('_new_panel_id= '+_new_panel_id);
			
			//调用插件之后，立即初始化section容器，给jq的load()做准备
			create_section_dom($this,o);
 
			// a标签点击的时候，加载html，加载完成后显示
			$this.off('click').on('click',function(){
				$('#' +_new_panel_id).load( $(this).attr('url') +'.html',function(t){
					var _new_panel = $('#' +_new_panel_id);

					_new_panel.find('.back_button').closest('div.button_container').click(function(){
						hide_current_panel(_new_panel_id,o);
					});
					  
					// 新section入栈
					viewstack_push(o,_new_panel)
					
					//递归当前section进行panel化
					_new_panel.find('.sectionloader').panel(o);
				});
			});
			
			$this.find('img').click(function(){
				show_current_panel(_new_panel_id,o);
			});
			
	    $('body').hammer().on("swipeleft", "section", function(event) {
         // alert(this, event);
	    }).on("swiperight", "section", function(event) {
		   	$('.back_button').closest('div.button_container').click();
	    });
    });//end this.each    
  };  
	
	//插件的defaults    
  $.fn.panel.defaults = {    
    section_style: {
			display:'block',
			'z-index':1000,
			background:'red',
			top:0,
			position:'absolute',
			left:'100%',
			height:'100%'
    },    
    animation:{
			speed_in:600,//单位毫秒
			speed_out:600,//单位毫秒
		},
		_current:{

		},
		_viewstack:[]
  };    
  
})(jQuery); 