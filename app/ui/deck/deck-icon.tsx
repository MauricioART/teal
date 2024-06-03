import * as React from "react";
import { SVGProps } from "react";
import Image from "next/image";

interface DeckSVGProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  imageUrl?: string; // Prop para la URL de la imagen
}

const DeckIcon = (props: DeckSVGProps) => {
  const { width = 180, height = 242, imageUrl, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 360 485" // Ajustar el viewBox según las nuevas dimensiones
      {...otherProps}
    >
      {imageUrl && (
        <defs>
          <pattern id="imagePattern" patternUnits="userSpaceOnUse" width={360} height={485}>
            <image href={imageUrl} x="0" y="0" width={360} height={485} />
          </pattern>
        </defs>
      )}
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
      <rect
        width={308}
        height={419}
        x={39}
        y={52}
        fill={imageUrl ? "url(#imagePattern)" : "#fff"}
        stroke="#000"
        strokeWidth={2}
        rx={27}
      />
    </svg>
  );
};
export default DeckIcon;
