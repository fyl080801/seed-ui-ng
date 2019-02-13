import { createModule } from '../../app/application'

class SampleModule {
  static $inject = ['$stateProvider', '$urlRouterProvider']
  constructor(
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $stateProvider.state('index', {
      url: '/index',
      template: '<div>aaa</div>'
      // templateUrl: '/modules/sample/views/index.html'
    })

    $urlRouterProvider.otherwise('/index')
  }
}

export default createModule('modules.sample').config(SampleModule)
