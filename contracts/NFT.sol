// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTs is ERC721URIStorage {
    constructor() ERC721("SkullBoy", "SKL") {
        autoMint();
    }

    function autoMint() internal {
        string[5] memory TokenUrls = [
            "ipfs://bafkreickybdnyzvkomv5knho3vv3g2jznxjgx4bugqqppncapvcba7xctm",
            "ipfs://bafkreif7fujvtb3ixugy4kod75ro4osfx3txgqiq64wisw23hfdxfihwci",
            "ipfs://bafkreiervrkvfr4ipzed5glauklj45pvsgohztexet5xyqttffl746ixmy",
            "ipfs://bafkreihfaqt57i3udomc7pudzzulfjxzuzsmxmdflaycic2isra5i557ya",
            "ipfs://bafkreig2rthqkr5hky3mgeoo3rggderu5pg3s6bxlx664mzmk7e5wpwbxi"
        ];

        for (uint256 i = 0; i < TokenUrls.length; i++) {
            _mint(msg.sender, i);
            _setTokenURI(i, TokenUrls[i]);
        }
    }
}
