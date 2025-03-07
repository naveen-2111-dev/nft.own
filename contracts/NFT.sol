// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTs is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("SkullBoy", "SKL") {
        autoMint();
    }

    function autoMint() internal {
        string[5] memory Urls = [
            "https://ipfs.io/ipfs/bafkreifyovti23vbhljf2err6k3elki3pbk3d2g7qvpglbpxu2aau3toxi",
            "https://ipfs.io/ipfs/bafkreictvvpricgfzuccxvsgs34ptlp7oi53j5csofclcujrc3tvhnxpcu",
            "https://ipfs.io/ipfs/bafkreifv34zuihwaaaiz2tgdeeyawunlpf4nbhfptmxxn7qi3dhgevdudm",
            "https://ipfs.io/ipfs/bafkreiddiumsnu6bbn6f4hd2kkmtklnul7v5eooxufnqkhznvmg5f34pee",
            "https://ipfs.io/ipfs/bafkreic2g5bl3qxwi4idgrfhzzyytekbjkykq2czqq2wpblbtswu4yob74"
        ];

        for (uint256 i = 0; i < Urls.length; i++) {
            uint256 newTokenId = _tokenIds;
            _mint(msg.sender, newTokenId);
            _setTokenURI(newTokenId, Urls[i]);

            _tokenIds++;    
        }
    }
}
