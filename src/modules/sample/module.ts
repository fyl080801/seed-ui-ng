'use strict'

import { createModule } from '../../app/application'

class SampleModule {
  static $inject = ['$routerProvider']
  constructor($routerProvider: seed.IRouterProvider) {
    $routerProvider
      .add({
        name: 'index',
        component: require('./components/index')
      })
      .add({
        name: 'home',
        component: require('./components/home')
      })
      .other('home')
  }
}

export default createModule('modules.sample').config(SampleModule)
