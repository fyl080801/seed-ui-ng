import * as angular from 'angular'
import application from './app/application'

application()

angular.element(document).ready(() => {
  angular
    .element(document)
    .find('html')
    .addClass('ng-app')
  angular.bootstrap(document, ['app.application'])
})
