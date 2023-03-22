import * as crypto from 'crypto';

export const generateTOTP = async (secret: string): Promise<string> => {
    const time = Math.floor(Date.now() / 1000); // get the current time in seconds
    const timeWindow = 30; // time window in seconds
    const timeStep = Math.floor(time / timeWindow); // calculate the time step
    const counter = new Uint8Array(8); // counter as an 8-byte array
    counter[7] = timeStep & 0xff; // populate the least significant byte of the counter
    counter[6] = (timeStep >> 8) & 0xff;
    counter[5] = (timeStep >> 16) & 0xff;
    counter[4] = (timeStep >> 24) & 0xff;
    const hmacKey = await crypto.subtle.importKey(
        'raw', // format of the secret key
        new TextEncoder().encode(secret), // the secret key as a byte array
        { name: 'HMAC', hash: { name: 'SHA-1' } }, // algorithm to use for HMAC
        false, // not extractable
        ['sign'] // only need the key for signing
    );
    const hmacResult = await crypto.subtle.sign(
        'HMAC', // HMAC algorithm
        hmacKey,
        counter // the counter as data to sign
    );
    const hmacArray = new Uint8Array(hmacResult); // convert the result to a byte array
    const offset = hmacArray[hmacArray.length - 1] & 0xf; // get the offset
    const code =
        ((hmacArray[offset] & 0x7f) << 24) |
        ((hmacArray[offset + 1] & 0xff) << 16) |
        ((hmacArray[offset + 2] & 0xff) << 8) |
        (hmacArray[offset + 3] & 0xff); // calculate the code
     // format the code as a 6-digit string
    return (code % 10 ** 6).toString().padStart(6, '0');
};

export const verifyTOTP = async (secret: string, token: string): Promise<boolean> => {
    const otp = await generateTOTP(secret); // generate the expected OTP
    return otp === token; // compare the expected OTP with the user-entered token
};
