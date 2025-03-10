/**
 * @Author: Caven
 * @Date: 2020-03-02 23:14:20
 */

import { Cesium } from '@dc-modules/namespace'
import Animation from '../Animation'
import AnimationType from '../AnimationType'

class AroundView extends Animation {
  constructor(viewer, options = {}) {
    super(viewer)
    this._options = options
    this._heading = viewer.camera.heading
    this._aroundAmount = 0.2
  }

  get type() {
    return AnimationType.AROUND_VIEW
  }

  set aroundAmount(aroundAmount) {
    this._aroundAmount = aroundAmount
    return this
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.clock.onTick.addEventListener(this._onAround, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.clock.onTick.removeEventListener(this._onAround, this)
  }

  /**
   *
   * @param scene
   * @param time
   * @private
   */
  _onAround(scene, time) {
    this._heading += Cesium.Math.toRadians(this._aroundAmount)
    if (this._heading >= Math.PI * 2 || this._heading <= -Math.PI * 2) {
      this._heading = 0
    }
    this._viewer.scene.camera.setView({
      orientation: {
        heading: this._heading
      }
    })
  }
}

AnimationType.AROUND_VIEW = 'around_view'

export default AroundView
