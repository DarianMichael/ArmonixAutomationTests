Feature: Cambio Precio Contrato

    Funcionalidad del cambio del precio del contrato según sus características.

    Scenario Outline: Cuando se le cambia el precio al contrato
        Given Un usuario se loggea en Armonix "<username>""<password>"
        When Un usuario abre el catalogo Transacciones y busca por el numero de contrato "<numContract>"
        Then Un usuario procede al cambio del precio del contrato segun los requerimientos "<numContract>"
        Examples:
            | username         | password     | numContract |
            | efvelasquez      | 3fv3l@as2021 |  80012163   |
            | efvelasquez      | 3fv3l@as2021 |  81701      |
            | efvelasquez      | 3fv3l@as2021 |  4041609    |
            | efvelasquez      | 3fv3l@as2021 |  496885     |
            | efvelasquez      | 3fv3l@as2021 |  811290     |
            | efvelasquez      | 3fv3l@as2021 |  131030     |
            | efvelasquez      | 3fv3l@as2021 |  2001237    |

        
            

           
            