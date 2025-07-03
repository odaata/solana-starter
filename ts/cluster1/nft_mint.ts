import {createSignerFromKeypair, signerIdentity, generateSigner, percentAmount} from "@metaplex-foundation/umi";
import {createUmi} from "@metaplex-foundation/umi-bundle-defaults";
import {createNft, mplTokenMetadata} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../turbin3-wallet.json"
import base58 from "bs58";
import {getTxExplorerUrl} from "./lib/getExplorerLinks";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

// const metadataUri = 'https://gateway.irys.xyz/85ZTCm6xjV2A8o6tZqSH71pg1X7oqiwE3Xau1Fzckk5d';
const metadataUri = 'https://gateway.irys.xyz/2gRjPViL4sFa8fAz3trMXTkEt2vuFVibmE48hn3VKkkV';

(async () => {
    const result = await createNft(umi, {
        mint,
        sellerFeeBasisPoints: percentAmount(10),
        name: "Generug",
        symbol: "GENERUG",
        uri: metadataUri,
    }).sendAndConfirm(umi);

    const signature = base58.encode(result.signature);

    console.log(`Successfully Minted! TX here:\n${getTxExplorerUrl(signature)}`);
    console.log("Mint Address: ", mint.publicKey);
    // Rug Man
    // https://explorer.solana.com/tx/4qNCk6CZRaJE3LPzqH9tZkiXXtptDiCEcXQSKEHcSZfCYXTgF7i6iq89tH3nLYyxy1Q9yPNoStPN6eRCMLbeLxm6?cluster=devnet
    // Mint Address:  7GJvmNtgH3Fpccd2gHdLWqCbS2HiP7MZA2mFN3at38XD
    // NFT: https://explorer.solana.com/address/7GJvmNtgH3Fpccd2gHdLWqCbS2HiP7MZA2mFN3at38XD/metadata?cluster=devnet

    // Generug
    // Successfully Minted! TX here:
    // https://explorer.solana.com/tx/3UjF9QnWmH4ryqBR5MwLo889xucdwdG21iwkfVUHQ2Ljhgge9u8jcdpxXuwhbbrmVCUStffcmjt6Vi4pw2ZFyfu3?cluster=devnet
    // Mint Address:  CwwnC45ZJwibMKHbnM8wwbP6UnPx6WLt8iYVnQKt1gSo
    // NFT: https://explorer.solana.com/address/CwwnC45ZJwibMKHbnM8wwbP6UnPx6WLt8iYVnQKt1gSo?cluster=devnet
})().then(() => process.exit(0));