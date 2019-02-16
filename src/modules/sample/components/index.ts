import mod from '../module'

const tmp = require('./modals/simpleModal')

class Controller {
  constructor(private $scope: any, private $modal: seed.IModalService) {
    $scope.vm = this
  }

  click1() {
    alert('clicked!!')
  }

  click2() {
    this.$modal
      .open({
        component: tmp,
        windowClass: 'right',
        backdrop: 'static',
        size: 'lg'
      })
      .result.then(() => {})
  }

  click3() {
    this.$modal.open({
      component: tmp,
      size: 'sm'
    })
  }
}

Controller.$inject = ['$scope', '$modal']

mod.controller('sample/components/index', Controller)

export = require('./index.html')
