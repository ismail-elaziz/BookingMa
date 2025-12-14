import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  };

  const colors = {
    success: 'border-green-500/20 bg-green-50 dark:bg-green-950/20',
    error: 'border-red-500/20 bg-red-50 dark:bg-red-950/20',
    info: 'border-blue-500/20 bg-blue-50 dark:bg-blue-950/20',
    warning: 'border-yellow-500/20 bg-yellow-50 dark:bg-yellow-950/20',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`flex items-center gap-3 min-w-[300px] max-w-md p-4 rounded-lg border shadow-lg ${colors[type]}`}
      >
        {icons[type]}
        <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
          {message}
        </p>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
