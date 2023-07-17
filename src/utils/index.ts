export const RESTFUL_ERROR_CODE_MAP: ERROR_CODE = {
  400: "用户发出的请求有错误，服务器没有进行新建或修改数据的操作",
  401: "表示用户没有权限",
  403: "表示用户得到授权（与401错误相对），但是访问是被禁止的",
  404: "用户发出的请求针对的是不存在的记录",
  406: "用户请求的格式不可得",
  410: "用户请求的资源被永久删除",
  422: "当创建一个对象时，发生一个验证错误",
  500: "服务器发生错误"
};
import JSEncrypt from "jsencrypt";
// RSA 加密
export function RSAjsc(content: string) {
  const jsc = new JSEncrypt();
  // 加密key
  const pubKey =
    "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==";
  jsc.setPublicKey(pubKey);
  return jsc.encrypt(content);
}

// RSA 解密
export function RSAdsc(content: string) {
  const dsc = new JSEncrypt();
  const privateKey =
    "MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0vfvyTdGJkdbHkB8mp0f3FE0GYP3AYPaJF7jUd1M0XxFSE2ceK3k2kw20YvQ09NJKk+OMjWQl9WitG9pB6tSCQIDAQABAkA2SimBrWC2/wvauBuYqjCFwLvYiRYqZKThUS3MZlebXJiLB+Ue/gUifAAKIg1avttUZsHBHrop4qfJCwAI0+YRAiEA+W3NK/RaXtnRqmoUUkb59zsZUBLpvZgQPfj1MhyHDz0CIQDYhsAhPJ3mgS64NbUZmGWuuNKp5coY2GIj/zYDMJp6vQIgUueLFXv/eZ1ekgz2Oi67MNCk5jeTF2BurZqNLR3MSmUCIFT3Q6uHMtsB9Eha4u7hS31tj1UWE+D+ADzp59MGnoftAiBeHT7gDMuqeJHPL4b+kC+gzV4FGTfhR9q3tTbklZkD2A==";
  dsc.setPrivateKey(privateKey);
  return dsc.decrypt(content);
}

