import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle, XCircle, Clock, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/CardNew';
import { Badge } from '@/components/Badge/BadgeNew';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { PageSkeleton } from '@/components/Skeleton/Skeleton';
import { useReservations, useCancelReservation } from '@/hooks/useApi';
import { useToast } from '@/contexts/ToastContext';
import { format } from 'date-fns';

export const HistoryNew = () => {
  const { data: reservations, isLoading } = useReservations();
  const cancelReservation = useCancelReservation();
  const { showToast } = useToast();

  const handleCancel = async (id: number) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await cancelReservation.mutateAsync(id);
        showToast('Reservation cancelled successfully', 'success');
      } catch (error) {
        showToast('Failed to cancel reservation', 'error');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return (
          <Badge variant="success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="error">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="neutral">
            {status}
          </Badge>
        );
    }
  };

  if (isLoading) return <PageSkeleton />;

  if (!reservations || reservations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
        <div className="container-custom">
          <EmptyState
            icon="inbox"
            title="No reservations yet"
            description="You haven't made any bookings yet. Start exploring hotels to plan your next trip!"
            action={
              <Button variant="primary" onClick={() => window.location.href = '/'}>
                Explore Hotels
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(b.createdAt || b.checkin).getTime() - new Date(a.createdAt || a.checkin).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            My Trips
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your hotel reservations
          </p>
        </motion.div>

        <div className="space-y-6">
          {sortedReservations.map((reservation, index) => {
            const checkInDate = new Date(reservation.checkIn || reservation.checkin);
            const checkOutDate = new Date(reservation.checkOut || reservation.checkout);
            const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
            const isUpcoming = checkInDate > new Date();

            return (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card variant="hover" className="p-0 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <img
                        src="/hotel.jfif"
                        alt={reservation.hotelName}
                        className="w-full h-full object-cover"
                      />
                      {isUpcoming && reservation.status === 'confirmed' && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="info">Upcoming</Badge>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">
                            {reservation.hotelName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Booking #{reservation.id} • Reserved {format(new Date(reservation.createdAt || reservation.checkin), 'MMM d, yyyy')}
                          </p>
                        </div>
                        {getStatusBadge(reservation.status || 'pending')}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Check-in</p>
                            <p className="font-medium">{format(checkInDate, 'MMM d, yyyy')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Check-out</p>
                            <p className="font-medium">{format(checkOutDate, 'MMM d, yyyy')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Users className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
                            <p className="font-medium">{reservation.guests} Guest{reservation.guests !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Price</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${reservation.totalPrice}
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                              ({nights} night{nights !== 1 ? 's' : ''})
                            </span>
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<Eye className="w-4 h-4" />}
                          >
                            Details
                          </Button>
                          {reservation.status === 'confirmed' && isUpcoming && (
                            <Button
                              size="sm"
                              variant="danger"
                              leftIcon={<Trash2 className="w-4 h-4" />}
                              onClick={() => handleCancel(reservation.id)}
                              isLoading={cancelReservation.isPending}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
