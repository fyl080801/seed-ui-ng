'use strict'

import { createModule } from '../../app/application'

class SampleModule {
  static $inject = ['$routerProvider', '$stateProvider', '$urlRouterProvider']
  constructor(
    $routerProvider: seed.IRouterProvider,
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $stateProvider.state('index', {
      url: '/index',
      template: '<div>aaa</div>'
    })

    $urlRouterProvider.otherwise('/index')

    $routerProvider
      .add('home', {
        path: '/home',
        component: 'home',
        module: 'sample'
      })
      .other('home')
  }
}

export default createModule('modules.sample').config(SampleModule)
