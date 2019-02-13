import boot from '../boot'

class Run {
  constructor(
    $rootScope: any,
    $state: ng.ui.IStateService,
    $stateParams: ng.ui.IStateParamsService
  ) {
    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams
    $rootScope.$on(
      '$stateChangeStart',
      (
        event: any,
        toState: any,
        toParams: any,
        fromState: any,
        fromParams: any
      ) => {}
    )
    $rootScope.$on(
      '$stateChangeSuccess',
      (
        event: any,
        toState: any,
        toParams: any,
        fromState: any,
        fromParams: any
      ) => {
        $rootScope.$previous = fromState
        $rootScope.$previousParams = fromParams
      }
    )
  }
}

Run.$inject = ['$rootScope', '$state', '$stateParams']

boot.run(Run)
