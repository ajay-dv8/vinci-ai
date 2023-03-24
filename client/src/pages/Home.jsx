import React, { useEffect, useState } from 'react';
import './bg.css'
import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

   const fetchErrMsg = document.getElementById('img_fetch_fail');
   const showErrMsg = () => {
    fetchErrMsg.style.display = "flex";
   }

  const searchLabel = document.getElementById('search_label');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled >= 170) {
      searchLabel.style.display = 'none';
    } else if (scrolled < 170) {
      searchLabel.style.display = 'flex';
    } 
  })

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://vinci.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      showErrMsg();
     /*alert(err);*/
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto bg-[#F5F5F5] rounded-lg py-5 px-5">
      <div className='flex justify-center items-center w-full flex-col'>
        <h1 className="flex justify-center items-center font-extrabold text-[2.5rem] text-shadow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent background-animate">The Community Gallery</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[37.5rem]">Browse through a collection of imaginative and visually stunning images generated by VINCI AI</p>
      </div>

      <div className="mt-16 sticky top-20 z-20 w-full pl-4 pr-4">
        <p id='search_label' className='text-[0.9rem] text-gray-800 font-bold'>Search posts</p>
        <FormField
          type="text"
          name="text"
          placeholder="Search for..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
          ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for :<span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
          
      <div id='img_fetch_fail' className='w-full justify-center items-center flex-col hidden'>
        <p className='text-[3rem] font-bold opacity-50'>failed to fetch images,</p>
        <p className='text-[1rem] font-bold opacity-60'>trying again...</p>
      </div>

      </div>
    </section>
  );
};

export default Home;
