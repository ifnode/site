ifnode = require 'ifnode'

app = ifnode
    name: 'Site of ifnode',
    alias: 'site',
    env: 'dev'

app.run (config) ->
    console.log "Server start in root #{config.site.local.origin}";
