import { useState } from 'react';
import { mintNFT } from '../services/blockchain';

function ArtistDashboard() {
  const [nftData, setNftData] = useState({
    title: '',
    description: '',
    price: '',
    file: null,
  });

  const handleInputChange = (e) => {
    setNftData({ ...nftData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNftData({ ...nftData, file: e.target.files[0] });
  };

  const handleSubmit = async () => {
    await mintNFT(nftData);
    alert('NFT successfully minted!');
  };

  return (
    <div>
      <input type="text" name="title" placeholder="Title" onChange={handleInputChange} />
      <textarea name="description" placeholder="Description" onChange={handleInputChange}></textarea>
      <input type="number" name="price" placeholder="Price in ETH" onChange={handleInputChange} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Mint NFT</button>
    </div>
  );
}

export default ArtistDashboard;
