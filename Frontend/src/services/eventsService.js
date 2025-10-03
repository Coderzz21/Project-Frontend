// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock events data
let MOCK_EVENTS = [
  {
    _id: '1',
    title: 'Tech Conference 2025',
    description: 'Join industry leaders for the biggest tech conference of the year.',
    date: '2025-03-15T09:00:00.000Z',
    location: 'San Francisco, CA',
    capacity: 500,
    price: 299,
    bookings: [],
    imageUrl: 'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg',
    category: 'Technology',
    status: 'active',
  },
  {
    _id: '2',
    title: 'Music Festival Summer',
    description: 'Three days of amazing music and entertainment.',
    date: '2025-07-20T18:00:00.000Z',
    location: 'Austin, TX',
    capacity: 1000,
    price: 199,
    bookings: [],
    imageUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    category: 'Music',
    status: 'active',
  },
  {
    _id: '3',
    title: 'Business Summit',
    description: 'Network with entrepreneurs and business leaders.',
    date: '2025-04-10T08:00:00.000Z',
    location: 'New York, NY',
    capacity: 300,
    price: 399,
    bookings: [],
    imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    category: 'Business',
    status: 'active',
  },
  {
    _id: '4',
    title: 'Art Exhibition',
    description: 'Contemporary art from emerging artists.',
    date: '2025-05-05T10:00:00.000Z',
    location: 'Los Angeles, CA',
    capacity: 200,
    price: 49,
    bookings: [],
    imageUrl: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg',
    category: 'Arts',
    status: 'active',
  },
];

export const getEvents = async (params = {}) => {
  await delay(800);
  
  let filteredEvents = [...MOCK_EVENTS];
  
  // Apply search
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply filters
  if (params.filters) {
    if (params.filters.category) {
      filteredEvents = filteredEvents.filter(event => event.category === params.filters.category);
    }
    if (params.filters.location) {
      filteredEvents = filteredEvents.filter(event =>
        event.location.toLowerCase().includes(params.filters.location.toLowerCase())
      );
    }
    if (params.filters.priceRange) {
      filteredEvents = filteredEvents.filter(event =>
        event.price >= params.filters.priceRange[0] && event.price <= params.filters.priceRange[1]
      );
    }
  }
  
  // Pagination
  const page = params.page || 1;
  const limit = 6;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
  
  return {
    events: paginatedEvents,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredEvents.length / limit),
      totalEvents: filteredEvents.length,
    },
  };
};

export const getEventById = async (eventId) => {
  await delay(500);
  
  const event = MOCK_EVENTS.find(e => e._id === eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  
  return event;
};

export const createEvent = async (eventData) => {
  await delay(1000);
  
  const newEvent = {
    ...eventData,
    _id: `event_${Date.now()}`,
    bookings: [],
  };
  
  MOCK_EVENTS.unshift(newEvent);
  return newEvent;
};

export const updateEvent = async (eventId, eventData) => {
  await delay(1000);
  
  const index = MOCK_EVENTS.findIndex(e => e._id === eventId);
  if (index === -1) {
    throw new Error('Event not found');
  }
  
  MOCK_EVENTS[index] = { ...MOCK_EVENTS[index], ...eventData };
  return MOCK_EVENTS[index];
};

export const deleteEvent = async (eventId) => {
  await delay(500);
  
  const index = MOCK_EVENTS.findIndex(e => e._id === eventId);
  if (index === -1) {
    throw new Error('Event not found');
  }
  
  MOCK_EVENTS.splice(index, 1);
};
