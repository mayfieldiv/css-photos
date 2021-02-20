import 'normalize.css';
import React, { useState } from 'react';
import styled from 'styled-components';

import { HtmlPreview } from '@css-photos/ui';

const StyledApp = styled.div`
  display: flex;
  height: 100vh;

  > * {
    min-width: 25rem;
    min-height: 100vh;
  }

  textarea {
    flex-grow: 1;
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
        <textarea
          onInput={(event) =>
            setHtmlSource((event.target as HTMLTextAreaElement).value)
          }
          defaultValue={htmlSource}
          style={{ height: '300px' }}
        />
        <HtmlPreview htmlSource={htmlSource} width="400px" height="300px" />
      </StyledApp>
    </React.StrictMode>
  );
}

export default App;
