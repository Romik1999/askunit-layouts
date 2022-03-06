# mw

_jQuery Modal Windows_

Library for creating modal windows on the site based on jQuery plugin.

## Getting Started

Include the js and css files which you can find in the dist folder. You need to be sure that you've included a correct version of jQuery library. (>= 3.x.x)

```
<link rel="stylesheet" href="dist/mw.default.css" />
<script src="dist/mw.min.js"></script>
```

## Window themes

The modal window design is described with the theme. Theme is a part of CSS styles. Every theme is defined with unique symbolic identifier. For example, `default` or `white-round-window`. The default theme is set creating the window. The window theme can be changed opening the window. The theme example can be seen inside the `dist/mw.default.css` file.

### HTML layout structure

This library creates the window skeleton during the window creating and adds it to `$('body')`:

```html
<div
  class="mw mw_id_{{ window id }} mw_theme_{{ Theme code }} mw_state_{{ window state code }}"
>
  <div class="mw__inner">
    <div class="mw__title">{{ Window title }}</div>
    <div class="mw__close"></div>
    <div class="mw__content">{{ Window contents }}</div>
    <div class="mw__loading"></div>
  </div>
</div>
```

## Usage

Modal windows are controlled by the window manager that can be accessed using `$.mw`. Each modal window on the page has to be added to the window manager. The window manager allows you to open, close windows, display windows on top of each other, and also set the default parameters.

### Default parameters

You can set the default parameters for all windows using the method `$.mw.defaults()`. All of the windows added after calling `$.mw.defaults()` will inherit these parameters as default values.

Any default parameter can be overridden when adding a window to the manager.

```javascript
$(function () {
  $.mw.defaults({
    width: "auto",
    theme: "default",
    offset: {
      x: 0,
      y: 50,
    },
    title: false,
  });
});
```

You can set default parameters for every theme individually or you can also set it for theme suit. Just set the first parameter of `$.mw.defaults()` with the theme name of it's suit, and the second parameter is the default parameters:

```javascript
$(function () {
  $.mw
    .defaults("my-cool-theme", {
      offset: 30,
      width: 250,
    })
    .defaults(["my-cool-theme", "another-theme"], {
      width: 300,
    });
});
```

You can set default parameters for all created themes and set the parameters for specific theme inheriting default values.

```javascript
$(function () {
  $.mw
    .defaults({
      width: "auto",
      offset: {
        x: 0,
        y: 50,
      },
      title: false,
    })
    .defaults("wide-theme", {
      offset: 0,
      width: "100%",
    });
});
```

### Adding modal windows

To add a window to the manager, use the method `$.mw.add()`

```javascript
$(function () {
  $.mw
    .defaults({
      width: "auto",
      theme: "default",
      offset: {
        x: 0,
        y: 50,
      },
      title: false,
    })
    .add({
      id: "feedback",
      src: "/widgets/feedback/",
      width: 600,
    })
    .add({
      id: "callback",
      src: "/widgets/callback/",
      width: 600,
      title: "Call me now!",
    });
});
```

### Settings

| Option          | Type                                         | Default | Description                                                                                                                                                                                                                                   |
| --------------- | -------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | string                                       | random  | The identifier of the window. Should be unique. Used to open and retrieve a window instance using the manager.                                                                                                                                |
| theme           | string                                       | ''      | The theme of the window.                                                                                                                                                                                                                      |
| src             | string                                       | ''      | The path to load the contents of the window. If this parameter is set, the content will be loaded with ajax request when the window is opened.                                                                                                |
| content         | jQuery selector &#124; string                | ''      | If the `src` parameter is not specified, then the `content` will be used as the contents of the window. If `content` is a string, then it will be used as the html of the contents of the window.                                             |
| width           | integer &#124; string                        | 'auto'  | The width of the window. If the value of the parameter is a number, then this value is in pixels. String variants are also possible: `'200px'`, `'60%'`                                                                                       |
| height          | integer &#124; string                        | 'auto'  | The height of the window. If the value of the parameter is a number, then this value is in pixels. String variants are also possible: `'200px'`, `'60%'`. <br><br>Usually this parameter is not specified.                                    |
| offset          | integer &#124; object                        | 50      | Minimum space between viewport and modal window. Can be set as object `{x: 20, y: 50}`                                                                                                                                                        |
| title           | jQuery selector &#124; string &#124; boolean | true    | The title of the window. If the `title` parameter is boolean, then the title will be shown or hidden depending on the value.                                                                                                                  |
| closeContent    | jQuery selector &#124; string &#124; boolean | true    | Allows to specify custom contents of the window close button. For example `<span class="close-button">Close window</span>`. If the `closeContent` parameter is boolean, then the close button will be shown or hidden depending on the value. |
| closingDuration | integer                                      | 0       | The closing animation duration. In seconds. This parameter can be used for animated window closing using CSS.                                                                                                                                 |
| openingDuration | integer                                      | 0       | The opening animation duration. In seconds. This parameter can be used for animated window opening using CSS.                                                                                                                                 |
| opening         | function                                     | null    | The callback function fired before the window opening.                                                                                                                                                                                        |
| open            | function                                     | null    | The callback function fired after the window opening.                                                                                                                                                                                         |
| load            | function                                     | null    | The callback function fired after getting the window contents.                                                                                                                                                                                |
| closing         | function                                     | null    | The callback function fired before the window closing.                                                                                                                                                                                        |
| close           | function                                     | null    | The callback function fired after the window closing.                                                                                                                                                                                         |
| update          | function                                     | null    | The callback function fired after the modal window resite or after changing it's position.                                                                                                                                                    |

### Window manager methods

Methods are called on manager instance `$.mw`:

#### Opening the window

```javascript
$.mw.open(id, data, options);
```

| Option       | Type                 | Description                                                                                                                                |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| id\*         | string               | The window identifier. This is a required parameter.                                                                                       |
| data         | string &#124; object | A plain object or string that is sent to the server with the request. This parameter is used for windows gettings the contents using AJAX. |
| options      | object               | Opening window parameters. It can contain these keys:                                                                                      |
| ∟&nbsp;theme | string               | Window theme.                                                                                                                              |
| ∟&nbsp;close | boolean              | If it's set to `true`, other modal windows will be closwd. Otherwise the new window will be opened on the top of all opened windows.       |
| ∟&nbsp;clear | boolean              | If it's set to `true`, old window contents will be fully cleared.                                                                          |

Example:

```javascript
$.mw.open(
  "callback",
  {
    param1: "value1",
    param2: 12345,
  },
  {
    close: true,
  }
);
```

OR

```html
<a href="javascript:void(0);" onclick="$.mw.open('feedback', {param: 12345});"
  >Open the window!</a
>
```

#### Window closing

The user is used to close the window clicking on "close" button or clicking the overlay.
But if you want to close the window programmatically, you can use these methods:

```javascript
$.mw.close(id); // Method closes the window with it's identifier
```

```javascript
$.mw.closeAll(); // This method closes all opened windows
```

#### Blocking window closing

The real modal window requires user's target action. For example, age confirmation. If you have to do this, you can use this method:

```javascript
$.mw.disableClose(); // Disable window closing
```

```javascript
$.mw.enableClose(); // Enable window closing
```

#### z-index

The default value for the modal window container is `z-index: 3000`. If you have to change this value, you can use the method:

```javascript
$.mw.startZIndex(value);
```

#### Window instance

The window instance can be get using the window manager by it's identifier:

```javascript
$.mw.get(id, callback);
```

| Option   | Type     | Description                                                                                                                               |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| id\*     | string   | The identifier of the window. This is a required parameter.                                                                               |
| callback | function | The callback function. It's first argument is modal window instance, and the callee context is the window container `<div class="mw" />`. |

The best practice is to use this method for windows that load the contents using AJAX. You can encapsulate the scripts and window logic inside the loading contents:

```javascript
$(function () {
  $.mw
    .defaults({
      width: "auto",
      theme: "default",
      offset: 50,
    })
    .add({
      id: "window",
      src: "/ajax/window.html",
      width: 600,
      title: "Window example with dynamic contents",
    });

  $.mw.open("window");
});
```

```html
<!-- /ajax/window.html -->
<p>The window contents</p>
<button type="button">Close this window!</button>

<script type="text/javascript">
  $.mw.get("window", function (mw) {
    $(this)
      .find("button")
      .on("click", function () {
        mw.close();
      });
  });
</script>
```

### Window instance methods

These methods can be called from it's instance. It can be get using a manager `$.mw.get(id, callback)`:

```javascript
$.mw.get("window", function (mw) {
  mw.title("This is a window title");
  mw.load({ param1: "value1" });
});

// or

var mw = $.mw.get("window");
mw.title("This is a window title");
```

| Method         | Argument                                             | Description                                                                                                                                                                                                                |
| -------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`      | value:(jQuery selector &#124; string)                | This method allows you to get the current value of `content` (if you didn't set the parameter `value`) or set the new value. If you set the new value for the opened window, window contents will be reloaded immediately. |
| `src`          | value:(jQuery selector &#124; string)                | This method allows you both to get and to set the value of parameter `src`. If you set the new value for the opened window, window contents will be reloaded immediately.                                                  |
| `title`        | value:(jQuery selector &#124; string &#124; boolean) | This method allows you both to get and to set the value of parameter `title`. If you set the method's first argument to `false`, the title will be hidden. Otherwise the title will be shown.                              |
| `closeContent` | value:(jQuery selector &#124; string &#124; boolean) | This method allows you both to get and to set the value of parameter `closeContent`. If you set it to `false` the close button will be hidden. Otherwise it will be shown.                                                 |
| `open`         | data:(string &#124; object)<br />options:object      | This method allows to open the window. Arguments are the same as for `$.mw.open()`.                                                                                                                                        |
| `close`        |                                                      | This method closes the current window.                                                                                                                                                                                     |
| `load`         | data:(string &#124; object)<br />options:object      | This method allows to reload the window contents. Best practice of usage is sending the forms from modal window to the webserver.                                                                                          |
| `loading`      | value:boolean                                        | This method allows you both to get and to set the value of parameter `loading`. If you set the new value to `true/false` it'll turn on/off the loading indication.                                                         |
| `opened`       |                                                      | Returns the open window state. `true` if it's opened now and `false` otherwise.                                                                                                                                            |
| `update`       |                                                      | This method recalculates both window size and position. It can be useful changing the the window contents programmatically.                                                                                                |
| `on`           | event:string<br />handler:function                   | Method allows to bind the handler on the window's event.                                                                                                                                                                   |
| `off`          | event:string<br />handler:function                   | Method allows to unbind the handler on the window's event.                                                                                                                                                                 |

### Events

There are some wayt to subscribe to window events:

```javascript
// binding the events creating the window..
$.mw.add({
  id: "window",
  src: "/ajax/window.html",
  width: 600,
  open: function (mw) {
    console.log("The window is opened!", mw.opened());
  },
  close: function (mw) {
    console.log("The window is closed!", mw.opened());
  },
});

// binding the events using a insance's method..
var mw = $.mw.get("window");
mw.on("open", function (mw) {
  console.log("The window is opened too!", mw.opened());
});

// binding the events using a jQuery selector of the window container:
$.mw.get("window", function (mw) {
  $(this)
    .off("close")
    .on("close", function () {
      console.log("The window is closed too!");
    });
});
```

> You can see `$(this).off('close')` in the last example. Don't forget the container is never destroyed and if the binding happens on every window open, the handler's stack will be filled with the same handlers. So, just clear it!

| Event   | Params   | Description                                                               |
| ------- | -------- | ------------------------------------------------------------------------- |
| opening | mw, data | The callback function fired before window opening.                        |
| open    | mw, data | The callback function fired after window opening.                         |
| load    | mw, data | The callback function fired after window contents loading.                |
| closing | mw       | The callback function fired before window closing.                        |
| close   | mw       | The callback function fired after window closing.                         |
| update  | mw       | The callback function fired after window resize or changing the position. |
