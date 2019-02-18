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

export default createModule('modules.sample').config(SampleModule)
