import uberLogo from '../assets/uberLogo.svg'
import mapImage from '../assets/mapImage.png'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'


const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '73%',
        padding: '20px'
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0',
        padding: '0px'
      })
    }
  }, [panelOpen])


  return (
    <div className='relative h-screen overflow-hidden'>
      {/* Background map image */}
      <div className='absolute h-screen w-screen'>
        <img src={mapImage} />
      </div>

      {/* Uber Logo */}
      <div className='absolute top-0 left-3'>
        <img src={uberLogo} className='w-15' />
      </div>

      <div className='opacity flex flex-col justify-end absolute top-0 h-screen w-full'>
        {/* Find a trip (panel) */}
        <div className='bg-white p-4 h-[27%]'>
          {!panelOpen ? <div className='text-lg font-medium antialiased my-1'>Find a trip</div>
            : <div className='text-lg font-medium antialiased my-1' onClick={() => setPanelOpen(false)}>
              <i className="ri-arrow-down-s-line"></i>
            </div>}

          <input
            type="text"
            placeholder='Add a pick-up location'
            onClick={() => setPanelOpen(true)}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className='bg-[#eeeeee] border-slate-300 text-sm my-2 w-full h-10 p-3 rounded indent-10'
          />
          <input
            type="text"
            placeholder='Enter your destination'
            onClick={() => setPanelOpen(true)}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className='bg-[#eeeeee] border-slate-300 text-sm my-2 w-full h-10 p-3 rounded indent-8'
          />
        </div>

        {/* location option */}
        <div className='bg-white' ref={panelRef}>
            <LocationSearchPanel />
        </div>
      </div>
    </div>
  )
}

export default Home