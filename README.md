# Entrega final . Nicolas Mamonde

# Proceso

1. El usuario ingresa a la página y tiene una opción para iniciar la sesión o se identifique - Esta sesión se guardará en el localStorage, cerrando la sesión solo al finalizar la compra.
2. Selecciona los productos que desea comprar.
3. Para agregarlos, hace clic en el botón "Agregar al carrito" que se muestra abajo de cada producto.
4. En la parte superior del carrito se mostrará el total.
5. Al finalizar la selección, se podrá hacer clic en el botón "Finalizar compra"
6. Se procede a pagar y finaliza la experiencia de usuario.

- El localStorage del usuario se almacena para mostrar y no volver a solicitar el ususario. Y el del carrito permite mostrar los productos pese a actualizar la web.

# Recursos 
- bootstrap
* sweetalert2

# Desarrollo

La página cuenta con 10 productos que se ingresan a través de la creación de un archivo .json, cuya información se cargará de manera asíncrona con uso de async/await como sustitución de .then en más de una oportunidad.
- Se agrega el elemto botón por medio de un elemento identificado con la clase .btnAddProduct , con un click llamado con un addEventListener y de identificar los productos

- Se calcula el total, considerando las posibles eliminaciones de los productos.
- Muestra el total.
- Se agrega un botón para finalizar la compra y mostrar un mensaje de compra exitosa.


