/**
 * localStorage utility for persistent data storage
 * Handles serialization, deserialization, and error cases
 */

const STORAGE_KEYS = {
  DOCUMENTS: 'docflow_documents',
  USER: 'docflow_user',
  ROLE: 'docflow_role',
};

/**
 * Save data to localStorage with error handling
 */
export const saveToStorage = (key, data) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);

    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Consider clearing old data.');
    }

    return false;
  }
};

/**
 * Load data from localStorage with error handling
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const serialized = localStorage.getItem(key);

    if (serialized === null) {
      return defaultValue;
    }

    return JSON.parse(serialized);
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Clear all app data from localStorage
 */
export const clearAllStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Get storage usage info (approximate)
 */
export const getStorageInfo = () => {
  try {
    let totalSize = 0;
    const info = {};

    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      const data = localStorage.getItem(key);
      const size = data ? new Blob([data]).size : 0;
      info[name] = {
        size,
        sizeKB: (size / 1024).toFixed(2),
      };
      totalSize += size;
    });

    return {
      ...info,
      total: {
        size: totalSize,
        sizeKB: (totalSize / 1024).toFixed(2),
        sizeMB: (totalSize / 1024 / 1024).toFixed(2),
      },
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return null;
  }
};

export { STORAGE_KEYS };
