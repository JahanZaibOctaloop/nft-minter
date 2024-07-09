import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
       <nav class="navbar navbar-expand-lg navbar-light bg-dark text-light">
                      <div class="container-fluid">
                        <Link class="navbar-brand text-light" to="/">NftMarketPlace</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                              <Link class="nav-link active text-light" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                              <Link class="nav-link text-light" to="/list_nft">Mint and Approve</Link>
                            </li>
                            <li class="nav-item">
                              <Link class="nav-link text-light border bg-light text-dark" to="/admin_white_list">WhiteList User</Link>
                            </li>
                          </ul>  
                        </div>
                      </div>
      </nav>
    </div>
  )
}

export default Navbar