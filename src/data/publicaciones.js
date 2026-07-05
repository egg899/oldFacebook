const publicaciones = [

    {
        id: 1,
        autorId: 2,
        autor: "Juan Pérez",
        fecha: "Hace 10 minutos",
        contenido: "¡Hola a todos! Bienvenidos a Facebook.",
        imagen: "https://placehold.co/550x250",
        likes: 12,

        comentarios: [
            {
                id: 1,
                autor: "Pedro López",
                contenido: "¡Bienvenido!"
            },
            {
                id: 2,
                autor: "María Gómez",
                contenido: "Espero ver más publicaciones."
            }
        ]
    },

    {
        id: 2,
        autorId: 3,
        autor: "María Gómez",
        fecha: "Hace 1 hora",
        contenido: "Qué lindo día para salir a caminar.",
        imagen: "",
        likes: 0,

        comentarios: [
            {
                id: 1,
                autor: "Juan Pérez",
                contenido: "¡Disfrutá el paseo!"
            }
        ]
    },

    {
        id: 3,
        autorId: 4,
        autor: "Pedro López",
        fecha: "Ayer",
        contenido: "Comparto una foto de mis vacaciones.",
        imagen: "https://placehold.co/550x300",
        likes: 5,

        comentarios: [
            {
                id: 1,
                autor: "Ana Torres",
                contenido: "Qué hermoso lugar."
            },
            {
                id: 2,
                autor: "Juan Pérez",
                contenido: "¡Excelente foto!"
            },
            {
                id: 3,
                autor: "María Gómez",
                contenido: "Me dieron ganas de viajar."
            }
        ]
    },

    {
        id: 4,
        autorId: 1,
        autor: "German Verissimo",
        fecha: "Ayer",
        contenido: "Comparto la foto loquito",
        imagen: "https://placehold.co/550x300",
        likes: 5,

        comentarios: [
            {
                id: 1,
                autor: "Ana Torres",
                contenido: "Qué hermoso lugar."
            },
            {
                id: 2,
                autor: "Juan Pérez",
                contenido: "¡Excelente foto!"
            }
            
        ]
    }


];

export default publicaciones;