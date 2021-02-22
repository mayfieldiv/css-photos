import React from "react"

export interface TargetImageProps {
  src: string
  width: string
  height: string
}

export function TargetImage(props: TargetImageProps) {
  return <img alt="" {...props} />
}

export default TargetImage
