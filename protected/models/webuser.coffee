app = require('ifnode')()

webuser = app.Model {
    name: 'webuser'
}, {
    type: 'virtual'
}

webuser.serialize = (user_id, done) ->
    app.models.users.findOne id: user_id, done

webuser.deserialize = (user, done) ->
    done null, user.id

webuser.stategy =
    facebook: (token, profile_information, done) ->
