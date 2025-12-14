// API Types
export interface Hotel {
  id: number;
  name: string;
  location: string;
  description?: string;
  price?: number;
  rating?: number;
  imageUrl?: string;
  amenities?: string[];
  availableRooms?: number;
}

export interface Room {
  id: number;
  roomNumber: string;
  capacity: number;
  price: number;
  available: boolean;
  hotelId: number;
}

export interface Reservation {
  id: number;
  customerName: string;
  hotelId: number;
  roomId: number;
  checkin: string;
  checkout: string;
  paymentStatus: 'PAID' | 'PENDING';
  // Extended fields for UI
  hotelName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  totalPrice?: number;
  status?: 'confirmed' | 'cancelled' | 'pending';
  createdAt?: string;
  guestName?: string;
}

export interface ReservationCreate {
  customerName: string;
  hotelId: number;
  roomId: number;
  checkin: string;
  checkout: string;
}

// UI Component Types
export interface SearchParams {
  destination: string;
  checkin: string;
  checkout: string;
  guests: number;
}

export interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}
