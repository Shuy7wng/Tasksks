import React,{FC} from "react";

interface ProjectNewIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const CubePlusIcon: FC<ProjectNewIconProps> = ({
  width = 24,
  height = 24,
  color = "#000",
  className = "",
}) => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      className={className}
    >
      <title>project-new</title>
      <g transform="translate(64.000000, 34.346667)">
        <path d="M192,-7.10542736e-15 L384,110.851252 L384,242.986 L341.333,242.986 L341.333,157.655 L213.333,231.555 L213.333,431.088 L192,443.405007 L0,332.553755 L0,110.851252 L192,-7.10542736e-15 Z M341.333333,264.32 L341.333,328.32 L405.333333,328.32 L405.333333,370.986667 L341.333,370.986 L341.333333,434.986667 L298.666667,434.986667 L298.666,370.986 L234.666667,370.986667 L234.666667,328.32 L298.666,328.32 L298.666667,264.32 L341.333333,264.32 Z M42.666,157.654 L42.6666667,307.920144 L170.666,381.82 L170.666,231.555 L42.666,157.654 Z M192,49.267223 L66.1333333,121.936377 L192,194.605531 L317.866667,121.936377 L192,49.267223 Z" />
      </g>
    </svg>
  );
};

export default CubePlusIcon;
