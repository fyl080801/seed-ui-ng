import * as angular from 'angular'
import './config/router'

const moduleList: string[] = []

export const createModule = (name: string, modules?: string[]) => {
  if (moduleList.indexOf(name) < 0) {
    moduleList.push(name)
    return angular.module(name, modules || [])
  } else {
    return angular.module(name)
  }
}

export default () => {
  angular.module('app.application', ['app.boot'].concat(moduleList))

  angular.element(document).ready(() => {
    angular
      .element(document)
      .find('html')
      .addClass('ng-app')
    angular
      .element(document)
      .find('body')
      .attr('ui-view', '')
    angular.bootstrap(document, ['app.application'])
  })
}
