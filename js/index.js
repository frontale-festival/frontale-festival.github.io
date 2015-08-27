$(document).ready(function() {
  $('.toggleMore').on('click', function() {
    $(this).toggleClass('active');
    $(this).parent().next('.slot-more').slideToggle('fast');
  });
});
