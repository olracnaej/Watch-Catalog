// ===== EDIT THESE =====
var PHONE = "8617 7796"; // WhatsApp number shown on the page (plain text, no button, no country code)
var CURRENCY = "₡"; // currency symbol printed before every price (Costa Rican colón)

// Each watch below is one object written on a single line. Its properties are:
//   id    = unique number that identifies the watch
//   brand = brand name (also used by the brand filter)
//   name  = model name
//   type  = kind of watch (also used by the type filter)
//   price = price as a plain number, without symbol or commas
//   dial  = color of the watch face in the generated drawing
//   strap = color of the strap in the generated drawing
//   desc  = short description shown in the detail window
//   size  = case size shown in the detail window
//   water = water resistance shown in the detail window
var WATCHES = [ // the list of all watches; to add one, copy a line and change its values
  {id:1,brand:"Casio",name:"Classic Digital F-91",type:"Digital",price:18000,dial:"#2b2b2b",strap:"#444",desc:"Reloj digital de resina, liviano, con alarma y cronómetro.",size:"35 mm",water:"30 m"}, // Casio Classic Digital F-91
  {id:2,brand:"Seiko",name:"Seiko 5 Automatic",type:"Automático",price:165000,dial:"#1d3557",strap:"#7a5230",desc:"Movimiento automático de cuerda propia con calendario de día y fecha.",size:"40 mm",water:"100 m"}, // Seiko Seiko 5 Automatic
  {id:3,brand:"Citizen",name:"Eco-Drive Classic",type:"Analógico",price:210000,dial:"#f4efe3",strap:"#222",desc:"Funciona con energía solar, nunca necesita cambio de batería.",size:"41 mm",water:"50 m"}, // Citizen Eco-Drive Classic
  {id:4,brand:"Timex",name:"Weekender 38",type:"Analógico",price:62000,dial:"#e8e2d0",strap:"#8a6b3f",desc:"Estilo sencillo para todos los días, con correa intercambiable.",size:"38 mm",water:"30 m"}, // Timex Weekender 38
  {id:5,brand:"Casio",name:"G-Shock GA-2100",type:"Digital",price:98000,dial:"#111",strap:"#111",desc:"Diseño delgado y resistente a golpes, con hora mundial.",size:"45 mm",water:"200 m"}, // Casio G-Shock GA-2100
  {id:6,brand:"Seiko",name:"Presage Cocktail",type:"Automático",price:340000,dial:"#7b1e3a",strap:"#2a1a14",desc:"Esfera sunburst con fondo de caja transparente.",size:"40.5 mm",water:"50 m"}, // Seiko Presage Cocktail
  {id:7,brand:"Orient",name:"Bambino Open Heart",type:"Automático",price:185000,dial:"#fff",strap:"#4a3320",desc:"Reloj de vestir que deja ver el balancín a través de la esfera.",size:"40.5 mm",water:"30 m"}, // Orient Bambino Open Heart
  {id:8,brand:"Citizen",name:"Promaster Diver",type:"Analógico",price:275000,dial:"#0b3d2e",strap:"#111",desc:"Reloj profesional de buceo con bisel giratorio.",size:"44 mm",water:"300 m"} // Citizen Promaster Diver
];  // end of the watch list
