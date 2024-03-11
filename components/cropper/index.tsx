import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

import 'react-image-crop/dist/ReactCrop.css';
import { Button, Stack } from '@mantine/core';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 50,
                height: 50
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

export default function Cropper({ imageUrl, onSaveCropped }) {
    const [imgSrc, setImgSrc] = useState(imageUrl);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
    const blobUrlRef = useRef('');
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(1);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
        handleToggleAspectClick();
    }

    function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist');
        }

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create blob');
            }
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
            }
            blobUrlRef.current = URL.createObjectURL(blob);
            hiddenAnchorRef.current!.href = blobUrlRef.current;
            hiddenAnchorRef.current!.click();
        });
    }

    function onSaveCroppedImage() {
        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist');
        }

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create blob');
            }
            onSaveCropped(blob);
        });
    }

    useDebounceEffect(
        async () => {
            if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
            }
        },
        100,
        [completedCrop, scale, rotate]
    );

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined);
        } else {
            setAspect(16 / 9);

            if (imgRef.current) {
                const { width, height } = imgRef.current;
                const newCrop = centerAspectCrop(width, height, 16 / 9);
                setCrop(newCrop);
                // Updates the preview
                setCompletedCrop(convertToPixelCrop(newCrop, width, height));
            }
        }
    }

    return (
        <Stack className="App">
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    minWidth={100}
                    minHeight={100}
                    style={{
                        width: 'max-content',
                        margin: 'auto'
                    }}
                >
                    <img
                        crossOrigin="anonymous"
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            {!!completedCrop && (
                <>
                    <Stack style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: '1px solid black',
                                objectFit: 'contain',
                                margin: 'auto',
                                width: completedCrop.width,
                                height: completedCrop.height
                            }}
                        />
                    </Stack>
                    <Stack>
                        <Button
                            size="lg"
                            color="secondary"
                            style={{ marginTop: '10px', marginBottom: '10px' }}
                            onClick={() => onSaveCroppedImage()}
                        >
                            <span>Save Cropped Image</span>
                        </Button>
                    </Stack>
                </>
            )}
        </Stack>
    );
}
