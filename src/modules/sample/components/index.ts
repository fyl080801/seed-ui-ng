import mod from '../module'
// import * as template from './index.html'
// import * as SimpleModal from './modals/simpleModal'
const SimpleModal = require('./modals/simpleModal')

class Controller {
  constructor(
    private $scope: any,
    private $modal: seed.IModalService,
    private $popup: seed.IPopupService
  ) {
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

  popupInfo() {
    this.$popup.information('aaa')
  }

  popupError() {
    this.$popup.error('出错啦!')
  }

  popupConfirm() {
    this.$popup
      .confirm('问题')
      .ok(() => {
        this.$popup.information('ok selected')
      })
      .cancel(() => {
        this.$popup.error('canceled')
      })
  }
}

Controller.$inject = ['$scope', '$modal', '$popup']

mod.controller('sample/components/index', Controller)

export = require('./index.html')
