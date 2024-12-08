import { useState } from 'react';
import { mintNFT } from '../services/blockchain';
import './ArtistDashboard.css';

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
    <div className="main-content">
      <header className="header">
        <div className="logo">TicketLeap</div>
        <div className="search-bar">
          <input type="text" placeholder="Search for events" />
          <button>Search</button>
        </div>
        <div className="user-profile">
          <span>Koshala Ari</span>
          <img src="/profile.png" alt="User Profile" />
        </div>
      </header>

      <h1>Create a NFT</h1>
      <div className="nft-form">
        <div className="nft-image">
          <img src="/mint_nft.png" alt="NFT Preview" />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter NFT Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (ETH)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter Price in ETH"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Description"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload File</label>
            <input type="file" id="file" onChange={handleFileChange} />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn">
              Cancel
            </button>
            <button
              type="button"
              className="create-btn"
              onClick={handleSubmit}
            >
              Mint NFT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArtistDashboard;

