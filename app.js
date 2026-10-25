var $ = function (id) { return document.getElementById(id); }; // shortcut: $("x") finds the page element whose id is "x"

function money(n) { return CURRENCY + n.toLocaleString("en-US"); } // turns 18000 into "₡18,000" using the currency from data.js

function svg(w) { // builds the SVG drawing of one watch (w = a watch object from data.js)
  var marks = ""; // will collect the 12 hour markers as SVG text
  for (var i = 0; i < 12; i++) { // repeat 12 times, once for each hour marker
    var a = i * 30 * Math.PI / 180; // angle of this marker in radians (markers are 30 degrees apart)
    var r1 = i % 3 == 0 ? 34 : 38; // inner radius: the markers at 12, 3, 6 and 9 are longer
    var r2 = 42; // outer radius where every marker ends
    marks += '<line x1="' + (60 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (60 - r1 * Math.cos(a)).toFixed(1) + // start point of the marker
      '" x2="' + (60 + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (60 - r2 * Math.cos(a)).toFixed(1) + // end point of the marker
      '" stroke="#bbb" stroke-width="' + (i % 3 == 0 ? 2.5 : 1.2) + '"/>'; // gray color and thicker line for the main hours
  } // end of the loop
  return '<svg viewBox="0 0 120 190" role="img" aria-label="' + w.name + '">' + // opens the drawing; aria-label describes it for screen readers
    '<rect x="42" y="0" width="36" height="190" rx="8" fill="' + w.strap + '"/>' + // the strap: a tall rectangle with rounded corners
    '<circle cx="60" cy="95" r="52" fill="#c9c5bb"/>' + // the outer metal case of the watch
    '<circle cx="60" cy="95" r="47" fill="' + w.dial + '"/>' + // the dial (face) in this watch's own color
    '<g transform="translate(0,35)">' + marks + // a group that moves the hour markers down to the center of the dial
    '<line x1="60" y1="60" x2="60" y2="38" stroke="#eee" stroke-width="3" stroke-linecap="round"/>' + // the long hand, pointing up
    '<line x1="60" y1="60" x2="74" y2="66" stroke="#eee" stroke-width="2.5" stroke-linecap="round"/>' + // the short hand, pointing right and slightly down
    '<circle cx="60" cy="60" r="3" fill="#d4a455"/>' + // the gold dot in the center of the hands
    '</g></svg>'; // closes the group and the drawing
} // end of the svg function

function fill(sel, label, vals) { // fills a dropdown menu: one first option plus one option per value
  sel.innerHTML = '<option value="">' + label + '</option>' + // first option, e.g. "Todas las marcas", with an empty value
    vals.map(function (v) { return '<option>' + v + '</option>'; }).join(""); // one <option> for each value, joined into one text
} // end of the fill function

function uniq(k) { // returns the sorted list of different values of property k (for example every brand)
  return WATCHES.map(function (w) { return w[k]; }) // takes only property k from each watch
    .filter(function (v, i, a) { return a.indexOf(v) == i; }) // removes repeated values
    .sort(); // sorts alphabetically
} // end of the uniq function

fill($("brand"), "Todas las marcas", uniq("brand")); // fills the brand dropdown with every brand found in the list
fill($("type"), "Todos los tipos", uniq("type")); // fills the type dropdown with every type found in the list
document.querySelectorAll(".phone").forEach(function (el) { el.textContent = PHONE; }); // writes the phone number into every element with class "phone"

function render() { // redraws the grid using the current search text and filters
  var q = $("q").value.trim().toLowerCase(); // search text in lowercase, without spaces at the ends
  var b = $("brand").value; // selected brand ("" means all brands)
  var t = $("type").value; // selected type ("" means all types)
  var s = $("sort").value; // selected order: "", "asc" or "desc"
  var list = WATCHES.filter(function (w) { // keeps only the watches that pass every filter
    return (!b || w.brand == b) && // passes if no brand is selected or the brand matches
      (!t || w.type == t) && // passes if no type is selected or the type matches
      (!q || (w.name + " " + w.brand).toLowerCase().indexOf(q) > -1); // passes if the search is empty or found in name/brand
  }); // end of the filter
  if (s) list.sort(function (a, c) { return s == "asc" ? a.price - c.price : c.price - a.price; }); // sorts by price when an order is chosen
  $("count").textContent = list.length + (list.length == 1 ? " reloj" : " relojes"); // shows how many watches match, e.g. "8 relojes"
  $("grid").innerHTML = list.length ? list.map(function (w) { // draws one card per watch, or the empty message below
    return '<button class="card" data-id="' + w.id + '">' + // the card is a button; data-id remembers which watch it is
      '<div class="pic">' + svg(w) + '</div>' + // the drawing of the watch
      '<div class="info">' + // opens the text area of the card
      '<div class="brand">' + w.brand + '</div>' + // brand name
      '<div class="name">' + w.name + '</div>' + // model name
      '<div class="price">' + money(w.price) + '</div>' + // formatted price
      '</div></button>'; // closes the text area and the card
  }).join("") : '<div class="empty">Ningún reloj coincide con su búsqueda.</div>'; // joins all cards, or shows the "no results" message
} // end of the render function

["q", "brand", "type", "sort"].forEach(function (id) { // goes through the search box and the three dropdowns
  $(id).addEventListener("input", render); // redraws the grid whenever the user types or changes one of them
}); // end of the loop

$("grid").addEventListener("click", function (e) { // listens for clicks anywhere inside the grid
  var c = e.target.closest(".card"); // finds the card that was clicked (if any)
  if (!c) return; // the click was not on a card, so do nothing
  var w = WATCHES.filter(function (x) { return x.id == c.dataset.id; })[0]; // finds the watch whose id matches the card's data-id
  $("modal").innerHTML = '<div class="pic">' + svg(w) + '</div>' + // left column: the bigger drawing of the watch
    '<div class="info">' + // opens the right column with the details
    '<div class="brand">' + w.brand + '</div>' + // brand name
    '<h2>' + w.name + '</h2>' + // model name as a heading
    '<div class="price">' + money(w.price) + '</div>' + // formatted price
    '<p>' + w.desc + '</p>' + // short description
    '<ul class="specs">' + // opens the specifications list
    '<li><b>Tipo:</b> ' + w.type + '</li>' + // type of watch
    '<li><b>Tamaño de caja:</b> ' + w.size + '</li>' + // case size
    '<li><b>Resistencia al agua:</b> ' + w.water + '</li>' + // water resistance
    '</ul>' + // closes the specifications list
    '<div class="whatsapp">Para consultar por este reloj, escriba por WhatsApp al <strong class="phone">' + PHONE + '</strong></div>' + // big phone number (text only)
    '</div>'; // closes the right column
  $("dlg").showModal(); // opens the detail window on top of the page
}); // end of the click listener

$("x").addEventListener("click", function () { $("dlg").close(); }); // the X button closes the detail window
$("dlg").addEventListener("click", function (e) { if (e.target === $("dlg")) $("dlg").close(); }); // clicking the dark area outside the window also closes it
render(); // draws the grid for the first time when the page loads
