import React, { useEffect, useRef, useState } from 'react';
import './FileUploader.css'
import ImageContainer from './ImageContainer';

interface IFileUploader {
    id: string,
    className: string,
    setColor: Function,
    setPosition: Function,
    imgUrl: string | null | ArrayBuffer,
    setImgUrl: Function
}

const FileUploader: React.FC<IFileUploader> = ({ id, className, setColor, setPosition, imgUrl, setImgUrl }) => {
    useEffect(() => {console.log('render')}
    )
    const inputElement = useRef<HTMLInputElement>(null);
    const dropZone = useRef<HTMLDivElement>(null);
    const [typeError, setTypeError] = useState<boolean>(false);

    const types: string[] = ['image/png', 'image/jpg', 'image/jpeg']
    const reader = new FileReader();

    return (
        <form id={id} className={className + ' uploader '}>
            <div ref={dropZone} className={'uploader-container' + (typeError ? ' err ' : '')}
                onDragOver={(event) => {
                    event.preventDefault();
                    dropZone.current?.classList.add('on-drag-over')
                }}
                onDragLeave={(event) => {
                    event.preventDefault();
                    dropZone.current?.classList.remove('on-drag-over')
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    dropZone.current?.classList.remove('on-drag-over');
                    if (types.some(t => t === event.dataTransfer.files[0].type)) {
                        setTypeError(false);
                        reader.readAsDataURL(event.dataTransfer.files[0]);
                        reader.onload = () => {
                            setImgUrl(reader.result)
                        }
                    }
                    else {
                        setTypeError(true);
                        setImgUrl('');
                    }
                }}>
                <img src='./upload.svg' alt='upload-cloud' width="70vmax"></img>
                <p className='desc'>Drag & Drop your image here OR</p>
                <button className='btn browse'
                    onClick={(event) => {
                        event.preventDefault();
                        inputElement.current?.click();
                    }}
                >Browse</button>
                <p className={'desc types' + (typeError ? ' err ' : '')}>{typeError ? "Please use only PNG, JPG, JPEG file types!" : "PNG, JPG, JPEG"}</p>
            </div>
            <input ref={inputElement} type="file" accept=".png,.jpg,.jpeg" hidden
                onChange={(e) => {
                    if (inputElement.current?.files && inputElement.current?.files?.length > 0) {
                        setTypeError(false);
                        const fileType: null | string = inputElement.current?.files[0].type;
                        if (types.some(t => t === fileType)) {
                            
                            reader.readAsDataURL(inputElement.current?.files[0]);
                            reader.onload = () => {
                                console.log('onreader')
                                setImgUrl(reader.result);
                            }
                        }
                        else {
                            e.preventDefault();
                            setTypeError(true);
                            setImgUrl('');
                         }
                    }
                }}
            >
            </input>
            <ImageContainer
                src={imgUrl}
                setColor={setColor}
                setPosition={setPosition}
            ></ImageContainer>
        </form>
    );
};

export default FileUploader;