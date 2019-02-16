'use strict'

import boot from '../boot'

class RouterProvider implements seed.IRouterProvider {
  constructor(
    private $stateProvider: ng.ui.IStateProvider,
    private $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {}
  add(options: any): seed.IRouterProvider {
    this.$stateProvider.state(options.name, {
      url: '/' + options.name,
      template: options.component
    })
    return this
  }
  other(name: string): seed.IRouterProvider {
    this.$urlRouterProvider.otherwise(name)
    return this
  }
  $get() {}
}

function provider(
  $stateProvider: ng.ui.IStateProvider,
  $urlRouterProvider: ng.ui.IUrlRouterProvider
): seed.IRouterProvider {
  return new RouterProvider($stateProvider, $urlRouterProvider)
}

provider.$inject = ['$stateProvider', '$urlRouterProvider']

boot.provider('$router', provider)
