import 'normalize.css';
import React, { useState } from 'react';
import styled from 'styled-components';

import { HtmlEditor, HtmlPreview } from '@css-photos/ui';

const StyledApp = styled.div`
  display: flex;
  height: 100%;

  > * {
    min-width: 25rem;
    height: 100%;
  }
`;

const EditorContainer = styled.div`
  flex: 1 1;
  overflow: hidden;

  > * {
    height: 100%;
  }
`;

const PreviewContainer = styled.div`
  border-left: 1px solid;
  border-right: 1px solid;
  padding: 1.25rem;
  display: flex;
  justify-content: center;
`;

const TargetContainer = styled.div`
  padding: 1.25rem;
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

  return (
    <React.StrictMode>
      <StyledApp>
        <EditorContainer>
          <HtmlEditor defaultValue={htmlSource} onChange={setHtmlSource} />
        </EditorContainer>
        <PreviewContainer>
          <HtmlPreview htmlSource={htmlSource} width="400px" height="300px" />
        </PreviewContainer>
        <TargetContainer>
          <img
            src="https://cssbattle.dev/targets/7.png"
            width="400px"
            height="300px"
          />
        </TargetContainer>
      </StyledApp>
    </React.StrictMode>
  );
}

export default App;
