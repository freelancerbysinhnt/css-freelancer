"use strict";

$("#loginModal .nav-tabs button").on("click", function () {
  $("#loginModal .nav-tabs button").removeClass("active");
  $(this).addClass("active");
  var data_hef = $(this).attr("data-bs-target");
  $("#loginModal .tab-content .tab-pane").removeClass("active show");
  $(data_hef).addClass("active show");
});
$(".btn-ranger a").on("click", function () {
  var data_hef = $(this).attr("data-bs-target");
  $("#loginModal .nav-tabs button").removeClass("active");
  $("#loginModal .tab-content .tab-pane").removeClass("active show");
  $("#" + data_hef).addClass("active show");
  $(".btn-" + data_hef).addClass("active");
});
$(".content-item .item h2").on("click", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).parent().find(".item_list").slideUp();
  } else {
    $(this).addClass("active");
    $(this).parent().find(".item_list").slideDown();
  }
});
$(".list-box-tutorial").on("click", function () {
  $(".list-box-tutorial").removeClass("active");
  $(this).addClass("active");
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $(".side-nav .collapse").on("hide.bs.collapse", function () {
    $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
  });
  $(".side-nav .collapse").on("show.bs.collapse", function () {
    $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");
  });
});
$(".sub-menu-admin").on("click", function (e) {
  console.log(1);
  $(this).toggleClass("active");
});
$("#open_change").on("click", function (e) {
  $("#change_pass").css("display", "flex");
});
$("#close_change_pass").on("click", function (e) {
  $("#change_pass").css("display", "none");
});
$(document).ready(function () {
  $("#show_hide_password_old img").on("click", function (event) {
    event.preventDefault();

    if ($("#show_hide_password_old input").attr("type") == "text") {
      $("#show_hide_password_old input").attr("type", "password");
      $("#show_hide_password_old img").attr("src", "assets/images/eye-close.svg");
    } else if ($("#show_hide_password_old input").attr("type") == "password") {
      $("#show_hide_password_old input").attr("type", "text");
      $("#show_hide_password_old img").attr("src", "assets/images/icon_eye.svg");
    }
  });
  $("#show_hide_password_new img").on("click", function (event) {
    event.preventDefault();

    if ($("#show_hide_password_new input").attr("type") == "text") {
      $("#show_hide_password_new input").attr("type", "password");
      $("#show_hide_password_new img").attr("src", "assets/images/eye-close.svg");
    } else if ($("#show_hide_password_new input").attr("type") == "password") {
      $("#show_hide_password_new input").attr("type", "text");
      $("#show_hide_password_new img").attr("src", "assets/images/icon_eye.svg");
    }
  });
});
$("#button_substrac").on("click", function (e) {
  var value = $(".book-page__quantity-input").val();
  if (value > 1) $(".book-page__quantity-input").val(value - 1);
});
$("#button_add").on("click", function (e) {
  var value = parseInt($(".book-page__quantity-input").val());
  $(".book-page__quantity-input").val(value + 1);
});