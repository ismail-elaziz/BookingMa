
import { motion } from 'framer-motion';
import { User, Calendar, Heart, Settings, MapPin, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card/CardNew';
import { Badge } from '@/components/Badge/BadgeNew';
import { Button } from '@/components/Button/Button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useHotels, useReservations } from '@/hooks/useApi';
import { Hotel, Reservation } from '@/types';

export const Dashboard = () => {
  const { wishlist } = useWishlist();
  const { data: hotels } = useHotels();
  const { data: reservations } = useReservations();

  // Get wishlist hotels
  const wishlistHotels = hotels?.filter((hotel: Hotel) => wishlist.includes(hotel.id)) || [];

  // Get upcoming reservations (confirmed and in the future)
  const today = new Date();
  const upcomingTrips = reservations?.filter((res: Reservation) => {
    const checkInDate = new Date(res.checkin);
    return res.paymentStatus === 'PAID' && checkInDate >= today;
  }).slice(0, 3) || [];

  // Calculate stats
  const totalTrips = reservations?.filter((r: Reservation) => r.paymentStatus === 'PAID').length || 0;
  const savedHotelsCount = wishlist.length;

  const stats = [
    { label: 'Total Trips', value: totalTrips.toString(), icon: <Calendar className="w-6 h-6" />, color: 'text-blue-500' },
    { label: 'Saved Hotels', value: savedHotelsCount.toString(), icon: <Heart className="w-6 h-6" />, color: 'text-red-500' },
    { label: 'Countries Visited', value: '5', icon: <MapPin className="w-6 h-6" />, color: 'text-green-500' },
    { label: 'Rewards Points', value: '2,450', icon: <TrendingUp className="w-6 h-6" />, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, John!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your trips and explore new destinations
              </p>
            </div>
            <Button variant="outline" leftIcon={<Settings className="w-5 h-5" />}>
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Trips */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Upcoming Trips
              </h2>
              {upcomingTrips.length === 0 ? (
                <Card>
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No upcoming trips scheduled
                    </p>
                    <Link to="/hotels">
                      <Button variant="primary">Book a Stay</Button>
                    </Link>
                  </div>
                </Card>
              ) : (
                upcomingTrips.map((trip: Reservation) => {
                  const hotel = hotels?.find((h: Hotel) => h.id === trip.hotelId);
                  const nights = Math.ceil((new Date(trip.checkout).getTime() - new Date(trip.checkin).getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <Card key={trip.id} variant="hover" className="p-0 overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img
                            src={hotel?.imageUrl || '/hotel.jfif'}
                            alt={hotel?.name || 'Hotel'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                {hotel?.name || 'Hotel'}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {hotel?.location || 'Location'}
                              </p>
                            </div>
                            <Badge variant="success">Confirmed</Badge>
                          </div>
                          <div className="flex gap-6 mb-4">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Check-in</p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {new Date(trip.checkin).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Check-out</p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {new Date(trip.checkout).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {nights} nights
                              </p>
                            </div>
                          </div>
                          <Link to="/history">
                            <Button size="sm" variant="outline">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Profile Section */}
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Profile Information
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    John Doe
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    john.doe@example.com
                  </p>
                  <Badge variant="info" size="sm" className="mt-1">
                    Gold Member
                  </Badge>
                </div>
              </div>
              <Button variant="outline" fullWidth>Edit Profile</Button>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Hotels */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Saved Hotels
              </h3>
              <div className="space-y-3">
                {wishlistHotels.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No saved hotels yet
                    </p>
                    <Link to="/hotels">
                      <Button variant="ghost" size="sm" className="mt-2">
                        Explore Hotels
                      </Button>
                    </Link>
                  </div>
                ) : (
                  wishlistHotels.slice(0, 3).map((hotel: Hotel) => (
                    <Link key={hotel.id} to={`/hotels/${hotel.id}`}>
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                        <img
                          src={hotel.imageUrl || '/hotel.jfif'}
                          alt={hotel.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                            {hotel.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {hotel.location}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-current" />
                              {hotel.rating}
                            </span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              ${hotel.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
              {wishlistHotels.length > 3 && (
                <Link to="/hotels">
                  <Button variant="outline" size="sm" fullWidth className="mt-4">
                    View All ({wishlistHotels.length})
                  </Button>
                </Link>
              )}
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link to="/hotels">
                  <Button variant="outline" size="sm" fullWidth>
                    Find Hotels
                  </Button>
                </Link>
                <Link to="/history">
                  <Button variant="outline" size="sm" fullWidth>
                    View All Trips
                  </Button>
                </Link>
                <Link to="/hotels">
                  <Button variant="outline" size="sm" fullWidth>
                    Manage Wishlist
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
