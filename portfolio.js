$(function(){
  $('.js-modal-open').each(function(){
    $(this).on('click',function(){
      $('body').css('overflow-y', 'hidden');
      var target = $(this).data('target');
      var modal = document.getElementById(target);
      var h = $(window).height();
      $(".modal_bg").css({ 'height' : h } );
      $(modal).fadeIn();
      var modalheight = $(modal).get(0).scrollHeight; //$(modal).height()だと、画面に収まっている範囲しか取得できない。また、モーダルを表示してからでないと取得できない。
      $(".modal_bg").css({ 'height' : modalheight } );
      $(window).resize(function() {
        $(".modal_bg").css( {'height' : h} ) ;
        var ch = $(modal).get(0).scrollHeight;
        $(".modal_bg").css( {'height' : ch} ) ;
      });
      return false;
    });
  });

  $('.js-modal-close').on('click',function(){
    $('.js-modal').fadeOut();
    $('body').css('overflow-y','auto');
    return false;
  }); 
});

$(function(){
  //モーダルウィンドウを出現させるクリックイベント
  $("#form-open").click( function(){

    let inputname = document.getElementById('name').value;
    let inputmail = document.getElementById('mail').value;
    let inputcomment = document.getElementById('comment').value;
    document.getElementById('outputname').textContent = `Name:${inputname}`;
    document.getElementById('outputmail').textContent = `Email:${inputmail}`;
    document.getElementById('outputcomment').textContent = `Comment:${inputcomment}`;
  
    //キーボード操作などにより、オーバーレイが多重起動するのを防止する
    $( this ).blur() ;	//ボタンからフォーカスを外す
    if( $( "#modal-overlay" )[0] ) return false ;	//新しくモーダルウィンドウを起動しない
  
    //オーバーレイを出現させる
    $( "body" ).append( '<div id="modal-overlay"></div>' ) ;
    $( "#modal-overlay" ).fadeIn( "slow" ) ;
  
    //コンテンツをセンタリングする
    centeringModalSyncer() ;
  
    //コンテンツをフェードインする
    $( "#modal-form-content" ).fadeIn( "slow" ) ;
  
    //[#modal-overlay]、または[#modal-close]をクリックしたら…
    $( "#modal-overlay,#modal-close" ).unbind().click( function(){
  
      //[#modal-content]と[#modal-overlay]をフェードアウトした後に…
      $( "#modal-form-content,#modal-overlay" ).fadeOut( "slow" , function(){
  
        //[#modal-overlay]を削除する
        $('#modal-overlay').remove() ;
  
      } ) ;
    } ) ;
  } ) ;
  
  //リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
  $( window ).resize( centeringModalSyncer ) ;
  
    //センタリングを実行する関数
    function centeringModalSyncer() {
  
      //画面(ウィンドウ)の幅、高さを取得
      var w = $( window ).width() ;
      var h = $( window ).height() ;
  
      // コンテンツ(#modal-content)の幅、高さを取得
      var cw = $( "#modal-form-content" ).outerWidth();
      var ch = $( "#modal-form-content" ).outerHeight();
  
      //センタリングを実行する
      $( "#modal-form-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
  
    }
  
  } ) ;