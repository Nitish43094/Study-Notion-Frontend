import React, { useState } from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () =>{
    
    return(
        <div className="mx-auto flex flex-col items-center">
            <h1>Get in Tuch</h1>
            <p>We'd love to here for ypu, Please fill out this form</p>
            <ContactUsForm />
        </div>
    )
}

export default ContactFormSection;