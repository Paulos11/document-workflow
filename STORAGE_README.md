# localStorage Implementation

## How It Works

The app uses browser localStorage to persist data between sessions. Everything you do - upload documents, add comments, change statuses - gets saved automatically to localStorage and will still be there when you refresh the page or come back later.

## What Gets Saved

Three things are stored in localStorage:

- `docflow_documents` - All your documents with their metadata, comments, and activity logs
- `docflow_user` - Current user information
- `docflow_role` - Whether you're viewing as Employee or Reviewer

## Automatic Sync

You don't need to manually save anything. The app watches for changes and syncs automatically:

```javascript
// Documents sync example
useEffect(() => {
  if (isStorageAvailable()) {
    saveToStorage(STORAGE_KEYS.DOCUMENTS, documents);
  }
}, [documents]);
```

Any time documents change (new upload, status update, comment added), it saves immediately.

## First Load Behavior

When you first open the app:
- Checks localStorage for existing data
- If found, loads it
- If not found, loads the mock documents

This means the first time you visit, you'll see sample documents. Once you make any change, those changes persist in localStorage.

## Storage Utilities

There's a `storage.js` utility file with helper functions:

```javascript
// Save data
saveToStorage('docflow_documents', documentsArray);

// Load data
const docs = loadFromStorage('docflow_documents', defaultValue);

// Remove specific item
removeFromStorage('docflow_documents');

// Clear everything
clearAllStorage();

// Check if available (handles private browsing)
if (isStorageAvailable()) {
  // safe to use
}
```

All functions include error handling for quota exceeded and unavailable storage.

## Resetting Data

Use the "Reset Data" button in the header dropdown to clear localStorage and reload mock documents. This is useful for testing or if you want a fresh start.

You can also clear it manually:
1. Open browser DevTools (F12)
2. Go to Application tab
3. Click localStorage
4. Right-click and clear

## Browser Limits

localStorage has size limits that vary by browser:
- Chrome/Firefox/Edge: ~10 MB
- Safari: ~5 MB
- Mobile browsers: ~5-10 MB

This app typically uses 100-500 KB, well below any limits. If you somehow hit the limit, the app will log a warning and fall back to in-memory storage.

## Security Notes

localStorage is not encrypted and can be read by any JavaScript on the page. Don't use this pattern for sensitive production data. It's fine for this demo, but a real app should:

- Use a backend API with proper authentication
- Store sensitive tokens in httpOnly cookies
- Encrypt any sensitive metadata before storing locally
- Implement data retention policies

## Testing Persistence

Try this:
1. Upload a document
2. Refresh the page
3. Document should still be there

Or try:
1. Open DevTools console
2. Run `localStorage.clear()`
3. Refresh page
4. Mock documents appear

## Storage Info

You can check how much space you're using:

```javascript
// In browser console
Object.keys(localStorage).reduce((acc, key) =>
  acc + localStorage[key].length, 0
) / 1024 + ' KB'
```

Or use the built-in helper:
```javascript
import { getStorageInfo } from './utils/storage';
console.log(getStorageInfo());
```

## Error Handling

The storage utilities handle these scenarios gracefully:

**QuotaExceededError** - Storage limit reached
- Logs warning to console
- Returns false
- App continues with in-memory state

**Storage Unavailable** - Private browsing or disabled
- Detected via isStorageAvailable()
- Falls back to in-memory state
- No crashes

**Invalid JSON** - Corrupted data
- Caught by try-catch
- Returns default value
- Logs warning

## How State Flows

1. User action (e.g., add comment)
2. React state updates via context
3. useEffect detects state change
4. saveToStorage called automatically
5. Data serialized to JSON
6. Saved to localStorage

On page load:
1. Component initializes state
2. Checks localStorage via loadFromStorage
3. If data exists, deserialize and use it
4. If not, use MOCK_DOCUMENTS
5. State initialized, app renders

## Browser Compatibility

Works in all modern browsers:
- Chrome, Firefox, Safari, Edge
- iOS Safari, Chrome Mobile
- Gracefully degrades in private browsing mode

## Limitations

- Data is per-domain only (can't share between different sites)
- No expiration (stays forever unless cleared)
- Synchronous API (can block if reading/writing huge data)
- No encryption by default
- Can be cleared by user at any time

For this demo app, these limitations are acceptable. Production apps should use a backend.

## Debugging

**View stored data:**
```javascript
// In console
JSON.parse(localStorage.getItem('docflow_documents'))
```

**Check what's stored:**
```javascript
// In console
console.log(localStorage)
```

**Clear specific key:**
```javascript
localStorage.removeItem('docflow_documents')
```

**Clear everything:**
```javascript
localStorage.clear()
```

## When Data Doesn't Persist

If you're not seeing persistence:

1. Check if localStorage is available (private browsing blocks it)
2. Look for errors in console
3. Verify you're on the same domain
4. Try clearing localStorage and starting fresh
5. Check browser isn't set to clear data on exit

Most common issue is private/incognito mode where localStorage is disabled or cleared on session end.
