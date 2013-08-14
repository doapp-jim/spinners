// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
document.createElement("canvas").getContext ||
function() {
	function C() {}
	function B(a) {
		this.type_ = a, this.r1_ = this.y1_ = this.x1_ = this.r0_ = this.y0_ = this.x0_ = 0, this.colors_ = []
	}
	function A(a, b, c) {
		!z(b) || (a.m_ = b, c && (a.lineScale_ = f(e(b[0][0] * b[1][1] - b[0][1] * b[1][0]))))
	}
	function z(a) {
		var b = 0;
		for (; b < 3; b++) {
			var c = 0;
			for (; c < 2; c++) if (!isFinite(a[b][c]) || isNaN(a[b][c])) return !1
		}
		return !0
	}
	function y(a, b, c, d) {
		a.currentPath_.push({
			type: "bezierCurveTo",
			cp1x: b.x,
			cp1y: b.y,
			cp2x: c.x,
			cp2y: c.y,
			x: d.x,
			y: d.y
		}), a.currentX_ = d.x, a.currentY_ = d.y
	}
	function w(a) {
		this.m_ = r(), this.mStack_ = [], this.aStack_ = [], this.currentPath_ = [], this.fillStyle = this.strokeStyle = "#000", this.lineWidth = 1, this.lineJoin = "miter", this.lineCap = "butt", this.miterLimit = g * 1, this.globalAlpha = 1, this.canvas = a;
		var b = a.ownerDocument.createElement("div");
		b.style.width = a.clientWidth + "px", b.style.height = a.clientHeight + "px", b.style.overflow = "hidden", b.style.position = "absolute", a.appendChild(b), this.element_ = b, this.lineScale_ = this.arcScaleY_ = this.arcScaleX_ = 1
	}
	function v(a) {
		switch (a) {
		case "butt":
			return "flat";
		case "round":
			return "round";
		case "square":
		default:
			return "square"
		}
	}
	function u(a) {
		var b, c = 1;
		a = String(a);
		if (a.substring(0, 3) == "rgb") {
			var d = a.indexOf("(", 3),
				e = a.indexOf(")", d + 1),
				f = a.substring(d + 1, e).split(",");
			b = "#";
			var g = 0;
			for (; g < 3; g++) b += o[Number(f[g])];
			f.length == 4 && a.substr(3, 1) == "a" && (c = f[3])
		} else b = a;
		return {
			color: b,
			alpha: c
		}
	}
	function t(a, b) {
		b.fillStyle = a.fillStyle, b.lineCap = a.lineCap, b.lineJoin = a.lineJoin, b.lineWidth = a.lineWidth, b.miterLimit = a.miterLimit, b.shadowBlur = a.shadowBlur, b.shadowColor = a.shadowColor, b.shadowOffsetX = a.shadowOffsetX, b.shadowOffsetY = a.shadowOffsetY, b.strokeStyle = a.strokeStyle, b.globalAlpha = a.globalAlpha, b.arcScaleX_ = a.arcScaleX_, b.arcScaleY_ = a.arcScaleY_, b.lineScale_ = a.lineScale_
	}
	function s(a, b) {
		var c = r(),
			d = 0;
		for (; d < 3; d++) {
			var e = 0;
			for (; e < 3; e++) {
				var f = 0,
					g = 0;
				for (; g < 3; g++) f += a[d][g] * b[g][e];
				c[d][e] = f
			}
		}
		return c
	}
	function r() {
		return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
	}
	function n(a) {
		var b = a.srcElement;
		b.firstChild && (b.firstChild.style.width = b.clientWidth + "px", b.firstChild.style.height = b.clientHeight + "px")
	}
	function m(a) {
		var b = a.srcElement;
		switch (a.propertyName) {
		case "width":
			b.style.width = b.attributes.width.nodeValue + "px", b.getContext().clearRect();
			break;
		case "height":
			b.style.height = b.attributes.height.nodeValue + "px", b.getContext().clearRect()
		}
	}
	function k(a, b) {
		var c = j.call(arguments, 2);
		return function() {
			return a.apply(b, c.concat(j.call(arguments)))
		}
	}
	function i() {
		return this.context_ || (this.context_ = new w(this))
	}
	var a = Math,
		b = a.round,
		c = a.sin,
		d = a.cos,
		e = a.abs,
		f = a.sqrt,
		g = 10,
		h = g / 2,
		j = Array.prototype.slice,
		l = {
			init: function(a) {
				if (/MSIE/.test(navigator.userAgent) && !window.opera) {
					var b = a || document;
					b.createElement("canvas"), b.attachEvent("onreadystatechange", k(this.init_, this, b))
				}
			},
			init_: function(a) {
				a.namespaces.g_vml_ || a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML"), a.namespaces.g_o_ || a.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML");
				if (!a.styleSheets.ex_canvas_) {
					var b = a.createStyleSheet();
					b.owningElement.id = "ex_canvas_", b.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\:*{behavior:url(#default#VML)}g_o_\:*{behavior:url(#default#VML)}"
				}
				var c = a.getElementsByTagName("canvas"),
					d = 0;
				for (; d < c.length; d++) this.initElement(c[d])
			},
			initElement: function(a) {
				if (!a.getContext) {
					a.getContext = i, a.innerHTML = "", a.attachEvent("onpropertychange", m), a.attachEvent("onresize", n);
					var b = a.attributes;
					b.width && b.width.specified ? a.style.width = b.width.nodeValue + "px" : a.width = a.clientWidth, b.height && b.height.specified ? a.style.height = b.height.nodeValue + "px" : a.height = a.clientHeight
				}
				return a
			}
		};
	l.init();
	var o = [],
		p = 0;
	for (; p < 16; p++) {
		var q = 0;
		for (; q < 16; q++) o[p * 16 + q] = p.toString(16) + q.toString(16)
	}
	var x = w.prototype;
	x.clearRect = function() {
		this.element_.innerHTML = ""
	}, x.beginPath = function() {
		this.currentPath_ = []
	}, x.moveTo = function(a, b) {
		var c = this.getCoords_(a, b);
		this.currentPath_.push({
			type: "moveTo",
			x: c.x,
			y: c.y
		}), this.currentX_ = c.x, this.currentY_ = c.y
	}, x.lineTo = function(a, b) {
		var c = this.getCoords_(a, b);
		this.currentPath_.push({
			type: "lineTo",
			x: c.x,
			y: c.y
		}), this.currentX_ = c.x, this.currentY_ = c.y
	}, x.bezierCurveTo = function(a, b, c, d, e, f) {
		var g = this.getCoords_(e, f),
			h = this.getCoords_(a, b),
			i = this.getCoords_(c, d);
		y(this, h, i, g)
	}, x.quadraticCurveTo = function(a, b, c, d) {
		var e = this.getCoords_(a, b),
			f = this.getCoords_(c, d),
			g = {
				x: this.currentX_ + .6666666666666666 * (e.x - this.currentX_),
				y: this.currentY_ + .6666666666666666 * (e.y - this.currentY_)
			};
		y(this, g, {
			x: g.x + (f.x - this.currentX_) / 3,
			y: g.y + (f.y - this.currentY_) / 3
		}, f)
	}, x.arc = function(a, b, e, f, i, j) {
		e *= g;
		var k = j ? "at" : "wa",
			l = a + d(f) * e - h,
			m = b + c(f) * e - h,
			n = a + d(i) * e - h,
			o = b + c(i) * e - h;
		l == n && !j && (l += .125);
		var p = this.getCoords_(a, b),
			q = this.getCoords_(l, m),
			r = this.getCoords_(n, o);
		this.currentPath_.push({
			type: k,
			x: p.x,
			y: p.y,
			radius: e,
			xStart: q.x,
			yStart: q.y,
			xEnd: r.x,
			yEnd: r.y
		})
	}, x.rect = function(a, b, c, d) {
		this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), this.lineTo(a, b + d), this.closePath()
	}, x.strokeRect = function(a, b, c, d) {
		var e = this.currentPath_;
		this.beginPath(), this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), this.lineTo(a, b + d), this.closePath(), this.stroke(), this.currentPath_ = e
	}, x.fillRect = function(a, b, c, d) {
		var e = this.currentPath_;
		this.beginPath(), this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), this.lineTo(a, b + d), this.closePath(), this.fill(), this.currentPath_ = e
	}, x.createLinearGradient = function(a, b, c, d) {
		var e = new B("gradient");
		e.x0_ = a, e.y0_ = b, e.x1_ = c, e.y1_ = d;
		return e
	}, x.createRadialGradient = function(a, b, c, d, e, f) {
		var g = new B("gradientradial");
		g.x0_ = a, g.y0_ = b, g.r0_ = c, g.x1_ = d, g.y1_ = e, g.r1_ = f;
		return g
	}, x.drawImage = function(c) {
		var d, e, f, h, i, j, k, l, m = c.runtimeStyle.width,
			n = c.runtimeStyle.height;
		c.runtimeStyle.width = "auto", c.runtimeStyle.height = "auto";
		var o = c.width,
			p = c.height;
		c.runtimeStyle.width = m, c.runtimeStyle.height = n;
		if (arguments.length == 3) d = arguments[1], e = arguments[2], i = j = 0, k = f = o, l = h = p;
		else if (arguments.length == 5) d = arguments[1], e = arguments[2], f = arguments[3], h = arguments[4], i = j = 0, k = o, l = p;
		else if (arguments.length == 9) i = arguments[1], j = arguments[2], k = arguments[3], l = arguments[4], d = arguments[5], e = arguments[6], f = arguments[7], h = arguments[8];
		else throw Error("Invalid number of arguments");
		var q = this.getCoords_(d, e),
			r = [];
		r.push(" <g_vml_:group", ' coordsize="', g * 10, ",", g * 10, '"', ' coordorigin="0,0"', ' style="width:', 10, "px;height:", 10, "px;position:absolute;");
		if (this.m_[0][0] != 1 || this.m_[0][1]) {
			var s = [];
			s.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", b(q.x / g), ",", "Dy=", b(q.y / g), "");
			var t = q,
				u = this.getCoords_(d + f, e),
				v = this.getCoords_(d, e + h),
				w = this.getCoords_(d + f, e + h);
			t.x = a.max(t.x, u.x, v.x, w.x), t.y = a.max(t.y, u.y, v.y, w.y), r.push("padding:0 ", b(t.x / g), "px ", b(t.y / g), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", s.join(""), ", sizingmethod='clip');")
		} else r.push("top:", b(q.y / g), "px;left:", b(q.x / g), "px;");
		r.push(' ">', '<g_vml_:image src="', c.src, '"', ' style="width:', g * f, "px;", " height:", g * h, 'px;"', ' cropleft="', i / o, '"', ' croptop="', j / p, '"', ' cropright="', (o - i - k) / o, '"', ' cropbottom="', (p - j - l) / p, '"', " />", "</g_vml_:group>"), this.element_.insertAdjacentHTML("BeforeEnd", r.join(""))
	}, x.stroke = function(c) {
		var d = [],
			e = u(c ? this.fillStyle : this.strokeStyle),
			f = e.color,
			h = e.alpha * this.globalAlpha;
		d.push("<g_vml_:shape", ' filled="', !! c, '"', ' style="position:absolute;width:', 10, "px;height:", 10, 'px;"', ' coordorigin="0 0" coordsize="', g * 10, " ", g * 10, '"', ' stroked="', !c, '"', ' path="');
		var i = {
			x: null,
			y: null
		},
			j = {
				x: null,
				y: null
			},
			k = 0;
		for (; k < this.currentPath_.length; k++) {
			var l = this.currentPath_[k];
			switch (l.type) {
			case "moveTo":
				d.push(" m ", b(l.x), ",", b(l.y));
				break;
			case "lineTo":
				d.push(" l ", b(l.x), ",", b(l.y));
				break;
			case "close":
				d.push(" x "), l = null;
				break;
			case "bezierCurveTo":
				d.push(" c ", b(l.cp1x), ",", b(l.cp1y), ",", b(l.cp2x), ",", b(l.cp2y), ",", b(l.x), ",", b(l.y));
				break;
			case "at":
			case "wa":
				d.push(" ", l.type, " ", b(l.x - this.arcScaleX_ * l.radius), ",", b(l.y - this.arcScaleY_ * l.radius), " ", b(l.x + this.arcScaleX_ * l.radius), ",", b(l.y + this.arcScaleY_ * l.radius), " ", b(l.xStart), ",", b(l.yStart), " ", b(l.xEnd), ",", b(l.yEnd))
			}
			if (l) {
				if (i.x == null || l.x < i.x) i.x = l.x;
				if (j.x == null || l.x > j.x) j.x = l.x;
				if (i.y == null || l.y < i.y) i.y = l.y;
				if (j.y == null || l.y > j.y) j.y = l.y
			}
		}
		d.push(' ">');
		if (c) if (typeof this.fillStyle == "object") {
			var m = this.fillStyle,
				n = 0,
				o = {
					x: 0,
					y: 0
				},
				p = 0,
				q = 1;
			if (m.type_ == "gradient") {
				var r = m.x1_ / this.arcScaleX_,
					s = m.y1_ / this.arcScaleY_,
					t = this.getCoords_(m.x0_ / this.arcScaleX_, m.y0_ / this.arcScaleY_),
					w = this.getCoords_(r, s);
				n = Math.atan2(w.x - t.x, w.y - t.y) * 180 / Math.PI, n < 0 && (n += 360), n < 1e-6 && (n = 0)
			} else {
				var t = this.getCoords_(m.x0_, m.y0_),
					x = j.x - i.x,
					y = j.y - i.y;
				o = {
					x: (t.x - i.x) / x,
					y: (t.y - i.y) / y
				}, x /= this.arcScaleX_ * g, y /= this.arcScaleY_ * g;
				var z = a.max(x, y);
				p = 2 * m.r0_ / z, q = 2 * m.r1_ / z - p
			}
			var A = m.colors_;
			A.sort(function(a, b) {
				return a.offset - b.offset
			});
			var B = A.length,
				C = A[0].color,
				D = A[B - 1].color,
				E = A[0].alpha * this.globalAlpha,
				F = A[B - 1].alpha * this.globalAlpha,
				G = [],
				k = 0;
			for (; k < B; k++) {
				var H = A[k];
				G.push(H.offset * q + p + " " + H.color)
			}
			d.push('<g_vml_:fill type="', m.type_, '"', ' method="none" focus="20%"', ' color="', C, '"', ' color2="', D, '"', ' colors="', G.join(","), '"', ' opacity="', F, '"', ' g_o_:opacity2="', E, '"', ' angle="', n, '"', ' focusposition="', o.x, ",", o.y, '" />')
		} else d.push('<g_vml_:fill color="', f, '" opacity="', h, '" />');
		else {
			var I = this.lineScale_ * this.lineWidth;
			I < 1 && (h *= I), d.push("<g_vml_:stroke", ' opacity="', h, '"', ' joinstyle="', this.lineJoin, '"', ' miterlimit="', this.miterLimit, '"', ' endcap="', v(this.lineCap), '"', ' weight="', I, 'px"', ' color="', f, '" />')
		}
		d.push("</g_vml_:shape>"), this.element_.insertAdjacentHTML("beforeEnd", d.join(""))
	}, x.fill = function() {
		this.stroke(!0)
	}, x.closePath = function() {
		this.currentPath_.push({
			type: "close"
		})
	}, x.getCoords_ = function(a, b) {
		var c = this.m_;
		return {
			x: g * (a * c[0][0] + b * c[1][0] + c[2][0]) - h,
			y: g * (a * c[0][1] + b * c[1][1] + c[2][1]) - h
		}
	}, x.save = function() {
		var a = {};
		t(this, a), this.aStack_.push(a), this.mStack_.push(this.m_), this.m_ = s(r(), this.m_)
	}, x.restore = function() {
		t(this.aStack_.pop(), this), this.m_ = this.mStack_.pop()
	}, x.translate = function(a, b) {
		A(this, s([
			[1, 0, 0],
			[0, 1, 0],
			[a, b, 1]
		], this.m_), !1)
	}, x.rotate = function(a) {
		var b = d(a),
			e = c(a);
		A(this, s([
			[b, e, 0],
			[-e, b, 0],
			[0, 0, 1]
		], this.m_), !1)
	}, x.scale = function(a, b) {
		this.arcScaleX_ *= a, this.arcScaleY_ *= b, A(this, s([
			[a, 0, 0],
			[0, b, 0],
			[0, 0, 1]
		], this.m_), !0)
	}, x.transform = function(a, b, c, d, e, f) {
		A(this, s([
			[a, b, 0],
			[c, d, 0],
			[e, f, 1]
		], this.m_), !0)
	}, x.setTransform = function(a, b, c, d, e, f) {
		A(this, [
			[a, b, 0],
			[c, d, 0],
			[e, f, 1]
		], !0)
	}, x.clip = function() {}, x.arcTo = function() {}, x.createPattern = function() {
		return new C
	}, B.prototype.addColorStop = function(a, b) {
		b = u(b), this.colors_.push({
			offset: a,
			color: b.color,
			alpha: b.alpha
		})
	}, G_vmlCanvasManager = l, CanvasRenderingContext2D = w, CanvasGradient = B, CanvasPattern = C
}();