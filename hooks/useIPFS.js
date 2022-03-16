// custom hook for IPFS
import { useEffect, useState } from "react";

// pass the file or state you want to upload. It will upload the file and retrun the response.
export default function useIPFS(file) {
    const [ipfsData, setIpfsData] = useState({
        fileUrl: null,
        fileSize: null,
        urlSha256: null,
    });

    var shajs = require('sha.js')

    useEffect(() => {
        async function fileUpload() {
            // console.log(window.ipfs)
            const filename = file.name;

            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];

            // TODO assert that it is a image file
            console.log("fileType to upload: ", fileType); //ex: zip, rar, jpg, svg etc.
            try {
                const res = await window.ipfs.add(file);
                // Createthe url and get the sha256 base64 hash of the url
                const _fileUrl = "https://ipfs.io/ipfs/" + res.path
                const _urlHash = new shajs.sha256().update(_fileUrl).digest('base64')
                setIpfsData((prevIpfs) => {
                    return {
                        ...prevIpfs,
                        fileUrl: _fileUrl,
                        fileSize: res.size,
                        urlSha256: _urlHash,
                    };
                });
            } catch(e) {
                console.log("IPFS not ready: " + e);
            }
        }

        {
            file && fileUpload();
        }
    }, [file]);
    console.log(ipfsData);

    return ipfsData;
}
