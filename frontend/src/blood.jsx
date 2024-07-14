import React, { useState, useEffect } from 'react';

function Blood() {
    const [location, setLocation] = useState('');
    const [timing, setTiming] = useState('');
    const [date, setDate] = useState('');
    const [blood, setBlood] = useState('');
    const [unit,setUnit]=useState('');
    const [bloodCamps, setBloodCamps] = useState([]);

    useEffect(() => {
        fetchCamps();
    }, []);

    const fetchCamps = async () => {
        try {
            const response = await fetch('http://localhost:5000/getcamp');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const campsData = await response.json();
            setBloodCamps(campsData);
        } catch (error) {
            console.error('Error fetching camps:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(location, timing, date, blood,unit);

        const formData = {
            location,
            timing,
            date,
            blood,
            unit
        };
        
        try {
            const response = await fetch('http://localhost:5000/blood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.error === 'Duplicate data found') {
                window.alert('Already Requested');
            } else {
                window.alert('Data saved successfully!');
                fetchCamps();
            }
        } catch (error) {
            window.alert('Error saving data: ' + error.message);
            console.error('Error sending form data:', error);
        }

        setLocation('');
        setDate('');
        setTiming('');
        setBlood('');
        setUnit('');
    };

    const handleDeleteCamp = async (campId) => {
        try {
            const response = await fetch(`http://localhost:5000/deletecamp/${campId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setBloodCamps(prevCamps => prevCamps.filter(camp => camp._id !== campId));
            window.alert("Data deleted successfully!!");
            fetchCamps();
        } catch (error) {
            console.error('Error deleting camp:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col gap-4 mb-4">
                <h1 className="text-2xl font-bold">Request Blood</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="location" className="text-sm font-medium">Location:</label>
                        <select
                            id="location"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="rounded-md border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                        >
                            {/* <option value="">Select location...</option>
                            <option value="Bengaluru Urban">Bengaluru Urban</option> */}
                            <option value="">Select location...</option>
                            <option value="Bengaluru Urban">Bengaluru Urban</option>
                            <option value="Bengaluru Rural">Bengaluru Rural</option>
                            <option value="Bidar">Bidar</option>
                            <option value="Chikkamagaluru">Chikkamagaluru</option>
                            <option value="Dharwad">Dharwad</option>
                            <option value="Haveri">Haveri</option>
                            <option value="Mandya">Mandya</option>
                            <option value="Shivamogga">Shivamogga</option>
                            <option value="Vijayanagara">Vijayanagara</option>
                            <option value="Yadgiri">Yadgiri</option>
                            <option value="Ramanagara">Ramanagara</option>
                            <option value="Koppala">Koppala</option>
                            <option value="Hassan">Hassan</option>
                            <option value="Davanagere">Davanagere</option>
                            <option value="Chikkaballapura">Chikkaballapura</option>
                            <option value="Ballary">Ballary</option>
                            <option value="Bagalkote">Bagalkote</option>
                            <option value="Belagavi">Belagavi</option>
                            <option value="Chamarajanagara">Chamarajanagara</option>
                            <option value="Dakshina Kannada">Dakshina Kannada</option>
                            <option value="Kalaburagi">Kalaburagi</option>
                            <option value="Kolara">Kolara</option>
                            <option value="Raichur">Raichur</option>
                            <option value="Udupi">Udupi</option>
                            <option value="Uttara Kannada">Uttara Kannada</option>
                            <option value="Tumakuru">Tumakuru</option>
                            <option value="Mysuru">Mysuru</option>
                            <option value="Kodagu">Kodagu</option>
                            <option value="Gadag">Gadag</option>
                            <option value="Chitradurga">Chitradurga</option>
                            <option value="Vijayapura">Vijayapura</option>
                            {/* Add all the other options here */}
                        </select>
                        <label htmlFor="date" className="text-sm font-medium">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="rounded-md border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                        />
                        <label htmlFor="timing" className="text-sm font-medium">Timing:</label>
                        <input
                            type="text"
                            id="timing"
                            name="timing"
                            value={timing}
                            onChange={(e) => setTiming(e.target.value)}
                            className="rounded-md border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                        />
                        <label htmlFor="blood" className="text-sm font-medium">Blood</label>
                        <input
                            type="text"
                            id="blood"
                            name="blood"
                            value={blood}
                            onChange={(e) => setBlood(e.target.value)}
                            className="rounded-md border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                        />
                        <label htmlFor="unit" className="text-sm font-medium">Units:</label>
                        <select
                            id="unit"
                            name="unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className="rounded-md border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                        >
                            {/* <option value="">Select location...</option>
                            <option value="Bengaluru Urban">Bengaluru Urban</option> */}
                            <option value="">Select number of units...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            
                            {/* Add all the other options here */}
                        </select>
                    </div>
                    <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                        Submit
                    </button>
                </form>
            </div>

            <div className="overflow-auto rounded-md border border-gray-300 p-4">
                {/* <h2 className="text-xl font-bold mb-2">All Requests</h2> */}
                <ul>
                    {bloodCamps.map((camp) => (
                        <li key={camp._id} className="mb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p><strong>Location:</strong> {blood.location}</p>
                                    <p><strong>Date:</strong> {blood.date}</p>
                                    <p><strong>Timing:</strong> {blood.timing}</p>
                                    <p><strong>Blood:</strong> {blood.blood}</p>
                                    <p><strong>Unit:</strong>{blood.unit}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteCamp(camp._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Blood;
