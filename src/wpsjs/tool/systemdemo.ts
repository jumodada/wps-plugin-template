interface JsonParam {
  filepath?: string;
  Index?: string;
  [key: string]: any;
}

interface ResponseObject {
  [key: string]: any;
}

function openOfficeFileFromSystemDemo(param: string | JsonParam): ResponseObject {
  let jsonObj: JsonParam = typeof param === 'string' ? JSON.parse(param) : param;
  alert('从业务系统传过来的参数为：' + JSON.stringify(jsonObj));
  return { 'wps加载项项返回': jsonObj.filepath + ', 这个地址给的不正确' };
}

function InvokeFromSystemDemo(param: string | JsonParam): ResponseObject {
  let jsonObj: JsonParam = typeof param === 'string' ? JSON.parse(param) : param;
  let handleInfo: string = jsonObj.Index || '';
  
  switch (handleInfo) {
    case 'getDocumentName': {
      let docName: string = '';
      if (window.Application.ActiveDocument) {
        docName = window.Application.ActiveDocument.Name;
      }

      return { '当前打开的文件名为': docName };
    }

    case 'newDocument': {
      let newDocName: string = '';
      let doc = window.Application.Documents.Add();
      newDocName = doc.Name;

      return { '操作结果': '新建文档成功，文档名为：' + newDocName };
    }

    case 'OpenFile': {
      let filePath: string = jsonObj.filepath || '';
      window.Application.Documents.OpenFromUrl(filePath);
      return { '操作结果': '打开文件成功' };
    }
  }

  return { '其它xxx': '' };
}

export default {
  openOfficeFileFromSystemDemo,
  InvokeFromSystemDemo
} 