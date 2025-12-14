import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Star, Wifi, Coffee, Dumbbell, Car, Heart } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Card } from '@/components/Card/CardNew';
import { Badge } from '@/components/Badge/BadgeNew';
import { useHotels } from '@/hooks/useApi';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/contexts/ToastContext';
import { Hotel } from '@/types';
import { PageSkeleton } from '@/components/Skeleton/Skeleton';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Link } from 'react-router-dom';

export const HomeNew = () => {
  const { data: hotels, isLoading, error } = useHotels();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="w-4 h-4" />,
    breakfast: <Coffee className="w-4 h-4" />,
    gym: <Dumbbell className="w-4 h-4" />,
    parking: <Car className="w-4 h-4" />,
  };

  const filteredHotels = hotels?.filter((hotel: Hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWishlistToggle = (e: React.MouseEvent, hotelId: number, hotelName: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(hotelId);
    const inWishlist = isInWishlist(hotelId);
    showToast(
      inWishlist ? `Removed ${hotelName} from wishlist` : `Added ${hotelName} to wishlist`,
      inWishlist ? 'info' : 'success'
    );
  };

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hotel.jfif')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="relative container-custom py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-12">
              Discover exceptional hotels and resorts for your next adventure
            </p>

            {/* Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-6 md:p-8 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <Input
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    leftIcon={<MapPin className="w-5 h-5" />}
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="Check-in"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    leftIcon={<Calendar className="w-5 h-5" />}
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="Check-out"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    leftIcon={<Calendar className="w-5 h-5" />}
                  />
                </div>
                <div>
                  <Button fullWidth size="lg" leftIcon={<Search className="w-5 h-5" />}>
                    Search
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="container-custom py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Featured Hotels
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Handpicked accommodations for unforgettable experiences
            </p>
          </div>
          <Input
            placeholder="Search hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
            className="max-w-xs"
          />
        </div>

        {error && (
          <EmptyState
            icon="error"
            title="Failed to load hotels"
            description="We couldn't fetch the hotels. Please try again later."
            action={<Button onClick={() => window.location.reload()}>Retry</Button>}
          />
        )}

        {!error && filteredHotels?.length === 0 && (
          <EmptyState
            icon="search"
            title="No hotels found"
            description="Try adjusting your search or filters"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels?.map((hotel: Hotel, index: number) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={`/hotels/${hotel.id}`}>
                <Card variant="hover" className="overflow-hidden p-0 h-full">
                  <div className="relative h-56 overflow-hidden group">
                    <img
                      src={hotel.imageUrl || '/hotel.jfif'}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge variant="success" className="bg-white/90 backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {hotel.rating}
                      </Badge>
                    </div>
                    <button
                      onClick={(e) => handleWishlistToggle(e, hotel.id, hotel.name)}
                      className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                      aria-label={isInWishlist(hotel.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          isInWishlist(hotel.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hotel.location}
                      </p>
                    </div>

                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {hotel.amenities.slice(0, 4).map((amenity: string, i: number) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg"
                          >
                            {amenityIcons[amenity.toLowerCase()] || <span>•</span>}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Per night from</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${hotel.price}
                        </p>
                      </div>
                      <Button size="sm" variant="primary">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
