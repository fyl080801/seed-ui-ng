# seed-ui-ng

基于 webpack 打包的 angular 框架

原 seed-ui-angular 基于 webpack 打包重写，使用`typescript`开发

## 基于组件的路由

原`angular`路由是不支持组件的，只能分着设置`template`和`controller`，现在把这个过程做成类似`vue`那种用组件形式定义，支持子路由

使用`webpack`的`text-loader`，在`controller`定义中导出`html`模板

```javascript
import mod from '../module'

class Controller {
  constructor(private $scope: any) { }
}

Controller.$inject = ['$scope']

mod.controller('sample/components/home', Controller)

// 这里导出模板
export = require('./home.html')
```

在路由初始化时候`require`引用组件

```javascript
$routerProvider
  .add({
    name: 'index',
    component: require('./components/index')
  })
  .add({
    name: 'home',
    component: require('./components/home'),
    children: [
      { name: 'part1', component: require('./components/parts/part1') },
      { name: 'part2', component: require('./components/parts/part2') }
    ]
  })
  .other('index')
```

## 模块入口定义和模块引用

每个模块在文件夹下定义一个`module.ts`文件，用于模块的初始化和导出模块定义

```typescript
'use strict'

import { createModule } from '../../app/application'

class SampleModule {
  static $inject = ['$routerProvider']

  constructor($routerProvider: seed.IRouterProvider) {
    $routerProvider
      .add({
        name: 'index',
        title: '首页',
        component: require('./components/index')
      })
      .add({
        name: 'home',
        component: require('./components/home'),
        children: [
          {
            name: 'part1',
            title: '标题1',
            component: require('./components/parts/part1')
          },
          {
            name: 'part2',
            component: require('./components/parts/part2')
          }
        ]
      })
      .other('index')
  }
}

// 使用 application 的 createModule 创建模块
export default createModule('modules.sample').config(SampleModule)
```

在模块中直接使用导出创建`angular`对象

```typescript
import mod from '../../module'

mod.controller('part2Controller', () => {})

export = require('./part2.html')
```

在模块目录下定义`require.ts`，统一模块下所有定义，在应用入口引用

```typescript
import './components/index'
import './components/home'
import './components/parts/part1'
import './components/parts/part2'
```

## 应用初始化

目录中 index.ts 文件定义

```typescript
'use strict'

import './app/polyfill'
// 引用模块 requires
import './modules/sample/requires'
import application from './app/application'

// 初始化
application().run()
```

## 集成`bootstrap`

自带`bootstrap`并对弹模态窗进行包装，使模态窗的加载也支持通过组件引用实现，在原有`bootstrap`模态窗样式基础上增加侧边滑出样式及动画效果

```typescript
// 引用组件
const SimpleModal = require('./modals/simpleModal')

class Controller {
  constructor(private $scope: any, private $modal: seed.IModalService) {
    $scope.vm = this
  }

  click1() {
    alert('clicked!!')
  }

  click2() {
    // 模态窗使用基于组件
    this.$modal
      .open({
        component: SimpleModal,
        windowClass: 'right',
        backdrop: 'static',
        size: 'lg'
      })
      .result.then(() => {})
  }

  click3() {
    this.$modal.open({
      component: SimpleModal,
      size: 'sm'
    })
  }
}

Controller.$inject = ['$scope', '$modal']
```

## 集成小功能

定义了一些常用的功能函数，具体看注释吧

`$delayTimer`: 查询时输入文字 throttle

`$router`: 基于组件的路由

`$popup`: 弹出消息和提示框

`$request`: 链式调用的 ajax 请求

`$tree`: 根据数组元素包含 parentId 将数组转化成树对象，转换完后每一个对象具有 parent、children、data 属性

## 其他

去掉了原来通过模块打包按需加载 js 功能，费那么大工夫实现还不如直接新打包一个模块作为单独页面分片加载，至于模块页面间共享数据及公共视图，将来直接从`node`端输出到 js 结果里

要是想实现`vue`那种模板和脚手架的话以后再说吧，我就一个人而且只有晚上有时间，那么多功能得一点点来呀
