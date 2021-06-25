# dwauther

Demandware/SFCC login automater including MFA generation

## Install

- Download or clone this repository
- Open the downloaded folder, and edit the config.json file
    - Use your email/password you use for login into Business manager to fill "username" and "password" fields
    - Fill the OTP secret key with the one given by Salesforce (cf. [How to get the OTP secret](#how-to-initialize-an-otp-secret))
- Open Google Chrome
- Go to chrome://extensions or to Extensions page
- Tick "Developer mode" case
- Click on "Load unpacked extension"
- Select the folder where you downloaded this repository

## Usage

- Go into any Business Manager and magic will happen !

## How to get the OTP secret

- If you already have MFA enabled (e.g. using Salesforce Authenticator mobile application), please reset your MFA from Salesforce's Account Manager (or ask an administrator to do the reset)
- Log in any Business Manager, after using your username/password you should be redirected to the MFA setup page
- Instead of choosing Salesforce Authenticator way, choose the way with a third party OTP tool
- Download the QR Code displayed by Salesforce
- Use any online QR decoder tool (e.g. [webqr.com](https://webqr.com/))
    - On webqr.com you can use the "Camera" icon to upload your save QR code image
- You should have a string like `otpauth://totp/Ismail%20NGUYEN?secret=GR8E4RGE3G4REG4E8E2R5G4EGR&issuer=Salesforce%20Commerce%20Cloud`
- The OTP secret is the value between `secret=` and `&issuer` (e.g. `GR8E4RGE3G4REG4E8E2R5G4EGR`)

