import React from 'react';

const ElegantGallery = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px]">
      <div className="md:col-span-8 h-full overflow-hidden rounded-sm group cursor-pointer">
        <img src={images?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200'} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gallery 1" />
      </div>
      <div className="md:col-span-4 flex flex-col gap-4 h-full">
        <div className="flex-1 overflow-hidden rounded-sm group cursor-pointer">
           <img src={images?.[1] || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gallery 2" />
        </div>
        <div className="flex-1 overflow-hidden rounded-sm group cursor-pointer relative">
           <img src={images?.[2] || 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gallery 3" />
           {images?.length > 3 && (
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-serif text-2xl">+{images.length - 3} More</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ElegantGallery;
