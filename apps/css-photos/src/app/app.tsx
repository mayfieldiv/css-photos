import 'normalize.css';
import React, { useState } from 'react';
import styled from 'styled-components';

import { HtmlEditor, HtmlPreview } from '@css-photos/ui';

const EditorContainer = styled.div`
  flex: 1 1;
  overflow: hidden;

  > * {
    height: 100%;
  }
`;

const StyledApp = styled.div`
  display: flex;
  height: 100%;

  > * {
    min-width: 10rem;
    height: 100%;
  }
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
        <HtmlPreview htmlSource={htmlSource} width="400px" height="300px" />
      </StyledApp>
    </React.StrictMode>
  );
}

export default App;
