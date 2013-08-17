
'use strict';
var g, aa = aa || {}, l = this,
    ba = function(a) {
        a = a.split(".");
        for (var b = l, c; c = a.shift();) if (null != b[c]) b = b[c];
        else return null;
        return b
    }, ca = function() {}, da = function(a) {
        a.Bc = function() {
            return a.Kd ? a.Kd : a.Kd = new a
        }
    }, ea = function(a) {
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
    }, m = function(a) {
        return void 0 !== a
    }, n = function(a) {
        return "array" == ea(a)
    }, fa = function(a) {
        var b = ea(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, p = function(a) {
        return "string" == typeof a
    }, ga = function(a) {
        return "function" == ea(a)
    }, ha = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, ka = function(a) {
        return a[ia] || (a[ia] = ++ja)
    }, ia = "closure_uid_" + (1E9 * Math.random() >>> 0),
    ja = 0,
    la = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ma = function(a, b, c) {
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
            return a.apply(b,
                arguments)
        }
    }, r = function(a, b, c) {
        r = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? la : ma;
        return r.apply(null, arguments)
    }, na = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b)
        }
    }, s = Date.now || function() {
        return +new Date
    }, t = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.q = b.prototype;
        a.prototype = new c
    };
Function.prototype.bind = Function.prototype.bind || function(a, b) {
    if (1 < arguments.length) {
        var c = Array.prototype.slice.call(arguments, 1);
        c.unshift(this, a);
        return r.apply(null, c)
    }
    return r(this, a)
};
var u = function(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, u) : this.stack = Error().stack || "";
    a && (this.message = String(a))
};
t(u, Error);
u.prototype.name = "CustomError";
var oa = function(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
        return d + c.join("%s")
    }, ua = function(a) {
        if (!pa.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(qa, "&")); - 1 != a.indexOf("<") && (a = a.replace(ra, "<")); - 1 != a.indexOf(">") && (a = a.replace(sa, ">")); - 1 != a.indexOf('"') && (a = a.replace(ta, "\""));
        return a
    }, qa = /&/g,
    ra = /</g,
    sa = />/g,
    ta = /\"/g,
    pa = /[&<>\"]/,
    va = function(a, b) {
        for (var c = 0, d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(d.length, e.length), h = 0; 0 == c && h < f; h++) {
            var k = d[h] || "",
                q = e[h] || "",
                N = /(\d*)(\D*)/g,
                Ea = /(\d*)(\D*)/g;
            do {
                var O = N.exec(k) || ["", "", ""],
                    P = Ea.exec(q) || ["", "", ""];
                if (0 == O[0].length && 0 == P[0].length) break;
                c = ((0 == O[1].length ? 0 : parseInt(O[1], 10)) < (0 == P[1].length ? 0 : parseInt(P[1], 10)) ? -1 : (0 == O[1].length ? 0 : parseInt(O[1], 10)) > (0 == P[1].length ? 0 : parseInt(P[1], 10)) ? 1 : 0) || ((0 == O[2].length) < (0 == P[2].length) ? -1 : (0 == O[2].length) > (0 == P[2].length) ? 1 : 0) || (O[2] < P[2] ? -1 : O[2] > P[2] ? 1 : 0)
            } while (0 == c)
        }
        return c
    };
var wa = function(a, b) {
    b.unshift(a);
    u.call(this, oa.apply(null, b));
    b.shift()
};
t(wa, u);
wa.prototype.name = "AssertionError";
var v = function(a, b, c) {
    if (!a) {
        var d = Array.prototype.slice.call(arguments, 2),
            e = "Assertion failed";
        if (b) var e = e + (": " + b),
            f = d;
        throw new wa("" + e, f || []);
    }
}, xa = function(a, b) {
    throw new wa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
};
var w = Array.prototype,
    ya = w.indexOf ? function(a, b, c) {
        v(null != a.length);
        return w.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (p(a)) return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, x = w.forEach ? function(a, b, c) {
        v(null != a.length);
        w.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    }, za = w.filter ? function(a, b, c) {
        v(null != a.length);
        return w.filter.call(a, b,
            c)
    } : function(a, b, c) {
        for (var d = a.length, e = [], f = 0, h = p(a) ? a.split("") : a, k = 0; k < d; k++) if (k in h) {
            var q = h[k];
            b.call(c, q, k, a) && (e[f++] = q)
        }
        return e
    }, Aa = w.map ? function(a, b, c) {
        v(null != a.length);
        return w.map.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, h = 0; h < d; h++) h in f && (e[h] = b.call(c, f[h], h, a));
        return e
    }, Ba = w.some ? function(a, b, c) {
        v(null != a.length);
        return w.some.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return !0;
        return !1
    }, Fa = function(a) {
        var b = Ca(a, Da, void 0);
        return 0 > b ? null : p(a) ? a.charAt(b) : a[b]
    }, Ca = function(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return f;
        return -1
    }, Ha = function(a, b) {
        var c = ya(a, b),
            d;
        (d = 0 <= c) && Ga(a, c);
        return d
    }, Ga = function(a, b) {
        v(null != a.length);
        w.splice.call(a, b, 1)
    }, Ia = function(a) {
        return w.concat.apply(w, arguments)
    }, Ja = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }, Ka = function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c],
                e;
            if (n(d) || (e = fa(d)) && Object.prototype.hasOwnProperty.call(d, "callee")) a.push.apply(a, d);
            else if (e) for (var f = a.length, h = d.length, k = 0; k < h; k++) a[f + k] = d[k];
            else a.push(d)
        }
    }, La = function(a, b, c) {
        v(null != a.length);
        return 2 >= arguments.length ? w.slice.call(a, b) : w.slice.call(a, b, c)
    }, Ma = function(a, b, c) {
        for (var d = 0, e = a.length, f; d < e;) {
            var h = d + e >> 1,
                k;
            k = b.call(c, a[h], h, a);
            0 < k ? d = h + 1 : (e = h, f = !k)
        }
        return f ? d : ~d
    };
var Na = "StopIteration" in l ? l.StopIteration : Error("StopIteration"),
    Oa = function() {};
Oa.prototype.next = function() {
    throw Na;
};
Oa.prototype.gb = function() {
    return this
};
var Pa = function(a) {
    if (a instanceof Oa) return a;
    if ("function" == typeof a.gb) return a.gb(!1);
    if (fa(a)) {
        var b = 0,
            c = new Oa;
        c.next = function() {
            for (;;) {
                if (b >= a.length) throw Na;
                if (b in a) return a[b++];
                b++
            }
        };
        return c
    }
    throw Error("Not implemented");
}, Qa = function(a, b) {
    if (fa(a)) try {
        x(a, b, void 0)
    } catch (c) {
        if (c !== Na) throw c;
    } else {
        a = Pa(a);
        try {
            for (;;) b.call(void 0, a.next(), void 0, a)
        } catch (d) {
            if (d !== Na) throw d;
        }
    }
};
var Ra = function(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    }, Sa = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    }, Ta = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    }, Ua = function(a) {
        var b = {}, c;
        for (c in a) b[c] = a[c];
        return b
    }, Va = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
    Wa = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Va.length; f++) c = Va[f], Object.prototype.hasOwnProperty.call(d,
                c) && (a[c] = d[c])
        }
    };
var y = function(a, b) {
    this.j = {};
    this.h = [];
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else a && this.Sc(a)
};
g = y.prototype;
g.g = 0;
g.Fa = 0;
g.za = function() {
    return this.g
};
g.I = function() {
    Xa(this);
    for (var a = [], b = 0; b < this.h.length; b++) a.push(this.j[this.h[b]]);
    return a
};
g.R = function() {
    Xa(this);
    return this.h.concat()
};
g.ab = function(a) {
    return Ya(this.j, a)
};
g.Xa = function() {
    return 0 == this.g
};
g.clear = function() {
    this.j = {};
    this.Fa = this.g = this.h.length = 0
};
g.remove = function(a) {
    return Ya(this.j, a) ? (delete this.j[a], this.g--, this.Fa++, this.h.length > 2 * this.g && Xa(this), !0) : !1
};
var Xa = function(a) {
    if (a.g != a.h.length) {
        for (var b = 0, c = 0; b < a.h.length;) {
            var d = a.h[b];
            Ya(a.j, d) && (a.h[c++] = d);
            b++
        }
        a.h.length = c
    }
    if (a.g != a.h.length) {
        for (var e = {}, c = b = 0; b < a.h.length;) d = a.h[b], Ya(e, d) || (a.h[c++] = d, e[d] = 1), b++;
        a.h.length = c
    }
};
g = y.prototype;
g.get = function(a, b) {
    return Ya(this.j, a) ? this.j[a] : b
};
g.set = function(a, b) {
    Ya(this.j, a) || (this.g++, this.h.push(a), this.Fa++);
    this.j[a] = b
};
g.Sc = function(a) {
    var b;
    a instanceof y ? (b = a.R(), a = a.I()) : (b = Ta(a), a = Sa(a));
    for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
};
g.W = function() {
    return new y(this)
};
g.gb = function(a) {
    Xa(this);
    var b = 0,
        c = this.h,
        d = this.j,
        e = this.Fa,
        f = this,
        h = new Oa;
    h.next = function() {
        for (;;) {
            if (e != f.Fa) throw Error("The map has changed since the iterator was created");
            if (b >= c.length) throw Na;
            var h = c[b++];
            return a ? h : d[h]
        }
    };
    return h
};
var Ya = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
var Za = function(a) {
    if ("function" == typeof a.I) return a.I();
    if (p(a)) return a.split("");
    if (fa(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    return Sa(a)
}, $a = function(a, b, c) {
    if ("function" == typeof a.forEach) a.forEach(b, c);
    else if (fa(a) || p(a)) x(a, b, c);
    else {
        var d;
        if ("function" == typeof a.R) d = a.R();
        else if ("function" != typeof a.I) if (fa(a) || p(a)) {
            d = [];
            for (var e = a.length, f = 0; f < e; f++) d.push(f)
        } else d = Ta(a);
        else d = void 0;
        for (var e = Za(a), f = e.length, h = 0; h < f; h++) b.call(c, e[h], d && d[h], a)
    }
};
var ab = function(a) {
    this.j = new y;
    a && this.Sc(a)
}, bb = function(a) {
    var b = typeof a;
    return "object" == b && a || "function" == b ? "o" + ka(a) : b.substr(0, 1) + a
};
g = ab.prototype;
g.za = function() {
    return this.j.za()
};
g.add = function(a) {
    this.j.set(bb(a), a)
};
g.Sc = function(a) {
    a = Za(a);
    for (var b = a.length, c = 0; c < b; c++) this.add(a[c])
};
g.Ia = function(a) {
    a = Za(a);
    for (var b = a.length, c = 0; c < b; c++) this.remove(a[c])
};
g.remove = function(a) {
    return this.j.remove(bb(a))
};
g.clear = function() {
    this.j.clear()
};
g.Xa = function() {
    return this.j.Xa()
};
g.I = function() {
    return this.j.I()
};
g.W = function() {
    return new ab(this)
};
g.gb = function() {
    return this.j.gb(!1)
};
var cb, db, eb, fb, gb = function() {
    return l.navigator ? l.navigator.userAgent : null
};
fb = eb = db = cb = !1;
var hb;
if (hb = gb()) {
    var ib = l.navigator;
    cb = 0 == hb.lastIndexOf("Opera", 0);
    db = !cb && (-1 != hb.indexOf("MSIE") || -1 != hb.indexOf("Trident"));
    eb = !cb && -1 != hb.indexOf("WebKit");
    fb = !cb && !eb && !db && "Gecko" == ib.product
}
var jb = cb,
    z = db,
    kb = fb,
    lb = eb,
    mb = l.navigator,
    nb = -1 != (mb && mb.platform || "").indexOf("Mac"),
    ob = function() {
        var a = l.document;
        return a ? a.documentMode : void 0
    }, pb;
t: {
    var qb = "",
        rb;
    if (jb && l.opera) var sb = l.opera.version,
        qb = "function" == typeof sb ? sb() : sb;
    else if (kb ? rb = /rv\:([^\);]+)(\)|;)/ : z ? rb = /\b(?:MSIE|rv)\s+([^\);]+)(\)|;)/ : lb && (rb = /WebKit\/(\S+)/), rb) var tb = rb.exec(gb()),
        qb = tb ? tb[1] : "";
    if (z) {
        var ub = ob();
        if (ub > parseFloat(qb)) {
            pb = String(ub);
            break t
        }
    }
    pb = qb
}
var vb = pb,
    wb = {}, A = function(a) {
        return wb[a] || (wb[a] = 0 <= va(vb, a))
    }, xb = l.document,
    yb = xb && z ? ob() || ("CSS1Compat" == xb.compatMode ? parseInt(vb, 10) : 5) : void 0;
var Ab = function(a) {
    return zb(a || arguments.callee.caller, [])
}, zb = function(a, b) {
    var c = [];
    if (0 <= ya(b, a)) c.push("[...circular reference...]");
    else if (a && 50 > b.length) {
        c.push(Bb(a) + "(");
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
                    f = (f = Bb(f)) ? f : "[fn]";
                    break;
                default:
                    f = typeof f
            }
            40 < f.length && (f = f.substr(0, 40) + "...");
            c.push(f)
        }
        b.push(a);
        c.push(")\n");
        try {
            c.push(zb(a.caller, b))
        } catch (h) {
            c.push("[exception trying to get caller]\n")
        }
    } else a ? c.push("[...long stack...]") : c.push("[end]");
    return c.join("")
}, Bb = function(a) {
    if (Cb[a]) return Cb[a];
    a = String(a);
    if (!Cb[a]) {
        var b = /function ([^\(]+)/.exec(a);
        Cb[a] = b ? b[1] : "[Anonymous]"
    }
    return Cb[a]
}, Cb = {};
var Db = function(a, b, c, d, e) {
    this.reset(a, b, c, d, e)
};
Db.prototype.wd = 0;
Db.prototype.Ic = null;
Db.prototype.Hc = null;
var Eb = 0;
Db.prototype.reset = function(a, b, c, d, e) {
    this.wd = "number" == typeof e ? e : Eb++;
    this.Dc = d || s();
    this.va = a;
    this.zc = b;
    this.Cc = c;
    delete this.Ic;
    delete this.Hc
};
Db.prototype.Jb = function() {
    return this.va
};
Db.prototype.pc = function(a) {
    this.va = a
};
var B = function(a) {
    this.jf = a
};
B.prototype.o = null;
B.prototype.va = null;
B.prototype.F = null;
B.prototype.ga = null;
var C = function(a, b) {
    this.name = a;
    this.value = b
};
C.prototype.toString = function() {
    return this.name
};
var Fb = new C("SHOUT", 1200),
    D = new C("SEVERE", 1E3),
    E = new C("WARNING", 900),
    Gb = new C("INFO", 800),
    Hb = new C("CONFIG", 700),
    F = new C("FINE", 500),
    Ib = new C("FINEST", 300),
    Jb = new C("ALL", 0),
    Kb = function(a) {
        l.console && (l.console.timeStamp ? l.console.timeStamp(a) : l.console.markTimeline && l.console.markTimeline(a));
        l.msWriteProfilerMark && l.msWriteProfilerMark(a)
    };
B.prototype.getParent = function() {
    return this.o
};
B.prototype.Gd = function() {
    this.F || (this.F = {});
    return this.F
};
B.prototype.pc = function(a) {
    this.va = a
};
B.prototype.Jb = function() {
    return this.va
};
var Lb = function(a) {
    if (a.va) return a.va;
    if (a.o) return Lb(a.o);
    xa("Root logger has no level set.");
    return null
};
B.prototype.log = function(a, b, c) {
    if (a.value >= Lb(this).value) for (a = this.ff(a, b, c), Kb("log:" + a.zc), b = this; b;) {
        c = b;
        var d = a;
        if (c.ga) for (var e = 0, f = void 0; f = c.ga[e]; e++) f(d);
        b = b.getParent()
    }
};
B.prototype.ff = function(a, b, c) {
    var d = new Db(a, String(b), this.jf);
    if (c) {
        d.Ic = c;
        var e;
        var f = arguments.callee.caller;
        try {
            var h;
            var k = ba("window.location.href");
            if (p(c)) h = {
                message: c,
                name: "Unknown error",
                lineNumber: "Not available",
                fileName: k,
                stack: "Not available"
            };
            else {
                var q, N, Ea = !1;
                try {
                    q = c.lineNumber || c.of || "Not available"
                } catch (O) {
                    q = "Not available", Ea = !0
                }
                try {
                    N = c.fileName || c.filename || c.sourceURL || l.$googDebugFname || k
                } catch (P) {
                    N = "Not available", Ea = !0
                }
                h = !Ea && c.lineNumber && c.fileName && c.stack && c.message && c.name ? c : {
                    message: c.message || "Not available",
                    name: c.name || "UnknownError",
                    lineNumber: q,
                    fileName: N,
                    stack: c.stack || "Not available"
                }
            }
            e = "Message: " + ua(h.message) + '\nUrl: <a href="view-source:' + h.fileName + '" target="_new">' + h.fileName + "</a>\nLine: " + h.lineNumber + "\n\nBrowser stack:\n" + ua(h.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + ua(Ab(f) + "-> ")
        } catch (of) {
            e = "Exception trying to expose exception! You win, we lose. " + of
        }
        d.Hc = e
    }
    return d
};
B.prototype.info = function(a, b) {
    this.log(Gb, a, b)
};
var Mb = {}, Nb = null,
    Ob = function() {
        Nb || (Nb = new B(""), Mb[""] = Nb, Nb.pc(Hb))
    }, Pb = function() {
        Ob();
        return Nb
    }, G = function(a) {
        Ob();
        var b;
        if (!(b = Mb[a])) {
            b = new B(a);
            var c = a.lastIndexOf("."),
                d = a.substr(c + 1),
                c = G(a.substr(0, c));
            c.Gd()[d] = b;
            b.o = c;
            Mb[a] = b
        }
        return b
    };
var Qb = function(a, b) {
    a && a.info(b, void 0)
}, H = function(a, b) {
    a && a.log(F, b, void 0)
};
var I = function() {};
I.prototype.Rc = !1;
I.prototype.n = function() {
    this.Rc || (this.Rc = !0, this.f())
};
var J = function(a, b) {
    var c = na(Rb, b);
    a.hb || (a.hb = []);
    a.hb.push(r(c, void 0))
};
I.prototype.f = function() {
    if (this.hb) for (; this.hb.length;) this.hb.shift()()
};
var Rb = function(a) {
    a && "function" == typeof a.n && a.n()
};
var K = function(a, b) {
    this.Ed = b;
    this.ua = [];
    if (a > this.Ed) throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
    for (var c = 0; c < a; c++) this.ua.push(this.$a())
};
t(K, I);
K.prototype.Md = null;
K.prototype.Fd = null;
var Sb = function(a) {
    return a.ua.length ? a.ua.pop() : a.$a()
}, Tb = function(a, b) {
    a.ua.length < a.Ed ? a.ua.push(b) : a.sc(b)
};
K.prototype.$a = function() {
    return this.Md ? this.Md() : {}
};
K.prototype.sc = function(a) {
    if (this.Fd) this.Fd(a);
    else if (ha(a)) if (ga(a.n)) a.n();
    else for (var b in a) delete a[b]
};
K.prototype.f = function() {
    K.q.f.call(this);
    for (var a = this.ua; a.length;) this.sc(a.pop());
    delete this.ua
};
var Wb = function() {
    this.r = [];
    this.aa = new y;
    this.nd = this.Cb = this.mb = this.md = 0;
    this.ra = new y;
    this.ld = this.cc = 0;
    this.Ac = 1;
    this.na = new K(0, 4E3);
    this.na.$a = function() {
        return new Ub
    };
    this.qc = new K(0, 50);
    this.qc.$a = function() {
        return new Vb
    };
    var a = this;
    this.Aa = new K(0, 2E3);
    this.Aa.$a = function() {
        return String(a.Ac++)
    };
    this.Aa.sc = function() {};
    this.hd = 3
};
Wb.prototype.a = G("goog.debug.Trace");
Wb.prototype.nc = 1E3;
var Vb = function() {
    this.Za = this.time = this.count = 0
};
Vb.prototype.toString = function() {
    var a = [];
    a.push(this.type, " ", this.count, " (", Math.round(10 * this.time) / 10, " ms)");
    this.Za && a.push(" [VarAlloc = ", this.Za, "]");
    return a.join("")
};
var Ub = function() {}, Zb = function(a, b, c, d) {
    var e = []; - 1 == c ? e.push("    ") : e.push(Xb(a.wb - c));
    e.push(" ", Yb(a.wb - b));
    0 == a.Qa ? e.push(" Start        ") : 1 == a.Qa ? (e.push(" Done "), e.push(Xb(a.Me - a.startTime), " ms ")) : e.push(" Comment      ");
    e.push(d, a);
    0 < a.Ta && e.push("[VarAlloc ", a.Ta, "] ");
    return e.join("")
};
Ub.prototype.toString = function() {
    return null == this.type ? this.Ua : "[" + this.type + "] " + this.Ua
};
Wb.prototype.reset = function(a) {
    this.hd = a;
    for (a = 0; a < this.r.length; a++) {
        var b = this.na.id;
        b && Tb(this.Aa, b);
        Tb(this.na, this.r[a])
    }
    this.r.length = 0;
    this.aa.clear();
    this.md = s();
    this.ld = this.cc = this.nd = this.Cb = this.mb = 0;
    b = this.ra.R();
    for (a = 0; a < b.length; a++) {
        var c = this.ra.get(b[a]);
        c.count = 0;
        c.time = 0;
        c.Za = 0;
        Tb(this.qc, c)
    }
    this.ra.clear()
};
var bc = function(a) {
    var b = $b,
        c = s(),
        d = ac(b),
        e = b.aa.za();
    if (b.r.length + e > b.nc) {
        var f = b.a;
        f && f.log(E, "Giant thread trace. Clearing to avoid memory leak.", void 0);
        if (b.r.length > b.nc / 2) {
            for (var h = 0; h < b.r.length; h++) f = b.r[h], f.id && Tb(b.Aa, f.id), Tb(b.na, f);
            b.r.length = 0
        }
        e > b.nc / 2 && b.aa.clear()
    }
    Kb("Start : " + a);
    f = Sb(b.na);
    f.Ta = d;
    f.Qa = 0;
    f.id = Number(Sb(b.Aa));
    f.Ua = a;
    f.type = void 0;
    b.r.push(f);
    b.aa.set(String(f.id), f);
    b.cc++;
    a = s();
    f.startTime = f.wb = a;
    b.mb += a - c;
    return f.id
}, cc = function(a) {
    var b = $b,
        c = s(),
        d;
    d = b.hd;
    var e = b.aa.get(String(a));
    if (null != e) {
        b.aa.remove(String(a));
        var f;
        a = c - e.startTime;
        if (a < d) for (d = b.r.length - 1; 0 <= d; d--) {
            if (b.r[d] == e) {
                b.r.splice(d, 1);
                Tb(b.Aa, e.id);
                Tb(b.na, e);
                break
            }
        } else f = Sb(b.na), f.Qa = 1, f.startTime = e.startTime, f.Ua = e.Ua, f.type = e.type, f.Me = f.wb = c, b.r.push(f);
        d = e.type;
        var h = null;
        d && (h = b.ra.get(d), h || (h = Sb(b.qc), h.type = d, b.ra.set(d, h)), h.count++, h.time += a);
        f && (Kb("Stop : " + f.Ua), f.Ta = ac(b), h && (h.Za += f.Ta - e.Ta));
        e = s();
        b.Cb += e - c
    }
}, ac = function(a) {
    return (a = a.Cf) && a.isTracing() ? a.totalVarAlloc : -1
};
Wb.prototype.toString = function() {
    for (var a = [], b = -1, c = [], d = 0; d < this.r.length; d++) {
        var e = this.r[d];
        1 == e.Qa && c.pop();
        a.push(" ", Zb(e, this.md, b, c.join("")));
        b = e.wb;
        a.push("\n");
        0 == e.Qa && c.push("|  ")
    }
    if (0 != this.aa.za()) {
        var f = s();
        a.push(" Unstopped timers:\n");
        Qa(this.aa, function(b) {
            a.push("  ", b, " (", f - b.startTime, " ms, started at ", Yb(b.startTime), ")\n")
        })
    }
    b = this.ra.R();
    for (d = 0; d < b.length; d++) c = this.ra.get(b[d]), 1 < c.count && a.push(" TOTAL ", c, "\n");
    a.push("Total tracers created ", this.cc, "\n", "Total comments created ", this.ld, "\n", "Overhead start: ", this.mb, " ms\n", "Overhead end: ", this.Cb, " ms\n", "Overhead comment: ", this.nd, " ms\n");
    return a.join("")
};
var Xb = function(a) {
    a = Math.round(a);
    var b = "";
    1E3 > a && (b = " ");
    100 > a && (b = "  ");
    10 > a && (b = "   ");
    return b + a
}, Yb = function(a) {
    a = Math.round(a);
    return String(100 + a / 1E3 % 60).substring(1, 3) + "." + String(1E3 + a % 1E3).substring(1, 4)
}, $b = new Wb;
var dc, ec = !z || z && 9 <= yb,
    fc = !kb && !z || z && z && 9 <= yb || kb && A("1.9.1");
z && A("9");
var gc = function(a, b) {
    var c;
    c = a.className;
    c = p(c) && c.match(/\S+/g) || [];
    for (var d = La(arguments, 1), e = c.length + d.length, f = c, h = 0; h < d.length; h++) 0 <= ya(f, d[h]) || f.push(d[h]);
    a.className = c.join(" ");
    return c.length == e
};
var jc = function(a) {
    return a ? new hc(ic(a)) : dc || (dc = new hc)
}, lc = function(a, b) {
    Ra(b, function(b, d) {
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in kc ? a.setAttribute(kc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
    })
}, kc = {
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
}, nc = function(a, b, c) {
    return mc(document, arguments)
}, mc = function(a, b) {
    var c = b[0],
        d = b[1];
    if (!ec && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', ua(d.name), '"');
        if (d.type) {
            c.push(' type="', ua(d.type), '"');
            var e = {};
            Wa(e, d);
            delete e.type;
            d = e
        }
        c.push(">");
        c = c.join("")
    }
    c = a.createElement(c);
    d && (p(d) ? c.className = d : n(d) ? gc.apply(null, [c].concat(d)) : lc(c, d));
    2 < b.length && oc(a, c, b);
    return c
}, oc = function(a, b, c) {
    function d(c) {
        c && b.appendChild(p(c) ? a.createTextNode(c) : c)
    }
    for (var e = 2; e < c.length; e++) {
        var f = c[e];
        !fa(f) || ha(f) && 0 < f.nodeType ? d(f) : x(pc(f) ? Ja(f) : f, d)
    }
}, qc = function(a) {
    for (var b; b = a.firstChild;) a.removeChild(b)
}, rc = function(a) {
    a && a.parentNode && a.parentNode.removeChild(a)
}, sc = function(a) {
    return fc && void 0 != a.children ? a.children : za(a.childNodes, function(a) {
        return 1 == a.nodeType
    })
}, ic = function(a) {
    return 9 == a.nodeType ? a : a.ownerDocument || a.document
}, tc = function(a, b) {
    if ("textContent" in a) a.textContent = b;
    else if (a.firstChild && 3 == a.firstChild.nodeType) {
        for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
        a.firstChild.data = b
    } else qc(a), a.appendChild(ic(a).createTextNode(String(b)))
}, pc = function(a) {
    if (a && "number" == typeof a.length) {
        if (ha(a)) return "function" == typeof a.item || "string" == typeof a.item;
        if (ga(a)) return "function" == typeof a.item
    }
    return !1
}, hc = function(a) {
    this.ka = a || l.document || document
};
g = hc.prototype;
g.ia = jc;
g.Xc = function(a) {
    return p(a) ? this.ka.getElementById(a) : a
};
g.ma = function(a, b, c) {
    return mc(this.ka, arguments)
};
g.createElement = function(a) {
    return this.ka.createElement(a)
};
g.createTextNode = function(a) {
    return this.ka.createTextNode(String(a))
};
g.appendChild = function(a, b) {
    a.appendChild(b)
};
g.Hd = qc;
g.Gd = sc;
g.vc = tc;
var uc = function(a) {
    uc[" "](a);
    return a
};
uc[" "] = ca;
var vc = !z || z && 9 <= yb,
    wc = z && !A("9");
!lb || A("528");
kb && A("1.9b") || z && A("8") || jb && A("9.5") || lb && A("528");
kb && !A("8") || z && A("9");
var L = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b
};
g = L.prototype;
g.f = function() {};
g.n = function() {};
g.wa = !1;
g.defaultPrevented = !1;
g.yd = !0;
g.preventDefault = function() {
    this.defaultPrevented = !0;
    this.yd = !1
};
var xc = function(a, b) {
    a && this.init(a, b)
};
t(xc, L);
g = xc.prototype;
g.target = null;
g.relatedTarget = null;
g.offsetX = 0;
g.offsetY = 0;
g.clientX = 0;
g.clientY = 0;
g.screenX = 0;
g.screenY = 0;
g.button = 0;
g.keyCode = 0;
g.charCode = 0;
g.ctrlKey = !1;
g.altKey = !1;
g.shiftKey = !1;
g.metaKey = !1;
g.hf = !1;
g.Dd = null;
g.init = function(a, b) {
    var c = this.type = a.type;
    L.call(this, c);
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var d = a.relatedTarget;
    if (d) {
        if (kb) {
            var e;
            t: {
                try {
                    uc(d.nodeName);
                    e = !0;
                    break t
                } catch (f) {}
                e = !1
            }
            e || (d = null)
        }
    } else "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
    this.relatedTarget = d;
    this.offsetX = lb || void 0 !== a.offsetX ? a.offsetX : a.layerX;
    this.offsetY = lb || void 0 !== a.offsetY ? a.offsetY : a.layerY;
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
    this.hf = nb ? a.metaKey : a.ctrlKey;
    this.state = a.state;
    this.Dd = a;
    a.defaultPrevented && this.preventDefault();
    delete this.wa
};
g.preventDefault = function() {
    xc.q.preventDefault.call(this);
    var a = this.Dd;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, wc) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
g.f = function() {};
var yc = "closure_listenable_" + (1E6 * Math.random() | 0),
    zc = function(a) {
        return !(!a || !a[yc])
    }, Ac = 0;
var Bc = function(a, b, c, d, e) {
    this.ta = a;
    this.Ub = null;
    this.src = b;
    this.type = c;
    this.capture = !! d;
    this.Rb = e;
    this.key = ++Ac;
    this.Ha = this.Mb = !1
}, Cc = function(a) {
    a.Ha = !0;
    a.ta = null;
    a.Ub = null;
    a.src = null;
    a.Rb = null
};
var Dc = function(a) {
    this.src = a;
    this.s = {};
    this.eb = 0
};
Dc.prototype.add = function(a, b, c, d, e) {
    var f = this.s[a];
    f || (f = this.s[a] = [], this.eb++);
    var h = Ec(f, b, d, e); - 1 < h ? (a = f[h], c || (a.Mb = !1)) : (a = new Bc(b, this.src, a, !! d, e), a.Mb = c, f.push(a));
    return a
};
Dc.prototype.remove = function(a, b, c, d) {
    if (!(a in this.s)) return !1;
    var e = this.s[a];
    b = Ec(e, b, c, d);
    return -1 < b ? (Cc(e[b]), Ga(e, b), 0 == e.length && (delete this.s[a], this.eb--), !0) : !1
};
var Fc = function(a, b) {
    var c = b.type;
    if (!(c in a.s)) return !1;
    var d = Ha(a.s[c], b);
    d && (Cc(b), 0 == a.s[c].length && (delete a.s[c], a.eb--));
    return d
};
Dc.prototype.Ia = function(a) {
    var b = 0,
        c;
    for (c in this.s) if (!a || c == a) {
        for (var d = this.s[c], e = 0; e < d.length; e++)++b, Cc(d[e]);
        delete this.s[c];
        this.eb--
    }
    return b
};
Dc.prototype.fb = function(a, b, c, d) {
    a = this.s[a];
    var e = -1;
    a && (e = Ec(a, b, c, d));
    return -1 < e ? a[e] : null
};
var Ec = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.Ha && f.ta == b && f.capture == !! c && f.Rb == d) return e
    }
    return -1
};
var Gc = {}, Hc = {}, Ic = {}, M = function(a, b, c, d, e) {
        if (n(b)) {
            for (var f = 0; f < b.length; f++) M(a, b[f], c, d, e);
            return null
        }
        c = Jc(c);
        return zc(a) ? a.M(b, c, d, e) : Kc(a, b, c, !1, d, e)
    }, Kc = function(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var h = !! e,
            k = ka(a),
            q = Hc[k];
        q || (Hc[k] = q = new Dc(a));
        c = q.add(b, c, d, e, f);
        if (c.Ub) return c;
        d = Lc();
        c.Ub = d;
        d.src = a;
        d.ta = c;
        a.addEventListener ? a.addEventListener(b, d, h) : a.attachEvent(b in Ic ? Ic[b] : Ic[b] = "on" + b, d);
        return Gc[c.key] = c
    }, Lc = function() {
        var a = Mc,
            b = vc ? function(c) {
                return a.call(b.src,
                    b.ta, c)
            } : function(c) {
                c = a.call(b.src, b.ta, c);
                if (!c) return c
            };
        return b
    }, Nc = function(a, b, c, d, e) {
        if (n(b)) {
            for (var f = 0; f < b.length; f++) Nc(a, b[f], c, d, e);
            return null
        }
        c = Jc(c);
        return zc(a) ? a.Vb(b, c, d, e) : Kc(a, b, c, !0, d, e)
    }, Oc = function(a, b, c, d, e) {
        if (n(b)) for (var f = 0; f < b.length; f++) Oc(a, b[f], c, d, e);
        else c = Jc(c), zc(a) ? a.Tc(b, c, d, e) : a && (d = !! d, (a = Pc(a)) && (b = a.fb(b, c, d, e)) && Qc(b))
    }, Qc = function(a) {
        if ("number" == typeof a || !a || a.Ha) return !1;
        var b = a.src;
        if (zc(b)) return Fc(b.P, a);
        var c = a.type,
            d = a.Ub;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(c in Ic ? Ic[c] : Ic[c] = "on" + c, d);
        (c = Pc(b)) ? (Fc(c, a), 0 == c.eb && (c.src = null, delete Hc[ka(b)])) : Cc(a);
        delete Gc[a.key];
        return !0
    }, Sc = function(a, b, c, d) {
        var e = 1;
        if (a = Pc(a)) if (b = a.s[b]) for (b = Ja(b), a = 0; a < b.length; a++) {
            var f = b[a];
            f && (f.capture == c && !f.Ha) && (e &= !1 !== Rc(f, d))
        }
        return Boolean(e)
    }, Rc = function(a, b) {
        var c = a.ta,
            d = a.Rb || a.src;
        a.Mb && Qc(a);
        return c.call(d, b)
    }, Mc = function(a, b) {
        if (a.Ha) return !0;
        if (!vc) {
            var c = b || ba("window.event"),
                d = new xc(c,
                    this),
                e = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                t: {
                    var f = !1;
                    if (0 == c.keyCode) try {
                        c.keyCode = -1;
                        break t
                    } catch (h) {
                        f = !0
                    }
                    if (f || void 0 == c.returnValue) c.returnValue = !0
                }
                c = [];
                for (f = d.currentTarget; f; f = f.parentNode) c.push(f);
                for (var f = a.type, k = c.length - 1; !d.wa && 0 <= k; k--) d.currentTarget = c[k], e &= Sc(c[k], f, !0, d);
                for (k = 0; !d.wa && k < c.length; k++) d.currentTarget = c[k], e &= Sc(c[k], f, !1, d)
            }
            return e
        }
        return Rc(a, new xc(b, this))
    }, Pc = function(a) {
        return a[ia] ? Hc[ka(a)] || null : null
    }, Tc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    Jc = function(a) {
        v(a, "Listener can not be null.");
        if (ga(a)) return a;
        v(a.handleEvent, "An object listener must have handleEvent method.");
        return a[Tc] || (a[Tc] = function(b) {
            return a.handleEvent(b)
        })
    };
var Uc = function(a, b) {
    a.style.display = b ? "" : "none"
};
var Q = function() {
    this.P = new Dc(this);
    this.bf = this
};
t(Q, I);
Q.prototype[yc] = !0;
g = Q.prototype;
g.Lb = null;
g.zb = function(a) {
    this.Lb = a
};
g.addEventListener = function(a, b, c, d) {
    M(this, a, b, c, d)
};
g.removeEventListener = function(a, b, c, d) {
    Oc(this, a, b, c, d)
};
g.dispatchEvent = function(a) {
    Vc(this);
    var b, c = this.Lb;
    if (c) {
        b = [];
        for (var d = 1; c; c = c.Lb) b.push(c), v(1E3 > ++d, "infinite loop")
    }
    c = this.bf;
    d = a.type || a;
    if (p(a)) a = new L(a, c);
    else if (a instanceof L) a.target = a.target || c;
    else {
        var e = a;
        a = new L(d, c);
        Wa(a, e)
    }
    var e = !0,
        f;
    if (b) for (var h = b.length - 1; !a.wa && 0 <= h; h--) f = a.currentTarget = b[h], e = Wc(f, d, !0, a) && e;
    a.wa || (f = a.currentTarget = c, e = Wc(f, d, !0, a) && e, a.wa || (e = Wc(f, d, !1, a) && e));
    if (b) for (h = 0; !a.wa && h < b.length; h++) f = a.currentTarget = b[h], e = Wc(f, d, !1, a) && e;
    return e
};
g.f = function() {
    Q.q.f.call(this);
    this.P && this.P.Ia(void 0);
    this.Lb = null
};
g.M = function(a, b, c, d) {
    Vc(this);
    return this.P.add(a, b, !1, c, d)
};
g.Vb = function(a, b, c, d) {
    return this.P.add(a, b, !0, c, d)
};
g.Tc = function(a, b, c, d) {
    return this.P.remove(a, b, c, d)
};
var Wc = function(a, b, c, d) {
    b = a.P.s[b];
    if (!b) return !0;
    b = Ja(b);
    for (var e = !0, f = 0; f < b.length; ++f) {
        var h = b[f];
        if (h && !h.Ha && h.capture == c) {
            var k = h.ta,
                q = h.Rb || h.src;
            h.Mb && Fc(a.P, h);
            e = !1 !== k.call(q, d) && e
        }
    }
    return e && !1 != d.yd
};
Q.prototype.fb = function(a, b, c, d) {
    return this.P.fb(a, b, c, d)
};
var Vc = function(a) {
    v(a.P, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
var Xc = function(a, b) {
    Q.call(this);
    this.Ja = a || 1;
    this.Ga = b || l;
    this.Pc = r(this.yc, this);
    this.Qc = s()
};
t(Xc, Q);
g = Xc.prototype;
g.enabled = !1;
g.w = null;
g.yc = function() {
    if (this.enabled) {
        var a = s() - this.Qc;
        0 < a && a < 0.8 * this.Ja ? this.w = this.Ga.setTimeout(this.Pc, this.Ja - a) : (this.w && (this.Ga.clearTimeout(this.w), this.w = null), this.pd(), this.enabled && (this.w = this.Ga.setTimeout(this.Pc, this.Ja), this.Qc = s()))
    }
};
g.pd = function() {
    this.dispatchEvent("tick")
};
g.start = function() {
    this.enabled = !0;
    this.w || (this.w = this.Ga.setTimeout(this.Pc, this.Ja), this.Qc = s())
};
g.stop = function() {
    this.enabled = !1;
    this.w && (this.Ga.clearTimeout(this.w), this.w = null)
};
g.f = function() {
    Xc.q.f.call(this);
    this.stop();
    delete this.Ga
};
var Yc = function(a, b, c) {
    if (ga(a)) c && (a = r(a, c));
    else if (a && "function" == typeof a.handleEvent) a = r(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < b ? -1 : l.setTimeout(a, b || 0)
};
var Zc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
    ad = function(a) {
        if ($c) {
            $c = !1;
            var b = l.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = ad(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) throw $c = !0, Error();
            }
        }
        return a.match(Zc)
    }, $c = lb;
var bd = function(a, b) {
    var c;
    if (a instanceof bd) this.D = m(b) ? b : a.D, cd(this, a.Ka), c = a.Qb, R(this), this.Qb = c, c = a.bb, R(this), this.bb = c, dd(this, a.Pb), c = a.Ob, R(this), this.Ob = c, ed(this, a.O.W()), c = a.Nb, R(this), this.Nb = c;
    else if (a && (c = ad(String(a)))) {
        this.D = !! b;
        cd(this, c[1] || "", !0);
        var d = c[2] || "";
        R(this);
        this.Qb = d ? decodeURIComponent(d) : "";
        d = c[3] || "";
        R(this);
        this.bb = d ? decodeURIComponent(d) : "";
        dd(this, c[4]);
        d = c[5] || "";
        R(this);
        this.Ob = d ? decodeURIComponent(d) : "";
        ed(this, c[6] || "", !0);
        c = c[7] || "";
        R(this);
        this.Nb = c ? decodeURIComponent(c) : ""
    } else this.D = !! b, this.O = new fd(null, 0, this.D)
};
g = bd.prototype;
g.Ka = "";
g.Qb = "";
g.bb = "";
g.Pb = null;
g.Ob = "";
g.Nb = "";
g.lf = !1;
g.D = !1;
g.toString = function() {
    var a = [],
        b = this.Ka;
    b && a.push(gd(b, hd), ":");
    if (b = this.bb) {
        a.push("//");
        var c = this.Qb;
        c && a.push(gd(c, hd), "@");
        a.push(encodeURIComponent(String(b)));
        b = this.Pb;
        null != b && a.push(":", String(b))
    }
    if (b = this.Ob) this.bb && "/" != b.charAt(0) && a.push("/"), a.push(gd(b, "/" == b.charAt(0) ? id : jd));
    (b = this.O.toString()) && a.push("?", b);
    (b = this.Nb) && a.push("#", gd(b, kd));
    return a.join("")
};
g.W = function() {
    return new bd(this)
};
var cd = function(a, b, c) {
    R(a);
    a.Ka = c ? b ? decodeURIComponent(b) : "" : b;
    a.Ka && (a.Ka = a.Ka.replace(/:$/, ""))
}, dd = function(a, b) {
    R(a);
    if (b) {
        b = Number(b);
        if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
        a.Pb = b
    } else a.Pb = null
}, ed = function(a, b, c) {
    R(a);
    b instanceof fd ? (a.O = b, a.O.Uc(a.D)) : (c || (b = gd(b, ld)), a.O = new fd(b, 0, a.D))
}, md = function(a, b, c) {
    R(a);
    a.O.set(b, c)
}, R = function(a) {
    if (a.lf) throw Error("Tried to modify a read-only Uri");
};
bd.prototype.Uc = function(a) {
    this.D = a;
    this.O && this.O.Uc(a);
    return this
};
var nd = function(a) {
        console.log("nd()");
        var ndf = a instanceof bd ? a.W() : new bd(a, void 0);
        console.log(ndf);
        return ndf;
    }, gd = function(a, b) {
        return p(a) ? encodeURI(a).replace(b, od) : null
    }, od = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }, hd = /[#\/\?@]/g,
    jd = /[\#\?:]/g,
    id = /[\#\?]/g,
    ld = /[\#\?@]/g,
    kd = /#/g,
    fd = function(a, b, c) {
        this.B = a || null;
        this.D = !! c
    }, S = function(a) {
        if (!a.i && (a.i = new y, a.g = 0, a.B)) for (var b = a.B.split("&"), c = 0; c < b.length; c++) {
            var d = b[c].indexOf("="),
                e = null,
                f = null;
            0 <= d ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c];
            e = decodeURIComponent(e.replace(/\+/g, " "));
            e = pd(a, e);
            a.add(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
        }
    };
g = fd.prototype;
g.i = null;
g.g = null;
g.za = function() {
    S(this);
    return this.g
};
g.add = function(a, b) {
    S(this);
    this.B = null;
    a = pd(this, a);
    var c = this.i.get(a);
    c || this.i.set(a, c = []);
    c.push(b);
    this.g++;
    return this
};
g.remove = function(a) {
    S(this);
    a = pd(this, a);
    return this.i.ab(a) ? (this.B = null, this.g -= this.i.get(a).length, this.i.remove(a)) : !1
};
g.clear = function() {
    this.i = this.B = null;
    this.g = 0
};
g.Xa = function() {
    S(this);
    return 0 == this.g
};
g.ab = function(a) {
    S(this);
    a = pd(this, a);
    return this.i.ab(a)
};
g.R = function() {
    S(this);
    for (var a = this.i.I(), b = this.i.R(), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c
};
g.I = function(a) {
    S(this);
    var b = [];
    if (a) this.ab(a) && (b = Ia(b, this.i.get(pd(this, a))));
    else {
        a = this.i.I();
        for (var c = 0; c < a.length; c++) b = Ia(b, a[c])
    }
    return b
};
g.set = function(a, b) {
    S(this);
    this.B = null;
    a = pd(this, a);
    this.ab(a) && (this.g -= this.i.get(a).length);
    this.i.set(a, [b]);
    this.g++;
    return this
};
g.get = function(a, b) {
    var c = a ? this.I(a) : [];
    return 0 < c.length ? String(c[0]) : b
};
g.toString = function() {
    if (this.B) return this.B;
    if (!this.i) return "";
    for (var a = [], b = this.i.R(), c = 0; c < b.length; c++) for (var d = b[c], e = encodeURIComponent(String(d)), d = this.I(d), f = 0; f < d.length; f++) {
        var h = e;
        "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
        a.push(h)
    }
    return this.B = a.join("&")
};
g.W = function() {
    var a = new fd;
    a.B = this.B;
    this.i && (a.i = this.i.W(), a.g = this.g);
    return a
};
var pd = function(a, b) {
    var c = String(b);
    a.D && (c = c.toLowerCase());
    return c
};
fd.prototype.Uc = function(a) {
    a && !this.D && (S(this), this.B = null, $a(this.i, function(a, c) {
        var d = c.toLowerCase();
        c != d && (this.remove(c), this.remove(d), 0 < a.length && (this.B = null, this.i.set(pd(this, d), Ja(a)), this.g += a.length))
    }, this));
    this.D = a
};
fd.prototype.extend = function(a) {
    for (var b = 0; b < arguments.length; b++) $a(arguments[b], function(a, b) {
        this.add(b, a)
    }, this)
};
var qd = function(a) {
    return function() {
        throw a;
    }
}, rd = function(a) {
    var b;
    b = b || 0;
    return function() {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
};
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
 */
var sd = function(a, b) {
    this.Sb = [];
    this.Qe = b || null;
    this.Wc = null;
    if (Error.captureStackTrace) {
        var c = {
            stack: ""
        };
        Error.captureStackTrace(c, sd);
        "string" == typeof c.stack && (this.Wc = c.stack.replace(/^[^\n]*\n/, ""))
    }
};
g = sd.prototype;
g.Ba = !1;
g.cb = !1;
g.Nc = !1;
g.vd = !1;
g.Jd = !1;
g.Re = 0;
g.xd = function(a, b) {
    this.Nc = !1;
    td(this, a, b)
};
var td = function(a, b, c) {
    a.Ba = !0;
    a.Mc = c;
    a.cb = !b;
    ud(a)
}, wd = function(a) {
    if (a.Ba) {
        if (!a.Jd) throw new vd;
        a.Jd = !1
    }
};
sd.prototype.La = function(a) {
    wd(this);
    xd(a);
    td(this, !0, a)
};
var yd = function(a, b) {
    a.Wc && (ha(b) && b.stack && /^[^\n]+(\n   [^\n]+)+/.test(b.stack)) && (b.stack = b.stack + "\nDEFERRED OPERATION:\n" + a.Wc)
}, xd = function(a) {
    v(!(a instanceof sd), "An execution sequence may not be initiated with a blocking Deferred.")
}, Ad = function(a, b, c) {
    zd(a, b, null, c)
}, zd = function(a, b, c, d) {
    v(!a.vd, "Blocking Deferreds can not be re-used");
    a.Sb.push([b, c, d]);
    a.Ba && ud(a)
}, Bd = function(a) {
    return Ba(a.Sb, function(a) {
        return ga(a[1])
    })
}, ud = function(a) {
    a.Oc && (a.Ba && Bd(a)) && (l.clearTimeout(a.Oc), delete a.Oc);
    a.o && (a.o.Re--, delete a.o);
    for (var b = a.Mc, c = !1, d = !1; a.Sb.length && !a.Nc;) {
        var e = a.Sb.shift(),
            f = e[0],
            h = e[1],
            e = e[2];
        if (f = a.cb ? h : f) try {
            var k = f.call(e || a.Qe, b);
            m(k) && (a.cb = a.cb && (k == b || k instanceof Error), a.Mc = b = k);
            b instanceof sd && (d = !0, a.Nc = !0)
        } catch (q) {
            b = q, a.cb = !0, yd(a, b), Bd(a) || (c = !0)
        }
    }
    a.Mc = b;
    d && (zd(b, r(a.xd, a, !0), r(a.xd, a, !1)), b.vd = !0);
    c && (a.Oc = l.setTimeout(qd(b), 0))
}, vd = function() {
    u.call(this)
};
t(vd, u);
vd.prototype.message = "Deferred has already fired";
vd.prototype.name = "AlreadyCalledError";
var Fd = function(a) {
    var b = {}, c = b.document || document,
        d = document.createElement("SCRIPT"),
        e = {
            nf: d,
            yb: void 0
        }, f = new sd(0, e),
        h = null,
        k = null != b.timeout ? b.timeout : 5E3;
    0 < k && (h = window.setTimeout(function() {
        Cd(d, !0);
        var b = new Dd(1, "Timeout reached for loading script " + a);
        wd(f);
        xd(b);
        yd(f, b);
        td(f, !1, b)
    }, k), e.yb = h);
    d.onload = d.onreadystatechange = function() {
        d.readyState && "loaded" != d.readyState && "complete" != d.readyState || (Cd(d, b.mf || !1, h), f.La(null))
    };
    d.onerror = function() {
        Cd(d, !0, h);
        var b = new Dd(0, "Error while loading script " + a);
        wd(f);
        xd(b);
        yd(f, b);
        td(f, !1, b)
    };
    lc(d, {
        type: "text/javascript",
        charset: "UTF-8",
        src: a
    });
    Ed(c).appendChild(d);
    return f
}, Ed = function(a) {
    var b = a.getElementsByTagName("HEAD");
    return b && 0 != b.length ? b[0] : a.documentElement
}, Cd = function(a, b, c) {
    null != c && l.clearTimeout(c);
    a.onload = ca;
    a.onerror = ca;
    a.onreadystatechange = ca;
    b && window.setTimeout(function() {
        rc(a)
    }, 0)
}, Dd = function(a, b) {
    var c = "Jsloader error (code #" + a + ")";
    b && (c += ": " + b);
    u.call(this, c);
    this.code = a
};
t(Dd, u);
var Gd = function() {
    this.p = "pending";
    this.ga = [];
    this.pb = this.Cd = void 0
}, Hd = function() {
    u.call(this, "Multiple attempts to set the state of this Result")
};
t(Hd, u);
Gd.prototype.xb = function() {
    return this.p
};
Gd.prototype.da = function() {
    return this.Cd
};
Gd.prototype.Ya = function(a) {
    if ("pending" == this.p) this.Cd = a, this.p = "success", Id(this);
    else throw new Hd;
};
var Jd = function(a) {
    if ("pending" == a.p) a.pb = void 0, a.p = "error", Id(a);
    else throw new Hd;
}, Id = function(a) {
    var b = a.ga;
    a.ga = [];
    for (var c = 0; c < b.length; c++) {
        var d = b[c];
        d.La.call(d.scope, a)
    }
};
var Kd = function() {
    this.sa = null;
    this.a = G("lava.cast.SdkLoader")
};
da(Kd);
var Md = function() {
    var a = Kd.Bc();
    if (!a.sa) {
        a.sa = new Gd;
        a.a.info("Trying to load the receiver platform object; user agent: " + gb());
        var b;
        b = (b = gb()) ? (b = b.match(/\(CrKey [^)]* ([0-9]*\.[0-9]*)\.[0-9]*\)/)) && b[1] ? 0 <= va(b[1], "1.1") : !1 : !1;
        b ? Ld(a) : (a.a.info("The user agent is too old, not loading SDK."), Jd(a.sa))
    }
    return a.sa
}, Ld = function(a) {
    a.a.info("Loading SDK from //www.gstatic.com/cast/js/receiver/1.0/cast_receiver.js");
    zd(Fd("//www.gstatic.com/cast/js/receiver/1.0/cast_receiver.js"), function() {
        if (cast.receiver.platform.isReady()) this.sa.Ya(cast.receiver.platform),
            this.a.info("SDK loaded, platform object is ready.");
        else {
            this.a.info("SDK loaded, waiting for platform object to be ready.");
            var a = r(function() {
                cast.receiver.platform.isReady() ? (cast.receiver.platform.removeEventListener(cast.receiver.Platform.EventType.VOLUME_CHANGED, a), this.a.log(F, "The platform object is ready.", void 0), this.sa.Ya(cast.receiver.platform)) : this.a.log(F, "Received VOLUME_CHANGED event, but still waiting.", void 0)
            }, this);
            cast.receiver.platform.addEventListener(cast.receiver.Platform.EventType.VOLUME_CHANGED,
                a)
        }
    }, function(a) {
        this.a.log(E, "Cannot load sdk: " + a, void 0);
        Jd(this.sa)
    }, a)
};
var Nd = function() {
    this.Od = s()
}, Od = new Nd;
Nd.prototype.set = function(a) {
    this.Od = a
};
Nd.prototype.reset = function() {
    this.set(s())
};
Nd.prototype.get = function() {
    return this.Od
};
var Pd = function(a) {
    this.Se = a || "";
    this.Te = Od
};
g = Pd.prototype;
g.sd = !0;
g.Ve = !0;
g.Ue = !0;
g.td = !1;
g.We = !1;
var Qd = function(a) {
    return 10 > a ? "0" + a : String(a)
}, Rd = function(a, b) {
    var c = (a.Dc - b) / 1E3,
        d = c.toFixed(3),
        e = 0;
    if (1 > c) e = 2;
    else for (; 100 > c;) e++, c *= 10;
    for (; 0 < e--;) d = " " + d;
    return d
}, Sd = function(a) {
    Pd.call(this, a)
};
t(Sd, Pd);
var Td = function() {
    this.Ze = r(this.Lc, this);
    this.Kc = new Sd;
    this.Kc.sd = !1;
    this.Bd = this.Kc.td = !1;
    this.rd = "";
    this.Pe = {}
}, Vd = function() {
    var a = new Ud;
    if (!0 != a.Bd) {
        var b = Pb(),
            c = a.Ze;
        b.ga || (b.ga = []);
        b.ga.push(c);
        a.Bd = !0
    }
};
Td.prototype.Lc = function(a) {
    if (!this.Pe[a.Cc]) {
        var b;
        b = this.Kc;
        var c = [];
        c.push(b.Se, " ");
        if (b.sd) {
            var d = new Date(a.Dc);
            c.push("[", Qd(d.getFullYear() - 2E3) + Qd(d.getMonth() + 1) + Qd(d.getDate()) + " " + Qd(d.getHours()) + ":" + Qd(d.getMinutes()) + ":" + Qd(d.getSeconds()) + "." + Qd(Math.floor(d.getMilliseconds() / 10)), "] ")
        }
        b.Ve && c.push("[", Rd(a, b.Te.get()), "s] ");
        b.Ue && c.push("[", a.Cc, "] ");
        b.We && c.push("[", a.Jb().name, "] ");
        c.push(a.zc, "\n");
        b.td && a.Ic && c.push(a.Hc, "\n");
        b = c.join("");
        if (c = Wd) switch (a.Jb()) {
            case Fb:
                Xd(c, "info", b);
                break;
            case D:
                Xd(c, "error", b);
                break;
            case E:
                Xd(c, "warn", b);
                break;
            default:
                Xd(c, "debug", b)
        } else window.opera ? window.opera.postError(b) : this.rd += b
    }
};
var Wd = window.console,
    Xd = function(a, b, c) {
        if (a[b]) a[b](c);
        else a.log(c)
    };
var Ud = function() {
    Td.call(this)
};
t(Ud, Td);
Ud.prototype.Lc = function(a) {
    a.zc.split("\n").forEach(function(b) {
        b = new Db(a.Jb(), b, a.Cc, a.Dc, a.wd);
        Ud.q.Lc.call(this, b)
    }, this)
};
var Yd = function(a) {
    hc.call(this, a)
};
t(Yd, hc);
var Zd = function(a, b) {
    var c = a.Xc(b);
    if (!c) throw Error("Not found: " + b);
    return c
};
var $d = function(a, b, c) {
    L.call(this, "keytokenrequest");
    this.request = a;
    this.hc = b;
    this.gc = c
};
t($d, L);
var ae = function(a) {
    L.call(this, "update");
    this.Oe = a
};
t(ae, L);
var be = function(a) {
    if ("undefined" != typeof a.selectNodes) {
        var b = ic(a);
        "undefined" != typeof b.setProperty && b.setProperty("SelectionLanguage", "XPath");
        return a.selectNodes("/transcript_list/track | /transcript_list/target")
    }
    if (document.implementation.hasFeature("XPath", "3.0")) {
        var b = ic(a),
            c = b.createNSResolver(b.documentElement);
        a = b.evaluate("/transcript_list/track | /transcript_list/target", a, c, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var b = [], c = a.snapshotLength, d = 0; d < c; d++) b.push(a.snapshotItem(d));
        return b
    }
    return []
};
var ce = function(a) {
    return (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : ""
};
var de = function() {
        this.Wb = void 0
    }, fe = function(a, b, c) {
        switch (typeof b) {
            case "string":
                ee(b, c);
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
                if (n(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++) c.push(e), e = b[f], fe(a, a.Wb ? a.Wb.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b) Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), ee(f, c), c.push(":"), fe(a, a.Wb ? a.Wb.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }, ge = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }, he = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
    ee = function(a, b) {
        b.push('"', a.replace(he, function(a) {
            if (a in ge) return ge[a];
            var b = a.charCodeAt(0),
                e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return ge[a] = e + b.toString(16)
        }), '"')
    };
var ie = function() {};
ie.prototype.Ld = null;
ie.prototype.getOptions = function() {
    var a;
    (a = this.Ld) || (a = {}, je(this) && (a[0] = !0, a[1] = !0), a = this.Ld = a);
    return a
};
var ke, le = function() {};
t(le, ie);
var me = function(a) {
    return (a = je(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}, je = function(a) {
    if (!a.Nd && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
        for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
            var d = b[c];
            try {
                return new ActiveXObject(d), a.Nd = d
            } catch (e) {}
        }
        throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
    }
    return a.Nd
};
ke = new le;
var T = function(a) {
    Q.call(this);
    this.headers = new y;
    this.vb = a || null;
    this.$ = !1;
    this.rb = this.d = null;
    this.Oa = this.cd = this.ub = "";
    this.pa = this.ec = this.ob = this.fc = !1;
    this.Pa = 0;
    this.sb = null;
    this.dd = "";
    this.tb = this.Wd = !1
};
t(T, Q);
T.prototype.a = G("goog.net.XhrIo");
var ne = /^https?$/i,
    oe = ["POST", "PUT"],
    pe = [],
    qe = function(a, b, c, d) {
        var e = new T;
        pe.push(e);
        b && e.M("complete", b);
        e.Vb("ready", e.ef);
        e.send(a, c, d, void 0)
    };
T.prototype.ef = function() {
    this.n();
    Ha(pe, this)
};
T.prototype.send = function(a, b, c, d) {
    if (this.d) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.ub + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.ub = a;
    this.Oa = "";
    this.cd = b;
    this.fc = !1;
    this.$ = !0;
    this.d = this.vb ? me(this.vb) : me(ke);
    this.rb = this.vb ? this.vb.getOptions() : ke.getOptions();
    this.d.onreadystatechange = r(this.ed, this);
    try {
        H(this.a, re(this, "Opening Xhr")), this.ec = !0, this.d.open(b, a, !0), this.ec = !1
    } catch (e) {
        H(this.a, re(this, "Error opening Xhr: " + e.message));
        this.pb(5, e);
        return
    }
    a = c || "";
    var f = this.headers.W();
    d && $a(d, function(a, b) {
        f.set(b, a)
    });
    d = Fa(f.R());
    c = l.FormData && a instanceof l.FormData;
    !(0 <= ya(oe, b)) || (d || c) || f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    $a(f, function(a, b) {
        this.d.setRequestHeader(b, a)
    }, this);
    this.dd && (this.d.responseType = this.dd);
    "withCredentials" in this.d && (this.d.withCredentials = this.Wd);
    try {
        se(this), 0 < this.Pa && (this.tb = z && A(9) && "number" == typeof this.d.timeout && m(this.d.ontimeout), H(this.a, re(this, "Will abort after " + this.Pa + "ms if incomplete, xhr2 " + this.tb)), this.tb ? (this.d.timeout = this.Pa, this.d.ontimeout = r(this.yb, this)) : this.sb = Yc(this.yb, this.Pa, this)), H(this.a, re(this, "Sending request")), this.ob = !0, this.d.send(a), this.ob = !1
    } catch (h) {
        H(this.a, re(this, "Send error: " + h.message)), this.pb(5, h)
    }
};
var Da = function(a) {
    return "content-type" == a.toLowerCase()
};
T.prototype.yb = function() {
    "undefined" != typeof aa && this.d && (this.Oa = "Timed out after " + this.Pa + "ms, aborting", H(this.a, re(this, this.Oa)), this.dispatchEvent("timeout"), this.abort(8))
};
T.prototype.pb = function(a, b) {
    this.$ = !1;
    this.d && (this.pa = !0, this.d.abort(), this.pa = !1);
    this.Oa = b;
    te(this);
    ue(this)
};
var te = function(a) {
    a.fc || (a.fc = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
};
T.prototype.abort = function() {
    this.d && this.$ && (H(this.a, re(this, "Aborting")), this.$ = !1, this.pa = !0, this.d.abort(), this.pa = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), ue(this))
};
T.prototype.f = function() {
    this.d && (this.$ && (this.$ = !1, this.pa = !0, this.d.abort(), this.pa = !1), ue(this, !0));
    T.q.f.call(this)
};
T.prototype.ed = function() {
    this.Rc || (this.ec || this.ob || this.pa ? ve(this) : this.cf())
};
T.prototype.cf = function() {
    ve(this)
};
var ve = function(a) {
    if (a.$ && "undefined" != typeof aa) if (a.rb[1] && 4 == we(a) && 2 == a.getStatus()) H(a.a, re(a, "Local request error detected and ignored"));
    else if (a.ob && 4 == we(a)) Yc(a.ed, 0, a);
    else if (a.dispatchEvent("readystatechange"), 4 == we(a)) {
        H(a.a, re(a, "Request complete"));
        a.$ = !1;
        try {
            if (xe(a)) a.dispatchEvent("complete"), a.dispatchEvent("success");
            else {
                var b;
                try {
                    b = 2 < we(a) ? a.d.statusText : ""
                } catch (c) {
                    H(a.a, "Can not get status: " + c.message), b = ""
                }
                a.Oa = b + " [" + a.getStatus() + "]";
                te(a)
            }
        } finally {
            ue(a)
        }
    }
}, ue = function(a,
                 b) {
    if (a.d) {
        se(a);
        var c = a.d,
            d = a.rb[0] ? ca : null;
        a.d = null;
        a.rb = null;
        b || a.dispatchEvent("ready");
        try {
            c.onreadystatechange = d
        } catch (e) {
            (c = a.a) && c.log(D, "Problem encountered resetting onreadystatechange: " + e.message, void 0)
        }
    }
}, se = function(a) {
    a.d && a.tb && (a.d.ontimeout = null);
    "number" == typeof a.sb && (l.clearTimeout(a.sb), a.sb = null)
};
T.prototype.Id = function() {
    return !!this.d
};
var xe = function(a) {
    var b = a.getStatus(),
        c;
    t: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            c = !0;
            break t;
        default:
            c = !1
    }
    if (!c) {
        if (b = 0 === b) a = ad(String(a.ub))[1] || null, !a && self.location && (a = self.location.protocol, a = a.substr(0, a.length - 1)), b = !ne.test(a ? a.toLowerCase() : "");
        c = b
    }
    return c
}, we = function(a) {
    return a.d ? a.d.readyState : 0
};
T.prototype.getStatus = function() {
    try {
        return 2 < we(this) ? this.d.status : -1
    } catch (a) {
        var b = this.a;
        b && b.log(E, "Can not get status: " + a.message, void 0);
        return -1
    }
};
var ye = function(a) {
    try {
        return a.d ? a.d.responseXML : null
    } catch (b) {
        return H(a.a, "Can not get responseXML: " + b.message), null
    }
}, re = function(a, b) {
    return b + " [" + a.cd + " " + a.ub + " " + a.getStatus() + "]"
};
var Ae = function(a, b) {
    this.$e = ce(b || "en");
    this.te = a;
    this.e = ze;
    md(this.e, "hl", this.$e);
    md(this.e, "v", a);
    this.tc = {}
};
Ae.prototype.qd = function() {
    return this.e.toString()
};
var Be = function(a) {
    a = Sa(a.tc);
    var b = Ca(a, function(a) {
        return a.we
    });
    if (-1 != b && 0 != b) {
        var c = a[0];
        a[0] = a[b];
        a[b] = c
    }
    return a
}, ze = new bd("//video.google.com/timedtext?op=list&fmts=1");
Ae.prototype.load = function(a) {
    qe(this.e, r(function(b) {
        var c = b.target;
        xe(c) ? (b = ye(b.target), b = be(b), x(b, function(a) {
            var b = {};
            b.ne = this.te;
            var c = a.getAttribute("id");
            v(c);
            b.id = parseInt(c, 10);
            c = a.getAttribute("lang_code");
            v(c);
            b.lang = c;
            c = a.getAttribute("lang_translated");
            v(c);
            b.Xd = c;
            c = a.getAttribute("name");
            b.name = c || "";
            c = a.getAttribute("kind");
            b.me = c || "";
            c = a.getAttribute("lang_default");
            b.we = "true" == c;
            a = ce(b.lang);
            b.lang != a && (this.a.log(E, "TTS sent region subtag " + b.lang, void 0), b.lang = a);
            this.tc[b.lang] ? this.a.log(E, "Skipping duplicate lang " + b.lang, void 0) : this.tc[b.lang] = b
        }, this)) : this.a.info("Failed to get tracks from TTS:" + c.getStatus());
        a && a()
    }, this))
};
Ae.prototype.a = G("lava.caption.Tracks");
var Ce = function() {
    this.Xe = this.Ca = this.v = 0;
    this.Sa = 7;
    this.text = ""
};
Ce.prototype.toString = function() {
    return "(" + this.v + "..." + (this.v + this.Ca) + ': "' + this.text + '")'
};
var De = {
    qf: 6,
    pf: 7,
    rf: 8,
    zf: 0,
    yf: 1,
    Af: 2,
    uf: 3,
    tf: 4,
    vf: 5
}, Fe = function(a) {
    this.e = Ee;
    md(this.e, "lang", a.lang);
    md(this.e, "v", a.ne);
    md(this.e, "name", a.name || "");
    md(this.e, "kind", a.me || "");
    this.T = [];
    this.kc = this.Ra = 0
};
Fe.prototype.load = function(a) {
    this.T.length = 0;
    this.T.push(new Ce);
    this.kc = this.Ra = 0;
    qe(this.qd(), r(function(b) {
        b = b.target;
        if (xe(b)) {
            b = ye(b);
            if (void 0 != b.firstElementChild) b = b.firstElementChild;
            else for (b = b.firstChild; b && 1 != b.nodeType;) b = b.nextSibling;
            Ge(this, b)
        } else this.a.info("retcode:" + b.getStatus());
        a && a()
    }, this))
};
Fe.prototype.qd = function() {
    return this.e.toString()
};
Fe.prototype.Xa = function() {
    return 1 == this.T.length
};
var He = function(a, b) {
    a.Ra = Ma(a.T, function(a, d, e) {
        return b < a.v ? 0 == d ? 0 : -1 : d == e.length - 1 ? 0 : b < e[d + 1].v ? 0 : 1
    }, a)
}, Ie = function(a, b) {
    if (!(0 > b.v || !b.text || a.kc > b.v)) {
        var c = a.T[a.T.length - 1];
        c.Xe = b.v - c.v;
        var d = b.v - (c.v + c.Ca);
        0 > d && b.Sa == c.Sa && (c.Ca = Math.max(0, c.Ca + d));
        a.T.push(b)
    }
}, Ge = function(a, b) {
    var c = null;
    x(sc(b), function(a) {
        if ("window" == a.localName) {
            c && c.text && Ie(this, c);
            var b = c = new Ce,
                f;
            t: {
                f = parseInt(a.getAttribute("ap"), 10);
                if (!isNaN(f)) for (var h in De) if (De[h] == f) {
                    f = De[h];
                    break t
                }
                f = 7
            }
            b.Sa = f;
            c.v = parseInt(a.getAttribute("t"),
                10)
        } else "text" == a.localName && Je(this, a, c) && (c.Ca = parseInt(a.getAttribute("d"), 10))
    }, a);
    Ie(a, c);
    a.kc = c.v
}, Je = function(a, b, c) {
    var d = parseInt(b.getAttribute("t"), 10);
    if (c.v != d) return a.a.log(E, "Only Pop On mode is supported", void 0), !1;
    var e = !1;
    x(b.childNodes, function(a) {
        3 == a.nodeType && (c.text = c.text ? c.text + ("\n" + a.nodeValue) : a.nodeValue, e = !0)
    });
    return e
}, Ee = new bd("//video.google.com/timedtext?op=track&fmt=2");
Fe.prototype.a = G("lava.caption.TimedText");
var Ke = null,
    Le = null,
    Me = function(a) {
        if (!fa(a)) throw Error("encodeByteArray takes an array as a parameter");
        if (!Ke) {
            Ke = {};
            Le = {};
            for (var b = 0; 65 > b; b++) Ke[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b), Le[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(b)
        }
        for (var b = Le, c = [], d = 0; d < a.length; d += 3) {
            var e = a[d],
                f = d + 1 < a.length,
                h = f ? a[d + 1] : 0,
                k = d + 2 < a.length,
                q = k ? a[d + 2] : 0,
                N = e >> 2,
                e = (e & 3) << 4 | h >> 4,
                h = (h & 15) << 2 | q >> 6,
                q = q & 63;
            k || (q = 64, f || (h = 64));
            c.push(b[N], b[e],
                b[h], b[q])
        }
        return c.join("")
    };
var Ne = function(a) {
    this.Ea = a;
    this.h = {}
};
t(Ne, I);
var Oe = [];
g = Ne.prototype;
g.M = function(a, b, c, d, e) {
    n(b) || (Oe[0] = b, b = Oe);
    for (var f = 0; f < b.length; f++) {
        var h = M(a, b[f], c || this, d || !1, e || this.Ea || this);
        if (!h) break;
        this.h[h.key] = h
    }
    return this
};
g.Vb = function(a, b, c, d, e) {
    if (n(b)) for (var f = 0; f < b.length; f++) this.Vb(a, b[f], c, d, e);
    else a = Nc(a, b, c || this, d, e || this.Ea || this), this.h[a.key] = a;
    return this
};
g.Tc = function(a, b, c, d, e) {
    if (n(b)) for (var f = 0; f < b.length; f++) this.Tc(a, b[f], c, d, e);
    else e = e || this.Ea || this, c = Jc(c || this), d = !! d, b = zc(a) ? a.fb(b, c, d, e) : a ? (a = Pc(a)) ? a.fb(b, c, d, e) : null : null, b && (Qc(b), delete this.h[b.key]);
    return this
};
g.Ia = function() {
    Ra(this.h, Qc);
    this.h = {}
};
g.f = function() {
    Ne.q.f.call(this);
    this.Ia()
};
g.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
};
var Pe = function() {};
da(Pe);
Pe.prototype.Ac = 0;
Pe.Bc();
var U = function(a) {
    Q.call(this);
    this.xa = a || jc();
    this.kf = Qe
};
t(U, Q);
U.prototype.gf = Pe.Bc();
var Qe = null;
g = U.prototype;
g.ha = null;
g.la = !1;
g.H = null;
g.kf = null;
g.Ie = null;
g.o = null;
g.F = null;
g.Gb = null;
g.Je = !1;
var Re = function(a) {
    return a.ha || (a.ha = ":" + (a.gf.Ac++).toString(36))
};
g = U.prototype;
g.Xc = function() {
    return this.H
};
g.getParent = function() {
    return this.o
};
g.zb = function(a) {
    if (this.o && this.o != a) throw Error("Method not supported");
    U.q.zb.call(this, a)
};
g.ia = function() {
    return this.xa
};
g.ma = function() {
    this.H = this.xa.createElement("div")
};
var Te = function(a) {
    a.la = !0;
    Se(a, function(a) {
        !a.la && a.Xc() && Te(a)
    })
}, Ue = function(a) {
    Se(a, function(a) {
        a.la && Ue(a)
    });
    a.Hb && a.Hb.Ia();
    a.la = !1
};
U.prototype.f = function() {
    this.la && Ue(this);
    this.Hb && (this.Hb.n(), delete this.Hb);
    Se(this, function(a) {
        a.n()
    });
    !this.Je && this.H && rc(this.H);
    this.o = this.Ie = this.H = this.Gb = this.F = null;
    U.q.f.call(this)
};
var Se = function(a, b) {
    a.F && x(a.F, b, void 0)
};
U.prototype.removeChild = function(a, b) {
    if (a) {
        var c = p(a) ? a : Re(a),
            d;
        this.Gb && c ? (d = this.Gb, d = (c in d ? d[c] : void 0) || null) : d = null;
        a = d;
        if (c && a) {
            d = this.Gb;
            c in d && delete d[c];
            Ha(this.F, a);
            b && (Ue(a), a.H && rc(a.H));
            c = a;
            if (null == c) throw Error("Unable to set parent component");
            c.o = null;
            U.q.zb.call(c, null)
        }
    }
    if (!a) throw Error("Child is not in parent component");
    return a
};
U.prototype.Hd = function(a) {
    for (var b = []; this.F && 0 != this.F.length;) b.push(this.removeChild(this.F ? this.F[0] || null : null, a));
    return b
};
var Ve = function(a) {
    U.call(this, a);
    this.oc = []
};
t(Ve, U);
Ve.prototype.od = function(a) {
    this.ia().Hd(this.oc[a])
};
var We = function(a) {
    Ra(De, a.od, a)
};
Ve.prototype.ma = function() {
    var a = this.ia().ma("div", {
        "class": "lava-ui-caption-overlay"
    });
    Xe(this, a);
    this.H = a
};
var Ye = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ],
    Xe = function(a, b) {
        x(["top", "middle", "bottom"], function(a, d) {
            var e = Re(this) + "." + ("lava-ui-caption-" + a),
                e = this.ia().ma("div", {
                    id: e,
                    "class": "lava-ui-caption-block"
                });
            this.ia().appendChild(b, e);
            Ze(this, a, Ye[d], e)
        }, a)
    }, Ze = function(a, b, c, d) {
        x(["left", "center", "right"], function(a, f) {
            var h = b + "-" + a,
                k = Re(this) + "." + ("lava-ui-caption-" + h),
                h = this.ia().ma("div", {
                    id: k,
                    "class": "lava-ui-caption-" + h
                }),
                k = c[f],
                q = this.ia(),
                N = q.ma("div", {
                    "class": "lava-ui-caption-text"
                });
            q.appendChild(h,
                N);
            this.oc[k] = N;
            this.ia().appendChild(d, h)
        }, a)
    };
var $e = function(a, b, c) {
    this.Jc = a;
    this.Ja = b || 0;
    this.Ea = c;
    this.af = r(this.df, this)
};
t($e, I);
g = $e.prototype;
g.ha = 0;
g.f = function() {
    $e.q.f.call(this);
    this.stop();
    delete this.Jc;
    delete this.Ea
};
g.start = function(a) {
    this.stop();
    this.ha = Yc(this.af, m(a) ? a : this.Ja)
};
g.stop = function() {
    this.Id() && l.clearTimeout(this.ha);
    this.ha = 0
};
g.Id = function() {
    return 0 != this.ha
};
g.df = function() {
    this.ha = 0;
    this.Jc && this.Jc.call(this.Ea)
};
var af = function(a) {
    this.a = G("lava.player.CaptionPlayer");
    this.Ab = a;
    this.V = null;
    this.qa = this.ca = 0;
    this.N = !1;
    this.L = new ab
};
t(af, I);
af.prototype.f = function() {
    af.q.f.call(this);
    $a(this.L, function(a) {
        a.S.n()
    })
};
var bf = function(a, b) {
    var c = s();
    a.a.info("setTimedText() called at " + c);
    (a.V = b) || We(a.Ab);
    a.seek(a.N ? c - a.ca : a.qa)
};
af.prototype.play = function() {
    if (!this.N) {
        this.N = !0;
        var a = s();
        this.ca = a - this.qa;
        this.a.info("play() called at " + a + "ms; start timestamp is " + this.ca);
        this.L.Xa() ? cf(this) : df(this, this.qa)
    }
};
af.prototype.stop = function() {
    if (this.N) {
        this.N = !1;
        var a = s();
        this.qa = a - this.ca;
        this.a.info("stop() called at " + a + "ms; media-relative time is " + this.qa);
        $a(this.L, function(a) {
            a.S.stop()
        })
    }
};
af.prototype.seek = function(a) {
    var b = s();
    this.qa = a;
    this.ca = b - a;
    this.a.info("seek(" + a + ") called at " + b + "ms; start timestamp is " + this.ca);
    $a(this.L, function(a) {
        a.S.n()
    });
    this.L.clear();
    this.V && (We(this.Ab), He(this.V, a), cf(this))
};
var ef = function(a, b) {
    a.N ? (a.ca = s() - b, df(a, b)) : a.qa = b
}, cf = function(a) {
    if (a.V) {
        var b = 0 > a.V.Ra || a.V.Ra >= a.V.T.length ? null : a.V.T[a.V.Ra++];
        if (b) {
            a.a.log(Ib, "Processing window " + b, void 0);
            var c = s() - a.ca,
                d = b.v - c,
                e = d + b.Ca;
            if (0 > e) cf(a);
            else {
                var f = {
                    startTime: c,
                    ic: d
                };
                f.S = new $e(r(a.Zd, a, b, f), d);
                (a.N || 0 > d) && f.S.start();
                a.L.add(f);
                c = {
                    startTime: c,
                    ic: e
                };
                c.S = new $e(r(a.Yd, a, b.Sa, c), e);
                a.N && c.S.start();
                a.L.add(c)
            }
        } else a.a.info("No more caption windows to be processed.")
    }
}, df = function(a, b) {
    $a(a.L, function(a) {
        var d = a.ic - (b - a.startTime);
        this.a.log(F, "Rescheduling delay (" + a.startTime + ", " + a.ic + ") to fire in " + d + "ms", void 0);
        a.S.start(d)
    }, a)
};
af.prototype.Zd = function(a, b) {
    this.a.log(Ib, "Showing window " + a, void 0);
    b.S.n();
    this.L.remove(b);
    var c = this.Ab.oc[a.Sa];
    c && (c.innerHTML = a.text);
    cf(this)
};
af.prototype.Yd = function(a, b) {
    this.a.log(Ib, "Clearing anchor point " + a, void 0);
    b.S.n();
    this.L.remove(b);
    this.Ab.od(a)
};
var gf = function(a) {
    this.c = a;
    this.C = !1;
    this.Ec = 0;
    this.nb = this.ba = ff(this);
    this.Fc = 0.5;
    this.Gc = new Xc(1E3 * this.Fc);
    this.Gc.pd = r(this.yc, this);
    this.Gc.start();
    J(this, this.Gc);
    this.dc = null
};
t(gf, I);
gf.prototype.getTime = function() {
    var a = s() / 1E3;
    return this.C ? this.ba + a - this.Ec : this.ba
};
gf.prototype.Yc = function() {};
gf.prototype.yc = function() {
    var a = !1,
        b = ff(this);
    if (0.001 >= Math.abs(b - this.nb)) this.C ? (this.C = !1, this.ba = b, a = !0) : v(0.001 >= Math.abs(b - this.nb));
    else {
        var c = s() / 1E3;
        if (Math.abs((this.C ? this.ba + c - this.Ec : this.ba) - (b - this.Fc)) <= (this.Fc || 1E-6)) this.C || (this.C = !0, this.Ec = c, a = !0);
        else {
            if (null != this.dc && c < this.dc + 3) return;
            this.C = !1;
            this.ba = b;
            a = !0
        }
    }
    this.nb = b;
    a && this.Yc()
};
var ff = function(a) {
    a = m(a.c.getCurrentTime) ? a.c.getCurrentTime() : 0;
    0.15 >= a && (a = 0);
    return a
};
var hf = function(a, b, c, d) {
    Q.call(this);
    this.a = G("lava.player.YtPlayer");
    this.J = c;
    this.Zc = b;
    b = nc("div", {
        style: "position:absolute;width:100%;height:100%"
    });
    (p(a) ? document.getElementById(a) : a).appendChild(b);
    this.m = new YT.Player(b, {
        playerVars: {
            controls: "0",
            ps: "play",
            showinfo: "0",
            nologo: "1",
            rel: "0"
        },
        events: {
            onError: r(this.Qd, this),
            onNewLicenseSession: r(this.Td, this),
            onReady: r(this.Rd, this, d),
            onStateChange: r(this.Sd, this)
        }
    });
    this.u = null;
    d = this.ac = new Ve;
    a = p(a) ? document.getElementById(a) : a;
    if (d.la) throw Error("Component already rendered");
    d.H || d.ma();
    a ? a.insertBefore(d.H, null) : d.xa.ka.body.appendChild(d.H);
    d.o && !d.o.la || Te(d);
    J(this, this.ac);
    this.G = new af(this.ac);
    J(this, this.G);
    this.p = 0;
    this.$b = 1;
    this.Zb = !1;
    this.K = new gf(this.m);
    this.K.Yc = r(this.Ud, this);
    J(this, this.K);
    this.kb = !1
};
t(hf, Q);
var jf = {
        Bf: -1,
        pe: 0,
        xf: 1,
        wf: 2,
        oe: 3,
        sf: 5
    }, kf = [],
    lf = 0,
    mf = G("lava.player.YtPlayer"),
    pf = function(a, b, c, d, e) {
        switch (lf) {
            case 0:
                mf.info("Loading the YT API.");
                window.onYouTubeIframeAPIReady = nf;
                kf.push(na(pf, a, b, c, d));
                lf = 1;
                m(e) || (e = "//www.youtube.com/iframe_api");
                a = Fd(e);
                zd(a, null, qf, void 0);
                break;
            case 1:
                kf.push(na(pf, a, b, c, d));
                break;
            case 2:
                mf.info("Creating new YT player");
                new hf(a, b, c, d);
                break;
            case 3:
                l.setTimeout(na(d, null), 0);
                break;
            default:
                throw Error("Unknown API state");
        }
    };
g = hf.prototype;
g.load = function(a) {
    this.a.info("load(" + a + ")");
    if (this.Zc) {
        var b = (ad(a)[5] || null).match(/^\/api\/manifest\/dash\/id\/(([0-9a-fA-F])+)\//);
        if (!b || 2 > b.length) throw Error("Unable to find video ID in the manifest URL");
        b = b[1];
        if (16 < b.length) throw Error("Input larger than 64 bits");
        for (var b = Array(16 - b.length + 1).join("0") + b, c = [], d = 0; d < b.length - 1; d += 2) c.push(parseInt(b.charAt(d) + b.charAt(d + 1), 16));
        this.U = Me(c).replace(/\.*$/, "");
        this.a.log(F, "ID of the video to be loaded: " + this.U, void 0);
        this.m.cueVideoByPlayerVars({
            cenchd: "1",
            dash: "1",
            dashmpd: a,
            videoId: this.U
        })
    } else this.U = a, this.m.cueVideoById(a);
    bf(this.G, null);
    this.u = null;
    a = new Ae(this.U);
    a.load(r(this.de, this, a));
    this.p = 1
};
g.play = function(a) {
    this.a.info("play(" + a + ")");
    if (0 != this.p) {
        if (null != a) {
            this.m.seekTo(a, !0);
            var b = this.K;
            b.ba = a;
            b.nb = a;
            b.C = !1;
            b.dc = s() / 1E3;
            this.G.seek(1E3 * a)
        }
        1 == this.p && (this.m.playVideo(), this.p = 2, this.J.log("play", {
            offs: m(a) ? "" + a : "",
            ytid: this.U
        }))
    }
};
g.stop = function() {
    this.a.info("stop()");
    2 == this.p && (this.m.pauseVideo(), this.p = 1, this.J.log("stop", {
        offs: this.getCurrentTime(),
        ytid: this.U
    }))
};
g.xb = function() {
    return this.p
};
g.getCurrentTime = function() {
    return this.K.getTime()
};
g.getDuration = function() {
    return this.m.getDuration()
};
g.getVolume = function() {
    return this.$b
};
g.setVolume = function(a) {
    this.$b = a;
    this.m.setVolume(100 * a)
};
g.isMuted = function() {
    return this.Zb
};
g.setMuted = function(a) {
    (this.Zb = a) ? this.m.mute() : this.m.unMute()
};
g.uc = function() {
    return this.u
};
var rf = function(a, b) {
    if (a.u) {
        var c = a.u[b];
        c ? (c = new Fe(c), c.load(r(a.Le, a, c))) : a.a.log(E, "No track with ID " + b, void 0)
    } else a.a.log(E, "Trying to select track " + b + ", but no tracks are loaded", void 0)
}, nf = function() {
    lf = 2;
    sf()
}, qf = function() {
    lf = 3;
    sf()
}, sf = function() {
    x(kf, function(a) {
        a()
    });
    kf = []
};
g = hf.prototype;
g.Rd = function(a) {
    console.log("license intercept Rd");
    console.log(this.m);
    this.Zc && this.m.enableLicenseIntercept();
    this.$b = this.m.getVolume() / 100;
    this.Zb = this.m.isMuted();
    a(this)
};
g.Sd = function(a) {
    a = a.data;
    this.a.log(F, "Internal player state changed: " + a, void 0);
    a == jf.oe ? this.kb || (this.kb = !0, this.qe = s(), this.J.log("buffering_start", {
        offs: this.getCurrentTime(),
        ytid: this.U
    })) : this.kb && (this.kb = !1, this.J.log("buffering_end", {
        ytid: this.U,
        duration: s() - this.qe
    }));
    a == jf.pe && (this.J.log("playback_ended", {
        ytid: this.U
    }), this.p = 0, this.dispatchEvent(new ae("state")), this.a.info("Stopping video to prevent content decryption requests."), this.m.stopVideo())
};
g.Ud = function() {
    this.K.C && !this.G.N ? (this.G.play(), ef(this.G, 1E3 * this.K.getTime())) : !this.K.C && this.G.N && (this.G.stop(), ef(this.G, 1E3 * this.K.getTime()));
    this.dispatchEvent(new ae("time"))
};
g.Td = function(a) {
    a = a.data;
    this.a.info("A new license session detected: " + a.sessionId);
    this.dispatchEvent(new $d(a.request, a.sessionId, a.url))
};
g.de = function(a) {
    this.u = Be(a);
    this.a.info("Fetched " + this.u.length + " tracks.");
    this.dispatchEvent(new ae("tracks"))
};
g.Le = function(a) {
    bf(this.G, a)
};
g.Qd = function(a) {
    this.a.log(D, "Player error: " + a.data, void 0);
    this.stop();
    this.m.stopVideo();
    this.p = 0;
    this.dispatchEvent("error")
};
var uf = function(a) {
    var b = a;
    if (a instanceof Array) b = [], tf(b, a);
    else if (a instanceof Object) {
        var c = b = {}, d;
        for (d in c) c.hasOwnProperty(d) && delete c[d];
        for (var e in a) a.hasOwnProperty(e) && (c[e] = uf(a[e]))
    }
    return b
}, tf = function(a, b) {
    if (a !== b) {
        a.length = 0;
        a.length = b.length;
        for (var c = 0; c < b.length; ++c) b.hasOwnProperty(c) && (a[c] = uf(b[c]))
    }
}, vf = function(a) {
    a[2] || (a[2] = []);
    return a[2]
};
var wf = function(a) {
    this.b = a || []
}, xf = function(a) {
    this.b = a || []
}, yf = function(a) {
    this.b = a || []
}, zf = function(a) {
    this.b = a || []
};
g = wf.prototype;
g.Tb = function(a) {
    tf(this.b, a.b)
};
g.Kb = function() {
    return this.b
};
g.getKey = function() {
    var a = this.b[0];
    return null != a ? a : ""
};
g.da = function() {
    var a = this.b[1];
    return null != a ? a : ""
};
g.Ya = function(a) {
    this.b[1] = a
};
xf.prototype.Tb = function(a) {
    tf(this.b, a.b)
};
xf.prototype.Kb = function() {
    return this.b
};
var Af = function(a) {
    var b = s().toString();
    a.b[0] = b
};
xf.prototype.da = function(a) {
    return new wf(vf(this.b)[a])
};
yf.prototype.Tb = function(a) {
    tf(this.b, a.b)
};
yf.prototype.Kb = function() {
    return this.b
};
zf.prototype.Tb = function(a) {
    tf(this.b, a.b)
};
zf.prototype.Kb = function() {
    return this.b
};
var Bf = function(a) {
    this.e = a || "//play.googleapis.com/log?format=json";
    this.Ke = a ? 1 : 10;
    a = this.Q = new zf;
    a.b[0] = a.b[0] || [];
    (new yf(a.b[0])).b[0] = 1;
    this.Q.b[1] = 3;
    this.rc = new Ne(this);
    J(this, this.rc);
    this.w = new Xc(1E4);
    J(this, this.w);
    this.rc.M(this.w, "tick", rd(this.flush));
    this.w.start()
};
t(Bf, I);
Bf.prototype.f = function() {
    this.flush();
    this.rc.Ia();
    Bf.q.f.call(this)
};
Bf.prototype.log = function(a) {
    var b = [];
    vf(this.Q.b).push(b);
    (new xf(b)).Tb(a);
    (this.Q.b[2] ? this.Q.b[2].length : 0) >= this.Ke && this.flush()
};
Bf.prototype.flush = function() {
    if (0 < (this.Q.b[2] ? this.Q.b[2].length : 0)) {
        var a = this.Q,
            b = s().toString();
        a.b[3] = b;
        a = this.e;
        b = [];
        fe(new de, this.Q.Kb(), b);
        qe(a, null, "POST", b.join(""));
        delete this.Q.b[2]
    }
};
var Df = function(a, b) {
    this.Ye = Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ s()).toString(36);
    this.zd = Cf;
    this.Ad = b || new Bf;
    J(this, this.Ad)
};
t(Df, I);
Df.prototype.log = function(a, b) {
    var c = new xf;
    Af(c);
    c.b[1] = a;
    b && Ra(b, function(a, b) {
        this.zd(c, b, a)
    }, this);
    this.zd(c, "s", this.Ye);
    this.Ad.log(c)
};
var Cf = function(a, b, c) {
    if (b) {
        for (var d = 0; d < (a.b[2] ? a.b[2].length : 0); ++d) {
            var e = a.da(d);
            if (e.getKey() === b) {
                e.Ya(c);
                return
            }
        }
        d = [];
        vf(a.b).push(d);
        a = new wf(d);
        a.b[0] = b;
        a.Ya(c)
    }
};
var Ef = function() {
    this.Vc = Math.floor(2147483647 * Math.random());
    this.Ne = 0;
    this.Ma = new y
}, Gf = function(a, b, c) {
    console.log("license request (Gf)");
    c = Me(c);
    c = c.replace(/\.*$/, "");
    var d;
    d = a.Vc + 1;
    2147483647 < d && (d = 0);
    a.Vc = d;
    d = a.Vc;
    a.Ma.set(d, b);
    return Ff({
        cmd_id: d,
        type: "KEY_REQUEST",
        method: "WV-token",
        requests: [c]
    })
}, Hf = function(a, b) {
    var c = b.Eb || "",
        d;
    v(b.c, "Player not created yet");
    d = b.c;
    c = {
        event_sequence: a.Ne++,
        state: d.xb(),
        current_time: d.getCurrentTime(),
        time_progress: d.K.C,
        duration: d.getDuration(),
        muted: b.isMuted(),
        volume: b.getVolume(),
        content_id: c
    };
    (d = b.getTitle()) && (c.title = d);
    (d = b.getContentInfo()) && (c.content_info = d);
    (d = b.uc()) && 0 < d.length && (c.tracks = d);
    d = b.Z;
    null != d && (c.error = {
        domain: "ramp",
        code: d
    });
    return c
}, Ff = function(a) {
    return JSON.stringify(["ramp", a])
};
var V = function(a, b) {
        this.l = [];
        this.k = b;
        for (var c = !0, d = a.length - 1; 0 <= d; d--) {
            var e = a[d] | 0;
            c && e == b || (this.l[d] = e, c = !1)
        }
    }, If = {}, Jf = function(a) {
        if (-128 <= a && 128 > a) {
            var b = If[a];
            if (b) return b
        }
        b = new V([a | 0], 0 > a ? -1 : 0); - 128 <= a && 128 > a && (If[a] = b);
        return b
    }, Y = function(a) {
        if (isNaN(a) || !isFinite(a)) return W;
        if (0 > a) return X(Y(-a));
        for (var b = [], c = 1, d = 0; a >= c; d++) b[d] = a / c | 0, c *= 4294967296;
        return new V(b, 0)
    }, Kf = function(a, b) {
        if (0 == a.length) throw Error("number format error: empty string");
        var c = b || 10;
        if (2 > c || 36 < c) throw Error("radix out of range: " + c);
        if ("-" == a.charAt(0)) return X(Kf(a.substring(1), c));
        if (0 <= a.indexOf("-")) throw Error('number format error: interior "-" character');
        for (var d = Y(Math.pow(c, 8)), e = W, f = 0; f < a.length; f += 8) {
            var h = Math.min(8, a.length - f),
                k = parseInt(a.substring(f, f + h), c);
            8 > h ? (h = Y(Math.pow(c, h)), e = e.multiply(h).add(Y(k))) : (e = e.multiply(d), e = e.add(Y(k)))
        }
        return e
    }, W = Jf(0),
    Lf = Jf(1),
    Mf = Jf(16777216),
    Nf = function(a) {
        if (-1 == a.k) return -Nf(X(a));
        for (var b = 0, c = 1, d = 0; d < a.l.length; d++) b += Of(a, d) * c, c *= 4294967296;
        return b
    };
V.prototype.toString = function(a) {
    a = a || 10;
    if (2 > a || 36 < a) throw Error("radix out of range: " + a);
    if (Pf(this)) return "0";
    if (-1 == this.k) return "-" + X(this).toString(a);
    for (var b = Y(Math.pow(a, 6)), c = this, d = "";;) {
        var e = Qf(c, b),
            c = Rf(c, e.multiply(b)),
            f = (0 < c.l.length ? c.l[0] : c.k).toString(a),
            c = e;
        if (Pf(c)) return f + d;
        for (; 6 > f.length;) f = "0" + f;
        d = "" + f + d
    }
};
var Z = function(a, b) {
    return 0 > b ? 0 : b < a.l.length ? a.l[b] : a.k
}, Of = function(a, b) {
    var c = Z(a, b);
    return 0 <= c ? c : 4294967296 + c
}, Pf = function(a) {
    if (0 != a.k) return !1;
    for (var b = 0; b < a.l.length; b++) if (0 != a.l[b]) return !1;
    return !0
};
V.prototype.compare = function(a) {
    a = Rf(this, a);
    return -1 == a.k ? -1 : Pf(a) ? 0 : 1
};
var X = function(a) {
    for (var b = a.l.length, c = [], d = 0; d < b; d++) c[d] = ~a.l[d];
    return (new V(c, ~a.k)).add(Lf)
};
V.prototype.add = function(a) {
    for (var b = Math.max(this.l.length, a.l.length), c = [], d = 0, e = 0; e <= b; e++) {
        var f = d + (Z(this, e) & 65535) + (Z(a, e) & 65535),
            h = (f >>> 16) + (Z(this, e) >>> 16) + (Z(a, e) >>> 16),
            d = h >>> 16,
            f = f & 65535,
            h = h & 65535;
        c[e] = h << 16 | f
    }
    return new V(c, c[c.length - 1] & -2147483648 ? -1 : 0)
};
var Rf = function(a, b) {
    return a.add(X(b))
};
V.prototype.multiply = function(a) {
    if (Pf(this) || Pf(a)) return W;
    if (-1 == this.k) return -1 == a.k ? X(this).multiply(X(a)) : X(X(this).multiply(a));
    if (-1 == a.k) return X(this.multiply(X(a)));
    if (0 > this.compare(Mf) && 0 > a.compare(Mf)) return Y(Nf(this) * Nf(a));
    for (var b = this.l.length + a.l.length, c = [], d = 0; d < 2 * b; d++) c[d] = 0;
    for (d = 0; d < this.l.length; d++) for (var e = 0; e < a.l.length; e++) {
        var f = Z(this, d) >>> 16,
            h = Z(this, d) & 65535,
            k = Z(a, e) >>> 16,
            q = Z(a, e) & 65535;
        c[2 * d + 2 * e] += h * q;
        Sf(c, 2 * d + 2 * e);
        c[2 * d + 2 * e + 1] += f * q;
        Sf(c, 2 * d + 2 * e + 1);
        c[2 * d + 2 * e + 1] += h * k;
        Sf(c, 2 * d + 2 * e + 1);
        c[2 * d + 2 * e + 2] += f * k;
        Sf(c, 2 * d + 2 * e + 2)
    }
    for (d = 0; d < b; d++) c[d] = c[2 * d + 1] << 16 | c[2 * d];
    for (d = b; d < 2 * b; d++) c[d] = 0;
    return new V(c, 0)
};
var Sf = function(a, b) {
    for (;
        (a[b] & 65535) != a[b];) a[b + 1] += a[b] >>> 16, a[b] &= 65535
}, Qf = function(a, b) {
    if (Pf(b)) throw Error("division by zero");
    if (Pf(a)) return W;
    if (-1 == a.k) return -1 == b.k ? Qf(X(a), X(b)) : X(Qf(X(a), b));
    if (-1 == b.k) return X(Qf(a, X(b)));
    for (var c = W, d = a; 0 <= d.compare(b);) {
        for (var e = Math.max(1, Math.floor(Nf(d) / Nf(b))), f = Math.ceil(Math.log(e) / Math.LN2), f = 48 >= f ? 1 : Math.pow(2, f - 48), h = Y(e), k = h.multiply(b); - 1 == k.k || 0 < k.compare(d);) e -= f, h = Y(e), k = h.multiply(b);
        Pf(h) && (h = Lf);
        c = c.add(h);
        d = Rf(d, k)
    }
    return c
}, Tf = function(a, b) {
    for (var c = Math.max(a.l.length, b.l.length), d = [], e = 0; e < c; e++) d[e] = Z(a, e) | Z(b, e);
    return new V(d, a.k | b.k)
};
V.prototype.shiftLeft = function(a) {
    var b = a >> 5;
    a %= 32;
    for (var c = this.l.length + b + (0 < a ? 1 : 0), d = [], e = 0; e < c; e++) d[e] = 0 < a ? Z(this, e - b) << a | Z(this, e - b - 1) >>> 32 - a : Z(this, e - b);
    return new V(d, this.k)
};
var Uf = function(a, b) {
    this.Wa = a;
    this.Fa = b;
    this.ja = ""
}, Xf = function(a) {
    try {
        return -1 != a.indexOf(":") ? new Vf(a) : new Wf(a)
    } catch (b) {
        return null
    }
}, Wf = function(a) {
    var b = W;
    if (a instanceof V) {
        if (0 != a.k || 0 > a.compare(W) || 0 < a.compare(Yf)) throw Error("The address does not look like an IPv4.");
        b = Ua(a)
    } else {
        if (!Zf.test(a)) throw Error(a + " does not look like an IPv4 address.");
        var c = a.split(".");
        if (4 != c.length) throw Error(a + " does not look like an IPv4 address.");
        for (var d = 0; d < c.length; d++) {
            var e;
            e = c[d];
            var f = Number(e);
            e = 0 == f && /^[\s\xa0]*$/.test(e) ? NaN : f;
            if (isNaN(e) || 0 > e || 255 < e || 1 != c[d].length && 0 == c[d].lastIndexOf("0", 0)) throw Error("In " + a + ", octet " + d + " is not valid");
            e = Y(e);
            b = Tf(b.shiftLeft(8), e)
        }
    }
    Uf.call(this, b, 4)
};
t(Wf, Uf);
var Zf = /^[0-9.]*$/,
    Yf = Rf(Lf.shiftLeft(32), Lf);
Wf.prototype.toString = function() {
    if (this.ja) return this.ja;
    for (var a = Of(this.Wa, 0), b = [], c = 3; 0 <= c; c--) b[c] = String(a & 255), a >>>= 8;
    return this.ja = b.join(".")
};
var Vf = function(a) {
    var b = W;
    if (a instanceof V) {
        if (0 != a.k || 0 > a.compare(W) || 0 < a.compare($f)) throw Error("The address does not look like a valid IPv6.");
        b = Ua(a)
    } else {
        if (!ag.test(a)) throw Error(a + " is not a valid IPv6 address.");
        var c = a.split(":");
        if (-1 != c[c.length - 1].indexOf(".")) {
            a = new Wf(c[c.length - 1]);
            a = Of(Ua(a.Wa), 0);
            var d = [];
            d.push((a >>> 16 & 65535).toString(16));
            d.push((a & 65535).toString(16));
            Ga(c, c.length - 1);
            Ka(c, d);
            a = c.join(":")
        }
        d = a.split("::");
        if (2 < d.length || 1 == d.length && 8 != c.length) throw Error(a + " is not a valid IPv6 address.");
        if (1 < d.length) {
            c = d[0].split(":");
            d = d[1].split(":");
            1 == c.length && "" == c[0] && (c = []);
            1 == d.length && "" == d[0] && (d = []);
            var e = 8 - (c.length + d.length);
            if (1 > e) c = [];
            else {
                for (var f = [], h = 0; h < e; h++) f[h] = "0";
                Ka(c, f);
                Ka(c, d)
            }
        }
        if (8 != c.length) throw Error(a + " is not a valid IPv6 address");
        for (d = 0; d < c.length; d++) {
            e = Kf(c[d], 16);
            if (0 > e.compare(W) || 0 < e.compare(bg)) throw Error(c[d] + " in " + a + " is not a valid hextet.");
            b = Tf(b.shiftLeft(16), e)
        }
    }
    Uf.call(this, b, 6)
};
t(Vf, Uf);
var ag = /^([a-fA-F0-9]*:){2}[a-fA-F0-9:.]*$/,
    bg = Jf(65535),
    $f = Rf(Lf.shiftLeft(128), Lf);
Vf.prototype.toString = function() {
    if (this.ja) return this.ja;
    for (var a = [], b = 3; 0 <= b; b--) {
        var c = Of(this.Wa, b),
            d = c & 65535;
        a.push((c >>> 16).toString(16));
        a.push(d.toString(16))
    }
    for (var c = b = -1, e = d = 0, f = 0; f < a.length; f++) "0" == a[f] ? (e++, - 1 == c && (c = f), e > d && (d = e, b = c)) : (c = -1, e = 0);
    0 < d && (b + d == a.length && a.push(""), a.splice(b, d, ""), 0 == b && (a = [""].concat(a)));
    return this.ja = a.join(":")
};
var dg = function(a, b) {
    Q.call(this);
    this.$d = m(a) ? a : !0;
    this.lc = b || cg;
    this.Bb = this.lc(this.Va)
};
t(dg, Q);
g = dg.prototype;
g.A = null;
g.e = null;
g.t = void 0;
g.mc = !1;
g.Va = 0;
g.a = G("goog.net.WebSocket");
var cg = function(a) {
    return Math.min(1E3 * Math.pow(2, a), 6E4)
};
g = dg.prototype;
g.open = function(a, b) {
    v(l.WebSocket, "This browser does not support WebSocket");
    v(!this.isOpen(), "The WebSocket is already open");
    null != this.Da && l.clearTimeout(this.Da);
    this.Da = null;
    this.e = a;
    (this.t = b) ? (Qb(this.a, "Opening the WebSocket on " + this.e + " with protocol " + this.t), this.A = new WebSocket(this.e, this.t)) : (Qb(this.a, "Opening the WebSocket on " + this.e), this.A = new WebSocket(this.e));
    this.A.onopen = r(this.he, this);
    this.A.onclose = r(this.ee, this);
    this.A.onmessage = r(this.ge, this);
    this.A.onerror = r(this.fe,
        this)
};
g.close = function() {
    null != this.Da && l.clearTimeout(this.Da);
    this.Da = null;
    this.A && (Qb(this.a, "Closing the WebSocket."), this.mc = !0, this.A.close(), this.A = null)
};
g.send = function(a) {
    v(this.isOpen(), "Cannot send without an open socket");
    this.A.send(a)
};
g.isOpen = function() {
    return !!this.A && 1 == this.A.readyState
};
g.he = function() {
    Qb(this.a, "WebSocket opened on " + this.e);
    this.dispatchEvent("d");
    this.Va = 0;
    this.Bb = this.lc(this.Va)
};
g.ee = function(a) {
    Qb(this.a, "The WebSocket on " + this.e + " closed.");
    this.dispatchEvent("a");
    this.A = null;
    if (this.mc) Qb(this.a, "The WebSocket closed normally."), this.e = null, this.t = void 0;
    else {
        var b = this.a;
        b && b.log(D, "The WebSocket disconnected unexpectedly: " + a.data, void 0);
        this.$d && (Qb(this.a, "Seconds until next reconnect attempt: " + Math.floor(this.Bb / 1E3)), this.Da = Yc(r(this.open, this, this.e, this.t), this.Bb, this), this.Va++, this.Bb = this.lc(this.Va))
    }
    this.mc = !1
};
g.ge = function(a) {
    this.dispatchEvent(new eg(a.data))
};
g.fe = function(a) {
    a = a.data;
    var b = this.a;
    b && b.log(D, "An error occurred: " + a, void 0);
    this.dispatchEvent(new fg(a))
};
g.f = function() {
    dg.q.f.call(this);
    this.close()
};
var eg = function(a) {
    L.call(this, "c");
    this.message = a
};
t(eg, L);
var fg = function(a) {
    L.call(this, "b");
    this.data = a
};
t(fg, L);
var gg = function(a, b, c) {
    Q.call(this);
    this.fa = new dg(!0, function(a) {
        return Math.min(500 * Math.pow(1.5, a), 5E3)
    });
    J(this, this.fa);
    this.ue = b;
    this.Wa = p(a) ? Xf(a) : a;
    this.ve = c;
    this.Fb = new Ne(this);
    J(this, this.Fb);
    this.Fb.M(this.fa, "d", r(this.ze, this));
    this.Fb.M(this.fa, "a", r(this.xe, this));
    this.Fb.M(this.fa, "c", r(this.ye, this));
    a = "ws://" + this.Wa + ":8008/connection";
    this.a.info("WS Connecting to " + a);
    this.fa.open(a)
};
t(gg, Q);
g = gg.prototype;
g.a = G("lava.ramp.Server");
g.close = function() {
    this.fa.close()
};
g.$c = function(a) {
    a.n()
};
g.ye = function(a) {
    a = a.message;
    this.a.info("WS Received " + a);
    a = JSON.parse(a);
    switch (a.type) {
        case "CHANNELREQUEST":
            a = JSON.stringify({
                type: "CHANNELRESPONSE",
                requestId: a.requestId,
                action: 0
            });
            this.a.info("Reply " + a);
            this.fa.send(a);
            break;
        case "NEWCHANNEL":
            this.a.info("Connecting to " + a.URL);
            new hg(this, a.URL);
            break;
        default:
            this.a.log(D, "Unknown type " + a.type, void 0)
    }
};
g.ze = function() {
    this.a.info("Connected to Connection Service");
    var a = JSON.stringify({
        type: "REGISTER",
        version: 2,
        name: this.ue,
        pingInterval: this.ve,
        protocols: ["ramp", "play-movies"]
    });
    this.a.info("Registering " + a);
    this.fa.send(a)
};
g.xe = function() {
    this.a.info("Disconnected from Connection Service")
};
var hg = function(a, b) {
    Q.call(this);
    this.jb = a;
    this.e = b;
    this.Db = new Ne(this);
    J(this, this.Db);
    this.ea = new dg(!1);
    J(this, this.ea);
    this.Db.M(this.ea, "d", r(this.ce, this));
    this.Db.M(this.ea, "a", r(this.ae, this));
    this.Db.M(this.ea, "c", r(this.be, this));
    this.ea.zb(this);
    this.a.info("WS Data Connecting to " + b);
    this.ea.open(b);
    this.jc = 0
};
t(hg, Q);
g = hg.prototype;
g.a = G("lava.ramp.Server.Connection");
g.gd = function() {};
g.close = function() {
    this.ea.close()
};
g.send = function(a) {
    this.a.log(F, "WS Data sending " + a, void 0);
    this.ea.send(a)
};
g.onMessage = function(a) {
    this.a.log(F, "WS Data discarded " + a, void 0)
};
g.jd = function() {};
g.ce = function() {
    this.a.info("WS Data Connected to " + this.e);
    this.jc = 0;
    this.jb.$c(this)
};
g.be = function(a) {
    a = a.message;
    var b;
    this.a.log(F, "WS Data Received " + a, void 0);
    try {
        b = JSON.parse(a)
    } catch (c) {
        this.a.log(D, "Not valid JSON " + a, void 0);
        return
    }
    if (n(b)) switch (a = b[0], b = b[1], a) {
        case "ramp":
            this.onMessage(b);
            break;
        case "play-movies":
            b = b.type;
            switch (b) {
                case "HELLO":
                    this.gd();
                    break;
                default:
                    this.a.info("Ignoring message with type: " + b)
            }
            break;
        case "cm":
            switch (b.type) {
                case "pong":
                    this.a.info("heartbeat message from " + this.e), this.jc = 0
            }
            break;
        default:
            this.a.info("Ignoring payload with namespace: " + a)
    } else this.a.log(D, "Payload is not an array: " + a, void 0)
};
g.ae = function() {
    this.a.info("WS Data Closed to " + this.e);
    this.jd()
};
var ig = function(a) {
    U.call(this, a);
    Zd(a, "playback-overlay-cover");
    this.ud = Zd(a, "playback-overlay-title");
    this.X = Zd(a, "playback-overlay-status")
};
t(ig, U);
ig.prototype.f = function() {
    ig.q.f.call(this);
    this.X = this.ud = null
};
var jg = function(a, b) {
    a.xa.vc(a.ud, b)
};
var $ = function(a, b, c, d, e, f) {
    $b.reset(0);
    Vd();
    Pb().pc(Jb);
    f = f || new Yd;
    this.J = new Df;
    J(this, this.J);
    this.J.log("app_start");
    M(f.ka.parentWindow || f.ka.defaultView, "pagehide", function() {
        this.J.log("app_stop");
        this.n()
    }, !1, this);
    this.bc = bc("First connection");
    this.ya = Md();
    this.Y = [];
    this.ib = null;
    this.bd = Zd(f, b);
    this.ad = Zd(f, d);
    this.Yb = new ig(f);
    this.Vd = Zd(f, "playback-overlay");
    this.Na = new Xc(5E3);
    J(this, this.Na);
    M(this.Na, "tick", r(this.le, this));
    this.X = Zd(f, e);
    this.lb();
    this.qb = new Xc(3E5);
    J(this, this.qb);
    M(this.qb, "tick", this.je, !1, this);
    kg(this);
    this.jb = new gg("127.0.0.1", "PlayMovies", 5);
    J(this, this.jb);
    this.jb.$c = r(this.ie, this);
    this.t = new Ef;
    this.Xb = new sd(0, this);
    this.oa = new sd(0, this);
    this.oa.La();
    this.Pd = bc("Player initialization");
    pf(c, !0, this.J, r(this.ke, this));
    Uc(Zd(f, a), !0)
};
t($, I);
var lg = nd("https://play.google.com/video/license/GetCencLicense");
g = $.prototype;
g.c = null;
g.Eb = null;
g.Ib = null;
g.xc = null;
g.u = null;
g.wc = 0;
g.Z = null;
g.a = G("lava.ui.Eureka");
g.getTitle = function() {
    return this.Ib
};
g.getContentInfo = function() {
    return this.xc
};
g.uc = function() {
    return this.u
};
g.getVolume = function() {
    if (!this.ya.da()) return this.c.getVolume();
    var a = (this.ya.da() || null).getVolume();
    return null != a ? a : this.c.getVolume()
};
g.isMuted = function() {
    if (!this.ya.da()) return this.c.isMuted();
    var a = (this.ya.da() || null).getMuted();
    return null != a ? a : this.c.isMuted()
};
g.ke = function(a) {
    a ? (cc(this.Pd), this.a.info("Trace after initializing the player:\n" + $b.toString()), this.c = a, M(a, "update", r(this.se, this)), M(a, "keytokenrequest", r(this.re, this)), M(a, "error", r(this.kd, this)), this.Xb.La()) : (this.a.log(D, "Failed to create YtPlayer", void 0), tc(this.X, "An error occurred. Please try again later."), kg(this), Yc(window.close, 4E3))
};
g.ie = function(a) {
    null !== this.bc && (cc(this.bc), this.bc = null, this.a.info("Trace after obtaining the first connection:\n" + $b.toString()));
    this.Y.push(a);
    a.onMessage = r(this.Ae, this, a);
    a.jd = r(this.fd, this, a);
    a.gd = r(this.lb, this);
    this.lb();
    this.Na.enabled || this.Na.start()
};
g.Ae = function(a, b) {
    var c;
    switch (b.type) {
        case "LOAD":
            c = this.Ce;
            break;
        case "INFO":
            c = this.Fe;
            break;
        case "PLAY":
            c = this.De;
            break;
        case "SELECT_TRACKS":
            c = this.Ee;
            break;
        case "STOP":
            c = this.Ge;
            break;
        case "VOLUME":
            c = this.He;
            break;
        case "KEY_RESPONSE":
            c = this.Be
    }
    this.Xb.Ba || this.a.log(E, "Message of type " + b.type + " is waiting for the player to be created", void 0);
    c && Ad(this.Xb, r(c, this, a, b))
};
g.fd = function(a) {
    Ha(this.Y, a);
    var b = !0;
    a == this.ib && (this.ib = null, 0 < this.t.Ma.za() && (this.a.log(E, "Token connection closed.", void 0), mg(this), b = !1));
    a.n();
    0 == this.Y.length && this.Na.stop();
    b && this.lb()
};
g.Fe = function(a, b) {
    v(this.c, "Player not created yet");
    ng(this, a, b)
};
g.Ce = function(a, b) {
    v(this.c, "Player not created yet");
    this.Z = null;
    this.ib = a;
    this.t.Ma.clear();
    this.Eb = b.src;
    this.xc = b.content_info || null;
    this.Ib = b.title || null;
    jg(this.Yb, this.Ib || "");
    this.oa = new sd(0, this);
    Ad(this.oa, function() {
        ng(this, a, b);
        og(this, a)
    }, this);
    this.c.load(this.Eb);
    b.autoplay && this.c.play();
    pg(this)
};
g.De = function(a, b) {
    v(this.c, "Player not created yet");
    this.Z = null;
    this.wc = m(b.position) ? b.position : this.c.getCurrentTime();
    this.c.play(this.wc);
    pg(this);
    ng(this, a, b);
    og(this, a)
};
g.Ee = function(a, b) {
    v(this.c, "Player not created yet");
    this.Z = null;
    "enabled" in b && x(b.enabled, function(a) {
        this.u[a].selected = !0
    }, this);
    "disabled" in b && x(b.disabled, function(a) {
        this.u[a].selected = !1
    }, this);
    var c = Ca(this.u, function(a) {
        return a.selected
    });
    0 <= c ? (this.a.info("Selecting track " + c + ": " + this.u[c].lang), rf(this.c, c)) : (this.a.info("Clearing tracks"), bf(this.c.G, null));
    ng(this, a, b);
    og(this, a)
};
g.Ge = function() {
    v(this.c, "Player not created yet");
    this.Z = null;
    this.c.stop();
    pg(this);
    qg(this)
};
g.He = function(a, b) {
    if ("pending" == this.ya.xb()) this.a.log(E, "Ignoring SET_VOLUME; we don't yet know what to do with it.", void 0);
    else {
        v(this.c, "Player not created yet");
        this.Z = null;
        var c = this.ya.da() || null || this.c;
        null != b.volume && c.setVolume(b.volume);
        null != b.muted && c.setMuted(b.muted);
        ng(this, a, b);
        og(this, a)
    }
};
var kg = function(a) {
    a.bd.style.visibility = "hidden";
    a.ad.style.visibility = "visible";
    a.qb.start()
}, ng = function(a, b, c) {
    v(a.c, "Player not created yet");
    Ad(a.oa, function() {
        b.send(Ff({
            cmd_id: c.cmd_id,
            type: "RESPONSE",
            status: Hf(this.t, this)
        }))
    }, a)
};
$.prototype.Be = function(a, b) {
    v(this.c, "Player not created yet");
    console.log("Be()!");
    var c = this.t.Ma.get(b.cmd_id);
    this.t.Ma.remove(b.cmd_id);
    if (c) {
        var d = nd(c.gc),
            e = lg.W();
        e.O.extend(d.O);
        md(e, "robottoken", b.tokens[0]);
        d = this.c;
        c = c.hc;
        e = e.toString();
        d.a.info("Resuming license session " + c + " with license URL " + e);
        d.m.resumeLicenseSession(c, e)
    } else this.a.log(E, "Ignoring stale key session for cmd_id " + b.cmd_id, void 0)
};
var qg = function(a) {
    v(a.c, "Player not created yet");
    og(a, null)
}, og = function(a, b) {
    v(a.c, "Player not created yet");
    x(a.Y, function(a) {
        a != b && Ad(this.oa, function() {
            a.send(Ff({
                cmd_id: 0,
                type: "STATUS",
                status: Hf(this.t, this)
            }))
        }, this)
    }, a)
};
$.prototype.se = function(a) {
    v(this.c, "Player not created yet");
    "tracks" == a.Oe ? (this.u = Aa(this.c.uc(), function(a, c) {
        return {
            id: c,
            type: "captions",
            name: a.Xd,
            lang: a.lang,
            selected: !1
        }
    }, this), this.oa.Ba || this.oa.La()) : (pg(this), qg(this))
};
$.prototype.re = function(a) {
    var b = this.ib;
    b ? b.send(Gf(this.t, {
        hc: a.hc,
        gc: a.gc
    }, a.request)) : (this.a.log(D, "No token connection!", void 0), mg(this))
};
var mg = function(a) {
    tc(a.X, "Unable to fetch the content license. Please restart the movie.");
    kg(a);
    a.kd()
};
$.prototype.kd = function() {
    this.Z = -2;
    this.u = this.xc = this.Ib = this.Eb = null;
    qg(this)
};
$.prototype.lb = function() {
    0 == this.Y.length ? tc(this.X, "Ready") : tc(this.X, "Connected")
};
$.prototype.je = function() {
    this.a.info("No operation in last 300000ms; shutting down the application.");
    window.close()
};
$.prototype.le = function() {
    for (var a = this.Y.length, b = [], c = 0; c < a; c++) {
        var d;
        d = this.Y[c];
        3 < ++d.jc ? (d.a.info("Connection timed out to " + d.e), d = !1) : (d.a.info("Sending heartbeat to " + d.e), d.send(JSON.stringify(["cm", {
            type: "ping"
        }])), d = !0);
        d || b.push(this.Y[c])
    }
    b.forEach(this.fd, this)
};
var pg = function(a) {
        var b;
        b = a.c.xb();
        0 != b || null != a.Z ? 2 == b && (a.bd.style.visibility = "visible", a.ad.style.visibility = "hidden", a.qb.stop()) : kg(a);
        if (1 == b) {
            b = null;
            var c = a.c.getDuration();
            isNaN(c) || 0 == c || (b = c - a.c.getCurrentTime());
            var c = a.Yb,
                d = "Paused.";
            if (b) var e = Math.floor(b / 60),
                d = d + (" " + (0 < e ? e + "min" : Math.floor(b) + "sec") + " left.");
            c.xa.vc(c.X, d);
            b = !0
        } else {
            if (b = 2 == b) if (b = !a.c.K.C) b = a.c.getCurrentTime(), b = 0.001 >= Math.abs(b - a.wc);
            b ? (b = a.Yb, b.xa.vc(b.X, "Preparing playback..."), b = !0) : b = !1
        }
        Uc(a.Vd, b)
    }, rg = function() {
        new $("screen", "player-container", "player", "idle-screen", "idle-screen-status")
    }, sg = ["lava", "ui", "Eureka", "main"],
    tg = l;
sg[0] in tg || !tg.execScript || tg.execScript("var " + sg[0]);
for (var ug; sg.length && (ug = sg.shift());) sg.length || void 0 === rg ? tg = tg[ug] ? tg[ug] : tg[ug] = {} : tg[ug] = rg; 