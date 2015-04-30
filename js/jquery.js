/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */;
(function(jQuery) {
    jQuery.fn.marquee = function(options) {
        return this.each(function() {
            // Extend the options if any provided
            var o = jQuery.extend({}, jQuery.fn.marquee.defaults, options),
                jQuerythis = jQuery(this),
                jQuerymarqueeWrapper, containerWidth, animationCss, verticalDir, elWidth,
                loopCount = 3,
                playState = 'animation-play-state',
                css3AnimationIsSupported = false,

                //Private methods
                _prefixedEvent = function(element, type, callback) {
                    var pfx = ["webkit", "moz", "MS", "o", ""];
                    for (var p = 0; p < pfx.length; p++) {
                        if (!pfx[p]) type = type.toLowerCase();
                        element.addEventListener(pfx[p] + type, callback, false);
                    }
                },

                _objToString = function(obj) {
                    var tabjson = [];
                    for (var p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            tabjson.push(p + ':' + obj[p]);
                        }
                    }
                    tabjson.push();
                    return '{' + tabjson.join(',') + '}';
                },

                _startAnimationWithDelay = function() {
                    jQuerythis.timer = setTimeout(animate, o.delayBeforeStart);
                },

                //Public methods
                methods = {
                    pause: function() {
                        if (css3AnimationIsSupported && o.allowCss3Support) {
                            jQuerymarqueeWrapper.css(playState, 'paused');
                        } else {
                            //pause using pause plugin
                            if (jQuery.fn.pause) {
                                jQuerymarqueeWrapper.pause();
                            }
                        }
                        //save the status
                        jQuerythis.data('runningStatus', 'paused');
                        //fire event
                        jQuerythis.trigger('paused');
                    },

                    resume: function() {
                        //resume using css3
                        if (css3AnimationIsSupported && o.allowCss3Support) {
                            jQuerymarqueeWrapper.css(playState, 'running');
                        } else {
                            //resume using pause plugin
                            if (jQuery.fn.resume) {
                                jQuerymarqueeWrapper.resume();
                            }
                        }
                        //save the status
                        jQuerythis.data('runningStatus', 'resumed');
                        //fire event
                        jQuerythis.trigger('resumed');
                    },

                    toggle: function() {
                        methods[jQuerythis.data('runningStatus') == 'resumed' ? 'pause' : 'resume']();
                    },

                    destroy: function() {
                        //Clear timer
                        clearTimeout(jQuerythis.timer);
                        //Unbind all events
                        jQuerythis.find("*").andSelf().unbind();
                        //Just unwrap the elements that has been added using this plugin
                        jQuerythis.html(jQuerythis.find('.js-marquee:first').html());
                    }
                };

            //Check for methods
            if (typeof options === 'string') {
                if (jQuery.isFunction(methods[options])) {
                    //Following two IF statements to support public methods
                    if (!jQuerymarqueeWrapper) {
                        jQuerymarqueeWrapper = jQuerythis.find('.js-marquee-wrapper');
                    }
                    if (jQuerythis.data('css3AnimationIsSupported') === true) {
                        css3AnimationIsSupported = true;
                    }
                    methods[options]();
                }
                return;
            }

            /* Check if element has data attributes. They have top priority
               For details https://twitter.com/aamirafridi/status/403848044069679104 - Can't find a better solution :/
               jQuery 1.3.2 doesn't support jQuery.data().KEY hence writting the following */
            var dataAttributes = {},
            attr;
            jQuery.each(o, function(key, value) {
                //Check if element has this data attribute
                attr = jQuerythis.attr('data-' + key);
                if (typeof attr !== 'undefined') {
                    //Now check if value is boolean or not
                    switch (attr) {
                        case 'true':
                            attr = true;
                            break;
                        case 'false':
                            attr = false;
                            break;
                    }
                    o[key] = attr;
                }
            });

            //since speed option is changed to duration, to support speed for those who are already using it
            o.duration = o.speed || o.duration;

            //Shortcut to see if direction is upward or downward
            verticalDir = o.direction == 'up' || o.direction == 'down';

            //no gap if not duplicated
            o.gap = o.duplicated ? o.gap : 0;

            //wrap inner content into a div
            jQuerythis.wrapInner('<div class="js-marquee"></div>');

            //Make copy of the element
            var jQueryel = jQuerythis.find('.js-marquee').css({
                'margin-right': o.gap,
                'float': 'left'
            });

            if (o.duplicated) {
                jQueryel.clone(true).appendTo(jQuerythis);
            }

            //wrap both inner elements into one div
            jQuerythis.wrapInner('<div style="width:1000px" class="js-marquee-wrapper"></div>');

            //Save the reference of the wrapper
            jQuerymarqueeWrapper = jQuerythis.find('.js-marquee-wrapper');

            //If direction is up or down, get the height of main element
            if (verticalDir) {
                var containerHeight = jQuerythis.height();
                jQuerymarqueeWrapper.removeAttr('style');
                jQuerythis.height(containerHeight);

                //Change the CSS for js-marquee element
                jQuerythis.find('.js-marquee').css({
                    'float': 'none',
                    'margin-bottom': o.gap,
                    'margin-right': 0
                });

                //Remove bottom margin from 2nd element if duplicated
                if (o.duplicated) jQuerythis.find('.js-marquee:last').css({
                    'margin-bottom': 0
                });

                var elHeight = jQuerythis.find('.js-marquee:first').height() + o.gap;

                // adjust the animation speed according to the text length
                // formula is to: (Height of the text node / Height of the main container) * speed;
                o.duration = ((parseInt(elHeight, 10) + parseInt(containerHeight, 10)) / parseInt(containerHeight, 10)) * o.duration;

            } else {
                //Save the width of the each element so we can use it in animation
                elWidth = jQuerythis.find('.js-marquee:first').width() + o.gap;

                //container width
                containerWidth = jQuerythis.width();

                // adjust the animation speed according to the text length
                // formula is to: (Width of the text node / Width of the main container) * speed;
                o.duration = ((parseInt(elWidth, 10) + parseInt(containerWidth, 10)) / parseInt(containerWidth, 10)) * o.duration;
            }

            //if duplicated than reduce the speed
            if (o.duplicated) {
                o.duration = o.duration / 2;
            }

            if (o.allowCss3Support) {
                var
                elm = document.body || document.createElement('div'),
                    animationName = 'marqueeAnimation-' + Math.floor(Math.random() * 10000000),
                    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
                    animationString = 'animation',
                    animationCss3Str = '',
                    keyframeString = '';

                //Check css3 support
                if (elm.style.animation) {
                    keyframeString = '@keyframes ' + animationName + ' ';
                    css3AnimationIsSupported = true;
                }

                if (css3AnimationIsSupported === false) {
                    for (var i = 0; i < domPrefixes.length; i++) {
                        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                            var prefix = '-' + domPrefixes[i].toLowerCase() + '-';
                            animationString = prefix + animationString;
                            playState = prefix + playState;
                            keyframeString = '@' + prefix + 'keyframes ' + animationName + ' ';
                            css3AnimationIsSupported = true;
                            break;
                        }
                    }
                }

                if (css3AnimationIsSupported) {
                    animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's infinite ' + o.css3easing;
                    jQuerythis.data('css3AnimationIsSupported', true);
                }
            }

            var _rePositionVertically = function() {
                jQuerymarqueeWrapper.css('margin-top', o.direction == 'up' ? containerHeight + 'px' : '-' + elHeight + 'px');
            },
            _rePositionHorizontally = function() {
                jQuerymarqueeWrapper.css('margin-left', o.direction == 'left' ? containerWidth + 'px' : '-' + elWidth + 'px');
            };

            //if duplicated option is set to true than position the wrapper
            if (o.duplicated) {
                if (verticalDir) {
                    jQuerymarqueeWrapper.css('margin-top', o.direction == 'up' ? containerHeight + 'px' : '-' + ((elHeight * 2) - o.gap) + 'px');
                } else {
                    jQuerymarqueeWrapper.css('margin-left', o.direction == 'left' ? containerWidth + 'px' : '-' + ((elWidth * 2) - o.gap) + 'px');
                }
                loopCount = 1;
            } else {
                if (verticalDir) {
                    _rePositionVertically();
                } else {
                    _rePositionHorizontally();
                }
            }

            //Animate recursive method
            var animate = function() {
                if (o.duplicated) {
                    //When duplicated, the first loop will be scroll longer so double the duration
                    if (loopCount === 1) {
                        o._originalDuration = o.duration;
                        if (verticalDir) {
                            o.duration = o.direction == 'up' ? o.duration + (containerHeight / ((elHeight) / o.duration)) : o.duration * 2;
                        } else {
                            o.duration = o.direction == 'left' ? o.duration + (containerWidth / ((elWidth) / o.duration)) : o.duration * 2;
                        }
                        //Adjust the css3 animation as well
                        if (animationCss3Str) {
                            animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's ' + o.css3easing;
                        }
                        loopCount++;
                    }
                    //On 2nd loop things back to normal, normal duration for the rest of animations
                    else if (loopCount === 2) {
                        o.duration = o._originalDuration;
                        //Adjust the css3 animation as well
                        if (animationCss3Str) {
                            animationName = animationName + '0';
                            keyframeString = jQuery.trim(keyframeString) + '0 ';
                            animationCss3Str = animationName + ' ' + o.duration / 1000 + 's 0s infinite ' + o.css3easing;
                        }
                        loopCount++;
                    }
                }

                if (verticalDir) {
                    if (o.duplicated) {

                        //Adjust the starting point of animation only when first loops finishes
                        if (loopCount > 2) {
                            jQuerymarqueeWrapper.css('margin-top', o.direction == 'up' ? 0 : '-' + elHeight + 'px');
                        }

                        animationCss = {
                            'margin-top': o.direction == 'up' ? '-' + elHeight + 'px' : 0
                        };
                    } else {
                        _rePositionVertically();
                        animationCss = {
                            'margin-top': o.direction == 'up' ? '-' + (jQuerymarqueeWrapper.height()) + 'px' : containerHeight + 'px'
                        };
                    }
                } else {
                    if (o.duplicated) {

                        //Adjust the starting point of animation only when first loops finishes
                        if (loopCount > 2) {
                            jQuerymarqueeWrapper.css('margin-left', o.direction == 'left' ? 0 : '-' + elWidth + 'px');
                        }

                        animationCss = {
                            'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : 0
                        };

                    } else {
                        _rePositionHorizontally();
                        animationCss = {
                            'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : containerWidth + 'px'
                        };
                    }
                }

                //fire event
                jQuerythis.trigger('beforeStarting');

                //If css3 support is available than do it with css3, otherwise use jQuery as fallback
                if (css3AnimationIsSupported) {
                    //Add css3 animation to the element
                    jQuerymarqueeWrapper.css(animationString, animationCss3Str);
                    var keyframeCss = keyframeString + ' { 100%  ' + _objToString(animationCss) + '}',
                        jQuerystyles = jQuery('style');

                    //Now add the keyframe animation to the head
                    if (jQuerystyles.length !== 0) {
                        //Bug fixed for jQuery 1.3.x - Instead of using .last(), use following
                        jQuerystyles.filter(":last").append(keyframeCss);
                    } else {
                        jQuery('head').append('<style>' + keyframeCss + '</style>');
                    }

                    //Animation iteration event
                    _prefixedEvent(jQuerymarqueeWrapper[0], "AnimationIteration", function() {
                        jQuerythis.trigger('finished');
                    });
                    //Animation stopped
                    _prefixedEvent(jQuerymarqueeWrapper[0], "AnimationEnd", function() {
                        animate();
                        jQuerythis.trigger('finished');
                    });

                } else {
                    //Start animating
                    jQuerymarqueeWrapper.animate(animationCss, o.duration, o.easing, function() {
                        //fire event
                        jQuerythis.trigger('finished');
                        //animate again
                        if (o.pauseOnCycle) {
                            _startAnimationWithDelay();
                        } else {
                            animate();
                        }
                    });
                }
                //save the status
                jQuerythis.data('runningStatus', 'resumed');
            };

            //bind pause and resume events
            jQuerythis.bind('pause', methods.pause);
            jQuerythis.bind('resume', methods.resume);

            if (o.pauseOnHover) {
                jQuerythis.bind('mouseenter mouseleave', methods.toggle);
            }

            //If css3 animation is supported than call animate method at once
            if (css3AnimationIsSupported && o.allowCss3Support) {
                animate();
            } else {
                //Starts the recursive method
                _startAnimationWithDelay();
            }

        });
    }; //End of Plugin
    // Public: plugin defaults options
    jQuery.fn.marquee.defaults = {
        //If you wish to always animate using jQuery
        allowCss3Support: true,
        //works when allowCss3Support is set to true - for full list see http://www.w3.org/TR/2013/WD-css3-transitions-20131119/#transition-timing-function
        css3easing: 'linear',
        //requires jQuery easing plugin. Default is 'linear'
        easing: 'linear',
        //pause time before the next animation turn in milliseconds
        delayBeforeStart: 1000,
        //'left', 'right', 'up' or 'down'
        direction: 'left',
        //true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: false,
        //speed in milliseconds of the marquee in milliseconds
        duration: 5000,
        //gap in pixels between the tickers
        gap: 20,
        //on cycle pause the marquee
        pauseOnCycle: false,
        //on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
        pauseOnHover: false
    };
})(jQuery);
