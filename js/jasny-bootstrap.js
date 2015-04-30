/*!
 * Jasny Bootstrap v3.1.0 (http://jasny.github.com/bootstrap)
 * Copyright 2011-2014 Arnold Daniels.
 * Licensed under Apache-2.0 (https://github.com/jasny/bootstrap/blob/master/LICENSE)
 */

+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.state=null,this.placement=null,this.options.recalc&&(this.calcClone(),a(window).on("resize",a.proxy(this.recalc,this))),this.options.autohide&&a(document).on("click",a.proxy(this.autohide,this)),this.options.toggle&&this.toggle(),this.options.disablescrolling&&(this.options.disableScrolling=this.options.disablescrolling,delete this.options.disablescrolling)};b.DEFAULTS={toggle:!0,placement:"auto",autohide:!0,recalc:!0,disableScrolling:!0},b.prototype.offset=function(){switch(this.placement){case"left":case"right":return this.$element.outerWidth();case"top":case"bottom":return this.$element.outerHeight()}},b.prototype.calcPlacement=function(){function e(a,b){if(d.css(b)==="auto")return a;if(d.css(a)==="auto")return b;var c=parseInt(d.css(a),10),e=parseInt(d.css(b),10);return c>e?b:a}if(this.options.placement!=="auto"){this.placement=this.options.placement;return}this.$element.hasClass("in")||this.$element.css("visiblity","hidden !important").addClass("in");var b=a(window).width()/this.$element.width(),c=a(window).height()/this.$element.height(),d=this.$element;this.placement=b>=c?e("left","right"):e("top","bottom"),this.$element.css("visibility")==="hidden !important"&&this.$element.removeClass("in").css("visiblity","")},b.prototype.opposite=function(a){switch(a){case"top":return"bottom";case"left":return"right";case"bottom":return"top";case"right":return"left"}},b.prototype.getCanvasElements=function(){var b=this.options.canvas?a(this.options.canvas):this.$element,c=b.find("*").filter(function(){return a(this).css("position")==="fixed"}).not(this.options.exclude);return b.add(c)},b.prototype.slide=function(b,c,d){if(!a.support.transition){var e={};return e[this.placement]="+="+c,b.animate(e,350,d)}var f=this.placement,g=this.opposite(f);b.each(function(){a(this).css(f)!=="auto"&&a(this).css(f,(parseInt(a(this).css(f),10)||0)+c),a(this).css(g)!=="auto"&&a(this).css(g,(parseInt(a(this).css(g),10)||0)-c)}),this.$element.one(a.support.transition.end,d).emulateTransitionEnd(350)},b.prototype.disableScrolling=function(){var b=a("body").width(),c="padding-"+this.opposite(this.placement);a("body").data("offcanvas-style")===undefined&&a("body").data("offcanvas-style",a("body").attr("style")||""),a("body").css("overflow","hidden");if(a("body").width()>b){var d=parseInt(a("body").css(c),10)+a("body").width()-b;setTimeout(function(){a("body").css(c,d)},1)}},b.prototype.show=function(){if(this.state)return;var b=a.Event("show.bs.offcanvas");this.$element.trigger(b);if(b.isDefaultPrevented())return;this.state="slide-in",this.calcPlacement();var c=this.getCanvasElements(),d=this.placement,e=this.opposite(d),f=this.offset();c.index(this.$element)!==-1&&(a(this.$element).data("offcanvas-style",a(this.$element).attr("style")||""),this.$element.css(d,-1*f),this.$element.css(d)),c.addClass("canvas-sliding").each(function(){a(this).data("offcanvas-style")===undefined&&a(this).data("offcanvas-style",a(this).attr("style")||""),a(this).css("position")==="static"&&a(this).css("position","relative"),(a(this).css(d)==="auto"||a(this).css(d)==="0px")&&(a(this).css(e)==="auto"||a(this).css(e)==="0px")&&a(this).css(d,0)}),this.options.disableScrolling&&this.disableScrolling();var g=function(){if(this.state!="slide-in")return;this.state="slid",c.removeClass("canvas-sliding").addClass("canvas-slid"),this.$element.trigger("shown.bs.offcanvas")};setTimeout(a.proxy(function(){this.$element.addClass("in"),this.slide(c,f,a.proxy(g,this))},this),1)},b.prototype.hide=function(b){if(this.state!=="slid")return;var c=a.Event("hide.bs.offcanvas");this.$element.trigger(c);if(c.isDefaultPrevented())return;this.state="slide-out";var d=a(".canvas-slid"),e=this.placement,f=-1*this.offset(),g=function(){if(this.state!="slide-out")return;this.state=null,this.placement=null,this.$element.removeClass("in"),d.removeClass("canvas-sliding"),d.add(this.$element).add("body").each(function(){a(this).attr("style",a(this).data("offcanvas-style")).removeData("offcanvas-style")}),this.$element.trigger("hidden.bs.offcanvas")};d.removeClass("canvas-slid").addClass("canvas-sliding"),setTimeout(a.proxy(function(){this.slide(d,f,a.proxy(g,this))},this),1)},b.prototype.toggle=function(){if(this.state==="slide-in"||this.state==="slide-out")return;this[this.state==="slid"?"hide":"show"]()},b.prototype.calcClone=function(){this.$calcClone=this.$element.clone().html("").addClass("offcanvas-clone").removeClass("in").appendTo(a("body"))},b.prototype.recalc=function(){if(this.$calcClone.css("display")==="none"||this.state!=="slid"&&this.state!=="slide-in")return;this.state=null,this.placement=null;var b=this.getCanvasElements();this.$element.removeClass("in"),b.removeClass("canvas-slid"),b.add(this.$element).add("body").each(function(){a(this).attr("style",a(this).data("offcanvas-style")).removeData("offcanvas-style")})},b.prototype.autohide=function(b){a(b.target).closest(this.$element).length===0&&this.hide()};var c=a.fn.offcanvas;a.fn.offcanvas=function(c){return this.each(function(){var d=a(this),e=d.data("bs.offcanvas"),f=a.extend({},b.DEFAULTS,d.data(),typeof c=="object"&&c);e||d.data("bs.offcanvas",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.offcanvas.Constructor=b,a.fn.offcanvas.noConflict=function(){return a.fn.offcanvas=c,this},a(document).on("click.bs.offcanvas.data-api","[data-toggle=offcanvas]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.offcanvas"),h=g?"toggle":c.data();b.stopPropagation(),g?g.toggle():f.offcanvas(h)})}(window.jQuery),+function(a){function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(a.style[c]!==undefined)return{end:b[c]};return!1}"use strict";if(a.support.transition!==undefined)return;a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(window.jQuery)