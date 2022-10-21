// vee-validate 表单验证插件相关配置

import Vue from "vue";
import VeeValidate from "vee-validate";

// 中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";

Vue.use(VeeValidate);

VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field} 必须与登录密码相同`
  },
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password2: "确认密码",
    agree: "协议",
  }
});

// 自定义校验规则

VeeValidate.Validator.extend('agree', {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意"
})