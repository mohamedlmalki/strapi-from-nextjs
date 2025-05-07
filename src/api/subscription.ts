import { ApiResponse } from '../types';
import handlebars from 'handlebars';

const STRAPI_URL = 'https://passionate-cows-35f2aac5ed.strapiapp.com';
const API_TOKEN = '80e254ac4fa3cbdc1a1e9b5b804ce938b720d98a9cea2a0b9b62c688c8b7a492029b8c0c09f8b1b72e1055fa33a79a834a692004d5dc2b3f53bcd0a20ce4071c0f880b000111bdd41980956da980ba4b902df13da8c525b4e80aa264b4c2c62ee841dd85d69e9db9afbf32a670f0bafc64c4f8e5cd1ee7f8155d430b9cf955bd';

// Email template as a string
const emailTemplate = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<style>

</style>
<body style="padding:0; margin:0 auto; display:block; min-width:100%; width:100%;font-family: 'Segoe UI', sans-serif;background-color:#F5F5F5">
<p>hgfhfghfgh</p>

</body>
</html>
`;

const compiledTemplate = handlebars.compile(emailTemplate);

/**
 * Subscribes an email to the newsletter and sends confirmation email
 * @param email - The email address to subscribe
 * @returns A promise that resolves to the API response
 */
export const subscribeEmail = async (email: string): Promise<ApiResponse> => {
  try {
    // First, create the subscriber
    const response = await fetch(`${STRAPI_URL}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          Email: email
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to subscribe');
    }

    // Generate HTML content with template data
    const templateData = {
      email: email,
      unsubscribeUrl: `${STRAPI_URL}/unsubscribe?email=${email}`,
      websiteUrl: STRAPI_URL
    };

    const htmlContent = compiledTemplate(templateData);

    // Send confirmation email
    const emailResponse = await fetch(`${STRAPI_URL}/api/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        from: 'news <no-reply@strapiapp.com>',
        to: email,
        subject: 'Your Microsoft Defender Subscription Has Expired',
        html: htmlContent,
        text: 'Your Microsoft Defender subscription has expired. Please renew your subscription to maintain protection.'
      })
    });

    if (!emailResponse.ok) {
      console.warn('Failed to send confirmation email:', await emailResponse.text());
    }

    return {
      success: true,
      message: 'Successfully subscribed! Please check your email for confirmation.',
      data
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};