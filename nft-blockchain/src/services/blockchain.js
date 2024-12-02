import { ethers } from 'ethers';
import NFTMarketplaceABI from './NFTMarketplaceABI.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const SEPOLIA_CHAIN_ID = '0xaa36a7'; // Sepolia chain ID in hex

// Helper function to ensure we're on Sepolia network
async function ensureSepoliaNetwork() {
  try {
    // Request network switch to Sepolia
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SEPOLIA_CHAIN_ID }],
    });
  } catch (switchError) {
    // If the network switch fails, we need to add the network first
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: SEPOLIA_CHAIN_ID,
            chainName: 'Sepolia Testnet',
            nativeCurrency: {
              name: 'SepoliaETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io']
          }],
        });
      } catch (addError) {
        throw new Error('Failed to add Sepolia network');
      }
    }
    throw new Error('Failed to switch to Sepolia network');
  }
}

export async function mintNFT({ title, description, price, file }) {
  await ensureSepoliaNetwork(); // Ensure we're on Sepolia before proceeding
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, NFTMarketplaceABI.abi, signer);

  // Mock IPFS upload
  const tokenURI = `https://ipfs.io/ipfs/fake-ipfs-hash/${file.name}`;

  const tx = await contract.mintNFT(tokenURI, ethers.parseEther(price));
  await tx.wait();
}

export async function fetchNFTs() {
  // Mock fetching NFTs
  return [
    { tokenId: 1, title: 'Art 1', description: 'Beautiful art', price: '0.1' },
    { tokenId: 2, title: 'Art 2', description: 'Amazing art', price: '0.2' },
  ];
}

export async function purchaseNFT(tokenId, price) {
  await ensureSepoliaNetwork(); // Ensure we're on Sepolia before proceeding
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, NFTMarketplaceABI.abi, signer);

  const tx = await contract.purchaseNFT(tokenId, { value: ethers.parseEther(price) });
  await tx.wait();
}