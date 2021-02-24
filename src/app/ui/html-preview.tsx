import React from "react"
import styled from "styled-components"

export interface HtmlPreviewProps {
  htmlSource: string
  width: string
  height: string
}

const Preview = styled.iframe`
  background: white;
  border: 0;
  outline: 0;
  pointer-events: none;
`

export class HtmlPreview extends React.PureComponent<HtmlPreviewProps> {
  private frameRef: React.RefObject<HTMLIFrameElement>

  constructor(props: HtmlPreviewProps) {
    super(props)
    this.frameRef = React.createRef()
  }

  render() {
    return (
      <Preview
        ref={this.frameRef}
        // allow-same-origin to access contentDocument
        sandbox="allow-same-origin"
        height={this.props.height}
        width={this.props.width}
      ></Preview>
    )
  }

  componentDidMount() {
    this.updateFrameContent()
  }

  componentDidUpdate() {
    this.updateFrameContent()
  }

  private updateFrameContent() {
    if (this.frameRef.current?.contentDocument?.body != null) {
      this.frameRef.current.contentDocument.head.innerHTML = "<style>body{overflow:hidden}</style>"
      this.frameRef.current.contentDocument.body.innerHTML = this.props.htmlSource
    }
  }
}

export default HtmlPreview
