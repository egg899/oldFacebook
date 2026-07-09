import usuarios from "../data/usuarios";

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

    }

}

export default new Auth();