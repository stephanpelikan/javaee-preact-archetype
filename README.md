# Progressive Webapp Archetype
This maven project is a progressive webapp including this features:
- Client
  - [Preact]
  - [Bulma]
  - Webpack
  - Typescript
  - js treeshaking
  - css treeshaking
- Server
  - JavaEE 7.0
  - Support gzip content-encoding

# Building the Archetype
Run

```sh
mvn clean archetype:create-from-project -DpropertyFile=./archetype.properties
```

after checkout. This will generate an Archetype in

```sh
target/generated-sources/archetype
```

You can change to this directory an run

```sh
mvn install
```

to install the Archetype locally.

# Usage

Once the Archetype is intalled you can use the Archetype to build new projects:

```sh
mvn archetype:generate -DarchetypeGroupId=at.phactum.pwa -DarchetypeArtifactId=pwa-archetype -DarchetypeVersion=0.0.1-SNAPSHOT -DgroupId=test1.test2 -DartifactId=test3
```
To build the project run

```sh
mvn install
```
for fully optimized output.

For development using Eclipse simply import the project. Deploy the project to a server (WildFly, Tomcat). Aftwards you can 

```sh
cd src/main/frontend
npm run start
```
to run the webapp in a browser with activated hot module replacement.

### Todos
 - Client side caching
 - This project is still under development and will be updated...
 
License
----

Apache 2.0

   [Preact]: <https://preactjs.com/>
   [Bulma]: <https://bulma.io/>
