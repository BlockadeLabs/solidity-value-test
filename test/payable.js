/*global artifacts, assert, before, contract, it, web3*/

const expectThrow = require('./helpers/expectThrow.js');

const PayAddress = artifacts.require('./PayAddress.sol');
const FallbackPayable = artifacts.require('./FallbackPayable.sol');
const NotFallbackPayable = artifacts.require('./NotFallbackPayable.sol');

contract('Payable or Not Payable?', async (accounts) => {
  let payAddress, fallbackPayable, notFallbackPayable;

  const owner = accounts[0];
  const address = accounts[1];

  before(async () => {
    payAddress = await PayAddress.deployed();
    fallbackPayable = await FallbackPayable.deployed();
    notFallbackPayable = await NotFallbackPayable.deployed();
  });

  it('should allow address to pay to another EOA', async () => {
    let send = await web3.eth.sendTransaction({
      from:address, to:owner, value:10000000
    });
    assert(true);
  });

  it('should allow address to pay to fallback payable', async () => {
    let send = await web3.eth.sendTransaction({
      from:address, to:fallbackPayable.address, value:10000000
    });
    assert(true);
  });

  it('should not allow address to pay to not fallback payable', async () => {
    () => expectThrow(
      web3.eth.sendTransaction({from:address, to:notFallbackPayable.address, value:10000000})
    )
  });

  it('should allow address to pay to another address using the payAddress contract', async () => {
    let send = await payAddress.payByValue(owner, {
      from:address, value:10000000
    });
    assert(true);
  });

  it('should allow address to pay to fallback contract address using the payAddress contract', async () => {
    let send = await payAddress.payByValue(fallbackPayable.address, {
      from:address, value:10000000
    });
    assert(true);
  });

  it('should not allow address to pay to not fallback contract address using the payAddress contract', async () => {
    () => expectThrow(
      payAddress.payByValue(notFallbackPayable.address, {
        from:address, value:10000000
      })
    )
  });

});
