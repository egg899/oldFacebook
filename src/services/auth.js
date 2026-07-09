import usuarios from "../data/usuarios";
import publicaciones from "../data/publicaciones";
class Auth {

    obtenerUsuarios() {

        const usuariosGuardados = localStorage.getItem("usuarios");

        if (usuariosGuardados) {
            return JSON.parse(usuariosGuardados);
        }

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        return [...usuarios];

    }

    login(email, password) {

        const listaUsuarios = this.obtenerUsuarios();

        const usuario = listaUsuarios.find(usuario =>
            usuario.email === email &&
            usuario.password === password
        );

        if (!usuario) {
           return {
             ok: false,
             error: "El usuario no existe."
           }
        }


        if (usuario.password !== password) {

        return {
            ok: false,
            error: "La contraseña es incorrecta."
        };

        }

        localStorage.setItem(
            "usuarioLogueado",
            JSON.stringify(usuario)
        );

        return {
            ok: true,
            usuario
        };

    }

    logout() {

        localStorage.removeItem("usuarioLogueado");

    }

    usuarioActual() {

        return JSON.parse(
            localStorage.getItem("usuarioLogueado")
        );

    }

    estaLogueado() {

        return this.usuarioActual() !== null;

    }

    registrar(usuarioNuevo) {

        const listaUsuarios = this.obtenerUsuarios();

        const nuevoUsuario = {

            id: Date.now(),

            ...usuarioNuevo

        };

        listaUsuarios.push(nuevoUsuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(listaUsuarios)
        );

        localStorage.setItem(
            "usuarioLogueado",
            JSON.stringify(nuevoUsuario)
        );

        return nuevoUsuario;

    };///registrar

    actualizarUsuario(usuarioActualizado) {
        const listaUsuarios = this.obtenerUsuarios();

        const indice = listaUsuarios.findIndex( usuario => usuario.id === usuarioActualizado.id );

        if(indice === -1) {
            return false;
        }; //indice -1

        listaUsuarios[indice] = {
            ...listaUsuarios[indice],
            ...usuarioActualizado
        };

        localStorage.setItem(
            "usuarios",
            JSON.stringify(listaUsuarios)
        );


        const usuarioLogueado = this.usuarioActual();

        if(usuarioLogueado && usuarioLogueado.id === usuarioActualizado.id) {
            localStorage.setItem(
                "usuarioLogueado",
                JSON.stringify(listaUsuarios[indice])
            );
        }

        return true;
    }; ///actualizarUsuario

    obtenerPublicaciones() {

                const publicacionesGuardadas = localStorage.getItem("publicaciones");

                if (publicacionesGuardadas) {
                    return JSON.parse(publicacionesGuardadas);
                }

                localStorage.setItem(
                    "publicaciones",
                    JSON.stringify(publicaciones)
                );

                return [...publicaciones];

            };/// obtenerPublicaciones



        crearPublicaciones(publicacion) {
            const publicaciones = this.obtenerPublicaciones();

            publicaciones.unshift({
                id: Date.now(),
                ...publicacion
            });

            

            localStorage.setItem(
                    "publicaciones",
                    JSON.stringify(publicaciones)
            );


            };//crearPublicaciones


            eliminarPublicacion(id) {

                const publicaciones = this.obtenerPublicaciones().filter(
                    publicacion => publicacion.id !== id
                );

                localStorage.setItem(
                    "publicaciones",
                    JSON.stringify(publicaciones)
                );

                return publicaciones;




            };//eliminarPublicacion

            actualizarPublicacion(publicacionActualizada) {
                const publicaciones = this.obtenerPublicaciones();

                const indice = publicaciones.findIndex(p => p.id === publicacionActualizada.id);

                if(indice === -1) {
                    return false;
                }

                publicaciones[indice] = {
                    ...publicaciones[indice],
                    ...publicacionActualizada
                };

                localStorage.setItem(
                    'publicaciones',
                    JSON.stringify(publicaciones)
                );

                return publicaciones;


            };//publicacionActualizada
}

export default new Auth();