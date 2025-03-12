

export function OnAction(control: any): boolean {
    console.log('OnAction');
    const eleId = control.Id;
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
                const tspan = window._Application.CreateTaskPane('/taskpane');
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
                true
            );
        }
            break;
        default:
            break;
    }
    return true;
}
