


<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { init_global_data } from "./tool/uni/uni-global";
import { nextTick } from "vue";
import { must_login } from "./tool/view/app_init";

// 装 全局变量
onLaunch(() => { uni.hideTabBar({ success: () => { } }) });
onShow(() => { uni.hideTabBar({ success: () => { } }) });
onHide(() => { });

nextTick(init_global_data)
nextTick(must_login)
</script>

<style lang="sass">
@use './ui/sass/app/font/__conf' as *
@use './ui/sass/app/media-screen.sass' as *

@import './plugin/icon/bootstrap/bootstrap_icon.css'

// 全局样式定义
page, uni-page-body 
  height: 100%
  box-sizing: border-box
  overflow-x: hidden
  overflow-y: scroll
  border-width: 0px
  font-size: $fs-global
  &::-webkit-scrollbar
      width: 1px
      border-radius: 10px
      background: transparent
  
page, uni-page-body, view, text, button, uni-input, uni-button, input, scroll-view
  box-sizing: border-box
  outline: none !important
  
scroll-view, .uni-scroll-view, .uni-scroll-view-content
  border-radius: inherit
  &::-webkit-scrollbar
    display: none
    width: 0px
    height: 0px
    border-radius: 10px
    background: transparent

// 重绘 uni 样式
.uni-app--showtabbar uni-page-wrapper::after
  display: none !important

uni-tabbar
    display: none !important

uni-input
  font-size: 1em
  &, &:hover, &:active, &:focus, &:focus-visible
    outline: none
  
uni-button
  font-size: 1em !important
  line-height: $ih !important

  margin: 0px !important
  padding: 0px !important
  border-radius: 0px !important

  overflow: visible !important
  background: transparent !important
  border: 0px solid transparent !important
  
  &::after
    border: 0px solid transparent !important

// 配置 body 的 字体大小，因为字体是继承的，所以，可以继承到 body 的字体大小
// NORMAL 16px
page, uni-page-body, body
  font-size: 16px
// WINDOW 14px
@each $k, $v in $window
  @media screen and (#{$k}-width: #{$v}px)
    page, uni-page-body, body
      font-size: 14px
// PAD 18px
@each $k, $v in $pad
  @media screen and (#{$k}-width: #{$v}px)
    page, uni-page-body, body
      font-size: 18px 
// NORMAL 16px
@each $k, $v in $normai
  @media screen and (#{$k}-width: #{$v}px)
    page, uni-page-body, body
      font-size: 16px 
// SMAII 14px
@each $k, $v in $smaii
  @media screen and (#{$k}-width: #{$v}px)
    page, uni-page-body, body
      font-size: 14px 
// mini 13px
@each $k, $v in $mini
  @media screen and (#{$k}-width: #{$v}px)
    page, uni-page-body, body
      font-size: 13px 
// tiny 12px
@each $k, $v in $tiny
  @media screen and (#{$k}-width: #{$v}px)
    page, uni-page-body, body
      font-size: 13px 
</style>

