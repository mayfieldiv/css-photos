import "normalize.css"
import React, { useState } from "react"
import styled from "styled-components"

import { ComparisonSlider, HtmlEditor, HtmlPreview, TargetImage, TargetPanel } from "./ui"
import OxImage from "url:./ox.png"

const StyledApp = styled.div`
  display: flex;
  height: 100%;
`

const EditorContainer = styled.div`
  flex: 1 1;
  overflow: hidden;
  min-width: 25rem;

  > * {
    height: 100%;
  }
`

const Column = styled.div`
  box-sizing: content-box;
  padding: 1.25rem;
  border-left: 1px solid #27313a;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const defaultHtmlSource = `\
<div></div>
<style>
body {
  margin: 0;
  background: #abc;
}
div {

}
</style>
`

export function App() {
  const [htmlSource, setHtmlSource] = useState(defaultHtmlSource)
  const [dimensions, setDimensions] = useState({ width: 400, height: 350 })

  const dimensionProps = {
    width: dimensions.width + "px",
    height: dimensions.height + "px",
  }
  const minDimensionProps = {
    minWidth: dimensionProps.width,
    minHeight: dimensionProps.height,
  }

  return (
    <StyledApp>
      <EditorContainer>
        <HtmlEditor defaultValue={defaultHtmlSource} onChange={setHtmlSource} />
      </EditorContainer>
      <Column style={minDimensionProps}>
        <ComparisonSlider {...dimensions}>
          <HtmlPreview htmlSource={htmlSource} {...dimensionProps} />
          <TargetImage src={OxImage} {...dimensionProps} />
        </ComparisonSlider>
      </Column>
      <Column style={minDimensionProps}>
        <TargetPanel>
          <TargetImage src={OxImage} {...dimensionProps} />
        </TargetPanel>
      </Column>
    </StyledApp>
  )
}

export default App
