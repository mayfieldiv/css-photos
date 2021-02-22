import Color from "color"
import React, { useState } from "react"
import styled from "styled-components"

import { EyeDropper } from "."
import EyeDropperIcon from "../eye-dropper.svg"

export interface TargetPanelProps {}

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

export const TargetPanel: React.FunctionComponent<TargetPanelProps> = function (props) {
  const [color, setColor] = useState(Color.rgb(0, 0, 0))
  const [colorPickerEnabled, setColorPickerEnabled] = useState(false)

  return (
    <>
      <EyeDropper
        disabled={!colorPickerEnabled}
        onColorHovered={setColor}
        onColorClicked={(color) => {
          setColor(color)
          setColorPickerEnabled(false)
        }}
      >
        {React.cloneElement(React.Children.only(props.children as React.ReactElement), {
          style: { cursor: colorPickerEnabled ? "crosshair" : "default" },
        })}
      </EyeDropper>
      <ColorPickerContainer>
        <EyeDropperButton
          onClick={() => setColorPickerEnabled(!colorPickerEnabled)}
          title="Toggle color picker"
        >
          <EyeDropperIcon width="25" height="25" fill={colorPickerEnabled ? "#0078D7" : "white"} />
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
    </>
  )
}

export default TargetPanel
