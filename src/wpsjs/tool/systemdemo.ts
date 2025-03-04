interface JsonParam {
  [key: string]: never;
}

interface ResponseObject {
  [key: string]: string | null;
}

function openOfficeFileFromSystemDemo(param: string | JsonParam): ResponseObject {
  const jsonObj: JsonParam = typeof param === 'string' ? JSON.parse(param) : param;
  return { filepath: jsonObj.filepath + ', 这个地址给的不正确' };
}

function InvokeFromSystemDemo(param: string | JsonParam): ResponseObject {
  const jsonObj: JsonParam = typeof param === 'string' ? JSON.parse(param) : param;
  const handleInfo: string = jsonObj.Index || '';
  
  switch (handleInfo) {
    case 'getDocumentName': {
      let docName: string = '';
      if (window.Application.ActiveDocument) {
        docName = window._Application.ActiveDocument.Name;
      }

      return { docName };
    }

    case 'newDocument': {
      let newDocName: string = '';
      const doc = window._Application.Documents.Add();
      newDocName = doc.Name;

      return { '操作结果': '新建文档成功，文档名为：' + newDocName };
    }

    case 'OpenFile': {
      window._Application.Documents.Add()
      return { '操作结果': '打开文件成功' };
    }
  }

  return { };
}

export default {
  openOfficeFileFromSystemDemo,
  InvokeFromSystemDemo
} 