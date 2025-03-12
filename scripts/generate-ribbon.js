"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var config_1 = require("../src/wpsjs/config");
function generateXML(configs) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<customUI xmlns=\"http://schemas.microsoft.com/office/2006/01/customui\" onLoad=\"ribbon.OnAddinLoad\">\n  <ribbon startFromScratch=\"false\">\n    <tabs>\n      <tab id=\"wpsAddinTab\" label=\"wps\u63D2\u4EF6\">\n        <group id=\"btnDemoGroup\" label=\"group1\">\n          ".concat(configs.map(function (btn) { return "\n          <button\n            id=\"".concat(btn.id, "\"\n            ").concat(btn.label ? "label=\"".concat(btn.label, "\"") : '', "\n            ").concat(btn.getLabel ? "getLabel=\"".concat(btn.getLabel, "\"") : '', "\n            onAction=\"ribbon.onAction\" \n            ").concat(btn.getEnabled ? "getEnabled=\"ribbon.OnGetEnabled\"" : '', "\n            getImage=\"ribbon.GetImage\"\n            ").concat(btn.visible ? "getVisible=\"ribbon.OnGetVisible\"" : "visible=\"".concat(btn.visible, "\""), "\n            size=\"").concat(btn.size || 'large', "\"\n          />"); }).join('\n'), "\n        </group>\n      </tab>\n    </tabs>\n  </ribbon>\n</customUI>");
}
// 生成并写入文件
var xmlContent = generateXML(config_1.xmlNavbarButtonsArr);
var outputPath = path_1.default.join(process.cwd(), 'public', 'ribbon.xml');
fs_1.default.writeFileSync(outputPath, xmlContent);
console.log('✅ Ribbon.xml 生成成功！');
