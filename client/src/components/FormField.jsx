import React from 'react';
import '../pages/bg.css'

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div className='flex flex-col'>

    <div className="mb-1 flex items-center gap-2 rounded-md">
       <label
        htmlFor={name}
      >
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 background-animate font-semibold text-xs  py-1 px-2 rounded-[5px] text-white hover:opacity-50 shadow"
        > Surprise me </button>
      )}
    </div>

    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow focus:ring-[#6469ff] focus:border-[#6469ff] block outline-none w-full p-3 bg-opacity-50"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />


  </div>
);

export default FormField;
