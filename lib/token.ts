import jwt from 'jsonwebtoken';

function checkTokenValidity(token: string | null, secret: string, type: string | null, router: any): boolean {
    if (token) {
        try {
            jwt.verify(token, secret); // Vérifie si le token est valide
            console.log("Token valide");

            if (type === 'entreprise') {
                console.log("Type d'utilisateur: entreprise");
                return true; // L'utilisateur est bien une entreprise
            } else {
                console.log("Type d'utilisateur différent, redirection...");
                router.push('/entreprise/home'); // Redirige si ce n'est pas une entreprise
            }
        } catch (error) {
            console.error("Erreur de validation du token :", error);
            return false; // Le token est invalide
        }
    } else {
        console.log("Token non trouvé");
    }
    return false; // Aucun token trouvé
}

function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    console.log("Cookies:", document.cookie);
    console.log("Cookies:", cookies);
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        console.log("Cookie:", cookie);
        if (cookie.startsWith(name)) {
            return cookie.split('=')[1];
        }
    }
    return null;
}

export { checkTokenValidity, getCookie };
