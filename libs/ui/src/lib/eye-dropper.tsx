import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export interface EyeDropperProps {
  // children: [React.ReactElement];
  onColorPick: (color) => void;
}

const StyledEyeDropper = styled.div`
  color: pink;
`;

export const EyeDropper: FunctionComponent<EyeDropperProps> = (props) => {
  const [color, setColor] = useState('#000000');
  const [childElement, setChildElement] = useState<HTMLImageElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  function updateColor(color) {
    setColor(color);
    props.onColorPick(color);
  }

  useEffect(() => {
    const img = childElement;
    if (img == null) {
      console.log('childElement is null');
      return;
    }

    console.log('childElement useEffect', img);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    canvasRef.current = canvas;
    return () => {
      canvasRef.current = null;
    };
  }, [childElement]);

  return (
    <>
      {React.cloneElement(
        React.Children.only(props.children as React.ReactElement),
        {
          onError: (event) => {
            console.log('onError');
            setChildElement(null);
          },
          onLoad: (event) => {
            console.log('onLoad');
            setChildElement(event.target);
          },
          onMouseMove: (event) => {
            const canvas = canvasRef.current;
            if (canvas == null) {
              console.log('canvas is null');
              return;
            }
            // console.log('imgRef', imgRef.current);
            // console.log('canvasRef', canvas);
            const x = event.clientX - event.target.offsetLeft;
            const y = event.clientY - event.target.offsetTop;
            var pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1)
              .data;

            const [r, g, b, a] = pixelData;
            const rgb = `rgb(${r},${g},${b})`;
            const toHex = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');
            const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
            updateColor(hex);
          },
        }
      )}
      <StyledEyeDropper></StyledEyeDropper>
    </>
  );
};

export default EyeDropper;
