# language: es
@compra
Característica: Proceso de compra
  Como un cliente de Sauce Demo
  Quiero completar una compra
  Para poder adquirir los productos que necesito

  Antecedentes:
    Dado que el usuario "standard_user" inició sesión
    Y agrega el producto "Sauce Labs Backpack" al carrito
    Y va al carrito
    Y inicia el checkout

  @happypath
  Escenario: Completar la compra hasta la confirmación
    Cuando ingresa sus datos: nombre "Juan", apellido "Perez" y código postal "110111"
    Entonces el resumen de la compra muestra el producto "Sauce Labs Backpack"
    Y el resumen muestra el total
    Cuando finaliza la compra
    Entonces se muestra el mensaje de confirmación "Thank you for your order!"
    Y el contador del carrito no se muestra

  @unhappypath
  Esquema del escenario: No se puede continuar el checkout sin datos obligatorios - <caso>
    Cuando ingresa sus datos: nombre "<nombre>", apellido "<apellido>" y código postal "<codigo>"
    Entonces se muestra el mensaje de error del checkout "<mensaje>"

    Ejemplos:
      | caso                 | nombre | apellido | codigo | mensaje                        |
      | sin nombre           |        | Perez    | 110111 | Error: First Name is required  |
      | sin apellido         | Juan   |          | 110111 | Error: Last Name is required   |
      | sin código postal    | Juan   | Perez    |        | Error: Postal Code is required |
