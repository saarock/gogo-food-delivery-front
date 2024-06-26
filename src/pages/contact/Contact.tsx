import React, { useReducer, useState } from 'react';
import "./contact.css";
import { contactFormRedcer, initialState } from '../../reducer/contact';
import { toast } from 'react-toastify';
import { Any } from '../../types/all';
import service from '../../service/config';
import { Loader } from '../../components';

const Contact: React.FC = () => {

  const [state, dispatch] = useReducer(contactFormRedcer, initialState);
  const [loading, setLoading] = useState<boolean>(false)


  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    try {
      if (!state.email || !state.message || !state.name) {
        toast.error("All input were requried");
        return;
      }
      event.preventDefault();
      const reviews: Any = {
        name: state.name,
        email: state.email,
        message: state.message
      }
      await service.saveReviews(reviews);
      toast.success("Thank you very much for you review")

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cannot save the review")
    } finally {
      dispatch({ type: "RESET" });
      setLoading(false);

    }

  };

  return (

    <div className="gogo-contact-page">
      {loading && <Loader />}
      <div className="gogo-contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us.</p>
        <p>Email: info@example.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
      <div className="gogo-contact-form-container">
        <h3>Send us a message</h3>
        <form onSubmit={handleSubmit} className="gogo-contact-form">
          <div className="gogo-form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required onChange={(e) => dispatch({ type: "NAME", payload: e.target.value })} value={state.name} />
          </div>
          <div className="gogo-form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })} value={state.email} />
          </div>
          <div className="gogo-form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" rows={5} required onChange={(e) => dispatch({ type: "MESSAGE", payload: e.target.value })} value={state.message} />
          </div>
          <button type="submit" className="gogo-submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
