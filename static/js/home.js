

// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    // Return de la api
    return {
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/usuarios',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        create: function(nombre, apellido, email, fecha) {
            let ajax_options = {
                type: 'POST',
                url: 'api/usuarios',
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'nombre': nombre,
                    'apellido': apellido,
                    'email': email,
                    'fecha': fecha
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_create_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        update: function(id, nombre, apellido, email, fecha) {
            let ajax_options = {
                type: 'PUT',
                url: 'api/usuarios/' + id,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'id': id,
                    'nombre': nombre,
                    'apellido': apellido,
                    'email': email,
                    'fecha': fecha,

                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_update_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'delete': function(id) {
            let ajax_options = {
                type: 'DELETE',
                url: 'api/usuarios/' + id,
                accepts: 'application/json',
                contentType: 'plain/text'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_delete_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

// Create the view instance
ns.view = (function() {
    'use strict';

    let $id = $('#id'),
        $nombre = $('#nombre'),
        $apellido = $('#apellido'),
        $email = $('#email'),
        $fecha = $('#fecha');

    // return de la  API
    return {
        reset: function() {
            $id.val('');
            $nombre.val('').focus();
            $apellido.val('');
            $email.val('');
            $fecha.val('');
        },
        update_editor: function(id, nombre, apellido, email, fecha) {
            $id.val(id);
            $nombre.val(nombre).focus();
            $apellido.val(apellido);
            $email.val(email);
            $fecha.val(fecha);
        },
        build_table: function(usuarios) {
            let rows = ''

            // clear the table
            $('.usuarios table > tbody').empty();

            // did we get a usuarios array?
            if (usuarios) {
                for (let i=0, l=usuarios.length; i < l; i++) {
                    rows += `<tr><td class="id">${usuarios[i].id}</td><td class="nombre">${usuarios[i].nombre}</td><td class="apellido">${usuarios[i].apellido}</td><td class="email">${usuarios[i].email}</td><td class="fecha">${usuarios[i].fecha}</td></tr>`;
                }
                $('table > tbody').append(rows);
            }
        },
        error: function(error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function() {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $id = $('#id'),
        $nombre = $('#nombre'),
        $apellido = $('#apellido'),
        $email = $('#email'),
        $fecha = $('#fecha');

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(nombre, apellido,email, fecha) {
        return nombre !== "" && apellido !== "" &&  email !== "" && fecha !== "" ;
    }

    // Create our event handlers
    $('#create').click(function(e) {
        let nombre = $nombre.val(),
            apellido = $apellido.val(),
            email = $email.val(),
            fecha = $fecha.val();

        e.preventDefault();

        if (validate(nombre, apellido, email, fecha)) {
            model.create(nombre, apellido, email, fecha)
        } else {
            alert('Revise los datos ingresados');
        }
    });

    $('#update').click(function(e) {
        let id = $id.val(),
            nombre = $nombre.val(),
            apellido = $apellido.val(),
            email = $email.val(),
            fecha = $fecha.val();

        e.preventDefault();

        if (validate(id, nombre, apellido, email, fecha)) {
            model.update(id,nombre, apellido, email, fecha)
        } else {
            alert('Revise los datos ingresados');
        }
        e.preventDefault();
    });

    $('#delete').click(function(e) {
        let id = $id.val();

        e.preventDefault();

        if (validate('placeholder', id)) {
            model.delete(id)
        } else {
            alert('Revise los datos ingresados');
        }
        e.preventDefault();
    });

    $('#reset').click(function() {
        view.reset();
    })

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            id,
            nombre,
            apellido,
            email,
            fecha;

        id = $target
            .parent()
            .find('td.id')
            .text();    
        nombre = $target
            .parent()
            .find('td.nombre')
            .text();

        apellido = $target
            .parent()
            .find('td.apellido')
            .text();

        email = $target
            .parent()
            .find('td.email')
            .text();

        fecha = $target
            .parent()
            .find('td.fecha')
            .text();    

        view.update_editor(id, nombre, apellido, email, fecha);
    });

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_delete_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));


