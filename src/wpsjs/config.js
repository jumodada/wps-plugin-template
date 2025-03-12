"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlNavbarButtonsArr = exports.xmlNavbarButtons = void 0;
var utils_ts_1 = require("./utils.ts");
console.log(123);
exports.xmlNavbarButtons = {
    showMessage: {
        id: 'showMessage',
        label: '显示弹窗消息',
        image: 'images/1.svg',
        onAction: function () {
            var doc = window.Application.ActiveDocument;
            if (!doc) {
                alert('当前没有打开任何文档');
                return;
            }
            alert(doc.Name);
        }
    },
    showDialog: {
        id: 'showDialog',
        label: '显示对话框',
        image: 'images/2.svg',
        onAction: function () {
            window.Application.ShowDialog((0, utils_ts_1.GetUrl)() + '/dialog', '这是一个对话框网页', 400 * window.devicePixelRatio, 400 * window.devicePixelRatio, false);
        }
    },
    showTaskPane: {
        id: 'showTaskPane',
        label: '显示任务面板',
        image: 'images/3.svg',
        onAction: function () {
            var tsId = window._Application.PluginStorage.getItem('task_pane_id');
            if (!tsId) {
                var taskPane = window._Application.CreateTaskPane((0, utils_ts_1.GetUrl)() + '/task-pane');
                window._Application.PluginStorage.setItem('task_pane_id', taskPane.ID);
                taskPane.Visible = true;
            }
            else {
                var taskPane = window._Application.GetTaskPane(tsId);
                taskPane.Visible = !taskPane.Visible;
            }
        }
    },
    onNewDocumentEvent: {
        id: 'onNewDocumentEvent',
        label: '动态监听新建文件',
        image: 'images/newFormTemp.svg',
        onAction: function () {
            var bFlag = window._Application.PluginStorage.getItem('ApiEventFlag');
            var bRegister = !bFlag;
            window._Application.PluginStorage.setItem('ApiEventFlag', bRegister);
            if (bRegister) {
                window._Application.ApiEvent.AddApiEventListener('DocumentNew', 'ribbon.OnNewDocumentApiEvent');
            }
            else {
                window._Application.ApiEvent.RemoveApiEventListener('DocumentNew', 'ribbon.OnNewDocumentApiEvent');
            }
            window._Application.ribbonUI.InvalidateControl('btnApiEvent');
        }
    }
};
exports.xmlNavbarButtonsArr = Object.keys(exports.xmlNavbarButtons).map(function (key) { return exports.xmlNavbarButtons[key]; });
