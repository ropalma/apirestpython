
from datetime import datetime
from flask import make_response, abort
import uuid
import re

def get_uuid():
    return uuid.uuid4()    

idUno = get_uuid();
idDos = get_uuid();
idTres = get_uuid();

def es_correo_valido(correo):
    expresion_regular = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    return re.match(expresion_regular, correo) is not None

def  es_fecha_valida(fecha):
    try:
        fecha = datetime.strptime(fecha, '%Y-%m-%d');
        return True
    except:
        return False 


def read_all():
    
    return [USUARIOS[key] for key in sorted(USUARIOS.keys())]




def read_one(id):
      
    
    if id in USUARIOS:
        usuario = USUARIOS.get(id)

    else:
        abort(
            404, "El usuario con el id {id} no encontrado".format(id=id)
        )

    return usuario


def create(usuario):
    
    id = get_uuid()
    nombre = usuario.get("nombre", None)
    apellido = usuario.get("apellido", None)
    email = usuario.get("email", None)
    fecha = usuario.get("fecha", None)
    
    for item in USUARIOS: 
        if USUARIOS[item]["email"]==email and email is not None:
            abort(
                406,
                "Usuario con el {email} ya existe".format(email=email),
            )
    if not es_correo_valido(email):
        abort(
            400,
            "El correo {email} no es valido".format(email=email),
        )
    if es_fecha_valida(fecha):
        USUARIOS[str(id)] = {
            "id": id,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "fecha": fecha,
        }
        return USUARIOS[str(id)], 201  
    else:
        abort(
            400,
            "El formato de fecha {fecha} no es valido".format(fecha=fecha),
        )


def update(id, usuario):
    
    if id in USUARIOS:
        USUARIOS[id]["nombre"] = usuario.get("nombre")
        USUARIOS[id]["apellido"] = usuario.get("apellido")
        USUARIOS[id]["email"] = usuario.get("email")
        USUARIOS[id]["fecha"] = usuario.get("fecha")

        return USUARIOS[id]

    else:
        abort(
            404, "usuario con el id {id} no encontrado".format(id=id)
        )


def delete(id):
   
    if id in USUARIOS:
        del USUARIOS[id]
        return make_response(
            "Usuario id {id} se elimino correctamente".format(id=id), 200
        )
    else:
        abort(
            404, "Usuario con id {id} no encontrado".format(id=id)
        )



# USUARIOS ACTUALES  DEL API
USUARIOS = {
    str(idUno): {
        "id":  idUno,
        "nombre": "Letizia",
        "apellido": "Palma",
        "email": "letizia@mail.cl",
        "fecha": "2015-08-16",
    },
    str(idDos): {
        "id": idDos,
        "nombre": "Alonso",
        "apellido": "Palma",
        "email": "alonso@mail.cl",
        "fecha": "2014-02-26",
    },
    str(idTres): {
        "id":  idTres,
        "nombre": "Topacio",
        "apellido": "Palma",
        "email": "topacio@mail.cl",
        "fecha": "2020-12-12",
    },
}