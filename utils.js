/**
 * Utility functions for the Branch Scheduler application
 */

/**
 * Creates a URL for a given page name
 * This function maps page names to their corresponding routes
 * @param {string} pageName - The name of the page
 * @returns {string} The URL path for the page
 */
export function createPageUrl(pageName) {
  const pageRoutes = {
    'Home': '/',
    'Login': '/login',
    'Onboarding': '/onboarding',
    'ManagerDashboard': '/manager-dashboard',
    'SupervisorDashboard': '/supervisor-dashboard'
  };

  return pageRoutes[pageName] || '/';
}

/**
 * Formats a date string for display
 * @param {Date|string} date - The date to format
 * @param {string} format - The format string (default: 'MMM d, yyyy')
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'MMM d, yyyy') {
  try {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Formats time string to 12-hour format
 * @param {string} timeString - Time in HH:mm format
 * @returns {string} Time in 12-hour format
 */
export function formatTime(timeString) {
  try {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
}

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} The debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generates a random ID
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} Random ID string
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Validates email address
 * @param {string} email - Email address to validate
 * @returns {boolean} Whether the email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, length = 50) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Deep clones an object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * Formats file size in human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Gets user's timezone
 * @returns {string} User's timezone
 */
export function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Checks if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} Whether the date is today
 */
export function isToday(date) {
  const today = new Date();
  const checkDate = new Date(date);
  return today.toDateString() === checkDate.toDateString();
}

/**
 * Gets the week start date (Monday)
 * @param {Date} date - Reference date
 * @returns {Date} Week start date
 */
export function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
  return new Date(d.setDate(diff));
}

/**
 * Gets array of dates for the current week
 * @param {Date} date - Reference date
 * @returns {Date[]} Array of dates for the week
 */
export function getWeekDates(date = new Date()) {
  const weekStart = getWeekStart(date);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    dates.push(d);
  }
  return dates;
}

/**
 * Handles async operations with loading state
 * @param {Function} asyncFn - Async function to execute
 * @param {Function} setLoading - Loading state setter
 * @param {Function} setError - Error state setter
 */
export async function handleAsync(asyncFn, setLoading, setError) {
  try {
    setLoading(true);
    setError(null);
    const result = await asyncFn();
    return result;
  } catch (error) {
    console.error('Async operation failed:', error);
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}

/**
 * Downloads data as a file
 * @param {string} data - Data to download
 * @param {string} filename - Name of the file
 * @param {string} type - MIME type of the file
 */
export function downloadFile(data, filename, type = 'text/plain') {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Local storage helper with error handling
 */
export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

/**
 * Class name utility for conditional classes
 * @param {...any} classes - Class names or objects
 * @returns {string} Combined class string
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([, condition]) => condition)
          .map(([className]) => className)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
}

export default {
  createPageUrl,
  formatDate,
  formatTime,
  debounce,
  generateId,
  isValidEmail,
  capitalize,
  truncate,
  deepClone,
  formatFileSize,
  getUserTimezone,
  isToday,
  getWeekStart,
  getWeekDates,
  handleAsync,
  downloadFile,
  storage,
  cn
};
