/**
 * ModalWindow 2.6.3
 * JQuery plugin for creating modal windows
 * https://github.com/andruvs/mw
 *
 * Copyright 2016-2020, Andrew Golovchak
 *
 * Released on: October 13, 2020
 */

(function ($) {
  if (!!$.mw) {
    return;
  }

  var ModalWindow = function (options) {
    this._options = $.extend(
      {
        content: "",
        src: "",
        width: "auto",
        height: "auto",
        position: "auto",
        offset: 50,
        theme: "",
        title: true,
        closeContent: true,
        closingDuration: 0,
        openingDuration: 0,
        opening: null,
        open: null,
        load: null,
        closing: null,
        close: null,
        update: null,
      },
      options
    );

    this.id = "";
    if (typeof this._options.id === "string" && this._options.id !== "") {
      this.id = this._options.id;
    } else {
      this.id = "" + Math.round(Math.random() * 1e6);
    }

    this._options.zIndex = 0;

    this._options.closingDuration = parseFloat(this._options.closingDuration);
    if (
      isNaN(this._options.closingDuration) ||
      this._options.closingDuration < 0
    ) {
      this._options.closingDuration = 0;
    }

    this._options.openingDuration = parseFloat(this._options.openingDuration);
    if (
      isNaN(this._options.openingDuration) ||
      this._options.openingDuration < 0
    ) {
      this._options.openingDuration = 0;
    }

    this._opened = false;
    this._loading = false;
    this._transitionTimer = 0;

    this._theme = "";

    this.$mw = $(
      '<div class="mw mw_id_' + this.id + ' mw_state_closed" />'
    ).hide();
    this.$inner = $('<div class="mw__inner" />').appendTo(this.$mw);
    this.$title = $('<div class="mw__title" />').appendTo(this.$inner);
    this.$close = $('<div class="mw__close" />').appendTo(this.$inner);
    this.$content = $('<div class="mw__content" />').appendTo(this.$inner);
    this.$loading = $('<div class="mw__loading" />')
      .hide()
      .appendTo(this.$inner);

    var self = this;
    this.$close.on("click.mw", function () {
      self.close();
    });

    this.title(this._options.title);
    this.closeContent(this._options.closeContent);

    this.theme(this._options.theme);

    this.on("opening", this._options.opening);
    this.on("open", this._options.open);
    this.on("load", this._options.load);
    this.on("closing", this._options.closing);
    this.on("close", this._options.close);
    this.on("update", this._options.update);
  };

  ModalWindow.prototype.content = function (value) {
    if (typeof value !== "undefined") {
      this._options.content = value;
      if (this._opened) {
        this.load();
      }
      return;
    }
    return this._options.content;
  };

  ModalWindow.prototype.src = function (value) {
    if (typeof value !== "undefined") {
      this._options.src = value;
      if (this._opened) {
        this.load();
      }
      return;
    }
    return this._options.src;
  };

  ModalWindow.prototype.title = function (value) {
    if (typeof value !== "undefined") {
      if (value === false) {
        this.$title.hide();
      } else {
        if (typeof value === "string") {
          this._options.title = value;
          this.$title.html(value);
        } else if (value instanceof jQuery) {
          this._options.title = value;
          this.$title.empty().append(value);
        }
        this.$title.show();
      }
      return;
    }
    return this._options.title;
  };

  ModalWindow.prototype.closeContent = function (value) {
    if (typeof value !== "undefined") {
      if (value === false) {
        this.$close.hide();
      } else {
        if (typeof value === "string") {
          this._options.closeContent = value;
          this.$close.html(value);
        } else if (value instanceof jQuery) {
          this._options.closeContent = value;
          this.$close.empty().append(value);
        }
        this.$close.show();
      }
      return;
    }
    return this._options.closeContent;
  };

  ModalWindow.prototype.zIndex = function (value) {
    if (typeof value !== "undefined") {
      value = parseInt(value);
      if (!isNaN(value)) {
        this._options.zIndex = value;
        this.$mw.css("z-index", value);
      }
      return;
    }
    return this._options.zIndex;
  };

  ModalWindow.prototype.theme = function (value) {
    if (typeof value !== "undefined") {
      value = typeof value === "string" ? value : "";
      if (this._theme !== value) {
        if (this._theme !== "") {
          var theme = "mw_theme_" + this._theme;
          if (this.$mw.hasClass(theme)) {
            this.$mw.removeClass(theme);
          }
        }
        this._theme = value;
        if (value !== "") {
          this.$mw.addClass("mw_theme_" + value);
        }
      }
      return;
    }
    return this._theme;
  };

  ModalWindow.prototype.defaultTheme = function () {
    return this._options.theme;
  };

  ModalWindow.prototype.element = function () {
    return this.$mw;
  };

  ModalWindow.prototype.open = function (data, options) {
    $.mw.open(this, data, options);
  };

  ModalWindow.prototype._open = function (data, options) {
    if (this._opened) {
      return;
    }
    this._opened = true;

    clearTimeout(this._transitionTimer);

    if (this.$mw.parent().length === 0) {
      this.$mw.appendTo("body");
    }

    this.load(data, options);

    this.$mw
      .show()
      .removeClass("mw_state_opened mw_state_closing mw_state_closed")
      .addClass("mw_state_opening")
      .trigger("opening", [this, data]);

    var self = this;
    this._transitionTimer = setTimeout(
      function () {
        self.$mw
          .removeClass("mw_state_opening mw_state_closing mw_state_closed")
          .addClass("mw_state_opened")
          .trigger("open", [self, data]);
      },
      this._options.openingDuration > 0
        ? this._options.openingDuration * 1000
        : 1
    );

    this.update();
  };

  ModalWindow.prototype.close = function () {
    $.mw.close(this);
  };

  ModalWindow.prototype._close = function () {
    if (!this._opened) {
      return;
    }
    this._opened = false;

    clearTimeout(this._transitionTimer);

    this.$mw
      .removeClass("mw_state_opened mw_state_opening mw_state_closed")
      .addClass("mw_state_closing")
      .trigger("closing", [this]);

    var self = this;
    this._transitionTimer = setTimeout(
      function () {
        self.$mw
          .removeClass("mw_state_closing mw_state_opened mw_state_opening")
          .addClass("mw_state_closed")
          .hide();

        if (self._options.content instanceof jQuery) {
          var $placeholder = $('.mw-placeholder[data-mw="' + self.id + '"]');
          if ($placeholder.length > 0) {
            self._options.content.insertAfter($placeholder);
            $placeholder.remove();
          }
        }

        self.$mw.trigger("close", [self]);
      },
      this._options.closingDuration > 0
        ? this._options.closingDuration * 1000
        : 1
    );
  };

  ModalWindow.prototype.load = function (data, options) {
    if (!$.isPlainObject(options)) {
      options = {};
    }

    if (typeof this._options.src === "string" && this._options.src !== "") {
      this.loading(true);

      if (options.clear === true) {
        this.$content.empty();
      }

      var self = this;
      this.$content.load(this._options.src, data, function () {
        self.loading(false);
        self.update();
        self.$mw.trigger("load", [self, data]);
      });
    } else if (
      typeof this._options.content === "string" &&
      this._options.content !== ""
    ) {
      this.$content.html(this._options.content);
      this.update();
      this.$mw.trigger("load", [this, data]);
    } else if (this._options.content instanceof jQuery) {
      if (this._options.content.closest(".mw").length === 0) {
        $(
          '<div class="mw-placeholder" data-mw="' + this.id + '" />'
        ).insertAfter(this._options.content);

        this.$content.empty().append(this._options.content);
        this.update();
        this.$mw.trigger("load", [this, data]);
      }
    }
  };

  ModalWindow.prototype.loading = function (value) {
    if (value === true) {
      this._loading = true;
      this.$loading.show();
      this.$mw.addClass("mw_state_loading");
    } else if (value === false) {
      this._loading = false;
      this.$loading.hide();
      this.$mw.removeClass("mw_state_loading");
    }
    return this._loading;
  };

  ModalWindow.prototype.opened = function () {
    return this._opened;
  };

  ModalWindow.prototype.update = function () {
    if (!this._opened) {
      return;
    }

    var top,
      left,
      width,
      height,
      offsetX,
      offsetY,
      windowWidth = $(window).width(),
      windowHeight = $(window).height();

    if ($.isPlainObject(this._options.offset)) {
      offsetX = parseInt(this._options.offset.x);
      offsetY = parseInt(this._options.offset.y);
    } else {
      offsetX = offsetY = parseInt(this._options.offset);
    }

    if (isNaN(offsetX) || offsetX < 0) {
      offsetX = 0;
    }
    if (isNaN(offsetY) || offsetY < 0) {
      offsetY = 0;
    }

    if (this._options.width === "auto") {
      this.$mw.css("width", "");
    } else {
      this.$mw.css("width", this._options.width);
    }
    width = this.$mw.outerWidth();
    if (width + 2 * offsetX > windowWidth) {
      width = windowWidth - 2 * offsetX;
    }
    this.$mw.css("width", width);

    if (this._options.height === "auto") {
      this.$mw.css("height", "");
      if (this._options.position === "fixed") {
        height = Math.min(windowHeight - 2 * offsetY, this.$mw.outerHeight());
        this.$mw.css("height", height);
      } else {
        height = this.$mw.outerHeight();
      }
    } else {
      this.$mw.css("height", this._options.height);
      height = this.$mw.outerHeight();
    }

    left = (windowWidth - width) / 2;

    top = (windowHeight - height) / 2;
    if (top < offsetY) {
      top = offsetY;
    }

    if (this._options.position === "fixed") {
      this.$mw.css({
        position: "fixed",
        left: left + "px",
        top: top + "px",
      });
    } else {
      top += $(window).scrollTop();

      this.$mw.css({
        position: "absolute",
        left: left + "px",
        top: top + "px",
      });
    }

    this.$mw.trigger("update", [this]);
  };

  ModalWindow.prototype.on = function (event, handler) {
    if (typeof event === "string" && $.isFunction(handler)) {
      this.$mw.on(event, handler);
    }

    return this;
  };

  ModalWindow.prototype.off = function (event, handler) {
    if (typeof event === "string") {
      this.$mw.off(event, handler);
    }

    return this;
  };

  var ModalWindowManager = function () {
    this.$overlay = $('<div class="mw-overlay" />');

    this._defaults = {};

    this._mw = {};
    this._stack = [];

    this._startZIndex = 3000;
    this._zIndex = null;

    this._closeDisabled = false;

    var self = this;
    this.$overlay.on("click.mw", function () {
      var l = self._stack.length;
      if (l > 0) {
        self.close(self._stack[l - 1]);
      }
    });

    var width = $(window).width(),
      tid = null;

    $(window).on("resize.mw", function () {
      clearTimeout(tid);
      setTimeout(function () {
        var newWidth = $(window).width();
        if (width !== newWidth) {
          width = newWidth;
          var id, mw;
          for (id in self._mw) {
            mw = self._mw[id];
            if (mw.opened()) {
              mw.update();
            }
          }
        }
      }, 100);
    });
  };

  ModalWindowManager.prototype.startZIndex = function (value) {
    value = parseInt(value);
    if (!isNaN(value)) {
      this._startZIndex = value;
    }
  };

  ModalWindowManager.prototype.defaults = function (theme, options) {
    if (arguments.length === 1) {
      options = theme;
      theme = "_defaults_";
    }
    if (typeof theme === "string" && theme !== "") {
      theme = [theme];
    }
    if ($.isArray(theme)) {
      var i = theme.length;
      while (--i > -1) {
        if (typeof theme[i] === "string" && theme[i] !== "") {
          if ($.isPlainObject(options)) {
            this._defaults[theme[i]] = $.extend({}, options);
          } else {
            this._defaults[theme[i]] = null;
          }
        }
      }
    }

    return this;
  };

  ModalWindowManager.prototype.add = function (mw) {
    if ($.isPlainObject(mw)) {
      var options = {};
      if ($.isPlainObject(this._defaults["_defaults_"])) {
        options = $.extend(options, this._defaults["_defaults_"]);
      }

      var theme = typeof mw.theme === "string" ? mw.theme : "";
      if (theme !== "" && $.isPlainObject(this._defaults[theme])) {
        options = $.extend(options, this._defaults[theme]);
      }

      mw = new ModalWindow($.extend(options, mw));
    }
    if (mw instanceof ModalWindow) {
      if (typeof mw.id === "string" && mw.id !== "") {
        if (!this._mw.hasOwnProperty(mw.id)) {
          this._mw[mw.id] = mw;
        }
      }
    }
    return this;
  };

  ModalWindowManager.prototype.get = function (mw, callback) {
    if (typeof mw === "string" && mw !== "") {
      if (this._mw.hasOwnProperty(mw)) {
        mw = this._mw[mw];
      } else {
        var content = $('[data-mw="' + mw + '"]');
        if (content.length > 0) {
          this.add({
            id: mw,
            content: content,
          });

          if (this._mw.hasOwnProperty(mw)) {
            mw = this._mw[mw];
          }
        }
      }
    }

    if (!(mw instanceof ModalWindow)) {
      mw = null;
    }

    if (typeof callback === "undefined") {
      return mw;
    } else if (mw !== null) {
      if ($.isFunction(callback)) {
        callback.call(mw.element(), mw);
      }
    }

    return this;
  };

  ModalWindowManager.prototype.open = function (mw, data, options) {
    mw = this.get(mw);
    if (mw === null) {
      return this;
    }

    if (mw.opened()) {
      return this;
    }

    if (!$.isPlainObject(options)) {
      options = {};
    }

    if (this._zIndex === null) {
      this._zIndex = this._startZIndex;
    }

    if (typeof options.theme === "string" && options.theme !== "") {
      mw.theme(options.theme);
    } else {
      mw.theme(mw.defaultTheme());
    }

    this._stack.push(mw);

    this._showOverlay();

    mw.zIndex(this._zIndex + 1);
    mw._open(data, options);

    this._zIndex += 2;

    if (options.close === true) {
      var i = this._stack.length;
      if (i > 1) {
        while (--i > 0) {
          this.close(this._stack[0]);
        }
      }
    }

    return this;
  };

  ModalWindowManager.prototype.close = function (mw) {
    if (this._closeDisabled) {
      return this;
    }

    mw = this.get(mw);
    if (mw === null) {
      return this;
    }

    if (!mw.opened()) {
      return this;
    }

    var i = this._stack.length;

    while (--i > -1) {
      if (mw === this._stack[i]) {
        break;
      }
    }

    mw._close();

    if (i > -1) {
      this._stack.splice(i, 1);
      i = this._stack.length;
      if (i > 0) {
        this._zIndex = this._stack[i - 1].zIndex() - 1;
        this._showOverlay();
        this._zIndex += 2;
        return this;
      }
    }

    this._zIndex = this._startZIndex;
    this._hideOverlay();

    return this;
  };

  ModalWindowManager.prototype.closeAll = function () {
    if (this._closeDisabled) {
      return this;
    }

    var id, mw;
    for (id in this._mw) {
      mw = this._mw[id];
      if (mw.opened()) {
        mw._close();
      }
    }

    this._stack.length = 0;

    this._zIndex = this._startZIndex;
    this._hideOverlay();

    return this;
  };

  ModalWindowManager.prototype.disableClose = function () {
    this._closeDisabled = true;
    return this;
  };

  ModalWindowManager.prototype.enableClose = function () {
    this._closeDisabled = false;
    return this;
  };

  ModalWindowManager.prototype._showOverlay = function () {
    var theme = "",
      l = this._stack.length;

    if (l > 0) {
      theme = this._stack[l - 1].theme();
      if (typeof theme === "string" && theme !== "") {
        theme = "mw-overlay_theme_" + theme;
      }
    }

    if (theme !== "") {
      if (!this.$overlay.hasClass(theme)) {
        this.$overlay.removeClass().addClass("mw-overlay " + theme);
      }
    } else {
      this.$overlay.removeClass().addClass("mw-overlay");
    }

    if (this.$overlay.parent().length === 0) {
      this.$overlay.appendTo("body");
    }

    this.$overlay.css("z-index", this._zIndex);

    if (this.$overlay.hasClass("mw-overlay_opened")) {
      this.$overlay.show();
    } else {
      this.$overlay.addClass("mw-overlay_opened").fadeIn();
    }
  };

  ModalWindowManager.prototype._hideOverlay = function () {
    this.$overlay.removeClass("mw-overlay_opened").fadeOut();
  };

  $.mw = new ModalWindowManager();
})(jQuery);
