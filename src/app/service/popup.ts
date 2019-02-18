'use strict'

import * as angular from 'angular'
import boot from '../boot'
import { Size, Backdrop } from '../constant/enums'
import information = require('./information.html')
import error = require('./error.html')
import confirm = require('./confirm.html')

class ConfirmPromise implements seed.IConfirmPromise {
  constructor(private defer: ng.IDeferred<any>) {}

  ok(callback?: (result: any) => void): seed.IConfirmPromise {
    this.defer.promise.then(callback || angular.noop)
    return this
  }

  cancel(callback?: (reason: any) => void): seed.IConfirmPromise {
    this.defer.promise.catch(callback || angular.noop)
    return this
  }
}

class PopupService implements seed.IPopupService {
  confirm(text: string, size?: string): seed.IConfirmPromise {
    var defer = this.$q.defer()
    var promise = new ConfirmPromise(defer)

    this.$modal
      .open({
        component: confirm,
        size: size ? size : Size.sm,
        scope: angular.extend(this.$rootScope.$new(), {
          $data: {
            text: text ? text : '是否确认操作？'
          }
        }),
        backdrop: Backdrop.static
      })
      .result.then(result => {
        if (result === true) {
          defer.resolve(result)
        } else {
          defer.reject(result)
        }
      })
      .catch(() => {
        defer.reject()
      })

    return promise
  }

  error(text: string | Array<any>, size?: string): ng.IPromise<any> {
    var defered = this.$q.defer()
    var _data = {}
    if (text === null || text === undefined) {
      _data = angular.extend(_data, {
        text: '发生错误'
      })
    } else if (typeof text !== 'string') {
      _data = angular.extend(_data, {
        contents: text
      })
    } else {
      _data = angular.extend(_data, {
        text: text
      })
    }
    this.$modal
      .open({
        component: error,
        size: size ? size : Size.sm,
        scope: angular.extend(this.$rootScope.$new(), {
          $data: _data
        }),
        backdrop: Backdrop.static
      })
      .result.then(result => {
        defered.resolve(result)
      })
    return defered.promise
  }

  information(text: string, size?: string) {
    var defered = this.$q.defer()
    this.$modal
      .open({
        component: information,
        size: size ? size : Size.sm,
        scope: angular.extend(this.$rootScope.$new(), {
          $data: {
            text: text ? text : '操作成功'
          }
        }),
        backdrop: Backdrop.static
      })
      .result.then(() => {
        defered.resolve()
      })
    return defered.promise
  }

  static $inject = ['$modal', '$q', '$rootScope']

  constructor(
    private $modal: seed.IModalService,
    private $q: ng.IQService,
    private $rootScope: ng.IRootScopeService
  ) {}
}

boot.service('$popup', PopupService)
