;(function($) {
    $.fn.validate = function(options) {
        var defaults = {
            not_null : false,
            min_length : false,
            max_length : false,
            reg_exp : false,
            equal : false
        };
        var email_reg_exp = new RegExp("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
        var ip_reg_exp = new RegExp("((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)");
        var number_reg_exp = new RegExp("^-?\\d+$");
        var http_reg_exp = new RegExp("[a-zA-z]+:\\/\\/[^\\s]*");
        var domain_reg_exp = new RegExp("^([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?)$");
        var form_validate = true;
        var form = $(this);
        $.each(options, function(i, n) {
            n = $.extend({}, defaults, n);
            if (n.type == "text" || n.type == "select") {
                var is_validate = true;
                var obj = $(form).find("[name='" + n.name + "']");
                var message = "";
                var value = $.trim(obj.val());
                if (n.not_null && value.length == 0) {
                    is_validate = false;
                    message += " 不能为空";
                }
                if (!!n.min_length && value.length < n.min_length) {
                    if (!n.not_null && value.length == 0) {
                    } else {
                        is_validate = false;
                        message += " 长度最小为" + n.min_length;
                    }
                }
                if (!!n.max_length && value.length > n.max_length) {
                    if (!n.not_null && value.length == 0) {
                    } else {
                        is_validate = false;
                        message += " 长度最大为" + n.max_length;
                    }
                }
                if (!!n.reg_exp && n.reg_exp == "email" && !email_reg_exp.test(value)) {
                    if (!n.not_null && value.length == 0) {
                    } else {
                        is_validate = false;
                        message += " 必须是邮件地址";
                    }
                }
                if (!!n.reg_exp && n.reg_exp == "ip" && !ip_reg_exp.test(value)) {
                    if (!n.not_null && value.length == 0) {
                    } else {
                        is_validate = false;
                        message += " 必须是IP地址";
                    }
                }
                if (!!n.reg_exp && n.reg_exp == "number" && !number_reg_exp.test(value)) {
                    if (!n.not_null && value.length == 0) {
                    } else {
                        is_validate = false;
                        message += " 必须是数字";
                    }
                }
                if (!!n.reg_exp && n.reg_exp == "http" && !http_reg_exp.test(value)) {
                    if (!n.not_null && value.length == 0) {
                    } else {
                        is_validate = false;
                        message += " 必须是完整URI地址";
                    }
                }
                if (!!n.reg_exp && n.reg_exp == "domain" && !domain_reg_exp.test(value)) {
                    if (!n.not_null && value.length == 0) {
                    } else {
                        is_validate = false;
                        message += " 必须是完整域名地址";
                    }
                }
                if (!!n.equal && value != $(form).find("[name='" + n.equal + "']").val()) {
                    is_validate = false;
                    message += " 两次输入不同";
                }
                if (!is_validate) {
                    obj.parent().removeClass("has-success").addClass("has-error");
                    obj.popover('destroy');
                    obj.popover({
                        content : message,
                        delay : {
                            show : 200,
                            hide : 100
                        }
                    });
                    obj.popover('show');
                    form_validate = false;
                } else {
                    obj.parent().removeClass("has-error").addClass("has-success");
                    obj.popover('destroy');
                }
            } else if (n.type == "radio" || n.type == "checkbox") {
                var obj = $(form).find("[name='" + n.name + "']:checked");
                if (obj.length == 0) {
                    obj = $(form).find("[name='" + n.name + "']:first");
                    obj.parent().popover('destroy');
                    obj.parent().popover({
                        content : "至少选择一项",
                        delay : {
                            show : 200,
                            hide : 100
                        }
                    });
                    obj.parent().popover('show');
                    form_validate = false;
                } else {
                    obj = $(form).find("[name='" + n.name + "']:first");
                    obj.parent().popover('destroy');
                }
            }
        });
        return form_validate;
    }
}(jQuery));
$(function() {

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    }

    // $(".side-menu > div.list-group >
    // div.list-group-item").slideToggle("fast");

    $(".side-menu").children(".list-group").children("a.list-group-item").click(function() {
        $(this).next("div.list-group-item").toggleClass("hide");
        $(this).toggleClass("group-active");
    });
    
    $("p.navbar-text > i.fa-outdent").click(function() {
        $("#side").toggle("fast");
        $("#main").toggleClass("col-sm-10");
        $("#main").toggleClass("col-sm-12");
    });

    $("#search_btn").click(function() {
        $(".search-body").slideToggle("fast");
    });

    $(".tree span.nodename").addClass("mouse-on").click(function() {
        $(".tree li>span").removeClass("active");
        $(this).parent().addClass("active");
        $(this).closest(".input-group").find("input[type!='hidden']").val($(this).html());
        $(this).closest(".input-group").find("input[type='hidden']").val($(this).attr("node_id"));
        $(this).closest(".tree-flow").toggleClass("hide");
    });

    $(".tree-flow").parent().find('.fa-caret-down').parent().click(function() {
        var down = $(this);
        $(this).next(".tree-flow").toggleClass("hide");
        $(window).click(function(e) {
            if ($(e.target).parents(".tree-flow").length == 0 && down.html() != $(e.target).html() && down.html() != $(e.target).parent().html()) {
                $(".tree-flow").addClass("hide");
                $(window).click(function() {
                    return;
                });
            }
        });
    });

});

;(function($){
    $.fn.mask = function(label, delay){
        $(this).each(function() {
            if(delay !== undefined && delay > 0) {
                var element = $(this);
                element.data("_mask_timeout", setTimeout(function() { $.maskElement(element, label)}, delay));
            } else {
                $.maskElement($(this), label);
            }
        });
    };
    
    /**
     * Removes mask from the element(s). Accepts both single and multiple selectors.
     */
    $.fn.unmask = function(){
        $(this).each(function() {
            $.unmaskElement($(this));
        });
    };
    
    /**
     * Checks if a single element is masked. Returns false if mask is delayed or not displayed. 
     */
    $.fn.isMasked = function(){
        return this.hasClass("masked");
    };

    $.maskElement = function(element, label){
    
        //if this element has delayed mask scheduled then remove it and display the new one
        if (element.data("_mask_timeout") !== undefined) {
            clearTimeout(element.data("_mask_timeout"));
            element.removeData("_mask_timeout");
        }

        if(element.isMasked()) {
            $.unmaskElement(element);
        }
        
        if(element.css("position") == "static") {
            element.addClass("masked-relative");
        }
        
        element.addClass("masked");
        
        var maskDiv = $('<div class="loadmask"></div>');
        
        //auto height fix for IE
        if(navigator.userAgent.toLowerCase().indexOf("msie") > -1){
            maskDiv.height(element.height() + parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom")));
            maskDiv.width(element.width() + parseInt(element.css("padding-left")) + parseInt(element.css("padding-right")));
        }
        
        //fix for z-index bug with selects in IE6
        if(navigator.userAgent.toLowerCase().indexOf("msie 6") > -1){
            element.find("select").addClass("masked-hidden");
        }
        
        element.append(maskDiv);
        
        if(label !== undefined) {
            var maskMsgDiv = $('<div class="loadmask-msg" style="display:none;"></div>');
            maskMsgDiv.append('<div>' + label + '</div>');
            element.append(maskMsgDiv);
            
            //calculate center position
            maskMsgDiv.css("top", Math.round(element.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2)+"px");
            maskMsgDiv.css("left", Math.round(element.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2)+"px");
            
            maskMsgDiv.show();
        }
        
    };
    
    $.unmaskElement = function(element){
        //if this element has delayed mask scheduled then remove it
        if (element.data("_mask_timeout") !== undefined) {
            clearTimeout(element.data("_mask_timeout"));
            element.removeData("_mask_timeout");
        }
        
        element.find(".loadmask-msg,.loadmask").remove();
        element.removeClass("masked");
        element.removeClass("masked-relative");
        element.find("select").removeClass("masked-hidden");
    };
 
})(jQuery);
