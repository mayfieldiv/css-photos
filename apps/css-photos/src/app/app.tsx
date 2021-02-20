import 'normalize.css';
import React, { useState } from 'react';
import styled from 'styled-components';

import { HtmlEditor, HtmlPreview } from '@css-photos/ui';

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
  border-left: 1px solid;
  display: flex;
  justify-content: center;
`;

export function App() {
  const [htmlSource, setHtmlSource] = useState(`<div></div>
<style>
body {
  margin: 0;
  background: #abc;
}
div {

}
</style>
`);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

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
          <img src="https://cssbattle.dev/targets/7.png" {...dimensionProps} />
        </Column>
      </StyledApp>
    </React.StrictMode>
  );
}

export default App;
