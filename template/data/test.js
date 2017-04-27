import mock from 'mockjs'

/*
 虚拟ajax请求,匹配正则
 参考 http://mockjs.com/
 */
mock.mock(/\api\/associate/, {
  code: 200,
  'data|1-10': [
    /[a-z][A-Z][0-9]/
  ]
})
