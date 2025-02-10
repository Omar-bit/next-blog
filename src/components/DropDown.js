'use client';

import { useState } from 'react';

function DropDown({ header, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=' relative w-full'>
      <div onClick={() => setIsOpen((prev) => !prev)}>{header}</div>
      {isOpen && (
        <div className=' absolute  left-0 border w-full mt-1 bg-white text-black p-2'>
          {children}
        </div>
      )}
    </div>
  );
}

export default DropDown;
