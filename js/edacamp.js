var winW = $(window).width();
var winH = $(window).height();
var schebtnfuntion = true;
$(document).ready(function(e) {
    $('#cover, #cover-cont').height(winH);
	
	$('.mitem, .submenu-item').click(function(e) {
        var fn = $(this).attr('mdata');
		var fnitem = $('#'+fn).offset();
		console.log(fnitem.top);
		$('body,html').animate({scrollTop:fnitem.top-100},500);
    });
	
	$('.menu-item-left').click(function(e) {
        $('body,html').animate({scrollTop:0},500);
    });
	
	$('.menu-btn').click(function(e) {
		e.stopPropagation();
        $('#submenu').slideToggle();
    });
	
	
	$('#signform').submit(function(e) {
		$('.loader').show();
		var check = 1;
		var regtest = /^\s+\s*/;
		$('.form-control').each(function(index, element) {
            if( $(this).attr('vc') == 0 ) check = 0; 
        });
		
		if( $('input:radio:checked[name="sign_where"]').val() == '其他' ){
			if( regtest.test( $('#sign_where_other').val() ) || $('#sign_where_other').val() == '' ){
				check = 0;
				$('#sign_where_other').parentsUntil('.form-group').addClass('has-error');
			}else{
				$('#sign_where_other').parentsUntil('.form-group').removeClass('has-error');
			}
		}else{
			$('#sign_where_other').parentsUntil('.form-group').removeClass('has-error');
		}
		
		if( $('#sign_agree').prop("checked") == false ){
			if( check == 1 ){
				check = 2;
			}
		}
		
		if ( check == 0 ){
			alert('請正確完成報名表單！');
			$('.loader').hide();
		}else if( check == 2){
			alert('請勾選『我已詳閱 EDA 夏令營相關規則並願意遵守營隊規範』');
			$('.loader').hide();
		}else{
			var form = document.getElementById("signform");
			var formData = new FormData(form);
			
	        //var formData = $('#signform').serialize();
			//console.log(formData);
			$.ajax({
				type: "POST",
				url: "signp.php",
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				success: function(data) {
					console.log(data);
					data = data.split("|");
					switch(data[0]){
						case 'OK':
							alert('恭喜報名成功，錄取成功將另行通知！\n請用下列網址確認報名資料：\nhttp://edacamp.giee.ntu.edu.tw/2019/ic/?cc='+data[1]);
							location.reload();
							break;
						case 'DEM':
							alert('報名失敗，您輸入的Email已存在系統中！');
							break;
					}
					$('.loader').hide();
				}
			});
		}
		
		return false;
	});
	
	
	$('.schebtn').click(function(e) {
		if( schebtnfuntion ){
			var sid = $(this).attr("sid");
	        $('.pb-panel, .pb-panel-sche').hide();
			var pitem = $('.'+sid+'-panel');
			pitem.show();
	        $('.popbox').fadeIn();
			if( winW > 768 ){
				pitem.css('max-height',winH * 0.8 );
			}else{
				pitem.css('max-height',winH);
				pitem.css('height',winH);
			}
			$('body').css('overflow','hidden');
		}
    });
	
	// $('#signupbtn').click(function(e) {
	// 	$('.pb-panel, .pb-panel-sche').hide();
	// 	$('.signup-panel').show();
 //        $('.popbox').fadeIn();
	// 	if( winW > 768 ){
	// 		$('.signup-panel').css('max-height',winH * 0.8 );
	// 	}else{
	// 		$('.signup-panel').css('max-height',winH);
	// 		$('.signup-panel').css('height',winH);
	// 	}
	// 	$('body').css('overflow','hidden');
		
 //    });
	
	$('.popbox, .signup-closebtn').click(function(e) {
        $('.popbox').fadeOut();
		$('body').css('overflow','auto');
		
    });
	
	$('.signup-panel').click(function(e) {
        e.stopPropagation();
    });
	
	$('body').click(function(e) {
        $('#submenu').slideUp();
    });
	
	
	
	
	$('.form-control').blur(function(e) {
		var regtest = /^\s+\s*/;
		if( $(this).attr("id") != 'sign_where_other' ){
			if( regtest.test( $(this).val() ) || $(this).val() == '' ){
				$(this).attr('vc','0');
				$(this).parentsUntil('.form-group').addClass('has-error');
				$(this).parentsUntil('.form-group').removeClass('has-success');
			}else{
				$(this).attr('vc','1');
				$(this).parentsUntil('.form-group').removeClass('has-error');
				$(this).parentsUntil('.form-group').addClass('has-success');
			}
		}
    });
	
	$('#sign_email').blur(function(e) {
		var regtest = /[a-zA-Z0-9_]+@[a-zA-Z0-9\._]+/;
        if( regtest.test($(this).val()) ){
			$(this).attr('vc','1');
			$(this).parentsUntil('.form-group').removeClass('has-error');
			$(this).parentsUntil('.form-group').addClass('has-success');
		}else{
			$(this).attr('vc','0');
			$(this).parentsUntil('.form-group').addClass('has-error');
			$(this).parentsUntil('.form-group').removeClass('has-success');
		}
    });
	
	$('#sign_mobile').blur(function(e) {
		var regtest = /^[09]{2}[0-9]{8}$/;
        if( regtest.test($(this).val()) ){
			$(this).attr('vc','1');
			$(this).parentsUntil('.form-group').removeClass('has-error');
			$(this).parentsUntil('.form-group').addClass('has-success');
		}else{
			$(this).attr('vc','0');
			$(this).parentsUntil('.form-group').addClass('has-error');
			$(this).parentsUntil('.form-group').removeClass('has-success');
		}
    });
	
});

$(window).load(function(e) {
    $('.blurpre-start').addClass('blurout');
});

$(window).resize(function(e) {
	winW = $(window).width();
	winH = $(window).height();
    $('#cover, #cover-cont').height(winH);
	if( winW > 768 ){
		$('.signup-panel, .pb-panel-sche').css('max-height',winH * 0.8 );
	}else{
		$('.signup-panel, .pb-panel-sche').css('max-height',winH);
	}
});

$(window).scroll(function(e) {
    var sT = $(this).scrollTop();
	if( winW > 700 ){
		if( sT > winH/4 ) $('#menu').fadeIn();
		else{
			$('#menu').fadeOut();
			$('#submenu').slideUp();
		}
	}else{
		$('#submenu').slideUp();
	}
	
	$('.blurpre').each(function(index, element) {
        if( sT + winH * 0.75 > $(this).offset().top ){
			$(this).addClass('blurout');
		}
    });
	
	$('p,li').each(function(index, element) {
        if( sT + winH * 0.9 > $(this).offset().top ){
			$(this).addClass('pmove');
		}
    });
	
	
	
	
	
});