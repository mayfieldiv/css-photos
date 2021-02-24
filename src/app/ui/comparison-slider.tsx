import React, { useState } from "react"
import styled from "styled-components"

interface ComparisonSliderProps {
  width: number
  height: number
}

const Wrapper = styled.div`
  user-select: none;
  position: relative;

  > * {
    position: absolute;
  }
`

export const ComparisonSlider: React.FunctionComponent<ComparisonSliderProps> = function (props) {
  if (React.Children.count(props.children) !== 2) {
    throw new Error("Must have 2 children")
  }

  const [verticalOrHorizontal, setVerticalOrHorizontal] = useState(true)
  const [location, setLocation] = useState<{ x: number; y: number }>()

  const [topElement, bottomElement] = React.Children.toArray(props.children) as React.ReactElement[]
  const dimensionProps = {
    width: props.width + "px",
    height: props.height + "px",
  }

  return (
    <Wrapper
      style={{
        ...dimensionProps,
        cursor: verticalOrHorizontal ? "col-resize" : "row-resize",
      }}
      onClick={() => setVerticalOrHorizontal(!verticalOrHorizontal)}
      onMouseMove={(event) => {
        setLocation({
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
        })
      }}
      onMouseLeave={() => {
        setLocation(undefined)
      }}
    >
      {React.cloneElement(bottomElement)}
      <div
        style={
          location == undefined
            ? {}
            : {
                overflow: "hidden",
                ...dimensionProps,
                ...(verticalOrHorizontal
                  ? {
                      width: (location.x / props.width) * 100 + "%",
                      boxShadow: "2px 0 red",
                    }
                  : {
                      height: (location.y / props.height) * 100 + "%",
                      boxShadow: "0 2px red",
                    }),
              }
        }
      >
        {React.cloneElement(topElement)}
      </div>
    </Wrapper>
  )
}

export default ComparisonSlider
