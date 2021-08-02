let requireAll = require.context('@/components/mods', true, /config\.json$/)
//requireAll.keys()为文件名数组; requireAll(apiName)获取文件暴露的内容
const apiArr = requireAll.keys().map(apiName=> requireAll(apiName).default || requireAll(apiName))

export default apiArr;


/* 
//引入api文件夹下的api接口
let requireAll = require.context('@/components/mods', true, /config\.json$/)
//requireAll.keys()为文件名数组; requireAll(apiName)获取文件暴露的内容
const apiArr = requireAll.keys().map(apiName=> requireAll(apiName).default || requireAll(apiName))
//组合接口
let api = apiArr.reduce((prev,curr)=> Object.assign(prev,curr), {})

export default api
ruquireAllApi(apiName).default 获取的是Es6规范暴露的内容（如：export default）
ruquireAllApi(apiName) 获取的是CommonJs规范暴露的内容(如：module.exports)
*/