var pageInit = null;
var BXSubmitForm = null;
var BXInfo = null;

function errorFun(response, util) {
    if (response.status == 401) {
        util.notification.simple("重新连接中...");
        //适配安卓，苹果端的请求
        if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            refreshToken();
        } else {
            window.GMQuality.refreshToken();
        }
    } else {
        util.notification.simple("网络连接异常");
    }
}

//设置header里token
var setVueHttp = function (token) {
    for (var i = 0; i < Vue.http.interceptors.length; i++) {
        var funString = Vue.http.interceptors[i].toString();
        if (funString.indexOf("tokenVal") > -1) {
            Vue.http.interceptors.splice(i, Vue.http.interceptors.length - i);
            break;
        }
    }
    Vue.http.interceptors.push(function (request, next) {
        var tokenVal = "Basic " + token;
        request.headers.set('Authorization', tokenVal);
        next(function (response) {
        });
    });
};

function gm_refreshToken(newToken) {
    localStorage.setItem("token", newToken);
    setVueHttp(newToken);
    window.location.reload();
}

function gm_getToken(oldToken) {
    localStorage.setItem("token", oldToken);
    setVueHttp(oldToken);
    if (pageInit) {
        pageInit();
    }
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
var util = (function () {
    var baseUrl = 'http://mobile.goldmantis.com:7091/api/';
    var getParam = function (search) {
        search = search.replace(/#.+$/, '');
        var re = {};
        if (search == "" || typeof search == "undefined") {
            return {};
        } else {

            search = search.substr(1).split('&');
            for (var i = 0, len = search.length; i < len; i++) {
                var tmp = search[i].split('=');
                if (i == 0 && tmp.length == 1) { //?132141
                    return {
                        '__search__': tmp[0]
                    };
                }
                re[tmp.shift()] = tmp.join('=');
            }
            return re;
        }
    };
    var notification = (function () {
        function dialog(opt) {
            this._options = $.extend({
                mode: "msg",
                text: "网页提示",
                icon: {},
                useTap: false,
                isResize: true,
                hasBlankDiv: false
            }, opt || {}),
                this._init();
        };
        var html = ['<div class="c-float-popWrap msgMode hide">',
            '<div class="c-float-modePop">',
            '<i class="warnIcon fa"></i>',
            '<div class="warnMsg"></div>',
            '<div class="warnCon"></div>',
            '<div class="doBtn">',
            '<button class="cancel">取消</button>',
            '<button class="ok">确认</button>',
            "</div>",
            "</div>",
            "</div>"].join("");
        var $blankDiv = $(
            '<div style="bottom: 0;left: 0;overflow: hidden;position: fixed;right: 0;top: 0;z-index: 400;background-color: rgba(255,255,255,0.3);display:none;"></div>');
        var $ele = $(html);
        var $text = $ele.find(".warnMsg");
        var $content = $ele.find(".warnCon");
        var $icon = $ele.find(".warnIcon");
        var $okBtn = $ele.find(".doBtn .ok");
        var $cancelBtn = $ele.find(".doBtn .cancel");
        var isInit = false;
        var timeId;

        $.extend(dialog.prototype, {
            _init: function () {
                var self = this;
                var opt = self._options;
                var callback = opt.callback;
                var type = opt.useTap ? "tap" : "click";
                var className = $ele.attr("class").replace(/(msg|alert|confirm)Mode/i, opt.mode + "Mode");
                $ele.attr("class", className);
                if (opt.content) {
                    $content.show();
                    $ele.css("background", opt.background);
                } else {
                    $content.hide();
                }
                $text.html(opt.text);
                if (opt.content) {
                    $content.html(opt.content);
                }
                if (opt.icon.class) {
                    $icon.removeClass();
                    $icon.addClass("fa warnIcon " + opt.icon.class);
                    $icon.css({"color": opt.icon.color || "#FFAD02"});
                    $text.css({"padding-left": "60px"});
                    $cancelBtn.css({"right": "0"});
                    $icon.show();
                } else {
                    $text.css({"padding-left": "0"});
                    $cancelBtn.css({"right": "0"});
                    $icon.hide();
                }
                $okBtn.off(type).on(type, function (e) {
                    callback.call(self, e, true);
                });

                $cancelBtn.off(type).on(type, function (e) {
                    callback.call(self, e, false);
                });
                if (isInit == false) {
                    isInit = true;
                    $blankDiv.click(function () {
                        self.hide();
                    });
                    $("body").append($blankDiv);
                    $("body").append($ele);
                    if (opt.isResize) {
                        $(window).bind("resize", function () {
                            setTimeout(function () {
                                    self._pos();
                                },
                                500);
                        });
                    }
                }
            },
            _pos: function () {
                var doc = document;
                var docEle = doc.documentElement;
                var body = doc.body;
                var self = this;
                if (self.isHide() == false) {
                    $ele.css({
                        top: body.scrollTop + (docEle.clientHeight - $ele.height()) / 2,
                        left: body.scrollLeft + (docEle.clientWidth - $ele.width()) / 2
                    });
                }
            },
            isShow: function () {
                return $ele.hasClass("show");
            },
            isHide: function () {
                return $ele.hasClass("hide");
            },
            _cbShow: function () {
                var onShow = this._options.onShow;
                $ele.css("opacity", "1").addClass("show");
                if (onShow) {
                    onShow.call(this);
                }
            },
            show: function () {
                timeId && (clearTimeout(timeId), timeId = void 0);
                var self = this;
                if (this.isShow()) {
                    this._cbShow();
                } else {
                    $ele.css("opacity", "0").removeClass("hide");
                    var hasBlankDiv = this._options.hasBlankDiv;
                    if (hasBlankDiv) {
                        $blankDiv.show();
                    }
                    self._pos();
                    setTimeout(function () {
                        self._cbShow();
                    }, 300);
                    setTimeout(function () {
                        $ele.animate({
                            opacity: "1"
                        }, 300, "linear");
                    }, 1);
                }
            },
            _cbHide: function () {
                var onHide = this._options.onHide;
                $ele.css("opacity", "0").addClass("hide");
                if (onHide) {
                    onHide.call(this);
                }
            },
            hide: function () {
                var self = this;
                if (this.isHide()) {
                    this._cbHide();
                } else {
                    $ele.removeClass("show");
                    $ele.css("opacity", "1");
                    var hasBlankDiv = this._options.hasBlankDiv;
                    if (hasBlankDiv) {
                        $blankDiv.hide();
                    }
                    setTimeout(function () {
                        self._cbHide();
                    }, 300);
                    setTimeout(function () {
                        $ele.animate({
                            opacity: "0"
                        }, 300, "linear");
                    }, 1);
                }
            },
            flash: function (time) {
                var self = this;
                self._options.onShow = function () {
                    timeId = setTimeout(function () {
                        timeId && self.hide();
                    }, time);
                },
                    self.show();
            }
        });
        return {
            simple: function (text, icon, bground, time) {
                if (2 == arguments.length && "number" == typeof arguments[1]) {
                    time = arguments[1];
                    bground = void 0;
                }
                var obj = new dialog({
                    mode: "msg",
                    text: text,
                    icon: icon,
                    background: bground
                });
                obj.flash(time || 2000);
                setTimeout(function () {
                    $ele.removeClass("show");
                }, 4000);
                return obj;
            },
            msg: function (text, opt) {
                return new dialog($.extend({
                    mode: "msg",
                    text: text
                }, opt || {}));
            },
            alert: function (text, callback, icon, opt) {
                return new dialog($.extend({
                    mode: "alert",
                    text: text,
                    icon: icon,
                    callback: callback
                }, opt || {
                    hasBlankDiv: true
                }));
            },
            confirm: function (text, callback, content, icon, opt) {
                return new dialog($.extend({
                    mode: "confirm",
                    text: text,
                    content: content,
                    icon: icon,
                    callback: callback
                }, opt || {}));
            },
            pop: function (opt) {
                return new dialog(opt);
            }
        };
    })();
    (function ($) {
        var pluses = /\+/g;

        function encode(s) {
            return config.raw ? s : encodeURIComponent(s);
        }

        function decode(s) {
            return config.raw ? s : decodeURIComponent(s);
        }

        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value));
        }

        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                // This is a quoted cookie as according to RFC2068, unescape...
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
            try {
                // Replace server-side written pluses with spaces.
                // If we can't decode the cookie, ignore it, it's unusable.
                s = decodeURIComponent(s.replace(pluses, ' '));
            } catch (e) {
                return;
            }
            try {
                // If we can't parse the cookie, ignore it, it's unusable.
                return config.json ? JSON.parse(s) : s;
            } catch (e) {
            }
        }

        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        }

        var config = $.cookie = function (key, value, options) {
            if (value !== undefined && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);
                if (typeof options.expires === 'number') {
                    var days = options.expires / (60 * 24),
                        t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE

                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }
            var result = key ? undefined : {};
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decode(parts.shift());
                var cookie = parts.join('=');
                if (key && key === name) {
                    result = read(cookie, value);
                    break;
                }
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            return result;
        };
        config.defaults = {};
        $.removeCookie = function (key, options) {
            if ($.cookie(key) !== undefined) {
                $.cookie(key, '', $.extend({}, options, {
                    expires: -1
                }));
                return true;
            }
            return false;
        };
    })($);
    return {
        baseUrl: baseUrl,
        _param: getParam(window.location.search),
        notification: notification,
        gm_refreshToken: gm_refreshToken,
        gm_getToken: gm_getToken
    }
})();

