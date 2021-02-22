import Color from "color"
import "normalize.css"
import React, { useState } from "react"
import styled from "styled-components"

import { EyeDropper, HtmlEditor, HtmlPreview } from "./ui"
import EyeDropperIcon from "./eye-dropper.svg"
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

const EyeDropperButton = styled.button`
  background: none;
  /* height: 100%; */
  text-align: center;
  border: 0;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  margin-right: 0.6rem;

  :hover {
    background-color: hsl(0, 0%, 28%);
  }
  :active {
    background-color: hsl(0, 0%, 26%);
  }
`

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  /* height: 2rem; */
`

const ColorPickerBox = styled.input`
  padding: 0.5em;
  /* height: 100%; */
  width: 4em;
  border: 1px solid;
  text-align: center;
  font-family: monospace;
  font-weight: bold;
  font-size: 1.3rem;
`

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
`)
  const [dimensions, setDimensions] = useState({ width: 400, height: 350 })
  const [color, setColor] = useState(Color.rgb(0, 0, 0))
  const [colorPickerEnabled, setColorPickerEnabled] = useState(false)

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
        <HtmlEditor defaultValue={htmlSource} onChange={setHtmlSource} />
      </EditorContainer>
      <Column style={minDimensionProps}>
        <HtmlPreview htmlSource={htmlSource} {...dimensionProps} />
      </Column>
      <Column style={minDimensionProps}>
        <EyeDropper
          disabled={!colorPickerEnabled}
          onColorHovered={setColor}
          onColorClicked={(color) => {
            setColor(color)
            setColorPickerEnabled(false)
          }}
        >
          <img
            src={OxImage}
            alt=""
            {...dimensionProps}
            style={{ cursor: colorPickerEnabled ? "crosshair" : "default" }}
          />
        </EyeDropper>
        <ColorPickerContainer>
          <EyeDropperButton
            onClick={() => setColorPickerEnabled(!colorPickerEnabled)}
            title="Toggle color picker"
          >
            <EyeDropperIcon
              width="25"
              height="25"
              fill={colorPickerEnabled ? "#0078D7" : "white"}
            />
          </EyeDropperButton>
          <ColorPickerBox
            type="text"
            value={color.hex()}
            style={{
              backgroundColor: color.hex(),
              color: color.isDark() ? "white" : "black",
            }}
            readOnly
          />
        </ColorPickerContainer>
      </Column>
    </StyledApp>
  )
}

export default App
