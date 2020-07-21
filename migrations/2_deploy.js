const PayAddress = artifacts.require('./PayAddress.sol');
const FallbackPayable = artifacts.require('./FallbackPayable.sol');
const NotFallbackPayable = artifacts.require('./NotFallbackPayable.sol');

// eslint-disable-next-line func-names
module.exports = async (deployer) => {
	// Deploy the contracts
	await deployer.deploy(PayAddress);
	await deployer.deploy(FallbackPayable);
	await deployer.deploy(NotFallbackPayable);
};
