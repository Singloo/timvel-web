## 概要

基于 javascript 的开发者, 主要做`react native`, 可以使用`nodeJs`, `express`, `postgreSql`, `nginx`, `docker` 搭建一个完整的 app.(见 github)
<br/>喜欢`rxjs`.在项目中经常使用.喜欢`currying`

## 工作经历

> ### Edugora, Full stack developer 2018-06 - Present

> 2019-01 - Present

负责公司的新项目[Edugo ai](https://apps.apple.com/cn/app/id1460558223),这是一款中文学习的 app
<br/>
<br/>主要功能是

<br/>提供实时视频通话,后端将整个通话录制下来.
<br/>在通话结束后,对视频进行处理,提取音频,使用第三方服务将音频转换成文字.
<br/>然后从文字中提取有用信息,分割视频,对文字进行分词,添加翻译和拼音
<br/>最后生成可供复习的内容.在 app 中,我们利用这个内容生成不同的练习.

我一个人从零开始搭建了一个完整的 app,和后端系统.
<br/>
整个 app 的难点包括:

- 实时匹配视频通话
- 按分钟进行扣费
- 处理视频,生成复习内容的后端服务

关于这个项目的后端部分:

- 我们使用的录制 sdk 需要编译, 为避免每次重启 docker container 都重新编译, 创建了一个 docker image
- 有很多对音视频的操作,使用了较多的 ffmpeg
- 整个处理流程步骤较长,每一步都有可能失败,对于一些错误,我会使用`rxjs`的`retryWhen`进行重试

> 2018-10 - 2019-01

CTO 离职,我负责维护 app [Eduogra](https://itunes.apple.com/cn/app/id1253306402?mt=8)的所有代码

> 2018-06 - 2018-10

负责 app Edugora 的开发, 主要做前端部分, 有时也需要写 api 和修改数据库

> 2018-01 - 2018-06

在 Edugora 实习, 主要做 react native

## 技能

> ### 移动开发
>
> `React Native`
>
> ### Javascript 库
>
> `Rxjs`,`MobX`,`Redux`
>
> ### 网页开发
>
> `React`,`Typescript`
>
> ### 后端开发
>
> `nodeJs`, `postgreSql`, `docker`, `express`, `nginx`
>
> ### 其他技能
>
> `Regular Expression`, `Python`, `Flask`, `chai Js`, `mocha`...

## 教育

> 2014 - 2018

常熟理工学院 数学 本科

## 语言

#### 英语

口语流利, 书写一般

#### 汉语

母语

## 兴趣

`Javascript`, `deep learning`, `冥想`, `任天堂游戏` ...

## 我的项目

Timvel, 一个由我独立完成的全栈 app, 基本上用到了所有我会的技术.已经上架 app store 和 Google play

代码见[github](https://github.com/Singloo/timvel),下载见网站[timvel.com](https://timvel.com)

还有一个我早期开发的项目,不再维护, 可以见 app store 我的开发者页面


~~~有的人可能会觉得我懂得太多,什么都不精通. 我觉得这只能说明我花了更多的时间去学习, 还能说明什么?~~~