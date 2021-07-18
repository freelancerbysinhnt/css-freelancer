"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*	
 * jQuery mmenu v5.2.0
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */
!function (e) {
  function t() {
    e[n].glbl || (r = {
      $wndw: e(window),
      $html: e("html"),
      $body: e("body")
    }, a = {}, i = {}, l = {}, e.each([a, i, l], function (e, t) {
      t.add = function (e) {
        e = e.split(" ");

        for (var n = 0, s = e.length; s > n; n++) {
          t[e[n]] = t.mm(e[n]);
        }
      };
    }), a.mm = function (e) {
      return "mm-" + e;
    }, a.add("wrapper menu vertical panel nopanel current highest opened subopened navbar hasnavbar title btn prev next first last listview nolistview selected divider spacer hidden fullsubopen"), a.umm = function (e) {
      return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e;
    }, i.mm = function (e) {
      return "mm-" + e;
    }, i.add("parent sub"), l.mm = function (e) {
      return e + ".mm";
    }, l.add("transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend click keydown"), e[n]._c = a, e[n]._d = i, e[n]._e = l, e[n].glbl = r);
  }

  var n = "mmenu",
      s = "5.2.0";

  if (!e[n]) {
    e[n] = function (e, t, n) {
      this.$menu = e, this._api = ["bind", "init", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels"], this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();
      var s = this.$menu.children(this.conf.panelNodetype);
      return this._initAddons(), this.init(s), "function" == typeof this.___debug && this.___debug(), this;
    }, e[n].version = s, e[n].addons = {}, e[n].uniqueId = 0, e[n].defaults = {
      extensions: [],
      navbar: {
        title: "Menu",
        titleLink: "panel"
      },
      onClick: {
        setSelected: !0
      },
      slidingSubmenus: !0
    }, e[n].configuration = {
      classNames: {
        panel: "Panel",
        vertical: "Vertical",
        selected: "Selected",
        divider: "Divider",
        spacer: "Spacer"
      },
      clone: !1,
      openingInterval: 25,
      panelNodetype: "ul, ol, div",
      transitionDuration: 400
    }, e[n].prototype = {
      init: function init(e) {
        e = e.not("." + a.nopanel), e = this._initPanels(e), this.trigger("init", e), this.trigger("update");
      },
      update: function update() {
        this.trigger("update");
      },
      setSelected: function setSelected(e) {
        this.$menu.find("." + a.listview).children().removeClass(a.selected), e.addClass(a.selected), this.trigger("setSelected", e);
      },
      openPanel: function openPanel(t) {
        var n = t.parent();

        if (n.hasClass(a.vertical)) {
          var s = n.parents("." + a.subopened);
          if (s.length) return this.openPanel(s.first());
          n.addClass(a.opened);
        } else {
          if (t.hasClass(a.current)) return;
          var i = e(this.$menu).children("." + a.panel),
              l = i.filter("." + a.current);
          i.removeClass(a.highest).removeClass(a.current).not(t).not(l).not("." + a.vertical).addClass(a.hidden), t.hasClass(a.opened) ? l.addClass(a.highest).removeClass(a.opened).removeClass(a.subopened) : (t.addClass(a.highest), l.addClass(a.subopened)), t.removeClass(a.hidden).addClass(a.current), setTimeout(function () {
            t.removeClass(a.subopened).addClass(a.opened);
          }, this.conf.openingInterval);
        }

        this.trigger("openPanel", t);
      },
      closePanel: function closePanel(e) {
        var t = e.parent();
        t.hasClass(a.vertical) && (t.removeClass(a.opened), this.trigger("closePanel", e));
      },
      closeAllPanels: function closeAllPanels() {
        this.$menu.find("." + a.listview).children().removeClass(a.selected).filter("." + a.vertical).removeClass(a.opened);
        var e = this.$menu.children("." + a.panel),
            t = e.first();
        this.$menu.children("." + a.panel).not(t).removeClass(a.subopened).removeClass(a.opened).removeClass(a.current).removeClass(a.highest).addClass(a.hidden), this.openPanel(t);
      },
      togglePanel: function togglePanel(e) {
        var t = e.parent();
        t.hasClass(a.vertical) && this[t.hasClass(a.opened) ? "closePanel" : "openPanel"](e);
      },
      getInstance: function getInstance() {
        return this;
      },
      bind: function bind(e, t) {
        this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t);
      },
      trigger: function trigger() {
        var e = this,
            t = Array.prototype.slice.call(arguments),
            n = t.shift();
        if (this.cbck[n]) for (var s = 0, a = this.cbck[n].length; a > s; s++) {
          this.cbck[n][s].apply(e, t);
        }
      },
      _initMenu: function _initMenu() {
        this.opts.offCanvas && this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function () {
          e(this).attr("id", a.mm(e(this).attr("id")));
        })), this.$menu.contents().each(function () {
          3 == e(this)[0].nodeType && e(this).remove();
        }), this.$menu.parent().addClass(a.wrapper);
        var t = [a.menu];
        this.opts.slidingSubmenus || t.push(a.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", this.opts.extensions && t.push(this.opts.extensions), this.$menu.addClass(t.join(" "));
      },
      _initPanels: function _initPanels(t) {
        var n = this;

        this.__findAddBack(t, "ul, ol").not("." + a.nolistview).addClass(a.listview);

        var s = this.__findAddBack(t, "." + a.listview).children();

        this.__refactorClass(s, this.conf.classNames.selected, "selected"), this.__refactorClass(s, this.conf.classNames.divider, "divider"), this.__refactorClass(s, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(t, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
        var l = e(),
            r = t.add(t.find("." + a.panel)).add(this.__findAddBack(t, "." + a.listview).children().children(this.conf.panelNodetype)).not("." + a.nopanel);
        this.__refactorClass(r, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || r.addClass(a.vertical), r.each(function () {
          var t = e(this),
              s = t;
          t.is("ul, ol") ? (t.wrap('<div class="' + a.panel + '" />'), s = t.parent()) : s.addClass(a.panel);
          var i = t.attr("id");
          t.removeAttr("id"), s.attr("id", i || n.__getUniqueId()), t.hasClass(a.vertical) && (t.removeClass(n.conf.classNames.vertical), s.add(s.parent()).addClass(a.vertical)), l = l.add(s);
          var r = s.children().first(),
              d = s.children().last();
          r.is("." + a.listview) && r.addClass(a.first), d.is("." + a.listview) && d.addClass(a.last);
        });
        var d = e("." + a.panel, this.$menu);
        l.each(function () {
          var t = e(this),
              s = t.parent(),
              l = s.children("a, span").first();

          if (s.is("." + a.menu) || (s.data(i.sub, t), t.data(i.parent, s)), !s.children("." + a.next).length && s.parent().is("." + a.listview)) {
            var r = t.attr("id"),
                d = e('<a class="' + a.next + '" href="#' + r + '" data-target="#' + r + '" />').insertBefore(l);
            l.is("span") && d.addClass(a.fullsubopen);
          }

          if (!t.children("." + a.navbar).length && !s.hasClass(a.vertical)) {
            if (s.parent().is("." + a.listview)) var s = s.closest("." + a.panel);else var l = s.closest("." + a.panel).find('a[href="#' + t.attr("id") + '"]').first(),
                s = l.closest("." + a.panel);
            var o = e('<div class="' + a.navbar + '" />');

            if (s.length) {
              var r = s.attr("id");

              switch (n.opts.navbar.titleLink) {
                case "anchor":
                  _url = l.attr("href");
                  break;

                case "panel":
                case "parent":
                  _url = "#" + r;
                  break;

                case "none":
                default:
                  _url = !1;
              }

              o.append('<a class="' + a.btn + " " + a.prev + '" href="#' + r + '" data-target="#' + r + '"></a>').append('<a class="' + a.title + '"' + (_url ? ' href="' + _url + '"' : "") + ">" + l.text() + "</a>").prependTo(t), t.addClass(a.hasnavbar);
            } else n.opts.navbar.title && (o.append('<a class="' + a.title + '">' + n.opts.navbar.title + "</a>").prependTo(t), t.addClass(a.hasnavbar));
          }
        });

        var o = this.__findAddBack(t, "." + a.listview).children("." + a.selected).removeClass(a.selected).last().addClass(a.selected);

        o.add(o.parentsUntil("." + a.menu, "li")).filter("." + a.vertical).addClass(a.opened).end().not("." + a.vertical).each(function () {
          e(this).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).addClass(a.subopened);
        }), o.children("." + a.panel).not("." + a.vertical).addClass(a.opened).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).addClass(a.subopened);
        var c = d.filter("." + a.opened);
        return c.length || (c = l.first()), c.addClass(a.opened).last().addClass(a.current), l.not("." + a.vertical).not(c.last()).addClass(a.hidden).end().appendTo(this.$menu), l;
      },
      _initAnchors: function _initAnchors() {
        var t = this;
        r.$body.on(l.click + "-oncanvas", "a[href]", function (s) {
          var i = e(this),
              l = !1,
              d = t.$menu.find(i).length;

          for (var o in e[n].addons) {
            if (l = e[n].addons[o].clickAnchor.call(t, i, d)) break;
          }

          if (!l && d) {
            var c = i.attr("href");

            if (c.length > 1 && "#" == c.slice(0, 1)) {
              var h = e(c, t.$menu);
              h.is("." + a.panel) && (l = !0, t[i.parent().hasClass(a.vertical) ? "togglePanel" : "openPanel"](h));
            }
          }

          if (l && s.preventDefault(), !l && d && i.is("." + a.listview + " > li > a") && !i.is('[rel="external"]') && !i.is('[target="_blank"]')) {
            t.__valueOrFn(t.opts.onClick.setSelected, i) && t.setSelected(e(s.target).parent());

            var u = t.__valueOrFn(t.opts.onClick.preventDefault, i, "#" == c.slice(0, 1));

            u && s.preventDefault(), t.__valueOrFn(t.opts.onClick.blockUI, i, !u) && r.$html.addClass(a.blocking), t.__valueOrFn(t.opts.onClick.close, i, u) && t.close();
          }
        });
      },
      _initAddons: function _initAddons() {
        for (var t in e[n].addons) {
          e[n].addons[t].add.call(this), e[n].addons[t].add = function () {};
        }

        for (var t in e[n].addons) {
          e[n].addons[t].setup.call(this);
        }
      },
      __api: function __api() {
        var t = this,
            n = {};
        return e.each(this._api, function () {
          var e = this;

          n[e] = function () {
            var s = t[e].apply(t, arguments);
            return "undefined" == typeof s ? n : s;
          };
        }), n;
      },
      __valueOrFn: function __valueOrFn(e, t, n) {
        return "function" == typeof e ? e.call(t[0]) : "undefined" == typeof e && "undefined" != typeof n ? n : e;
      },
      __refactorClass: function __refactorClass(e, t, n) {
        return e.filter("." + t).removeClass(t).addClass(a[n]);
      },
      __findAddBack: function __findAddBack(e, t) {
        return e.find(t).add(e.filter(t));
      },
      __filterListItems: function __filterListItems(e) {
        return e.not("." + a.divider).not("." + a.hidden);
      },
      __transitionend: function __transitionend(e, t, n) {
        var s = !1,
            a = function a() {
          s || t.call(e[0]), s = !0;
        };

        e.one(l.transitionend, a), e.one(l.webkitTransitionEnd, a), setTimeout(a, 1.1 * n);
      },
      __getUniqueId: function __getUniqueId() {
        return a.mm(e[n].uniqueId++);
      }
    }, e.fn[n] = function (s, a) {
      return t(), s = e.extend(!0, {}, e[n].defaults, s), a = e.extend(!0, {}, e[n].configuration, a), this.each(function () {
        var t = e(this);

        if (!t.data(n)) {
          var i = new e[n](t, s, a);
          t.data(n, i.__api());
        }
      });
    }, e[n].support = {
      touch: "ontouchstart" in window || navigator.msMaxTouchPoints
    };
    var a, i, l, r;
  }
}(jQuery);
/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (t) {
  var e = "mmenu",
      o = "offCanvas";
  t[e].addons[o] = {
    setup: function setup() {
      if (this.opts[o]) {
        var n = this.opts[o],
            i = this.conf[o];
        a = t[e].glbl, this._api = t.merge(this._api, ["open", "close", "setPage"]), ("top" == n.position || "bottom" == n.position) && (n.zposition = "front"), "string" != typeof i.pageSelector && (i.pageSelector = "> " + i.pageNodetype), a.$allMenus = (a.$allMenus || t()).add(this.$menu), this.vars.opened = !1;
        var r = [s.offcanvas];
        "left" != n.position && r.push(s.mm(n.position)), "back" != n.zposition && r.push(s.mm(n.zposition)), this.$menu.addClass(r.join(" ")).parent().removeClass(s.wrapper), this.setPage(a.$page), this._initBlocker(), this["_initWindow_" + o](), this.$menu[i.menuInjectMethod + "To"](i.menuWrapperSelector);
      }
    },
    add: function add() {
      s = t[e]._c, n = t[e]._d, i = t[e]._e, s.add("offcanvas slideout modal background opening blocker page"), n.add("style"), i.add("resize");
    },
    clickAnchor: function clickAnchor(t) {
      if (!this.opts[o]) return !1;
      var e = this.$menu.attr("id");
      if (e && e.length && (this.conf.clone && (e = s.umm(e)), t.is('[href="#' + e + '"]'))) return this.open(), !0;

      if (a.$page) {
        var e = a.$page.first().attr("id");
        return e && e.length && t.is('[href="#' + e + '"]') ? (this.close(), !0) : !1;
      }
    }
  }, t[e].defaults[o] = {
    position: "left",
    zposition: "back",
    modal: !1,
    moveBackground: !0
  }, t[e].configuration[o] = {
    pageNodetype: "div",
    pageSelector: null,
    wrapPageIfNeeded: !0,
    menuWrapperSelector: "body",
    menuInjectMethod: "prepend"
  }, t[e].prototype.open = function () {
    if (!this.vars.opened) {
      var t = this;
      this._openSetup(), setTimeout(function () {
        t._openFinish();
      }, this.conf.openingInterval), this.trigger("open");
    }
  }, t[e].prototype._openSetup = function () {
    var e = this;
    this.closeAllOthers(), a.$page.each(function () {
      t(this).data(n.style, t(this).attr("style") || "");
    }), a.$wndw.trigger(i.resize + "-offcanvas", [!0]);
    var r = [s.opened];
    this.opts[o].modal && r.push(s.modal), this.opts[o].moveBackground && r.push(s.background), "left" != this.opts[o].position && r.push(s.mm(this.opts[o].position)), "back" != this.opts[o].zposition && r.push(s.mm(this.opts[o].zposition)), this.opts.extensions && r.push(this.opts.extensions), a.$html.addClass(r.join(" ")), setTimeout(function () {
      e.vars.opened = !0;
    }, this.conf.openingInterval), this.$menu.addClass(s.current + " " + s.opened);
  }, t[e].prototype._openFinish = function () {
    var t = this;
    this.__transitionend(a.$page.first(), function () {
      t.trigger("opened");
    }, this.conf.transitionDuration), a.$html.addClass(s.opening), this.trigger("opening");
  }, t[e].prototype.close = function () {
    if (this.vars.opened) {
      var e = this;
      this.__transitionend(a.$page.first(), function () {
        e.$menu.removeClass(s.current).removeClass(s.opened), a.$html.removeClass(s.opened).removeClass(s.modal).removeClass(s.background).removeClass(s.mm(e.opts[o].position)).removeClass(s.mm(e.opts[o].zposition)), e.opts.extensions && a.$html.removeClass(e.opts.extensions), a.$page.each(function () {
          t(this).attr("style", t(this).data(n.style));
        }), e.vars.opened = !1, e.trigger("closed");
      }, this.conf.transitionDuration), a.$html.removeClass(s.opening), this.trigger("close"), this.trigger("closing");
    }
  }, t[e].prototype.closeAllOthers = function () {
    a.$allMenus.not(this.$menu).each(function () {
      var o = t(this).data(e);
      o && o.close && o.close();
    });
  }, t[e].prototype.setPage = function (e) {
    var n = this,
        i = this.conf[o];
    e && e.length || (e = a.$body.find(i.pageSelector), e.length > 1 && i.wrapPageIfNeeded && (e = e.wrapAll("<" + this.conf[o].pageNodetype + " />").parent())), e.each(function () {
      t(this).attr("id", t(this).attr("id") || n.__getUniqueId());
    }), e.addClass(s.page + " " + s.slideout), a.$page = e, this.trigger("setPage", e);
  }, t[e].prototype["_initWindow_" + o] = function () {
    a.$wndw.off(i.keydown + "-offcanvas").on(i.keydown + "-offcanvas", function (t) {
      return a.$html.hasClass(s.opened) && 9 == t.keyCode ? (t.preventDefault(), !1) : void 0;
    });
    var t = 0;
    a.$wndw.off(i.resize + "-offcanvas").on(i.resize + "-offcanvas", function (e, o) {
      if (1 == a.$page.length && (o || a.$html.hasClass(s.opened))) {
        var n = a.$wndw.height();
        (o || n != t) && (t = n, a.$page.css("minHeight", n));
      }
    });
  }, t[e].prototype._initBlocker = function () {
    var e = this;
    a.$blck || (a.$blck = t('<div id="' + s.blocker + '" class="' + s.slideout + '" />')), a.$blck.appendTo(a.$body).off(i.touchstart + "-offcanvas " + i.touchmove + "-offcanvas").on(i.touchstart + "-offcanvas " + i.touchmove + "-offcanvas", function (t) {
      t.preventDefault(), t.stopPropagation(), a.$blck.trigger(i.mousedown + "-offcanvas");
    }).off(i.mousedown + "-offcanvas").on(i.mousedown + "-offcanvas", function (t) {
      t.preventDefault(), a.$html.hasClass(s.modal) || (e.closeAllOthers(), e.close());
    });
  };
  var s, n, i, a;
}(jQuery);
/*	
 * jQuery mmenu autoHeight addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (t) {
  var e = "mmenu",
      i = "autoHeight";
  t[e].addons[i] = {
    setup: function setup() {
      if (this.opts.offCanvas) {
        switch (this.opts.offCanvas.position) {
          case "left":
          case "right":
            return;
        }

        var n = this,
            o = this.opts[i];

        if (this.conf[i], h = t[e].glbl, "boolean" == typeof o && o && (o = {
          height: "auto"
        }), "object" != _typeof(o) && (o = {}), o = this.opts[i] = t.extend(!0, {}, t[e].defaults[i], o), "auto" == o.height) {
          this.$menu.addClass(s.autoheight);

          var u = function u(t) {
            var e = this.$menu.children("." + s.current);
            _top = parseInt(e.css("top"), 10) || 0, _bot = parseInt(e.css("bottom"), 10) || 0, this.$menu.addClass(s.measureheight), t = t || this.$menu.children("." + s.current), t.is("." + s.vertical) && (t = t.parents("." + s.panel).not("." + s.vertical).first()), this.$menu.height(t.outerHeight() + _top + _bot).removeClass(s.measureheight);
          };

          this.bind("update", u), this.bind("openPanel", u), this.bind("closePanel", u), this.bind("open", u), h.$wndw.off(a.resize + "-autoheight").on(a.resize + "-autoheight", function () {
            u.call(n);
          });
        }
      }
    },
    add: function add() {
      s = t[e]._c, n = t[e]._d, a = t[e]._e, s.add("autoheight measureheight"), a.add("resize");
    },
    clickAnchor: function clickAnchor() {}
  }, t[e].defaults[i] = {
    height: "default"
  };
  var s, n, a, h;
}(jQuery);
/*	
 * jQuery mmenu backButton addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (o) {
  var t = "mmenu",
      n = "backButton";
  o[t].addons[n] = {
    setup: function setup() {
      if (this.opts.offCanvas) {
        var i = this,
            e = this.opts[n];

        if (this.conf[n], a = o[t].glbl, "boolean" == typeof e && (e = {
          close: e
        }), "object" != _typeof(e) && (e = {}), e = o.extend(!0, {}, o[t].defaults[n], e), e.close) {
          var c = "#" + i.$menu.attr("id");
          this.bind("opened", function () {
            location.hash != c && history.pushState(null, document.title, c);
          }), o(window).on("popstate", function (o) {
            a.$html.hasClass(s.opened) ? (o.stopPropagation(), i.close()) : location.hash == c && (o.stopPropagation(), i.open());
          });
        }
      }
    },
    add: function add() {
      return window.history && window.history.pushState ? (s = o[t]._c, i = o[t]._d, e = o[t]._e, void 0) : (o[t].addons[n].setup = function () {}, void 0);
    },
    clickAnchor: function clickAnchor() {}
  }, o[t].defaults[n] = {
    close: !1
  };
  var s, i, e, a;
}(jQuery);
/*	
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (t) {
  var n = "mmenu",
      e = "counters";
  t[n].addons[e] = {
    setup: function setup() {
      var c = this,
          o = this.opts[e];
      this.conf[e], s = t[n].glbl, "boolean" == typeof o && (o = {
        add: o,
        update: o
      }), "object" != _typeof(o) && (o = {}), o = this.opts[e] = t.extend(!0, {}, t[n].defaults[e], o), this.bind("init", function (n) {
        this.__refactorClass(t("em", n), this.conf.classNames[e].counter, "counter");
      }), o.add && this.bind("init", function (n) {
        n.each(function () {
          var n = t(this).data(a.parent);
          n && (n.children("em." + i.counter).length || n.prepend(t('<em class="' + i.counter + '" />')));
        });
      }), o.update && this.bind("update", function () {
        this.$menu.find("." + i.panel).each(function () {
          var n = t(this),
              e = n.data(a.parent);

          if (e) {
            var s = e.children("em." + i.counter);
            s.length && (n = n.children("." + i.listview), n.length && s.html(c.__filterListItems(n.children()).length));
          }
        });
      });
    },
    add: function add() {
      i = t[n]._c, a = t[n]._d, c = t[n]._e, i.add("counter search noresultsmsg");
    },
    clickAnchor: function clickAnchor() {}
  }, t[n].defaults[e] = {
    add: !1,
    update: !1
  }, t[n].configuration.classNames[e] = {
    counter: "Counter"
  };
  var i, a, c, s;
}(jQuery);
/*	
 * jQuery mmenu dividers addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (i) {
  var e = "mmenu",
      s = "dividers";
  i[e].addons[s] = {
    setup: function setup() {
      var n = this,
          a = this.opts[s];

      if (this.conf[s], l = i[e].glbl, "boolean" == typeof a && (a = {
        add: a,
        fixed: a
      }), "object" != _typeof(a) && (a = {}), a = this.opts[s] = i.extend(!0, {}, i[e].defaults[s], a), this.bind("init", function () {
        this.__refactorClass(i("li", this.$menu), this.conf.classNames[s].collapsed, "collapsed");
      }), a.add && this.bind("init", function (e) {
        switch (a.addTo) {
          case "panels":
            var s = e;
            break;

          default:
            var s = i(a.addTo, this.$menu).filter("." + d.panel);
        }

        i("." + d.divider, s).remove(), s.find("." + d.listview).not("." + d.vertical).each(function () {
          var e = "";

          n.__filterListItems(i(this).children()).each(function () {
            var s = i.trim(i(this).children("a, span").text()).slice(0, 1).toLowerCase();
            s != e && s.length && (e = s, i('<li class="' + d.divider + '">' + s + "</li>").insertBefore(this));
          });
        });
      }), a.collapse && this.bind("init", function (e) {
        i("." + d.divider, e).each(function () {
          var e = i(this),
              s = e.nextUntil("." + d.divider, "." + d.collapsed);
          s.length && (e.children("." + d.subopen).length || (e.wrapInner("<span />"), e.prepend('<a href="#" class="' + d.subopen + " " + d.fullsubopen + '" />')));
        });
      }), a.fixed) {
        var o = function o(e) {
          e = e || this.$menu.children("." + d.current);
          var s = e.find("." + d.divider).not("." + d.hidden);

          if (s.length) {
            this.$menu.addClass(d.hasdividers);
            var n = e.scrollTop() || 0,
                t = "";
            e.is(":visible") && e.find("." + d.divider).not("." + d.hidden).each(function () {
              i(this).position().top + n < n + 1 && (t = i(this).text());
            }), this.$fixeddivider.text(t);
          } else this.$menu.removeClass(d.hasdividers);
        };

        this.$fixeddivider = i('<ul class="' + d.listview + " " + d.fixeddivider + '"><li class="' + d.divider + '"></li></ul>').prependTo(this.$menu).children(), this.bind("openPanel", o), this.bind("init", function (e) {
          e.off(t.scroll + "-dividers " + t.touchmove + "-dividers").on(t.scroll + "-dividers " + t.touchmove + "-dividers", function () {
            o.call(n, i(this));
          });
        });
      }
    },
    add: function add() {
      d = i[e]._c, n = i[e]._d, t = i[e]._e, d.add("collapsed uncollapsed fixeddivider hasdividers"), t.add("scroll");
    },
    clickAnchor: function clickAnchor(i, e) {
      if (this.opts[s].collapse && e) {
        var n = i.parent();

        if (n.is("." + d.divider)) {
          var t = n.nextUntil("." + d.divider, "." + d.collapsed);
          return n.toggleClass(d.opened), t[n.hasClass(d.opened) ? "addClass" : "removeClass"](d.uncollapsed), !0;
        }
      }

      return !1;
    }
  }, i[e].defaults[s] = {
    add: !1,
    addTo: "panels",
    fixed: !1,
    collapse: !1
  }, i[e].configuration.classNames[s] = {
    collapsed: "Collapsed"
  };
  var d, n, t, l;
}(jQuery);
/*	
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (e) {
  function t(e, t, n) {
    return t > e && (e = t), e > n && (e = n), e;
  }

  var n = "mmenu",
      o = "dragOpen";
  e[n].addons[o] = {
    setup: function setup() {
      if (this.opts.offCanvas) {
        var i = this,
            a = this.opts[o],
            p = this.conf[o];

        if (r = e[n].glbl, "boolean" == typeof a && (a = {
          open: a
        }), "object" != _typeof(a) && (a = {}), a = this.opts[o] = e.extend(!0, {}, e[n].defaults[o], a), a.open) {
          var d,
              f,
              c,
              u,
              h,
              l = {},
              m = 0,
              g = !1,
              v = !1,
              w = 0,
              _ = 0;

          switch (this.opts.offCanvas.position) {
            case "left":
            case "right":
              l.events = "panleft panright", l.typeLower = "x", l.typeUpper = "X", v = "width";
              break;

            case "top":
            case "bottom":
              l.events = "panup pandown", l.typeLower = "y", l.typeUpper = "Y", v = "height";
          }

          switch (this.opts.offCanvas.position) {
            case "right":
            case "bottom":
              l.negative = !0, u = function u(e) {
                e >= r.$wndw[v]() - a.maxStartPos && (m = 1);
              };
              break;

            default:
              l.negative = !1, u = function u(e) {
                e <= a.maxStartPos && (m = 1);
              };
          }

          switch (this.opts.offCanvas.position) {
            case "left":
              l.open_dir = "right", l.close_dir = "left";
              break;

            case "right":
              l.open_dir = "left", l.close_dir = "right";
              break;

            case "top":
              l.open_dir = "down", l.close_dir = "up";
              break;

            case "bottom":
              l.open_dir = "up", l.close_dir = "down";
          }

          switch (this.opts.offCanvas.zposition) {
            case "front":
              h = function h() {
                return this.$menu;
              };

              break;

            default:
              h = function h() {
                return e("." + s.slideout);
              };

          }

          var b = this.__valueOrFn(a.pageNode, this.$menu, r.$page);

          "string" == typeof b && (b = e(b));
          var y = new Hammer(b[0], a.vendors.hammer);
          y.on("panstart", function (e) {
            u(e.center[l.typeLower]), r.$slideOutNodes = h(), g = l.open_dir;
          }).on(l.events + " panend", function (e) {
            m > 0 && e.preventDefault();
          }).on(l.events, function (e) {
            if (d = e["delta" + l.typeUpper], l.negative && (d = -d), d != w && (g = d >= w ? l.open_dir : l.close_dir), w = d, w > a.threshold && 1 == m) {
              if (r.$html.hasClass(s.opened)) return;
              m = 2, i._openSetup(), i.trigger("opening"), r.$html.addClass(s.dragging), _ = t(r.$wndw[v]() * p[v].perc, p[v].min, p[v].max);
            }

            2 == m && (f = t(w, 10, _) - ("front" == i.opts.offCanvas.zposition ? _ : 0), l.negative && (f = -f), c = "translate" + l.typeUpper + "(" + f + "px )", r.$slideOutNodes.css({
              "-webkit-transform": "-webkit-" + c,
              transform: c
            }));
          }).on("panend", function () {
            2 == m && (r.$html.removeClass(s.dragging), r.$slideOutNodes.css("transform", ""), i[g == l.open_dir ? "_openFinish" : "close"]()), m = 0;
          });
        }
      }
    },
    add: function add() {
      return "function" != typeof Hammer || Hammer.VERSION < 2 ? (e[n].addons[o].setup = function () {}, void 0) : (s = e[n]._c, i = e[n]._d, a = e[n]._e, s.add("dragging"), void 0);
    },
    clickAnchor: function clickAnchor() {}
  }, e[n].defaults[o] = {
    open: !1,
    maxStartPos: 100,
    threshold: 50,
    vendors: {
      hammer: {}
    }
  }, e[n].configuration[o] = {
    width: {
      perc: .8,
      min: 140,
      max: 440
    },
    height: {
      perc: .8,
      min: 140,
      max: 880
    }
  };
  var s, i, a, r;
}(jQuery);
/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (i) {
  var s = "mmenu",
      n = "fixedElements";
  i[s].addons[n] = {
    setup: function setup() {
      if (this.opts.offCanvas) {
        this.opts[n], this.conf[n], o = i[s].glbl;

        var a = function a(i) {
          var s = this.conf.classNames[n].fixed;

          this.__refactorClass(i.find("." + s), s, "slideout").appendTo(o.$body);
        };

        a.call(this, o.$page), this.bind("setPage", a);
      }
    },
    add: function add() {
      a = i[s]._c, t = i[s]._d, e = i[s]._e, a.add("fixed");
    },
    clickAnchor: function clickAnchor() {}
  }, i[s].configuration.classNames[n] = {
    fixed: "Fixed"
  };
  var a, t, e, o;
}(jQuery);
/*	
 * jQuery mmenu navbar addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (n) {
  var a = "mmenu",
      t = "navbars";
  n[a].addons[t] = {
    setup: function setup() {
      var r = this,
          s = this.opts[t];

      if (this.conf[t], i = n[a].glbl, "undefined" != typeof s) {
        s instanceof Array || (s = [s]);
        var d = {};
        n.each(s, function (i) {
          var c = s[i];
          "boolean" == typeof c && c && (c = {}), "object" != _typeof(c) && (c = {}), "undefined" == typeof c.content && (c.content = ["prev", "title"]), c.content instanceof Array || (c.content = [c.content]), c = n.extend(!0, {}, r.opts.navbar, c);
          var o = c.position;
          "bottom" != o && (o = "top"), d[o] || (d[o] = 0), d[o]++;

          for (var l = n("<div />").addClass(e.navbar).addClass(e.navbar + "-" + o).addClass(e.navbar + "-" + o + "-" + d[o]), h = 0, f = c.content.length; f > h; h++) {
            var v = n[a].addons[t][c.content[h]] || !1;
            v ? v.call(r, l, c) : (v = c.content[h], v instanceof n || (v = n(c.content[h])), v.each(function () {
              l.append(n(this));
            }));
          }

          var u = l.children().not("." + e.btn).length;
          u > 1 && l.addClass(e.navbar + "-" + u), l.children("." + e.btn).length && l.addClass(e.hasbtns), l.prependTo(r.$menu);
        });

        for (var c in d) {
          r.$menu.addClass(e.hasnavbar + "-" + c + "-" + d[c]);
        }
      }
    },
    add: function add() {
      e = n[a]._c, r = n[a]._d, s = n[a]._e, e.add("close hasbtns");
    },
    clickAnchor: function clickAnchor() {}
  }, n[a].configuration.classNames[t] = {
    panelTitle: "Title",
    panelNext: "Next",
    panelPrev: "Prev"
  };
  var e, r, s, i;
}(jQuery),
/*	
* jQuery mmenu navbar addon close content
* mmenu.frebsite.nl
*
* Copyright (c) Fred Heusschen
*/
function (n) {
  var a = "mmenu",
      t = "navbars",
      e = "close";

  n[a].addons[t][e] = function (t) {
    var e = n[a]._c,
        r = n[a].glbl;
    t.append('<a class="' + e.close + " " + e.btn + '" href="#"></a>');

    var s = function s(n) {
      t.find("." + e.close).attr("href", "#" + n.attr("id"));
    };

    s.call(this, r.$page), this.bind("setPage", s);
  };
}(jQuery),
/*	
* jQuery mmenu navbar addon next content
* mmenu.frebsite.nl
*
* Copyright (c) Fred Heusschen
*/
function (n) {
  var a = "mmenu",
      t = "navbars",
      e = "next";

  n[a].addons[t][e] = function (e) {
    var r = n[a]._c;
    e.append('<a class="' + r.next + " " + r.btn + '" href="#"></a>');

    var s = function s(n) {
      n = n || this.$menu.children("." + r.current);
      var a = e.find("." + r.next),
          s = n.find("." + this.conf.classNames[t].panelNext),
          i = s.attr("href"),
          d = s.html();
      a[i ? "attr" : "removeAttr"]("href", i), a[i || d ? "removeClass" : "addClass"](r.hidden), a.html(d);
    };

    this.bind("openPanel", s), this.bind("init", function () {
      s.call(this);
    });
  };
}(jQuery),
/*	
* jQuery mmenu navbar addon prev content
* mmenu.frebsite.nl
*
* Copyright (c) Fred Heusschen
*/
function (n) {
  var a = "mmenu",
      t = "navbars",
      e = "prev";

  n[a].addons[t][e] = function (e) {
    var r = n[a]._c;
    e.append('<a class="' + r.prev + " " + r.btn + '" href="#"></a>'), this.bind("init", function (n) {
      n.removeClass(r.hasnavbar);
    });

    var s = function s(n) {
      n = n || this.$menu.children("." + r.current);
      var a = e.find("." + r.prev),
          s = n.find("." + this.conf.classNames[t].panelPrev);
      s.length || (s = n.children("." + r.navbar).children("." + r.prev));
      var i = s.attr("href"),
          d = s.html();
      a[i ? "attr" : "removeAttr"]("href", i), a[i || d ? "removeClass" : "addClass"](r.hidden), a.html(d);
    };

    this.bind("openPanel", s), this.bind("init", function () {
      s.call(this);
    });
  };
}(jQuery),
/*	
* jQuery mmenu navbar addon searchfield content
* mmenu.frebsite.nl
*
* Copyright (c) Fred Heusschen
*/
function (n) {
  var a = "mmenu",
      t = "navbars",
      e = "searchfield";

  n[a].addons[t][e] = function (t) {
    var e = n[a]._c,
        r = n('<div class="' + e.search + '" />').appendTo(t);
    "object" != _typeof(this.opts.searchfield) && (this.opts.searchfield = {}), this.opts.searchfield.add = !0, this.opts.searchfield.addTo = r;
  };
}(jQuery),
/*	
* jQuery mmenu navbar addon title content
* mmenu.frebsite.nl
*
* Copyright (c) Fred Heusschen
*/
function (n) {
  var a = "mmenu",
      t = "navbars",
      e = "title";

  n[a].addons[t][e] = function (e, r) {
    var s = n[a]._c;
    e.append('<a class="' + s.title + '"></a>');

    var i = function i(n) {
      n = n || this.$menu.children("." + s.current);
      var a = e.find("." + s.title),
          i = n.find("." + this.conf.classNames[t].panelTitle);
      i.length || (i = n.children("." + s.navbar).children("." + s.title));
      var d = i.attr("href"),
          c = i.html() || r.title;
      a[d ? "attr" : "removeAttr"]("href", d), a[d || c ? "removeClass" : "addClass"](s.hidden), a.html(c);
    };

    this.bind("openPanel", i), this.bind("init", function () {
      i.call(this);
    });
  };
}(jQuery);
/*	
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (e) {
  function s(e) {
    switch (e) {
      case 9:
      case 16:
      case 17:
      case 18:
      case 37:
      case 38:
      case 39:
      case 40:
        return !0;
    }

    return !1;
  }

  var n = "mmenu",
      a = "searchfield";
  e[n].addons[a] = {
    setup: function setup() {
      var o = this,
          d = this.opts[a],
          c = this.conf[a];
      r = e[n].glbl, "boolean" == typeof d && (d = {
        add: d
      }), "object" != _typeof(d) && (d = {}), d = this.opts[a] = e.extend(!0, {}, e[n].defaults[a], d), this.bind("close", function () {
        this.$menu.find("." + l.search).find("input").blur();
      }), this.bind("init", function (n) {
        if (d.add) {
          switch (d.addTo) {
            case "panels":
              var a = n;
              break;

            default:
              var a = e(d.addTo, this.$menu);
          }

          a.each(function () {
            var s = e(this);

            if (!s.is("." + l.panel) || !s.is("." + l.vertical)) {
              if (!s.children("." + l.search).length) {
                var n = c.form ? "form" : "div",
                    a = e("<" + n + ' class="' + l.search + '" />');
                if (c.form && "object" == _typeof(c.form)) for (var t in c.form) {
                  a.attr(t, c.form[t]);
                }
                a.append('<input placeholder="' + d.placeholder + '" type="text" autocomplete="off" />'), s.hasClass(l.search) ? s.replaceWith(a) : s.prepend(a).addClass(l.hassearch);
              }

              if (d.noResults) {
                var i = s.closest("." + l.panel).length;

                if (i || (s = o.$menu.children("." + l.panel).first()), !s.children("." + l.noresultsmsg).length) {
                  var r = s.children("." + l.listview);
                  e('<div class="' + l.noresultsmsg + '" />').append(d.noResults)[r.length ? "insertBefore" : "prependTo"](r.length ? r : s);
                }
              }
            }
          }), d.search && e("." + l.search, this.$menu).each(function () {
            var n = e(this),
                a = n.closest("." + l.panel).length;
            if (a) var r = n.closest("." + l.panel),
                c = r;else var r = e("." + l.panel, o.$menu),
                c = o.$menu;

            var h = n.children("input"),
                u = o.__findAddBack(r, "." + l.listview).children("li"),
                f = u.filter("." + l.divider),
                p = o.__filterListItems(u),
                v = "> a",
                m = v + ", > span",
                b = function b() {
              var s = h.val().toLowerCase();
              r.scrollTop(0), p.add(f).addClass(l.hidden).find("." + l.fullsubopensearch).removeClass(l.fullsubopen).removeClass(l.fullsubopensearch), p.each(function () {
                var n = e(this),
                    a = v;
                (d.showTextItems || d.showSubPanels && n.find("." + l.next)) && (a = m), e(a, n).text().toLowerCase().indexOf(s) > -1 && n.add(n.prevAll("." + l.divider).first()).removeClass(l.hidden);
              }), d.showSubPanels && r.each(function () {
                var s = e(this);

                o.__filterListItems(s.find("." + l.listview).children()).each(function () {
                  var s = e(this),
                      n = s.data(t.sub);
                  s.removeClass(l.nosubresults), n && n.find("." + l.listview).children().removeClass(l.hidden);
                });
              }), e(r.get().reverse()).each(function (s) {
                var n = e(this),
                    i = n.data(t.parent);
                i && (o.__filterListItems(n.find("." + l.listview).children()).length ? (i.hasClass(l.hidden) && i.children("." + l.next).not("." + l.fullsubopen).addClass(l.fullsubopen).addClass(l.fullsubopensearch), i.removeClass(l.hidden).removeClass(l.nosubresults).prevAll("." + l.divider).first().removeClass(l.hidden)) : a || (n.hasClass(l.opened) && setTimeout(function () {
                  o.openPanel(i.closest("." + l.panel));
                }, 1.5 * (s + 1) * o.conf.openingInterval), i.addClass(l.nosubresults)));
              }), c[p.not("." + l.hidden).length ? "removeClass" : "addClass"](l.noresults), this.update();
            };

            h.off(i.keyup + "-searchfield " + i.change + "-searchfield").on(i.keyup + "-searchfield", function (e) {
              s(e.keyCode) || b.call(o);
            }).on(i.change + "-searchfield", function () {
              b.call(o);
            });
          });
        }
      });
    },
    add: function add() {
      l = e[n]._c, t = e[n]._d, i = e[n]._e, l.add("search hassearch noresultsmsg noresults nosubresults fullsubopensearch"), i.add("change keyup");
    },
    clickAnchor: function clickAnchor() {}
  }, e[n].defaults[a] = {
    add: !1,
    addTo: "panels",
    search: !0,
    placeholder: "TĂ¬m kiáº¿m...",
    noResults: "No results found.",
    showTextItems: !1,
    showSubPanels: !0
  }, e[n].configuration[a] = {
    form: !1
  };
  var l, t, i, r;
}(jQuery);
/*	
 * jQuery mmenu sectionIndexer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (e) {
  var a = "mmenu",
      r = "sectionIndexer";
  e[a].addons[r] = {
    setup: function setup() {
      var n = this,
          d = this.opts[r];
      this.conf[r], t = e[a].glbl, "boolean" == typeof d && (d = {
        add: d
      }), "object" != _typeof(d) && (d = {}), d = this.opts[r] = e.extend(!0, {}, e[a].defaults[r], d), this.bind("init", function (a) {
        if (d.add) {
          switch (d.addTo) {
            case "panels":
              var r = a;
              break;

            default:
              var r = e(d.addTo, this.$menu).filter("." + i.panel);
          }

          r.find("." + i.divider).closest("." + i.panel).addClass(i.hasindexer);
        }

        if (!this.$indexer && this.$menu.children("." + i.hasindexer).length) {
          this.$indexer = e('<div class="' + i.indexer + '" />').prependTo(this.$menu).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'), this.$indexer.children().on(s.mouseover + "-searchfield " + i.touchstart + "-searchfield", function () {
            var a = e(this).attr("href").slice(1),
                r = n.$menu.children("." + i.current),
                s = r.find("." + i.listview),
                t = !1,
                d = r.scrollTop(),
                h = s.position().top + parseInt(s.css("margin-top"), 10) + parseInt(s.css("padding-top"), 10) + d;
            r.scrollTop(0), s.children("." + i.divider).not("." + i.hidden).each(function () {
              t === !1 && a == e(this).text().slice(0, 1).toLowerCase() && (t = e(this).position().top + h);
            }), r.scrollTop(t !== !1 ? t : d);
          });

          var t = function t(e) {
            n.$menu[(e.hasClass(i.hasindexer) ? "add" : "remove") + "Class"](i.hasindexer);
          };

          this.bind("openPanel", t), t.call(this, this.$menu.children("." + i.current));
        }
      });
    },
    add: function add() {
      i = e[a]._c, n = e[a]._d, s = e[a]._e, i.add("indexer hasindexer"), s.add("mouseover touchstart");
    },
    clickAnchor: function clickAnchor(e) {
      return e.parent().is("." + i.indexer) ? !0 : void 0;
    }
  }, e[a].defaults[r] = {
    add: !1,
    addTo: "panels"
  };
  var i, n, s, t;
}(jQuery);
/*	
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

!function (t) {
  var e = "mmenu",
      c = "toggles";
  t[e].addons[c] = {
    setup: function setup() {
      var n = this;
      this.opts[c], this.conf[c], l = t[e].glbl, this.bind("init", function (e) {
        this.__refactorClass(t("input", e), this.conf.classNames[c].toggle, "toggle"), this.__refactorClass(t("input", e), this.conf.classNames[c].check, "check"), t("input." + s.toggle + ", input." + s.check, e).each(function () {
          var e = t(this),
              c = e.closest("li"),
              i = e.hasClass(s.toggle) ? "toggle" : "check",
              l = e.attr("id") || n.__getUniqueId();

          c.children('label[for="' + l + '"]').length || (e.attr("id", l), c.prepend(e), t('<label for="' + l + '" class="' + s[i] + '"></label>').insertBefore(c.children("a, span").last()));
        });
      });
    },
    add: function add() {
      s = t[e]._c, n = t[e]._d, i = t[e]._e, s.add("toggle check");
    },
    clickAnchor: function clickAnchor() {}
  }, t[e].configuration.classNames[c] = {
    toggle: "Toggle",
    check: "Check"
  };
  var s, n, i, l;
}(jQuery);