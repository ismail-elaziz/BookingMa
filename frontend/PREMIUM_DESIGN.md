# 🏨 LuxStay - Premium Hotel Reservation System

> A world-class hotel booking platform built with React, TypeScript, and modern design principles

## 🎨 Design System

### Color Palette
- **Primary**: Red tones (#ef4444) for CTAs and branding
- **Neutral**: Gray scale for text and backgrounds
- **Accent**: Subtle gradients for premium feel

### Typography
- **Display**: Poppins for headings
- **Body**: Inter for content
- **Scale**: 8px spacing system

### Components
All components follow atomic design principles with:
- ✅ Dark mode support
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Responsive design (mobile-first)
- ✅ Framer Motion animations
- ✅ Loading and error states

## 🚀 Features

### Core Pages
1. **Home** (`/`)
   - Cinematic hero with search
   - Featured hotels grid
   - Real-time filtering
   - Skeleton loading states

2. **Hotel Details** (`/hotels/:id`)
   - Image gallery with modal
   - Amenities showcase
   - Room availability
   - Sticky booking card

3. **Reservation** (`/reserve`)
   - Multi-step booking flow
   - Form validation
   - Sticky price summary
   - Progress indicators

4. **History** (`/history`)
   - Timeline-based layout
   - Status badges
   - Quick actions
   - Empty states

5. **Dashboard** (`/dashboard`)
   - Stats overview
   - Upcoming trips
   - Saved hotels (wishlist)
   - Profile management

### Premium Features
- 🌓 **Dark Mode**: System-aware with manual toggle
- 🔔 **Toast Notifications**: Success, error, warning, info
- 💀 **Skeleton Loaders**: Better UX than spinners
- ⚠️ **Error Boundaries**: Graceful error handling
- 📱 **Mobile Responsive**: Touch-optimized interactions
- ✨ **Micro-interactions**: Smooth hover and click states

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icon system

### Data Management
- **TanStack Query (React Query)** - Server state
- **Axios** - HTTP client

### Utilities
- **date-fns** - Date manipulation
- **React Router** - Routing

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Button/
│   ├── Card/
│   ├── Badge/
│   ├── Input/
│   ├── Toast/
│   ├── Skeleton/
│   ├── EmptyState/
│   ├── ErrorBoundary/
│   └── Navbar/
├── contexts/          # React contexts (Theme, Toast)
├── hooks/             # Custom hooks (useApi, etc.)
├── lib/               # Utilities (queryClient)
├── pages/             # Page components
│   ├── Home/
│   ├── HotelDetails/
│   ├── Reservation/
│   ├── History/
│   └── Dashboard/
├── services/          # API services
├── styles/            # Global styles
└── types/             # TypeScript types
```

## 🎯 Component Guidelines

### Button
```tsx
<Button 
  variant="primary|secondary|outline|ghost|danger"
  size="sm|md|lg"
  isLoading={false}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  fullWidth
>
  Click me
</Button>
```

### Card
```tsx
<Card variant="default|glass|hover">
  Content
</Card>
```

### Badge
```tsx
<Badge variant="success|warning|error|info|neutral" size="sm|md">
  Status
</Badge>
```

### Input
```tsx
<Input
  label="Label"
  error="Error message"
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  helperText="Helper text"
/>
```

## 🌟 Best Practices

1. **Component Composition**: Build complex UIs from simple components
2. **Type Safety**: Use TypeScript for all components
3. **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
4. **Performance**: React Query caching, lazy loading, code splitting
5. **Responsive**: Mobile-first design, touch-friendly targets
6. **Dark Mode**: System-aware with manual override

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

### Tailwind Config
Modify `tailwind.config.js` to customize:
- Color palette
- Font families
- Spacing scale
- Animations
- Shadows

### Global Styles
Edit `src/styles/globals.css` for:
- CSS variables
- Custom utility classes
- Scrollbar styles
- Glassmorphism effects

## 📝 API Integration

The app uses React Query for data fetching:

```tsx
// Fetch hotels
const { data, isLoading, error } = useHotels();

// Create reservation
const mutation = useCreateReservation();
await mutation.mutateAsync(reservationData);
```

## 🐛 Error Handling

- **ErrorBoundary**: Catches React errors
- **Empty States**: User-friendly no-data messages
- **Toast Notifications**: Feedback for actions
- **Form Validation**: Client-side validation

## 📱 Mobile Optimization

- Touch-friendly buttons (44x44px minimum)
- Responsive grid layouts
- Mobile navigation drawer
- Optimized images
- Fast page transitions

## 🔒 Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast (WCAG AA)
- Screen reader support

## 🎯 Performance

- Code splitting by route
- Image lazy loading
- React Query caching
- Debounced search
- Optimized re-renders

## 📄 License

This is a premium demo project showcasing modern React best practices.

---

**Built with ❤️ for production use**
