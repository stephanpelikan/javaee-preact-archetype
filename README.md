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

to install the Archetype locally. Afterwards you use the Archetype to build new projects:

```sh
mvn archetype:generate -DarchetypeGroupId=at.phactum.pwa -DarchetypeArtifactId=pwa-archetype -DarchetypeVersion=0.0.1-SNAPSHOT -DgroupId=test1.test2 -DartifactId=test3
```

### Todos
 - Client side caching

License
----

Apache 2.0

   [Preact]: <https://preactjs.com/>
   [Bulma]: <https://bulma.io/>
