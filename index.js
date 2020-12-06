const express = require('express')
const fs = require('fs')
const app = express()
var datos = {}
var id = 0
var par = html = ''
app.get('/employee/:ide/:attr?', function(req, res) {
    id = req.params.ide
    par = req.params.attr
    fs.readFile('employees.csv', 'utf8', function(err, data) {
        if (err) {
            console.error(err.message)
        }
        datos = data.split('\n').slice(1).map(function(line) {
            var result = {}
            data.split('\n')[0].split(',').forEach(function(header) {
                result[header] = line.split(',')[data.split('\n')[0].split(',').indexOf(header)]
            })
            return result;
        })

        if (par === undefined) {
            datos.forEach(empleado => {
                html = empleado
            })
        } else {
            datos.forEach(empleado => {
                if (empleado.id === id) {
                    empleado.hasOwnProperty(par) ? '' : console.log("El empleado no tiene esa propiedad")
                    html = ('<p>Su ' + par + ' es ' + empleado[par] + '</p>')
                }
            })
        }

        res.send(html)
    })
})
app.listen(3000, function() {
    console.log('application started.')
})