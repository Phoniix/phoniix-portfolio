# Admin Access Guide

## How to Access the Admin Page

The admin page is now hidden from public access for security reasons. To access the project management/admin page, you need to use a special URL with an access key.

### Access URL Format:
```
https://yourdomain.com/projects-admin?key=admin2025
```

### For Local Development:
```
http://localhost:8080/projects-admin?key=admin2025
```

## Security Features

1. **Hidden Navigation**: The admin link has been removed from the main navigation menu
2. **URL Key Protection**: Access requires a specific key parameter in the URL
3. **Automatic Redirect**: Unauthorized access attempts are automatically redirected to the home page
4. **Access Denied Message**: If someone tries to access the admin page without the key, they'll see an access denied message

## Changing the Admin Key

To change the admin access key for security:

1. **Update the Router**: Edit `src/main/resources/static/js/router.js`
   - Find line 60: `const validAdminKey = 'admin2025';`
   - Change `'admin2025'` to your desired key

2. **Update the Admin Page**: Edit `src/main/resources/static/pages/projects-admin.html`
   - Find line 175: `const validAdminKey = 'admin2025';`
   - Change `'admin2025'` to your desired key

3. **Keep the Same Key**: Make sure both files use the exact same key!

## Example of Changing the Key

If you want to change the key to `mySecret2025`:

**In router.js (line 60):**
```javascript
const validAdminKey = 'mySecret2025';
```

**In projects-admin.html (line 175):**
```javascript
const validAdminKey = 'mySecret2025';
```

Then your access URL would be:
```
https://yourdomain.com/projects-admin?key=mySecret2025
```

## Best Practices

1. **Use a Strong Key**: Choose a key that's not easily guessable
2. **Keep it Private**: Don't share the admin URL publicly
3. **Change Regularly**: Consider changing the key periodically for security
4. **Bookmark the URL**: Save the full admin URL (with key) in your bookmarks for easy access

## Troubleshooting

**Can't access admin page?**
- Make sure you're using the full URL with the key parameter
- Check that the key matches exactly in both files
- Clear your browser cache if you recently changed the key

**Admin page shows "Access Denied"?**
- Verify the key in the URL is correct
- Check that both router.js and projects-admin.html have the same key

---

**Remember**: The admin page is now completely hidden from public view and can only be accessed with the special URL containing the correct key!
