# Taller Node Guia

## Configuración del proyecto

### En local

1. Estando en la carpeta del proybecto se ejecuta el comando ```yarn install```. Esto instalará las siguientes librerías:
   
    ![image](https://github.com/user-attachments/assets/61d6a754-1c8c-4361-9c15-4bde5c6f7402)

    Y creará los siguientes scripts:
   
    ![image](https://github.com/user-attachments/assets/f585d659-d1cb-497b-be08-9117c1984a95)


2. Luego, si se ejecuta ```yarn start``` ejecutará en local el proyecto en un ambiente de desarrollo.
   
3. Para realizar únicamente build, se deberá ejecutar ```yarn build```, el cual borrará la carpeta "dist" (la carpeta donde queda el build con el código transformado de TypeScript a JavaScript) y luego generará un nuevo build usando "tsc".

### Despliegue en vercel

1. Se definió el siguiente archivo vercel.json:
   
    ![image](https://github.com/user-attachments/assets/65a4f3ee-949d-40eb-a77a-28adcc5659fb)

  Con esa información, vercel reconocerá los archivos con código de JavasCript dentro de la carpeta "dist" (después del build), usando @vercel/node para realizar el build en la nube.

2. Como vercel reconoce código JavasCript para el despliegue y no TypeScript, entonces, es por ese motivo que se usa la carpeta "dist" como objetivo, ya que en esta se encuentra el codigo de JavaScript. Para asegurarnos que se haga build antes de cada commit para que el código del build esté actualizado con los cambios realizado en TypeScript, se añadió la librería pre-commit, con las siguientes instrucciones:
   
   ![image](https://github.com/user-attachments/assets/64a63c5e-2b40-4a75-9686-d339e3951ca8)

   Ejecuntado los scripts que se encargan de probar el funcionamiento del codigo, realizar el build y añadir el build a git antes de realizar el commit.
   
3. Por útlimo, se realizó el despliegue en vercel, asociando un proyecto de vercel al repositorio de github, además añadiendo la ```MONGO_URL``` a las variables de entorno de vercel, para que el proyecto desplegado sea capaz de reconocer la base de datos tal como lo hace el local haciendo uso del ".env".

## Endpoints

Estos son cada uno de los servicios disponibles para esta API Rest. Todas las solicitudes a realizar se harán a través de este enlace ["https://taller-node.vercel.app/"](https://taller-node.vercel.app/)
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













