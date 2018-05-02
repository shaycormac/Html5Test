!function (e) {
    var t = {};

    function r(a) {
        if (t[a]) return t[a].exports;
        var o = t[a] = {i: a, l: !1, exports: {}};
        return e[a].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }

    r.m = e, r.c = t, r.d = function (e, t, a) {
        r.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: a})
    }, r.r = function (e) {
        Object.defineProperty(e, "__esModule", {value: !0})
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "../", r(r.s = 1)
}({
    1: function (e, t, r) {
        "use strict";
        r(19), r(14);
        var a = null;
        pageInit = function () {
            a = new Vue({
                el: "#gmIT",
                data: {
                    pType: [],
                    sType: [],
                    allType: [],
                    floor_dsl: ["-1楼", "1楼", "2楼", "3楼", "5楼", "6楼", "7楼", "8楼", "9楼", "10楼", "11楼", "12楼", "15楼", "16楼", "17楼", "18楼", "19楼", "20楼", "21楼", "22楼", "23楼", "25楼", "C1楼", "C2楼", "C3楼", "C4楼", "C5楼", "D1楼", "D2楼", "D3楼", "D4楼", "董事楼1楼", "董事楼2楼", "董事楼3楼"],
                    floor_yq: ["-1楼", "1楼", "2楼南", "2楼北", "3楼南", "3楼北", "5楼南", "5楼北", "6楼", "7楼", "8楼", "9楼", "10楼", "11楼", "12楼", "15楼", "16楼", "17楼", "18楼", "19楼", "20楼", "21楼", "22楼", "23楼", "25楼", "26楼", "27楼", "28楼"]
                },
                created: function () {
                },
                mounted: function () {
                    this.init()
                },
                filters: {},
                computed: {},
                methods: {
                    init: function () {
                        this.initDate(), this.getTypes(), (navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1) && $(".android-to-info").show();
                        var e = localStorage.getItem("workArea"), t = localStorage.getItem("floor");
                        e && t && (e.indexOf("总部") > -1 ? ($(".dz .inner[type='0']").addClass("is-checked"), $(".dz .inner[type='0'] p").attr("floor", t), $(".dz .inner[type='0'] p").html("总部-" + t)) : ($(".dz .inner[type='1']").addClass("is-checked"), $(".dz .inner[type='1'] p").attr("floor", t), $(".dz .inner[type='1'] p").html("园区-" + t)))
                    }, getTypes: function () {
                        this.$http.get(util.baseUrl + "CallAPI/userCallInit", {}).then(function (e) {
                            var t = e.data;
                            if (0 == t.status) {
                                for (var r = t.data.types, a = [], o = 0; o < r.length; o++) 0 == r[o].parent_id && a.push(r[o]);
                                this.pType = a, this.allType = r, this.getSonType(r, a[0].type_id)
                            } else util.notification.simple(t.msg)
                        }).catch(function (e) {
                            errorFun(e, util)
                        })
                    }, getSonType: function (e, t) {
                        $(".card-ul.wt .is-checked").removeClass("is-checked");
                        for (var r = [], a = 0; a < e.length; a++) e[a].parent_id == t && r.push(e[a]);
                        this.sType = r
                    }, initDate: function () {
                        var e = new Date, t = e.getFullYear(), r = {
                            preset: "datetime",
                            theme: "android-ics light",
                            display: "bottom",
                            mode: "scroller",
                            dateFormat: "yyyy-mm-dd",
                            setText: "确定",
                            cancelText: "取消",
                            dateOrder: "yymmdd",
                            dayText: "日",
                            monthText: "月",
                            yearText: "年",
                            hourText: "时",
                            minuteText: "分",
                            secText: "秒",
                            startYear: t,
                            endYear: t + 1,
                            timeWheels: "HHii",
                            timeFormat: "HH:ii",
                            minDate: e,
                            stepMinute: 15,
                            onSelect: function (e, t) {
                                if (e) {
                                    var r = e.split(" ")[0].split("-")[0],
                                        a = e.split(" ")[0].split("-")[1],
                                        o = e.split(" ")[0].split("-")[2],
                                        n = e.split(" ")[1].split(":")[0],
                                        i = e.split(" ")[1].split(":")[1], l = new Date;
                                    l.setFullYear(r), l.setMonth(parseInt(a) - 1), l.setDate(o), l.setHours(n), l.setMinutes(i);
                                    var s = l.getDay();
                                    if (n < 9 || n > 17 || 0 == s || 6 == s) {
                                        var c = util.notification.confirm("您选择的时间是非工作时间，请重新选择预约时间（周一到周五 9:00-17:45）", function (e, t) {
                                            c.hide()
                                        });
                                        c.show(), $("#yyTime").val(""), $("input[name='yyjj']").prop("checked", !1), $(".yysj").hide()
                                    }
                                }
                            }
                        };
                        $("#yyTime").mobiscroll(r)
                    }, blurTextArea: function () {
                        $("textarea[name='desc']").blur(), $(".detail-ul").css({"padding-bottom": "0px"})
                    }, taFocus: function () {
                        $("textarea[name='desc']").focus(), $(".detail-ul").css({"padding-bottom": "100px"}), $("#mWrapper").scrollTop($("#mWrapper")[0].scrollHeight)
                    }, checkBx: function (e) {
                        var t = $(e.currentTarget);
                        this.getSonType(this.allType, t.attr("typeId")), $(".card-ul.bx .is-checked").removeClass("is-checked"), t.addClass("is-checked"), "2" == t.attr("typeId") ? $(".dzfloor").hide() : $(".dzfloor").show(), $("textarea[name='desc']").val("")
                    }, checkWt: function (e) {
                        var t = $(e.currentTarget);
                        t.hasClass("is-checked") ? (t.removeClass("is-checked"), $("textarea[name='desc']").val("")) : ($(".card-ul.wt .is-checked").removeClass("is-checked"), t.addClass("is-checked"), $("textarea[name='desc']").val(t.find("p").html()))
                    }, checkDz: function (e) {
                        var t = $(e.currentTarget);
                        $(".card-ul.dz .is-checked").removeClass("is-checked"), t.hasClass("is-checked") || t.addClass("is-checked")
                    }, showFloor: function (e) {
                        var t = $(e.currentTarget);
                        $(".card-ul.dz .is-checked").removeClass("is-checked"), t.hasClass("is-checked") || t.addClass("is-checked"), "0" == t.attr("type") ? $(".f-con.dsl").addClass("show") : $(".f-con.yq").addClass("show")
                    }, chooseFloor: function (e) {
                        var t = $(e.currentTarget);
                        $(".f-con").removeClass("show"), "dsl" == t.attr("type") ? ($("#dslFloor").html("总部-" + t.html()), $("#dslFloor").attr("floor", t.html()), $("#yqFloor").html("园区"), $("#yqFloor").attr("floor", "")) : ($("#yqFloor").html("园区-" + t.html()), $("#yqFloor").attr("floor", t.html()), $("#dslFloor").html("总部"), $("#dslFloor").attr("floor", ""))
                    }, hideFloor: function (e) {
                        var t = $(e.currentTarget).attr("type");
                        $(".f-con").removeClass("show"), "dsl" == t ? $("#dslFloor").attr("floor") || $(".card-ul.dz div[type='0']").removeClass("is-checked") : "yq" == t && ($("#yqFloor").attr("floor") || $(".card-ul.dz div[type='1']").removeClass("is-checked"))
                    }, changeSfjj: function (e) {
                        var t = $(e.currentTarget).find("input");
                        t.prop("checked") ? t.prop("checked", !1) : t.prop("checked", !0)
                    }, changeYyzt: function (e) {
                        var t = $(e.currentTarget).find("input");
                        t.prop("checked") ? (t.prop("checked", !1), $(".yysj").hide()) : (t.prop("checked", !0), $(".yysj").show()), $("#mWrapper").scrollTop($("#mWrapper")[0].scrollHeight)
                    }, AndroidToInfo: function () {
                        BXInfo()
                    }
                }
            })
        };
        var o = function () {
            navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? closePage("IT_Repairs_add_Fail") : (navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1) && window.GMQuality.closePage("IT_Repairs_add_Fail")
        };
        BXInfo = function () {
            GMQuality.startNewPage("http://mobile.goldmantis.com:9086/ITBX/dist/html/info.html", "IT报修申请", 1)
        }, BXSubmitForm = function () {
            var e = (new Date).format("yyyy-MM-dd hh:mm:ss"), t = {
                Call_Code: null,
                Call_Id: 0,
                Cancel_Date: null,
                Cancel_Remark: null,
                Cancel_User_Id: null,
                Check_Status: 0,
                Create_Date: e,
                Create_User_Id: 0,
                Handler_Id: null,
                Is_After: 0,
                Is_Del: 0,
                Is_Post: 0,
                Last_Update_Date: e,
                Last_Update_User: 0,
                Order_Date: null,
                Post_Date: null,
                Qty: 0,
                Source_Id: 0,
                User_Id: 0,
                User_Tel: null,
                Work_Area_Id: null,
                Work_Area_Name: null
            };
            $(".wt .is-checked").length > 0 ? t.Type_Id = $(".wt .is-checked").attr("typeId") : t.Type_Id = $(".bx .is-checked").attr("typeId");
            var r = $("textarea[name='desc']").val().trim();
            if ("" == r) return util.notification.simple("请填写问题描述"), o(), !1;
            if (t.Question_Desc = r, $(".dz .is-checked").length <= 0) {
                if ("2" != $(".bx .is-checked").attr("typeId")) return util.notification.simple("请选择您的位置"), o(), !1;
                t.Work_Area_Name = "", t.Work_Area_Id = 0, t.Floor = ""
            } else "2" == $(".bx .is-checked").attr("typeId") ? (t.Work_Area_Name = "", t.Work_Area_Id = 0, t.Floor = "") : "0" == $(".dz .is-checked").attr("type") ? (t.Work_Area_Name = "企业管理总部", t.Work_Area_Id = 0, t.Floor = $("#dslFloor").attr("floor")) : (t.Work_Area_Name = "园区运营中心", t.Work_Area_Id = 1, t.Floor = $("#yqFloor").attr("floor"));
            if (t.Is_Urgent = $("input[name='sfjj']").prop("checked") ? 1 : 0, t.Is_Order = $("input[name='yyjj']").prop("checked") ? 1 : 0, $("input[name='yyjj']").prop("checked")) {
                var n = $("input[name='yyTime']").val();
                if ("" == n) return util.notification.simple("请选择预约时间"), o(), !1;
                t.Order_Date = n + ":00"
            }
            a.$http.post(util.baseUrl + "CallAPI/SaveUserCall", t).then(function (e) {
                var r = e.data;
                0 == r.status ? (util.notification.simple("提交成功"), t.Work_Area_Name && t.Floor && (localStorage.setItem("workArea", t.Work_Area_Name), localStorage.setItem("floor", t.Floor)), setTimeout(function () {
                    navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? closePage("IT_Repairs_add_close") : (navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1) && window.GMQuality.closePage("IT_Repairs_add_close")
                }, 2e3)) : (util.notification.simple(r.msg), o())
            }).catch(function (e) {
                o(), errorFun(e, util)
            })
        }, navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? getToken() : navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1 ? (GMQuality.setToolBarMenuImage("IT报修申请", "", "BXSubmitForm()"), util.gm_getToken(window.GMQuality.getToken())) : (localStorage.setItem("token", util._param.accessToken), util.gm_getToken(localStorage.getItem("token")))
    }, 14: function (e, t) {
    }, 19: function (e, t) {
    }
});
