### BaiduPCS-Go 百度网盘客户端WEB UI

这个是project只提供UI部分， 核心代码在  https://github.com/iikira/BaiduPCS-Go

### 截图
![image](docs/Capture.JPG)

### 前言
本人自用的UI， 只提供简单的链接


### Docker
```
docker build -t baidupcsui .
docker run -d -p 80:3000 -v /downloads:/download baidupcsui
```

### NPM
```
npm i
npm start
```

### 配置
#### 配置你的登录密码

修改index.js里面的
`const PASSWORD = 'YourPassword';`


### 登录
`login -bduss=YOURBUDSS`


### 核心代码更新
在这里下载 最新版本的`linux-amd64.zip`并解压到根目录

https://github.com/iikira/BaiduPCS-Go/releases

