// frontend/src/OTPTest.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPTest = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      toast.error('Phone number is required');
      return;
    }

    setIsLoading(true);
    try {
    const response = await axios.post('http://localhost:3000/api/otp/send', {
  phoneNumber
});

      toast.success(response.data.message_am || response.data.message);
      setIsOTPSent(true);
    } catch (error) {
      toast.error(error.response?.data?.error_am || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error('OTP is required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/otp/verify', {
        phoneNumber,
        otp
      });
      
      if (response.data.verified) {
        toast.success(response.data.message_am || response.data.message);
        setIsVerified(true);
      } else {
        toast.error(response.data.message_am || response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error_am || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>የGebere-Link OTP ፈተና</h2>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>ስልክ ቁጥር (+251...):</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.input}
          placeholder="+251912345678"
          disabled={isOTPSent}
        />
      </div>

      {!isOTPSent ? (
        <button 
          onClick={handleSendOTP} 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'በመላክ ላይ...' : 'OTP ላክ'}
        </button>
      ) : (
        <>
          <div style={styles.inputGroup}>
            <label style={styles.label}>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
              placeholder="123456"
            />
          </div>
          
          <button 
            onClick={handleVerifyOTP} 
            style={styles.button}
            disabled={isLoading || isVerified}
          >
            {isLoading ? 'በፍተና ላይ...' : 'OTP ፈትን'}
          </button>
        </>
      )}

      {isVerified && (
        <div style={styles.successMessage}>
          ✅ ስልክ ቁጥርዎ ተረጋግጧል!
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '1.5rem'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '1rem'
  },
  successMessage: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#2ecc71',
    color: 'white',
    borderRadius: '4px',
    textAlign: 'center'
  }
};

export default OTPTest;