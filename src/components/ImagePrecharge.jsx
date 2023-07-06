import React, { useState } from 'react'

function ImagePrecharge({url,width,alt}) {

    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading && <span 
            className={`lds-dual-ring`}></span>}
            <img width={width} className={`${isLoading?"hidden":"block"} mx-auto`} onLoad={()=>setIsLoading(false)} src={url} alt={alt} />
        </>
    )
}

export default ImagePrecharge