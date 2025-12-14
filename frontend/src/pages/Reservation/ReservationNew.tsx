import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, CreditCard, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Card } from '@/components/Card/CardNew';

import { useCreateReservation } from '@/hooks/useApi';
import { useToast } from '@/contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

type Step = 1 | 2 | 3;

export const ReservationNew = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    hotelId: 1,
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    specialRequests: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const createReservation = useCreateReservation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: 'Guest Details', icon: <Users className="w-5 h-5" /> },
    { number: 2, title: 'Booking Dates', icon: <Calendar className="w-5 h-5" /> },
    { number: 3, title: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
  };

  const handleSubmit = async () => {
    try {
      await createReservation.mutateAsync({
        customerName: formData.guestName,
        hotelId: formData.hotelId,
        roomId: 1, // Default room ID - should be selected by user in production
        checkin: formData.checkIn,
        checkout: formData.checkOut,
      });
      showToast('Reservation confirmed successfully!', 'success');
      navigate('/history');
    } catch (error) {
      showToast('Failed to create reservation. Please try again.', 'error');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.guestName && formData.email && formData.phone;
      case 2:
        return formData.checkIn && formData.checkOut;
      case 3:
        return formData.cardNumber && formData.cardExpiry && formData.cardCvv;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container-custom max-w-5xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                      ${currentStep >= step.number
                        ? 'bg-primary-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }
                    `}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${currentStep >= step.number ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-300 ${currentStep > step.number ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-800'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <AnimatePresence mode="wait">
                {/* Step 1: Guest Details */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                        Guest Information
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Please provide your contact details
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Booking Dates */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                        Select Dates
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Choose your check-in and check-out dates
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Check-in Date"
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        leftIcon={<Calendar className="w-5 h-5" />}
                        required
                      />
                      <Input
                        label="Check-out Date"
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        leftIcon={<Calendar className="w-5 h-5" />}
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Number of Guests
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[100px]"
                          placeholder="Any special requirements or preferences..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                        Payment Details
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Secure payment processing
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        leftIcon={<CreditCard className="w-5 h-5" />}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          required
                        />
                        <Input
                          label="CVV"
                          placeholder="123"
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Check className="w-5 h-5 text-blue-500" />
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Your payment information is encrypted and secure
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  leftIcon={<ChevronLeft className="w-5 h-5" />}
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                {currentStep < 3 ? (
                  <Button
                    variant="primary"
                    rightIcon={<ChevronRight className="w-5 h-5" />}
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    rightIcon={<Check className="w-5 h-5" />}
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    isLoading={createReservation.isPending}
                  >
                    Confirm Booking
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Summary Card (Sticky) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Booking Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Hotel</span>
                  <span className="font-medium text-gray-900 dark:text-white">Grand Luxury Hotel</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Guests</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.guests} Guest{formData.guests !== 1 ? 's' : ''}</span>
                </div>
                {formData.checkIn && formData.checkOut && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Check-in</span>
                      <span className="font-medium text-gray-900 dark:text-white">{new Date(formData.checkIn).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Check-out</span>
                      <span className="font-medium text-gray-900 dark:text-white">{new Date(formData.checkOut).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Nights</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                  </>
                )}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      ${formData.checkIn && formData.checkOut 
                        ? (Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)) * 299).toFixed(0)
                        : '0'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
