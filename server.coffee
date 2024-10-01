require('dotenv').config()

{ log } = console
{ env } = process

_ = require 'lodash'
express = require 'express'
compression = require 'compression'
{ createProxyMiddleware } = require 'http-proxy-middleware'
modifyResponse = require 'http-proxy-response-rewrite'

# set default values for environment variables
env.TARGET_URL ?= 'https://www.google.com'
env.LOCAL_PROTOCOL ?= 'http'
env.LOCAL_HOSTNAME ?= 'localhost'
env.LOCAL_PORT ?= '9001'
env.PROXY_PORT ?= '9001'

# parse ports to integers
LOCAL_PORT = parseInt(env.LOCAL_PORT, 10)
PROXY_PORT = parseInt(env.PROXY_PORT, 10)

# construct LOCAL_URL
LOCAL_URL = "#{env.LOCAL_PROTOCOL}://#{env.LOCAL_HOSTNAME}:#{LOCAL_PORT}"

# create express app
createApp = ->
  app = express()
  app.use compression()
  app.disable 'x-powered-by'
  app

# configure proxy options
getProxyOptions = ->
  target: env.TARGET_URL
  changeOrigin: true
  onProxyRes: (proxyRes, req, res) ->
    modifyResponse proxyRes, res, (body) ->
      targetHostname = new URL(env.TARGET_URL).hostname
      body.replace(new RegExp(targetHostname, 'g'), "#{env.LOCAL_HOSTNAME}:#{LOCAL_PORT}")

# create and configure server
createServer = ->
  app = createApp()
  proxyOptions = getProxyOptions()
  app.use createProxyMiddleware(proxyOptions)
  app

# start the server
startServer = (app, port) ->
  server = app.listen port, ->
    log "proxy server is running on port #{port}"
    log "proxying #{env.TARGET_URL} to #{LOCAL_URL}"
  server

# main function
main = ->
  app = createServer()
  startServer(app, PROXY_PORT)

# export the server for testing or programmatic use
module.exports = createServer()

# run the server if this file is executed directly
if require.main is module
  main()

