import chai, {expect} from 'chai';
import sinon from 'sinon';
import CartSummary from './../../src/part1/cart-summary';
import tax from './../../src/part1/tax';

describe('CartSummary', () => {

  it('getSubTotal() should return 0 if not items are passed in', () => {
    const cartSummary = new CartSummary([]);
    expect(cartSummary.getSubTotal()).to.equal(0);
  });

  it('getSubTotal() should return the sum of the price * quantity for all items', function() {
    const cartSummary = new CartSummary([{
      id: 1,
      quantity: 4,
      price: 50
    }, {
      id: 2,
      quantity: 2,
      price: 30
    }, {
      id: 3,
      quantity: 1,
      price: 40
    }]);

    expect(cartSummary.getSubTotal()).to.equal(300);
  });

});

describe('getTax()', () => {
  beforeEach(() => {
    sinon.stub(tax, 'calculate', (subtotal, state, done) => {
      setTimeout(() => {
        done({
          amount: 30
        });
      }, 0);
    })
  });

  afterEach(() => {
    tax.calculate.restore();
  });

  it ('getTax() should execute the callback function with the tax amount', (done) => {
    const cartSummary = new CartSummary([{
      id: 1,
      quantity: 4,
      price: 50
    }, {
      id: 2,
      quantity: 2,
      price: 30
    }, {
      id: 3,
      quantity: 1,
      price: 40
    }]);

    cartSummary.getTax('NY', (taxAmount) => {
      expect(taxAmount).to.equal(30);
      done();
    });
  });

});