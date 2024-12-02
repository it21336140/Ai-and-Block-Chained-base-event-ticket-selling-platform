// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Import the extension
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    uint256 public tokenIdCounter;
    mapping(uint256 => uint256) public tokenPrices;

    event NFTMinted(uint256 tokenId, string tokenURI, address artist);
    event NFTPurchased(uint256 tokenId, address buyer);

    constructor(address initialOwner) Ownable(initialOwner) ERC721("NFTMarketplace", "NFTM") {
        tokenIdCounter = 0;
    }

    // Mint NFT and list for sale
    function mintNFT(string memory tokenURI, uint256 price) public {
        require(price > 0, "Price must be greater than 0");

        tokenIdCounter++;
        uint256 newTokenId = tokenIdCounter;

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI); // This will now work
        tokenPrices[newTokenId] = price;

        emit NFTMinted(newTokenId, tokenURI, msg.sender);
    }

    // Purchase an NFT
    function purchaseNFT(uint256 tokenId) public payable {
        uint256 price = tokenPrices[tokenId];
        address seller = ownerOf(tokenId);

        require(msg.value >= price, "Not enough ETH to purchase");
        require(seller != msg.sender, "Cannot buy your own NFT");

        _transfer(seller, msg.sender, tokenId);

        // Transfer funds to the seller
        payable(seller).transfer(price);

        // Remove from sale
        tokenPrices[tokenId] = 0;

        emit NFTPurchased(tokenId, msg.sender);
    }
}