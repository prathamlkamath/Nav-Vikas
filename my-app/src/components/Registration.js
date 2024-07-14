import React, { useEffect, useRef, useState } from "react"

export const Registration = () => {
    const[formValue,setFormValue] =useState({name:'', college:'',email :'', usn:'',contact: '' })
    const[formError,setError] =useState({})
    const[isSubmit,setIsSubmit] = useState(false)
    const formRef = useRef();
    
    // const[checkBoxInfo,setCheckBoxInfo] =useState([])

   // function to handle input data 
    const handleChange =(event) =>{
        const {name,value} =event.target;
        setFormValue({...formValue,[name]:value})
        // console.log(formValue)
       
       
    }
// function to handle submit form data
   const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formValue);
     setError(errors);
     setIsSubmit(true);  
    if (Object.keys(errors).length === 0) {
        try {
          const response = await fetch("http://localhost:3001/registration/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formValue),
          });
    
          if (response.ok) {
            alert("Form data submitted successfully");
    
            // Clear form fields after successful submission
            formRef.current.reset();
    
            console.log("success");
          } else {
            alert("Failed to submit form data");
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    
   }



// function to validate the input fields
   const validateForm = (values) => {
    const error={};
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const NumberRegex = /^[6-9]\d{9}$/;
    if(!values.name){
        error.name =' Name is required'
    }
    if(!values.college){
        error.college ='college Name is required'
    }
    if(!values.contact){
        error.contact ='contact number is required'
    }
    if(!values.email){
        error.email="Email id is required "
    } 
    if(!values.usn){
        error.usn="USN is required"
    }
    if(!regex.test(values.email)){
        error.email='Provide valid email id'
    }
    else if(!NumberRegex.test(values.contact)){
        error.contact='Provide valid mobile number'
    }

    return error
   }



    return(
        <div className="container" >
                    {/* {Object.keys(formError).length === 0 && isSubmit ? (
        <div className="reg"> Registration successfull </div>
       ) :null } */}
            <form ref={formRef} >
            <h2 style={{textAlign:'center'}}>Registration Form</h2>
            <div className="ui divider"></div>
            <div className="ui form">
            <div className="field">

            <label>Student Name: </label>
            <input type="text" name='name' placeholder="Enter your First Name" onChange={handleChange} autoComplete="off"></input>
            </div>
            <p>{formError.name}</p>
            <br/>

            <div className="field">
            <label>college: </label>
            <input type="text" name='college' placeholder="Enter your college Name" onChange={handleChange} autoComplete="off" va></input>
            </div>
            <p>{formError.college}</p>
            <br/>

            <div className="field">
            <label>Email: </label>
            <input type="text" name='email' placeholder="Enter your email id" onChange={handleChange} autoComplete="off"></input>
            </div>
            <p>{formError.email}</p>
            <br/>


            <div className="field">
            <label>USN: </label>
            <input type="text" name='usn' placeholder="Enter your USN" onChange={handleChange} autoComplete="off"></input>
            </div>
            <p>{formError.usn}</p>
            <br/>

            <div className="field">
            <label>Contact Number: </label>
            <input type="text" name='contact' placeholder="Enter your contact number" onChange={handleChange} autoComplete="off"></input>
            </div>
            <p>{formError.contact}</p>

            <br /> 
            <div>
                <button type="submit" className="submit" onClick={handleSubmit} > Submit</button>
            </div>
            
            </div>
            </form>

        </div>

    )
}