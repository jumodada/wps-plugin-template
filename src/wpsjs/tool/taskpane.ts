import { WPS_Enum } from './util';

function onbuttonclick(
  idStr: 'dockLeft' | 'dockRight' | 'hideTaskPane' | 'addString' | 'getDocName' | 'openWeb',
): string | void {
  if (typeof window.Application.Enum !== 'object') {
    window.Application.Enum = WPS_Enum
  }
  switch (idStr) {
    case 'dockLeft': {
      const tsId = window.Application.PluginStorage.getItem('taskpane_id')
      if (tsId) {
        const tskpane = window.Application.GetTaskPane(tsId)
        tskpane.DockPosition = window.Application.Enum.msoCTPDockPositionLeft
      }
      break
    }
    case 'dockRight': {
      const tsId = window.Application.PluginStorage.getItem('taskpane_id')
      if (tsId) {
        const tskpane = window.Application.GetTaskPane(tsId)
        tskpane.DockPosition = window.Application.Enum.msoCTPDockPositionRight
      }
      break
    }
    case 'hideTaskPane': {
      const tsId = window.Application.PluginStorage.getItem('taskpane_id')
      if (tsId) {
        const tskpane = window.Application.GetTaskPane(tsId)
        tskpane.Visible = false
      }
      break
    }
    case 'addString': {
      const doc = window.Application.ActiveDocument as any;
      if (doc) {
        doc.Range(0, 0).Text = 'Hello, wps加载项!'
        const rgSel = window.Application.Selection.Range
        if (rgSel) rgSel.Select()
      }
      break
    }
    case 'getDocName': {
      const doc = window.Application.ActiveDocument
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