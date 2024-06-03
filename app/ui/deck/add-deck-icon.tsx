import * as React from "react"
import { SVGProps } from "react"

interface DeckSVGProps extends SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
  }

const AddDeckIcon = (props: DeckSVGProps) => {
    const { width = 180, height = 242, ...otherProps } = props;
    return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 360 485" // Ajustar el viewBox según las nuevas dimensiones
    {...props}
  >
    <rect
      width={308}
      height={419}
      x={9}
      y={22}
      fill="#fff"
      stroke="#000"
      strokeWidth={2}
      rx={27}
    />
    <rect
      width={308}
      height={419}
      x={24}
      y={37}
      fill="#fff"
      stroke="#000"
      strokeWidth={2}
      rx={27}
    />
    <rect
      width={308}
      height={419}
      x={39}
      y={52}
      fill="#fff"
      stroke="#000"
      strokeWidth={2}
      rx={27}
    />
    <path stroke="#000" strokeWidth={5} d="M192.5 157v188" />
    <path stroke="#000" strokeWidth={4} d="M94 249h192" />
  </svg>);
}
export default AddDeckIcon;
