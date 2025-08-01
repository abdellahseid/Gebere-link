import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaLeaf,
  FaShoppingCart,
  FaTruck,
  FaMobile,
  FaChartLine,
  FaUserTie,
  FaPhoneAlt,
  FaMobileAlt,
  FaExchangeAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaApple,
  FaGooglePlay,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { GiFarmer } from 'react-icons/gi';
import { BsArrowRight } from 'react-icons/bs';

// Import images
import LogoImage from '../assets/logo3.png';
import HeroImage from '../assets/hero1.jpg';
import EconomyImage from '../assets/economy.jpg';
import TrackterImage from '../assets/tracker.jpg';
import TransparencyImage from '../assets/transparency.jpg';

const LandingPage = ({ darkMode }) => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  // Features data
  const features = [
    {
      icon: <FaExchangeAlt className="text-4xl text-green-600" />,
      title: "ቀጥተኛ የገበያ መዳረሻ",
      description: "ገበሬዎች ምርቶቻቸውን በቀጥታ ይዘረዝራሉ፣ የግብይት ወጪ ይቀንሳል እና ትርፋማነት ይጨምራል።"
    },
    {
      icon: <FaChartLine className="text-4xl text-green-600" />,
      title: "በቀጥታ የገበያ መረጃ",
      description: "የዋጋ እና የፍላጎት ኢኮኖሚያችንን በቀጥታ ማወቅ በጥቅም ላይ ሊውል የ ሚችል ውሳኔ ለመወሰን  ያስችላል።"
    },
    {
      icon: <FaTruck className="text-4xl text-green-600" />,
      title: "የሎጂስቲክስ ድጋፍ",
      description: "ጥራት ያለው አቅርቦት እና የአቅርቦት ሰንሰለት ስለሚፈጥር ውጤታማነትን ያሻሽላል።"
    },
    {
      icon: <FaMobile className="text-4xl text-green-600" />,
      title: "የብዙ መድረክ ድጋፍ",
      description: "ሞባይል፣ ታብሌት እና ዴስክቶፕ የመሳሰሉ ብዙ መድረኮችን ይደግፋል።"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "የGebre-Link አገልግሎት እንዴት ይሰራል?",
      answer: "Gebre-Link ገበሬዎችን እና ነጋዴዎችን በቀጥታ የሚያገናኝ የዲጂታል መድረክ ነው።"
    },
    {
      question: "ለገበሬዎች የሚያገኙት ጥቅም ምንድን ነው?",
      answer: "ገበሬዎች ምርቶቻቸውን በተሻለ ዋጋ ለመሸጥ ይችላሉ።"
    },
    {
      question: "ለነጋዴዎች የሚያገኙት ጥቅም ምንድን ነው?",
      answer: "ነጋዴዎች በቀጥታ ከገበሬዎች ጋር በመገናኘት ዋጋ ማጣራት ይችላሉ።"
    },
    {
      question: "የሞባይል መተግበሪያውን እንዴት እንውረድ?",
      answer: "Gebre-Link መተግበሪያ በ Google Play Store እና App Store ይገኛል።"
    },
    {
      question: "ገበሬ መሆን የሚፈልግ ሰው ምን መሰረዝ አለበት?",
      answer: "ገበሬ መሆን የሚፈልግ ሰው የመመዝገቢያ ቅጽ ከማሙላ ጀምሮ ማረጋገጫ መስጠት አለበት።"
    },
    {
      question: "የግብይት አስተዳደር እና ክፍያ ስርዓት እንዴት ይሰራል?",
      answer: "የክፍያ ስርዓት በደህንነቱ የተጠበቀ ነው፣ እና ግብይቶቹ በቀጥታ ይከናወናሉ።"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    try {
      const response = await fetch("https://formspree.io/f/xzzvvpbk", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="font-sans bg-white">
      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py- flex justify-between items-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex items-center cursor-pointer"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            role="link"
            tabIndex={0}
            aria-label="Go to homepage"
          >
            <img 
              src={LogoImage}
              alt="Gebre-Link Logo" 
              className="h-20 w-auto" 
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['features', 'economic', 'transparency', 'supply-chain', 'mobile', 'faq', 'contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                whileHover={{ scale: 1.05, color: '#16a34a' }}
                className="text-gray-700 font-medium capitalize"
              >
                {item.replace('-', ' ')}
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              onClick={handleGetStarted}
            >
              ግባ
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={handleGetStarted}
            >
              ይመዝገቡ
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {['features', 'economic', 'transparency', 'supply-chain', 'mobile', 'faq', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg"
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
              <div className="flex space-x-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  onClick={handleGetStarted}
                >
                  ግባ
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  ይመዝገቡ
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <div id="home" className="relative bg-gradient-to-b from-green-50 to-white overflow-hidden pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-12 lg:mb-0"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                ቀጥተኛ የግብርና ንግድ ግንኙነት
                <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  በገበሬዎች እና በነጋዴዎች
                </span>{' '}
                መካከል።
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 mb-8 max-w-lg"
              >
                የእኛ ፈጠራ የግብርና ቴክኖሎጂ መድረክ ከተማ ውስጥ የሚገኙ ገበሬዎችን ከነጋዴዎች ጋር አብሮ በተሰራ ማረጋገጫና ሎጂስቲክስ ባለው ደህንነቱ የተጠበቀና ግልጽ የገበያ መድረክ መፍጠር ነው።
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-lg transition-all"
                  onClick={handleGetStarted}
                >
                  <GiFarmer className="mr-2" />
                  ይጀምሩ
                  <BsArrowRight className="ml-2" />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={HeroImage}
                  alt="Farmer and consumer connecting"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Enhanced 7070 Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-green-600 rounded-xl p-6 shadow-lg flex items-center justify-between max-w-4xl mx-auto"
          >
            <div className="flex items-center">
              <motion.div
                animate={pulseAnimation}
                className="bg-white/20 backdrop-blur-sm p-4 rounded-full mr-6"
              >
                <FaPhoneAlt className="text-white text-4xl" />
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">7070 በነፃ ስልክ መስመራችን መደወል  ይችላሉ!</h3>
                <p className="text-green-100 text-lg">ለማንኛውም ጥያቄ ወይም ድጋፍ በነፃ ይደውሉልን። 24/7 አገልግሎት እንሰጣለን! </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              ይደውሉ አሁን
              <BsArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                ዋና ዋና ባህሪያት
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              የእኛ ድህረ ገፅ  ለገበሬዎች እና ለነጋዴዎች የተለያዩ ወሳኝ የሆኑ መረጃዋችን ያቀርባል።
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Empowerment Section */}
      <section id="economic" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 lg:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  ኢኮኖሚያዊ ኃይል
                </span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                የእኛ ፕላትፎርም ገበሬዎች በቀጥታ ወደ ገበያ መዳረሻ እና በቀጥታ የገበያ መረጃ በመስጠት ኢኮኖሚያዊ እድሎቻቸውን በከፍተኛ ሁኔታ ያሳድጋል።
              </p>
              <p className="text-lg text-gray-700 mb-6">
                መካከለኛ ሰዎችን (ደላሎችን) በማስወገድ ገበሬዎች ምርቶቻቸውን እንዲሸጡና ተጨማሪ ትርፍ እንዲያገኙ ይረዳል።
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={EconomyImage}
                  alt="Farmer counting money"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section id="transparency" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 lg:mb-0 order-last lg:order-first"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={TransparencyImage}
                  alt="Transparent food supply chain"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 lg:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  ግልጽነት
                </span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                የእኛ ፕላትፎርም በገበሬዎች እና በሸማቾች መካከል የሚፈጠረውን እምነት በማጎልበት ግልጽ የሆኑ ግብይቶችን ያረጋግጣል።
              </p>
              <p className="text-lg text-gray-700 mb-6">
                ገበሬዎች ዝርዝር መግለጫዎችን እና ማረጋገጫዎችን ማጋራት ይችላሉ፣ ምን ስለ የግብርና ልምዶቻቸው እና ስለ ምርት ጥራት ግንዛቤ ይሰጣል።
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supply Chain Section */}
      <section id="supply-chain" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              ቀለል ያለ የምርት አቀራረብ

              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              የእኛ ፕላትፎርም ባህላዊውን የምርት አቅርቦት ስርዓት በመቀየር፣ ምርት ከእርሻው እስከ ገበታ የሚደርስበትን ጉዞ ያቀላጥፋል።
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                   src={TrackterImage}
                  alt="Traditional supply chain"
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-md">
                  ባህላዊ ይዘት
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      {/* Mobile App Section */}
      <section id="mobile" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Gebre-Link የሞባይል መተግበሪያ
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ችሎታዎችን በቀጥታ ከአካባቢያዊ ገበሬዎች ያግኙ። ከተጫኑ ገበሬዎች ጋር በቀጥታ ይገናኙ፣ በቀጥታ የገበያ መረጃ ያግኙ።
            </p>
          </motion.div>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
<div className="relative max-w-md mx-auto">
  <div className="absolute -top-6 -left-6 z-0 w-32 h-32 bg-green-400/20 rounded-full blur-xl"></div>
  <div className="absolute -bottom-6 -right-6 z-0 w-32 h-32 bg-green-600/20 rounded-full blur-xl"></div>
  <div className="relative z-10 flex gap-6 justify-center">
    <div className="flex flex-col gap-6">
      <div className="w-36 h-72 bg-white rounded-3xl shadow-lg border-2 border-green-200 flex items-center justify-center overflow-hidden">
     
        <img src="/mobilelogo.png" alt="App Screenshot 1" className="w-full h-full object-cover" />
      </div>
      <div className="w-36 h-72 bg-white rounded-3xl shadow-lg border-2 border-green-200 flex items-center justify-center overflow-hidden ml-8">

        <img src="/mobileaccount.png" alt="App Screenshot 3" className="w-full h-full object-cover" />
      </div>
    </div>
    <div className="w-36 h-72 bg-white rounded-3xl shadow-lg border-2 border-green-200 flex items-center justify-center overflow-hidden mt-12">

      <img src="/mobilefarmer.png" alt="App Screenshot 2" className="w-full h-full object-cover" />
    </div>
  </div>
</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">የመተግበሪያ ባህሪያት</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>ቀጥተኛ የገበያ መዳረሻ ለገበሬዎች</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>በቀጥታ የገበያ ዋጋ እና የፍላጎት መረጃ</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>ደህንነቱ የተጠበቀ የክፍያ ስርዓት</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">አሁን ያውርዱ</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href="/coming-soon"
                      className="flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-md transition-all"
                    >
                      <FaApple className="text-xl mr-2" />
                      <div className="text-left">
                        <p className="text-xs">Download on the</p>
                        <p className="text-lg font-semibold">App Store</p>
                      </div>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href="/coming-soon"
                      className="flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-md transition-all"
                    >
                      <FaGooglePlay className="text-xl mr-2" />
                      <div className="text-left">
                        <p className="text-xs">Get it on</p>
                        <p className="text-lg font-semibold">Google Play</p>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                ተደጋጋሚ ጥያቄዎች
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              የቡድናችን ሰራተኞች ከተጠየቁ በጣም ብዙ ጥያቄዎች መካከል አንዳንዶቹን መረጡ።
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
                >
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-green-600 transition-transform ${activeFAQ === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: activeFAQ === index ? 'auto' : 0, opacity: activeFAQ === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100 rounded-b-lg">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                እኛን ያግኙን
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ለማንኛውም ጥያቄ ወይም ድጋፍ እኛን ለመገናኘት ነፃነት ይሰማዎ።
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">መልእክት ይላኩልን</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ስም</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="ስምዎን ያስገቡ"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ኢሜይል</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="ኢሜይልዎን ያስገቡ"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">መልእክት</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="መልእክትዎን ያስገቡ"
                      required
                    ></textarea>
                  </div>
                  
                  {/* Status messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                      መልእክትዎ በትክክል ተልኳል! በቅርቡ እንገናኝዎታለን።
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                      ስህተት ተፈጥሯል። እባክዎ ቆይተው እንደገና ይሞክሩ።
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className={`w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors ${
                      submitStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitStatus === 'submitting' ? 'በመላክ ላይ...' : 'መልእክት ላክ'}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">የእውቂያ መረጃ</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaPhoneAlt className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">ስልክ</h4>
                      <p className="text-gray-600">+251 123 456 789</p>
                      <p className="text-gray-600">7070 (ነፃ ጥሪ)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">ኢሜይል</h4>
                      <p className="text-gray-600">hanifasedhanni@gmail.com</p>
                      <p className="text-gray-600">turabturab@gmailcom</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">አድራሻ</h4>
                      <p className="text-gray-600">ቁጥር 123, አዲስ አበባ, ኢትዮጵያ</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Hidden on mobile */}
      <footer className="hidden md:block bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center mb-4">
                <FaLeaf className="h-8 w-8 text-green-400" />
                <span className="ml-2 text-2xl font-bold">Gebre-Link</span>
              </div>
              <p className="text-gray-400 mb-6">
                የእኛ ፕላትፎርም ገበሬዎችን እና ነጋዴዎችን በቀጥታ የሚያገናኝ ሲሆን የተሻለ የግብርና ኢኮኖሚ ለመፍጠር ያለመ አላማ አለን።
              </p>
            </motion.div>
            {[
              { title: 'መነሻ', items: ['ስለ እኛ', 'ባህሪያት', 'መተግበሪያ'] },
              { title: 'ለገበሬዎች', items: ['እንዴት ይሰራል', 'የመመዝገቢያ ሂደት'] },
              { title: 'ለነጋዴዎች', items: ['እንዴት ይሰራል', 'የመመዝገቢያ ሂደት'] }
            ].map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">{link.title}</h3>
                <ul className="space-y-3">
                  {link.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Gebre-Link. ሁሉም መብቶች የተጠበቁ ናቸው.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;