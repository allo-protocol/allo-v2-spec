# Spec — Live Tables & Instant APIs

The following docs are focused on:

1. Setting up the Spec project for Alloscan
2. Adding Live Tables to Postgres for the Alloscan application
3. Spinning up your Live Tables locally
4. Running an instant GraphQL API on top of your Live Tables
5. Migrations

If you're looking for the Allo v2 Live Objects, those can be found [here](https://github.com/allo-protocol/allo-v2-spec).

With that said, let's hit it 😎

* [Intro to Spec Projects](#intro-to-spec-projects)
* [Alloscan Project Setup](#alloscan-project-setup)
* [Running Spec Locally](#running-spec-locally)
* [Instant GraphQL API](#instant-graphql-api)
* [Migrations](#migrations)
* [Helpful Tips](#helpful-tips)

# Intro to Spec Projects

What is a Spec project and how is it structured?

## What is a Spec Project?

Let's say you have an idea for a new dapp, and you want to use Spec to quickly build out the live data schema for it. The first thing you would do is create a new Spec "project". 

Every project on Spec has its own unique set of API keys, access permissions, and dedicated set of config files that outlines:

1. Which Live Tables you need in your database (with any personalized naming conventions, data mappings, filters, etc.)
2. Which database _environments_ exist in your app's deployment pipeline and how to connect to each (local, staging, prod, etc.)

While Live Objects are your way of indexing custom data _into_ the Spec network, Spec projects and Live Tables deal exclusively with how you want to _consume_ that data for whatever it is you're building.

## Project Config Overview

To initialize your codebase as a Spec project and generate its config files, run the following from the root folder of your application:

```bash
$ spec init
```

If it doesn't exist already, a new `.spec` folder will be created in the root of your project with the following contents:

```
.spec/
| connect.toml
| project.toml
```

* `connect.toml` - Specifies the different database environments in your project
* [`project.toml`](/.spec/project.toml) - Specifies which Live Tables you want in your database and their respective data sources/mappings/filters/etc.

> [!NOTE]
> The `connect.toml` file is usually gitignored, which is why you don't see it in this GitHub repo.

## Migrations & Automated Config Generation

When adding Live Tables with the Spec desktop app, a couple things will be automatically done for you:

1. The SQL migrations for the underlying Postgres tables will be automatically generated.
2. The Live Table config ([`project.toml`](/.spec/project.toml)) will be automatically written.

All SQL migrations will be saved in the [`.spec/migrations`](/.spec/migrations/) folder.

# Alloscan Project Setup

Let's get the Spec project for Alloscan set up and fully configured locally.

## Requirments

Before setting up your Spec project, make sure you have:

1. An active Spec account
2. The [Spec CLI](https://github.com/spec-dev/allo/blob/master/guides/CLI-Setup.md) installed (`>= 0.1.25`)
3. Postgres (`>= 14`) and `psql`

## Steps

The following steps assume you've already cloned this repo and are operating out of the root folder of the codebase.

### 1) Create a fresh database

This will be the local database environment for your Alloscan project.

```bash
$ createdb alloscan
```

### 2) Reinitialize the Spec project

Since `connect.toml` is gitignored, just reinitialize the Spec project to generate that file (nothing will be overwritten).

```bash
$ spec init
```

### 3) Configure your project's local database environment

Open `connect.toml` and set the `"name"` of the database to `alloscan`. All other fields can be left alone.

**Example:**<br>
```toml
# Local database
[local]
name = 'alloscan'
port = 5432
host = 'localhost'
user = '<your-db-username>' # should be autopopulated with your current db user
password = '' # leave blank
```

### 4) Set the local location of your Spec project

> [!NOTE]
> The `allov2/alloscan` project has already been created on Spec with its own set of API credentials 

This next command will do the following 3 things:

1. Pull down your project's API credentials and save them locally (so that you can run Live Tables locally)
2. Set your _current_ project to `allov2/alloscan` (many CLI commands run using the _current_ project context)
3. Tell the Spec CLI where your `allov2/alloscan` project exists locally

```
$ spec link project allov2/alloscan .
```

# Running Spec Locally

Now that your project is configured, let's run Spec against your local database.

## Requirments

> [!NOTE]
> Don't overlook this next installation, as it's a different library than the CLI

Make sure you have the latest version of Spec installed:

```bash
$ npm install -g @spec.dev/spec
```

## Start Spec

As Spec starts up, it will...

1. Detect and run any new SQL migrations listed in `.spec/migrations/`
2. Add triggers to any new Live Tables to track database operations
3. Backfill any new Live Tables
4. Subscribe to events to keep your tables up-to-date
5. Fetch any missed events since the last time you ran Spec

```bash
$ spec start
```

# Instant GraphQL API

Now that your Live Tables are up and running, you can easily spin up an instant GraphQL API. This is done with the help of [Postgraphile](https://github.com/graphile/crystal), which automatically introspects your Postgres database to generate a powerful GraphQL API.

## Enable the GraphQL Addon

To enable the GraphQL addon for your current Spec project:

```bash
$ spec enable graphql
```

Enabling this will do a couple things:

1. Install the `postgraphile` library
2. Create your Postgraphile config file ([`.spec/graphql/.postgraphilerc.js`](/.spec/graphql/.postgraphilerc.js))

## Start the API

_Before starting your GraphQL API_, make sure you already have another tab with Spec running (`spec start`).

From another terminal tab:
```
$ spec run graphql
```

This will run Postgraphile against your local database and expose a couple different endpoints:

* GraphQL API: http://localhost:5555/graphql
* GraphiQL GUI/IDE: http://localhost:5555/graphiql

## Open the GUI/IDE

To explore your new GraphQL schema, navigate to `http://localhost:5555/graphiql`. This front-end is great for checking out which models/relationships exist, seeing which queries you can run, and then writing and executing test queries to see the results.

Try running some test commands:

#### Get all pools with related models

```gql
{
  pools {
    poolId
    strategy
    token
    amount
    feePaid
    profile {
      profileId
      name
      account {
        accountId
      }
    }
    createdAt
    updatedAt
  }
}
```

#### Get a profile with all of its roles and role accounts

```gql
{
  profile(
    profileId: "0x0021a52be387a4e0e8cf515870e4eb9e5a3f050b51d017121994245d2d82df56",
    chainId: "5"
  ) {
    profileId
    name
    owner
    role {
      roleAccounts {
        accountId
      }
    }
  }
}
```

#### Get the global Allo stats

```gql
{
  allo(chainId: "5") {
    registry
    feePercentage
    baseFee
    treasury
    cloneableStrategies
    updatedAt
  }
}
```

#### Get all function calls to your contract groups (thus far)

```gql
{
  alloTransactions {
    hash
    fromAddress
    toAddress
    functionName
    functionArgs
    status
    blockHash
    blockNumber
    blockTimestamp
    chainId
  }
}
```

# Migrations

All of your Postgres table changes should be codified as migrations within the [`.spec/migrations`](/.spec/migrations) folder.
When adding new live tables (via the desktop app), these get written for you. But for other migrations, such as adding new SQL functions to be exposed as GraphQL fields ([example](/.spec/migrations/1695301779000_allo_transactions_from/up.sql)) or adding indexes to table columns so that you can then "order by" these columns during your GraphQL queries ([example](/.spec/migrations/1695301364000_index_txs_by_timestamp/up.sql)), these should be written manually.

### Generate a New Migration

To create a new empty set of migration files for a particular migration/action you need to perform, you can run the following:

```bash
$ spec new migration add_some_index_to_something
```

This will generate a new subfolder within the `.spec/migrations/` directory, prefixed with a timestamp. It will also create the empty `up/down` migration files.

## Writing Migrations

You can add any type of schema-modifying SQL statements inside your migrations, just make sure to wrap them in a SQL transaction:
```sql
BEGIN;
  ...
COMMIT;
```

## Applying Migrations

To apply the migrations to your database that haven't been run yet, you can run the following:

```bash
$ spec migrate
```

By default this will run the migrations against the **local** database outlined in your `.spec/connect.toml` file. To run migrations against another database environment (such as prod), you'll first need to create a new section within `connect.toml`:

```toml
[prod]
name = '...'
port = ...
host = '...'
user = '...'
password = '...'
```
You can then specify which database environment to run migrations against with the `--env` flag.

```bash
$ spec migrate --env prod
```

# Helpful Tips 

One of the most helpful commands when debugging / inspecting the live data coming out of the Spec network is the `spec tail` command, which lets you live tail any event stream on Spec.

## Tailing Contract Events

If you ever want to tail a contract event stream when debugging Live Objects to make sure they are propertly being indexed by the Spec network, you can do something like the following:

```bash
$ spec tail allov2.Registry.ProfileCreated
```

## Tailing Live Object Events

Every Live Object that's published to Spec will broadcast an event anytime one of its records is changed. These are the events your Live Tables subscribe to in order to stay up-to-date over time. Every Live Object event has the same naming structure, which is:

```
<namespace.LiveObject>Changed
```

Basically, the event name is simply the Live Object name with a "Changed" suffix tacked on.

Example (this will be an empty stream until the first change occurs since the object was published):
```bash
$ spec tail allov2.ProfileChanged
```