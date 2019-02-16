export as namespace seed
export = seed

declare namespace seed {
  interface IRouterProvider extends ng.IServiceProvider {
    add(name: string, options: any): IRouterProvider
    other(name: string): IRouterProvider
  }
}
