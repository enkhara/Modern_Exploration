# Práctica Modern Exploration Airbnb

## Estructura de la prácitca:

- [index.html](/index.html)
- [main.css](/main.css)
- [map.js](/map.js)
- [graphic.js](/graphic.js)

### Index.html

Aquí cargamos los archivos y las librerias necesarias:
```
        <script src="https://d3js.org/d3.v5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.25.6/d3-legend.min.js"></script>
        <script src="graphic.js"></script>
        <script src="map.js"></script>
```
y el Css
```
        <link rel="stylesheet" href="main.css">
```

### Map.js

En este archivo, cargamos el json, y pintamos el mapa de Madrid por colores según el precio medio
Una vez pintado, utilizando las funciones de raton on.Click llamamos a la funcion de pintado de grafico que está en graphic.js para que nos pinte el gráfico por barrio.

### Graphic.js

Desde map.js obtenemos la información del barrio que se ha seleccionado y se pinta una gráfica que muestra los pisos totales según el número de habitaciones

