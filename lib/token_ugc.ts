import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

function checkTokenValidity(token: string | undefined, secret: string, type: string | undefined, router: any): boolean {
    // if (!secret) {
    //     throw new Error('NEXT_PUBLIC_JWT_SECRET is not defined'); // Ensure secret is defined
    // }

    if (token) {
        try {
            jwt.verify(token, secret); // Verify the token using the secret
            // If token is valid, check user type
            if (type === 'ugc') {
                return true; // Return true if user is UGC
            } else {
                router.push('/entreprise/home'); // Redirect if not UGC
            }
        } catch (error) {
            return false; // Invalid token
        }
    }
    return false; // No token found
}

function getCookie(name: string): string | undefined {
    const cookie = cookies().get(name);
    return cookie?.value;
}

export { checkTokenValidity, getCookie };
