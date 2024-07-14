import React from 'react';


function Home() {
  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 px-4 md:px-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Nav Vikas</h1>
        <p className="text-xl md:text-2xl mb-8">Empowering Communities, One Health Camp at a Time</p>
        <button className="bg-white text-blue-500 hover:bg-gray-200 font-bold py-2 px-4 rounded">
          <a href="http://localhost:5173/login">EXPLORE</a>
        </button>
      </header>

      <section className="bg-gray-100 py-16">
        <div className='contain'>
        <div className="container mx-auto text-center">
          <h2 className="text-blue-500 md:text-5xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-4 border-black">
              <h3 className="text-white text-xl font-bold mb-4">Stay Connected</h3>
              <p className="text-white">Stay connected and informed about upcoming health camps near you with our comprehensive updates.</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-4 border-black">
              <h3 className="text-white text-xl font-bold mb-4">Blood Donation</h3>
              <p className="text-white">Facilitating connections between patients in urgent need of blood and nearby donors, ensuring timely assistance.</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-4 border-black">
              <h3 className="text-white text-xl font-bold mb-4">Doctor Appointments</h3>
              <p className="text-white">Facilitating personalized doctor appointment bookings tailored to your preferences.</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Contact Us</h2>
          <p className="text-xl md:text-2xl mb-8">If you have any questions or inquiries, feel free to reach out to us.</p>
          <button className="bg-white text-blue-500 hover:bg-gray-200 font-bold py-2 px-4 rounded">Contact Us</button>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 Nav Vikas. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
