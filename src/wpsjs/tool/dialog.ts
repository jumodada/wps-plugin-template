import Util from './util'

function onbuttonclick(idStr: 'getDocName' | 'createTaskPane' | 'newDoc' | 'addString' | 'closeDoc' | 'openWeb', param?: any): string | void {
  switch (idStr) {
    case 'getDocName': {
      const doc = window.Application.ActiveDocument
      if (!doc) {
        return '当前没有打开任何文档'
      }
      return doc.Name
    }
    case 'createTaskPane': {
      const tsId = window.Application.PluginStorage.getItem('taskpane_id')
      if (!tsId) {
        const tskpane = window.Application.CreateTaskPane(Util.GetUrlPath() + '/taskpane')
        const id = tskpane.ID
        window.Application.PluginStorage.setItem('taskpane_id', id)
        tskpane.Visible = true
      } else {
        const tskpane = window.Application.GetTaskPane(tsId)
        tskpane.Visible = true
      }
      break
    }
    case 'newDoc': {
      window.Application.Documents.Add()
      break
    }
    case 'addString': {
      const doc = window.Application.ActiveDocument
      if (doc) {
        doc.Range(0, 0).Text = 'Hello, wps加载项!'
        // 触发重绘
        const rgSel = window.Application.Selection.Range
        if (rgSel) rgSel.Select()
      }
      break
    }
    case 'closeDoc': {
      if (window.Application.Documents.Count < 2) {
        alert('当前只有一个文档，别关了。')
        break
      }
      const doc = window.Application.ActiveDocument
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