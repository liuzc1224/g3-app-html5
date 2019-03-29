# 环境相关
- [x] Java版本 : 1.8.0_71
- [x] angular-cli版本 : 6.0.8
- [x] node版本 : 10.5.0
- [x] ionic-cli : 4.0.6
- [x] cordova : 8.0.0
- [x] gradle : 4.1
- [x] android sdk : 26 24.0.2

# 项目目录
- src // 开发源码

	- app // 启动页

	- assets // 静态资源目录

	- pipe  // 过滤器
		- Abs 绝对值
		- dataFormat ： 日期格式化
		- moneyFormat : 金额格式化
		- orderStatus : 订单状态
		- percent : 百分比转换

	- servive // 服务层

		- common  // 公用服务（ 存储 ， 加载框 , 提示 ，相机（图片相关） ）
			- img : 图片
				- 拍照 : takeCam( quality : 图片质量 , sacle ： 是否允许裁剪) : Base64
				- 从相机选取 : takeAlbum( quality : 图片质量 , sacle ： 是否允许裁剪) : Base64
				- base64转Blob : base64ToImg( base64Data : base64编码)

			- loading : 加载 @para : tip -> 提示的内容 该参数可选, 默认为 操作中 ;
				- 处理中的toast  : deal( tip : string )
				- 处理风控相关中的toast  : deal( tip : string )

			- storage : 存储
				- localStorage : 操作localStorage
					- 存储 : set( key : string , value : any) ： this
					- 获取 : get(key : string) : this
					- 清空 : clear() : void
					- 删除指定的key : remove( Array< string > ) : this
				- sessionStorage : 同localStorage

			- tips : 提示 @para : msg -> 需要提示的信息
				- 操作成功 : operateSuccess( msg : string ) : void
				- 操作失败 : operateFail( msg : string ) : void
				- 操作警告 : operateWarn( msg : string ) : void
				- 获取数据失败 ： fetchFail( msg :string ) : void
				- 信息必填 : require() : void
				- 信息不能相同: notSame() : void
				- 手机号必填 : phoneRequire() : void
				- 功能未开放 : notOpen() : void
				- 过期 : outOfDate() : void
				- 需要权 : requestPermission() : void

		- device // 设备信息相关服务

		- loan // 借款相关服务

		- msg // 消息中心相关服务

		- order // 订单相关服务

		- risk // 风控相关服务

		- system // 系统相关服务（提交意见等）

		- user // 用户服务

		- global_api.ts // 存放请求地址

		- index.ts // 服务入口文件

		- objToQuery // 对象转get请求参数

		- objToQueryString // 对象转query string

	- share
		- share.module // 其他模块容器( 存放service )

		- intercept.service // 请求拦截器

		- model // 存放数据类型接口

		- theme // ionic主题

	- tools // 工具
		- date // 时间处理工具

		- orderStatus // 订单状态

		- string // 字符串相关处理

	- Validator // 公用表单校验器
		- regGroup // 存放正则
		- common.validator
			- isCpfValid // 检测cpf是否合法
			- isMail // 检测邮箱是否合法
			- passValid // 检测密码格式
			- isIdValid // 检测RGid合法
			- isNumber // 检测是否为数字

- plugins // 用到的cordova插件
- platform // 所构建的平台
- config.xml // 构建平台的配置文件
- resources // 安卓资源

# 注意事项
## 1 在执行ionic cordova platform add android 或者 ionic cordova build 之后,出现错误为
>:transformClassesWithDexForDebug
>FAILURE: Build failed with an exception.
可以参考[此文](https://github.com/GetuiLaboratory/cordova-plugin-getuisdk/issues/51)

## 2 将来如果要使用filer-opener插件出现错误可参考[此文](https://github.com/pwlin/cordova-plugin-file-opener2/issues/218)

## 3 秘钥文件在secret
### eLoan秘钥密码 : cashloan1908
### MyLoan秘钥密码 : mLoan1908
### falshLoan秘钥密码 : flashloan1908
### SimpleLoan秘钥密码 : SimpleLoan1908
### WOWLoan秘钥密码 : WOWLoan1908

## 4 个推（ 账号 / 密码 ）panshihujin2pms / panshi888!