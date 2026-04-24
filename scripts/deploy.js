const hre = require("hardhat");

/**
 * Deployment script for PortfolioAdvisor smart contract
 * Deploy to Sepolia testnet
 */

async function main() {
  console.log("Starting PortfolioAdvisor contract deployment...");
  
  try {
    // Get deployer account
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying from account: ${deployer.address}`);
    
    // Get account balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log(`Account balance: ${ethers.utils.formatEther(balance)} ETH`);
    
    // Deploy contract
    console.log("Deploying PortfolioAdvisor...");
    const PortfolioAdvisor = await hre.ethers.getContractFactory("PortfolioAdvisor");
    const contract = await PortfolioAdvisor.deploy();
    await contract.deployed();
    
    console.log("✅ PortfolioAdvisor deployed to:", contract.address);
    
    // Verify deployment
    console.log("\nVerifying deployment...");
    const isInitialized = await contract.initialized();
    console.log("Contract initialized:", isInitialized);
    
    // Save deployment address
    const deploymentInfo = {
      contractAddress: contract.address,
      deployedBy: deployer.address,
      deploymentBlock: await ethers.provider.getBlockNumber(),
      deploymentTimestamp: new Date().toISOString(),
      network: hre.network.name,
      chainId: (await ethers.provider.getNetwork()).chainId
    };
    
    console.log("\n📋 Deployment Info:");
    console.log(JSON.stringify(deploymentInfo, null, 2));
    
    return deploymentInfo;
    
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
