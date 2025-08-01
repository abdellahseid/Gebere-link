const MagazineSection = ({ darkMode }) => {
    const articles = [
      { 
        title: "Recent Farming Practices for Wheat", 
        excerpt: "Learn about the latest techniques for wheat cultivation...",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      { 
        title: "Teff: The Super Grain", 
        excerpt: "Why teff is becoming a global sensation in healthy grains...",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      
    ];
  
    return (
      <div className={`w-full h-full p-4 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
        <h3 className="font-bold text-lg mb-4">Recent Farming Practices</h3>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-lg h-48"
            >
              {/* Background image with dark overlay at bottom */}
              <div className="absolute inset-0">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
              </div>
              
              {/* Article content */}
              <div className="relative h-full flex flex-col justify-end p-4 text-white">
                <h4 className="font-medium text-lg">{article.title}</h4>
                <p className="text-sm mt-1">{article.excerpt}</p>
                
                {/* View detail button - appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 cursor-pointer rounded-md font-medium">
                    View detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MagazineSection;