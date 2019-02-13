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
  return angular.module('app.application', ['app.boot'].concat(moduleList))
}
