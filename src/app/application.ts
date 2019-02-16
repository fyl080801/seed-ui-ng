'use strict'

import * as angular from 'angular'
import './config/router'
import './provider/routerProvider'

export class Application {
  public static moduleList: string[] = []

  constructor(private modules: string[]) {}

  run() {
    angular.module('app.application', ['app.boot'].concat(this.modules))

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
}

export const createModule = (name: string, modules?: string[]) => {
  if (Application.moduleList.indexOf(name) < 0) {
    Application.moduleList.push(name)
    return angular.module(name, modules || [])
  } else {
    return angular.module(name)
  }
}

export default (modules?: string[]) => {
  return new Application(modules || Application.moduleList)
}
