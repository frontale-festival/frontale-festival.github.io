$(document).ready(function() {
  $('.toggleMore').on('click', function() {
    $(this).closest('.slot').toggleClass('active');
    $(this).next('.slot-more').slideToggle('fast');
  });

  $('#header .header-inner').css({'min-height': $(window).height()});
});
