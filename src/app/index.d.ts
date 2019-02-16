export as namespace seed
export = seed

declare namespace seed {
  type RouteOptions = {
    name: string
    component: any
    children?: RouteOptions[]
  }

  interface IRouterProvider extends ng.IServiceProvider {
    add(options: RouteOptions): IRouterProvider
    other(name: string): IRouterProvider
  }
}
