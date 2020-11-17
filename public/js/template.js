$(document).ready(function() {
  //Click sendFeedback
  $("#sendFeedback").click(function(){
    setTimeout(function(){
      $("#feedback .close").click()
    }, 1000);
  });
});

$(document).ready(function() {
  // Click saveAccount
  $("#saveAccount").click(function(){
    setTimeout(function(){
      $("#editAccount .close").click()
    }, 1000);
  });
});

$(document).ready(function() {
   $('#menu_icon').click(function() {
      if ($('.page-sidebar').hasClass('expandit')){
          $('.page-sidebar').addClass('collapseit');
          $('.page-sidebar').removeClass('expandit');
          $('.profile-info').addClass('short-profile');
          $('.logo-area').addClass('logo-icon');
          $('#main-content').addClass('sidebar_shift');
          $('.menu-title').css("display", "none");
  } else {
    $('.page-sidebar').addClass('expandit');
    $('.page-sidebar').removeClass('collapseit');
    $('.profile-info').removeClass('short-profile');
      $('.logo-area').removeClass('logo-icon');
      $('#main-content').removeClass('sidebar_shift');
      $('.menu-title').css("display", "inline-block");
  }
});

});