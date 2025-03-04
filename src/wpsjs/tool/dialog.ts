import {GetUrlPath} from './util'

function onbuttonclick(idStr: 'getDocName' | 'createTaskPane' | 'newDoc' | 'addString' | 'closeDoc' | 'openWeb'): string | void {
  switch (idStr) {
    case 'getDocName': {
      const doc = window._Application.ActiveDocument
      if (!doc) {
        return '当前没有打开任何文档'
      }
      return doc.Name
    }
    case 'createTaskPane': {
      const tsId = window._Application.PluginStorage.getItem('taskpane_id')
      if (!tsId) {
        const tskpane = window._Application.CreateTaskPane(GetUrlPath() + '/taskpane')
        const id = tskpane.ID
        window._Application.PluginStorage.setItem('taskpane_id', id)
        tskpane.Visible = true
      } else {
        const tskpane = window._Application.GetTaskPane(tsId)
        tskpane.Visible = true
      }
      break
    }
    case 'newDoc': {
      window._Application.Documents.Add()
      break
    }
    case 'addString': {
      const doc = window._Application.ActiveDocument
      if (doc) {
        doc.Range(0, 0).Text = 'Hello, wps加载项!'
        // 触发重绘
        const rgSel = window._Application.Selection.Range
        if (rgSel) rgSel.Select()
      }
      break
    }
    case 'closeDoc': {
      if (window._Application.Documents.Count < 2) {
        alert('当前只有一个文档，别关了。')
        break
      }
      const doc = window._Application.ActiveDocument
      if (doc) doc.Close()
      break
    }
    case 'openWeb': {
      break
    }
  }
}

export default {
  onbuttonclick
} 