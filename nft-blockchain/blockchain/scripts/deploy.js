const hre = require("hardhat");

async function main() {
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");

    const ownerAddress = "0xA3924F76378eF33B5E6c0e6479f723DcdFd97EF6"; // Replace with your wallet address

    // Deploy the contract with the single `initialOwner` argument
    const nftMarketplace = await NFTMarketplace.deploy(ownerAddress);

    console.log("Waiting for deployment...");
    const deployedContract = await nftMarketplace.waitForDeployment();

    console.log("NFTMarketplace deployed to:", deployedContract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
