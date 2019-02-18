'use strict'

import boot from '../boot'
import template = require('./modal.html')
import { setProperty } from '../utils/helper'

function decorator($delegate: seed.IModalService) {
  const open = $delegate.open as seed.IUIModalService

  $delegate.open = (options: seed.ModalOptions) => {
    let modalOptions: ng.ui.bootstrap.IModalSettings = {
      template: options.component
    }

    setProperty(modalOptions, options, 'animation')
    setProperty(modalOptions, options, 'appendTo')
    setProperty(modalOptions, options, 'ariaDescribedBy')
    setProperty(modalOptions, options, 'ariaLabelledBy')
    setProperty(modalOptions, options, 'backdrop')
    setProperty(modalOptions, options, 'backdropClass')
    setProperty(modalOptions, options, 'bindToController')
    setProperty(modalOptions, options, 'controller')
    setProperty(modalOptions, options, 'controllerAs')
    setProperty(modalOptions, options, 'keyboard')
    setProperty(modalOptions, options, 'openedClass')
    setProperty(modalOptions, options, 'resolve')
    setProperty(modalOptions, options, 'windowClass')
    setProperty(modalOptions, options, 'windowTopClass')
    setProperty(modalOptions, options, 'size')
    setProperty(modalOptions, options, 'scope')

    return open(modalOptions)
  }

  return $delegate
}

decorator.$inject = ['$delegate']

boot
  .config([
    '$provide',
    ($provide: any) => {
      $provide.decorator('$modal', decorator)
    }
  ])
  .run([
    '$templateCache',
    function($templateCache: ng.ITemplateCacheService) {
      $templateCache.put('template/modal/window.html', template)
    }
  ])
