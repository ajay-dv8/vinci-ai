import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bg.css'
import { preview, download } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import Footer from '../components/Footer'; 
import { downloadImage } from '../utils';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const show_msg_div = document.getElementById('show_msg');
  const show_msg = () =>{
    show_msg_div.style.display = 'flex';
  }

  const handleNav = () => { navigate('/') };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://vinci.onrender.com/api/v1/vinci', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();
        setForm({ ...form, photo: `data:image/png;base64,${data.photo}` })
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://vinci.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        show_msg();
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Enter a proper prompt to generate image');
    }
  };

  return (
    <>
    <section className="max-w-8xl mx-auto flex flex-col justify-center items-center bg-[#F5F5F5] rounded-lg py-5 px-5">
      
      <div  className='flex items-center flex-col'>
        <h1 className="font-extrabold text-gray-900 text-[2.5rem] text-shadow">Generate</h1>
        <p className="flex items-center mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image with VINCI and share it with the community</p>
      </div>

      <form className="mt-16 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            type="text"
            name="name"
            placeholder="Name: E.g. Nitha"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

        <div className='flex justify-center items-center mb-10 w-full'>
          <button
            type="button"
            onClick={generateImage}
            className="w-full flex justify-center items-center text-white bg-green-700 font-medium rounded-md text-sm sm:w-auto px-20 py-2.5 text-center shadow hover:bg-green-800"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="flex justify-center w-full">
          <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 max-w-[50%] p-3 flex justify-center items-center sm:w-full">
            { form.photo ? (
              <>
              {/* FIX DOWNLOAD BUTTON* 
              <button type="button" onClick={() => downloadImage(photo)} className="outline-none bg-black border-none flex flex-row text-black text-[0.625rem] rounded-[1rem] absolute">
                <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
              </button>
              */}
              <img 
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />

              </>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute flex justify-center items-center rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        </div>

        <div className="mt-10 flex items-center justify-center flex-col">
          <p className="mt-2 text-[#666e75] text-[14px]">You can share the image you generate with the community and also download any image from the gallery</p>
          <button
            type="submit"
            className="mt-3 text-white bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center background-animate hover:opacity-50 shadow"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>

          <div id='show_msg' className="flex-col mt-6 w-full justify-center items-center hidden">
            <p className='text-[#666e75]'>Image has been successfully shared with community gallery</p>
            <button type='button' onClick={handleNav}
              className='mt-3 text-white bg-green-700 font-medium rounded-md text-sm w-[50%] sm:w-auto px-5 py-2.5 text-center shadow'>
                  Go back to Gallery
            </button>
          </div>
        </div>
      </form>
    </section>

    <footer>
      <Footer/>
    </footer>
</>
  );
};

export default CreatePost;
