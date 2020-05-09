
var $carousel;

window.onload = function() {


    $('.loadsuper').mouseenter(function(e){
        posicao = $(this).offset();
        $(this).css("cursor","help");
        exibeImagem($(this).prop('name'), posicao.top, posicao.left); 
    });
    $('.alb-product__sku').hide();
    $('.loadsuper').mouseout(function(e){
        $('#imagem').css("display","none");
    });
    $('.tamanho').attr('style', 'opacity:1;');
    var corAtual = $('#corAtual').val();
    $('.alb-sku__itemTamanho').each(function () {
        if (!$(this).attr('quantidade') > 0 || $(this).attr('cor') != corAtual) {
            $(this).hide(); 
        }
    });
    $("input[name='sku2']").click(function() {
        $(".alb-sku--size-change").html('');
        $("input[name='sku1']").prop('checked', false);
        $(".cor_nome").html($(this).attr('cor'));

        corAtual = $(this).attr('cor');
        $('.alb-sku__itemTamanho').each(function () {
            if (!$(this).attr('quantidade') > 0 || $(this).attr('cor') != corAtual) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
        
        let id_produto = $(this).attr('idProduto');
        let codigo_loja = $(this).val();
        
        if(id_produto > 0 && codigo_loja > 0){
            let url = "loja/bucar_produtos_json?id_produto="+id_produto+"&codigo_loja="+codigo_loja;
            $.get(url,function(data){
                let obj = jQuery.parseJSON(data); 
                if(obj.html){
                    $(".primeiraDivSlide").attr('src', obj.html);
                    $(".zoomWindow").css('background-image', 'url("'+obj.html+'"');
                    $(".primeiraImagemSlide").attr('src', obj.html);
                    $carousel.flickity( 'select', 0 );
                }
            });
        }
    });
    $("input[name='sku1']").click(function() {
        $(".alb-picture-slider__item").attr('src', $(this).data('src'));
        $(".alb-sku--size-change").html($(this).attr("opt"));
       
        let id_produto = $(this).attr('idProduto');
        let codigo_loja = $(this).val();

    });
},$(document).ready(function() {
	function ClearZoom() {
		$('.zoomContainer').remove();
        $('.alb-picture__zoom').removeData('elevateZoom');
        $('.alb-picture__zoom').removeData('zoomImage');
		$('.zoomWrapper img.alb-picture__zoom').unwrap();
	}
  $carousel = $('.alb-picture-slider__list').flickity({
    cellAlign: 'center',
    cellSelector: '.alb-picture-slider__item',
    contain: true,
    draggable: false,
    imagesLoaded: true,
    wrapAround: true
  });
  $carousel.on( 'scroll.flickity', function() {
    ClearZoom();
  })
  if($('#shelf-list__product').length) {    
    var $carousel_product = $( '#shelf-list__product').flickity({
      cellAlign: 'left',
      cellSelector: '.shelf-list__item',
      contain: true,
      groupCells: true,
      wrapAround: true
    });
  }
	$('.alb-picture-slider__list .dot').click(function() {
		ClearZoom();
	})
  $('.alb-reviews__list').flickity({
    cellAlign: 'left',
    cellSelector: '.alb-reviews__item',
    contain: true,
    groupCells: true,
    pageDots: false,
    wrapAround: true
  });
  $('.alb-picture-slider__item')
		.mouseenter(function() {
			console.log('mouse unic')
			$(this).find('.alb-picture__zoom').elevateZoom({
				cursor: 'pointer',
				lensSize: 140,
                zoomWindowWidth: 350,
                zoomWindowHeight: 350,
				zoomWindowFadeIn: 200,
				zoomWindowFadeOut: 200,
				imageCrossfade: true
			});
		})
  var content = $('#alb_desc');
  if(content.length) {
    $('.alb-product__more > a').click(function(e) {
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(aid).offset().top - 150},'slow');
    });
  }


  // Frete no produto
    function carregarCEP2() {
        if ($('#cep').val().length > 7 && $('#cep').val() != $('#novoCEP').val()) {
         
            let cep = $('#cep').val();
            let cub = $('#cep_cub').val();
            let peso = $('#cep_peso').val();
            let total = $('#cep_total').val();
            let parcelas = $('#cep_parcelas').val();
            let correio = $('#cep_correio').val();
            let get = '?cub='+cub+'&peso='+peso+'&total='+total+'&parcelas='+parcelas+'&correio='+correio+'&cep='+cep;
            let url = 'https://www.alobebe.com.br/fretes/calcular_ajax'+get;
            $('.alb-shipping__footer').css("display","block");
            $('.areaFrete').html('<img src="http://i.kinja-img.com/gawker-media/image/upload/chag4hzw0pgvgy5ujnom.gif" width="30%" style="display:block;margin-left:auto;margin-right:auto">');
            $.get(url, function (dados) {
                $('.areaFrete').html('<p class="descricao_cep"></p><p class="valor_cep"></p>');
             //   alert(dados);
                let data = $.parseJSON(dados);
                $('.descricao_cep').html(data.descricao);
                $('.valor_cep').html(data.calculo_frete);
            
                if (Number(data.frete_valorNF) > 0) {
                $('.valor_freteCarrinho').html('<span>R$</span> '+data.frete_valor);
                } else {
                $('.valor_freteCarrinho').html('<span>GRATIS</span>');
                }
                
                $('.valor_freteCarrinhoTotal').html('<span>R$</span> '+data.frete_valorTotal);
                $('#novoCEP').val(cep);
            });
        }
    } 
    $('#cep').blur(function () {
        carregarCEP2();
    });

    $('#calcfrete').click(function(){
        carregarCEP2(); 
    });
    $('#cep').keyup(function () {
        if ($('#cep').val().length > 7) {
            carregarCEP2();
        }
    });

});
