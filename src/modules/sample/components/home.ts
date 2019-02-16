import mod from '../module'

class Controller {
  constructor(private $scope: any) {
    $scope.aaa = 'sdsdsdsd'
  }
}

Controller.$inject = ['$scope']

mod.controller('sample/components/home', Controller)

export = require('./home.html')
