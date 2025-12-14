import axios from 'axios';
import type { Hotel, Room, Reservation, ReservationCreate } from '@/types';

const API_BASE_URL = '/api';

// Hotel Service
export const hotelService = {
  getAllHotels: async (): Promise<Hotel[]> => {
    const response = await axios.get(`${API_BASE_URL}/hotels`);
    return response.data._embedded?.hotels || response.data || [];
  },

  getHotelById: async (id: number): Promise<Hotel> => {
    const response = await axios.get(`${API_BASE_URL}/hotels/${id}`);
    return response.data;
  },
};

// Room Service
export const roomService = {
  getAllRooms: async (): Promise<Room[]> => {
    const response = await axios.get(`${API_BASE_URL}/rooms`);
    return response.data._embedded?.rooms || response.data || [];
  },

  getRoomsByHotel: async (hotelId: number): Promise<Room[]> => {
    const response = await axios.get(`${API_BASE_URL}/rooms/search/findByHotelId?hotelId=${hotelId}`);
    return response.data._embedded?.rooms || response.data || [];
  },

  getRoomById: async (id: number): Promise<Room> => {
    const response = await axios.get(`${API_BASE_URL}/rooms/${id}`);
    return response.data;
  },
};

// Reservation Service
export const reservationService = {
  getAllReservations: async (): Promise<Reservation[]> => {
    const response = await axios.get(`${API_BASE_URL}/reservations`);
    return response.data._embedded?.reservations || response.data || [];
  },

  createReservation: async (reservation: ReservationCreate): Promise<Reservation> => {
    const response = await axios.post(`${API_BASE_URL}/reservations`, reservation);
    return response.data;
  },

  getReservationById: async (id: number): Promise<Reservation> => {
    const response = await axios.get(`${API_BASE_URL}/reservations/${id}`);
    return response.data;
  },

  cancelReservation: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/reservations/${id}`);
  },
};
