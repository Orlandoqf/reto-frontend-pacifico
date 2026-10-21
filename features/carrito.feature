# language: es
@carrito
Característica: Carrito de compras
  Como un cliente de Sauce Demo
  Quiero agregar productos al carrito
  Para poder comprarlos después

  Antecedentes:
    Dado que el usuario "standard_user" inició sesión

  @happypath
  Escenario: Agregar un producto al carrito desde la página de productos
    Cuando agrega el producto "Sauce Labs Backpack" al carrito
    Entonces el contador del carrito muestra "1"
    Y el producto "Sauce Labs Backpack" muestra el botón "Remove"

  @happypath
  Escenario: Ver los productos agregados en el carrito
    Cuando agrega los siguientes productos al carrito:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    Y va al carrito
    Entonces el carrito contiene los productos:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |

  @happypath
  Escenario: Quitar un producto del carrito desde la página de productos
    Cuando agrega el producto "Sauce Labs Backpack" al carrito
    Y quita el producto "Sauce Labs Backpack" del carrito
    Entonces el contador del carrito no se muestra
