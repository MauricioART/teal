import * as React from "react"
import { SVGProps } from "react"

interface DeckSVGProps extends SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
  }

const AddCardIcon = (props: DeckSVGProps) => {
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
      x={1}
      y={1}
      fill="#fff"
      stroke="#000"
      strokeWidth={2}
      rx={27}
    />
    <rect width={13} height={172} x={148} y={125} fill="#060606" rx={3} />
    <rect
      width={13}
      height={172}
      x={241}
      y={205}
      fill="#060606"
      rx={3}
      transform="rotate(90 241 205)"
    />
    <g fill="#000" clipPath="url(#a)">
      <path d="M222.972 381.248v-4.37h-5.376v-8.959h-5.041v8.959h-3.524v4.37h3.524v10.708c0 4.058 3.34 7.211 7.228 7.211 1.215 0 2.551-.313 3.067-.718v-3.965h-2.429c-1.61 0-2.825-1.217-2.825-3.122v-10.114h5.376Zm25.967 6.462c-.091-6.556-4.768-11.269-11.207-11.269-6.469 0-11.359 4.807-11.359 11.363 0 6.555 4.829 11.363 11.42 11.363 5.467 0 9.567-3.341 10.782-8.086h-5.042c-.911 2.311-3.037 3.778-5.74 3.778-3.553 0-6.074-2.56-6.317-6.244h17.433l.03-.905Zm-11.146-6.899c2.764 0 4.708 1.592 5.619 4.09h-11.511c.941-2.435 3.007-4.09 5.892-4.09Zm39.695 13.673c-1.002 0-1.974-.562-1.974-2.466v-15.14h-5.042v2.31c-1.791-1.717-4.13-2.747-6.863-2.747-5.984 0-10.782 5.026-10.782 11.363s4.798 11.363 10.782 11.363c3.097 0 5.8-1.405 7.623-3.653 1.063 2.185 3.128 3.653 5.74 3.653.638 0 1.215-.156 1.701-.437v-4.246h-1.185Zm-13.242-.125c-3.553 0-6.378-2.903-6.378-6.555 0-3.653 2.825-6.556 6.378-6.556 3.523 0 6.378 2.903 6.378 6.556 0 3.652-2.855 6.555-6.378 6.555Zm18.679 4.371h5.041v-38.897h-5.041v38.897ZM196.613 397.59c-.219-1.053-.219-2.707-.219-4.587 0-6.165.073-15.414-6.803-26.617l-4.17-6.767a5.105 5.105 0 0 0-3.219-2.331 5.063 5.063 0 0 0-3.877.677s-.073 0-.073.075c-.658.451-1.244 1.053-1.609 1.805-.586-.451-1.317-.827-2.049-.978-1.389-.3-2.779-.075-3.95.752-.073 0-.073.076-.146.076a4.908 4.908 0 0 0-1.902 2.481c-1.463-.677-3.292-.602-4.755.225-.073 0-.146.075-.219.075a5.708 5.708 0 0 0-1.61 1.655l-6.73-10.903a5.837 5.837 0 0 0-3.511-2.556c-1.463-.301-2.999-.075-4.243.752l-.073.075h-.073c-1.244.827-2.121 2.105-2.487 3.609-.366 1.504-.073 3.083.731 4.361l11.339 18.271c-.585.301-1.097.677-1.609.977-.293.151-.513.376-.805.527a6.398 6.398 0 0 0-2.634 3.834 5.96 5.96 0 0 0 .805 4.587l3.95 6.391c.073.075.147.225.22.301 4.755 6.767 10.607 8.571 14.557 9.774 1.097.301 2.048.602 2.78.902.146.076.219.076.365.076 1.829.451 2.414 1.353 3.439 3.082l.365.602c.293.451.805.752 1.317.752.293 0 .585-.076.805-.226.731-.451.951-1.428.512-2.18l-.366-.527c-1.097-1.879-2.268-3.759-5.34-4.511-.878-.376-1.829-.677-2.926-.977-4.023-1.204-9.437-2.858-13.753-9.775l-3.291-5.338c-.439-.677-.586-1.429-.366-2.256a2.966 2.966 0 0 1 1.243-1.88c.293-.225.586-.376.878-.601.512-.376 1.317-.903 1.463-.978 0 0 .073.075.293.376l4.608 7.444c.293.451.805.752 1.317.752.293 0 .585-.075.805-.226.731-.451.951-1.428.439-2.18l-4.609-7.444-13.167-21.278a2.773 2.773 0 0 1-.366-2.03c.146-.677.585-1.279 1.097-1.655 0 0 .073 0 .073-.075h.074c.585-.376 1.243-.526 1.975-.376.658.151 1.243.602 1.609 1.128l9.29 15.038 4.389 7.068c.293.451.805.751 1.317.751.293 0 .585-.075.805-.225.731-.451.951-1.429.439-2.181l-4.389-7.067a2.244 2.244 0 0 1 .658-3.083c1.024-.677 2.341-.376 2.999.677l4.389 7.067c.293.451.805.752 1.317.752.293 0 .585-.075.805-.225.731-.451.951-1.429.439-2.181l-3.658-5.865c-.293-.526-.439-1.127-.293-1.654a2.37 2.37 0 0 1 .951-1.428c.512-.301 1.098-.451 1.61-.301.585.15 1.024.451 1.39.977l1.463 2.331 2.926 4.737c.292.451.804.752 1.316.752.293 0 .586-.075.805-.225.732-.452.951-1.429.439-2.181l-2.926-4.737c-.293-.451-.366-1.053-.293-1.579.147-.526.439-.977.878-1.278.439-.301 1.024-.376 1.536-.301.512.151.951.451 1.244.902l4.17 6.767c6.437 10.377 6.364 19.098 6.364 24.888 0 2.18 0 3.985.292 5.338a1.49 1.49 0 0 0 1.463 1.203c.147 0 .22 0 .366-.075 1.098-.075 1.61-.977 1.39-1.804Zm-54.717-36.166h-7.169c-.659 0-1.171.526-1.171 1.203s.512 1.203 1.171 1.203h4.389l-10.388 11.729v-4.962c0-.677-.512-1.203-1.17-1.203-.659 0-1.171.526-1.171 1.203v7.97c0 .677.512 1.203 1.171 1.203h7.169c.658 0 1.17-.526 1.17-1.203s-.512-1.203-1.17-1.203h-4.389l10.387-11.654v4.962c0 .677.512 1.203 1.171 1.203.658 0 1.17-.526 1.17-1.203v-8.045c.073-.677-.512-1.203-1.17-1.203Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M126 350h162v59H126z" />
      </clipPath>
    </defs>
  </svg>);
}
export default AddCardIcon;
