// >> Consigna:
// Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
// Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
// Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
// Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

// // Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
// [
//     {
//       "title": "Escuadra",
//       "price": 123.45,
//       "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//       "id": 1
//     },
//     {
//       "title": "Calculadora",
//       "price": 234.56,
//       "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//       "id": 2
//     },
//     {
//       "title": "Globo Terráqueo",
//       "price": 345.67,
//       "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//       "id": 3
//     }
//    ]
// Formato: link a un repositorio en Github y url de proyecto subido a glitch
// Observación: no incluir la carpeta node_modules   


const fs = require ('fs');
const express = require ('express');

const app = express();

const PORT = 8080;

class Container {

  constructor( file ) {
    this.file = file
}

getAll() {
  try{
    const objects =  fs.readFileSync( this.file, 'utf-8')
    return JSON.parse(objects)
  } catch(err) {
      console.error({err})
  }
}



getById( id ) {
  const objects =this.getAll()
  try {
    const object = objects.find( ele => ele.id === id)
    return object 
    ? object 
    : null

  } catch(err) {
      console.error({err})
  }
}


}



const products = new Container('products.txt')


app.get('/', (req,res) =>{
  res.send(`
  <h1> Hello world this is the challenge 3 </h1>
  <h2> Suggested routes to type: <br>
  <ul>
   <li> <a href ="/products">/products</a> </li>
   <li><a href ="/randomProduct">/randomProduct </a></li>
  </ul>
  `)
})

app.get('/products', (req,res) =>{

  res.send(products.getAll())
})

app.get('/randomProduct', (req,res) =>{

  res.send(products.getById(Math.floor(Math.random()* 3)+1))
})

app.listen(PORT, () => console.log (`READY on port: ${PORT}`))





