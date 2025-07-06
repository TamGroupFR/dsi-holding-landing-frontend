import React, { FC } from 'react';

interface Props {
  cx: number;
  cy: number;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const DepartmentSVGFragment: FC<Props> = ({
  cx, cy, isActive, onMouseEnter, onMouseLeave, onClick,
}) => {
  return (
    <>
      <circle
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`transition duration-500 fill-current cursor-pointer ${isActive ? 'text-blue' : ''}`}
        cx={cx}
        cy={cy}
        r="8"
        fillOpacity="0.65"
      />
      <circle
        className={`transition duration-500 fill-current text-blue pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
        cx={cx}
        cy={cy}
        r="16"
        fillOpacity="0.25"
      />
    </>
  );
};

export default DepartmentSVGFragment;
