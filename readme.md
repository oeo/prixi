<img src="readme.svg" height="150"/>

# prixi

prixi offers a way to search on google while focusing on privacy. it's a proxy that cuts out the tracking and junk from search results.

- handles google search requests privately
- gets rid of ads and tracking from search results
- tweakable with environment variables
- comes with a tampermonkey script for more client-side tweaks

## how it operates

it sits between you and google, sending out your search, cleaning up the response, and then passing it back to you sans trackers and clutter.

<center>
  <img src="readme.png" height="400"/>
</center>

## set up & how to use

### docker

to run prixi with docker, these commands should do the trick:

```bash
docker build -t prixi .
docker run -p 9001:9001 -e TARGET_URL=https://www.google.com -e LOCAL_HOSTNAME=localhost prixi
```

or, even easier, use docker compose:

```bash
docker-compose up --build
```

tune it with environment variables in your .env file or by setting them in the docker-compose.yml:

```markdown
- `TARGET_URL`: url you're proxying; defaults to https://www.google.com
- `LOCAL_PROTOCOL`: server protocol; defaults to http
- `LOCAL_HOSTNAME`: server hostname; defaults to localhost
- `LOCAL_PORT`: server port; defaults to 9001
- `PROXY_PORT`: proxy server port; defaults to 9001
```

### local development

to run prixi locally:

1. clone the repo
1. run `nvm use`
1. run `npm install`
1. create a .env file based on .env.example
1. run `npm start`

prixi should now be running at http://localhost:9001 (or whatever port you specified)

## pitch in

got tweaks or fixes for prixi? awesome! here's how to get started:

1. fork the repo
1. create a new branch for your feature
1. make your changes
1. submit a pull request

