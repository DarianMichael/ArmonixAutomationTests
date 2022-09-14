Feature: Login a la página

    Feature Login page will work depending on the user credentials.

    Background:
        Given Un usuario abre la página web

    Scenario Outline: Login Credenciales Incorrectas
        When Un usuario proporciona credenciales incorrectas "<username>""<password>"
        And Un usuario hace click en el botón de inicio de sesión
        Then Se muestra el mensaje de error "Usuario o contraseña incorrecto"
        Examples:
            | username      | password     |
            | testName      | secret_sauce |
            | edmartinez    | vimeworks2022|
            | standard_user | testPassword |

    Scenario: Login con éxito
        When Un usuario ingresa el nombre de usuario "EDPALADINES"
        And Un usuario ingresa la contraseña "Dp4l4dines_"
        And Un usuario hace click en el botón de inicio de sesión
        Then El título de la página contendrá "Saludsa | Armonix"

    Scenario: Login Transacciones
        When Un usuario ingresa el nombre de usuario "EDPALADINES"
        And Un usuario ingresa la contraseña "Dp4l4dines_"
        And Un usuario hace click en el botón de inicio de sesión
        Then Despliega combo transacciones


    