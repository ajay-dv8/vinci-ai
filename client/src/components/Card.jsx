import React, { useEffect } from 'react';
import '../pages/bg.css'
import { download } from '../assets';
import { downloadImage } from '../utils';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Card = ({ _id, name, prompt, photo }) => {

  useEffect(() => {
    AOS.init({duration: 1500});
  },[]);

  return(
  <div  data-aos="zoom-in" data-aos-delay='100' className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img loading='lazy'
      className="w-full h-auto object-cover rounded-xl "
      src={photo}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-2 rounded-md bg-opacity-40 backdrop-filter backdrop-blur-xl">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
          <p className="text-white text-sm">{name}</p>
        </div>
        <button className='text-[10px]'>del</button>
        <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none flex flex-row text-white text-[0.625rem]">
          Download <img src={download} alt="download" className="w-6 h-6 object-contain invert ml-1" />
        </button>
      </div>
    </div>
  </div>
)};

export default Card;
