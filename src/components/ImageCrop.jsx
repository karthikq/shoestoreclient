/** @format */

import React, { useState, useEffect } from "react";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCrop = ({ Upimg, onLoad, src }) => {
  const [crop, setCrop] = useState({ unit: "%", width: 40 });
  const previewCanvasRef = React.useRef();
  const imgRef = React.useRef();

  const [completedCrop, setCompletedCrop] = useState("");
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <>
      <ReactCrop
        src={src}
        crop={crop}
        onImageLoaded={onLoad}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div
        className="canvas-div"
        style={{
          marginBottom: "20px",
        }}>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            objectFit: "cover",
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
    </>
  );
};

export default ImageCrop;
