import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hotelService, reservationService } from '@/services/api';
import { ReservationCreate } from '@/types';

// Hotels
export const useHotels = () => {
  return useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      return await hotelService.getAllHotels();
    },
  });
};

export const useHotel = (id: number) => {
  return useQuery({
    queryKey: ['hotels', id],
    queryFn: async () => {
      return await hotelService.getHotelById(id);
    },
    enabled: !!id,
  });
};

// Reservations
export const useReservations = () => {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      return await reservationService.getAllReservations();
    },
  });
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: ReservationCreate) => {
      return await reservationService.createReservation(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

export const useCancelReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await reservationService.cancelReservation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};
