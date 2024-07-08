// src/App.js

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNFTGallery from './components/ShowNft';
import MintToken from './components/MintToken';
import CheckBalance from './components/Checkblance';
import AllMinting from './components/AllMinting';
import NftMint from './components/NftMint';
import BuyNft from './components/buyNft';

function App() {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/" element={<BuyNft />} />
          <Route path="/list_nft" element={<MyNFTGallery />} />
          <Route path="/mint_token" element={<MintToken/>} />
          <Route path="/check_blance" element={<CheckBalance/>} />
          <Route path="/all_minting" element={<AllMinting/>} />
          <Route path="/mint_nft" element={<NftMint/>} />
          <Route path="/buy_nft" element={<BuyNft/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
