import mod from '../module'
// import * as template from './index.html'
// import * as SimpleModal from './modals/simpleModal'
const SimpleModal = require('./modals/simpleModal')

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
        component: SimpleModal,
        windowClass: 'right',
        backdrop: 'static',
        size: 'lg'
      })
      .result.then(() => {})
  }

  click3() {
    this.$modal.open({
      component: SimpleModal,
      size: 'sm'
    })
  }
}

Controller.$inject = ['$scope', '$modal']

mod.controller('sample/components/index', Controller)

export = require('./index.html')
