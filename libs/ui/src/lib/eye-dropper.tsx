import Color from 'color';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export interface EyeDropperProps {
  onColorPick: (color: Color) => void;
}

export const EyeDropper: FunctionComponent<EyeDropperProps> = (props) => {
  const [enabled, setEnabled] = useState(true);
  const [color, setColor] = useState(Color.rgb(0, 0, 0));
  const [childElement, setChildElement] = useState<HTMLImageElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  function updateColor(color: Color) {
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
          onError: () => {
            console.log('onError');
            setChildElement(null);
          },
          onLoad: (event: Event) => {
            console.log('onLoad');
            setChildElement(event.target as HTMLImageElement);
          },
          onMouseMove: (event: MouseEvent) => {
            if (!enabled) {
              return;
            }
            const canvas = canvasRef.current;
            if (canvas == null) {
              console.log('canvas is null');
              return;
            }

            const x = event.pageX - childElement.offsetLeft;
            const y = event.pageY - childElement.offsetTop;

            updateColor(
              Color.rgb(canvas.getContext('2d').getImageData(x, y, 1, 1).data)
            );
          },
        }
      )}
    </>
  );
};

export default EyeDropper;
