import { WPS_Enum } from './tool/util'
import * as Util from './tool/util'
import SystemDemo from './tool/systemdemo'


// 这个函数在整个wps加载项中是第一个执行的
function OnAddinLoad(ribbonUI: any): boolean {
  if (typeof window._Application.ribbonUI != 'object') {
    window._Application.ribbonUI = ribbonUI;
  }
  if (typeof window._Application.Enum != 'object') {
    // 如果没有内置枚举值
    window._Application.Enum = WPS_Enum;
  }

  // 这几个导出函数是给外部业务系统调用的
  window.openOfficeFileFromSystemDemo = SystemDemo.openOfficeFileFromSystemDemo;
  window.InvokeFromSystemDemo = SystemDemo.InvokeFromSystemDemo;

  window._Application.PluginStorage.setItem('EnableFlag', false); // 往PluginStorage中设置一个标记，用于控制两个按钮的置灰
  window._Application.PluginStorage.setItem('ApiEventFlag', false); // 往PluginStorage中设置一个标记，用于控制ApiEvent的按钮label
  return true;
}

let WebNotifycount = 0;
function OnAction(control: any): boolean {
  console.log('OnAction');
  const eleId = control.Id;
  alert(2)  
  switch (eleId) {
    case 'btnShowMsg':
      {
        const strXML = '<?xml version=""1.0""?><abc:books xmlns:abc=""urn:books"" '
            + 'xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" "'
            + 'xsi:schemaLocation=""urn:books books.xsd""><book>'
            + '<author>Matt Hink</author><title>Migration Paths of the Red '
            + 'Breasted Robin</title><genre>non-fiction</genre>'
            + '<price>29.95</price><pub_date>2006-05-01</pub_date>'
            + '<abstract>You see them in the spring outside your windows. '
            + 'You hear their lovely songs wafting in the warm spring air. '
            + 'Now follow their path as they migrate to warmer climes in the fall, '
            + 'and then back to your back yard in the spring.</abstract></book></abc:books>'
        window._Application.ActiveDocument.Paragraphs.Item(5)?.Range.InsertXML(strXML)
      }
      break;
    case 'btnIsEnbable': {
      const bFlag = window._Application.PluginStorage.getItem('EnableFlag');
      window._Application.setItem('EnableFlag', !bFlag);

      // 通知wps刷新以下几个按饰的状态
      window._Application.ribbonUI.InvalidateControl('btnIsEnbable');
      window._Application.ribbonUI.InvalidateControl('btnShowDialog');
      window._Application.ribbonUI.InvalidateControl('btnShowTaskPane');
      // window._Application.ribbonUI.Invalidate(); 这行代码打开则是刷新所有的按钮状态
      break;
    }
    case 'btnShowDialog': {
      window._Application.ShowDialog(
        Util.GetUrlPath() + Util.GetRouterHash() + '/dialog',
        '这是一个对话框网页',
        400 * window.devicePixelRatio,
        400 * window.devicePixelRatio,
        false
      );
      break;
    }
    case 'btnShowTaskPane':
      {
        const tsId = window._Application.PluginStorage.getItem('taskpane_id');
        if (!tsId) {
          const tspan = window._Application.CreateTaskPane(Util.GetUrlPath() + Util.GetRouterHash() + '/taskpane');
          const id = tspan.ID;
          window._Application.PluginStorage.setItem('taskpane_id', id);
          tspan.Visible = true;
        } else {
          const tspan = window._Application.GetTaskPane(tsId);
          tspan.Visible = !tspan.Visible;
        }
      }
      break;
    case 'btnApiEvent':
      {
        const bFlag = window._Application.PluginStorage.getItem('ApiEventFlag');
        const bRegister = !bFlag;
        window._Application.PluginStorage.setItem('ApiEventFlag', bRegister);
        if (bRegister) {
          window._Application.ApiEvent.AddApiEventListener('DocumentNew', 'ribbon.OnNewDocumentApiEvent');
        } else {
          window._Application.ApiEvent.RemoveApiEventListener('DocumentNew', 'ribbon.OnNewDocumentApiEvent');
        }

        window._Application.ribbonUI.InvalidateControl('btnApiEvent');
      }
      break;
    case 'btnWebNotify':
      {
        const currentTime = new Date();
        const timeStr =
          currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
        window._Application.OAAssist.WebNotify(
          '这行内容由wps加载项主动送达给业务系统，可以任意自定义, 比如时间值:' +
            timeStr +
            '，次数：' +
            ++WebNotifycount,
          true
        );
      }
      break;
    default:
      break;
  }
  return true;
}

function GetImage(control: any): string {
  const eleId = control.Id;
  switch (eleId) {
    case 'btnShowMsg':
      return 'images/1.svg';
    case 'btnShowDialog':
      return 'images/2.svg';
    case 'btnShowTaskPane':
      return 'images/3.svg';
    default:
  }
  return 'images/newFromTemp.svg';
}

function OnGetEnabled(control: any): boolean {
  const eleId = control.Id;
  switch (eleId) {
    case 'btnShowMsg':
      return true;
    case 'btnShowDialog': {
      const bFlag = window._Application.PluginStorage.getItem('EnableFlag');
      return !!bFlag;
    }
    case 'btnShowTaskPane': {
      const bFlag = window._Application.PluginStorage.getItem('EnableFlag');
      return !!bFlag;
    }
    default:
      break;
  }
  return true;
}

function OnGetVisible(control: any): boolean {
  const eleId = control.Id;
  console.log(eleId);
  return true;
}

function OnGetLabel(control: any): string {
  const eleId = control.Id;
  switch (eleId) {
    case 'btnIsEnbable': {
      const bFlag = window._Application.PluginStorage.getItem('EnableFlag');
      return bFlag ? '按钮Disable' : '按钮Enable';
    }
    case 'btnApiEvent': {
      const bFlag = window._Application.PluginStorage.getItem('ApiEventFlag');
      return bFlag ? '清除新建文件事件' : '注册新建文件事件';
    }
  }
  return '';
}

interface Document {
  Name: string;
}

function OnNewDocumentApiEvent(doc: Document): void {
  alert('新建文件事件响应，取文件名: ' + doc.Name);
}

// 这些函数是给wps客户端调用的
export default {
  OnAddinLoad,
  OnAction,
  GetImage,
  OnGetEnabled,
  OnGetVisible,
  OnGetLabel,
  OnNewDocumentApiEvent
}; 