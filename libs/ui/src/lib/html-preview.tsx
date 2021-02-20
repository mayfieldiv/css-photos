import React from 'react';
import styled from 'styled-components';

export interface HtmlPreviewProps {
  htmlSource: string;
  width: string;
  height: string;
}

const Container = styled.div`
  padding: 1.25rem;
  display: flex;
  justify-content: center;
`;

const Preview = styled.iframe`
  background: white;
  border: 0;
  outline: 0;
`;

export class HtmlPreview extends React.PureComponent<HtmlPreviewProps> {
  private frameRef: React.RefObject<HTMLIFrameElement>;

  constructor(props: HtmlPreviewProps) {
    super(props);
    this.frameRef = React.createRef();
  }

  render() {
    return (
      <Container>
        <Preview
          ref={this.frameRef}
          // allow-same-origin to access contentDocument
          sandbox="allow-same-origin"
          height={this.props.height}
          width={this.props.width}
        ></Preview>
      </Container>
    );
  }

  componentDidMount() {
    this.updateFrameContent();
  }

  componentDidUpdate() {
    this.updateFrameContent();
  }

  private updateFrameContent() {
    if (this.frameRef.current?.contentDocument?.body != null) {
      this.frameRef.current.contentDocument.head.innerHTML =
        '<style>body{overflow:hidden}</style>';
      this.frameRef.current.contentDocument.body.innerHTML = this.props.htmlSource;
    }
  }
}

export default HtmlPreview;
