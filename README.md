Se trata de un proyecto sobre una tienda de ropa.
Dicha pagina web se puede utilizar tanto por un cliente como por el administrador de la tienda, ya que la funcionalida esta hecha para ambas partes.
Por la parte del cliente podemos ver tanto la lista de los productos que la tienda posee, como seleccionar entre las distintas categoria o entrar a ver un producto con mas detalle.
Por parte del administrador, toda la funcionalidad esta restringido por un logeado. Este usuario puede ver productos, editarlos y eliminarlos.
Rutas
Productos

    GET /products - Muestra todos los productos.
    GET /products/:id - Muestra los detalles de un producto por su ID.

Dashboard (Requiere Autenticación)

    GET /dashboard - Muestra todos los productos en el dashboard.
    GET /dashboard/new - Muestra el formulario para crear un nuevo producto.
    GET /dashboard/:id - Muestra los detalles de un producto por su ID en el dashboard.
    POST /dashboard - Crea un nuevo producto.
    GET /dashboard/:id/edit - Muestra el formulario para editar un producto por su ID.
    PUT /dashboard/:id - Actualiza un producto por su ID.
    DELETE /dashboard/:id/delete - Elimina un producto por su ID.

Autenticación

    GET /login - Muestra el formulario de inicio de sesión.
    POST /login - Autentica al usuario y redirige a la lista de productos.
    GET /logout - Cierra la sesión del usuario.

Controladores

Los controladores para manejar las rutas se encuentran en el directorio controllers y están organizados de la siguiente manera:

    productController.js
        showProducts - Muestra todos los productos.
        showProductById - Muestra un producto por su ID.
        createProduct - Crea un nuevo producto.
        showEditProduct - Muestra el formulario de edición de un producto.
        updateProduct - Actualiza un producto existente.
        deleteProduct - Elimina un producto.
        showNewProduct - Muestra el formulario de nuevo producto.
        showFormulario - Muestra el formulario de inicio de sesión.

    authController.js
        authUsuario - Autentica al usuario.
        checkAuth - Middleware que verifica la autenticación del usuario.
        logOut - Cierra la sesión del usuario.


