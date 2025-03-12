"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUrlPath = GetUrlPath;
exports.GetRouterHash = GetRouterHash;
exports.GetUrl = GetUrl;
function GetUrlPath() {
    // 在本地网页的情况下获取路径
    if (window.location.protocol === 'file:') {
        var path = window.location.href;
        // 删除文件名以获取根路径
        return path.substring(0, path.lastIndexOf('/'));
    }
    // 在非本地网页的情况下获取根路径
    var _a = window.location, protocol = _a.protocol, hostname = _a.hostname, port = _a.port;
    var portPart = port ? ":".concat(port) : '';
    return "".concat(protocol, "//").concat(hostname).concat(portPart);
}
function GetRouterHash() {
    if (window.location.protocol === 'file:') {
        return '';
    }
    return '/#';
}
function GetUrl() {
    return GetUrlPath() + GetRouterHash();
}
