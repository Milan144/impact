import jwt from 'jsonwebtoken';

function checkTokenValidity(token: string | null, secret: string, type: string | null, router: any): boolean {
    if (!secret) {
        throw new Error('JWT_SECRET is not defined'); // Ensure secret is defined
    }

    if (token) {
        try {
            // TODO: FIX
            // jwt.verify(token, secret); // Verify the token using the secret
            // // If token is valid, check user type
            // if (type === 'ugc') {
            //     return true; // Return true if user is UGC
            // } else {
            //     router.push('/entreprise/home'); // Redirect if not UGC
            // }
            return true;
        } catch (error) {
            return false; // Invalid token
        }
    }
    return false; // No token found
}

function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name)) {
            return cookie.split('=')[1];
        }
    }
    return null; // Return null if cookie doesn't exist
}

export { checkTokenValidity, getCookie };
