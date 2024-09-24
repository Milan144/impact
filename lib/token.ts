import jwt from 'jsonwebtoken';

function checkTokenValidity(token: string | null, secret: string, type: string | null, router: any): boolean {
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    if (token) {
        try {
            jwt.verify(token, secret);
            // If the token is valid, check the user type
            if (type === 'entreprise') {
                return true; // The user is an entreprise
            } else {
                router.push('/entreprise/home'); // Redirect if the user is not an entreprise
            }
        } catch (error) {
            return false; // Token is invalid
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
    return null;
}

export { checkTokenValidity, getCookie };
