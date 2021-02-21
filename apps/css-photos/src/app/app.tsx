import 'normalize.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import ox from './ox.png';

import { EyeDropper, HtmlEditor, HtmlPreview } from '@css-photos/ui';

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

const Column = styled.div<{ minWidth: string; minHeight: string }>`
  box-sizing: content-box;
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  padding: 1.25rem;
  border-left: 1px solid #27313a;
  display: flex;
  align-items: center;
  flex-direction: column;
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
  const [color, setColor] = useState('#000000');

  const dimensionProps = {
    width: dimensions.width + 'px',
    height: dimensions.height + 'px',
  };

  return (
    <React.StrictMode>
      <StyledApp>
        <EditorContainer>
          <HtmlEditor defaultValue={htmlSource} onChange={setHtmlSource} />
        </EditorContainer>
        <Column
          minWidth={dimensionProps.width}
          minHeight={dimensionProps.height}
        >
          <HtmlPreview htmlSource={htmlSource} {...dimensionProps} />
        </Column>
        <Column
          minWidth={dimensionProps.width}
          minHeight={dimensionProps.height}
        >
          <EyeDropper onColorPick={setColor}>
            <img src={ox} {...dimensionProps} />
          </EyeDropper>
          <input
            type="text"
            value={color}
            style={{
              backgroundColor: color,
              color: '#616161',
              textShadow: '#e0e0e0 0.5px 0.5px 0',
            }}
            readOnly
          />
        </Column>
      </StyledApp>
    </React.StrictMode>
  );
}

export default App;
