import React, { FC, useState } from 'react';

interface Props {
  name: string;
  email: string;
  isActive?: boolean;
  addresLine1: string;
  addresLine2: string;
  phoneNumber: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const DepartmentTile: FC<Props> = ({
  name, email, onMouseEnter, onMouseLeave, isActive,
  addresLine1, addresLine2, phoneNumber,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isActiveState = isHovered || isActive;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.();
  };

  return (
    <a
      href={`mailto:${email}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-col justify-center items-start space-y-1.5 py-4 px-4 rounded border border-transparent transition ${isActiveState ? 'bg-map-enabled bg-opacity-5 border-map-enabled border-opacity-20' : ''}`}
    >
      <p className="text-body-18 lg:text-body-20 font-medium">{name}</p>
      <p className="text-body-16 font-medium">{addresLine1}</p>
      <p className="text-body-16 font-medium">{addresLine2}</p>
      <p className="text-body-16 font-medium">{phoneNumber}</p>
      <p className="text-body-14 lg:text-body-16 text-blue font-bold mt-2.5">{email}</p>
    </a>
  );
};

export default DepartmentTile;
