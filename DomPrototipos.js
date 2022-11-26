/**
 * A DomElement is the main constructor for objects that represent
 * the Dom hierarchy.
 */
function DomElement(type, childrenDefinition, styleDefinition) {
  this.type = type;
  this.styles = {};
  this.children = [];
  this.events = [];

  var styleKeys = Object.keys(styleDefinition);

  if(styleKeys.find((style) => style == type)) {
    this.styles = styleDefinition[type]
  }

  for (let index = 0; index < (childrenDefinition || []).length; index++) {
    var definition = childrenDefinition[index];
    var newElement = new DomElement(definition.type, definition.children);
    newElement.__proto__ = this;
    this.children.push(newElement);
  }
}

/**
 * All Dom elements know how to print themselves
 */
DomElement.prototype.toString = function (indent) {
  if (!indent) {
    indent = 0;
  }
  var result = " ".repeat(indent);
  result = result + "Node " + this.type + " {";
  var styleKeys = Object.keys(this.styles);
  for (let index = 0; index < styleKeys.length - 1; index++) {
    var styleKey = styleKeys[index];
    result = result + styleKey + ":" + this.styles[styleKey] + ", ";
  }
  if (styleKeys.length > 0) {
    result =
      result +
      styleKeys[styleKeys.length - 1] +
      ":" +
      this.styles[styleKeys[styleKeys.length - 1]];
  }
  result = result + "}";
  for (let index = 0; index < this.children.length; index++) {
    var element = this.children[index];
    result = result + "\n" + element.toString(indent + 2);
  }
  return result;
};

var definition = {
  type: "html",
  children: [
    {
      type: "head",
    },
    {
      type: "body",
      children: [
        {
          type: "div",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "h1",
                },
                {
                  type: "p",
                },
                {
                  type: "p",
                },
              ],
            },
            {
              type: "section",
              children: [
                {
                  type: "h1",
                },
                {
                  type: "p",
                },
                {
                  type: "p",
                },
              ],
            },
          ],
        },
        {
          type: "aside",
          children: [
            {
              type: "h1",
            },
            {
              type: "p",
            },
            {
              type: "p",
            },
          ],
        },
      ],
    },
  ],
};

var definition2 = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "h1",
        },
        {
          type: "p",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "p",
                }
              ]
            }
          ]
        },
        {
          type: "p",
        },
      ],
    },
    {
      type: "section",
      children: [
        {
          type: "h1",
        },
        {
          type: "p",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "p"
                }
              ]
            }
          ]
        },
        {
          type: "p",
        },
      ],
    },
  ],
};

/*
 * La raiz del dom será el primer elemento de nuestras definiciones.
 */
var dom = new DomElement(definition.type, definition.children);

var dom2 = new DomElement(definition2.type, definition2.children);

/*
Podemos probar añadir unos estilos y ver que sucede
*/

dom.children[1].styles = {
  background: "red",
  color: "blue",
};

dom.children[1].children[0].children[0].styles = {
  size: 17,
  color: "green",
};

dom2.styles = {
  backgroundColer: "green",
};

dom2.children[0].styles = {
  color: "red",
};

dom2.children[0].children[1].styles = {
  color: "blue",
  size: 15,
};

//console.log(" ");
//console.log(dom.toString());

/**************** PUNTO 1 ******************************/

/*
Queremos poder contar con una definición de estilos como a la siguiente.
*/
var styles = {
  "body section": {
    color: "green",
    size: 25,
  },
  body: {
    background: "black",
  },
  h1: {
    size: 50,
    color: "red",
  },
  "aside h1": {
    size: 30,
  },
};

function getDomElementsByType(domElement, type) {
  return getDomElementsByTypeAux(domElement, type, []);
}

function getDomElementsByTypeAux(domElement, type, array) {
  if (domElement.type == type) {
    array.push(domElement);
  }

  for (let index = 0; index < (domElement.children || []).length; index++) {
    var element = domElement.children[index];
    getDomElementsByTypeAux(element, type, array);
  }
  return array;
}

function getDomElementsBySelector(domElement, selector) {
  var selectorSplited = selector.trim().split(/\s+/);
  var domElements = getDomElementsByType(domElement, selectorSplited[0]);
  var domElementsAux = [];

  for (let index1 = 1; index1 < selectorSplited.length; index1++) {
    for (let index = 0; index < domElements.length; index++) {
      domElementsAux = domElementsAux.concat(
        getDomElementsByType(domElements[index], selectorSplited[index1])
      );
    }
    domElements = domElementsAux;
    domElementsAux = [];
  }

  return domElements;
}

function getDomElementsBySelector2(domElement, selector) {
  var selectorSplited = selector.trim().split(/\s+/);

  if(selectorSplited.length == 1) {
    return getDomElementsByType(domElement, selectorSplited[0])
  }

  return getDomElementsBySelectorAux(domElement, selectorSplited, selectorSplited, [])
}

function getDomElementsBySelectorAux(domElement, originalSelectorSplited, selectorSplited, array) {
  if(selectorSplited.length == 1 && domElement.type == selectorSplited[0]) {
    array.push(domElement)
  }

  for (let index = 0; index < domElement.children.length; index++) {
    if(domElement.type == selectorSplited[0] && selectorSplited[1] == domElement.children[index].type) {
      getDomElementsBySelectorAux(domElement.children[index], originalSelectorSplited, selectorSplited.slice(1), array)
    } else {
      getDomElementsBySelectorAux(domElement.children[index], originalSelectorSplited, originalSelectorSplited, array)
    }
  }

  return array
}

console.log(getDomElementsBySelector2(dom2, "div div p"))
console.log(dom2.toString())

/*
El objetivo, es poder aplicar esos estilos a cada elemento del dom
según indique la regla asociada.
Ej. si la regla es "h1", entonces el estilo se aplica a todos los elementos
de tipo h1, pero si es "body h1" entonces se aplica a los h1 que están
dentro de body.

Más aún, los estilos se heredan según jerarquía. Si por ejemplo, si
"body" tiene color "red", entonces todos los hijos de body también
tendrán color "red", salvo que haya una regla que indique lo contrario.

Se pide entonces que implemente el comportamiento de getStyle
para que se le pueda preguntar a cualquier elemento del dom por sus
estilos completos, que incluyen tanto los declarados como los heredados.

Luego cree un metodo "viewStyleHierarchy" que imprima todos los nodos
con sus estilos completos (los propios y heredados), de forma similar a
toString (pero con tooooooodos los estilos).
*/

function getStyle(domElement) {
  return getStyleAux(domElement, {});
}

function getStyleAux(domElement, fullStyles) {
  if (domElement == null) return fullStyles;

  if (Object.keys(domElement).includes("styles")) {
    var elementStyles = domElement.styles;
    var stylesKeys = Object.keys(elementStyles);
    var fullStylesKeys = Object.keys(fullStyles);

    stylesKeys = stylesKeys.filter((name) => !fullStylesKeys.includes(name));

    for (let index = 0; index < stylesKeys.length; index++) {
      fullStyles[stylesKeys[index]] = elementStyles[stylesKeys[index]];
    }
  }
  return getStyleAux(Object.getPrototypeOf(domElement), fullStyles);
}

//console.log(getStyle(dom2.children[0].children[1]));

var objPadre = { styles: { color: "rojo" } };
var objHijo = { styles: { backgroundColor: "verde" } };
var objNieto = {};
objHijo.__proto__ = objPadre;
objNieto.__proto__ = objHijo;

//console.log(objNieto.styles);
//console.log(Object.getOwnPropertyNames(objNieto));

function viewStyleHierarchy(domElement, indent) {
  if (!indent) {
    indent = 0;
  }
  var result = " ".repeat(indent);
  result = result + "Node " + domElement.type + " {";
  var styleKeys = Object.keys(getStyle(domElement));
  for (let index = 0; index < styleKeys.length - 1; index++) {
    var styleKey = styleKeys[index];
    result = result + styleKey + ":" + getStyle(domElement)[styleKey] + ", ";
  }
  if (styleKeys.length > 0) {
    result =
      result +
      styleKeys[styleKeys.length - 1] +
      ":" +
      getStyle(domElement)[styleKeys[styleKeys.length - 1]];
  }
  result = result + "}";f
  for (let index = 0; index < domElement.children.length; index++) {
    var element = domElement.children[index];
    result = result + "\n" + viewStyleHierarchy(element, indent + 2);
  }
  return result;
}

//console.log(viewStyleHierarchy(dom2));

/**************** PUNTO 2 ******************************/

/*
Queremos agregar la idea de eventos, para que distintos elementos
del DOM puedan reaccionar ante diversos eventos.
Cada elemento del dom debe entender tres metodos más:

* on(nombreDeEvento, handler)
* off(nombreDeEvento)
* handle(nombreDeEvento)

Por ejemplo, podemos decir

dom.children[1].children[0].children[0].on('click', function() {
    console.log('Se apretó click en html body div div');
    return true;
})

El código de la función queda asociado al evento 'click' para ese
elemento del dom, y se activará cuando se haga el handle del evento.

dom.children[1].children[0].children[0].handle('click');


El tema es que queremos poder usar 'this' en la función para referirnos
al objeto que acaba de hacer el "handle" de la función. Ej.

dom.children[1].children[0].children[0].on('click', function() {
    console.log('Se apretó click en un ' + this.type);
    return true;
})

Por otro lado, cuando se hace el handling de un evento, este realiza
el proceso de bubbling-up, es decir, todo padre que también sepa manejar
el evento del mismo nombre debe activar el evento.

Por ejemplo, si activamos 'click' en dom.children[1].children[0].children[0]
y dom.children[1] también sabe manejar 'click', entonces, luego de ejecutar
el 'click' para dom.children[1].children[0].children[0], se deberá hacer el
bubbling-up para que dom.children[1] maneje 'click'. Hay una excepción, sin
embargo. Cuando el handler de un hijo describe falso luego de ejecutar,
el bubbling-up se detiene.

off por su parte, desactiva el handler asociado a un evento.

Se pide entonces que realice los cambios pertinentes para que los elementos
del dom puedan tener este comportamiento.
*/
function Event(name, handler) {
  this.name = name;
  this.handler = handler;
}

DomElement.prototype.on = function (eventName, handler) {
  this.events.push({ name: eventName, handler: handler });
};

DomElement.prototype.on = function (eventName, handler) {
  this.events.push(new Event(eventName, handler));
};

DomElement.prototype.off = function (eventName) {
  this.events = this.events.filter((event) => event.name != eventName);
};

// VER SI TENER EN CUENTA
// Si el domElment con el que se quiere hacer handle no tiene asociado un EVENTO PROPIO con un handler
// entonces no deberia hacerse el bubleing-up
/*
DomElement.prototype.handle = function (eventName) {
  var event = this.events.find((event) => event.name == eventName);

  if (!event) {
    Object.getPrototypeOf(this).handle(eventName);
  }

  var result = event.handler.bind(this)();
  if (result) {
    Object.getPrototypeOf(this).handle(eventName);
  }
};

dom2.on("click", function () {
  console.log("hola soy de tipo " + this.type);
  return true;
});
dom2.children[0].children[0].on("click", function () {
  console.log("queso");
  return true;
});

dom2.children[0].children[0].handle("click");
*/

/*
var ejemplo = {
  name: "pepe",
  handler: function () {
    console.log(this);
    console.log(this.name);
  },
};

var ejemplo2 = {
  name: "pepin",
};

ejemplo.handler();
ejemplo.handler.bind(ejemplo2)();
ejemplo.handler();
*/

/**************** PUNTO 3 ******************************/

/*
Queremos poder mostrar los nodos del dom de forma bonita
en la terminal, mediante el metodo display.

dom.display()

No todo nodo es visible sin embargo. Solo los elementos del body
deben mostrarse en este caso, ya que el head y html son solo
contenedores. Lo mismo ocurre con div, section y aside, que son
elementos invisibles.

Así, en este caso, solo vamos a mostrar los elementos h1 y p.
Pero ¿Qué mostramos de ellos? Para hacer la cosa más divertida, vamos
a agregar un atributo "contents" que nos permita agregar un texto
a esos elementos como contenido. Ese texto será el que se muestre
cuando llamemos a display.

Más aún, cada elemento se muestra de forma distinta según su tipo.
p muestra contents tal cual, pero h1 lo muestra todo en mayúscula, siempre.
Además el color del texto y del fondo depende del estilo del elemento,
(Ver https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)
*/
DomElement.prototype.domElementsWithContent = ["p", "h1"]

DomElement.prototype.canHaveContent = function () {
  return this.domElementsWithContent.includes(this.type);
}

DomElement.prototype.isDescendantOf = function (type) {
  var proto = Object.getPrototypeOf(this)
  return proto && (proto.type == type || proto.isDescendantOf(type))
}

DomElement.prototype.canDisplay = function () {
  return this.domElementsWithContent.includes(this.type) && this.isDescendantOf("body");
}

DomElement.prototype.display = function () {

}
