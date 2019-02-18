'use strict'

import * as angular from 'angular'
import boot from '../boot'

class TreeContext<T> implements seed.ITreeContext<T> {
  constructor(private defer: ng.IDeferred<seed.ITreeItem<T>>) {}

  onEach(fn: (item: seed.ITreeItem<T>) => void): seed.ITreeContext<T> {
    this.defer.promise.then(angular.noop, angular.noop, fn)
    return this
  }

  result: ng.IPromise<seed.ITreeItem<T>> = this.defer.promise
}

class TreeConvertContext<T> extends TreeContext<T>
  implements seed.ITreeConvertContext<T> {
  private _key: any = 'id'
  private _parentKey: any = 'parentId'

  key(name: string): seed.ITreeConvertContext<T>
  key(): string
  key(name?: any) {
    if (name) {
      this._key = name
      return this
    }
    return this._key
  }

  parentKey(name: string): seed.ITreeConvertContext<T>
  parentKey(): string
  parentKey(name?: any) {
    if (name) {
      this._parentKey = name
      return this
    }
    return this._parentKey
  }
}

class TreeResolveContext<T> extends TreeContext<T>
  implements seed.ITreeResolveContext<T> {
  private _key: any = 'id'
  private _childrenKey: any = 'children'

  key(name: string): seed.ITreeResolveContext<T>
  key(): string
  key(name?: any) {
    if (name) {
      this._key = name
      return this
    }
    return this._key
  }

  childrenKey(name: string): seed.ITreeResolveContext<T>
  childrenKey(): string
  childrenKey(name?: any) {
    if (name) {
      this._childrenKey = name
      return this
    }
    return this._childrenKey
  }
}

class TreeService implements seed.ITreeService {
  static $inject = ['$q', '$timeout']

  constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService) {}

  private _convert<T extends {} & seed.KeyValuePairs>(
    data: T[],
    context: seed.ITreeConvertContext<T>,
    defer: ng.IDeferred<seed.ITreeItem<T>>
  ): seed.ITreeItem<T> {
    // 将键值映射成键值对
    let map: { [key: string]: seed.ITreeItem<T> } = {}
    for (var i = 0; i < data.length; i++) {
      let current = data[i]
      map[current[context.key()]] = {
        $data: current,
        $key: current[context.key()]
      }
    }

    // 构建树
    let root: seed.ITreeItem<T> = {
      $data: null,
      $key: null,
      $children: []
    }
    for (var key in map) {
      let current = map[key]
      let parent = map[current.$data[context.parentKey()]]
      if (parent) {
        current.$parent = parent
        ;(parent.$children || (parent.$children = [])).push(current)
      } else {
        current.$parent = root
        root.$children.push(current)
      }
      defer.notify(current)
    }

    return root
  }

  private _resolve<T extends {} & seed.KeyValuePairs>(
    data: T,
    context: seed.ITreeResolveContext<T>,
    defer: ng.IDeferred<seed.ITreeItem<T>>,
    parent?: seed.ITreeItem<T>
  ): seed.ITreeItem<T> {
    let node: seed.ITreeItem<T> = {
      $data: data,
      $parent: parent,
      $key: data[context.key()]
    }

    let resolvedChildren: seed.ITreeItem<T>[] = []
    let children = data[context.childrenKey()]
    children = angular.isArray(children) ? children : []

    for (var i = 0; i < children.length; i++) {
      resolvedChildren.push(this._resolve(children[i], context, defer, node))
    }

    node.$children = resolvedChildren
    delete node.$data[context.childrenKey()]

    defer.notify(node)

    return node
  }

  private _each<T>(
    root: seed.ITreeItem<T>,
    context: seed.ITreeContext<T>,
    defer: ng.IDeferred<seed.ITreeItem<T>>
  ) {
    for (var i = 0; i < root.$children.length; i++) {
      defer.notify(root.$children[i])
      if (root.$children[i].$children) {
        this._each(root.$children[i], context, defer)
      }
    }
  }

  toTree<T>(data: T[]): seed.ITreeConvertContext<T> {
    let defer = this.$q.defer<seed.ITreeItem<T>>()
    let context = new TreeConvertContext<T>(defer)
    this.$timeout(() => {
      defer.resolve(this._convert<T>(data, context, defer))
    })
    return context
  }

  resolveTree<T>(data: T): seed.ITreeResolveContext<T> {
    let defer = this.$q.defer<seed.ITreeItem<T>>()
    let context = new TreeResolveContext<T>(defer)
    this.$timeout(() => {
      defer.resolve(this._resolve<T>(data, context, defer))
    })
    return context
  }

  eachTree<T>(root: seed.ITreeItem<T>): seed.ITreeContext<T> {
    let defer = this.$q.defer<seed.ITreeItem<T>>()
    let context = new TreeContext<T>(defer)
    this.$timeout(() => {
      this._each<T>(root, context, defer)
      defer.resolve(root)
    })
    return context
  }
}

boot.service('$tree', TreeService)
