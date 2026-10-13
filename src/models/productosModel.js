//importar la conexion a la base de datos con prisma
//para el ejemplo simularemos una bd
 const datos = [
   {"id": 1, "nombre": "Laptop de segunda", "precio": 1200000 },
   {"id": 2, "nombre": "Mouse inalambrico", "precio": 45000 }
   ];
const listar = async () => {
   //consulta a bd con await
   return datos;
//return "listado de modelo"
};

module.exports = listar
