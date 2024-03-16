import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if Name and Email are provided
    if (!formData.name || !formData.email) {
      alert('Please provide Name and Email.');
      return;
    }

    try {
      // Submit form data to Google Apps Script web app endpoint
      const response = await fetch('https://script.google.com/a/macros/iiita.ac.in/s/AKfycbxAc4ouULhUV9ZxyvFLAQYkN45nNHtno4l9G3JR-BnpfrHGauZUEzjmJKkt9HEFf4r0/exec', {
        
      method: 'POST',
      mode:'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          description: ''
        });

        // Set form submission status to true
        setFormSubmitted(true);
      } else {
        throw new Error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name<span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                name="name"
                required 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email"
                required 
                value={formData.email} 
                onChange={handleInputChange} 
              />
            </div>
            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone No</label>
              <input 
                type="tel" 
                className="form-control" 
                id="phone" 
                name="phone"
                value={formData.phone} 
                onChange={handleInputChange} 
              />
            </div>
            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea 
                className="form-control" 
                id="description" 
                name="description"
                rows="6" 
                value={formData.description} 
                onChange={handleInputChange} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {/* Form submission status */}
            {formSubmitted && <p className="mt-3 text-success">Form submitted successfully!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
