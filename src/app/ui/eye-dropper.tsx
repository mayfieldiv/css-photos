import Color from "color"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import styled from "styled-components"

export interface EyeDropperProps {
  disabled?: boolean
  onColorHovered?: (color: Color) => void
  onColorClicked?: (color: Color) => void
}

export const EyeDropper: FunctionComponent<EyeDropperProps> = (props) => {
  const [clickedColor, setClickedColor] = useState(Color.rgb(0, 0, 0))
  const [childElement, setChildElement] = useState<HTMLImageElement>()
  const canvasRef = useRef<HTMLCanvasElement>()

  useEffect(() => {
    const img = childElement
    if (img == null) {
      console.log("childElement is null")
      return
    }

    console.log("childElement useEffect", img)
    const canvas = document.createElement("canvas")
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext("2d")?.drawImage(img, 0, 0, img.width, img.height)
    canvasRef.current = canvas
    return () => {
      canvasRef.current = undefined
    }
  }, [childElement])

  function tryReadColor(event: MouseEvent): Color | undefined {
    if (props.disabled) {
      return
    }
    const context = canvasRef.current?.getContext("2d")
    if (context == null || childElement == null) {
      console.log("canvas/image is null")
      return
    }

    const x = event.pageX - childElement.offsetLeft
    const y = event.pageY - childElement.offsetTop

    return Color.rgb(context.getImageData(x, y, 1, 1).data)
  }

  return (
    <>
      {React.cloneElement(React.Children.only(props.children as React.ReactElement), {
        onError: () => {
          console.log("onError")
          setChildElement(undefined)
        },
        onLoad: (event: Event) => {
          console.log("onLoad")
          setChildElement(event.target as HTMLImageElement)
        },
        onClick: (event: MouseEvent) => {
          const color = tryReadColor(event)
          if (color) {
            setClickedColor(color)
            props.onColorClicked?.(color)
          }
        },
        onMouseMove: (event: MouseEvent) => {
          const color = tryReadColor(event)
          if (color) {
            props.onColorHovered?.(color)
          }
        },
        onMouseLeave: () => {
          if (!props.disabled) {
            props.onColorHovered?.(clickedColor)
          }
        },
      })}
    </>
  )
}

export default EyeDropper
