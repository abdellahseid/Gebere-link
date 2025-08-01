import { motion } from "framer-motion";
import { FaMobileAlt, FaHome } from "react-icons/fa";

export const metadata = {
  title: "በቅርቡ ይመጣል | Gebre-Link ሞባይል መተግበሪያ",
};

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="mb-10">
          {/* Animated phone icon */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-28 h-28 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-8 shadow-md"
          >
            <FaMobileAlt className="w-14 h-14 text-green-600" />
          </motion.div>

          {/* Title with gradient */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              በቅርቡ ይመጣል!
            </span>
          </h1>
          
          {/* Description */}
          <div className="space-y-4 mb-8">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Gebre-Link ሞባይል መተግበሪያችን በልማት ላይ ነው። ለእርስዎ የተሻለ የሆነ ልምድ ለማቅረብ እየተጋነን ነው!
            </p>
            <p className="text-lg text-gray-600">
              ለማስታወቂያዎች ይጠብቁ እና ስንጀምር የመጀመሪያዎቹ የመሆን እድል ያግኙ።
            </p>
          </div>
        </div>
        
        {/* Back to home button */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-lg transition-all"
        >
          <FaHome className="mr-2" />
          ወደ መነሻ ተመለስ
        </motion.a>

        {/* Countdown timer (optional) */}
        <div className="mt-12">
          <h3 className="text-gray-600 mb-4">የምንጀምርበት ቀን</h3>
          <div className="flex justify-center gap-4">
            <div className="bg-white p-3 rounded-lg shadow-md w-20">
              <div className="text-2xl font-bold text-green-600">30</div>
              <div className="text-sm text-gray-500">ቀናት</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-md w-20">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-500">ሰዓታት</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-md w-20">
              <div className="text-2xl font-bold text-green-600">45</div>
              <div className="text-sm text-gray-500">ደቂቃዎች</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}