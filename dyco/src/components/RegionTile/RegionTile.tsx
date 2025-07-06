import React, { FC } from 'react';

interface Props {
  name?: string;
  phone?: string;
  email: string;
  mobilePhone?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const RegionTile: FC<Props> = ({
  name,
  phone,
  email,
  mobilePhone,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex flex-col items-start space-y-1.5 py-4 px-4 rounded hover:bg-map-enabled
      hover:bg-opacity-5 border border-transparent hover:border-map-enabled hover:border-opacity-20 transition"
    >
      {name ? (
        <p className="text-body-18 lg:text-body-20 font-medium">{name}</p>
      ) : null}
      {phone ? (
        <a className="text-body-14 hover:underline" href={`tel:${phone}`}>
          {phone}
        </a>
      ) : null}
      {mobilePhone ? (
        <a className="text-body-14 hover:underline" href={`tel:${mobilePhone}`}>
          {mobilePhone}
        </a>
      ) : null}
      <a
        className="text-body-14 text-primary hover:underline"
        href={`mailto:${email}`}
      >
        {email}
      </a>
    </div>
  );
};

export default RegionTile;
