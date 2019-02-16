export as namespace seed
export = seed

declare namespace seed {
  type KeyValuePairs = { [key: string]: any }

  type RouteOptions = {
    name: string
    component: any
    children?: RouteOptions[]
  }

  type ModalOptions = {
    component: any
    scope?: angular.IScope | ng.ui.bootstrap.IModalScope
    controller?: string | Function | Array<string | Function>
    controllerAs?: string
    bindToController?: boolean
    resolve?: {
      [key: string]: string | Function | Array<string | Function> | Object
    }
    animation?: boolean
    backdrop?: boolean | string
    keyboard?: boolean
    backdropClass?: string
    windowClass?: string
    size?: string
    openedClass?: string
    windowTopClass?: string
    appendTo?: angular.IAugmentedJQuery

    // /**
    //  * A string reference to the component to be rendered that is registered with Angular's compiler. If using a directive, the directive must have `restrict: 'E'` and a template or templateUrl set.
    //  *
    //  * It supports these bindings:
    //  *   - `close` - A method that can be used to close a modal, passing a result. The result must be passed in this format: `{$value: myResult}`
    //  *   - `dismiss` - A method that can be used to dismiss a modal, passing a result. The result must be passed in this format: `{$value: myRejectedResult}`
    //  *   - `modalInstance` - The modal instance. This is the same `$uibModalInstance` injectable found when using `controller`.
    //  *   - `resolve` - An object of the modal resolve values. See [UI Router resolves] for details.
    //  */
    // component?: string

    ariaDescribedBy?: string
    ariaLabelledBy?: string
  }

  interface IUIModalService {
    (
      options: ng.ui.bootstrap.IModalSettings
    ): ng.ui.bootstrap.IModalInstanceService
  }

  interface IRouterProvider extends ng.IServiceProvider {
    add(options: RouteOptions): IRouterProvider
    other(name: string): IRouterProvider
  }

  interface IModalService {
    getPromiseChain(): ng.IPromise<any>
    open(options: ModalOptions): ng.ui.bootstrap.IModalInstanceService
  }
}
