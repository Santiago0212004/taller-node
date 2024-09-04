# Taller Node Guia
Estos son cada uno de los servicios disponibles para esta API Rest. Todas las solicitudes a realizar se harán a través de este enlace ["https://https://taller-node.vercel.app/"](https://https://taller-node.vercel.app/)
junto con el tipo de servicio a realizar y la información requerida.
### Usuarios
#### - Login:
Para iniciar sesión con un usuario existente concatenar "/api/users/login" al enlace inicial, enviar la solicitud como tipo POST y a través del "body", en formato json, escribir estas información. 
Este es el único tipo de solicitud que no requiere enviar el token a través del "Token Bearer", para el resto de solicitudes enviar en el token recibido al iniciar sesión
{
  "email":"email_del_usuario",
  "password":"password_del_usuario"
}

#### - Crear usuario:
Para crear un usuario, previamente debe haber iniciado sesión con un usuario con rol superadmin. Al enlace inicial concatenar "/api/users/create",enviar la solicitud como tipo POST y a través del "body", en formato json, enviar esta información:
{
    "name": "nombre",
    "email":"correo",
    "password":"contraseña",
    "role":"tipo de rol(superuser,user)",
    "isActive":true
}
#### - Modificar usuario:
Para modificar un usuario, previamente debe haber iniciado sesión con un usuario con rol superadmin. Al enlace inicial concatenar "/api/users/update/id_del_usuario",enviar la solicitud como tipo POST y a través del "body", en formato json, enviar 
la información a modificar del usuario.
#### - Ver todos los usuarios:
Para obtener el listado de todos los usuarios existentes, al enlace inicial concatenar"/api/users/" y enviar la solicitud como tipo GET.

#### - Eliminar usuario:
Para modificar un usuario, previamente debe haber iniciado sesión con un usuario con rol superadmin. Al enlace inicial concatenar "/api/users/delete/id_del_usuario" y enviar la solicitud tipo DELETE.

### Comentarios
#### - Crear un comentario
Para crear un comentario, concatenar al enlace inicial "api/comments/create", agregar en el "body", en formato json, esta información:
{
  "content":"comentario",
  "parentId:"id_del_usuario"
}
, y enviar la solicitud como tipo POST.

#### - Modificar un comentario
Para modificar un comentario, concatenar al enlace inicial "api/comments/update/id_del_comentario", agregar al "body" la misma información con la que se crea los comentarios , y enviar la solicitud como tipo POST.
Únicamente el usuario propio del comentario y un superadmin pueden modificarlos.

#### - Obtener comentario
Para obtener un comentario, concatenar al enlace inicial "api/comments/get/id_del_comentario" y enviar la solicitud como tipo GET.

#### - Obtener todos los comentarios
Para obtener todos los comentario, concatenar al enlace inicial "api/comments/" y enviar la solicitud como tipo GET.

#### - Responder un comentario
Para responder un comentario, concatenar al enlace inicial "api/comments/reply/id_del_comentario_a_responder", agregar al "body" la misma información con la que se crea los comentarios especificando el id del usuario (idParent) y enviar la solicitud como tipo POST.

#### - Eliminar un comentario
Para eliminar un comentario, concatenar al enlace inicial "api/comments/delete/id_del_comentario" y enviar la solicitud como tipo DELETE.
Únicamente puede eliminar el comentario el autor del mismo y un superadmin

### Reacciones
#### - Crear una reacción
Para crear una reacción, concatenar al enlace inicial "api/reaction/create", agregar en el "body", en formato json, esta información:
{
  "content":"reaccion",
  "parentId:"id_del_comentario_a_responder"
}
, y enviar la solicitud como tipo POST.

#### - Obtener una reacción
Para obtener una reacción, concatenar al enlace inicial "api/reaction/get/id_de_la_reaccion" y enviar la solicitud como tipo GET.

#### - Obtener todos los comentarios
Para obtener todos los comentario, concatenar al enlace inicial "api/reaction/" y enviar la solicitud como tipo GET.

#### - Eliminar un comentario
Para eliminar un comentario, concatenar al enlace inicial "api/reaction/delete/id_de_la_reacción" y enviar la solicitud como tipo DELETE.
Únicamente puede eliminar la reacción el autor del mismo.













