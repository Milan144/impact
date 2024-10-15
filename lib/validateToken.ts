import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export const validateToken = async (
    cookie: string | null,
    setLoading: (loading: boolean) => void,
    router: AppRouterInstance,
    pathname: string

) => {
    try {
        const parsedCookie = cookie ? JSON.parse(cookie) : null;
        const token = parsedCookie ? parsedCookie['token'] : '';
        const type = parsedCookie ? parsedCookie['type'] : '';

        if (!token || !type) {
            throw new Error('Paramètres manquants');
        }

        // Vérification de l'URL en fonction du chemin (pathname)
        if (pathname.includes('ugc') && type !== 'ugc') {
            throw new Error('Vous n\'avez pas les droits pour accéder à cette page.');
        } else if (pathname.includes('entreprise') && type !== 'entreprise') {
            throw new Error('Vous n\'avez pas les droits pour accéder à cette page.');
        }

        // Appel de l'API pour valider le token
        const response = await fetch("/api/validate-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, type }),
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.valid) {
            router.push("/login"); // Redirige si le token est invalide
        } else {
            setLoading(false); // Si valide, arrête le chargement
        }
    } catch (error) {
        console.error("Erreur lors de la validation du token :", error);
        router.push("/login"); // Redirige en cas d'erreur
    }
};
