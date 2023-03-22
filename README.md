# totp-basic
A totp library in `typescript` that requires no external libraries.

Uses crypto.subtle API support, so that it can be used in browsers, as-is!
It can also be used in cloudflare-workers amongst others!
## Usage
```shell
npm install totp-basic
```

```typescript
import {verifyTOTP, generateTOTP} from "totp-basic";
        const secret = 'mysecret';
        const otp = await generateTOTP(secret);
        const isValid = await verifyTOTP(secret, otp);
```
