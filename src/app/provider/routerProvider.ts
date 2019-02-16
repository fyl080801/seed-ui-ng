'use strict'

import boot from '../boot'

class RouterProvider implements seed.IRouterProvider {
  constructor(
    private $stateProvider: ng.ui.IStateProvider,
    private $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {}
  add(options: seed.RouteOptions): seed.IRouterProvider {
    let pathArray = options.name.split('.')
    this.$stateProvider.state(options.name, {
      url: '/' + pathArray[pathArray.length - 1],
      template: options.component
    })
    ;(options.children || []).forEach(route => {
      this.add(
        Object.assign(route, { name: [options.name, route.name].join('.') })
      )
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
