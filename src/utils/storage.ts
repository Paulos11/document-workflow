/**
 * localStorage utility for persistent data storage
 * Handles serialization, deserialization, and error cases
 */

export const STORAGE_KEYS = {
  DOCUMENTS: 'docflow_documents',
  USER: 'docflow_user',
  ROLE: 'docflow_role',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

interface StorageItemInfo {
  size: number;
  sizeKB: string;
}

interface StorageInfo {
  DOCUMENTS?: StorageItemInfo;
  USER?: StorageItemInfo;
  ROLE?: StorageItemInfo;
  total: {
    size: number;
    sizeKB: string;
    sizeMB: string;
  };
}

/**
 * Save data to localStorage with error handling
 */
export const saveToStorage = <T>(key: string, data: T): boolean => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);

    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Consider clearing old data.');
    }

    return false;
  }
};

/**
 * Load data from localStorage with error handling
 */
export const loadFromStorage = <T>(key: string, defaultValue: T | null = null): T | null => {
  try {
    const serialized = localStorage.getItem(key);

    if (serialized === null) {
      return defaultValue;
    }

    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 */
export const removeFromStorage = (key: string): boolean => {
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
export const clearAllStorage = (): boolean => {
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
export const isStorageAvailable = (): boolean => {
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
export const getStorageInfo = (): StorageInfo | null => {
  try {
    let totalSize = 0;
    const info: Partial<StorageInfo> = {};

    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      const data = localStorage.getItem(key);
      const size = data ? new Blob([data]).size : 0;
      info[name as keyof typeof STORAGE_KEYS] = {
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
    } as StorageInfo;
  } catch (error) {
    console.error('Error getting storage info:', error);
    return null;
  }
};
