import jwt from 'jsonwebtoken';

function checkTokenValidity(): boolean {
    const token = getCookie('token');
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            // Then if valid, get the cookie type
            const type = getCookie('type');
            if (type === 'ugc') {
                return true;
            } else window.location.href = '/entreprise/home';
        } catch (error) {
            return false;
        }
    }
    return false;
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

export { checkTokenValidity };