'use strict'

import boot from '../boot'

function directive(): ng.IDirective {
  function _link(
    $scope: ng.IScope,
    $element: JQLite,
    $attrs: ng.IAttributes,
    $ctrl: ng.IController
  ) {
    function validator(inputValue: any) {
      let valid = inputValue === $scope.$eval($attrs.equals)
      $ctrl.$setValidity('equal', valid)
      return valid ? inputValue : null
    }

    $ctrl.$parsers.push(validator)
    $ctrl.$formatters.push(validator)

    $scope.$watch($attrs.equals, () => {
      $ctrl.$setViewValue($ctrl.$viewValue)
    })
  }

  return {
    require: 'ngModel',
    link: _link
  }
}

boot.directive('equals', directive)
