### Dependencies

* Ruby 2.3.0
* [bunlder](http://bundler.io/)
* [yarn](https://yarnpkg.com/en/)
* postgres

### Setup

Install ruby gems:

```
bundle
```

Install JS packages:

```
yarn
```

rename application.yml.example to application.yml.
Run `rake secret` to generate a secret key. Paste this into your new application.yml

setup database:

```
bundle exec rake db:setup
```

start local server:

```
bundle exec rails server
```

Visit localhost:3000. Create a new user (email does not need to be real yet).

## Development

Client-side entry point is at app/assets/javascripts/application.js

## Graphql API

Visit /graphiql in browser to play around with the graphql API.
