# seed-ui-ng
基于webpack打包的angular框架

原 seed-ui-angular 基于 webpack 打包重写，使用`typescript`开发

## 基于组件的路由

原`angular`是不支持组件的，只能分着设置`template`和`controller`，现在把这个过程做成类似`vue`那种用组件形式定义，支持子路由

使用`webpack`的`text-loader`，在`controller`定义时导出`html`模板

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

## 集成`bootstrap`

自带`bootstrap`并对弹模态窗进行包装，使模态窗的加载也支持通过组件引用实现，在原有`bootstrap`模态窗样式基础上增加侧边滑出样式及动画效果

```typescript
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
        component: tmp,
        windowClass: 'right',
        backdrop: 'static',
        size: 'lg'
      })
      .result.then(() => {})
  }

  click3() {
    this.$modal.open({
      component: tmp,
      size: 'sm'
    })
  }
}

Controller.$inject = ['$scope', '$modal']
```

## 其他

去掉了原来通过模块打包按需加载js功能，费那么大工夫实现还不如直接新打包一个模块作为单独页面分片加载，至于模块页面间共享数据及公共视图，将来直接从`node`端输出到js结果里
