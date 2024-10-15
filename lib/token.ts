import jwt from 'jsonwebtoken';

function checkTokenValidity(token: string | undefined, secret: string, type: string | undefined, router: any): boolean {
    if (token && secret) {
        console.log('token', token);
        console.log('secret', secret);
        try {
            jwt.verify(token, secret);
            if (type === 'ugc') {
                return true;
            } else {
                router.push('/entreprise/home');
            }
        } catch (error) {
            return false;
        }
    }
    return false;
}

function getCookie(name: string): string | undefined | null {
    const cookieString = document.cookie;
    const cookiesArray = cookieString.split(';');

    for (let cookie of cookiesArray) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}

export { checkTokenValidity, getCookie };
