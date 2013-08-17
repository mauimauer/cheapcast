
'use strict';
var cr$, cr$a = this,
    cr$aa = function(a) {
        a = a.split(".");
        for (var b = cr$a, c; c = a.shift();) if (null != b[c]) b = b[c];
        else return null;
        return b
    }, cr$ba = function() {
        throw Error("unimplemented abstract method");
    }, cr$b = function(a) {
        var b = typeof a;
        if ("object" == b) if (a) {
            if (a instanceof Array) return "array";
            if (a instanceof Object) return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }, cr$ca = function(a) {
        var b = cr$b(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, cr$c = function(a) {
        return "string" == typeof a
    }, cr$da = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, cr$d = "closure_uid_" + (1E9 * Math.random() >>> 0),
    cr$ea = 0,
    cr$fa = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, cr$ga = function(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }, cr$e = function(a, b, c) {
        cr$e = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? cr$fa : cr$ga;
        return cr$e.apply(null, arguments)
    }, cr$ha = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b)
        }
    }, cr$f = Date.now || function() {
        return +new Date
    }, cr$g = function(a, b) {
        var c = a.split("."),
            d = cr$a;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
    }, cr$h = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.h = b.prototype;
        a.prototype = new c
    };
Function.prototype.bind = Function.prototype.bind || function(a, b) {
    if (1 < arguments.length) {
        var c = Array.prototype.slice.call(arguments, 1);
        c.unshift(this, a);
        return cr$e.apply(null, c)
    }
    return cr$e(this, a)
};
var cr$i = function(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, cr$i) : this.stack = Error().stack || "";
    a && (this.message = String(a))
};
cr$h(cr$i, Error);
cr$i.prototype.name = "CustomError";
var cr$ia = function(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
        return d + c.join("%s")
    }, cr$j = function(a) {
        if (!cr$ja.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(cr$ka, "&")); - 1 != a.indexOf("<") && (a = a.replace(cr$la, "<")); - 1 != a.indexOf(">") && (a = a.replace(cr$ma, ">")); - 1 != a.indexOf('"') && (a = a.replace(cr$na, "\""));
        return a
    }, cr$ka = /&/g,
    cr$la = /</g,
    cr$ma = />/g,
    cr$na = /\"/g,
    cr$ja = /[&<>\"]/;
var cr$oa = function(a, b) {
    b.unshift(a);
    cr$i.call(this, cr$ia.apply(null, b));
    b.shift()
};
cr$h(cr$oa, cr$i);
cr$oa.prototype.name = "AssertionError";
var cr$k = function(a, b, c) {
    if (!a) {
        var d = Array.prototype.slice.call(arguments, 2),
            e = "Assertion failed";
        if (b) var e = e + (": " + b),
            f = d;
        throw new cr$oa("" + e, f || []);
    }
}, cr$pa = function(a, b) {
    throw new cr$oa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
};
var cr$l = Array.prototype,
    cr$qa = cr$l.indexOf ? function(a, b, c) {
        cr$k(null != a.length);
        return cr$l.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (cr$c(a)) return cr$c(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, cr$ra = cr$l.forEach ? function(a, b, c) {
        cr$k(null != a.length);
        cr$l.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = cr$c(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    }, cr$sa = function(a) {
        return cr$l.concat.apply(cr$l,
            arguments)
    }, cr$ta = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }, cr$ua = function(a, b, c) {
        cr$k(null != a.length);
        return 2 >= arguments.length ? cr$l.slice.call(a, b) : cr$l.slice.call(a, b, c)
    };
var cr$va = "StopIteration" in cr$a ? cr$a.StopIteration : Error("StopIteration"),
    cr$wa = function() {};
cr$wa.prototype.next = function() {
    throw cr$va;
};
cr$wa.prototype.Zb = function() {
    return this
};
var cr$xa = function(a, b) {
        for (var c in a) b.call(void 0, a[c], c, a)
    }, cr$ya = function(a, b) {
        for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
        return !1
    }, cr$za = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    }, cr$Aa = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    }, cr$Ba = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
    cr$Ca = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < cr$Ba.length; f++) c = cr$Ba[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
var cr$m = function(a, b) {
    this.v = {};
    this.l = [];
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else if (a) {
        a instanceof cr$m ? (c = a.Y(), d = a.D()) : (c = cr$Aa(a), d = cr$za(a));
        for (var e = 0; e < c.length; e++) this.set(c[e], d[e])
    }
};
cr$ = cr$m.prototype;
cr$.j = 0;
cr$.ra = 0;
cr$.D = function() {
    cr$Da(this);
    for (var a = [], b = 0; b < this.l.length; b++) a.push(this.v[this.l[b]]);
    return a
};
cr$.Y = function() {
    cr$Da(this);
    return this.l.concat()
};
cr$.da = function(a) {
    return cr$n(this.v, a)
};
cr$.remove = function(a) {
    return cr$n(this.v, a) ? (delete this.v[a], this.j--, this.ra++, this.l.length > 2 * this.j && cr$Da(this), !0) : !1
};
var cr$Da = function(a) {
    if (a.j != a.l.length) {
        for (var b = 0, c = 0; b < a.l.length;) {
            var d = a.l[b];
            cr$n(a.v, d) && (a.l[c++] = d);
            b++
        }
        a.l.length = c
    }
    if (a.j != a.l.length) {
        for (var e = {}, c = b = 0; b < a.l.length;) d = a.l[b], cr$n(e, d) || (a.l[c++] = d, e[d] = 1), b++;
        a.l.length = c
    }
};
cr$m.prototype.get = function(a, b) {
    return cr$n(this.v, a) ? this.v[a] : b
};
cr$m.prototype.set = function(a, b) {
    cr$n(this.v, a) || (this.j++, this.l.push(a), this.ra++);
    this.v[a] = b
};
cr$m.prototype.$ = function() {
    return new cr$m(this)
};
cr$m.prototype.Zb = function(a) {
    cr$Da(this);
    var b = 0,
        c = this.l,
        d = this.v,
        e = this.ra,
        f = this,
        g = new cr$wa;
    g.next = function() {
        for (;;) {
            if (e != f.ra) throw Error("The map has changed since the iterator was created");
            if (b >= c.length) throw cr$va;
            var g = c[b++];
            return a ? g : d[g]
        }
    };
    return g
};
var cr$n = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
var cr$Ea = function(a) {
    if ("function" == typeof a.D) return a.D();
    if (cr$c(a)) return a.split("");
    if (cr$ca(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    return cr$za(a)
}, cr$Fa = function(a, b, c) {
    if ("function" == typeof a.forEach) a.forEach(b, c);
    else if (cr$ca(a) || cr$c(a)) cr$ra(a, b, c);
    else {
        var d;
        if ("function" == typeof a.Y) d = a.Y();
        else if ("function" != typeof a.D) if (cr$ca(a) || cr$c(a)) {
            d = [];
            for (var e = a.length, f = 0; f < e; f++) d.push(f)
        } else d = cr$Aa(a);
        else d = void 0;
        for (var e = cr$Ea(a), f = e.length, g = 0; g < f; g++) b.call(c,
            e[g], d && d[g], a)
    }
};
var cr$o, cr$Ga, cr$Ha, cr$Ia, cr$Ja = function() {
    return cr$a.navigator ? cr$a.navigator.userAgent : null
};
cr$Ia = cr$Ha = cr$Ga = cr$o = !1;
var cr$p;
if (cr$p = cr$Ja()) {
    var cr$Ka = cr$a.navigator;
    cr$o = 0 == cr$p.lastIndexOf("Opera", 0);
    cr$Ga = !cr$o && (-1 != cr$p.indexOf("MSIE") || -1 != cr$p.indexOf("Trident"));
    cr$Ha = !cr$o && -1 != cr$p.indexOf("WebKit");
    cr$Ia = !cr$o && !cr$Ha && !cr$Ga && "Gecko" == cr$Ka.product
}
var cr$La = cr$o,
    cr$q = cr$Ga,
    cr$r = cr$Ia,
    cr$s = cr$Ha,
    cr$Ma = cr$a.navigator,
    cr$Na = -1 != (cr$Ma && cr$Ma.platform || "").indexOf("Mac"),
    cr$Oa = function() {
        var a = cr$a.document;
        return a ? a.documentMode : void 0
    }, cr$Pa;
t: {
    var cr$Qa = "",
        cr$t;
    if (cr$La && cr$a.opera) var cr$Ra = cr$a.opera.version,
        cr$Qa = "function" == typeof cr$Ra ? cr$Ra() : cr$Ra;
    else if (cr$r ? cr$t = /rv\:([^\);]+)(\)|;)/ : cr$q ? cr$t = /\b(?:MSIE|rv)\s+([^\);]+)(\)|;)/ : cr$s && (cr$t = /WebKit\/(\S+)/), cr$t) var cr$Sa = cr$t.exec(cr$Ja()),
        cr$Qa = cr$Sa ? cr$Sa[1] : "";
    if (cr$q) {
        var cr$Ta = cr$Oa();
        if (cr$Ta > parseFloat(cr$Qa)) {
            cr$Pa = String(cr$Ta);
            break t
        }
    }
    cr$Pa = cr$Qa
}
var cr$Ua = cr$Pa,
    cr$Va = {}, cr$u = function(a) {
        var b;
        if (!(b = cr$Va[a])) {
            b = 0;
            for (var c = String(cr$Ua).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var g = c[f] || "",
                    h = d[f] || "",
                    m = /(\d*)(\D*)/g,
                    n = /(\d*)(\D*)/g;
                do {
                    var k = m.exec(g) || ["", "", ""],
                        l = n.exec(h) || ["", "", ""];
                    if (0 == k[0].length && 0 == l[0].length) break;
                    b = ((0 == k[1].length ? 0 : parseInt(k[1], 10)) < (0 == l[1].length ? 0 : parseInt(l[1], 10)) ? -1 : (0 == k[1].length ? 0 : parseInt(k[1], 10)) > (0 == l[1].length ? 0 : parseInt(l[1], 10)) ? 1 : 0) || ((0 == k[2].length) < (0 == l[2].length) ? -1 : (0 == k[2].length) > (0 == l[2].length) ? 1 : 0) || (k[2] < l[2] ? -1 : k[2] > l[2] ? 1 : 0)
                } while (0 == b)
            }
            b = cr$Va[a] = 0 <= b
        }
        return b
    }, cr$Wa = cr$a.document,
    cr$Xa = cr$Wa && cr$q ? cr$Oa() || ("CSS1Compat" == cr$Wa.compatMode ? parseInt(cr$Ua, 10) : 5) : void 0;
var cr$Za = function(a) {
    return cr$Ya(a || arguments.callee.caller, [])
}, cr$Ya = function(a, b) {
    var c = [];
    if (0 <= cr$qa(b, a)) c.push("[...circular reference...]");
    else if (a && 50 > b.length) {
        c.push(cr$_a(a) + "(");
        for (var d = a.arguments, e = 0; e < d.length; e++) {
            0 < e && c.push(", ");
            var f;
            f = d[e];
            switch (typeof f) {
                case "object":
                    f = f ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    f = String(f);
                    break;
                case "boolean":
                    f = f ? "true" : "false";
                    break;
                case "function":
                    f = (f = cr$_a(f)) ? f : "[fn]";
                    break;
                default:
                    f = typeof f
            }
            40 < f.length && (f = f.substr(0,
                40) + "...");
            c.push(f)
        }
        b.push(a);
        c.push(")\n");
        try {
            c.push(cr$Ya(a.caller, b))
        } catch (g) {
            c.push("[exception trying to get caller]\n")
        }
    } else a ? c.push("[...long stack...]") : c.push("[end]");
    return c.join("")
}, cr$_a = function(a) {
    if (cr$v[a]) return cr$v[a];
    a = String(a);
    if (!cr$v[a]) {
        var b = /function ([^\(]+)/.exec(a);
        cr$v[a] = b ? b[1] : "[Anonymous]"
    }
    return cr$v[a]
}, cr$v = {};
var cr$w = function(a, b, c, d, e) {
    this.reset(a, b, c, d, e)
};
cr$w.prototype.Qb = 0;
cr$w.prototype.Ka = null;
cr$w.prototype.Ja = null;
var cr$0a = 0;
cr$w.prototype.reset = function(a, b, c, d, e) {
    this.Qb = "number" == typeof e ? e : cr$0a++;
    this.fb = d || cr$f();
    this.N = a;
    this.cb = b;
    this.eb = c;
    delete this.Ka;
    delete this.Ja
};
cr$w.prototype.Ma = function() {
    return this.N
};
cr$w.prototype.Sa = function(a) {
    this.N = a
};
var cr$x = function(a) {
    this.Xb = a
};
cr$x.prototype.ta = null;
cr$x.prototype.N = null;
cr$x.prototype.Ra = null;
cr$x.prototype.fa = null;
var cr$y = function(a, b) {
    this.name = a;
    this.value = b
};
cr$y.prototype.toString = function() {
    return this.name
};
var cr$1a = new cr$y("SHOUT", 1200),
    cr$2a = new cr$y("SEVERE", 1E3),
    cr$3a = new cr$y("WARNING", 900),
    cr$4a = new cr$y("INFO", 800),
    cr$5a = new cr$y("CONFIG", 700),
    cr$6a = new cr$y("FINE", 500),
    cr$7a = new cr$y("FINER", 400),
    cr$8a = [new cr$y("OFF", Infinity), cr$1a, cr$2a, cr$3a, cr$4a, cr$5a, cr$6a, cr$7a, new cr$y("FINEST", 300), new cr$y("ALL", 0)],
    cr$z = null,
    cr$9a = function(a) {
        if (!cr$z) {
            cr$z = {};
            for (var b = 0, c; c = cr$8a[b]; b++) cr$z[c.value] = c, cr$z[c.name] = c
        }
        if (a in cr$z) return cr$z[a];
        for (b = 0; b < cr$8a.length; ++b) if (c = cr$8a[b], c.value <= a) return c;
        return null
    };
cr$x.prototype.getParent = function() {
    return this.ta
};
cr$x.prototype.Sa = function(a) {
    this.N = a
};
cr$x.prototype.Ma = function() {
    return this.N
};
var cr$$a = function(a) {
    if (a.N) return a.N;
    if (a.ta) return cr$$a(a.ta);
    cr$pa("Root logger has no level set.");
    return null
};
cr$x.prototype.log = function(a, b, c) {
    if (a.value >= cr$$a(this).value) for (a = this.Yb(a, b, c), b = "log:" + a.cb, cr$a.console && (cr$a.console.timeStamp ? cr$a.console.timeStamp(b) : cr$a.console.markTimeline && cr$a.console.markTimeline(b)), cr$a.msWriteProfilerMark && cr$a.msWriteProfilerMark(b), b = this; b;) {
        c = b;
        var d = a;
        if (c.fa) for (var e = 0, f = void 0; f = c.fa[e]; e++) f(d);
        b = b.getParent()
    }
};
cr$x.prototype.Yb = function(a, b, c) {
    var d = new cr$w(a, String(b), this.Xb);
    if (c) {
        d.Ka = c;
        var e;
        var f = arguments.callee.caller;
        try {
            var g;
            var h = cr$aa("window.location.href");
            if (cr$c(c)) g = {
                message: c,
                name: "Unknown error",
                lineNumber: "Not available",
                fileName: h,
                stack: "Not available"
            };
            else {
                var m, n, k = !1;
                try {
                    m = c.lineNumber || c.gc || "Not available"
                } catch (l) {
                    m = "Not available", k = !0
                }
                try {
                    n = c.fileName || c.filename || c.sourceURL || cr$a.$googDebugFname || h
                } catch (q) {
                    n = "Not available", k = !0
                }
                g = !k && c.lineNumber && c.fileName && c.stack && c.message && c.name ? c : {
                    message: c.message || "Not available",
                    name: c.name || "UnknownError",
                    lineNumber: m,
                    fileName: n,
                    stack: c.stack || "Not available"
                }
            }
            e = "Message: " + cr$j(g.message) + '\nUrl: <a href="view-source:' + g.fileName + '" target="_new">' + g.fileName + "</a>\nLine: " + g.lineNumber + "\n\nBrowser stack:\n" + cr$j(g.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + cr$j(cr$Za(f) + "-> ")
        } catch (p) {
            e = "Exception trying to expose exception! You win, we lose. " + p
        }
        d.Ja = e
    }
    return d
};
var cr$A = function(a, b, c) {
    a.log(cr$2a, b, c)
};
cr$x.prototype.info = function(a, b) {
    this.log(cr$4a, a, b)
};
var cr$B = function(a, b) {
        a.log(cr$6a, b, void 0)
    }, cr$C = function(a, b) {
        a.log(cr$7a, b, void 0)
    }, cr$ab = {}, cr$D = null,
    cr$bb = function() {
        cr$D || (cr$D = new cr$x(""), cr$ab[""] = cr$D, cr$D.Sa(cr$5a))
    }, cr$E = function(a) {
        cr$bb();
        var b;
        if (!(b = cr$ab[a])) {
            b = new cr$x(a);
            var c = a.lastIndexOf("."),
                d = a.substr(c + 1),
                c = cr$E(a.substr(0, c));
            c.Ra || (c.Ra = {});
            c.Ra[d] = b;
            b.ta = c;
            cr$ab[a] = b
        }
        return b
    };
var cr$cb = function() {};
cr$cb.prototype.qb = !1;
cr$cb.prototype.p = function() {
    this.qb || (this.qb = !0, this.d())
};
var cr$db = function(a, b) {
    a.ga || (a.ga = []);
    a.ga.push(cr$e(b, void 0))
};
cr$cb.prototype.d = function() {
    if (this.ga) for (; this.ga.length;) this.ga.shift()()
};
var cr$eb = function(a) {
    a && "function" == typeof a.p && a.p()
};
var cr$F = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b
};
cr$ = cr$F.prototype;
cr$.d = function() {};
cr$.p = function() {};
cr$.O = !1;
cr$.defaultPrevented = !1;
cr$.jb = !0;
cr$.preventDefault = function() {
    this.defaultPrevented = !0;
    this.jb = !1
};
var cr$fb = function(a) {
    cr$fb[" "](a);
    return a
};
cr$fb[" "] = function() {};
var cr$gb = !cr$q || cr$q && 9 <= cr$Xa,
    cr$hb = cr$q && !cr$u("9");
!cr$s || cr$u("528");
cr$r && cr$u("1.9b") || cr$q && cr$u("8") || cr$La && cr$u("9.5") || cr$s && cr$u("528");
cr$r && !cr$u("8") || cr$q && cr$u("9");
var cr$G = function(a, b) {
    if (a) {
        var c = this.type = a.type;
        cr$F.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (cr$r) {
                var e;
                t: {
                    try {
                        cr$fb(d.nodeName);
                        e = !0;
                        break t
                    } catch (f) {}
                    e = !1
                }
                e || (d = null)
            }
        } else "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
        this.relatedTarget = d;
        this.offsetX = cr$s || void 0 !== a.offsetX ? a.offsetX : a.layerX;
        this.offsetY = cr$s || void 0 !== a.offsetY ? a.offsetY : a.layerY;
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.Wb = cr$Na ? a.metaKey : a.ctrlKey;
        this.state = a.state;
        this.ob = a;
        a.defaultPrevented && this.preventDefault();
        delete this.O
    }
};
cr$h(cr$G, cr$F);
cr$ = cr$G.prototype;
cr$.target = null;
cr$.relatedTarget = null;
cr$.offsetX = 0;
cr$.offsetY = 0;
cr$.clientX = 0;
cr$.clientY = 0;
cr$.screenX = 0;
cr$.screenY = 0;
cr$.button = 0;
cr$.keyCode = 0;
cr$.charCode = 0;
cr$.ctrlKey = !1;
cr$.altKey = !1;
cr$.shiftKey = !1;
cr$.metaKey = !1;
cr$.Wb = !1;
cr$.ob = null;
cr$.preventDefault = function() {
    cr$G.h.preventDefault.call(this);
    var a = this.ob;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, cr$hb) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
cr$.d = function() {};
var cr$H = "closure_listenable_" + (1E6 * Math.random() | 0),
    cr$ib = 0;
var cr$jb = function(a, b, c, d, e) {
    this.M = a;
    this.qa = null;
    this.src = b;
    this.type = c;
    this.capture = !! d;
    this.oa = e;
    this.key = ++cr$ib;
    this.W = this.ma = !1
}, cr$kb = function(a) {
    a.W = !0;
    a.M = null;
    a.qa = null;
    a.src = null;
    a.oa = null
};
var cr$I = function(a) {
    this.src = a;
    this.k = {};
    this.ba = 0
};
cr$I.prototype.add = function(a, b, c, d, e) {
    var f = this.k[a];
    f || (f = this.k[a] = [], this.ba++);
    var g = cr$lb(f, b, d, e); - 1 < g ? (a = f[g], c || (a.ma = !1)) : (a = new cr$jb(b, this.src, a, !! d, e), a.ma = c, f.push(a));
    return a
};
cr$I.prototype.remove = function(a, b, c, d) {
    if (!(a in this.k)) return !1;
    var e = this.k[a];
    b = cr$lb(e, b, c, d);
    return -1 < b ? (cr$kb(e[b]), cr$k(null != e.length), cr$l.splice.call(e, b, 1), 0 == e.length && (delete this.k[a], this.ba--), !0) : !1
};
var cr$mb = function(a, b) {
    var c = b.type;
    if (c in a.k) {
        var d = a.k[c],
            e = cr$qa(d, b),
            f;
        if (f = 0 <= e) cr$k(null != d.length), cr$l.splice.call(d, e, 1);
        f && (cr$kb(b), 0 == a.k[c].length && (delete a.k[c], a.ba--))
    }
};
cr$I.prototype.Qa = function(a, b, c, d) {
    a = this.k[a];
    var e = -1;
    a && (e = cr$lb(a, b, c, d));
    return -1 < e ? a[e] : null
};
cr$I.prototype.ua = function(a, b) {
    var c = void 0 !== a,
        d = void 0 !== b;
    return cr$ya(this.k, function(e) {
        for (var f = 0; f < e.length; ++f) if (!(c && e[f].type != a || d && e[f].capture != b)) return !0;
        return !1
    })
};
var cr$lb = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.W && f.M == b && f.capture == !! c && f.oa == d) return e
    }
    return -1
};
var cr$nb = {}, cr$ob = {}, cr$J = {}, cr$K = function(a, b, c, d, e) {
        if ("array" == cr$b(b)) {
            for (var f = 0; f < b.length; f++) cr$K(a, b[f], c, d, e);
            return null
        }
        c = cr$pb(c);
        if (a && a[cr$H]) f = c, cr$qb(a), a = a.s.add(b, f, !1, d, e);
        else {
            if (!b) throw Error("Invalid event type");
            var f = !! d,
                g = a[cr$d] || (a[cr$d] = ++cr$ea),
                h = cr$ob[g];
            h || (cr$ob[g] = h = new cr$I(a));
            d = h.add(b, c, !1, d, e);
            d.qa || (e = cr$rb(), d.qa = e, e.src = a, e.M = d, a.addEventListener ? a.addEventListener(b, e, f) : a.attachEvent(b in cr$J ? cr$J[b] : cr$J[b] = "on" + b, e), cr$nb[d.key] = d);
            a = d
        }
        return a
    }, cr$rb = function() {
        var a = cr$sb,
            b = cr$gb ? function(c) {
                return a.call(b.src, b.M, c)
            } : function(c) {
                c = a.call(b.src, b.M, c);
                if (!c) return c
            };
        return b
    }, cr$tb = function(a, b, c, d, e) {
        if ("array" == cr$b(b)) for (var f = 0; f < b.length; f++) cr$tb(a, b[f], c, d, e);
        else c = cr$pb(c), a && a[cr$H] ? a.s.remove(b, c, d, e) : a && (d = !! d, (a = cr$ub(a)) && (b = a.Qa(b, c, d, e)) && cr$vb(b))
    }, cr$vb = function(a) {
        if ("number" != typeof a && a && !a.W) {
            var b = a.src;
            if (b && b[cr$H]) cr$mb(b.s, a);
            else {
                var c = a.type,
                    d = a.qa;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(c in cr$J ? cr$J[c] : cr$J[c] = "on" + c, d);
                (c = cr$ub(b)) ? (cr$mb(c, a), 0 == c.ba && (c.src = null, delete cr$ob[b[cr$d] || (b[cr$d] = ++cr$ea)])) : cr$kb(a);
                delete cr$nb[a.key]
            }
        }
    }, cr$wb = function(a) {
        if (a && a[cr$H]) return a.ua(void 0, void 0);
        a = cr$ub(a);
        return !!a && a.ua(void 0, void 0)
    }, cr$yb = function(a, b, c, d) {
        var e = 1;
        if (a = cr$ub(a)) if (b = a.k[b]) for (b = cr$ta(b), a = 0; a < b.length; a++) {
            var f = b[a];
            f && (f.capture == c && !f.W) && (e &= !1 !== cr$xb(f, d))
        }
        return Boolean(e)
    }, cr$xb = function(a, b) {
        var c = a.M,
            d = a.oa || a.src;
        a.ma && cr$vb(a);
        return c.call(d, b)
    }, cr$sb = function(a, b) {
        if (a.W) return !0;
        if (!cr$gb) {
            var c = b || cr$aa("window.event"),
                d = new cr$G(c, this),
                e = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                t: {
                    var f = !1;
                    if (0 == c.keyCode) try {
                        c.keyCode = -1;
                        break t
                    } catch (g) {
                        f = !0
                    }
                    if (f || void 0 == c.returnValue) c.returnValue = !0
                }
                c = [];
                for (f = d.currentTarget; f; f = f.parentNode) c.push(f);
                for (var f = a.type, h = c.length - 1; !d.O && 0 <= h; h--) d.currentTarget = c[h], e &= cr$yb(c[h], f, !0, d);
                for (h = 0; !d.O && h < c.length; h++) d.currentTarget = c[h], e &= cr$yb(c[h], f, !1, d)
            }
            return e
        }
        return cr$xb(a,
            new cr$G(b, this))
    }, cr$ub = function(a) {
        return a[cr$d] ? cr$ob[a[cr$d] || (a[cr$d] = ++cr$ea)] || null : null
    }, cr$zb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    cr$pb = function(a) {
        cr$k(a, "Listener can not be null.");
        if ("function" == cr$b(a)) return a;
        cr$k(a.handleEvent, "An object listener must have handleEvent method.");
        return a[cr$zb] || (a[cr$zb] = function(b) {
            return a.handleEvent(b)
        })
    };
var cr$Ab = function(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
            return eval("(" + a + ")")
        } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }, cr$Db = function(a) {
        var b = [];
        cr$Bb(new cr$Cb, a, b);
        return b.join("")
    }, cr$Cb = function() {
        this.va = void 0
    }, cr$Bb = function(a, b, c) {
        switch (typeof b) {
            case "string":
                cr$Eb(b,
                    c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if ("array" == cr$b(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++) c.push(e), e = b[f], cr$Bb(a, a.va ? a.va.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b) Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), cr$Eb(f, c), c.push(":"), cr$Bb(a, a.va ? a.va.call(b,
                    f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }, cr$Fb = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }, cr$Gb = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
    cr$Eb = function(a, b) {
        b.push('"', a.replace(cr$Gb, function(a) {
            if (a in cr$Fb) return cr$Fb[a];
            var b = a.charCodeAt(0),
                e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return cr$Fb[a] = e + b.toString(16)
        }), '"')
    };
var cr$L = function() {
    this.s = new cr$I(this);
    this.Sb = this
};
cr$h(cr$L, cr$cb);
cr$L.prototype[cr$H] = !0;
cr$ = cr$L.prototype;
cr$.ha = null;
cr$.addEventListener = function(a, b, c, d) {
    cr$K(this, a, b, c, d)
};
cr$.removeEventListener = function(a, b, c, d) {
    cr$tb(this, a, b, c, d)
};
cr$.dispatchEvent = function(a) {
    cr$qb(this);
    var b, c = this.ha;
    if (c) {
        b = [];
        for (var d = 1; c; c = c.ha) b.push(c), cr$k(1E3 > ++d, "infinite loop")
    }
    c = this.Sb;
    d = a.type || a;
    if (cr$c(a)) a = new cr$F(a, c);
    else if (a instanceof cr$F) a.target = a.target || c;
    else {
        var e = a;
        a = new cr$F(d, c);
        cr$Ca(a, e)
    }
    var e = !0,
        f;
    if (b) for (var g = b.length - 1; !a.O && 0 <= g; g--) f = a.currentTarget = b[g], e = cr$Hb(f, d, !0, a) && e;
    a.O || (f = a.currentTarget = c, e = cr$Hb(f, d, !0, a) && e, a.O || (e = cr$Hb(f, d, !1, a) && e));
    if (b) for (g = 0; !a.O && g < b.length; g++) f = a.currentTarget = b[g], e = cr$Hb(f,
        d, !1, a) && e;
    return e
};
cr$.d = function() {
    cr$L.h.d.call(this);
    if (this.s) {
        var a = this.s,
            b = 0,
            c;
        for (c in a.k) {
            for (var d = a.k[c], e = 0; e < d.length; e++)++b, cr$kb(d[e]);
            delete a.k[c];
            a.ba--
        }
    }
    this.ha = null
};
var cr$Hb = function(a, b, c, d) {
    b = a.s.k[b];
    if (!b) return !0;
    b = cr$ta(b);
    for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g && !g.W && g.capture == c) {
            var h = g.M,
                m = g.oa || g.src;
            g.ma && cr$mb(a.s, g);
            e = !1 !== h.call(m, d) && e
        }
    }
    return e && !1 != d.jb
};
cr$L.prototype.Qa = function(a, b, c, d) {
    return this.s.Qa(a, b, c, d)
};
cr$L.prototype.ua = function(a, b) {
    return this.s.ua(a, b)
};
var cr$qb = function(a) {
    cr$k(a.s, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
var cr$M = function(a, b) {
    a && a.info(b, void 0)
};
var cr$Ib = function(a, b) {
    cr$L.call(this);
    this.sa = a || 1;
    this.X = b || cr$a;
    this.Na = cr$e(this.Ub, this);
    this.Oa = cr$f()
};
cr$h(cr$Ib, cr$L);
cr$ = cr$Ib.prototype;
cr$.enabled = !1;
cr$.w = null;
cr$.Ub = function() {
    if (this.enabled) {
        var a = cr$f() - this.Oa;
        0 < a && a < 0.8 * this.sa ? this.w = this.X.setTimeout(this.Na, this.sa - a) : (this.w && (this.X.clearTimeout(this.w), this.w = null), this.dispatchEvent("tick"), this.enabled && (this.w = this.X.setTimeout(this.Na, this.sa), this.Oa = cr$f()))
    }
};
cr$.start = function() {
    this.enabled = !0;
    this.w || (this.w = this.X.setTimeout(this.Na, this.sa), this.Oa = cr$f())
};
cr$.stop = function() {
    this.enabled = !1;
    this.w && (this.X.clearTimeout(this.w), this.w = null)
};
cr$.d = function() {
    cr$Ib.h.d.call(this);
    this.stop();
    delete this.X
};
var cr$Jb = function(a, b, c) {
    if ("function" == cr$b(a)) c && (a = cr$e(a, c));
    else if (a && "function" == typeof a.handleEvent) a = cr$e(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < b ? -1 : cr$a.setTimeout(a, b || 0)
};
var cr$N = function(a, b) {
    cr$L.call(this);
    this.xb = void 0 !== a ? a : !0;
    this.Ha = b || cr$Kb;
    this.la = this.Ha(this.ca)
};
cr$h(cr$N, cr$L);
cr$ = cr$N.prototype;
cr$.o = null;
cr$.m = null;
cr$.S = void 0;
cr$.Ia = !1;
cr$.ca = 0;
var cr$Lb = cr$N.prototype,
    cr$Mb = cr$E("goog.net.WebSocket");
cr$Lb.g = cr$Mb;
var cr$O = {
    CLOSED: "a",
    ERROR: "b",
    MESSAGE: "c",
    ic: "d"
}, cr$Nb = {
    CONNECTING: 0,
    OPEN: 1,
    hc: 2,
    CLOSED: 3
}, cr$Kb = function(a) {
    return Math.min(1E3 * Math.pow(2, a), 6E4)
};
cr$N.prototype.open = function(a, b) {
    cr$k(cr$a.WebSocket, "This browser does not support WebSocket");
    cr$k(!this.isOpen(), "The WebSocket is already open");
    null != this.R && cr$a.clearTimeout(this.R);
    this.R = null;
    this.m = a;
    (this.S = b) ? (cr$M(this.g, "Opening the WebSocket on " + this.m + " with protocol " + this.S), this.o = new WebSocket(this.m, this.S)) : (cr$M(this.g, "Opening the WebSocket on " + this.m), this.o = new WebSocket(this.m));
    this.o.onopen = cr$e(this.Cb, this);
    this.o.onclose = cr$e(this.Ab, this);
    this.o.onmessage = cr$e(this.xa,
        this);
    this.o.onerror = cr$e(this.Bb, this)
};
cr$N.prototype.close = function() {
    null != this.R && cr$a.clearTimeout(this.R);
    this.R = null;
    this.o && (cr$M(this.g, "Closing the WebSocket."), this.Ia = !0, this.o.close(), this.o = null)
};
cr$N.prototype.send = function(a) {
    cr$k(this.isOpen(), "Cannot send without an open socket");
    this.o.send(a)
};
cr$N.prototype.isOpen = function() {
    return !!this.o && this.o.readyState == cr$Nb.OPEN
};
cr$ = cr$N.prototype;
cr$.Cb = function() {
    cr$M(this.g, "WebSocket opened on " + this.m);
    this.dispatchEvent("d");
    this.ca = 0;
    this.la = this.Ha(this.ca)
};
cr$.Ab = function(a) {
    cr$M(this.g, "The WebSocket on " + this.m + " closed.");
    this.dispatchEvent(cr$O.CLOSED);
    this.o = null;
    if (this.Ia) cr$M(this.g, "The WebSocket closed normally."), this.m = null, this.S = void 0;
    else {
        var b = this.g;
        b && cr$A(b, "The WebSocket disconnected unexpectedly: " + a.data, void 0);
        this.xb && (cr$M(this.g, "Seconds until next reconnect attempt: " + Math.floor(this.la / 1E3)), this.R = cr$Jb(cr$e(this.open, this, this.m, this.S), this.la, this), this.ca++, this.la = this.Ha(this.ca))
    }
    this.Ia = !1
};
cr$.xa = function(a) {
    this.dispatchEvent(new cr$Ob(a.data))
};
cr$.Bb = function(a) {
    a = a.data;
    var b = this.g;
    b && cr$A(b, "An error occurred: " + a, void 0);
    this.dispatchEvent(new cr$Pb(a))
};
cr$.d = function() {
    cr$N.h.d.call(this);
    this.close()
};
var cr$Ob = function(a) {
    cr$F.call(this, cr$O.MESSAGE);
    this.message = a
};
cr$h(cr$Ob, cr$F);
var cr$Pb = function(a) {
    cr$F.call(this, cr$O.ERROR);
    this.data = a
};
cr$h(cr$Pb, cr$F);
cr$g("cast.receiver.VERSION", "1.0");
var cr$Qb = cr$E("cast");
cr$g("cast.receiver.logger", cr$Qb);
cr$Qb.ec = function(a) {
    cr$Qb.Sa(cr$9a(a))
};
cr$Qb.setLevelValue = cr$Qb.ec;
var cr$Rb = function(a, b, c) {
    cr$F.call(this, a, c);
    this.message = b
};
cr$h(cr$Rb, cr$F);
cr$g("cast.receiver.MessageEvent", cr$Rb);
var cr$P = function(a, b) {
    for (var c = 1; c < arguments.length; ++c) if (!(arguments[c] in a)) throw Error("Mandatory field missing: " + arguments[c]);
};
var cr$Sb = function(a, b, c) {
    cr$F.call(this, a, c);
    this.channel = b
};
cr$h(cr$Sb, cr$F);
cr$g("cast.receiver.ChannelFactoryEvent", cr$Sb);
var cr$Q = function() {
    cr$L.call(this)
};
cr$h(cr$Q, cr$L);
cr$g("cast.receiver.ChannelFactory", cr$Q);
var cr$Tb = {
    CHANNEL_CREATED: "e"
};
cr$Q.EventType = cr$Tb;
cr$Q.prototype.a = cr$E("cast.receiver.ChannelFactory");
cr$Q.prototype.c = function() {
    return "unknown"
};
cr$Q.prototype.getDebugString = cr$Q.prototype.c;
cr$Q.prototype.Ga = function(a) {
    cr$B(this.a, "Dispatch CHANNEL_CREATED event to " + this.c());
    this.dispatchEvent(new cr$Sb(cr$Tb.CHANNEL_CREATED, a, this))
};
cr$Q.prototype.onChannelCreated = cr$Q.prototype.Ga;
cr$Q.prototype.d = function() {
    cr$Q.h.d.call(this);
    cr$B(this.a, "Disposed " + this.c())
};
var cr$R = function() {
    cr$L.call(this)
};
cr$h(cr$R, cr$L);
cr$g("cast.receiver.Channel", cr$R);
var cr$S = {
    OPEN: "f",
    CLOSED: "g",
    ERROR: "h",
    MESSAGE: "i"
};
cr$R.EventType = cr$S;
cr$R.prototype.a = cr$E("cast.receiver.Channel");
cr$R.prototype.c = function() {
    return "unknown"
};
cr$R.prototype.getDebugString = cr$R.prototype.c;
cr$R.prototype.onOpen = function() {
    this.a.info("Dispatch OPEN event to " + this.c());
    this.dispatchEvent(cr$S.OPEN)
};
cr$R.prototype.onOpen = cr$R.prototype.onOpen;
cr$R.prototype.onClosed = function() {
    this.a.info("Dispatch CLOSED event to " + this.c());
    this.dispatchEvent(cr$S.CLOSED)
};
cr$R.prototype.onClosed = cr$R.prototype.onClosed;
cr$R.prototype.onError = function() {
    cr$A(this.a, "Dispatch ERROR event to " + this.c());
    this.dispatchEvent(cr$S.ERROR)
};
cr$R.prototype.onError = cr$R.prototype.onError;
cr$R.prototype.onMessage = function(a) {
    cr$C(this.a, "Dispatch MESSAGE event to " + this.c() + ", message=" + a);
    this.dispatchEvent(new cr$Rb(cr$S.MESSAGE, a, this))
};
cr$R.prototype.onMessage = cr$R.prototype.onMessage;
cr$R.prototype.open = cr$ba;
cr$R.prototype.close = cr$ba;
cr$R.prototype.isOpen = function() {
    return !1
};
cr$R.prototype.send = cr$ba;
cr$R.prototype.d = function() {
    cr$R.h.d.call(this);
    cr$B(this.a, "Disposed " + this.c())
};
var cr$T = function(a) {
    cr$L.call(this);
    this.Vb = a;
    this.G = [];
    this.F = []
};
cr$h(cr$T, cr$L);
cr$g("cast.receiver.ChannelHandler", cr$T);
cr$T.prototype.a = cr$E("cast.receiver.ChannelHandler");
cr$T.prototype.c = function() {
    return this.Vb
};
cr$T.prototype.getDebugString = cr$T.prototype.c;
var cr$Ub = function(a, b) {
    for (var c = a.G.length, d = 0; d < c; ++d) if (a.G[d][0] == b) return d;
    return -1
};
cr$T.prototype.kb = function(a) {
    if (0 <= cr$Ub(this, a)) return !1;
    this.G.push([a, cr$K(a, cr$Tb.CHANNEL_CREATED, this.vb, !1, this)]);
    this.a.info("New channel factory added: " + a.c() + " to " + this.c());
    return !0
};
cr$T.prototype.addChannelFactory = cr$T.prototype.kb;
cr$T.prototype.dc = function(a) {
    var b = cr$Ub(this, a);
    if (0 > b) return !1;
    cr$vb(this.G[b][1]);
    this.G.splice(b, 1);
    this.a.info("Channel factory removed: " + a.c() + " from " + this.c());
    return !0
};
cr$T.prototype.removeChannelFactory = cr$T.prototype.dc;
cr$T.prototype.vb = function(a) {
    var b = a.channel;
    if (!b) throw Error("Channel is not specified on event: " + a.type);
    0 <= this.F.indexOf(b) ? cr$A(this.a, "Duplicated channel: " + b.c() + " in " + this.c()) : (this.F.push(b), b.ha = this, cr$K(b, cr$S.OPEN, this.onOpen, !1, this), cr$K(b, cr$S.CLOSED, this.onClosed, !1, this), cr$K(b, cr$S.ERROR, this.onError, !1, this), cr$K(b, cr$S.MESSAGE, this.onMessage, !1, this), this.a.info("New channel added: " + b.c() + " to " + this.c()), b.open())
};
cr$T.prototype.onOpen = function(a) {
    cr$B(this.a, "Channel open: " + a.target.c() + " in " + this.c())
};
cr$T.prototype.onClosed = function(a) {
    var b = a.target;
    a = this.F.indexOf(b);
    0 <= a && (this.F.splice(a, 1), this.a.info("Channel removed: " + b.c() + " from " + this.c()), cr$Jb(function() {
        b.p()
    }, 0))
};
cr$T.prototype.onError = function(a) {
    a = a.target;
    cr$A(this.a, "Channel error: " + a.c() + " in " + this.c());
    a.close()
};
cr$T.prototype.onMessage = function(a) {
    cr$C(this.a, "Message received: " + a.target.c() + " in " + this.c() + ", message=" + a.message)
};
cr$T.prototype.na = function() {
    return this.F
};
cr$T.prototype.getChannels = cr$T.prototype.na;
cr$T.prototype.d = function() {
    cr$T.h.d.call(this);
    for (var a = this.G.length, b = 0; b < a; ++b) this.G[b][0].p();
    this.G = [];
    a = this.F.length;
    for (b = 0; b < a; ++b) this.F[b].p();
    this.F = [];
    cr$B(this.a, "Disposed " + this.c())
};
var cr$U = function(a) {
    cr$L.call(this);
    this.m = a;
    this.e = new cr$N(!1);
    this.Fa = !1
};
cr$h(cr$U, cr$R);
cr$U.prototype.a = cr$E("cast.receiver.ChannelOverWebSocket");
cr$U.prototype.c = function() {
    return this.m
};
cr$U.prototype.wb = function() {
    this.Fa = !1;
    this.onClosed()
};
cr$U.prototype.Ba = function(a) {
    this.onMessage(a.message)
};
cr$U.prototype.open = function() {
    this.Fa || (this.Fa = !0, this.a.info("Open websocket: url=" + this.m), cr$K(this.e, "d", this.onOpen, !1, this), cr$K(this.e, cr$O.CLOSED, this.wb, !1, this), cr$K(this.e, cr$O.ERROR, this.onError, !1, this), cr$K(this.e, cr$O.MESSAGE, this.Ba, !1, this), this.e.open(this.m))
};
cr$U.prototype.close = function() {
    this.a.info("Close websocket: url=" + this.m);
    this.e.close()
};
cr$U.prototype.isOpen = function() {
    return this.e.isOpen()
};
cr$U.prototype.send = function(a) {
    if ("string" != typeof a) throw Error("Invalid message to send via " + this.c());
    cr$C(this.a, "Sending message: " + a + " from " + this.c());
    this.e.send(a)
};
cr$U.prototype.d = function() {
    cr$U.h.d.call(this);
    this.e.p()
};
var cr$V = function(a) {
    cr$L.call(this);
    this.i = a;
    this.ka = !0;
    this.V = [];
    this.V.push(cr$K(this.i, cr$S.OPEN, this.onOpen, !1, this));
    this.V.push(cr$K(this.i, cr$S.CLOSED, this.onClosed, !1, this));
    this.V.push(cr$K(this.i, cr$S.ERROR, this.onError, !1, this));
    this.V.push(cr$K(this.i, cr$S.MESSAGE, this.Ba, !1, this))
};
cr$h(cr$V, cr$R);
cr$V.prototype.c = function() {
    return this.i.c()
};
cr$V.prototype.Ba = function(a) {
    this.onMessage(a.message)
};
cr$V.prototype.open = function() {
    this.ka = !1;
    if (this.i.isOpen()) this.onOpen();
    else this.i.open()
};
cr$V.prototype.close = function() {
    this.ka = !0;
    this.onClosed()
};
cr$V.prototype.isOpen = function() {
    return this.i.isOpen() && !this.ka
};
cr$V.prototype.send = function(a) {
    this.i.send(a)
};
cr$V.prototype.d = function() {
    cr$V.h.d.call(this);
    this.ka = !0;
    for (var a = this.V.length, b = 0; b < a; ++b) cr$vb(this.V[b]);
    cr$wb(this.i) || (this.i.close(), this.i.p())
};
var cr$Vb = function(a) {
    cr$V.call(this, a);
    this.bb = 0
};
cr$h(cr$Vb, cr$V);
cr$Vb.prototype.onMessage = function(a) {
    a instanceof Array && 2 == a.length && "cm" == a[0] ? "pong" == a[1].type ? this.bb = 0 : this.a.info("Unknown cm message: " + a[1]) : cr$Vb.h.onMessage.call(this, a)
};
var cr$W = function(a) {
    cr$V.call(this, a)
};
cr$h(cr$W, cr$V);
cr$W.prototype.onMessage = function(a) {
    try {
        cr$W.h.onMessage.call(this, cr$Ab(a))
    } catch (b) {
        cr$A(this.a, b), this.onError()
    }
};
cr$W.prototype.send = function(a) {
    cr$W.h.send.call(this, cr$Db(a))
};
var cr$X = function(a, b, c, d) {
    cr$L.call(this);
    this.ja = a;
    this.Da = b;
    this.Ca = null != d ? d : 0;
    this.Za = c || null;
    this.e = new cr$N(!1);
    this.pa = new cr$T("heartbeatChannelHandler");
    cr$db(this, cr$ha(cr$eb, this.pa));
    this.pa.kb(this);
    this.ia = new cr$Ib(1E3 * this.Ca);
    cr$db(this, cr$ha(cr$eb, this.ia));
    cr$K(this.ia, "tick", this.Gb, !1, this)
};
cr$h(cr$X, cr$Q);
cr$g("cast.receiver.ConnectionService", cr$X);
cr$X.VERSION = 2;
cr$X.prototype.a = cr$E("cast.receiver.ConnectionService");
cr$X.prototype.c = function() {
    return this.ja
};
cr$X.prototype.tb = function(a) {
    return 0 <= this.Da.indexOf(a)
};
cr$X.prototype.support = cr$X.prototype.tb;
cr$X.prototype.onClosed = function(a) {
    this.a.info("Got event: " + a.type)
};
cr$X.prototype.onError = function(a) {
    cr$A(this.a, "Got event: " + a.type);
    this.disconnect()
};
cr$X.prototype.zb = function(a) {
    this.a.info("Got event: " + a.type);
    cr$B(this.a, "Register: app=" + this.ja + ", protocols=" + this.Da + ", appContext=" + this.Za);
    this.e.send(cr$Db({
        type: "REGISTER",
        version: 2,
        name: this.ja,
        protocols: this.Da,
        pingInterval: this.Ca,
        eventChannel: 0,
        appContext: this.Za
    }))
};
cr$X.prototype.onChannelRequest = void 0;
cr$X.prototype.xa = function(a) {
    cr$C(this.a, "Got event: type=" + a.type + ", message=" + a.message);
    try {
        var b = cr$Ab(a.message);
        cr$P(b, "type");
        if ("ERROR" == b.type) this.onError(new cr$F(cr$O.ERROR, this));
        else if ("CHANNELREQUEST" == b.type) if (cr$P(b, "requestId"), cr$B(this.a, "Got CHANNELREQUEST: requestId=" + b.requestId), !this.onChannelRequest || this.onChannelRequest(this.ja, b.senderId)) {
            var c = b.requestId;
            cr$B(this.a, "Accept: requiestId=" + c);
            this.e.send(cr$Db({
                type: "CHANNELRESPONSE",
                requestId: c,
                action: 0
            }))
        } else {
            var d = b.requestId;
            cr$B(this.a, "Reject: requiestId=" + d);
            this.e.send(cr$Db({
                type: "CHANNELRESPONSE",
                requestId: d,
                action: 1
            }))
        } else if ("NEWCHANNEL" == b.type) {
            cr$P(b, "requestId", "URL");
            cr$B(this.a, "Got NEWCHANNEL: requestId=" + b.requestId + ", URL=" + b.URL);
            var e = new cr$Vb(new cr$W(new cr$U(b.URL)));
            this.Ga(e);
            0 < this.Ca && this.ia.start()
        } else throw Error("Unknown message type: " + b.type);
    } catch (f) {
        f instanceof SyntaxError ? cr$A(this.a, "Invalid JSON error: message=" + a.message) : cr$A(this.a, f), cr$C(this.a, "Disconnect on any type of error."),
            this.disconnect()
    }
};
cr$X.prototype.pb = function(a) {
    a = a || "ws://localhost:8008/connection";
    this.a.info("Open connection service websocket: url=" + a);
    cr$K(this.e, "d", this.zb, !1, this);
    cr$K(this.e, cr$O.CLOSED, this.onClosed, !1, this);
    cr$K(this.e, cr$O.ERROR, this.onError, !1, this);
    cr$K(this.e, cr$O.MESSAGE, this.xa, !1, this);
    this.e.open(a)
};
cr$X.prototype.connect = cr$X.prototype.pb;
cr$X.prototype.disconnect = function() {
    this.a.info("Close connection service websocket");
    this.e.close()
};
cr$X.prototype.disconnect = cr$X.prototype.disconnect;
cr$X.prototype.bc = function() {
    return this.e.isOpen()
};
cr$X.prototype.isConnected = cr$X.prototype.bc;
cr$X.prototype.Gb = function() {
    var a = [];
    this.pa.na().forEach(function(b) {
        var c;
        b.isOpen() ? 2 < ++b.bb ? c = !1 : (b.send(["cm", {
            type: "ping"
        }]), c = !0) : c = !0;
        c || a.push(b)
    });
    a.forEach(function(a) {
        a.close();
        a.onClosed()
    });
    0 == this.pa.na().length && this.ia.stop()
};
cr$X.prototype.d = function() {
    cr$X.h.d.call(this);
    this.e.p()
};
var cr$Y = function(a) {
    cr$L.call(this);
    this.I = this.J = null;
    this.Kb = 1;
    this.Ea = 0;
    this.n = new cr$W(new cr$U(a || "ws://localhost:8008/system/control"));
    cr$K(this.n, cr$S.OPEN, this.Ob, !1, this);
    cr$K(this.n, cr$S.CLOSED, this.Lb, !1, this);
    cr$K(this.n, cr$S.ERROR, this.Mb, !1, this);
    cr$K(this.n, cr$S.MESSAGE, this.Nb, !1, this)
};
cr$h(cr$Y, cr$L);
var cr$Wb = {
    VOLUME_CHANGED: "j"
};
cr$g("cast.receiver.Platform.EventType", cr$Wb);
cr$Y.prototype.g = cr$E("cast.receiver.Platform");
cr$Y.prototype.isReady = function() {
    return this.n.isOpen() && null != this.J && null != this.I
};
cr$Y.prototype.open = function() {
    this.n.open()
};
var cr$Xb = function(a) {
    if (a.n.isOpen()) a.n.close();
    else if (5 > a.Ea) {
        var b = Math.pow(2, a.Ea++) - 1;
        cr$Jb(a.open, 1E3 * b, a)
    } else cr$A(a.g, "This device doesn't support the platform API.")
};
cr$Y.prototype.Ob = function() {
    this.g.info("Platform channel is open: " + this.n.c());
    this.Ea = 0;
    cr$Z(this, "GET_VOLUME", {});
    cr$Z(this, "GET_MUTED", {})
};
cr$Y.prototype.Lb = function() {
    this.g.info("Platform channel is closed: " + this.n.c());
    cr$Xb(this)
};
cr$Y.prototype.Mb = function() {
    cr$A(this.g, "Platform channel has an error: " + this.n.c());
    cr$Xb(this)
};
cr$Y.prototype.Nb = function(a) {
    cr$C(this.g, "Platform channel has a message: " + this.n.c());
    a = a.message;
    try {
        switch (a.request_type) {
            case "GET_VOLUME":
                cr$P(a, "level");
                a.success && this.J != a.level && (this.J = a.level, cr$Yb(this));
                break;
            case "GET_MUTED":
                cr$P(a, "muted");
                a.success && this.I != a.muted && (this.I = a.muted, cr$Yb(this));
                break;
            case "VOLUME_CHANGED":
                cr$Z(this, "GET_VOLUME", {}), cr$Z(this, "GET_MUTED", {})
        }
    } catch (b) {
        cr$A(this.g, b), cr$Xb(this)
    }
};
var cr$Yb = function(a) {
    cr$B(a.g, "Volume changed event: volume=" + a.J + ", muted=" + a.I);
    a.dispatchEvent(new cr$F(cr$Wb.VOLUME_CHANGED))
}, cr$Z = function(a, b, c) {
    c.cmd_id = a.Kb++;
    c.type = b;
    a.n.send(c)
};
cr$Y.prototype.getVolume = function() {
    return this.J
};
cr$Y.prototype.setVolume = function(a) {
    cr$Z(this, "SET_VOLUME", {
        level: a
    });
    this.J != a && (this.J = a, cr$Yb(this))
};
cr$Y.prototype.getMuted = function() {
    return this.I
};
cr$Y.prototype.setMuted = function(a) {
    cr$Z(this, "SET_MUTED", {
        muted: a
    });
    this.I != a && (this.I = a, cr$Yb(this))
};
cr$Y.prototype.d = function() {
    cr$Y.h.d.call(this);
    this.n.p()
};
var cr$_ = new cr$Y;
cr$g("cast.receiver.platform", cr$_);
cr$_.open();
var cr$Zb = function() {
    this.ub = cr$f()
}, cr$_b = new cr$Zb;
cr$Zb.prototype.set = function(a) {
    this.ub = a
};
cr$Zb.prototype.reset = function() {
    this.set(cr$f())
};
cr$Zb.prototype.get = function() {
    return this.ub
};
var cr$0b = function(a) {
    this.Eb = a || "";
    this.Fb = cr$_b
};
cr$ = cr$0b.prototype;
cr$.hb = !0;
cr$.Ib = !0;
cr$.Hb = !0;
cr$.ib = !1;
cr$.Jb = !1;
var cr$0 = function(a) {
    return 10 > a ? "0" + a : String(a)
}, cr$1b = function(a, b) {
    var c = (a.fb - b) / 1E3,
        d = c.toFixed(3),
        e = 0;
    if (1 > c) e = 2;
    else for (; 100 > c;) e++, c *= 10;
    for (; 0 < e--;) d = " " + d;
    return d
}, cr$2b = function(a) {
    cr$0b.call(this, a)
};
cr$h(cr$2b, cr$0b);
var cr$3b = function() {
    this.Pb = cr$e(this.Tb, this);
    this.La = new cr$2b;
    this.La.hb = !1;
    this.nb = this.La.ib = !1;
    this.gb = "";
    this.Db = {}
};
cr$3b.prototype.Tb = function(a) {
    if (!this.Db[a.eb]) {
        var b;
        b = this.La;
        var c = [];
        c.push(b.Eb, " ");
        if (b.hb) {
            var d = new Date(a.fb);
            c.push("[", cr$0(d.getFullYear() - 2E3) + cr$0(d.getMonth() + 1) + cr$0(d.getDate()) + " " + cr$0(d.getHours()) + ":" + cr$0(d.getMinutes()) + ":" + cr$0(d.getSeconds()) + "." + cr$0(Math.floor(d.getMilliseconds() / 10)), "] ")
        }
        b.Ib && c.push("[", cr$1b(a, b.Fb.get()), "s] ");
        b.Hb && c.push("[", a.eb, "] ");
        b.Jb && c.push("[", a.Ma().name, "] ");
        c.push(a.cb, "\n");
        b.ib && a.Ka && c.push(a.Ja, "\n");
        b = c.join("");
        if (c = cr$4b) switch (a.Ma()) {
            case cr$1a:
                cr$5b(c, "info", b);
                break;
            case cr$2a:
                cr$5b(c, "error", b);
                break;
            case cr$3a:
                cr$5b(c, "warn", b);
                break;
            default:
                cr$5b(c, "debug", b)
        } else window.opera ? window.opera.postError(b) : this.gb += b
    }
};
var cr$4b = window.console,
    cr$5b = function(a, b, c) {
        if (a[b]) a[b](c);
        else a.log(c)
    };
var cr$1 = function(a, b) {
    cr$V.call(this, b);
    this.T = a
};
cr$h(cr$1, cr$V);
cr$1.prototype.c = function() {
    return this.T + ":" + this.i.c()
};
cr$1.prototype.onMessage = function(a) {
    a instanceof Array && (2 == a.length && a[0] == this.T) && cr$1.h.onMessage.call(this, a[1])
};
cr$1.prototype.send = function(a) {
    cr$1.h.send.call(this, [this.T, a])
};
var cr$2 = function(a, b) {
    cr$L.call(this);
    this.T = a;
    this.i = b;
    this.yb = cr$K(this.i, cr$Tb.CHANNEL_CREATED, this.Rb, !1, this)
};
cr$h(cr$2, cr$Q);
cr$2.prototype.c = function() {
    return this.T + ":" + this.i.c()
};
cr$2.prototype.Rb = function(a) {
    a.channel && this.Ga(new cr$1(this.T, a.channel))
};
cr$2.prototype.d = function() {
    cr$2.h.d.call(this);
    cr$vb(this.yb);
    cr$wb(this.i) || this.i.p()
};
var cr$3 = function(a, b, c, d) {
    if (this.rb = new cr$3b) {
        var e = this.rb;
        if (!0 != e.nb) {
            cr$bb();
            var f = cr$D,
                g = e.Pb;
            f.fa || (f.fa = []);
            f.fa.push(g);
            e.nb = !0
        }
    }
    this.ea = new cr$X(a, b, c, d)
};
cr$g("cast.receiver.Receiver", cr$3);
cr$3.prototype.g = cr$E("cast.receiver.Receiver");
cr$3.prototype.ac = function() {
    return this.ea
};
cr$3.prototype.getConnectionService = cr$3.prototype.ac;
cr$3.prototype.$b = function(a) {
    if (this.ea.tb(a)) return new cr$2(a, this.ea);
    throw Error("Not supported namespace: " + a);
};
cr$3.prototype.createChannelFactory = cr$3.prototype.$b;
cr$3.prototype.start = function(a) {
    this.ea.pb(a);
    this.g.info("Receiver started.")
};
cr$3.prototype.start = cr$3.prototype.start;
cr$3.prototype.stop = function() {
    this.ea.p();
    this.g.info("Receiver stopped.")
};
cr$3.prototype.stop = cr$3.prototype.stop;
var cr$6b = !cr$q || cr$q && 9 <= cr$Xa;
!cr$r && !cr$q || cr$q && cr$q && 9 <= cr$Xa || cr$r && cr$u("1.9.1");
cr$q && cr$u("9");
var cr$7b = function(a, b) {
    var c;
    c = a.className;
    c = cr$c(c) && c.match(/\S+/g) || [];
    for (var d = cr$ua(arguments, 1), e = c.length + d.length, f = c, g = 0; g < d.length; g++) 0 <= cr$qa(f, d[g]) || f.push(d[g]);
    a.className = c.join(" ");
    return c.length == e
};
var cr$8b = function(a) {
    var b = document;
    a = a && "*" != a ? a.toUpperCase() : "";
    return b.querySelectorAll && b.querySelector && a ? b.querySelectorAll(a + "") : b.getElementsByTagName(a || "*")
}, cr$$b = function(a, b) {
    cr$xa(b, function(b, d) {
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in cr$9b ? a.setAttribute(cr$9b[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
    })
}, cr$9b = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
}, cr$bc = function(a, b, c) {
    var d = arguments,
        e = document,
        f = d[0],
        g = d[1];
    if (!cr$6b && g && (g.name || g.type)) {
        f = ["<", f];
        g.name && f.push(' name="', cr$j(g.name), '"');
        if (g.type) {
            f.push(' type="', cr$j(g.type), '"');
            var h = {};
            cr$Ca(h, g);
            delete h.type;
            g = h
        }
        f.push(">");
        f = f.join("")
    }
    f = e.createElement(f);
    g && (cr$c(g) ? f.className = g : "array" == cr$b(g) ? cr$7b.apply(null, [f].concat(g)) : cr$$b(f, g));
    2 < d.length && cr$ac(e, f, d);
    return f
}, cr$ac = function(a, b, c) {
    function d(c) {
        c && b.appendChild(cr$c(c) ? a.createTextNode(c) : c)
    }
    for (var e = 2; e < c.length; e++) {
        var f = c[e];
        !cr$ca(f) || cr$da(f) && 0 < f.nodeType ? d(f) : cr$ra(cr$cc(f) ? cr$ta(f) : f, d)
    }
}, cr$cc = function(a) {
    if (a && "number" == typeof a.length) {
        if (cr$da(a)) return "function" == typeof a.item || "string" == typeof a.item;
        if ("function" == cr$b(a)) return "function" == typeof a.item
    }
    return !1
};
var cr$dc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
    cr$fc = function(a) {
        if (cr$ec) {
            cr$ec = !1;
            var b = cr$a.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = cr$fc(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) throw cr$ec = !0, Error();
            }
        }
        return a.match(cr$dc)
    }, cr$ec = cr$s;
var cr$4 = function(a, b) {
    var c;
    if (a instanceof cr$4) this.q = void 0 !== b ? b : a.q, cr$gc(this, a.H), c = a.L, cr$5(this), this.L = c, c = a.C, cr$5(this), this.C = c, cr$hc(this, a.U), c = a.u, cr$5(this), this.u = c, cr$ic(this, a.t.$()), c = a.K, cr$5(this), this.K = c;
    else if (a && (c = cr$fc(String(a)))) {
        this.q = !! b;
        cr$gc(this, c[1] || "", !0);
        var d = c[2] || "";
        cr$5(this);
        this.L = d ? decodeURIComponent(d) : "";
        d = c[3] || "";
        cr$5(this);
        this.C = d ? decodeURIComponent(d) : "";
        cr$hc(this, c[4]);
        d = c[5] || "";
        cr$5(this);
        this.u = d ? decodeURIComponent(d) : "";
        cr$ic(this, c[6] || "", !0);
        c = c[7] || "";
        cr$5(this);
        this.K = c ? decodeURIComponent(c) : ""
    } else this.q = !! b, this.t = new cr$6(null, 0, this.q)
};
cr$ = cr$4.prototype;
cr$.H = "";
cr$.L = "";
cr$.C = "";
cr$.U = null;
cr$.u = "";
cr$.K = "";
cr$.cc = !1;
cr$.q = !1;
cr$.toString = function() {
    var a = [],
        b = this.H;
    b && a.push(cr$jc(b, cr$kc), ":");
    if (b = this.C) {
        a.push("//");
        var c = this.L;
        c && a.push(cr$jc(c, cr$kc), "@");
        a.push(encodeURIComponent(String(b)));
        b = this.U;
        null != b && a.push(":", String(b))
    }
    if (b = this.u) this.C && "/" != b.charAt(0) && a.push("/"), a.push(cr$jc(b, "/" == b.charAt(0) ? cr$lc : cr$mc));
    (b = this.t.toString()) && a.push("?", b);
    (b = this.K) && a.push("#", cr$jc(b, cr$nc));
    return a.join("")
};
cr$.$ = function() {
    return new cr$4(this)
};
var cr$gc = function(a, b, c) {
    cr$5(a);
    a.H = c ? b ? decodeURIComponent(b) : "" : b;
    a.H && (a.H = a.H.replace(/:$/, ""))
}, cr$hc = function(a, b) {
    cr$5(a);
    if (b) {
        b = Number(b);
        if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
        a.U = b
    } else a.U = null
}, cr$ic = function(a, b, c) {
    cr$5(a);
    b instanceof cr$6 ? (a.t = b, a.t.Pa(a.q)) : (c || (b = cr$jc(b, cr$oc)), a.t = new cr$6(b, 0, a.q))
}, cr$5 = function(a) {
    if (a.cc) throw Error("Tried to modify a read-only Uri");
};
cr$4.prototype.Pa = function(a) {
    this.q = a;
    this.t && this.t.Pa(a);
    return this
};
var cr$jc = function(a, b) {
        return cr$c(a) ? encodeURI(a).replace(b, cr$pc) : null
    }, cr$pc = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }, cr$kc = /[#\/\?@]/g,
    cr$mc = /[\#\?:]/g,
    cr$lc = /[\#\?]/g,
    cr$oc = /[\#\?@]/g,
    cr$nc = /#/g,
    cr$6 = function(a, b, c) {
        this.r = a || null;
        this.q = !! c
    }, cr$8 = function(a) {
        if (!a.f && (a.f = new cr$m, a.j = 0, a.r)) for (var b = a.r.split("&"), c = 0; c < b.length; c++) {
            var d = b[c].indexOf("="),
                e = null,
                f = null;
            0 <= d ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c];
            e = decodeURIComponent(e.replace(/\+/g, " "));
            e = cr$7(a, e);
            a.add(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
        }
    };
cr$ = cr$6.prototype;
cr$.f = null;
cr$.j = null;
cr$.add = function(a, b) {
    cr$8(this);
    this.r = null;
    a = cr$7(this, a);
    var c = this.f.get(a);
    c || this.f.set(a, c = []);
    c.push(b);
    this.j++;
    return this
};
cr$.remove = function(a) {
    cr$8(this);
    a = cr$7(this, a);
    return this.f.da(a) ? (this.r = null, this.j -= this.f.get(a).length, this.f.remove(a)) : !1
};
cr$.da = function(a) {
    cr$8(this);
    a = cr$7(this, a);
    return this.f.da(a)
};
cr$.Y = function() {
    cr$8(this);
    for (var a = this.f.D(), b = this.f.Y(), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c
};
cr$.D = function(a) {
    cr$8(this);
    var b = [];
    if (a) this.da(a) && (b = cr$sa(b, this.f.get(cr$7(this, a))));
    else {
        a = this.f.D();
        for (var c = 0; c < a.length; c++) b = cr$sa(b, a[c])
    }
    return b
};
cr$.set = function(a, b) {
    cr$8(this);
    this.r = null;
    a = cr$7(this, a);
    this.da(a) && (this.j -= this.f.get(a).length);
    this.f.set(a, [b]);
    this.j++;
    return this
};
cr$.get = function(a, b) {
    var c = a ? this.D(a) : [];
    return 0 < c.length ? String(c[0]) : b
};
cr$.toString = function() {
    if (this.r) return this.r;
    if (!this.f) return "";
    for (var a = [], b = this.f.Y(), c = 0; c < b.length; c++) for (var d = b[c], e = encodeURIComponent(String(d)), d = this.D(d), f = 0; f < d.length; f++) {
        var g = e;
        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g)
    }
    return this.r = a.join("&")
};
cr$.$ = function() {
    var a = new cr$6;
    a.r = this.r;
    this.f && (a.f = this.f.$(), a.j = this.j);
    return a
};
var cr$7 = function(a, b) {
    var c = String(b);
    a.q && (c = c.toLowerCase());
    return c
};
cr$6.prototype.Pa = function(a) {
    a && !this.q && (cr$8(this), this.r = null, cr$Fa(this.f, function(a, c) {
        var d = c.toLowerCase();
        c != d && (this.remove(c), this.remove(d), 0 < a.length && (this.r = null, this.f.set(cr$7(this, d), cr$ta(a)), this.j += a.length))
    }, this));
    this.q = a
};
var cr$9 = function() {
    cr$T.call(this, "ramp");
    this.b = null;
    this.ab = cr$qc();
    this.$a = null;
    this.wa = 0;
    this.P = !1;
    this.Ua = this.Ta = this.Q = void 0;
    this.B = this.A = null;
    cr$Jb(cr$e(this.Va, this), 1E3)
};
cr$h(cr$9, cr$T);
cr$g("cast.receiver.RemoteMedia", cr$9);
cr$9.NAMESPACE = "ramp";
var cr$$ = {
    INVALID_PLAYER_STATE: -1,
    LOAD_FAILED: -2,
    LOAD_CANCELLED: -3,
    INVALID_REQUEST: -4
};
cr$9.ErrorCode = cr$$;
cr$9.prototype.a = cr$E("cast.receiver.RemoteMedia");
var cr$rc = function(a) {
    a.b && (cr$tb(a.b, "loadedmetadata", a.mb, !1, a), cr$tb(a.b, "error", a.lb, !1, a), cr$tb(a.b, "ended", a.onEnded, !1, a))
};
cr$9.prototype.d = function() {
    cr$9.h.d.call(this);
    cr$rc(this)
};
cr$9.prototype.fc = function(a) {
    this.b != a && (cr$rc(this), this.b = a) && (cr$K(this.b, "loadedmetadata", this.mb, !1, this), cr$K(this.b, "error", this.lb, !1, this), cr$K(this.b, "ended", this.onEnded, !1, this))
};
cr$9.prototype.setMediaElement = cr$9.prototype.fc;
cr$9.prototype.Ya = function() {
    return document.title || null
};
cr$9.prototype.getTitle = cr$9.prototype.Ya;
cr$9.prototype.Aa = function(a) {
    document.title = a || null
};
cr$9.prototype.setTitle = cr$9.prototype.Aa;
cr$9.prototype.Xa = function() {
    return this.ab
};
cr$9.prototype.getImageUrl = cr$9.prototype.Xa;
var cr$qc = function(a) {
    for (var b = null, c = cr$8b("link"), d = 0; d < c.length && !b; ++d) "icon" == c[d].rel && (b = c[d]);
    a && (b ? b.href = a : (b = cr$bc("link", {
        rel: "icon",
        href: a
    }), cr$8b("head")[0].appendChild(b)));
    d = new cr$4(cr$a.location);
    a = new cr$4(b ? b.href : "/favicon.ico");
    b = d.$();
    (c = !! a.H) ? cr$gc(b, a.H) : c = !! a.L;
    if (c) {
        var e = a.L;
        cr$5(b);
        b.L = e
    } else c = !! a.C;
    c ? (e = a.C, cr$5(b), b.C = e) : c = null != a.U;
    e = a.u;
    if (c) cr$hc(b, a.U);
    else if (c = !! a.u) if ("/" != e.charAt(0) && (d.C && !d.u ? e = "/" + e : (d = b.u.lastIndexOf("/"), - 1 != d && (e = b.u.substr(0, d + 1) + e))), ".." == e || "." == e) e = "";
    else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
        for (var d = 0 == e.lastIndexOf("/", 0), e = e.split("/"), f = [], g = 0; g < e.length;) {
            var h = e[g++];
            "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), d && g == e.length && f.push("")) : (f.push(h), d = !0)
        }
        e = f.join("/")
    }
    c ? (d = e, cr$5(b), b.u = d) : c = "" !== a.t.toString();
    c ? cr$ic(b, a.t.toString() ? decodeURIComponent(a.t.toString()) : "") : c = !! a.K;
    c && (a = a.K, cr$5(b), b.K = a);
    return b.toString()
};
cr$9.prototype.za = function(a) {
    this.ab = a ? cr$qc(a) : null
};
cr$9.prototype.setImageUrl = cr$9.prototype.za;
cr$9.prototype.Wa = function() {
    return this.$a
};
cr$9.prototype.getContentInfo = cr$9.prototype.Wa;
cr$9.prototype.ya = function(a) {
    this.$a = a || null
};
cr$9.prototype.setContentInfo = cr$9.prototype.ya;
cr$9.prototype.aa = function() {
    var a = {
        cmd_id: 0,
        type: "STATUS",
        status: this.getStatus()
    };
    this.na().forEach(cr$e(function(b) {
        if (b.isOpen()) try {
            b.send(a)
        } catch (c) {
            cr$A(this.a, c)
        }
    }, this))
};
cr$9.prototype.broadcastCurrentStatus = cr$9.prototype.aa;
var cr$sc = function(a) {
    a.b && (a.Q = a.b.currentTime, a.Ta = a.b.currentTime, a.Ua = Date.now())
};
cr$9.prototype.Va = function() {
    cr$Jb(cr$e(this.Va, this), 1E3);
    if (this.b) {
        var a = this.Q;
        this.Q = this.b.currentTime;
        if (this.P) if (this.Q == a) this.P = !1;
        else {
            if (a = 1E3 * (this.Q - this.Ta) - (Date.now() - this.Ua), !(1E3 < a || -1E3 > a)) return
        } else if (this.Q != a) this.P = !0;
        else return;
        this.a.info("Media state changed: time_progress=" + this.P);
        this.aa()
    }
};
cr$9.prototype.onOpen = function(a) {
    this.a.info("onOpen");
    var b = {
        cmd_id: 0,
        type: "STATUS",
        status: this.getStatus()
    };
    try {
        a.target.send(b)
    } catch (c) {
        cr$A(this.a, c)
    }
};
cr$9.prototype.onMessage = function(a) {
    var b = a.message;
    a = a.target;
    try {
        cr$P(b, "cmd_id", "type");
        var c = !0,
            d = !0;
        switch (b.type) {
            case "LOAD":
                d = c = !1;
                this.onLoad(a, b);
                break;
            case "INFO":
                c = !1;
                this.onInfo();
                break;
            case "PLAY":
                this.onPlay(b.position);
                break;
            case "STOP":
                d = !1;
                this.onStop();
                break;
            case "VOLUME":
                this.onVolume(b.volume, b.muted);
                break;
            default:
                throw Error("Invalid message type: " + b.type);
        }
        d && a.send({
            cmd_id: b.cmd_id,
            type: "RESPONSE",
            status: this.getStatus()
        });
        c && this.aa()
    } catch (e) {
        cr$A(this.a, e), this.Z(a, b,
            cr$$.INVALID_REQUEST)
    }
};
cr$9.prototype.onLoad = function(a, b) {
    this.a.info("onLoad: src=" + b.src);
    this.b ? (b.src && (this.b.src = b.src), this.A && this.B && this.Z(this.A, this.B, cr$$.LOAD_CANCELLED), this.A = a, this.B = b, this.b.autoplay = b.autoplay || !1, this.Aa(b.title), this.za(b.image_url), this.ya(b.content_info), this.load(a, b)) : this.Z(a, b, cr$$.INVALID_PLAYER_STATE)
};
cr$9.prototype.load = function() {
    this.a.info("loading media");
    this.b.load()
};
cr$9.prototype.onInfo = function() {
    cr$B(this.a, "onInfo")
};
cr$9.prototype.onPlay = function(a) {
    this.a.info("onPlay: position=" + a);
    this.b && (void 0 != a && (this.b.currentTime = a), this.b.play())
};
cr$9.prototype.onStop = function() {
    this.a.info("onStop");
    this.b && this.b.pause()
};
cr$9.prototype.onEnded = function() {
    this.a.info("Received ended event from media element");
    this.aa()
};
cr$9.prototype.mb = function() {
    this.A && this.B && (this.a.info("Received loadedmetadata event from media element"), this.b.autoplay && cr$sc(this), this.onMetadataLoaded(this.A, this.B), this.B = this.A = null)
};
cr$9.prototype.onMetadataLoaded = function(a, b) {
    this.sb(a, b);
    this.aa()
};
cr$9.prototype.lb = function() {
    this.A && this.B && (this.a.info("Received error event from media element"), this.onLoadMetadataError(this.A, this.B), this.B = this.A = null)
};
cr$9.prototype.onLoadMetadataError = function(a, b) {
    this.b && (this.b.src = "");
    this.ya(null);
    this.za(null);
    this.Aa(null);
    this.Z(a, b, cr$$.LOAD_FAILED)
};
cr$9.prototype.onVolume = function(a, b) {
    this.a.info("onVolume: volume=" + a + ", muted=" + b);
    void 0 != a && (cr$_.isReady() ? cr$_.setVolume(a) : this.b && (this.b.volume = a));
    void 0 != b && (cr$_.isReady() ? cr$_.setMuted(b) : this.b && (this.b.muted = b))
};
var cr$tc = function(a, b) {
    return {
        event_sequence: a.wa++,
        error: {
            domain: "ramp",
            code: b
        }
    }
};
cr$9.prototype.getStatus = function() {
    cr$C(this.a, "getStatus");
    if (void 0 == this.b) return cr$tc(this, cr$$.INVALID_PLAYER_STATE);
    if (!this.b.src) return {
        event_sequence: this.wa++,
        state: 0
    };
    cr$sc(this);
    var a = 2;
    this.b.paused && (this.P = !1, a = this.b.duration && (this.b.currentTime || 0 == this.b.currentTime) && this.b.duration != this.b.currentTime ? 1 : 0);
    a = {
        event_sequence: this.wa++,
        state: a,
        content_id: this.b.src,
        current_time: this.b.currentTime,
        duration: this.b.duration,
        volume: cr$_.isReady() ? cr$_.getVolume() : this.b.volume,
        muted: cr$_.isReady() ? cr$_.getMuted() : this.b.muted,
        time_progress: this.P
    };
    1 != a.state || this.b.duration || (this.a.info("Converting inconsistent STOPPED state to IDLE"), a.state = 0);
    var b = this.Ya();
    b && (a.title = b);
    (b = this.Xa()) && (a.image_url = b);
    (b = this.Wa()) && (a.content_info = b);
    return a
};
cr$9.prototype.sb = function(a, b) {
    a.send({
        cmd_id: b.cmd_id,
        type: "RESPONSE",
        status: this.getStatus()
    })
};
cr$9.prototype.sendSuccessResponse = cr$9.prototype.sb;
cr$9.prototype.Z = function(a, b, c) {
    b = b.cmd_id;
    void 0 == b ? cr$A(this.a, "Unsupported message, no command ID, will not send response") : a.send({
        cmd_id: b,
        type: "RESPONSE",
        status: cr$tc(this, c)
    })
};
cr$9.prototype.sendErrorResponse = cr$9.prototype.Z;