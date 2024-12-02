import { useEffect, useState } from 'react';
import { fetchNFTs, purchaseNFT } from '../services/blockchain';

function NFTGallery() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const loadNFTs = async () => {
      const data = await fetchNFTs();
      setNfts(data);
    };
    loadNFTs();
  }, []);

  return (
    <div>
      {nfts.map((nft) => (
        <div key={nft.tokenId}>
          <h3>{nft.title}</h3>
          <p>{nft.description}</p>
          <button onClick={() => purchaseNFT(nft.tokenId, nft.price)}>Buy for {nft.price} ETH</button>
        </div>
      ))}
    </div>
  );
}

export default NFTGallery;
