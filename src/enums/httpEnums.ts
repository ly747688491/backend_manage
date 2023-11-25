/**
 * @description: 响应结果
 * @argument SUCCESS  请求成功
 * @argument EXPIRE   token请求失效或校验失败
 * @argument OVERDUE  token超时过期
 * @argument ERROR    请求错误
 * @argument TIMEOUT  请求超时
 * @argument TYPE     请求类型
 */
export enum ResultEnum {
  SUCCESS = 200,
  EXPIRE = 403,
  OVERDUE = 401,
  ERROR = 201,
  ERRMESSAGE = '请求失败',
  TIMEOUT = 25000,
  TYPE = 'success'
}
