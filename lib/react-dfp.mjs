import e from "react";
//#region \0rolldown/runtime.js
var t = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), n = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), r = (/* @__PURE__ */ t(((e, t) => {
	var n = typeof Reflect == "object" ? Reflect : null, r = n && typeof n.apply == "function" ? n.apply : function(e, t, n) {
		return Function.prototype.apply.call(e, t, n);
	}, i = n && typeof n.ownKeys == "function" ? n.ownKeys : Object.getOwnPropertySymbols ? function(e) {
		return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
	} : function(e) {
		return Object.getOwnPropertyNames(e);
	};
	function a(e) {
		console && console.warn && console.warn(e);
	}
	var o = Number.isNaN || function(e) {
		return e !== e;
	};
	function s() {
		s.init.call(this);
	}
	t.exports = s, t.exports.once = y, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
	var c = 10;
	function l(e) {
		if (typeof e != "function") throw TypeError("The \"listener\" argument must be of type Function. Received type " + typeof e);
	}
	Object.defineProperty(s, "defaultMaxListeners", {
		enumerable: !0,
		get: function() {
			return c;
		},
		set: function(e) {
			if (typeof e != "number" || e < 0 || o(e)) throw RangeError("The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + e + ".");
			c = e;
		}
	}), s.init = function() {
		(this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
	}, s.prototype.setMaxListeners = function(e) {
		if (typeof e != "number" || e < 0 || o(e)) throw RangeError("The value of \"n\" is out of range. It must be a non-negative number. Received " + e + ".");
		return this._maxListeners = e, this;
	};
	function u(e) {
		return e._maxListeners === void 0 ? s.defaultMaxListeners : e._maxListeners;
	}
	s.prototype.getMaxListeners = function() {
		return u(this);
	}, s.prototype.emit = function(e) {
		for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
		var i = e === "error", a = this._events;
		if (a !== void 0) i &&= a.error === void 0;
		else if (!i) return !1;
		if (i) {
			var o;
			if (t.length > 0 && (o = t[0]), o instanceof Error) throw o;
			var s = /* @__PURE__ */ Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
			throw s.context = o, s;
		}
		var c = a[e];
		if (c === void 0) return !1;
		if (typeof c == "function") r(c, this, t);
		else for (var l = c.length, u = g(c, l), n = 0; n < l; ++n) r(u[n], this, t);
		return !0;
	};
	function d(e, t, n, r) {
		var i, o, s;
		if (l(n), o = e._events, o === void 0 ? (o = e._events = Object.create(null), e._eventsCount = 0) : (o.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), o = e._events), s = o[t]), s === void 0) s = o[t] = n, ++e._eventsCount;
		else if (typeof s == "function" ? s = o[t] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n), i = u(e), i > 0 && s.length > i && !s.warned) {
			s.warned = !0;
			var c = /* @__PURE__ */ Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
			c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = s.length, a(c);
		}
		return e;
	}
	s.prototype.addListener = function(e, t) {
		return d(this, e, t, !1);
	}, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(e, t) {
		return d(this, e, t, !0);
	};
	function f() {
		if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
	}
	function p(e, t, n) {
		var r = {
			fired: !1,
			wrapFn: void 0,
			target: e,
			type: t,
			listener: n
		}, i = f.bind(r);
		return i.listener = n, r.wrapFn = i, i;
	}
	s.prototype.once = function(e, t) {
		return l(t), this.on(e, p(this, e, t)), this;
	}, s.prototype.prependOnceListener = function(e, t) {
		return l(t), this.prependListener(e, p(this, e, t)), this;
	}, s.prototype.removeListener = function(e, t) {
		var n, r, i, a, o;
		if (l(t), r = this._events, r === void 0 || (n = r[e], n === void 0)) return this;
		if (n === t || n.listener === t) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
		else if (typeof n != "function") {
			for (i = -1, a = n.length - 1; a >= 0; a--) if (n[a] === t || n[a].listener === t) {
				o = n[a].listener, i = a;
				break;
			}
			if (i < 0) return this;
			i === 0 ? n.shift() : _(n, i), n.length === 1 && (r[e] = n[0]), r.removeListener !== void 0 && this.emit("removeListener", e, o || t);
		}
		return this;
	}, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(e) {
		var t, n = this._events, r;
		if (n === void 0) return this;
		if (n.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete n[e]), this;
		if (arguments.length === 0) {
			var i = Object.keys(n), a;
			for (r = 0; r < i.length; ++r) a = i[r], a !== "removeListener" && this.removeAllListeners(a);
			return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
		}
		if (t = n[e], typeof t == "function") this.removeListener(e, t);
		else if (t !== void 0) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
		return this;
	};
	function m(e, t, n) {
		var r = e._events;
		if (r === void 0) return [];
		var i = r[t];
		return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? v(i) : g(i, i.length);
	}
	s.prototype.listeners = function(e) {
		return m(this, e, !0);
	}, s.prototype.rawListeners = function(e) {
		return m(this, e, !1);
	}, s.listenerCount = function(e, t) {
		return typeof e.listenerCount == "function" ? e.listenerCount(t) : h.call(e, t);
	}, s.prototype.listenerCount = h;
	function h(e) {
		var t = this._events;
		if (t !== void 0) {
			var n = t[e];
			if (typeof n == "function") return 1;
			if (n !== void 0) return n.length;
		}
		return 0;
	}
	s.prototype.eventNames = function() {
		return this._eventsCount > 0 ? i(this._events) : [];
	};
	function g(e, t) {
		for (var n = Array(t), r = 0; r < t; ++r) n[r] = e[r];
		return n;
	}
	function _(e, t) {
		for (; t + 1 < e.length; t++) e[t] = e[t + 1];
		e.pop();
	}
	function v(e) {
		for (var t = Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
		return t;
	}
	function y(e, t) {
		return new Promise(function(n, r) {
			function i(n) {
				e.removeListener(t, a), r(n);
			}
			function a() {
				typeof e.removeListener == "function" && e.removeListener("error", i), n([].slice.call(arguments));
			}
			x(e, t, a, { once: !0 }), t !== "error" && b(e, i, { once: !0 });
		});
	}
	function b(e, t, n) {
		typeof e.on == "function" && x(e, "error", t, n);
	}
	function x(e, t, n, r) {
		if (typeof e.on == "function") r.once ? e.once(t, n) : e.on(t, n);
		else if (typeof e.addEventListener == "function") e.addEventListener(t, function i(a) {
			r.once && e.removeEventListener(t, i), n(a);
		});
		else throw TypeError("The \"emitter\" argument must be of type EventEmitter. Received type " + typeof e);
	}
})))(), i = {
	standard: "securepubads.g.doubleclick.net",
	limitedAds: "pagead2.googlesyndication.com"
};
function a(e, t, n) {
	window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [];
	let r = document.createElement("script");
	r.src = `${document.location.protocol}//${n ? i.limitedAds : i.standard}/tag/js/gpt.js`, r.async = !0, r.type = "text/javascript", r.onerror = function(e) {
		t(e);
	}, r.onload = function() {
		e(window.googletag);
	}, document.getElementsByTagName("head")[0].appendChild(r);
}
function o(e = !1) {
	return new Promise((t, n) => {
		a(t, n, e);
	});
}
//#endregion
//#region js/manager.js
var s = null, c = null, l = !0, u = !1, d = !1, f = null, p = !0, m = !0, h = {}, g = !1, _ = {}, v = {}, y = !1, b = Object.assign(new r.EventEmitter().setMaxListeners(0), {
	singleRequestIsEnabled() {
		return l;
	},
	configureSingleRequest(e) {
		l = !!e;
	},
	disableInitialLoadIsEnabled() {
		return u;
	},
	configureDisableInitialLoad(e) {
		u = !!e;
	},
	configureLazyLoad(e = !0, t = null) {
		let n = null;
		typeof t == "object" && t && (n = { ...t }), d = !!e, f = n;
	},
	lazyLoadIsEnabled() {
		return d;
	},
	limitedAdsIsEnabled() {
		return y;
	},
	configureLimitedAds(e) {
		y = !!e;
	},
	getLazyLoadConfig() {
		return f;
	},
	getAdSenseAttribute(e) {
		return v[e];
	},
	configurePersonalizedAds(e) {
		p = e;
	},
	configureCookieOption(e) {
		m = e;
	},
	personalizedAdsEnabled() {
		return p;
	},
	cookiesEnabled() {
		return m;
	},
	setAdSenseAttribute(e, t) {
		this.setAdSenseAttributes({ [e]: t });
	},
	getAdSenseAttributes() {
		return { ...v };
	},
	setAdSenseAttributes(e) {
		Object.assign(v, e), g === !0 && this.getGoogletag().then((e) => {
			e.cmd.push(() => {
				let t = e.pubads();
				Object.keys(v).forEach((e) => {
					t.set(e, _[e]);
				});
			});
		});
	},
	setTargetingArguments(e) {
		Object.assign(_, e), Object.keys(h).forEach((t) => {
			h[t].targetingArguments = e;
		}), g === !0 && this.getGoogletag().then((e) => {
			e.cmd.push(() => {
				let t = e.pubads();
				Object.keys(_).forEach((e) => {
					t && t.setTargeting(e, _[e]);
				});
			});
		});
	},
	getTargetingArguments() {
		return { ..._ };
	},
	getSlotProperty(e, t) {
		let n = this.getRegisteredSlots()[e], r = null;
		return n !== void 0 && (r = n[t] || r), r;
	},
	getSlotTargetingArguments(e) {
		let t = this.getSlotProperty(e, "targetingArguments");
		return t ? { ...t } : null;
	},
	getSlotAdSenseAttributes(e) {
		let t = this.getSlotProperty(e, "adSenseAttributes");
		return t ? { ...t } : null;
	},
	init() {
		g === !1 && (g = !0, this.getGoogletag().then((e) => {
			e.cmd.push(() => {
				let t = e.pubads();
				t.addEventListener("slotRenderEnded", (e) => {
					let t = e.slot.getSlotElementId();
					this.emit("slotRenderEnded", {
						slotId: t,
						event: e
					});
				}), t.addEventListener("impressionViewable", (e) => {
					let t = e.slot.getSlotElementId();
					this.emit("impressionViewable", {
						slotId: t,
						event: e
					});
				}), t.addEventListener("slotVisibilityChanged", (e) => {
					let t = e.slot.getSlotElementId();
					this.emit("slotVisibilityChanged", {
						slotId: t,
						event: e
					});
				}), t.setRequestNonPersonalizedAds(+!this.personalizedAdsEnabled()), t.setCookieOptions(+!this.cookiesEnabled());
			});
		}));
	},
	getGoogletag() {
		return c === null && (c = o(y)), c;
	},
	setCollapseEmptyDivs(e) {
		this.collapseEmptyDivs = e;
	},
	load(...e) {
		s = s === null ? this.doLoad(...e) : s.then(() => this.doLoad(...e));
	},
	doLoad(...e) {
		this.init();
		let t = [];
		return t = e.length > 0 ? e.filter((e) => Object.prototype.hasOwnProperty.call(h, e)) : Object.keys(h), t = t.filter((e) => !h[e].loading && !h[e].gptSlot), t.forEach((e) => {
			h[e].loading = !0;
		}), this.gptLoadAds(t);
	},
	gptLoadAds(e) {
		return new Promise((t) => {
			if (!e || e.length === 0) {
				t();
				return;
			}
			this.getGoogletag().then((n) => {
				this.configureInitialOptions(n), e.forEach((e) => {
					h[e].loading = !1, n.cmd.push(() => {
						let t = h[e], r, i = `${t.dfpNetworkId}/${t.adUnit}`;
						if (r = t.renderOutOfThePage === !0 ? n.defineOutOfPageSlot(i, e) : n.defineSlot(i, t.sizes, e), r !== null) {
							t.gptSlot = r;
							let i = this.getSlotTargetingArguments(e);
							i !== null && Object.keys(i).forEach((e) => {
								t && t.gptSlot && t.gptSlot.setTargeting(e, i[e]);
							});
							let a = this.getSlotAdSenseAttributes(e);
							if (a !== null && Object.keys(a).forEach((e) => {
								t.gptSlot.set(e, a[e]);
							}), t.gptSlot.addService(n.pubads()), t.sizeMapping) {
								let e = n.sizeMapping();
								t.sizeMapping.forEach((t) => {
									e = e.addSize(t.viewport, t.sizes);
								}), t.gptSlot.defineSizeMapping(e.build());
							}
						}
					});
				}), this.configureOptions(n), n.cmd.push(() => {
					n.enableServices(), e.forEach((e) => {
						n.display(e);
					}), t();
				});
			});
		});
	},
	configureInitialOptions(e) {
		e.cmd.push(() => {
			this.disableInitialLoadIsEnabled() && e.pubads().disableInitialLoad();
		});
	},
	configureOptions(e) {
		e.cmd.push(() => {
			let t = e.pubads();
			t.setRequestNonPersonalizedAds(+!this.personalizedAdsEnabled()), t.setCookieOptions(+!this.cookiesEnabled());
			let n = this.getTargetingArguments();
			Object.keys(n).forEach((e) => {
				t && t.setTargeting(e, n[e]);
			});
			let r = this.getAdSenseAttributes();
			if (Object.keys(r).forEach((e) => {
				t.set(e, r[e]);
			}), this.lazyLoadIsEnabled()) {
				let e = this.getLazyLoadConfig();
				e ? t.enableLazyLoad(e) : t.enableLazyLoad();
			}
			this.singleRequestIsEnabled() && t.enableSingleRequest(), (this.collapseEmptyDivs === !0 || this.collapseEmptyDivs === !1) && t.collapseEmptyDivs(this.collapseEmptyDivs);
		});
	},
	getRefreshableSlots(...e) {
		let t = {};
		return e.length === 0 ? Object.keys(h).map((e) => h[e]).reduce((e, n) => (n.slotShouldRefresh() === !0 && (t[n.slotId] = n), t), t) : e.reduce((e, n) => {
			let r = h[n];
			return r !== void 0 && (t[n] = r), t;
		}, t);
	},
	refresh(...e) {
		s === null ? this.load() : s.then(() => {
			this.gptRefreshAds(Object.keys(this.getRefreshableSlots(...e)));
		});
	},
	gptRefreshAds(e) {
		return this.getGoogletag().then((t) => {
			this.configureOptions(t), t.cmd.push(() => {
				let n = t.pubads(), r = e.map((e) => h[e].slotId);
				n.refresh(r);
			});
		});
	},
	reload(...e) {
		return this.destroyGPTSlots(...e).then(() => this.load());
	},
	destroyGPTSlots(...e) {
		e.length === 0 && (e = Object.keys(h));
		let t = e.map((e) => h[e]).filter((e) => e !== void 0);
		return new Promise((n) => {
			this.getGoogletag().then((r) => {
				r.cmd.push(() => {
					if (g === !0) if (t.length > 0) {
						let e = [];
						for (let n of t) n.gptSlot != null && (e.push(n.gptSlot), delete n.gptSlot);
						e.length > 0 && r.destroySlots(e);
					} else r.destroySlots();
					n(e);
				});
			});
		});
	},
	registerSlot({ slotId: e, dfpNetworkId: t, adUnit: n, sizes: r, renderOutOfThePage: i, sizeMapping: a, adSenseAttributes: o, targetingArguments: c, slotShouldRefresh: l }, u = !0) {
		Object.prototype.hasOwnProperty.call(h, e) || (h[e] = {
			slotId: e,
			sizes: r,
			renderOutOfThePage: i,
			dfpNetworkId: t,
			adUnit: n,
			adSenseAttributes: o,
			targetingArguments: c,
			sizeMapping: a,
			slotShouldRefresh: l,
			loading: !1
		}, this.emit("slotRegistered", { slotId: e }), u === !0 && s !== null && (s = s.catch().then(() => {
			let t = h[e];
			if (t !== void 0) {
				let { loading: n, gptSlot: r } = t;
				n === !1 && !r && this.load(e);
			}
		})));
	},
	unregisterSlot({ slotId: e }) {
		this.destroyGPTSlots(e), delete h[e];
	},
	getRegisteredSlots() {
		return h;
	},
	attachSlotRenderEnded(e) {
		this.on("slotRenderEnded", e);
	},
	detachSlotRenderEnded(e) {
		this.removeListener("slotRenderEnded", e);
	},
	attachSlotVisibilityChanged(e) {
		this.on("slotVisibilityChanged", e);
	},
	detachSlotVisibilityChanged(e) {
		this.removeListener("slotVisibilityChanged", e);
	},
	attachSlotIsViewable(e) {
		this.on("impressionViewable", e);
	},
	detachSlotIsViewable(e) {
		this.removeListener("impressionViewable", e);
	}
}), x = /* @__PURE__ */ t(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), S = /* @__PURE__ */ t(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case O: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function r(e) {
			return "" + e;
		}
		function i(e) {
			try {
				r(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), r(e);
			}
		}
		function a(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = A.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (j.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				P || (P = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return F[e] || (F[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, r, a, s, u) {
			var f = n.children;
			if (f !== void 0) if (a) if (M(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (j.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", R[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), R[f + a] = !0);
			}
			if (f = null, r !== void 0 && (i(r), f = "" + r), c(n) && (i(n.key), f = "" + n.key), "key" in n) for (var h in r = {}, n) h !== "key" && (r[h] = n[h]);
			else r = n;
			return f && l(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, r, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = n("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), A = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = Object.prototype.hasOwnProperty, M = Array.isArray, N = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var P, F = {}, I = h.react_stack_bottom_frame.bind(h, s)(), L = N(a(s)), R = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : I, r ? N(a(e)) : L);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : I, r ? N(a(e)) : L);
		};
	})();
})), C = (/* @__PURE__ */ t(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = x() : t.exports = S();
})))(), w = e.createContext ? e.createContext({
	dfpNetworkId: null,
	dfpAdUnit: null,
	dfpSizeMapping: null,
	dfpTargetingArguments: null,
	newSlotCallback: null,
	releaseSlotCallback: null
}) : null, T = class extends e.Component {
	static defaultProps = {
		autoLoad: !0,
		autoReload: {
			dfpNetworkId: !1,
			personalizedAds: !1,
			cookieOption: !1,
			singleRequest: !1,
			disableInitialLoad: !1,
			adUnit: !1,
			sizeMapping: !1,
			adSenseAttributes: !1,
			targetingArguments: !1,
			collapseEmptyDivs: !1,
			lazyLoad: !1
		},
		personalizedAds: !0,
		cookieOption: !0,
		singleRequest: !0,
		disableInitialLoad: !1,
		collapseEmptyDivs: null,
		lazyLoad: !1,
		limitedAds: !1
	};
	constructor(e) {
		super(e), this.loadAdsIfPossible = this.loadAdsIfPossible.bind(this), this.newSlotCallback = this.newSlotCallback.bind(this), this.applyConfigs = this.applyConfigs.bind(this), this.shouldReloadConfig = this.shouldReloadConfig.bind(this), this.attachLoadCallback = this.attachLoadCallback.bind(this), this.getContextValue = this.getContextValue.bind(this), this.releaseSlotCallback = this.releaseSlotCallback.bind(this), this.loadAlreadyCalled = !1, this.loadCallbackAttached = !1, this.shouldReloadAds = !1, this.totalSlots = 0, this.contextValue = {}, w === null && (this.getChildContext = () => this.getContextValue());
	}
	componentDidMount() {
		this.applyConfigs(), this.props.autoLoad && !this.loadAdsIfPossible() && this.attachLoadCallback();
	}
	shouldComponentUpdate(e) {
		return this.shouldReloadAds = this.shouldReloadConfig(e), e.children !== this.props.children || e.autoLoad && !this.props.autoLoad ? !0 : this.shouldReloadAds;
	}
	componentDidUpdate() {
		this.applyConfigs(), this.props.autoLoad && (this.loadAlreadyCalled ? this.shouldReloadAds && b.reload() : this.loadAdsIfPossible() || this.attachLoadCallback()), this.shouldReloadAds = !1;
	}
	getContextValue() {
		let { props: { dfpNetworkId: e, adUnit: t, sizeMapping: n, targetingArguments: r }, contextValue: { dfpNetworkId: i, adUnit: a, sizeMapping: o, targetingArguments: s } } = this;
		return (e !== i || t !== a || n !== o || r !== s) && (this.contextValue = {
			dfpNetworkId: e,
			dfpAdUnit: t,
			dfpSizeMapping: n,
			dfpTargetingArguments: r,
			newSlotCallback: this.newSlotCallback,
			releaseSlotCallback: this.releaseSlotCallback
		}), this.contextValue;
	}
	applyConfigs() {
		b.configurePersonalizedAds(this.props.personalizedAds), b.configureCookieOption(this.props.cookieOption), b.configureSingleRequest(this.props.singleRequest), b.configureDisableInitialLoad(this.props.disableInitialLoad), b.configureLazyLoad(!!this.props.lazyLoad, typeof this.props.lazyLoad == "boolean" ? null : this.props.lazyLoad), b.setAdSenseAttributes(this.props.adSenseAttributes), b.setCollapseEmptyDivs(this.props.collapseEmptyDivs), b.configureLimitedAds(this.props.limitedAds);
	}
	attachLoadCallback() {
		return this.loadCallbackAttached === !1 ? (b.on("slotRegistered", this.loadAdsIfPossible), this.loadCallbackAttached = !0, !0) : !1;
	}
	newSlotCallback() {
		this.totalSlots++;
	}
	releaseSlotCallback() {
		this.totalSlots = Math.max(0, this.totalSlots - 1);
	}
	loadAdsIfPossible() {
		let e = !1, t = Object.keys(b.getRegisteredSlots()).length;
		return this.totalSlots > 0 && t >= this.totalSlots && (b.removeListener("slotRegistered", this.loadAdsIfPossible), b.load(), this.loadAlreadyCalled = !0, this.loadCallbackAttached = !1, e = !0), e;
	}
	shouldReloadConfig(e) {
		let t = e.autoReload || this.props.autoReload;
		if ((this.props.autoLoad || e.autoLoad) && typeof t == "object") {
			let n = Object.keys(t);
			for (let r in n) {
				let i = n[r];
				if (t[i] === !0 && this.props[i] !== e[i]) return !0;
			}
		}
		return !1;
	}
	render() {
		let { children: e } = this.props;
		return w === null ? e : /* @__PURE__ */ (0, C.jsx)(w.Provider, {
			value: this.getContextValue(),
			children: e
		});
	}
};
w === null && (T.childContextTypes = {
	dfpNetworkId: () => {},
	dfpAdUnit: () => {},
	dfpSizeMapping: () => {},
	dfpTargetingArguments: () => {},
	newSlotCallback: () => {},
	releaseSlotCallback: () => {}
});
//#endregion
//#region js/adslot.jsx
var E = 0, D = class extends e.Component {
	static defaultProps = { fetchNow: !1 };
	constructor(t) {
		super(t), this.doRegisterSlot = this.doRegisterSlot.bind(this), this.generateSlotId = this.generateSlotId.bind(this), this.getSlotId = this.getSlotId.bind(this), this.mapContextToAdSlotProps = this.mapContextToAdSlotProps.bind(this), this.slotShouldRefresh = this.slotShouldRefresh.bind(this), this.slotRenderEnded = this.slotRenderEnded.bind(this), this.slotRegisterCallback = this.slotRegisterCallback.bind(this), this.slotIsViewable = this.slotIsViewable.bind(this), this.slotVisibilityChanged = this.slotVisibilityChanged.bind(this), this.getClasses = this.getClasses.bind(this), this.state = {
			slotId: this.props.slotId || null,
			className: this.props.className || ""
		}, this.adElementRef = e.createRef ? e.createRef() : (e) => {
			this.adElementRef = e;
		}, this._dfpNotifiedProvider = !1;
	}
	componentDidMount() {
		this.registerSlot();
	}
	componentWillUnmount() {
		let e = this.context;
		this._dfpNotifiedProvider && e !== void 0 && typeof e.releaseSlotCallback == "function" && (e.releaseSlotCallback(), this._dfpNotifiedProvider = !1), this.unregisterSlot();
	}
	getSlotId() {
		return this.props.slotId || this.state.slotId;
	}
	getClasses() {
		let e = this.state.className.split(" ");
		return e.push("adunitContainer"), e;
	}
	generateSlotId() {
		return `adSlot-${E++}`;
	}
	mapContextToAdSlotProps() {
		let e = this.context, t = {};
		return e.dfpNetworkId !== void 0 && (t.dfpNetworkId = e.dfpNetworkId), e.dfpAdUnit !== void 0 && (t.adUnit = e.dfpAdUnit), e.dfpSizeMapping !== void 0 && (t.sizeMapping = e.dfpSizeMapping), e.dfpTargetingArguments !== void 0 && (t.targetingArguments = e.dfpTargetingArguments), t;
	}
	doRegisterSlot() {
		let e = this.context;
		e !== void 0 && typeof e.newSlotCallback == "function" && (e.newSlotCallback(), this._dfpNotifiedProvider = !0), b.registerSlot({
			...this.mapContextToAdSlotProps(),
			...this.props,
			...this.state,
			slotShouldRefresh: this.slotShouldRefresh
		}), this.props.fetchNow === !0 && b.load(this.getSlotId()), b.attachSlotRenderEnded(this.slotRenderEnded), b.attachSlotIsViewable(this.slotIsViewable), b.attachSlotVisibilityChanged(this.slotVisibilityChanged), this.slotRegisterCallback();
	}
	registerSlot() {
		this.state.slotId === null ? this.setState({ slotId: this.generateSlotId() }, this.doRegisterSlot) : this.doRegisterSlot();
	}
	unregisterSlot() {
		b.unregisterSlot({
			...this.mapContextToAdSlotProps(),
			...this.props,
			...this.state
		}), b.detachSlotRenderEnded(this.slotRenderEnded), b.detachSlotIsViewable(this.slotIsViewable), b.detachSlotVisibilityChanged(this.slotVisibilityChanged);
	}
	slotRenderEnded(e) {
		if (e.slotId === this.getSlotId() && this.props.onSlotRender !== void 0) {
			let t = {
				...e,
				adElementRef: this.adElementRef
			};
			this.props.onSlotRender(t);
		}
	}
	slotRegisterCallback() {
		typeof this.props.onSlotRegister == "function" && this.props.onSlotRegister({
			slotId: this.getSlotId(),
			sizes: this.props.sizes,
			slotCount: E,
			adElementRef: this.adElementRef
		});
	}
	slotIsViewable(e) {
		e.slotId === this.getSlotId() && this.props.onSlotIsViewable !== void 0 && this.props.onSlotIsViewable(e);
	}
	slotVisibilityChanged(e) {
		e.slotId === this.getSlotId() && this.props.onSlotVisibilityChanged !== void 0 && this.props.onSlotVisibilityChanged(e);
	}
	slotShouldRefresh() {
		let e = !0;
		return this.props.shouldRefresh !== void 0 && (e = this.props.shouldRefresh({
			...this.mapContextToAdSlotProps(),
			...this.props,
			slotId: this.getSlotId()
		})), e;
	}
	render() {
		let { slotId: e } = this.state, t = { className: "adBox" };
		return e !== null && (t.id = e), /* @__PURE__ */ (0, C.jsx)("div", {
			className: this.getClasses().join(" ").trim(),
			children: /* @__PURE__ */ (0, C.jsx)("div", {
				ref: this.adElementRef,
				...t
			})
		});
	}
};
w != null && (D.contextType = w);
//#endregion
//#region js/index.js
var O = b, k = D, A = T;
//#endregion
export { k as AdSlot, O as DFPManager, A as DFPSlotsProvider };
