export as namespace seed
export = seed

declare namespace seed {
  type KeyValuePairs = { [key: string]: any }

  type RouteOptions = {
    name: string
    title?: string
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

  //#region delaytimer
  type DelayTimerOptions = {
    timeout?: number
  }

  interface IDelayTimerContext {
    callback(fn: (state: any) => any): IDelayTimerContext
    callback(): (state: any) => any
    canceling(fn: () => void): IDelayTimerContext
    canceling(): () => void
  }

  interface IDelayTimerFactory {
    (options: DelayTimerOptions): IDelayTimer
  }

  interface IDelayTimer {
    invoke(): void
    cancel(): void
    context: IDelayTimerContext
  }
  //#endregion

  //#region tree
  interface ITreeItem<T extends {} & KeyValuePairs> {
    $data: T
    $parent?: ITreeItem<T>
    $children?: ITreeItem<T>[]
    $key: string
  }

  interface ITreeContext<T extends {} & KeyValuePairs> {
    onEach(fn: (item: ITreeItem<T>) => void): ITreeContext<T>
    result: ng.IPromise<ITreeItem<T>>
  }

  interface ITreeConvertContext<T extends {} & KeyValuePairs>
    extends ITreeContext<T> {
    key(name: string): ITreeConvertContext<T>
    key(): string
    parentKey(name: string): ITreeConvertContext<T>
    parentKey(): string
  }

  interface ITreeResolveContext<T extends {} & KeyValuePairs>
    extends ITreeContext<T> {
    key(name: string): ITreeResolveContext<T>
    key(): string
    childrenKey(name: string): ITreeResolveContext<T>
    childrenKey(): string
  }

  interface ITreeService {
    /**
     * 数组转换成树
     * @param data
     */
    toTree<T>(data: Array<T>): ITreeConvertContext<T>

    /**
     * 处理树节点，将树转化成标准结构
     * @param data
     */
    resolveTree<T>(data: T): ITreeResolveContext<T>

    /**
     * 遍历树
     * @param root
     */
    eachTree<T>(root: ITreeItem<T>): ITreeContext<T>
  }
  //#endregion

  //#region popup
  interface IConfirmPromise {
    ok(callback?: ((result: any) => void) | null): IConfirmPromise
    cancel(callback?: ((reason: any) => void) | null): IConfirmPromise
  }

  interface IPopupService {
    /**
     *
     * @param text
     * @param size
     */
    information(text: string, size?: string): ng.IPromise<any>

    /**
     *
     * @param text
     * @param size
     */
    confirm(text: string, size?: string): IConfirmPromise

    /**
     *
     * @param text
     * @param size
     */
    error(text: string | Array<any>, size?: string): ng.IPromise<any>
  }
  //#endregion
}
