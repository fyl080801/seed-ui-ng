import boot from '../boot'

function setOption(
  objOptions: ng.ui.bootstrap.IModalSettings & seed.KeyValuePairs,
  souOptions: seed.ModalOptions & seed.KeyValuePairs,
  name: string
) {
  if (souOptions[name] !== undefined) objOptions[name] = souOptions[name]
}

function decorator($delegate: seed.IModalService) {
  const open = $delegate.open as seed.IUIModalService

  $delegate.open = (options: seed.ModalOptions) => {
    let modalOptions: ng.ui.bootstrap.IModalSettings = {
      template: options.component
    }

    setOption(modalOptions, options, 'animation')
    setOption(modalOptions, options, 'appendTo')
    setOption(modalOptions, options, 'ariaDescribedBy')
    setOption(modalOptions, options, 'ariaLabelledBy')
    setOption(modalOptions, options, 'backdrop')
    setOption(modalOptions, options, 'backdropClass')
    setOption(modalOptions, options, 'bindToController')
    setOption(modalOptions, options, 'controller')
    setOption(modalOptions, options, 'controllerAs')
    setOption(modalOptions, options, 'keyboard')
    setOption(modalOptions, options, 'openedClass')
    setOption(modalOptions, options, 'resolve')
    setOption(modalOptions, options, 'windowClass')
    setOption(modalOptions, options, 'windowTopClass')
    setOption(modalOptions, options, 'size')

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
      $templateCache.put(
        'template/modal/window.html',
        '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n' +
          '    <div class="modal-dialog modal-{{size}}"><div class="modal-content" modal-transclude></div></div>\n' +
          '</div>'
      )
    }
  ])
