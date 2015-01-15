app = require('ifnode')()
main_controller = app.Controller name: 'main'

main_controller.get (request, response) ->
    response.render 'index'
