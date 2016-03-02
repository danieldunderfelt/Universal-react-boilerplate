import { extendObservable } from 'mobx'

class UIStore {

  constructor() {

    extendObservable(this, {
      /* UI state here */
    })
  }
}

export default new UIStore()