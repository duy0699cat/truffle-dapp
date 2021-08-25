var Certification = artifacts.require("./Certification.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");
module.exports = function(deployer) {
  deployer.deploy(Certification);
  deployer.deploy(SimpleStorage);
};
