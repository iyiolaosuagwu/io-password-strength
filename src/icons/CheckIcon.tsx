import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../types";

function CheckIcon({
  width = 16,
  height = 16,
  fill = "#1FC16B",
  stroke = "#1FC16B",
  ...props
}: SvgIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M8.00049 1.83325C11.4061 1.83343 14.1665 4.5946 14.1665 8.00024C14.1663 11.4057 11.406 14.1661 8.00049 14.1663C4.59484 14.1663 1.83367 11.4058 1.8335 8.00024C1.8335 4.59449 4.59473 1.83325 8.00049 1.83325ZM8.00049 2.16626C4.77883 2.16626 2.1665 4.77858 2.1665 8.00024C2.16668 11.2218 4.77893 13.8333 8.00049 13.8333C11.2219 13.8331 13.8333 11.2217 13.8335 8.00024C13.8335 4.77869 11.222 2.16644 8.00049 2.16626ZM11.3423 5.95239L7.33545 9.95923L5.21436 7.83813L5.44971 7.60278L7.33545 9.48853L11.1069 5.71704L11.3423 5.95239Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
}

export default CheckIcon;
