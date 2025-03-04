// 定义WPS枚举类型接口
interface WPSEnum {
  msoCTPDockPositionLeft: number;
  msoCTPDockPositionRight: number;
}

// 在后续的wps版本中，wps的所有枚举值都会通过wps.Enum对象来自动支持，现阶段先人工定义
const WPS_Enum: WPSEnum = {
  msoCTPDockPositionLeft: 0,
  msoCTPDockPositionRight: 2
}

function GetUrlPath(): string {
  // 在本地网页的情况下获取路径
  if (window.location.protocol === 'file:') {
    const path = window.location.href;
    return path.substring(0, path.lastIndexOf('/'));
  }

  const { protocol, hostname, port } = window.location;
  const portPart = port ? `:${port}` : '';
  return `${protocol}//${hostname}${portPart}`;
}

function GetRouterHash(): string {
  if (window.location.protocol === 'file:') {
    return '';
  }

  return '/#'
}

export {
  WPS_Enum,
  GetUrlPath,
  GetRouterHash
}
export type { WPSEnum }; 