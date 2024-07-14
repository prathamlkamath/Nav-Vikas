import React from "react"
import '../style.css'
import { Link } from "react-router-dom"


 const Navbar = () => {

    return(

        <div>
            <header>
                
                <div className="nav">
                    <ul>
                        <h1>Varnautsava-2023</h1>
                        <li>
                            <Link to="/">Registration Form</Link>
                        </li>
                        <li>
                        <a href="/ui.html">Admin</a>
                        </li>

                     </ul>
      
                </div>
            </header>
        </div>
    )
}

export default Navbar

