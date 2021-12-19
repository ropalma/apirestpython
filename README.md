
Respuesta a prueba técnica, Api Rest CRUD usuarios en python:

Para facilitar las pruebas implemente una pagina web simple que ayuda con este propósito. Tambien se puede testaer desde alguna aplicación como postman o soapui. O por la página de documentación de swagger http://localhost:5000/api/ui/#/Usuarios .

Se cargan 3 usuarios automaticamente al lanzar a aplicación.

Se uso flask como framework rest

Para levantar la aplicación de require importar las librerias que usa el proyecto.
from flask import render_template
from datetime import datetime
from flask import make_response, abort
import uuid
import re

import connexion

conection


Luego ejecutar el servidor con el comando (para windows).

py server.py

URL pagina web para testaer.

http://localhost:5000/

Documentaciónn auntogenerada por swagger
http://localhost:5000/api/ui/#/Usuarios


Especificación del api rest en swagger 2.0
http://localhost:5000/api/swagger.json

Metodos para cada operación pedida en la prueba técnica.

Buscar usuario por id
GET: http://localhost:5000/api/usuarios/{id}

Buscar todos los usuarios
GET: http://localhost:5000/api/usuarios

Crear usuario
POST: http://localhost:5000/api/usuarios

Actualiza usuario
PUT: http://localhost:5000/api/usuarios

Borrar usuario por id
DELETE: http://localhost:5000/api/usuarios/{id}

Prueba Técnica 
v1.0

Este registro de usuarios debe considerar los siguientes casos de uso:

    • Poder registrar nuevos usuarios
    • Actualizar datos de usuarios existentes
    • Consultar por un usuario basado en su ID
    • Eliminar usuario basado en su ID

Esto es lo que se conoce como CRUD (Create, Read, Update, Delete)


La estructura de los usuarios es la siguiente:
    • ID (UUID)
    • Nombre (String)
    • Apellido (String)
    • Email (String)
    • Fecha de nacimiento (Date)


Implementación de Solución

La solución debe ser implementada en lenguaje python versión 3.9 con algún framework que permita exponer servicios REST para los casos de uso. Estos servicios deben cumplir con el estándar de verbos HTTP (GET, POST, UPDATE, DELETE) y la respuesta  de cada servicio debe considerar el código HTTP de respuesta (200 OK o 400 Bad Request, 404 Resource Not Found). 

Para la persistencia de los datos, solo se debe considerar en memoria, no es necesario un motor de base de datos o archivos planos.

Consideraciones

    • El ID de usuario debe ser autogenerado en formato UUID
    • No se pueden crear usuarios con el mismo email
    • Se debe validar el formato del email (No se deben permitir correos inválidos)
    • Se debe validar la fecha de nacimiento “YYYY-MM-DD” (No se deben permitir fechas inválidas )


Entrega (Delivery)

    • El plazo de entrega será 72 horas (3 días) a contar desde la fecha de entrega de la asignación
    • Todo el código debe ser publicado en github
    • El proyecto debe tener un archivo README.md el cual indicara los pasos para su ejecución y documentación de cada endpoint los con datos de entrada y salida.