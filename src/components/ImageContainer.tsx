import React, { useEffect } from 'react';
import './ImageContainer.css'

interface IImageContainer {
    src: string | null | ArrayBuffer,
    setColor: Function,
    setPosition: Function
}

const ImageContainer: React.FC<IImageContainer> = ({ src, setColor, setPosition }) => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d', {willReadFrequently : true} );
    const img: HTMLElement | null = document.getElementById('loaded-img');
    const imgLoaded: HTMLElement | null = document.querySelector(".loaded-img");
    const image: HTMLImageElement = new Image();
    if (src) image.src = String(src);
    
    image.addEventListener("load", () => {
        console.log(canvas)
        context?.drawImage(image, 0, 0, imgLoaded ? imgLoaded.clientWidth : 0, imgLoaded ? imgLoaded.clientHeight : 0);
    });

    useEffect(() => {
        if (imgLoaded && img) {
            canvas.width = imgLoaded.clientWidth;
            canvas.height = imgLoaded.clientHeight;
            imgLoaded.onclick = (event) => {
                const data = context?.getImageData(event.clientX - img.getBoundingClientRect().left, event.clientY - img.getBoundingClientRect().top, 1, 1).data;
                setColor(data);
                console.log(image);
                setPosition([event.clientX - img.getBoundingClientRect().left, event.clientY - img.getBoundingClientRect().top])
                        }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ context ])


    return (
        <div id='loaded-img' className='img-container'>
            <img className='loaded-img' alt='loaded' src={src ? String(src) : ''} style={{ "opacity": src ? "100%" : 0 }}></img>
        </div>
    );
};

export default ImageContainer;