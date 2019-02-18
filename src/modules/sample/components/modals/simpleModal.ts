import mod from '../../module'

class Controller {
  constructor(
    private $scope: ng.IScope & seed.KeyValuePairs,
    private $modal: seed.IModalService
  ) {
    $scope.vm = this
  }

  action() {
    this.$modal.open({
      component: '<div class="modal-content">sssss</div>'
    })
  }
}

Controller.$inject = ['$scope', '$modal']

mod.controller('simpleModalController', Controller)

export = require('./simpleModal.html')
