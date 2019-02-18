'use strict'

import boot from '../boot'

class Run {
  constructor(
    $rootScope: ng.IRootScopeService & seed.KeyValuePairs,
    $state: ng.ui.IStateService,
    $stateParams: ng.ui.IStateParamsService,
    $timeout: ng.ITimeoutService
  ) {
    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams
    $rootScope.$on(
      '$stateChangeStart',
      (
        event: ng.IAngularEvent,
        toState: ng.ui.IState,
        toParams: ng.ui.IStateParamsService,
        fromState: ng.ui.IState,
        fromParams: ng.ui.IStateParamsService
      ) => {
        $timeout(() => {
          if (toState.data && toState.data.title) {
            document.title = toState.data.title
          }
        })
      }
    )
    $rootScope.$on(
      '$stateChangeSuccess',
      (
        event: ng.IAngularEvent,
        toState: ng.ui.IState,
        toParams: ng.ui.IStateParamsService,
        fromState: ng.ui.IState,
        fromParams: ng.ui.IStateParamsService
      ) => {
        $rootScope.$previous = fromState
        $rootScope.$previousParams = fromParams
      }
    )
  }
}

Run.$inject = ['$rootScope', '$state', '$stateParams', '$timeout']

boot.run(Run)
