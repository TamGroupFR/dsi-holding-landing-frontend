/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';

interface ManageCookiesRadioProps {
  title: string;
  description: string;
  onClick: () => void;
  isChecked: boolean;
}

const ManageCookiesRadio: FC<ManageCookiesRadioProps> = ({
  title, description, onClick, isChecked,
}) => {
  const id = title.toLowerCase();

  return (
    <div className="relative">
      <input type="radio" readOnly id={id} name="cookie" className="peer invisible absolute" checked={isChecked} />
      <label
        onClick={onClick}
        onKeyDown={onClick}
        className="
          block border p-6 pr-24 cursor-pointer peer-checked:bg-primary peer-checked:border-primary
          peer-checked:text-white transition duration-200 after:transition after:duration-200
          after:block after:absolute after:w-8 after:h-8 after:top-1/2 after:translate-y-[-50%]
          after:right-6 after:bg-[rgb(255,255,255)] hover:after:bg-[rgb(151,151,151)]
          peer-checked:after:bg-white after:rounded-full after:border
          after:shadow-[inset_0_0_0_7px_rgb(2555,255,255)] peer-checked:after:shadow-[inset_0_0_0_7px_rgb(201,40,54)]
        "
      >
        <h3 className="font-semibold mb-2 text-body-20">{title}</h3>
        <p className="text-body-14">{description}</p>
      </label>
    </div>
  );
};

export default ManageCookiesRadio;
