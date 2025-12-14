import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Star, Wifi, Coffee, Dumbbell, Car, Users, Check,
  X as CloseIcon, ChevronLeft, ChevronRight, Calendar, ArrowLeft, Heart
} from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/CardNew';
import { Badge } from '@/components/Badge/BadgeNew';
import { useHotel } from '@/hooks/useApi';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/contexts/ToastContext';
import { PageSkeleton } from '@/components/Skeleton/Skeleton';
import { EmptyState } from '@/components/EmptyState/EmptyState';

export const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: hotel, isLoading } = useHotel(Number(id));
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  // Mock images (in production, these would come from the API)
  const images = [
    hotel?.imageUrl || '/hotel.jfif',
    '/hotel2.jfif',
    hotel?.imageUrl || '/hotel.jfif',
  ];

  const amenities = [
    { icon: <Wifi className="w-5 h-5" />, name: 'Free WiFi', available: true },
    { icon: <Coffee className="w-5 h-5" />, name: 'Breakfast', available: true },
    { icon: <Dumbbell className="w-5 h-5" />, name: 'Fitness Center', available: true },
    { icon: <Car className="w-5 h-5" />, name: 'Free Parking', available: true },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isLoading) return <PageSkeleton />;

  if (!hotel) {
    return (
      <EmptyState
        icon="notfound"
        title="Hotel not found"
        description="The hotel you're looking for doesn't exist or has been removed."
        action={<Button onClick={() => navigate('/')}>Back to Home</Button>}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container-custom py-8 space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-5 h-5" />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-2xl overflow-hidden">
          <motion.div
            className="md:col-span-3 relative h-[400px] md:h-[500px] cursor-pointer group"
            onClick={() => setShowGallery(true)}
          >
            <img
              src={images[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-lg text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>

          <div className="hidden md:grid grid-rows-2 gap-4">
            {images.slice(1, 3).map((img, index) => (
              <div
                key={index}
                className="relative h-[242px] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setShowGallery(true)}
              >
                <img src={img} alt={`View ${index + 2}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Info */}
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    {hotel.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {hotel.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      toggleWishlist(hotel.id);
                      showToast(
                        isInWishlist(hotel.id) ? `Removed ${hotel.name} from wishlist` : `Added ${hotel.name} to wishlist`,
                        isInWishlist(hotel.id) ? 'info' : 'success'
                      );
                    }}
                    className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label={isInWishlist(hotel.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${
                        isInWishlist(hotel.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    />
                  </button>
                  <Badge variant="success" size="md">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {hotel.rating}
                  </Badge>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {hotel.description || 'Experience luxury and comfort in our beautifully appointed rooms and suites. Our hotel offers world-class amenities and exceptional service to make your stay memorable.'}
              </p>
            </Card>

            {/* Amenities */}
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <div className="text-primary-500">
                      {amenity.icon}
                    </div>
                    <span>{amenity.name}</span>
                    {amenity.available && (
                      <Check className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Rooms Section */}
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Available Rooms
              </h2>
              <div className="space-y-4">
                {[
                  { type: 'Standard Room', capacity: 2, price: hotel.price || 299 },
                  { type: 'Deluxe Room', capacity: 2, price: (hotel.price || 299) * 1.3 },
                  { type: 'Suite', capacity: 4, price: (hotel.price || 299) * 2 },
                ].map((room, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {room.type}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Up to {room.capacity} guests
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${Math.round(room.price)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">per night</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Starting from
                  </p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${hotel.price}
                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/night</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Check-in
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Check-out
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button fullWidth size="lg" onClick={() => navigate(`/reserve?hotelId=${hotel.id}`)}>
                  Reserve Now
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  You won't be charged yet
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setShowGallery(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              onClick={() => setShowGallery(false)}
            >
              <CloseIcon className="w-6 h-6" />
            </button>
            <img
              src={images[currentImageIndex]}
              alt={hotel.name}
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
