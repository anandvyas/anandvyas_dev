(function ($) {
  "use strict"; // Start of use strict
  // Configure tooltips for collapsed side navigation

  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })
  // Toggle the side navigation
  $("#sidenavToggler").click(function (e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function (e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function (e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });
})(jQuery); // End of use strict

function randomString(length) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  if (! length) {
      length = Math.floor(Math.random() * chars.length);
  }
  var str = '';
  for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

function dateDiff(start,end) {
  var a = moment(end).isValid() ? moment(end) : moment();
  var b = moment(start).isValid() ? moment(start) : moment();
  
  var years = a.diff(b, 'year');
  b.add(years, 'years');
  
  var months = a.diff(b, 'months');
  b.add(months, 'months');
  var days = a.diff(b, 'days');

  return '(' + years + ' years ' + months + ' months)';
}

var callback = function () {
  
  $('pre code').each(function (i, block) {
    var ele = $(this);
    var rand = randomString(8);
    $('<span class="fa fa-copy btncopy" data-clipboard-target="#'+ rand +'"></span>').insertBefore(ele);
    ele.attr("id",rand);
    hljs.highlightBlock(block);
    
    new Clipboard('.btncopy');
  });

  // About section get Total duration 
  $('.totalduration').each(function(){
    var curElement = $(this);
    var diff = dateDiff(curElement.attr('start'),curElement.attr('end'));
    curElement.html(diff);
  });

  $('#myCarousel').carousel({
    interval: 2000
  });

  $('.item-skills').each(function () {
    // var parWidth = $(this).parent().width();
    var skillPer = $(this).attr('data-percent');
    // newWidth = (parWidth * skillPer) / 100;
    $(this).width(0);
    $(this).animate({
      width: skillPer + "%",
    }, 1000);
  });

  $('.icons-red').each(function () {
    height = $(this).height();
    $(this).animate({
      height: 14,
    }, 2000);
  });
};
$(document).ready(callback);