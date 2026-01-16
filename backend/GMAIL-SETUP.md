# Gmail SMTP Setup Instructions

## Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable it

## Step 2: Generate App Password

1. After enabling 2FA, go back to Security
2. Under "Signing in to Google", click **App passwords**
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter name: **Bite Bliss Backend**
6. Click **Generate**
7. **COPY THE 16-CHARACTER PASSWORD** (you won't see it again)

## Step 3: Add to .env File

Add these lines to your `backend/.env` file:

```env
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password

# Email Addresses
EMAIL_ADDRESS_FROM=your-email@gmail.com
EMAIL_ADDRESS_REPLY=your-email@gmail.com
```

Example:
```env
GMAIL_USER=bitebliss.noreply@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
EMAIL_ADDRESS_FROM=bitebliss.noreply@gmail.com
EMAIL_ADDRESS_REPLY=support@bitebliss.com
```

## Step 4: Restart Server

```bash
npm run dev
```

## Testing

After restarting, emails will be sent from your Gmail account!

**Note**: Gmail has sending limits:
- Free Gmail: ~500 emails/day
- Google Workspace: ~2000 emails/day

For production with high volume, consider:
- Sendgrid (99 emails/day free)
- Mailgun (100 emails/day free)
- AWS SES (62,000 emails/month free)
