import wallet from "../turbin3-wallet.json"
import {createUmi} from "@metaplex-foundation/umi-bundle-defaults"
import {createSignerFromKeypair, signerIdentity} from "@metaplex-foundation/umi"
import {irysUploader} from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

// const image = 'https://gateway.irys.xyz/HR7jBHKBEjnmkBtg7RTXzeZRHTEy3LnUVjh5BoVFDRse'
const image = 'https://gateway.irys.xyz/CbvaQAHsgYCZYkgQDmeSxnmHSkmyCaj5jXs25gxJ3KW2';

(async () => {
    try {
        // Follow this JSON structure
        // https://developers.metaplex.com/token-metadata/guides/javascript/create-an-nft#uploading-the-metadata
        const metadata = {
            name: "Generug",
            symbol: "GENERUG",
            description: "RUGGED!",
            image,
            attributes: [
                {colors: '20', palette: 'random'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image,
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
        // Your metadata URI:  https://gateway.irys.xyz/85ZTCm6xjV2A8o6tZqSH71pg1X7oqiwE3Xau1Fzckk5d
        // Your metadata URI:  https://gateway.irys.xyz/2gRjPViL4sFa8fAz3trMXTkEt2vuFVibmE48hn3VKkkV
    } catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
