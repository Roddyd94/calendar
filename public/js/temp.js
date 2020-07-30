var gapi = (window.gapi = window.gapi || {});
gapi._bs = new Date().getTime();
(function () {
	/*

    Copyright The Closure Library Authors.
    SPDX-License-Identifier: Apache-2.0
   */
	var aa =
			"function" == typeof Object.defineProperties
				? Object.defineProperty
				: function (a, b, c) {
						if (a == Array.prototype || a == Object.prototype)
							return a;
						a[b] = c.value;
						return a;
				  },
		ba = function (a) {
			a = [
				"object" == typeof globalThis && globalThis,
				a,
				"object" == typeof window && window,
				"object" == typeof self && self,
				"object" == typeof global && global,
			];
			for (var b = 0; b < a.length; ++b) {
				var c = a[b];
				if (c && c.Math == Math) return c;
			}
			throw Error("Cannot find global object");
		},
		ca = ba(this),
		fa = function (a, b) {
			if (b)
				a: {
					var c = ca;
					a = a.split(".");
					for (var d = 0; d < a.length - 1; d++) {
						var e = a[d];
						if (!(e in c)) break a;
						c = c[e];
					}
					a = a[a.length - 1];
					d = c[a];
					b = b(d);
					b != d &&
						null != b &&
						aa(c, a, { configurable: !0, writable: !0, value: b });
				}
		},
		ha = function (a) {
			var b = 0;
			return function () {
				return b < a.length
					? { done: !1, value: a[b++] }
					: { done: !0 };
			};
		};
	fa("Symbol", function (a) {
		if (a) return a;
		var b = function (e, f) {
			this.ea = e;
			aa(this, "description", {
				configurable: !0,
				writable: !0,
				value: f,
			});
		};
		b.prototype.toString = function () {
			return this.ea;
		};
		var c = 0,
			d = function (e) {
				if (this instanceof d)
					throw new TypeError("Symbol is not a constructor");
				return new b("jscomp_symbol_" + (e || "") + "_" + c++, e);
			};
		return d;
	});
	fa("Symbol.iterator", function (a) {
		if (a) return a;
		a = Symbol("Symbol.iterator");
		for (
			var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
					" "
				),
				c = 0;
			c < b.length;
			c++
		) {
			var d = ca[b[c]];
			"function" === typeof d &&
				"function" != typeof d.prototype[a] &&
				aa(d.prototype, a, {
					configurable: !0,
					writable: !0,
					value: function () {
						return ia(ha(this));
					},
				});
		}
		return a;
	});
	var ia = function (a) {
			a = { next: a };
			a[Symbol.iterator] = function () {
				return this;
			};
			return a;
		},
		ja = function (a, b) {
			a instanceof String && (a += "");
			var c = 0,
				d = {
					next: function () {
						if (c < a.length) {
							var e = c++;
							return { value: b(e, a[e]), done: !1 };
						}
						d.next = function () {
							return { done: !0, value: void 0 };
						};
						return d.next();
					},
				};
			d[Symbol.iterator] = function () {
				return d;
			};
			return d;
		};
	fa("Array.prototype.keys", function (a) {
		return a
			? a
			: function () {
					return ja(this, function (b) {
						return b;
					});
			  };
	});
	var m = this || self,
		ka = function (a) {
			var b = typeof a;
			return "object" != b
				? b
				: a
				? Array.isArray(a)
					? "array"
					: b
				: "null";
		},
		la = function (a, b, c) {
			return a.call.apply(a.bind, arguments);
		},
		ma = function (a, b, c) {
			if (!a) throw Error();
			if (2 < arguments.length) {
				var d = Array.prototype.slice.call(arguments, 2);
				return function () {
					var e = Array.prototype.slice.call(arguments);
					Array.prototype.unshift.apply(e, d);
					return a.apply(b, e);
				};
			}
			return function () {
				return a.apply(b, arguments);
			};
		},
		na = function (a, b, c) {
			na =
				Function.prototype.bind &&
				-1 != Function.prototype.bind.toString().indexOf("native code")
					? la
					: ma;
			return na.apply(null, arguments);
		},
		oa = function (a, b) {
			function c() {}
			c.prototype = b.prototype;
			a.prototype = new c();
			a.prototype.constructor = a;
			a.A = function (d, e, f) {
				for (
					var g = Array(arguments.length - 2), h = 2;
					h < arguments.length;
					h++
				)
					g[h - 2] = arguments[h];
				return b.prototype[e].apply(d, g);
			};
		},
		pa = function (a) {
			return a;
		},
		qa = function (a) {
			var b = null,
				c = m.trustedTypes;
			if (!c || !c.createPolicy) return b;
			try {
				b = c.createPolicy(a, {
					createHTML: pa,
					createScript: pa,
					createScriptURL: pa,
				});
			} catch (d) {
				m.console && m.console.error(d.message);
			}
			return b;
		};
	var q = function (a) {
		if (Error.captureStackTrace) Error.captureStackTrace(this, q);
		else {
			var b = Error().stack;
			b && (this.stack = b);
		}
		a && (this.message = String(a));
	};
	oa(q, Error);
	q.prototype.name = "CustomError";
	var ra = function (a, b) {
		a = a.split("%s");
		for (var c = "", d = a.length - 1, e = 0; e < d; e++)
			c += a[e] + (e < b.length ? b[e] : "%s");
		q.call(this, c + a[d]);
	};
	oa(ra, q);
	ra.prototype.name = "AssertionError";
	var sa = function (a, b, c, d) {
			var e = "Assertion failed";
			if (c) {
				e += ": " + c;
				var f = d;
			} else a && ((e += ": " + a), (f = b));
			throw new ra("" + e, f || []);
		},
		ta = function (a, b, c) {
			a || sa("", null, b, Array.prototype.slice.call(arguments, 2));
			return a;
		},
		ua = function (a, b) {
			throw new ra(
				"Failure" + (a ? ": " + a : ""),
				Array.prototype.slice.call(arguments, 1)
			);
		},
		va = function (a, b, c) {
			"string" !== typeof a &&
				sa(
					"Expected string but got %s: %s.",
					[ka(a), a],
					b,
					Array.prototype.slice.call(arguments, 2)
				);
		};
	var wa = function (a, b) {
		a: {
			try {
				var c = a && a.ownerDocument,
					d = c && (c.defaultView || c.parentWindow);
				d = d || m;
				if (d.Element && d.Location) {
					var e = d;
					break a;
				}
			} catch (g) {}
			e = null;
		}
		if (
			e &&
			"undefined" != typeof e[b] &&
			(!a ||
				(!(a instanceof e[b]) &&
					(a instanceof e.Location || a instanceof e.Element)))
		) {
			e = typeof a;
			if (("object" == e && null != a) || "function" == e)
				try {
					var f =
						a.constructor.displayName ||
						a.constructor.name ||
						Object.prototype.toString.call(a);
				} catch (g) {
					f = "<object could not be stringified>";
				}
			else
				f = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
			ua(
				"Argument is not a %s (or a non-Element, non-Location mock); got: %s",
				b,
				f
			);
		}
		return a;
	};
	var xa;
	var t = function (a, b) {
		this.T = (a === za && b) || "";
		this.ha = Aa;
	};
	t.prototype.C = !0;
	t.prototype.B = function () {
		return this.T;
	};
	t.prototype.toString = function () {
		return "Const{" + this.T + "}";
	};
	var Ba = function (a) {
			if (a instanceof t && a.constructor === t && a.ha === Aa)
				return a.T;
			ua("expected object of type Const, got '" + a + "'");
			return "type_error:Const";
		},
		Aa = {},
		za = {};
	var v = function (a, b) {
		this.R = (a === Ca && b) || "";
		this.ga = Da;
	};
	v.prototype.C = !0;
	v.prototype.B = function () {
		return this.R.toString();
	};
	v.prototype.toString = function () {
		return "SafeUrl{" + this.R + "}";
	};
	var Ea = function (a) {
			if (a instanceof v && a.constructor === v && a.ga === Da)
				return a.R;
			ua(
				"expected object of type SafeUrl, got '" +
					a +
					"' of type " +
					ka(a)
			);
			return "type_error:SafeUrl";
		},
		Fa = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
		Ga = function (a) {
			if (a instanceof v) return a;
			a = "object" == typeof a && a.C ? a.B() : String(a);
			ta(Fa.test(a), "%s does not match the safe URL pattern", a) ||
				(a = "about:invalid#zClosurez");
			return new v(Ca, a);
		},
		Da = {},
		Ca = {};
	var w = function () {
		this.P = "";
	};
	w.prototype.C = !0;
	w.prototype.B = function () {
		return this.P;
	};
	w.prototype.toString = function () {
		return "SafeStyle{" + this.P + "}";
	};
	w.prototype.D = function (a) {
		this.P = a;
		return this;
	};
	new w().D("");
	var x = function () {
		this.O = "";
	};
	x.prototype.C = !0;
	x.prototype.B = function () {
		return this.O;
	};
	x.prototype.toString = function () {
		return "SafeStyleSheet{" + this.O + "}";
	};
	x.prototype.D = function (a) {
		this.O = a;
		return this;
	};
	new x().D("");
	var z = function () {
		this.F = "";
		this.fa = Ha;
	};
	z.prototype.C = !0;
	z.prototype.B = function () {
		return this.F.toString();
	};
	z.prototype.toString = function () {
		return "SafeHtml{" + this.F + "}";
	};
	var Ia = function (a) {
			if (a instanceof z && a.constructor === z && a.fa === Ha)
				return a.F;
			ua(
				"expected object of type SafeHtml, got '" +
					a +
					"' of type " +
					ka(a)
			);
			return "type_error:SafeHtml";
		},
		Ha = {};
	z.prototype.D = function (a) {
		var b;
		void 0 === xa && (xa = qa("gapi#html"));
		this.F = (b = xa) ? b.createHTML(a) : a;
		return this;
	};
	var Ja = new z();
	Ja.F =
		m.trustedTypes && m.trustedTypes.emptyHTML
			? m.trustedTypes.emptyHTML
			: "";
	var Ka = { MATH: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0 },
		La = (function (a) {
			var b = !1,
				c;
			return function () {
				b || ((c = a()), (b = !0));
				return c;
			};
		})(function () {
			if ("undefined" === typeof document) return !1;
			var a = document.createElement("div"),
				b = document.createElement("div");
			b.appendChild(document.createElement("div"));
			a.appendChild(b);
			if (!a.firstChild) return !1;
			b = a.firstChild.firstChild;
			a.innerHTML = Ia(Ja);
			return !b.parentElement;
		}); /*
    gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
	var A = window,
		B = document,
		Ma = A.location,
		Na = function () {},
		Oa = /\[native code\]/,
		C = function (a, b, c) {
			return (a[b] = a[b] || c);
		},
		Pa = function (a) {
			for (var b = 0; b < this.length; b++) if (this[b] === a) return b;
			return -1;
		},
		Qa = function (a) {
			a = a.sort();
			for (var b = [], c = void 0, d = 0; d < a.length; d++) {
				var e = a[d];
				e != c && b.push(e);
				c = e;
			}
			return b;
		},
		Ra = /&/g,
		Sa = /</g,
		Ta = />/g,
		Va = /"/g,
		Wa = /'/g,
		Xa = function (a) {
			return String(a)
				.replace(Ra, "&amp;")
				.replace(Sa, "&lt;")
				.replace(Ta, "&gt;")
				.replace(Va, "&quot;")
				.replace(Wa, "&#39;");
		},
		D = function () {
			var a;
			if ((a = Object.create) && Oa.test(a)) a = a(null);
			else {
				a = {};
				for (var b in a) a[b] = void 0;
			}
			return a;
		},
		E = function (a, b) {
			return Object.prototype.hasOwnProperty.call(a, b);
		},
		Ya = function (a) {
			if (Oa.test(Object.keys)) return Object.keys(a);
			var b = [],
				c;
			for (c in a) E(a, c) && b.push(c);
			return b;
		},
		F = function (a, b) {
			a = a || {};
			for (var c in a) E(a, c) && (b[c] = a[c]);
		},
		Za = function (a) {
			return function () {
				A.setTimeout(a, 0);
			};
		},
		H = function (a, b) {
			if (!a) throw Error(b || "");
		},
		I = C(A, "gapi", {});
	var J = function (a, b, c) {
			var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
			b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g");
			if ((a = a && (d.exec(a) || b.exec(a))))
				try {
					c = decodeURIComponent(a[2]);
				} catch (e) {}
			return c;
		},
		$a = new RegExp(
			/^/.source +
				/([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source +
				/(\/\/[^\/?#]*)?/.source +
				/([^?#]*)?/.source +
				/(\?([^#]*))?/.source +
				/(#((#|[^#])*))?/.source +
				/$/.source
		),
		ab = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,
		bb = new RegExp(
			/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source +
				/%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
			"g"
		),
		cb = /%([a-f]|[0-9a-fA-F][a-f])/g,
		db = /^(https?|ftp|file|chrome-extension):$/i,
		eb = function (a) {
			a = String(a);
			a = a
				.replace(ab, function (e) {
					try {
						return encodeURIComponent(e);
					} catch (f) {
						return encodeURIComponent(
							e.replace(/^[^%]+$/g, "\ufffd")
						);
					}
				})
				.replace(bb, function (e) {
					return e.replace(/%/g, "%25");
				})
				.replace(cb, function (e) {
					return e.toUpperCase();
				});
			a = a.match($a) || [];
			var b = D(),
				c = function (e) {
					return e
						.replace(/\\/g, "%5C")
						.replace(/\^/g, "%5E")
						.replace(/`/g, "%60")
						.replace(/\{/g, "%7B")
						.replace(/\|/g, "%7C")
						.replace(/\}/g, "%7D");
				},
				d = !!(a[1] || "").match(db);
			b.A = c(
				(a[1] || "") + (a[2] || "") + (a[3] || (a[2] && d ? "/" : ""))
			);
			d = function (e) {
				return c(e.replace(/\?/g, "%3F").replace(/#/g, "%23"));
			};
			b.query = a[5] ? [d(a[5])] : [];
			b.g = a[7] ? [d(a[7])] : [];
			return b;
		},
		fb = function (a) {
			return (
				a.A +
				(0 < a.query.length ? "?" + a.query.join("&") : "") +
				(0 < a.g.length ? "#" + a.g.join("&") : "")
			);
		},
		gb = function (a, b) {
			var c = [];
			if (a)
				for (var d in a)
					if (E(a, d) && null != a[d]) {
						var e = b ? b(a[d]) : a[d];
						c.push(
							encodeURIComponent(d) + "=" + encodeURIComponent(e)
						);
					}
			return c;
		},
		hb = function (a, b, c, d) {
			a = eb(a);
			a.query.push.apply(a.query, gb(b, d));
			a.g.push.apply(a.g, gb(c, d));
			return fb(a);
		},
		ib = new RegExp(
			/\/?\??#?/.source +
				"(" +
				/[\/?#]/i.source +
				"|" +
				/[\uD800-\uDBFF]/i.source +
				"|" +
				/%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source +
				"|" +
				/%[0-9a-f]?/i.source +
				")$",
			"i"
		),
		jb = function (a, b) {
			var c = eb(b);
			b = c.A;
			c.query.length && (b += "?" + c.query.join(""));
			c.g.length && (b += "#" + c.g.join(""));
			var d = "";
			2e3 < b.length &&
				((d = b),
				(b = b.substr(0, 2e3)),
				(b = b.replace(ib, "")),
				(d = d.substr(b.length)));
			var e = a.createElement("div");
			a = a.createElement("a");
			c = eb(b);
			b = c.A;
			c.query.length && (b += "?" + c.query.join(""));
			c.g.length && (b += "#" + c.g.join(""));
			b = new v(Ca, b);
			wa(a, "HTMLAnchorElement");
			b = b instanceof v ? b : Ga(b);
			a.href = Ea(b);
			e.appendChild(a);
			b = e.innerHTML;
			c = new t(za, "Assignment to self.");
			va(Ba(c), "must provide justification");
			ta(
				!/^[\s\xa0]*$/.test(Ba(c)),
				"must provide non-empty justification"
			);
			b = new z().D(b);
			if (Ka[e.tagName.toUpperCase()])
				throw Error(
					"goog.dom.safe.setInnerHtml cannot be used to set content of " +
						e.tagName +
						"."
				);
			if (La()) for (; e.lastChild; ) e.removeChild(e.lastChild);
			e.innerHTML = Ia(b);
			b = String(e.firstChild.href);
			e.parentNode && e.parentNode.removeChild(e);
			c = eb(b + d);
			d = c.A;
			c.query.length && (d += "?" + c.query.join(""));
			c.g.length && (d += "#" + c.g.join(""));
			return d;
		},
		kb = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
	var lb = function (a, b, c, d) {
			if (A[c + "EventListener"]) A[c + "EventListener"](a, b, !1);
			else if (A[d + "tachEvent"]) A[d + "tachEvent"]("on" + a, b);
		},
		mb = function () {
			var a = B.readyState;
			return (
				"complete" === a ||
				("interactive" === a &&
					-1 == navigator.userAgent.indexOf("MSIE"))
			);
		},
		pb = function (a) {
			var b = nb;
			if (!mb())
				try {
					b();
				} catch (c) {}
			ob(a);
		},
		ob = function (a) {
			if (mb()) a();
			else {
				var b = !1,
					c = function () {
						if (!b) return (b = !0), a.apply(this, arguments);
					};
				A.addEventListener
					? (A.addEventListener("load", c, !1),
					  A.addEventListener("DOMContentLoaded", c, !1))
					: A.attachEvent &&
					  (A.attachEvent("onreadystatechange", function () {
							mb() && c.apply(this, arguments);
					  }),
					  A.attachEvent("onload", c));
			}
		},
		qb = function (a) {
			for (; a.firstChild; ) a.removeChild(a.firstChild);
		},
		rb = { button: !0, div: !0, span: !0 };
	var L;
	L = C(A, "___jsl", D());
	C(L, "I", 0);
	C(L, "hel", 10);
	var sb = function (a) {
			return L.dpo ? L.h : J(a, "jsh", L.h);
		},
		tb = function (a) {
			var b = C(L, "sws", []);
			b.push.apply(b, a);
		},
		ub = function (a) {
			return C(L, "watt", D())[a];
		},
		vb = function (a) {
			var b = C(L, "PQ", []);
			L.PQ = [];
			var c = b.length;
			if (0 === c) a();
			else
				for (
					var d = 0,
						e = function () {
							++d === c && a();
						},
						f = 0;
					f < c;
					f++
				)
					b[f](e);
		},
		wb = function (a) {
			return C(C(L, "H", D()), a, D());
		};
	var xb = C(L, "perf", D()),
		yb = C(xb, "g", D()),
		zb = C(xb, "i", D());
	C(xb, "r", []);
	D();
	D();
	var Ab = function (a, b, c) {
			var d = xb.r;
			"function" === typeof d ? d(a, b, c) : d.push([a, b, c]);
		},
		N = function (a, b, c) {
			yb[a] = (!b && yb[a]) || c || new Date().getTime();
			Ab(a);
		},
		Cb = function (a, b, c) {
			b &&
				0 < b.length &&
				((b = Bb(b)),
				c && 0 < c.length && (b += "___" + Bb(c)),
				28 < b.length && (b = b.substr(0, 28) + (b.length - 28)),
				(c = b),
				(b = C(zb, "_p", D())),
				(C(b, c, D())[a] = new Date().getTime()),
				Ab(a, "_p", c));
		},
		Bb = function (a) {
			return a
				.join("__")
				.replace(/\./g, "_")
				.replace(/\-/g, "_")
				.replace(/,/g, "_");
		};
	var Db = D(),
		Eb = [],
		O = function (a) {
			throw Error("Bad hint" + (a ? ": " + a : ""));
		};
	Eb.push([
		"jsl",
		function (a) {
			for (var b in a)
				if (E(a, b)) {
					var c = a[b];
					"object" == typeof c
						? (L[b] = C(L, b, []).concat(c))
						: C(L, b, c);
				}
			if ((b = a.u))
				(a = C(L, "us", [])),
					a.push(b),
					(b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1]);
		},
	]);
	var Fb = /^(\/[a-zA-Z0-9_\-]+)+$/,
		Gb = [/\/amp\//, /\/amp$/, /^\/amp$/],
		Hb = /^[a-zA-Z0-9\-_\.,!]+$/,
		Ib = /^gapi\.loaded_[0-9]+$/,
		Jb = /^[a-zA-Z0-9,._-]+$/,
		Nb = function (a, b, c, d) {
			var e = a.split(";"),
				f = e.shift(),
				g = Db[f],
				h = null;
			g ? (h = g(e, b, c, d)) : O("no hint processor for: " + f);
			h || O("failed to generate load url");
			b = h;
			c = b.match(Kb);
			((d = b.match(Lb)) &&
				1 === d.length &&
				Mb.test(b) &&
				c &&
				1 === c.length) ||
				O("failed sanity: " + a);
			return h;
		},
		Qb = function (a, b, c, d) {
			a = Ob(a);
			Ib.test(c) || O("invalid_callback");
			b = Pb(b);
			d = d && d.length ? Pb(d) : null;
			var e = function (f) {
				return encodeURIComponent(f).replace(/%2C/g, ",");
			};
			return [
				encodeURIComponent(a.pathPrefix)
					.replace(/%2C/g, ",")
					.replace(/%2F/g, "/"),
				"/k=",
				e(a.version),
				"/m=",
				e(b),
				d ? "/exm=" + e(d) : "",
				"/rt=j/sv=1/d=1/ed=1",
				a.V ? "/am=" + e(a.V) : "",
				a.ba ? "/rs=" + e(a.ba) : "",
				a.da ? "/t=" + e(a.da) : "",
				"/cb=",
				e(c),
			].join("");
		},
		Ob = function (a) {
			"/" !== a.charAt(0) && O("relative path");
			for (var b = a.substring(1).split("/"), c = []; b.length; ) {
				a = b.shift();
				if (!a.length || 0 == a.indexOf("."))
					O("empty/relative directory");
				else if (0 < a.indexOf("=")) {
					b.unshift(a);
					break;
				}
				c.push(a);
			}
			a = {};
			for (var d = 0, e = b.length; d < e; ++d) {
				var f = b[d].split("="),
					g = decodeURIComponent(f[0]),
					h = decodeURIComponent(f[1]);
				2 == f.length && g && h && (a[g] = a[g] || h);
			}
			b = "/" + c.join("/");
			Fb.test(b) || O("invalid_prefix");
			c = 0;
			for (d = Gb.length; c < d; ++c)
				Gb[c].test(b) && O("invalid_prefix");
			c = Rb(a, "k", !0);
			d = Rb(a, "am");
			e = Rb(a, "rs");
			a = Rb(a, "t");
			return { pathPrefix: b, version: c, V: d, ba: e, da: a };
		},
		Pb = function (a) {
			for (var b = [], c = 0, d = a.length; c < d; ++c) {
				var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
				Jb.test(e) && b.push(e);
			}
			return b.join(",");
		},
		Rb = function (a, b, c) {
			a = a[b];
			!a && c && O("missing: " + b);
			if (a) {
				if (Hb.test(a)) return a;
				O("invalid: " + b);
			}
			return null;
		},
		Mb = /^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
		Lb = /\/cb=/g,
		Kb = /\/\//g,
		Sb = function () {
			var a = sb(Ma.href);
			if (!a) throw Error("Bad hint");
			return a;
		};
	Db.m = function (a, b, c, d) {
		(a = a[0]) || O("missing_hint");
		return "https://apis.google.com" + Qb(a, b, c, d);
	};
	var Tb = decodeURI("%73cript"),
		Ub = /^[-+_0-9\/A-Za-z]+={0,2}$/,
		Vb = function (a, b) {
			for (var c = [], d = 0; d < a.length; ++d) {
				var e = a[d];
				e && 0 > Pa.call(b, e) && c.push(e);
			}
			return c;
		},
		Wb = function () {
			var a = L.nonce;
			return void 0 !== a
				? a && a === String(a) && a.match(Ub)
					? a
					: (L.nonce = null)
				: B.querySelector
				? (a = B.querySelector("script[nonce]"))
					? ((a = a.nonce || a.getAttribute("nonce") || ""),
					  a && a === String(a) && a.match(Ub)
							? (L.nonce = a)
							: (L.nonce = null))
					: null
				: null;
		},
		Zb = function (a) {
			if ("loading" != B.readyState) Xb(a);
			else {
				var b = Wb(),
					c = "";
				null !== b && (c = ' nonce="' + b + '"');
				a =
					"<" +
					Tb +
					' src="' +
					encodeURI(a) +
					'"' +
					c +
					"></" +
					Tb +
					">";
				B.write(Yb ? Yb.createHTML(a) : a);
			}
		},
		Xb = function (a) {
			var b = B.createElement(Tb);
			b.setAttribute("src", Yb ? Yb.createScriptURL(a) : a);
			a = Wb();
			null !== a && b.setAttribute("nonce", a);
			b.async = "true";
			(a = B.getElementsByTagName(Tb)[0])
				? a.parentNode.insertBefore(b, a)
				: (B.head || B.body || B.documentElement).appendChild(b);
		},
		$b = function (a, b) {
			var c = b && b._c;
			if (c)
				for (var d = 0; d < Eb.length; d++) {
					var e = Eb[d][0],
						f = Eb[d][1];
					f && E(c, e) && f(c[e], a, b);
				}
		},
		bc = function (a, b, c) {
			ac(function () {
				var d = b === sb(Ma.href) ? C(I, "_", D()) : D();
				d = C(wb(b), "_", d);
				a(d);
			}, c);
		},
		dc = function (a, b) {
			var c = b || {};
			"function" == typeof b && ((c = {}), (c.callback = b));
			$b(a, c);
			b = a ? a.split(":") : [];
			var d = c.h || Sb(),
				e = C(L, "ah", D());
			if (e["::"] && b.length) {
				a = [];
				for (var f = null; (f = b.shift()); ) {
					var g = f.split(".");
					g = e[f] || e[(g[1] && "ns:" + g[0]) || ""] || d;
					var h = (a.length && a[a.length - 1]) || null,
						k = h;
					(h && h.hint == g) || ((k = { hint: g, Y: [] }), a.push(k));
					k.Y.push(f);
				}
				var l = a.length;
				if (1 < l) {
					var n = c.callback;
					n &&
						(c.callback = function () {
							0 == --l && n();
						});
				}
				for (; (b = a.shift()); ) cc(b.Y, c, b.hint);
			} else cc(b || [], c, d);
		},
		cc = function (a, b, c) {
			a = Qa(a) || [];
			var d = b.callback,
				e = b.config,
				f = b.timeout,
				g = b.ontimeout,
				h = b.onerror,
				k = void 0;
			"function" == typeof h && (k = h);
			var l = null,
				n = !1;
			if ((f && !g) || (!f && g))
				throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
			h = C(wb(c), "r", []).sort();
			var p = C(wb(c), "L", []).sort(),
				r = [].concat(h),
				u = function (M, da) {
					if (n) return 0;
					A.clearTimeout(l);
					p.push.apply(p, y);
					var ea = ((I || {}).config || {}).update;
					ea ? ea(e) : e && C(L, "cu", []).push(e);
					if (da) {
						Cb("me0", M, r);
						try {
							bc(da, c, k);
						} finally {
							Cb("me1", M, r);
						}
					}
					return 1;
				};
			0 < f &&
				(l = A.setTimeout(function () {
					n = !0;
					g();
				}, f));
			var y = Vb(a, p);
			if (y.length) {
				y = Vb(a, h);
				var G = C(L, "CP", []),
					K = G.length;
				G[K] = function (M) {
					if (!M) return 0;
					Cb("ml1", y, r);
					var da = function (ya) {
							G[K] = null;
							u(y, M) &&
								vb(function () {
									d && d();
									ya();
								});
						},
						ea = function () {
							var ya = G[K + 1];
							ya && ya();
						};
					0 < K && G[K - 1]
						? (G[K] = function () {
								da(ea);
						  })
						: da(ea);
				};
				if (y.length) {
					var Ua = "loaded_" + L.I++;
					I[Ua] = function (M) {
						G[K](M);
						I[Ua] = null;
					};
					a = Nb(c, y, "gapi." + Ua, h);
					h.push.apply(h, y);
					Cb("ml0", y, r);
					b.sync || A.___gapisync ? Zb(a) : Xb(a);
				} else G[K](Na);
			} else u(y) && d && d();
		},
		Yb = qa("gapi#gapi");
	var ac = function (a, b) {
		if (L.hee && 0 < L.hel)
			try {
				return a();
			} catch (c) {
				b && b(c),
					L.hel--,
					dc("debug_error", function () {
						try {
							window.___jsl.hefn(c);
						} catch (d) {
							throw c;
						}
					});
			}
		else
			try {
				return a();
			} catch (c) {
				throw (b && b(c), c);
			}
	};
	I.load = function (a, b) {
		return ac(function () {
			return dc(a, b);
		});
	};
	var ec = function (a) {
			var b = (window.___jsl = window.___jsl || {});
			b[a] = b[a] || [];
			return b[a];
		},
		fc = function (a) {
			var b = (window.___jsl = window.___jsl || {});
			b.cfg = (!a && b.cfg) || {};
			return b.cfg;
		},
		gc = function (a) {
			return "object" === typeof a && /\[native code\]/.test(a.push);
		},
		P = function (a, b, c) {
			if (b && "object" === typeof b)
				for (var d in b)
					!Object.prototype.hasOwnProperty.call(b, d) ||
						(c && "___goc" === d && "undefined" === typeof b[d]) ||
						(a[d] &&
						b[d] &&
						"object" === typeof a[d] &&
						"object" === typeof b[d] &&
						!gc(a[d]) &&
						!gc(b[d])
							? P(a[d], b[d])
							: b[d] && "object" === typeof b[d]
							? ((a[d] = gc(b[d]) ? [] : {}), P(a[d], b[d]))
							: (a[d] = b[d]));
		},
		hc = function (a) {
			if (a && !/^\s+$/.test(a)) {
				for (; 0 == a.charCodeAt(a.length - 1); )
					a = a.substring(0, a.length - 1);
				try {
					var b = window.JSON.parse(a);
				} catch (c) {}
				if ("object" === typeof b) return b;
				try {
					b = new Function("return (" + a + "\n)")();
				} catch (c) {}
				if ("object" === typeof b) return b;
				try {
					b = new Function("return ({" + a + "\n})")();
				} catch (c) {}
				return "object" === typeof b ? b : {};
			}
		},
		ic = function (a, b) {
			var c = { ___goc: void 0 };
			a.length &&
				a[a.length - 1] &&
				Object.hasOwnProperty.call(a[a.length - 1], "___goc") &&
				"undefined" === typeof a[a.length - 1].___goc &&
				(c = a.pop());
			P(c, b);
			a.push(c);
		},
		jc = function (a) {
			fc(!0);
			var b = window.___gcfg,
				c = ec("cu"),
				d = window.___gu;
			b && b !== d && (ic(c, b), (window.___gu = b));
			b = ec("cu");
			var e =
				document.scripts ||
				document.getElementsByTagName("script") ||
				[];
			d = [];
			var f = [];
			f.push.apply(f, ec("us"));
			for (var g = 0; g < e.length; ++g)
				for (var h = e[g], k = 0; k < f.length; ++k)
					h.src && 0 == h.src.indexOf(f[k]) && d.push(h);
			0 == d.length &&
				0 < e.length &&
				e[e.length - 1].src &&
				d.push(e[e.length - 1]);
			for (e = 0; e < d.length; ++e)
				d[e].getAttribute("gapi_processed") ||
					(d[e].setAttribute("gapi_processed", !0),
					(f = d[e])
						? ((g = f.nodeType),
						  (f =
								3 == g || 4 == g
									? f.nodeValue
									: f.textContent ||
									  f.innerText ||
									  f.innerHTML ||
									  ""))
						: (f = void 0),
					(f = hc(f)) && b.push(f));
			a && ic(c, a);
			d = ec("cd");
			a = 0;
			for (b = d.length; a < b; ++a) P(fc(), d[a], !0);
			d = ec("ci");
			a = 0;
			for (b = d.length; a < b; ++a) P(fc(), d[a], !0);
			a = 0;
			for (b = c.length; a < b; ++a) P(fc(), c[a], !0);
		},
		Q = function (a) {
			var b = fc();
			if (!a) return b;
			a = a.split("/");
			for (
				var c = 0, d = a.length;
				b && "object" === typeof b && c < d;
				++c
			)
				b = b[a[c]];
			return c === a.length && void 0 !== b ? b : void 0;
		},
		kc = function (a, b) {
			var c;
			if ("string" === typeof a) {
				var d = (c = {});
				a = a.split("/");
				for (var e = 0, f = a.length; e < f - 1; ++e) {
					var g = {};
					d = d[a[e]] = g;
				}
				d[a[e]] = b;
			} else c = a;
			jc(c);
		};
	var lc = function () {
		var a = window.__GOOGLEAPIS;
		a &&
			(a.googleapis &&
				!a["googleapis.config"] &&
				(a["googleapis.config"] = a.googleapis),
			C(L, "ci", []).push(a),
			(window.__GOOGLEAPIS = void 0));
	};
	var mc = {
			callback: 1,
			clientid: 1,
			cookiepolicy: 1,
			openidrealm: -1,
			includegrantedscopes: -1,
			requestvisibleactions: 1,
			scope: 1,
		},
		nc = !1,
		oc = D(),
		pc = function () {
			if (!nc) {
				for (
					var a = document.getElementsByTagName("meta"), b = 0;
					b < a.length;
					++b
				) {
					var c = a[b].name.toLowerCase();
					if (0 == c.lastIndexOf("google-signin-", 0)) {
						c = c.substring(14);
						var d = a[b].content;
						mc[c] && d && (oc[c] = d);
					}
				}
				if (window.self !== window.top) {
					a = document.location.toString();
					for (var e in mc)
						0 < mc[e] && (b = J(a, e, "")) && (oc[e] = b);
				}
				nc = !0;
			}
			e = D();
			F(oc, e);
			return e;
		},
		qc = function (a) {
			return !!(a.clientid && a.scope && a.callback);
		};
	var rc = window.console,
		sc = function (a) {
			rc && rc.log && rc.log(a);
		};
	var tc = function () {
			return !!L.oa;
		},
		uc = function () {};
	var R = C(L, "rw", D()),
		vc = function (a) {
			for (var b in R) a(R[b]);
		},
		wc = function (a, b) {
			(a = R[a]) && a.state < b && (a.state = b);
		};
	var xc;
	var yc = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//,
		zc = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//,
		Ac = function (a) {
			var b = Q("googleapis.config/sessionIndex");
			"string" === typeof b && 254 < b.length && (b = null);
			null == b && (b = window.__X_GOOG_AUTHUSER);
			"string" === typeof b && 254 < b.length && (b = null);
			if (null == b) {
				var c = window.google;
				c && (b = c.authuser);
			}
			"string" === typeof b && 254 < b.length && (b = null);
			null == b &&
				((a = a || window.location.href),
				(b = J(a, "authuser") || null),
				null == b && (b = (b = a.match(yc)) ? b[1] : null));
			if (null == b) return null;
			b = String(b);
			254 < b.length && (b = null);
			return b;
		},
		Bc = function (a) {
			var b = Q("googleapis.config/sessionDelegate");
			"string" === typeof b && 21 < b.length && (b = null);
			null == b &&
				(b = (a = (a || window.location.href).match(zc)) ? a[1] : null);
			if (null == b) return null;
			b = String(b);
			21 < b.length && (b = null);
			return b;
		};
	var Cc,
		S,
		T = void 0,
		U = function (a) {
			try {
				return m.JSON.parse.call(m.JSON, a);
			} catch (b) {
				return !1;
			}
		},
		V = function (a) {
			return Object.prototype.toString.call(a);
		},
		Dc = V(0),
		Ec = V(new Date(0)),
		Fc = V(!0),
		Gc = V(""),
		Hc = V({}),
		Ic = V([]),
		W = function (a, b) {
			if (b)
				for (var c = 0, d = b.length; c < d; ++c)
					if (a === b[c])
						throw new TypeError(
							"Converting circular structure to JSON"
						);
			d = typeof a;
			if ("undefined" !== d) {
				c = Array.prototype.slice.call(b || [], 0);
				c[c.length] = a;
				b = [];
				var e = V(a);
				if (
					null != a &&
					"function" === typeof a.toJSON &&
					(Object.prototype.hasOwnProperty.call(a, "toJSON") ||
						((e !== Ic ||
							(a.constructor !== Array &&
								a.constructor !== Object)) &&
							(e !== Hc ||
								(a.constructor !== Array &&
									a.constructor !== Object)) &&
							e !== Gc &&
							e !== Dc &&
							e !== Fc &&
							e !== Ec))
				)
					return W(a.toJSON.call(a), c);
				if (null == a) b[b.length] = "null";
				else if (e === Dc)
					(a = Number(a)),
						isNaN(a) || isNaN(a - a)
							? (a = "null")
							: -0 === a && 0 > 1 / a && (a = "-0"),
						(b[b.length] = String(a));
				else if (e === Fc) b[b.length] = String(!!Number(a));
				else {
					if (e === Ec) return W(a.toISOString.call(a), c);
					if (e === Ic && V(a.length) === Dc) {
						b[b.length] = "[";
						var f = 0;
						for (d = Number(a.length) >> 0; f < d; ++f)
							f && (b[b.length] = ","),
								(b[b.length] = W(a[f], c) || "null");
						b[b.length] = "]";
					} else if (e == Gc && V(a.length) === Dc) {
						b[b.length] = '"';
						f = 0;
						for (c = Number(a.length) >> 0; f < c; ++f)
							(d = String.prototype.charAt.call(a, f)),
								(e = String.prototype.charCodeAt.call(a, f)),
								(b[b.length] =
									"\b" === d
										? "\\b"
										: "\f" === d
										? "\\f"
										: "\n" === d
										? "\\n"
										: "\r" === d
										? "\\r"
										: "\t" === d
										? "\\t"
										: "\\" === d || '"' === d
										? "\\" + d
										: 31 >= e
										? "\\u" +
										  (e + 65536).toString(16).substr(1)
										: 32 <= e && 65535 >= e
										? d
										: "\ufffd");
						b[b.length] = '"';
					} else if ("object" === d) {
						b[b.length] = "{";
						d = 0;
						for (f in a)
							Object.prototype.hasOwnProperty.call(a, f) &&
								((e = W(a[f], c)),
								void 0 !== e &&
									(d++ && (b[b.length] = ","),
									(b[b.length] = W(f)),
									(b[b.length] = ":"),
									(b[b.length] = e)));
						b[b.length] = "}";
					} else return;
				}
				return b.join("");
			}
		},
		Jc = /[\0-\x07\x0b\x0e-\x1f]/,
		Kc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,
		Lc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,
		Mc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,
		Nc = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,
		Oc = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,
		Pc = /[ \t\n\r]+/g,
		Qc = /[^"]:/,
		Rc = /""/g,
		Sc = /true|false|null/g,
		Tc = /00/,
		Uc = /[\{]([^0\}]|0[^:])/,
		Vc = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,
		Wc = /[^\[,:][\[\{]/,
		Xc = /^(\{|\}|\[|\]|,|:|0)+/,
		Yc = /\u2028/g,
		Zc = /\u2029/g,
		$c = function (a) {
			a = String(a);
			if (Jc.test(a) || Kc.test(a) || Lc.test(a) || Mc.test(a)) return !1;
			var b = a.replace(Nc, '""');
			b = b.replace(Oc, "0");
			b = b.replace(Pc, "");
			if (Qc.test(b)) return !1;
			b = b.replace(Rc, "0");
			b = b.replace(Sc, "0");
			if (
				Tc.test(b) ||
				Uc.test(b) ||
				Vc.test(b) ||
				Wc.test(b) ||
				!b ||
				(b = b.replace(Xc, ""))
			)
				return !1;
			a = a.replace(Yc, "\\u2028").replace(Zc, "\\u2029");
			b = void 0;
			try {
				b = T
					? [U(a)]
					: eval(
							"(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" +
								a +
								"\n)"
					  );
			} catch (c) {
				return !1;
			}
			return b && 1 === b.length ? b[0] : !1;
		},
		ad = function () {
			var a = ((m.document || {}).scripts || []).length;
			if ((void 0 === Cc || void 0 === T || S !== a) && -1 !== S) {
				Cc = T = !1;
				S = -1;
				try {
					try {
						T =
							!!m.JSON &&
							'{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' ===
								m.JSON.stringify.call(m.JSON, {
									a: [3, !0, new Date(0)],
									c: function () {},
								}) &&
							!0 === U("true") &&
							3 === U('[{"a":3}]')[0].a;
					} catch (b) {}
					Cc =
						T &&
						!U("[00]") &&
						!U('"\u0007"') &&
						!U('"\\0"') &&
						!U('"\\v"');
				} finally {
					S = a;
				}
			}
		},
		bd = function (a) {
			if (-1 === S) return !1;
			ad();
			return (Cc ? U : $c)(a);
		},
		cd = function (a) {
			if (-1 !== S)
				return ad(), T ? m.JSON.stringify.call(m.JSON, a) : W(a);
		},
		dd =
			!Date.prototype.toISOString ||
			"function" !== typeof Date.prototype.toISOString ||
			"1970-01-01T00:00:00.000Z" !== new Date(0).toISOString(),
		ed = function () {
			var a = Date.prototype.getUTCFullYear.call(this);
			return [
				0 > a
					? "-" + String(1e6 - a).substr(1)
					: 9999 >= a
					? String(1e4 + a).substr(1)
					: "+" + String(1e6 + a).substr(1),
				"-",
				String(101 + Date.prototype.getUTCMonth.call(this)).substr(1),
				"-",
				String(100 + Date.prototype.getUTCDate.call(this)).substr(1),
				"T",
				String(100 + Date.prototype.getUTCHours.call(this)).substr(1),
				":",
				String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1),
				":",
				String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1),
				".",
				String(
					1e3 + Date.prototype.getUTCMilliseconds.call(this)
				).substr(1),
				"Z",
			].join("");
		};
	Date.prototype.toISOString = dd ? ed : Date.prototype.toISOString;
	var fd = function () {
		this.j = -1;
	};
	var gd = function () {
		this.j = 64;
		this.b = [];
		this.L = [];
		this.ia = [];
		this.H = [];
		this.H[0] = 128;
		for (var a = 1; a < this.j; ++a) this.H[a] = 0;
		this.J = this.o = 0;
		this.reset();
	};
	oa(gd, fd);
	gd.prototype.reset = function () {
		this.b[0] = 1732584193;
		this.b[1] = 4023233417;
		this.b[2] = 2562383102;
		this.b[3] = 271733878;
		this.b[4] = 3285377520;
		this.J = this.o = 0;
	};
	var hd = function (a, b, c) {
		c || (c = 0);
		var d = a.ia;
		if ("string" === typeof b)
			for (var e = 0; 16 > e; e++)
				(d[e] =
					(b.charCodeAt(c) << 24) |
					(b.charCodeAt(c + 1) << 16) |
					(b.charCodeAt(c + 2) << 8) |
					b.charCodeAt(c + 3)),
					(c += 4);
		else
			for (e = 0; 16 > e; e++)
				(d[e] =
					(b[c] << 24) |
					(b[c + 1] << 16) |
					(b[c + 2] << 8) |
					b[c + 3]),
					(c += 4);
		for (e = 16; 80 > e; e++) {
			var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
			d[e] = ((f << 1) | (f >>> 31)) & 4294967295;
		}
		b = a.b[0];
		c = a.b[1];
		var g = a.b[2],
			h = a.b[3],
			k = a.b[4];
		for (e = 0; 80 > e; e++) {
			if (40 > e)
				if (20 > e) {
					f = h ^ (c & (g ^ h));
					var l = 1518500249;
				} else (f = c ^ g ^ h), (l = 1859775393);
			else
				60 > e
					? ((f = (c & g) | (h & (c | g))), (l = 2400959708))
					: ((f = c ^ g ^ h), (l = 3395469782));
			f = (((b << 5) | (b >>> 27)) + f + k + l + d[e]) & 4294967295;
			k = h;
			h = g;
			g = ((c << 30) | (c >>> 2)) & 4294967295;
			c = b;
			b = f;
		}
		a.b[0] = (a.b[0] + b) & 4294967295;
		a.b[1] = (a.b[1] + c) & 4294967295;
		a.b[2] = (a.b[2] + g) & 4294967295;
		a.b[3] = (a.b[3] + h) & 4294967295;
		a.b[4] = (a.b[4] + k) & 4294967295;
	};
	gd.prototype.update = function (a, b) {
		if (null != a) {
			void 0 === b && (b = a.length);
			for (var c = b - this.j, d = 0, e = this.L, f = this.o; d < b; ) {
				if (0 == f) for (; d <= c; ) hd(this, a, d), (d += this.j);
				if ("string" === typeof a)
					for (; d < b; ) {
						if (((e[f] = a.charCodeAt(d)), ++f, ++d, f == this.j)) {
							hd(this, e);
							f = 0;
							break;
						}
					}
				else
					for (; d < b; )
						if (((e[f] = a[d]), ++f, ++d, f == this.j)) {
							hd(this, e);
							f = 0;
							break;
						}
			}
			this.o = f;
			this.J += b;
		}
	};
	gd.prototype.digest = function () {
		var a = [],
			b = 8 * this.J;
		56 > this.o
			? this.update(this.H, 56 - this.o)
			: this.update(this.H, this.j - (this.o - 56));
		for (var c = this.j - 1; 56 <= c; c--)
			(this.L[c] = b & 255), (b /= 256);
		hd(this, this.L);
		for (c = b = 0; 5 > c; c++)
			for (var d = 24; 0 <= d; d -= 8)
				(a[b] = (this.b[c] >> d) & 255), ++b;
		return a;
	};
	var id = function () {
		this.S = new gd();
	};
	id.prototype.reset = function () {
		this.S.reset();
	};
	var jd = A.crypto,
		kd = !1,
		ld = 0,
		md = 0,
		nd = 1,
		od = 0,
		pd = "",
		qd = function (a) {
			a = a || A.event;
			var b = (a.screenX + a.clientX) << 16;
			b += a.screenY + a.clientY;
			b *= new Date().getTime() % 1e6;
			nd = (nd * b) % od;
			0 < ld && ++md == ld && lb("mousemove", qd, "remove", "de");
		},
		rd = function (a) {
			var b = new id();
			a = unescape(encodeURIComponent(a));
			for (var c = [], d = 0, e = a.length; d < e; ++d)
				c.push(a.charCodeAt(d));
			b.S.update(c);
			b = b.S.digest();
			a = "";
			for (c = 0; c < b.length; c++)
				a +=
					"0123456789ABCDEF".charAt(Math.floor(b[c] / 16)) +
					"0123456789ABCDEF".charAt(b[c] % 16);
			return a;
		};
	kd = !!jd && "function" == typeof jd.getRandomValues;
	kd ||
		((od = 1e6 * (screen.width * screen.width + screen.height)),
		(pd = rd(
			B.cookie +
				"|" +
				B.location +
				"|" +
				new Date().getTime() +
				"|" +
				Math.random()
		)),
		(ld = Q("random/maxObserveMousemove") || 0),
		0 != ld && lb("mousemove", qd, "add", "at"));
	var sd = function () {
			var a = nd;
			a += parseInt(pd.substr(0, 20), 16);
			pd = rd(pd);
			return a / (od + Math.pow(16, 20));
		},
		td = function () {
			var a = new A.Uint32Array(1);
			jd.getRandomValues(a);
			return Number("0." + a[0]);
		};
	var ud = function () {
			var a = L.onl;
			if (!a) {
				a = D();
				L.onl = a;
				var b = D();
				a.e = function (c) {
					var d = b[c];
					d && (delete b[c], d());
				};
				a.a = function (c, d) {
					b[c] = d;
				};
				a.r = function (c) {
					delete b[c];
				};
			}
			return a;
		},
		vd = function (a, b) {
			b = b.onload;
			return "function" === typeof b ? (ud().a(a, b), b) : null;
		},
		wd = function (a) {
			H(/^\w+$/.test(a), "Unsupported id - " + a);
			ud();
			return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"';
		},
		xd = function (a) {
			ud().r(a);
		};
	var yd = {
			allowtransparency: "true",
			frameborder: "0",
			hspace: "0",
			marginheight: "0",
			marginwidth: "0",
			scrolling: "no",
			style: "",
			tabindex: "0",
			vspace: "0",
			width: "100%",
		},
		zd = { allowtransparency: !0, onload: !0 },
		Ad = 0,
		Bd = function (a) {
			H(!a || kb.test(a), "Illegal url for new iframe - " + a);
		},
		Cd = function (a, b, c, d, e) {
			Bd(c.src);
			var f,
				g = vd(d, c),
				h = g ? wd(d) : "";
			try {
				document.all &&
					(f = a.createElement(
						'<iframe frameborder="' +
							Xa(String(c.frameborder)) +
							'" scrolling="' +
							Xa(String(c.scrolling)) +
							'" ' +
							h +
							' name="' +
							Xa(String(c.name)) +
							'"/>'
					));
			} catch (l) {
			} finally {
				f ||
					((f = a.createElement("iframe")),
					g &&
						((f.onload = function () {
							f.onload = null;
							g.call(this);
						}),
						xd(d)));
			}
			f.setAttribute("ng-non-bindable", "");
			for (var k in c)
				(a = c[k]),
					"style" === k && "object" === typeof a
						? F(a, f.style)
						: zd[k] || f.setAttribute(k, String(a));
			(k = (e && e.beforeNode) || null) || (e && e.dontclear) || qb(b);
			b.insertBefore(f, k);
			f = k ? k.previousSibling : b.lastChild;
			c.allowtransparency && (f.allowTransparency = !0);
			return f;
		};
	var Dd = /^:[\w]+$/,
		Ed = /:([a-zA-Z_]+):/g,
		Fd = function () {
			var a = Ac() || "0",
				b = Bc();
			var c = Ac(void 0) || a;
			var d = Bc(void 0),
				e = "";
			c && (e += "u/" + encodeURIComponent(String(c)) + "/");
			d && (e += "b/" + encodeURIComponent(String(d)) + "/");
			c = e || null;
			(e = (d = !1 === Q("isLoggedIn")) ? "_/im/" : "") && (c = "");
			var f = Q("iframes/:socialhost:"),
				g = Q("iframes/:im_socialhost:");
			return (xc = {
				socialhost: f,
				ctx_socialhost: d ? g : f,
				session_index: a,
				session_delegate: b,
				session_prefix: c,
				im_prefix: e,
			});
		},
		Gd = function (a, b) {
			return Fd()[b] || "";
		},
		Hd = function (a) {
			return function (b, c) {
				return a ? Fd()[c] || a[c] || "" : Fd()[c] || "";
			};
		};
	var Id = function (a) {
			var b;
			a.match(/^https?%3A/i) && (b = decodeURIComponent(a));
			return jb(document, b ? b : a);
		},
		Jd = function (a) {
			a = a || "canonical";
			for (
				var b = document.getElementsByTagName("link"),
					c = 0,
					d = b.length;
				c < d;
				c++
			) {
				var e = b[c],
					f = e.getAttribute("rel");
				if (
					f &&
					f.toLowerCase() == a &&
					(e = e.getAttribute("href")) &&
					(e = Id(e)) &&
					null != e.match(/^https?:\/\/[\w\-_\.]+/i)
				)
					return e;
			}
			return window.location.href;
		};
	var Kd = { se: "0" },
		Ld = { post: !0 },
		Md = {
			style:
				"position:absolute;top:-10000px;width:450px;margin:0px;border-style:none",
		},
		Nd = "onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(
			" "
		),
		Od = C(L, "WI", D()),
		Pd = function (a, b, c) {
			var d;
			var e = {};
			var f = (d = a);
			"plus" == a &&
				b.action &&
				((d = a + "_" + b.action), (f = a + "/" + b.action));
			(d = Q("iframes/" + d + "/url")) ||
				(d =
					":im_socialhost:/:session_prefix::im_prefix:_/widget/render/" +
					f +
					"?usegapi=1");
			for (var g in Kd) e[g] = g + "/" + (b[g] || Kd[g]) + "/";
			e = jb(B, d.replace(Ed, Hd(e)));
			g = "iframes/" + a + "/params/";
			f = {};
			F(b, f);
			(d = Q("lang") || Q("gwidget/lang")) && (f.hl = d);
			Ld[a] ||
				(f.origin =
					window.location.origin ||
					window.location.protocol + "//" + window.location.host);
			f.exp = Q(g + "exp");
			if ((g = Q(g + "location")))
				for (d = 0; d < g.length; d++) {
					var h = g[d];
					f[h] = A.location[h];
				}
			switch (a) {
				case "plus":
				case "follow":
					g = f.href;
					d = b.action ? void 0 : "publisher";
					g = (g = "string" == typeof g ? g : void 0) ? Id(g) : Jd(d);
					f.url = g;
					delete f.href;
					break;
				case "plusone":
					g = (g = b.href) ? Id(g) : Jd();
					f.url = g;
					g = b.db;
					d = Q();
					null == g &&
						d &&
						((g = d.db),
						null == g && (g = d.gwidget && d.gwidget.db));
					f.db = g || void 0;
					g = b.ecp;
					d = Q();
					null == g &&
						d &&
						((g = d.ecp),
						null == g && (g = d.gwidget && d.gwidget.ecp));
					f.ecp = g || void 0;
					delete f.href;
					break;
				case "signin":
					f.url = Jd();
			}
			L.ILI && (f.iloader = "1");
			delete f["data-onload"];
			delete f.rd;
			for (var k in Kd) f[k] && delete f[k];
			f.gsrc = Q("iframes/:source:");
			k = Q("inline/css");
			"undefined" !== typeof k && 0 < c && k >= c && (f.ic = "1");
			k = /^#|^fr-/;
			c = {};
			for (var l in f)
				E(f, l) &&
					k.test(l) &&
					((c[l.replace(k, "")] = f[l]), delete f[l]);
			l = "q" == Q("iframes/" + a + "/params/si") ? f : c;
			k = pc();
			for (var n in k) !E(k, n) || E(f, n) || E(c, n) || (l[n] = k[n]);
			n = [].concat(Nd);
			(l = Q("iframes/" + a + "/methods")) &&
				"object" === typeof l &&
				Oa.test(l.push) &&
				(n = n.concat(l));
			for (var p in b)
				E(b, p) &&
					/^on/.test(p) &&
					("plus" != a || "onconnect" != p) &&
					(n.push(p), delete f[p]);
			delete f.callback;
			c._methods = n.join(",");
			return hb(e, f, c);
		},
		Qd = ["style", "data-gapiscan"],
		Sd = function (a) {
			for (
				var b = D(),
					c = 0 != a.nodeName.toLowerCase().indexOf("g:"),
					d = 0,
					e = a.attributes.length;
				d < e;
				d++
			) {
				var f = a.attributes[d],
					g = f.name,
					h = f.value;
				0 <= Pa.call(Qd, g) ||
					(c && 0 != g.indexOf("data-")) ||
					"null" === h ||
					("specified" in f && !f.specified) ||
					(c && (g = g.substr(5)), (b[g.toLowerCase()] = h));
			}
			a = a.style;
			(c = Rd(a && a.height)) && (b.height = String(c));
			(a = Rd(a && a.width)) && (b.width = String(a));
			return b;
		},
		Rd = function (a) {
			var b = void 0;
			"number" === typeof a
				? (b = a)
				: "string" === typeof a && (b = parseInt(a, 10));
			return b;
		},
		Ud = function () {
			var a = L.drw;
			vc(function (b) {
				if (a !== b.id && 4 != b.state && "share" != b.type) {
					var c = b.id,
						d = b.type,
						e = b.url;
					b = b.userParams;
					var f = B.getElementById(c);
					if (f) {
						var g = Pd(d, b, 0);
						g
							? ((f = f.parentNode),
							  e.replace(/#.*/, "").replace(/(\?|&)ic=1/, "") !==
									g
										.replace(/#.*/, "")
										.replace(/(\?|&)ic=1/, "") &&
									((b.dontclear = !0),
									(b.rd = !0),
									(b.ri = !0),
									(b.type = d),
									Td(f, b),
									(d = R[f.lastChild.id]) && (d.oid = c),
									wc(c, 4)))
							: delete R[c];
					} else delete R[c];
				}
			});
		};
	var Vd,
		Wd,
		X,
		Xd,
		Yd,
		Zd = /(?:^|\s)g-((\S)*)(?:$|\s)/,
		$d = {
			plusone: !0,
			autocomplete: !0,
			profile: !0,
			signin: !0,
			signin2: !0,
		};
	Vd = C(L, "SW", D());
	Wd = C(L, "SA", D());
	X = C(L, "SM", D());
	Xd = C(L, "FW", []);
	Yd = null;
	var be = function (a, b) {
			ae(void 0, !1, a, b);
		},
		ae = function (a, b, c, d) {
			N("ps0", !0);
			c = ("string" === typeof c ? document.getElementById(c) : c) || B;
			var e = B.documentMode;
			if (c.querySelectorAll && (!e || 8 < e)) {
				e = d ? [d] : Ya(Vd).concat(Ya(Wd)).concat(Ya(X));
				for (var f = [], g = 0; g < e.length; g++) {
					var h = e[g];
					f.push(".g-" + h, "g\\:" + h);
				}
				e = c.querySelectorAll(f.join(","));
			} else e = c.getElementsByTagName("*");
			c = D();
			for (f = 0; f < e.length; f++) {
				g = e[f];
				var k = g;
				h = d;
				var l = k.nodeName.toLowerCase(),
					n = void 0;
				if (k.getAttribute("data-gapiscan")) h = null;
				else {
					var p = l.indexOf("g:");
					0 == p
						? (n = l.substr(2))
						: (p =
								(p = String(
									k.className || k.getAttribute("class")
								)) && Zd.exec(p)) && (n = p[1]);
					h =
						!n || !(Vd[n] || Wd[n] || X[n]) || (h && n !== h)
							? null
							: n;
				}
				h &&
					($d[h] ||
						0 == g.nodeName.toLowerCase().indexOf("g:") ||
						0 != Ya(Sd(g)).length) &&
					(g.setAttribute("data-gapiscan", !0), C(c, h, []).push(g));
			}
			if (b)
				for (var r in c)
					for (b = c[r], d = 0; d < b.length; d++)
						b[d].setAttribute("data-onload", !0);
			for (var u in c) Xd.push(u);
			N("ps1", !0);
			if ((r = Xd.join(":")) || a)
				try {
					I.load(r, a);
				} catch (G) {
					sc(G);
					return;
				}
			if (ce(Yd || {}))
				for (var y in c) {
					a = c[y];
					u = 0;
					for (b = a.length; u < b; u++)
						a[u].removeAttribute("data-gapiscan");
					de(y);
				}
			else {
				d = [];
				for (y in c)
					for (a = c[y], u = 0, b = a.length; u < b; u++)
						(e = a[u]), ee(y, e, Sd(e), d, b);
				fe(r, d);
			}
		},
		ge = function (a) {
			var b = C(I, a, {});
			b.go ||
				((b.go = function (c) {
					return be(c, a);
				}),
				(b.render = function (c, d) {
					d = d || {};
					d.type = a;
					return Td(c, d);
				}));
		},
		he = function (a) {
			Vd[a] = !0;
		},
		ie = function (a) {
			Wd[a] = !0;
		},
		je = function (a) {
			X[a] = !0;
		};
	var de = function (a, b) {
			var c = ub(a);
			b && c
				? (c(b),
				  (c = b.iframeNode) && c.setAttribute("data-gapiattached", !0))
				: I.load(a, function () {
						var d = ub(a),
							e = b && b.iframeNode,
							f = b && b.userParams;
						e && d
							? (d(b), e.setAttribute("data-gapiattached", !0))
							: ((d = I[a].go),
							  "signin2" == a
									? d(e, f)
									: d(e && e.parentNode, f));
				  });
		},
		ce = function () {
			return !1;
		},
		fe = function () {},
		ee = function (a, b, c, d, e, f, g) {
			switch (ke(b, a, f)) {
				case 0:
					a = X[a] ? a + "_annotation" : a;
					d = {};
					d.iframeNode = b;
					d.userParams = c;
					de(a, d);
					break;
				case 1:
					if (b.parentNode) {
						for (var h in c) {
							if ((f = E(c, h)))
								(f = c[h]),
									(f =
										!!f &&
										"object" === typeof f &&
										(!f.toString ||
											f.toString ===
												Object.prototype.toString ||
											f.toString ===
												Array.prototype.toString));
							if (f)
								try {
									c[h] = cd(c[h]);
								} catch (y) {
									delete c[h];
								}
						}
						f = !0;
						c.dontclear && (f = !1);
						delete c.dontclear;
						uc();
						h = Pd(a, c, e);
						e = g || {};
						e.allowPost = 1;
						e.attributes = Md;
						e.dontclear = !f;
						g = {};
						g.userParams = c;
						g.url = h;
						g.type = a;
						if (c.rd) var k = b;
						else
							(k = document.createElement("div")),
								b.setAttribute("data-gapistub", !0),
								(k.style.cssText =
									"position:absolute;width:450px;left:-10000px;"),
								b.parentNode.insertBefore(k, b);
						g.siteElement = k;
						k.id ||
							((b = k),
							C(Od, a, 0),
							(f = "___" + a + "_" + Od[a]++),
							(b.id = f));
						b = D();
						b[">type"] = a;
						F(c, b);
						f = h;
						c = k;
						h = e || {};
						b = h.attributes || {};
						H(
							!(h.allowPost || h.forcePost) || !b.onload,
							"onload is not supported by post iframe (allowPost or forcePost)"
						);
						e = b = f;
						Dd.test(b) &&
							((e = Q("iframes/" + e.substring(1) + "/url")),
							H(!!e, "Unknown iframe url config for - " + b));
						f = jb(B, e.replace(Ed, Gd));
						b = c.ownerDocument || B;
						k = 0;
						do
							e =
								h.id ||
								["I", Ad++, "_", new Date().getTime()].join("");
						while (b.getElementById(e) && 5 > ++k);
						H(5 > k, "Error creating iframe id");
						k = {};
						var l = {};
						b.documentMode &&
							9 > b.documentMode &&
							(k.hostiemode = b.documentMode);
						F(h.queryParams || {}, k);
						F(h.fragmentParams || {}, l);
						var n = h.pfname;
						var p = D();
						Q("iframes/dropLegacyIdParam") || (p.id = e);
						p._gfid = e;
						p.parent = b.location.protocol + "//" + b.location.host;
						var r = J(b.location.href, "parent");
						n = n || "";
						!n &&
							r &&
							((r =
								J(b.location.href, "_gfid", "") ||
								J(b.location.href, "id", "")),
							(n = J(b.location.href, "pfname", "")),
							(n = r ? n + "/" + r : ""));
						n ||
							((r = bd(J(b.location.href, "jcp", ""))) &&
								"object" == typeof r &&
								(n = (n = r.id) ? r.pfname + "/" + n : ""));
						p.pfname = n;
						h.connectWithJsonParam &&
							((r = {}), (r.jcp = cd(p)), (p = r));
						r = J(f, "rpctoken") || k.rpctoken || l.rpctoken;
						r ||
							((r =
								h.rpctoken ||
								String(Math.round(1e8 * (kd ? td() : sd())))),
							(p.rpctoken = r));
						h.rpctoken = r;
						F(p, h.connectWithQueryParams ? k : l);
						r = b.location.href;
						p = D();
						(n = J(r, "_bsh", L.bsh)) && (p._bsh = n);
						(r = sb(r)) && (p.jsh = r);
						h.hintInFragment ? F(p, l) : F(p, k);
						f = hb(f, k, l, h.paramsSerializer);
						l = D();
						F(yd, l);
						F(h.attributes, l);
						l.name = l.id = e;
						l.src = f;
						h.eurl = f;
						k = h || {};
						p = !!k.allowPost;
						if (k.forcePost || (p && 2e3 < f.length)) {
							k = eb(f);
							l.src = "";
							h.dropDataPostorigin || (l["data-postorigin"] = f);
							f = Cd(b, c, l, e);
							if (-1 != navigator.userAgent.indexOf("WebKit")) {
								var u = f.contentWindow.document;
								u.open();
								l = u.createElement("div");
								p = {};
								r = e + "_inner";
								p.name = r;
								p.src = "";
								p.style = "display:none";
								Cd(b, l, p, r, h);
							}
							l = (h = k.query[0]) ? h.split("&") : [];
							h = [];
							for (p = 0; p < l.length; p++)
								(r = l[p].split("=", 2)),
									h.push([
										decodeURIComponent(r[0]),
										decodeURIComponent(r[1]),
									]);
							k.query = [];
							l = fb(k);
							H(kb.test(l), "Invalid URL: " + l);
							k = b.createElement("form");
							k.method = "POST";
							k.target = e;
							k.style.display = "none";
							e = l instanceof v ? l : Ga(l);
							wa(k, "HTMLFormElement").action = Ea(e);
							for (e = 0; e < h.length; e++)
								(l = b.createElement("input")),
									(l.type = "hidden"),
									(l.name = h[e][0]),
									(l.value = h[e][1]),
									k.appendChild(l);
							c.appendChild(k);
							k.submit();
							k.parentNode.removeChild(k);
							u && u.close();
							u = f;
						} else u = Cd(b, c, l, e, h);
						g.iframeNode = u;
						g.id = u.getAttribute("id");
						u = g.id;
						c = D();
						c.id = u;
						c.userParams = g.userParams;
						c.url = g.url;
						c.type = g.type;
						c.state = 1;
						R[u] = c;
						u = g;
					} else u = null;
					u && ((g = u.id) && d.push(g), de(a, u));
			}
		},
		ke = function (a, b, c) {
			if (a && 1 === a.nodeType && b) {
				if (c) return 1;
				if (X[b]) {
					if (rb[a.nodeName.toLowerCase()])
						return (a = a.innerHTML) &&
							a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
							? 0
							: 1;
				} else {
					if (Wd[b]) return 0;
					if (Vd[b]) return 1;
				}
			}
			return null;
		},
		Td = function (a, b) {
			var c = b.type;
			delete b.type;
			var d =
				("string" === typeof a ? document.getElementById(a) : a) ||
				void 0;
			if (d) {
				a = {};
				for (var e in b) E(b, e) && (a[e.toLowerCase()] = b[e]);
				a.rd = 1;
				(b = !!a.ri) && delete a.ri;
				e = [];
				ee(c, d, a, e, 0, b, void 0);
				fe(c, e);
			} else
				sc(
					"string" ===
						"gapi." + c + ".render: missing element " + typeof a
						? a
						: ""
				);
		};
	C(I, "platform", {}).go = be;
	ce = function (a) {
		for (var b = ["_c", "jsl", "h"], c = 0; c < b.length && a; c++)
			a = a[b[c]];
		b = sb(Ma.href);
		return !a || (0 != a.indexOf("n;") && 0 != b.indexOf("n;") && a !== b);
	};
	fe = function (a, b) {
		le(a, b);
	};
	var nb = function (a) {
			ae(a, !0);
		},
		me = function (a, b) {
			b = b || [];
			for (var c = 0; c < b.length; ++c) a(b[c]);
			for (a = 0; a < b.length; a++) ge(b[a]);
		};
	Eb.push([
		"platform",
		function (a, b, c) {
			Yd = c;
			b && Xd.push(b);
			me(he, a);
			me(ie, c._c.annotation);
			me(je, c._c.bimodal);
			lc();
			jc();
			if ("explicit" != Q("parsetags")) {
				tb(a);
				qc(pc()) && !Q("disableRealtimeCallback") && uc();
				if (c && (a = c.callback)) {
					var d = Za(a);
					delete c.callback;
				}
				pb(function () {
					nb(d);
				});
			}
		},
	]);
	I._pl = !0;
	var ne = function (a) {
		a = (a = R[a]) ? a.oid : void 0;
		if (a) {
			var b = B.getElementById(a);
			b && b.parentNode.removeChild(b);
			delete R[a];
			ne(a);
		}
	};
	var oe = /^\{h:'/,
		pe = /^!_/,
		qe = "",
		le = function (a, b) {
			function c() {
				lb("message", d, "remove", "de");
			}
			function d(f) {
				var g = f.data,
					h = f.origin;
				if (re(g, b)) {
					var k = e;
					e = !1;
					k && N("rqe");
					se(a, function () {
						k && N("rqd");
						c();
						for (var l = C(L, "RPMQ", []), n = 0; n < l.length; n++)
							l[n]({ data: g, origin: h });
					});
				}
			}
			if (0 !== b.length) {
				qe = J(Ma.href, "pfname", "");
				var e = !0;
				lb("message", d, "add", "at");
				dc(a, c);
			}
		},
		re = function (a, b) {
			a = String(a);
			if (oe.test(a)) return !0;
			var c = !1;
			pe.test(a) && ((c = !0), (a = a.substr(2)));
			if (!/^\{/.test(a)) return !1;
			var d = bd(a);
			if (!d) return !1;
			a = d.f;
			if (d.s && a && -1 != Pa.call(b, a)) {
				if (
					"_renderstart" === d.s ||
					d.s === qe + "/" + a + "::_renderstart"
				)
					if (
						((d = d.a && d.a[c ? 0 : 1]),
						(b = B.getElementById(a)),
						wc(a, 2),
						d && b && d.width && d.height)
					) {
						a: {
							c = b.parentNode;
							a = d || {};
							if (tc()) {
								var e = b.id;
								if (e) {
									d = (d = R[e]) ? d.state : void 0;
									if (1 === d || 4 === d) break a;
									ne(e);
								}
							}
							(d = c.nextSibling) &&
								d.getAttribute &&
								d.getAttribute("data-gapistub") &&
								(c.parentNode.removeChild(d),
								(c.style.cssText = ""));
							d = a.width;
							var f = a.height,
								g = c.style;
							g.textIndent = "0";
							g.margin = "0";
							g.padding = "0";
							g.background = "transparent";
							g.borderStyle = "none";
							g.cssFloat = "none";
							g.styleFloat = "none";
							g.lineHeight = "normal";
							g.fontSize = "1px";
							g.verticalAlign = "baseline";
							c = c.style;
							c.display = "inline-block";
							g = b.style;
							g.position = "static";
							g.left = "0";
							g.top = "0";
							g.visibility = "visible";
							d && (c.width = g.width = d + "px");
							f && (c.height = g.height = f + "px");
							a.verticalAlign &&
								(c.verticalAlign = a.verticalAlign);
							e && wc(e, 3);
						}
						b["data-csi-wdt"] = new Date().getTime();
					}
				return !0;
			}
			return !1;
		},
		se = function (a, b) {
			dc(a, b);
		};
	var te = function (a, b) {
		this.N = a;
		a = b || {};
		this.ka = Number(a.maxAge) || 0;
		this.X = a.domain;
		this.$ = a.path;
		this.la = !!a.secure;
	};
	te.prototype.read = function () {
		for (
			var a = this.N + "=", b = document.cookie.split(/;\s*/), c = 0;
			c < b.length;
			++c
		) {
			var d = b[c];
			if (0 == d.indexOf(a)) return d.substr(a.length);
		}
	};
	te.prototype.write = function (a, b) {
		if (!ue.test(this.N)) throw "Invalid cookie name";
		if (!ve.test(a)) throw "Invalid cookie value";
		a = this.N + "=" + a;
		this.X && (a += ";domain=" + this.X);
		this.$ && (a += ";path=" + this.$);
		b = "number" === typeof b ? b : this.ka;
		if (0 <= b) {
			var c = new Date();
			c.setSeconds(c.getSeconds() + b);
			a += ";expires=" + c.toUTCString();
		}
		this.la && (a += ";secure");
		document.cookie = a;
		return !0;
	};
	te.prototype.clear = function () {
		this.write("", 0);
	};
	var ve = /^[-+/_=.:|%&a-zA-Z0-9@]*$/,
		ue = /^[A-Z_][A-Z0-9_]{0,63}$/;
	te.iterate = function (a) {
		for (var b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
			var d = b[c].split("="),
				e = d.shift();
			a(e, d.join("="));
		}
	};
	var we = function (a) {
		this.G = a;
	};
	we.prototype.read = function () {
		if (Y.hasOwnProperty(this.G)) return Y[this.G];
	};
	we.prototype.write = function (a) {
		Y[this.G] = a;
		return !0;
	};
	we.prototype.clear = function () {
		delete Y[this.G];
	};
	var Y = {};
	we.iterate = function (a) {
		for (var b in Y) Y.hasOwnProperty(b) && a(b, Y[b]);
	};
	var xe = "https:" === window.location.protocol,
		ye = xe || "http:" === window.location.protocol ? te : we,
		ze = function (a) {
			var b = a.substr(1),
				c = "",
				d = window.location.hostname;
			if ("" !== b) {
				c = parseInt(b, 10);
				if (isNaN(c)) return null;
				b = d.split(".");
				if (b.length < c - 1) return null;
				b.length == c - 1 && (d = "." + d);
			} else d = "";
			return { i: "S" == a.charAt(0), domain: d, l: c };
		},
		Ae = function () {
			var a,
				b = null;
			ye.iterate(function (c, d) {
				0 === c.indexOf("G_AUTHUSER_") &&
					((c = ze(c.substring(11))),
					!a || (c.i && !a.i) || (c.i == a.i && c.l > a.l)) &&
					((a = c), (b = d));
			});
			return { ja: a, K: b };
		};
	var Be = function (a) {
			if (0 !== a.indexOf("GCSC")) return null;
			var b = { Z: !1 };
			a = a.substr(4);
			if (!a) return b;
			var c = a.charAt(0);
			a = a.substr(1);
			var d = a.lastIndexOf("_");
			if (-1 == d) return b;
			var e = ze(a.substr(d + 1));
			if (null == e) return b;
			a = a.substring(0, d);
			if ("_" !== a.charAt(0)) return b;
			d = "E" === c && e.i;
			return (!d && ("U" !== c || e.i)) || (d && !xe)
				? b
				: { Z: !0, i: d, pa: a.substr(1), domain: e.domain, l: e.l };
		},
		Ce = function (a) {
			if (!a) return [];
			a = a.split("=");
			return a[1] ? a[1].split("|") : [];
		},
		De = function (a) {
			a = a.split(":");
			return {
				clientId: a[0].split("=")[1],
				na: Ce(a[1]),
				ra: Ce(a[2]),
				qa: Ce(a[3]),
			};
		},
		Ee = function () {
			var a = Ae(),
				b = a.ja;
			a = a.K;
			if (null !== a) {
				var c;
				ye.iterate(function (f, g) {
					(f = Be(f)) && f.Z && f.i == b.i && f.l == b.l && (c = g);
				});
				if (c) {
					var d = De(c),
						e = d && d.na[Number(a)];
					d = d && d.clientId;
					if (e) return { K: a, ma: e, clientId: d };
				}
			}
			return null;
		};
	var Z = function () {
		this.W = Fe;
	};
	Z.prototype.ca = function () {
		this.M || ((this.v = 0), (this.M = !0), this.aa());
	};
	Z.prototype.aa = function () {
		this.M &&
			(this.W()
				? (this.v = this.U)
				: (this.v = Math.min(2 * (this.v || this.U), 120)),
			window.setTimeout(na(this.aa, this), 1e3 * this.v));
	};
	Z.prototype.v = 0;
	Z.prototype.U = 2;
	Z.prototype.W = null;
	Z.prototype.M = !1;
	for (var Ge = 0; 64 > Ge; ++Ge);
	var He = null;
	tc = function () {
		return (L.oa = !0);
	};
	uc = function () {
		L.oa = !0;
		var a = Ee();
		(a = a && a.K) && kc("googleapis.config/sessionIndex", a);
		He || (He = C(L, "ss", new Z()));
		a = He;
		a.ca && a.ca();
	};
	var Fe = function () {
		var a = Ee(),
			b = (a && a.ma) || null,
			c = a && a.clientId;
		dc("auth", {
			callback: function () {
				var d = A.gapi.auth,
					e = { client_id: c, session_state: b };
				d.checkSessionState(e, function (f) {
					var g = e.session_state,
						h = Q("isLoggedIn");
					f = Q("debug/forceIm") ? !1 : (g && f) || (!g && !f);
					if ((h = h != f))
						kc("isLoggedIn", f),
							uc(),
							Ud(),
							f ||
								((f = d.signOut)
									? f()
									: (f = d.setToken) && f(null));
					f = pc();
					var k = Q("savedUserState");
					g = d._guss(f.cookiepolicy);
					k = k != g && "undefined" != typeof k;
					kc("savedUserState", g);
					(h || k) &&
						qc(f) &&
						!Q("disableRealtimeCallback") &&
						d._pimf(f, !0);
				});
			},
		});
		return !0;
	};
	N("bs0", !0, window.gapi._bs);
	N("bs1", !0);
	delete window.gapi._bs;
}.call(this));
gapi.load("", {
	callback: window["gapi_onload"],
	_c: {
		jsl: {
			ci: {
				deviceType: "desktop",
				"oauth-flow": {
					authUrl: "https://accounts.google.com/o/oauth2/auth",
					proxyUrl:
						"https://accounts.google.com/o/oauth2/postmessageRelay",
					disableOpt: true,
					idpIframeUrl: "https://accounts.google.com/o/oauth2/iframe",
					usegapi: false,
				},
				debug: {
					reportExceptionRate: 0.05,
					forceIm: false,
					rethrowException: false,
					host: "https://apis.google.com",
				},
				enableMultilogin: true,
				"googleapis.config": { auth: { useFirstPartyAuthV2: true } },
				isPlusUser: false,
				inline: { css: 1 },
				disableRealtimeCallback: false,
				drive_share: { skipInitCommand: true },
				csi: { rate: 0.01 },
				client: { cors: false },
				isLoggedIn: true,
				signInDeprecation: { rate: 0.0 },
				include_granted_scopes: true,
				llang: "ko",
				iframes: {
					youtube: {
						params: { location: ["search", "hash"] },
						url:
							":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1",
						methods: ["scroll", "openwindow"],
					},
					ytsubscribe: {
						url:
							"https://www.youtube.com/subscribe_embed?usegapi\u003d1",
					},
					plus_circle: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1",
					},
					plus_share: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1",
					},
					rbr_s: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller",
					},
					":source:": "3p",
					playemm: {
						url:
							"https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1",
					},
					savetoandroidpay: {
						url: "https://pay.google.com/gp/v/widget/save",
					},
					blogger: {
						params: { location: ["search", "hash"] },
						url:
							":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1",
						methods: ["scroll", "openwindow"],
					},
					evwidget: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1",
					},
					partnersbadge: {
						url:
							"https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1",
					},
					dataconnector: {
						url:
							"https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi\u003d1",
					},
					surveyoptin: {
						url:
							"https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1",
					},
					":socialhost:": "https://apis.google.com",
					shortlists: { url: "" },
					hangout: {
						url:
							"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget",
					},
					plus_followers: {
						params: { url: "" },
						url:
							":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1",
					},
					post: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1",
					},
					":gplus_url:": "https://plus.google.com",
					signin: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1",
						methods: ["onauth"],
					},
					rbr_i: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation",
					},
					share: {
						url:
							":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1",
					},
					plusone: {
						params: { count: "", size: "", url: "" },
						url:
							":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1",
					},
					comments: {
						params: { location: ["search", "hash"] },
						url:
							":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1",
						methods: ["scroll", "openwindow"],
					},
					":im_socialhost:": "https://plus.googleapis.com",
					backdrop: {
						url:
							"https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1",
					},
					visibility: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1",
					},
					autocomplete: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix:_/widget/render/autocomplete",
					},
					additnow: {
						url:
							"https://apis.google.com/marketplace/button?usegapi\u003d1",
						methods: ["launchurl"],
					},
					":signuphost:": "https://plus.google.com",
					ratingbadge: {
						url:
							"https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1",
					},
					appcirclepicker: {
						url:
							":socialhost:/:session_prefix:_/widget/render/appcirclepicker",
					},
					follow: {
						url:
							":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1",
					},
					community: {
						url:
							":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1",
					},
					sharetoclassroom: {
						url:
							"https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1",
					},
					ytshare: {
						params: { url: "" },
						url:
							":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1",
					},
					plus: {
						url:
							":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1",
					},
					family_creation: {
						params: { url: "" },
						url:
							"https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1",
					},
					commentcount: {
						url:
							":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1",
					},
					configurator: {
						url:
							":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1",
					},
					zoomableimage: {
						url: "https://ssl.gstatic.com/microscope/embed/",
					},
					appfinder: {
						url:
							"https://gsuite.google.com/:session_prefix:marketplace/appfinder?usegapi\u003d1",
					},
					savetowallet: {
						url: "https://pay.google.com/gp/v/widget/save",
					},
					person: {
						url:
							":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1",
					},
					savetodrive: {
						url:
							"https://drive.google.com/savetodrivebutton?usegapi\u003d1",
						methods: ["save"],
					},
					page: {
						url:
							":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1",
					},
					card: {
						url: ":socialhost:/:session_prefix:_/hovercard/card",
					},
				},
			},
			h:
				"m;/_/scs/apps-static/_/js/k\u003doz.gapi.ko.DTOYMvZPvrQ.O/am\u003dwQc/d\u003d1/ct\u003dzgms/rs\u003dAGLTcCM6hk4Xe82LUvaExBMMHda9B6peRA/m\u003d__features__",
			u: "https://apis.google.com/js/platform.js",
			hee: true,
			fp: "40e311032f69167abdbc28a2945cbe12bded4ed0",
			dpo: false,
		},
		platform: [
			"additnow",
			"backdrop",
			"blogger",
			"comments",
			"commentcount",
			"community",
			"donation",
			"family_creation",
			"follow",
			"hangout",
			"health",
			"page",
			"partnersbadge",
			"person",
			"playemm",
			"playreview",
			"plus",
			"plusone",
			"post",
			"ratingbadge",
			"savetoandroidpay",
			"savetodrive",
			"savetowallet",
			"sharetoclassroom",
			"shortlists",
			"signin2",
			"surveyoptin",
			"visibility",
			"youtube",
			"ytsubscribe",
			"zoomableimage",
		],
		fp: "40e311032f69167abdbc28a2945cbe12bded4ed0",
		annotation: [
			"interactivepost",
			"recobar",
			"signin2",
			"autocomplete",
			"profile",
		],
		bimodal: ["signin", "share"],
	},
});
