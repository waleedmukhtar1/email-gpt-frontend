import React, { useState } from 'react';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    recipient_email: '',
    body: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage('');
    try {
      const response = await fetch('https://7a3a-103-157-88-21.ngrok-free.app/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.all_queries, "responce")
        setResponseMessage(result.all_queries);
      } else {
        setResponseMessage(`Failed to send email: ${result.error}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="recipient_email"
            name="recipient_email"
            value={formData.recipient_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default EmailForm;
