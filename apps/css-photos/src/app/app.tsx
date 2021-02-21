import Color from 'color';
import 'normalize.css';
import React, { useState } from 'react';
import styled from 'styled-components';

import { EyeDropper, HtmlEditor, HtmlPreview } from '@css-photos/ui';
import ox from './ox.png';

const StyledApp = styled.div`
  display: flex;
  height: 100%;
`;

const EditorContainer = styled.div`
  flex: 1 1;
  overflow: hidden;
  min-width: 25rem;

  > * {
    height: 100%;
  }
`;

const Column = styled.div`
  box-sizing: content-box;
  padding: 1.25rem;
  border-left: 1px solid #27313a;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ColorBox = styled.input`
  padding: 0.3em;
  margin-top: 0.5em;
  width: 5em;
  border: 1px solid;
  text-align: center;
  font-family: monospace;
  font-weight: bold;
  font-size: 1.3rem;
`;

export function App() {
  const [htmlSource, setHtmlSource] = useState(`\
<div></div>
<style>
body {
  margin: 0;
  background: #abc;
}
div {

}
</style>
`);
  const [dimensions, setDimensions] = useState({ width: 400, height: 350 });
  const [color, setColor] = useState(Color.rgb(0, 0, 0));
  const [colorPickerDisabled, setColorPickerDisabled] = useState(true);

  const dimensionProps = {
    width: dimensions.width + 'px',
    height: dimensions.height + 'px',
  };
  const minDimensionProps = {
    minWidth: dimensionProps.width,
    minHeight: dimensionProps.height,
  };

  return (
    <React.StrictMode>
      <StyledApp>
        <EditorContainer>
          <HtmlEditor defaultValue={htmlSource} onChange={setHtmlSource} />
        </EditorContainer>
        <Column style={minDimensionProps}>
          <HtmlPreview htmlSource={htmlSource} {...dimensionProps} />
        </Column>
        <Column style={minDimensionProps}>
          <EyeDropper
            disabled={colorPickerDisabled}
            onColorHovered={setColor}
            onColorClicked={(color) => {
              setColor(color);
              setColorPickerDisabled(true);
            }}
          >
            <img src={ox} {...dimensionProps} />
          </EyeDropper>
          <button onClick={() => setColorPickerDisabled(!colorPickerDisabled)}>
            Eye-dropper {colorPickerDisabled ? 'disabled' : 'enabled'}
          </button>
          <ColorBox
            type="text"
            value={color.hex()}
            style={{
              backgroundColor: color.hex(),
              color: color.isDark() ? 'white' : 'black',
            }}
            readOnly
          />
        </Column>
      </StyledApp>
    </React.StrictMode>
  );
}

export default App;
