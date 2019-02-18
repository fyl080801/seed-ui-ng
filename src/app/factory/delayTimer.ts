'use strict'

import * as angular from 'angular'
import boot from '../boot'

class DelayTimerContext implements seed.IDelayTimerContext {
  private _callback: (state: any) => any
  private _canceling: () => void

  callback(fn: (state: any) => any): seed.IDelayTimerContext
  callback(): (state: any) => any
  callback(fn?: any) {
    if (fn && angular.isFunction(fn)) {
      this._callback = fn
      return this as seed.IDelayTimerContext
    } else {
      return this._callback || angular.noop
    }
  }

  canceling(fn: () => void): seed.IDelayTimerContext
  canceling(): () => void
  canceling(fn?: any) {
    if (fn && angular.isFunction(fn)) {
      this._canceling = fn
      return this as seed.IDelayTimerContext
    } else {
      return this._canceling || angular.noop
    }
  }
}

class DelayTimer implements seed.IDelayTimer {
  private _timer: ng.IPromise<void>
  private _defer: ng.IDeferred<any>
  private _defaults: seed.DelayTimerOptions

  private _options(opts: seed.DelayTimerOptions) {
    if (opts) {
      this._defaults = angular.extend(this._defaults, opts)
      return this
    }
    return this._defaults
  }

  constructor(
    private $timeout: ng.ITimeoutService,
    private $q: ng.IQService,
    private baseOptions: seed.DelayTimerOptions
  ) {
    this._defaults = {
      timeout: 1024
    }
    this._defer = $q.defer()
    this.context = new DelayTimerContext()

    this._options(this.baseOptions)
  }

  context: seed.IDelayTimerContext

  invoke() {
    this.cancel()
    this._defer = this.$q.defer()
    this._defer.promise.then(this.context.callback(), this.context.canceling())
    this._timer = this.$timeout(() => {
      this._defer.resolve()
    }, this._defaults.timeout)
  }

  cancel() {
    this.$timeout.cancel(this._timer)
    this._defer.reject()
    this._defer = null
  }
}

function factory(
  $timeout: ng.ITimeoutService,
  $q: ng.IQService
): seed.IDelayTimerFactory {
  return (options: seed.DelayTimerOptions) => {
    return new DelayTimer($timeout, $q, options)
  }
}

factory.$inject = ['$timeout', '$q']

boot.factory('$delayTimer', factory)
