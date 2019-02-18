'use strict'

import * as angular from 'angular'
import './constant/enums'
import './config/router'
import './config/modal'
import './provider/router'
import './factory/delayTimer'
import './service/tree'
import './service/popup'
import './service/request'
import './directive/equals'

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
      angular.bootstrap(document.body, ['app.application'])
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
