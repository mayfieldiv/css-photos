import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HtmlPreviewProps {}

const StyledHtmlPreview = styled.div`
  color: pink;
`;

export function HtmlPreview(props: HtmlPreviewProps) {
  return (
    <StyledHtmlPreview>
      <h1>Welcome to html-preview!</h1>
    </StyledHtmlPreview>
  );
}

export default HtmlPreview;
