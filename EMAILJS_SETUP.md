# EmailJS Setup Guide 📧

## The Problem
You're getting the error: **"The Public Key is invalid"** because EmailJS requires a **Public Key (User ID)**, not a Service ID.

## Solution Steps

### 1. Get Your EmailJS Public Key
1. Go to [https://dashboard.emailjs.com/admin/account](https://dashboard.emailjs.com/admin/account)
2. Log in to your EmailJS account
3. Copy your **Public Key** (it looks like: `user_xxxxxxxxxxxxxxxx`)

### 2. Update Your Code
In `src/main/resources/static/js/main.js`, find this line:
```javascript
emailjs.init('KmB9FPxVgOqE3k70c'); // Your current key - this might be wrong format
```

Replace `KmB9FPxVgOqE3k70c` with your actual Public Key:
```javascript
emailjs.init('user_xxxxxxxxxxxxxxxx'); // Your actual Public Key
```

**Important:** The Public Key should start with `user_` followed by a long string of characters. If your key doesn't start with `user_`, it's probably a Service ID, not a Public Key.

### 3. Verify Your EmailJS Configuration
Make sure you have:
- ✅ **Service ID**: `my-Portfolio` (this is correct)
- ✅ **Template ID**: `template_pzc5ttr` (this is correct)
- ❌ **Public Key**: You need to get this from your EmailJS dashboard

### 4. Test the Setup
1. Start your application: `./mvnw spring-boot:run`
2. Go to the contact page
3. Click the 🐛 debug button (bottom-right corner)
4. Click "Test EmailJS" to verify everything is working

## EmailJS Dashboard Links
- **Account Settings**: [https://dashboard.emailjs.com/admin/account](https://dashboard.emailjs.com/admin/account)
- **Services**: [https://dashboard.emailjs.com/admin/integration](https://dashboard.emailjs.com/admin/integration)
- **Email Templates**: [https://dashboard.emailjs.com/admin/templates](https://dashboard.emailjs.com/admin/templates)

## Common Issues
1. **Wrong Public Key**: Make sure you're using the Public Key, not Service ID
2. **Template Not Found**: Verify your template ID is correct
3. **Service Not Found**: Verify your service ID is correct
4. **CORS Issues**: The backend is configured to handle CORS

## Debug Tools
- Use the 🐛 debug panel on the contact page
- Check browser console for detailed error messages
- Check server logs in `logs/portfolio.log`
- Use the "Test EmailJS" button to verify configuration

## Template Variables
Your EmailJS template uses these variables:
- `{{name}}` - Sender's name
- `{{time}}` - Timestamp when email was sent
- `{{message}}` - The message content

The code now sends all these variables correctly.

## After Setup
Once you've updated the Public Key, your contact form should work properly and send emails through EmailJS with the correct name and timestamp!