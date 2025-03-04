import { WPS_Enum } from './util';

function onbuttonclick(
  idStr: 'dockLeft' | 'dockRight' | 'hideTaskPane' | 'addString' | 'getDocName' | 'openWeb',
): string | void {
  if (typeof window._Application.Enum !== 'object') {
    window._Application.Enum = WPS_Enum
  }
  switch (idStr) {
    case 'dockLeft': {
      const tsId = window._Application.PluginStorage.getItem('taskpane_id')
      if (tsId) {
        const tskpane = window._Application.GetTaskPane(tsId)
        tskpane.DockPosition = window._Application.Enum.msoCTPDockPositionLeft
      }
      break
    }
    case 'dockRight': {
      const tsId = window._Application.PluginStorage.getItem('taskpane_id')
      if (tsId) {
        const tskpane = window._Application.GetTaskPane(tsId)
        tskpane.DockPosition = window._Application.Enum.msoCTPDockPositionRight
      }
      break
    }
    case 'hideTaskPane': {
      const tsId = window._Application.PluginStorage.getItem('taskpane_id')
      if (tsId) {
        const tskpane = window._Application.GetTaskPane(tsId)
        tskpane.Visible = false
      }
      break
    }
    case 'addString': {
      const doc = window._Application.ActiveDocument as any;
      if (doc) {
        doc.Range(0, 0).Text = 'Hello, wps加载项!'
        const rgSel = window._Application.Selection.Range
        if (rgSel) rgSel.Select()
      }
      break
    }
    case 'getDocName': {
      const doc = window._Application.ActiveDocument
      if (!doc) {
        return '当前没有打开任何文档'
      }
      return doc.Name
    }
    case 'openWeb': {
      break
    }
  }
}

export default {
  onbuttonclick
} 