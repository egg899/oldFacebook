import Auth from "../services/auth";

export function authMiddleware(to, from, next) {

    if (!Auth.estaLogueado()) {
         return "/";
    }

    next();

}

export function guestMiddleware() {

    if (Auth.estaLogueado()) {

        const usuario = Auth.usuarioActual();

        return `/perfil/${usuario.id}`;

    }

}