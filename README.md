# Dash-ed

Proyecto en desarollo por alumnos de ITESM campus Monterrey

Integrantes:

Instructor:
* Alfredo Salazar

Desarolladores:
* Fernando López Martínez A01172527
* Juan Pestana A00817057
* Edgardo Acosta Leal A00813103
* Jorge Ivan Diaz Sanchez A01191342

Coordinador de proyecto:
* Jorge Ivan Diaz Sanchez

Coordinador de BackEnd:
* Fernando Lopez Martinez

Coordinador FrontEnd:
* Jorge Ivan Diaz Sanchez

Cliente:
* Jorge Ivan Diaz Sanchez
* Ivan Mena

Descripcion:

El proyecto consiste en una aplicación web dirigida hacia los usuarios (maestros)
que utilizan los contenidos de La Empresa de tal manera que puedan generar
prácticas y exámenes para sus alumnos. Así también se trata de generar una
comunidad para que los maestros aporten con información, creación y revisión de
reactivos (preguntas). También se desarrollará un portal para los administradores
para que puedan dar de alta nuevos contenidos, reactivos, relación de OEA’s
(Objetivo Específico de Aprendizaje), y revisión de reactivos.

El proyecto cumplirá los siguientes propósitos:


* Proporcionar una herramienta administrativa para La Empresa:
* Dar de alta contenidos (Reactivos en masa, links, relación de OEAs,
aceptación y revisión de reactivos).
* Modificación de contenidos.

* Proporcionar una herramienta para los usuarios de La Empresa:
* Una comunidad (Estilo red social)

* Aportar contenidos y reactivos.
* Generador de prácticas y exámenes.
* Ver noticias e información relevante proporcionado por la Empresa.

## Backend

### Prerequisites
You need to have Docker installed on your local machine.

### Installing
Download the entire folder to your computer and then open your terminal and navigate to its location.

Then run

```
docker-compose up
```
This will run `yarn run dev` and start `app.js` in `localhost:3000`.

For running in the background (and omitting all of the logs) run
```
docker-compose up -d
```

then you can access the logs of a specific container like this
```
docker-compose logs -f api
```

For shutting down use
```
docker-compose down
```

For shutting down and removing the created images run
```
docker-compose down --rmi local
```

### Bash
For entering to bash inside the nodejs container created open a new terminal and run 

```
docker-compose exec api bash
```

### Making changes
Because of the bind volume created, all of the changes you make to the files in the host, will take effect inside the container. After making a change inside a `*.js` file, just save the file and `nodemon` will restart `app.js` automatically.

### Adding node modules
Once you add/remove/upgrade a node module inside bash, `package.json` will change. Nevertheless, the next time you create new containers, the changes won't take effect. For the new change to take effect, you must re-build the image using

```
docker-compose build
```

This will re-build the images, causing the `package.json` file to be copied into the nodejs container and re-run `yarn install && yarn cache clean` inside the container.

### Tests
For running the tests run

```
docker-compose run --rm api bash -c 'yarn run test'
```

This will create a new container and run the `./src/domain/**/*.test.js` files using `jest`. To exit just Ctrl+c.

If you ran the above command without running `docker-compose up` previously, make sure to run `docker-compose down` after testing in order to remove the `postgres` image created.

### Components
#### api
This folder contains the Swagger API specification for the REST API, which is loaded and converted for proper use inside nodejs.

#### sql
This folder contains the script for initializing the database.

#### src
This folder contains all of the logic for implementing the REST API.

We're using swagger tools in order to integrate the API specification into the implementation. This allows us to use the definitions and validations described in the specification and use those to filter the incoming data, keeping our code in sync with the API reference. The middelwares used for doing that are:
- `swaggerMetadata`: Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
- `swaggerValidator`: Validate Swagger requests
- `swaggerUi`: Serve the Swagger documents and Swagger UI in localhost:3000/docs

The logic for implementing the handlers (controllers) of the validated requests is divided into the following middlewares:
- `swaggerOperationController`: Route validated requests to an appropriate controller and extract all of the important data for the controllers.
- `sendControllerResponse`: Verify the results of the controllers, this way the controllers doesn't have to worry about the response, keeping clean the code and omitiing the validation boilerplate code.
- `errorHandler`: Manage the errors encountered in some middleware or controller logic up the middleware chain.

### Documentation
#### Database
We use [Schemaspy](http://schemaspy.org) to generate a website representating the database schema in an interactive way.

In order to generate the site just run

```
make docs
```
The result will be the creation of the `db` folder inside the `docs` folder, containing all of the necesary resources that allows the creation of the website.

Next, visit `/v1/docs/db/1029` to view the database schema in your browser.