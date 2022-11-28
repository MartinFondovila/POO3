/*

En este TP vamos a trabajar con Prototipos en JavaScript.
En este lenguaje, las funciones pueden (usadas de forma adecuada)
ser constructores de objetos. Para que esto ocurra, una función
se invoca como new <nombre de la función>(<argumentos>), lo cual
describirá el nuevo objeto construido.
La función en si, puede asignar slots del nuevo elemento creado
(haciendo referencia a this), y puede además hacer cualquier otra
cosa que se considere adecuada.

En este caso, DomElement es una función que nos permitirá crear
objetos, la cual se define a continuación:
*/

/**
 * A DomElement is the main constructor for objects that represent
 * the Dom hierarchy.
 *
 * @param type The type of the dom element (e.g. 'div', 'p', etc.)
 * @param childrenDefinition The childrens of this current element.
 */
function DomElement(type, childrenDefinition) {
  this.type = type;
  this.styles = {};
  this.children = [];
  this.events = [];
  this.contents = "";

  for (let index = 0; index < (childrenDefinition || []).length; index++) {
    var definition = childrenDefinition[index];
    var newElement = new DomElement(definition.type, definition.children);
    newElement.__proto__ = this;
    this.children.push(newElement);
  }
}

/*
 Los objetos que vamos a crear representan los elementos
 del DOM, hipoteticamente, pero no se espera que ejecute
 este código en un navegador ni nada parecido. Estaremos
 simulando parcialmente la forma en que un browser trabaja
 "por atrás", esa es la idea del TP.

 Así, cada elemento, tiene un tipo y una lista de hijos
 (ya que las etiquetas del DOM se anidan).

 En JS, todo objeto tiene un prototipo, identificado en el
 slot __proto__. En el caso de las funciones, hay un atributo
 especial llamado prototype, que será el objeto que actúa de
 prototipo para todo objeto que sea creado con esa función.

 Por ejemplo, si hacemos DomElement.prototype, estamos hablando
 del prototipo de cualquier objeto creado con new DomElement(...)

 Podemos modificar de diversas formas ese objeto, como se
 hace a continuación.
*/

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

/*
Ahora vamos a definir un objeto que simula un DOM.
Podríamos pensarlo como lo que lee el browser cuando analiza
el HTML. Nosotros lo vamos a definir como un objeto con 2
partes, type y children.
Podemos usar esos elementos para construir un DomElement
raíz, y donde los hijos serán DomElements también, ya que el
constructor de dicha función se encarga de eso.
*/

var definition = {
  type: "html",
  children: [
    {
      type: "head",
      children: [{ type: "h1" }],
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

/*
 * La raiz del dom será el primer elemento de nuestras definiciones.
 */
var dom = new DomElement(definition.type, definition.children);

/*
Ahora vamos a querer agregar estílos a los elementos del DOM,
simulando lo que hace el Browser cuando, luego de analizar el DOM,
les agrega los estilos tomados del CSS.

Agreguemos algunos estilos a diversos elementos.
*/

/*
dom.children[1].styles = {
  background: "red",
  color: "blue",
};

dom.children[1].children[0].children[0].styles = {
  size: 17,
  color: "green",
};

console.log(" ");
console.log(dom.toString());
*/

/*
Ahora vamos a empezar a realizar diversas acciones sobre etos
elementos.
*/

/**************** PUNTO 1 ******************************/

/*
Queremos poder contar con una definición de estilos como a la
siguiente.
*/
var styles = {
  "body section": {
    color: "green",
    size: 25,
  },
  body: {
    background: "blue",
  },
  h1: {
    size: 50,
    color: "red",
    background: "yellow",
  },
  "aside h1": {
    size: 30,
  },
};

/*
Estos estilos simulan lo que se leería de un CSS. Y lo que queremos es
poder aplicar todos estilos a nuestro DOM.

El objetivo, es poder aplicar esos estilos a cada elemento del dom
según indique la regla asociada.

Ej. si la regla es "h1", entonces el estilo se aplica a todos los elementos
de tipo h1, pero si es "body h1" entonces se aplica a los h1 que están
dentro de body.

Una característica importante de los estilos es que se heredan según jerarquía.
Si por ejemplo, "body" tiene como estilo color "red", entonces todos los hijos
de body también tendrán color "red", sin necesidad de agregar ese atributo a cada
uno de los hijos.

Por ej. pensemos el siguiente grupo de nodos en el dom

Node html {}
  Node head {}
  Node body {background:red, color:blue}
    Node div {}
      Node div {size:17, color:green}
        Node h1 {}

Si bien h1 no tiene ningún estilo directamente asociado, sus "verdaderos"
estilos son aquellos que surjen de heredar de sus padres.
Entonces h1 tiene los estilos {background:red, size:17, color:green}. El
color es verde ya que si un hijo tiene un estilo que tenía el padre,
lo sobreescribe, de forma similar al overriding.

Entonces haremos primero las siguientes cosas:
a) Agregaremos el método a todo nodo del dom, addStyles, que dada
una definición de estilos que representa un css, asigna los estilos
de esa definición a los correspondientes nodos del DOM.

b) Luego implemente para todo nodo el método getFullStyle que
describe todos los estilos que tiene un nodo (que incluyen los
propios y los heredados).

c) Implemente para todo nodo el método viewStyleHierarchy, que
funciona de forma similar a toString, pero en donde se muestran
absolutamente todos los estilos, incluyendo los heredados, y
no solo aquellos que tienen asociados.
*/

DomElement.prototype.getElementsByType = function (type) {
  return this.getElementsByTypeAux(type, []);
};

DomElement.prototype.getElementsByTypeAux = function (type, array) {
  if (this.type == type) {
    array.push(this);
  }

  for (let index = 0; index < (this.children || []).length; index++) {
    var element = this.children[index];
    element.getElementsByTypeAux(type, array);
  }
  return array;
};

DomElement.prototype.getElementsBySelector = function (selector) {
  var selectorSplited = selector.trim().split(/\s+/);

  if (selectorSplited.length == 1) {
    return this.getElementsByType(selectorSplited[0]);
  }

  return this.getElementsBySelectorAux(selectorSplited);
};

DomElement.prototype.getElementsBySelectorAux = function (selectorSplited) {
  var arrayAux = [];
  var actualSelector = selectorSplited[0];
  var nextSelector = selectorSplited[1];

  for (let index = 0; index < this.children.length; index++) {
    var children = this.children[index];
    if (selectorSplited.length == 2 && this.type == actualSelector) {
      arrayAux = arrayAux.concat(children.getElementsByType(nextSelector));
    } else if (this.type == actualSelector) {
      arrayAux = arrayAux.concat(
        children.getElementsBySelectorAux(selectorSplited.slice(1))
      );
    } else {
      arrayAux = arrayAux.concat(
        children.getElementsBySelectorAux(selectorSplited)
      );
    }
  }

  return arrayAux;
};

DomElement.prototype.addStyles = function (stylesDefinition) {
  var stylesDefinitionKeys = Object.keys(styles).sort(function (sel1, sel2) {
    return sel1.trim().split(/\s+/).length - sel2.trim().split(/\s+/).length;
  });

  for (
    let selectorsIndex = 0;
    selectorsIndex < stylesDefinitionKeys.length;
    selectorsIndex++
  ) {
    var selector = stylesDefinitionKeys[selectorsIndex];
    var elements = this.getElementsBySelector(selector);
    for (let index = 0; index < elements.length; index++) {
      elements[index].styles = stylesDefinition[selector];
    }
  }
};

DomElement.prototype.getFullStyle = function () {
  return this.getFullStyleAux({});
};

DomElement.prototype.getFullStyleAux = function (fullStyles) {
  if (Object.keys(this).includes("styles")) {
    var elementStyles = this.styles;
    var stylesKeys = Object.keys(elementStyles);
    var fullStylesKeys = Object.keys(fullStyles);

    stylesKeys = stylesKeys.filter((name) => !fullStylesKeys.includes(name));

    for (let index = 0; index < stylesKeys.length; index++) {
      fullStyles[stylesKeys[index]] = elementStyles[stylesKeys[index]];
    }
  }
  var proto = Object.getPrototypeOf(this);
  if (!proto.styles) {
    return fullStyles;
  } else {
    return proto.getFullStyleAux(fullStyles);
  }
};

DomElement.prototype.viewStyleHierarchy = function (indent) {
  if (!indent) {
    indent = 0;
  }
  var result = " ".repeat(indent);
  result = result + "Node " + this.type + " {";
  var fullStyle = this.getFullStyle();
  var styleKeys = Object.keys(fullStyle);
  for (let index = 0; index < styleKeys.length - 1; index++) {
    var styleKey = styleKeys[index];
    result = result + styleKey + ":" + fullStyle[styleKey] + ", ";
  }
  if (styleKeys.length > 0) {
    result =
      result +
      styleKeys[styleKeys.length - 1] +
      ":" +
      fullStyle[styleKeys[styleKeys.length - 1]];
  }
  result = result + "}";
  for (let index = 0; index < this.children.length; index++) {
    var element = this.children[index];
    result = result + "\n" + element.viewStyleHierarchy(indent + 2);
  }
  return result;
};

console.log(
  Object.keys(styles).sort(function (sel1, sel2) {
    return sel1.trim().split(/\s+/).length - sel2.trim().split(/\s+/).length;
  })
);
console.log(dom.getElementsBySelector("body section"));
dom.addStyles(styles);
console.log(dom.viewStyleHierarchy());

/**************** PUNTO 2 ******************************/

/*
Los elementos del DOM en un navegador pueden reaccionar a eventos
que el usuario realiza sobre ellos. Vamos a simular ese proceso.

Para que distintos elementos del DOM puedan reaccionar ante
diversos eventos. Cada elemento del dom debe entender tres
metodos más:

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

Esto puede llegar a ser un problema, ya que hay que analizar quién es this,
según el contexto de ejecución. Ojo.

Por otro lado, cuando se hace el handling de un evento, este realiza
el proceso de bubbling-up, es decir, todo padre que también sepa manejar
el evento del mismo nombre debe activar el evento.

Por ejemplo, si activamos 'click' en dom.children[1].children[0].children[0]
y dom.children[1] también sabe manejar 'click', entonces, luego de ejecutar
el 'click' para dom.children[1].children[0].children[0], se deberá hacer el
bubbling-up para que dom.children[1] maneje 'click'.

Hay una excepción, sin embargo. Cuando el handler de un hijo describe falso
luego de ejecutar, el bubbling-up se detiene.

off por su parte, desactiva el handler asociado a un evento.

Se pide entonces que realice los cambios pertinentes para que los elementos
del dom puedan tener este comportamiento.
*/

function Event(name, handler) {
  this.name = name;
  this.handler = handler;
}

DomElement.prototype.on = function (eventName, handler) {
  this.events.push(new Event(eventName, handler));
};

DomElement.prototype.off = function (eventName) {
  this.events = this.events.filter((event) => event.name != eventName);
};

DomElement.prototype.handle = function (eventName) {
  var event = this.events.find((event) => event.name == eventName);

  // Si no sabe reaccionar al evento de manera propia no hace bubbling up
  var proto = Object.getPrototypeOf(this);
  if (event && event.handler.bind(this)() && proto.events) {
    proto.bubblingUpHandle(eventName);
  }
};

DomElement.prototype.bubblingUpHandle = function (eventName) {
  var event = this.events.find((event) => event.name == eventName);

  var proto = Object.getPrototypeOf(this);
  if ((!event || event.handler.bind(this)()) && proto.events) {
    proto.bubblingUpHandle(eventName);
  } else {
    console.log("No hay evento asociado");
  }
};

dom.on("click", function () {
  console.log("Se hizo click en " + this.type);
  return true;
});

dom.children[1].children[0].on("click", function () {
  console.log("Otro clickeo en " + this.type);
  return false;
});

var h1Element = dom.children[1].children[0].children[0].children[0];
h1Element.on("click", function () {
  console.log("Se clickeo en " + this.type);
  return true;
});

h1Element.handle("click");

h1Element.off("click");

h1Element.handle("click");

/**************** PUNTO 3 ******************************/

/*
Queremos poder mostrar los nodos del dom de forma bonita
en la terminal, mediante el metodo display. Es decir,
otra especie de toString para los nodos.

dom.display()

No todo nodo es visible sin embargo. Solo los elementos del body
deben mostrarse en este caso, ya que el head y html son solo
contenedores. Lo mismo ocurre con div, section y aside, que son
elementos contenedores invisibles.

Así, en este caso, solo vamos a mostrar los elementos h1 y p.
Pero ¿Qué mostramos de ellos? Para hacer la cosa más divertida, vamos
a agregar un atributo "contents" a cualquier nodo, que nos permita
agregar un texto a esos elementos como contenido. Ese texto será el
que se muestre cuando llamemos a display.

Más aún, cada elemento se muestra de forma distinta según su tipo.
p muestra contents tal cual, pero h1 lo muestra todo en mayúscula,
siempre.

Además el color del texto y del fondo depende del estilo del elemento,
por lo que vamos a mostrarlo en color en la consola.
(Ver https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)

Por ejemplo,

Node html {}
  Node head {}
  Node body {background:red, color:blue}
    Node div {}
      Node div {size:17, color:green}
        Node h1 contents="Titulo 1" {}
        Node p contents="Hola mundo" {}
        Node p contents="Esto es un texto" {color: "red"}

Mostraría:

TITULO 1
Hola mundo
Esto es un texto (en rojo)
*/

DomElement.prototype.domElementsWithContent = ["p", "h1"];

DomElement.prototype.colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m",
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m",
  },
};

DomElement.prototype.defaultDisplayMap = new Map([
  [
    "p",
    function () {
      return this.contents;
    },
  ],
  [
    "h1",
    function () {
      return this.contents.toUpperCase();
    },
  ],
]);

DomElement.prototype.isDescendantOf = function (type) {
  var proto = Object.getPrototypeOf(this);
  return (
    proto && proto.type && (proto.type == type || proto.isDescendantOf(type))
  );
};

DomElement.prototype.canDisplay = function () {
  return (
    this.domElementsWithContent.includes(this.type) &&
    this.isDescendantOf("body")
  );
};

DomElement.prototype.display = function () {
  if (this.canDisplay()) {
    this.selfDisplay();
  }

  for (let index = 0; index < this.children.length; index++) {
    this.children[index].display();
  }
};

DomElement.prototype.selfDisplay = function () {
  var contents;

  if (this.customDisplay) {
    contents = this.customDisplay();
  } else {
    contents = this.defaultDisplayMap.get(this.type).bind(this)();
  }

  console.log(this.applyStyles(contents));
};

DomElement.prototype.applyStyles = function (contents) {
  var fullStyles = this.getFullStyle();
  var stylesKeys = Object.keys(fullStyles);
  var styledContents = contents;
  if (stylesKeys.includes("background")) {
    styledContents = this.colors.bg[fullStyles["background"]] + styledContents;
  }
  if (stylesKeys.includes("color")) {
    styledContents = this.colors.fg[fullStyles["color"]] + styledContents;
  }

  return styledContents + this.colors.reset;
};

var h1s = dom.getElementsByType("h1");

var ps = dom.getElementsByType("p");

for (let index = 0; index < h1s.length; index++) {
  h1s[index].contents = "Esto es un titulo " + index;
  if (index == 1) {
    h1s[index].customDisplay = function () {
      var newContents = this.contents + " queso";
      return newContents.split(" ").join("");
    };
  }
}

for (let index = 0; index < ps.length; index++) {
  ps[index].contents = "Esto es un parrafo " + index;
  if (index == 1) {
    ps[index].customDisplay = function () {
      var newContents = this.contents + " queso";
      return newContents.split(" ").join("");
    };
  }
}

dom.display();

dom.children[1].children[0].children[0].display();

console.log(dom.children[0]);
