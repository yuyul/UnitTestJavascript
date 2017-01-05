import tax from './tax';

export default class CartSummary {
  constructor(items) {
    this._items = items;
  }

  getSubTotal() {
    if (this._items.length) {
      return this._items.reduce((subtotal, item) => {
        return subtotal += (item.quantity * item.price);
      }, 0);
    }
    return 0;
  }

  getTax(state, done) {
    tax.calculate(this.getSubTotal(), state, (taxInfo) => {
      done(taxInfo.amount);
    });
  }
}