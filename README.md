# Pokémon Bank #

**Proyecto de Cátedra – Fase II**
**Asignatura:** Desarrollo de Aplicaciones Web con Software Interpretado en el Cliente (DAW901)

---

## Descripción ##

**Pokémon Bank** es una aplicación web que simula el funcionamiento de un cajero automático (ATM).
Permite a los usuarios iniciar sesión mediante un PIN y realizar operaciones bancarias básicas como depósitos, retiros, pagos de servicios y consultas de saldo.
El sistema registra las transacciones, muestra un historial dinámico y permite generar gráficos y comprobantes en PDF.

El proyecto fue desarrollado con **HTML5, CSS3, Bootstrap 3.4.1 y JavaScript**, utilizando almacenamiento local del navegador (LocalStorage) para la persistencia de datos.

---

## Características principales ##

* Inicio de sesión mediante PIN de 4 dígitos.

* Registro y actualización automática del saldo del usuario.

* Transacciones de:

	*  Depósito

	*  Retiro

	*  Pago de servicios

* Consulta de saldo

* Historial de transacciones almacenado en LocalStorage.

* Generación de comprobantes en formato PDF.

* Visualización de estadísticas mediante gráficos circulares.

* Diseño responsive y ordenado con Bootstrap 3.4.1.

---

## Tecnologías utilizadas ##

* **HTML5** – estructura principal del sitio.

* **CSS3 / Bootstrap 3.4.1** – diseño y estilos responsivos.

* **JavaScript (ES6)** – lógica de negocio e interactividad.

* **SweetAlert** – alertas y mensajes visuales personalizados.

* **Chart.js** – gráficos estadísticos de transacciones.

jsPDF – generación de comprobantes en PDF.

---
## Estructura del proyecto ##

```
/pokemon-bank
│
├── index.html           # Pantalla de inicio de sesión
├── dashboard.html       # Panel principal de transacciones
├── history.html         # Historial de movimientos
├── chart.html           # Gráfico de resumen
│
├── /css
│   ├── bootstrap.min.css
│   └── estilos.css
│
├── /js
│   ├── login.js
│   ├── dashboard.js
│   ├── history.js
│   ├── chart.js
│
└── /libs
    ├── sweetalert.min.js
    ├── jspdf.min.js
    ├── chart.umd.min.js

```

---

## Instalación y ejecución ##

1. **Clonar o descargar** el repositorio.
```
git clone https://github.com/usuario/pokemon-bank.git
```

2. Abrir la carpeta del proyecto:
```
cd pokemon-bank
```

3. Para una correcta funcionalidad de localStorage, se recomienda ejecutar el proyecto en un **servidor local**.
En Visual Studio Code puedes usar la extensión Live Server:

* Abrir index.html.

* Hacer clic derecho → "**Open with Live Server**".

4. El proyecto se abrirá en el navegador, normalmente en:
```
http://127.0.0.1:5500/pokemon-bank/index.html
```
---

## Instrucciones de uso ##

1. En la pantalla de inicio de sesión, ingresar el PIN *1234*.

2. Acceder al panel principal y realizar operaciones de:

	* Depósito

	* Retiro

	* Pago de servicios

	* Consulta de saldo

3.  Revisar las transacciones registradas en la sección **Historial**.

4. Consultar la representación gráfica de los movimientos en la pestaña **Gráfico**.

5. Descargar un comprobante general en PDF desde el botón "**Generar PDF**".

---

## Recomendaciones ##

No modificar el PIN inicial a menos que se actualice también en ```login.js```.

Para evitar errores de sesión, siempre ejecutar desde un entorno local (no abrir directamente con ``file://``).

Antes de entregar o desplegar, limpiar el historial con el botón “Limpiar historial”.

---

## Créditos y licencia ##

Desarrollado como parte del proyecto de cátedra de la asignatura **Desarrollo de Aplicaciones Web con Software Interpretado en el Cliente (DAW901)** – Universidad Don Bosco.

Este proyecto se distribuye con fines educativos y puede ser modificado libremente con propósitos académicos o de aprendizaje.
