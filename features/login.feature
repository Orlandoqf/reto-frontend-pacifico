# language: es
@login
Característica: Inicio de sesión en Sauce Demo
  Como un cliente de Sauce Demo
  Quiero poder iniciar sesión
  Para poder ver y comprar los productos

  Antecedentes:
    Dado que el usuario está en la página de login

  @happypath
  Escenario: Iniciar sesión con credenciales válidas
    Cuando inicia sesión con el usuario "standard_user" y la clave "secret_sauce"
    Entonces se muestra la página de productos

  @unhappypath
  Escenario: El usuario bloqueado no puede iniciar sesión
    Cuando inicia sesión con el usuario "locked_out_user" y la clave "secret_sauce"
    Entonces se muestra el mensaje de error "Epic sadface: Sorry, this user has been locked out."
    Y el usuario sigue en la página de login

  @unhappypath
  Esquema del escenario: No se puede iniciar sesión con credenciales inválidas - <caso>
    Cuando inicia sesión con el usuario "<usuario>" y la clave "<clave>"
    Entonces se muestra el mensaje de error "<mensaje>"
    Y el usuario sigue en la página de login

    Ejemplos:
      | caso                 | usuario       | clave        | mensaje                                                                   |
      | clave incorrecta     | standard_user | clave_mala   | Epic sadface: Username and password do not match any user in this service |
      | usuario inexistente  | usuario_falso | secret_sauce | Epic sadface: Username and password do not match any user in this service |
      | usuario vacío        |               | secret_sauce | Epic sadface: Username is required                                        |
      | clave vacía          | standard_user |              | Epic sadface: Password is required                                        |
