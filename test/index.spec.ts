import {describe, it, expect} from "vitest";
import {verifyTOTP, generateTOTP} from "../src";
// @ts-ignore

describe("TOTP generation should work by specs", async () => {
    it("should generate a valid OTP", async () => {
        try {
            if(global.crypto === undefined)
                { // @ts-ignore
                    global.crypto = await import('node:crypto');
                }
        } catch (err) {
            console.error('crypto support is disabled in your test-runtime!');
        }
        const secret = 'mysecret';
        const otp = await generateTOTP(secret);
        expect(otp).toMatch(/^\d{6}$/); // OTP should be a 6-digit string
    })
    it('should verify a valid OTP', async () => {
        const secret = 'mysecret';
        const otp = await generateTOTP(secret);
        const result = await verifyTOTP(secret, otp);
        expect(result).toBe(true);
    });
    it('should reject an invalid OTP', async () => {
        const secret = 'mysecret';
        const otp = '123456';
        const result = await verifyTOTP(secret, otp);
        expect(result).toBe(false);
    });
})