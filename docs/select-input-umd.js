/*! @dotburo/select-input 1.2.4 | dotburo <code@dotburo.org> (https://dotburo.org) !*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.SelectInput = factory());
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
	  : Function('return this')();
	  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	  var core = module.exports = {
	    version: '2.6.3'
	  };
	  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var document$1 = _global.document; // typeof document.createElement is 'object' in old IE

	var is = _isObject(document$1) && _isObject(document$1.createElement);

	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;
	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var _objectDp = {
	  f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();

	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _redefine = createCommonjsModule(function (module) {
	  var SRC = _uid('src');
	  var TO_STRING = 'toString';
	  var $toString = Function[TO_STRING];
	  var TPL = ('' + $toString).split(TO_STRING);

	  _core.inspectSource = function (it) {
	    return $toString.call(it);
	  };

	  (module.exports = function (O, key, val, safe) {
	    var isFunction = typeof val == 'function';
	    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	    if (O[key] === val) return;
	    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

	    if (O === _global) {
	      O[key] = val;
	    } else if (!safe) {
	      delete O[key];
	      _hide(O, key, val);
	    } else if (O[key]) {
	      O[key] = val;
	    } else {
	      _hide(O, key, val);
	    } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

	  })(Function.prototype, TO_STRING, function toString() {
	    return typeof this == 'function' && this[SRC] || $toString.call(this);
	  });
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;

	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

	    out = (own ? target : source)[key]; // bind timers to global for call from export context

	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out; // extend global

	    if (target) _redefine(target, key, out, type & $export.U); // export

	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};

	_global.core = _core; // type bitmap

	$export.F = 1; // forced

	$export.G = 2; // global

	$export.S = 4; // static

	$export.P = 8; // proto

	$export.B = 16; // bind

	$export.W = 32; // wrap

	$export.U = 64; // safe

	$export.R = 128; // real proto method for `library`

	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// eslint-disable-next-line no-prototype-builtins

	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;

	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var min = Math.min;

	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	  var SHARED = '__core-js_shared__';
	  var store = _global[SHARED] || (_global[SHARED] = {});
	  (module.exports = function (key, value) {
	    return store[key] || (store[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: _core.version,
	    mode: _library ? 'pure' : 'global',
	    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var _wks = createCommonjsModule(function (module) {
	  var store = _shared('wks');
	  var Symbol = _global.Symbol;
	  var USE_SYMBOL = typeof Symbol == 'function';

	  var $exports = module.exports = function (name) {
	    return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	  };

	  $exports.store = store;
	});

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;

	  if (_isArray(original)) {
	    C = original.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;

	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }

	  return C === undefined ? Array : C;
	};

	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex

	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);

	      if (TYPE) {
	        if (IS_MAP) result[index] = res; // map
	        else if (res) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return val;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              result.push(val);
	            // filter
	          } else if (IS_EVERY) return false; // every
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});

	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	var $find = _arrayMethods(6);
	var KEY = 'findIndex';
	var forced = true; // Shouldn't skip holes

	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	_export(_export.P + _export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn
	  /* , that = undefined */
	  ) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	var dP$1 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name'; // 19.2.4.2 name

	NAME in FProto || _descriptors && dP$1(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var _iterStep = function (done, value) {
	  return {
	    value: value,
	    done: !!done
	  };
	};

	var _iterators = {};

	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var max = Math.max;
	var min$1 = Math.min;

	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// true  -> Array#includes

	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;

	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);

	  return O;
	};

	var document$2 = _global.document;

	var _html = document$2 && document$2.documentElement;

	var IE_PROTO$1 = _sharedKey('IE_PROTO');

	var Empty = function () {
	  /* empty */
	};

	var PROTOTYPE$1 = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);

	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;

	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];

	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO$1] = O;
	  } else result = createDict();

	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;
	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
	    configurable: true,
	    value: tag
	  });
	};

	var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	_hide(IteratorPrototype, _wks('iterator'), function () {
	  return this;
	});

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, {
	    next: _propertyDesc(1, next)
	  });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () {
	  return this;
	};

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);

	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];

	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };

	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }

	    return function entries() {
	      return new Constructor(this, kind);
	    };
	  };

	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype; // Fix native

	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));

	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;

	    $default = function values() {
	      return $native.call(this);
	    };
	  } // Define iterator


	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  } // Plug for library


	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;

	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }

	  return methods;
	};

	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()


	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target

	  this._i = 0; // next index

	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;

	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }

	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

	_iterators.Arguments = _iterators.Array;
	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR$1 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;
	var DOMIterables = {
	  CSSRuleList: true,
	  // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true,
	  // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true,
	  // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME$1 = collections[i];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto = Collection && Collection.prototype;
	  var key;

	  if (proto) {
	    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

	// false -> String#codePointAt

	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var at = _stringAt(true); // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex

	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var TAG$1 = _wks('toStringTag'); // ES3 wrong here

	var ARG = _cof(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) {
	    /* empty */
	  }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T // builtinTag case
	  : ARG ? _cof(O) // ES3 arguments fallback
	  : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec

	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;

	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);

	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }

	    return result;
	  }

	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return builtinExec.call(R, S);
	};

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.

	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;
	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	}(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }

	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }

	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES$1 = _wks('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;

	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };

	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;

	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };

	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	}();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);
	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};

	    O[SYMBOL] = function () {
	      return 7;
	    };

	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};

	      re.constructor[SPECIES$1] = function () {
	        return re;
	      };
	    }

	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(_defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === _regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return {
	            done: true,
	            value: nativeRegExpMethod.call(regexp, str, arg2)
	          };
	        }

	        return {
	          done: true,
	          value: nativeMethod.call(str, regexp, arg2)
	        };
	      }

	      return {
	        done: false
	      };
	    });
	    var strfn = fns[0];
	    var rxfn = fns[1];
	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return rxfn.call(string, this, arg);
	    } // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return rxfn.call(string, this);
	    });
	  }
	};

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	}; // @@replace logic


	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [// `String.prototype.replace` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	  function replace(searchValue, replaceValue) {
	    var O = defined(this);
	    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
	  }, // `RegExp.prototype[@@replace]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	  function (regexp, replaceValue) {
	    var res = maybeCallNative($replace, regexp, this, replaceValue);
	    if (res.done) return res.value;
	    var rx = _anObject(regexp);
	    var S = String(this);
	    var functionalReplace = typeof replaceValue === 'function';
	    if (!functionalReplace) replaceValue = String(replaceValue);
	    var global = rx.global;

	    if (global) {
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	    }

	    var results = [];

	    while (true) {
	      var result = _regexpExecAbstract(rx, S);
	      if (result === null) break;
	      results.push(result);
	      if (!global) break;
	      var matchStr = String(result[0]);
	      if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	    }

	    var accumulatedResult = '';
	    var nextSourcePosition = 0;

	    for (var i = 0; i < results.length; i++) {
	      result = results[i];
	      var matched = String(result[0]);
	      var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	      var captures = []; // NOTE: This is equivalent to
	      //   captures = result.slice(1).map(maybeToString)
	      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

	      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

	      var namedCaptures = result.groups;

	      if (functionalReplace) {
	        var replacerArgs = [matched].concat(captures, position, S);
	        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	        var replacement = String(replaceValue.apply(undefined, replacerArgs));
	      } else {
	        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	      }

	      if (position >= nextSourcePosition) {
	        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	        nextSourcePosition = position + matched.length;
	      }
	    }

	    return accumulatedResult + S.slice(nextSourcePosition);
	  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }

	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;

	      switch (ch.charAt(0)) {
	        case '$':
	          return '$';

	        case '&':
	          return matched;

	        case '`':
	          return str.slice(0, position);

	        case "'":
	          return str.slice(tailPos);

	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;

	        default:
	          // \d\d?
	          var n = +ch;
	          if (n === 0) return match;

	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }

	          capture = captures[n - 1];
	      }

	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING, fn, true);
	}; // 21.2.5.14 RegExp.prototype.toString()


	if (_fails(function () {
	  return $toString.call({
	    source: 'a',
	    flags: 'b'
	  }) != '/a/b';
	})) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  }); // FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	var $find$1 = _arrayMethods(5);
	var KEY$1 = 'find';
	var forced$1 = true; // Shouldn't skip holes

	if (KEY$1 in []) Array(1)[KEY$1](function () {
	  forced$1 = false;
	});
	_export(_export.P + _export.F * forced$1, 'Array', {
	  find: function find(callbackfn
	  /* , that = undefined */
	  ) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	var f$1 = Object.getOwnPropertySymbols;
	var _objectGops = {
	  f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;
	var _objectPie = {
	  f: f$2
	};

	var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;

	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  }

	  return T;
	} : $assign;

	_export(_export.S + _export.F, 'Object', {
	  assign: _objectAssign
	});

	var d = document;

	var DomComponent =
	/*#__PURE__*/
	function () {
	  function DomComponent(element) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, DomComponent);

	    this.options = Object.assign({}, defaults, options);
	    this._events = [];
	    this.dom = {
	      el: this._setElement(element)
	    };
	  }
	  /**
	   * Bind a (delegated) event
	   * @param {String} event
	   * @param {Function} fn
	   * @param {HTMLElement|Document} el
	   * @return DomComponent
	   */


	  _createClass(DomComponent, [{
	    key: "on",
	    value: function on(event, fn) {
	      var el = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	      (el || this.dom.el).addEventListener(event, fn = fn.bind(this), true);

	      this._events.push({
	        name: event,
	        fn: fn,
	        el: el
	      });

	      return this;
	    }
	    /**
	     * Return the main wrapping element
	     * @return {Element}
	     */

	  }, {
	    key: "getElement",
	    value: function getElement() {
	      return this.dom.el;
	    }
	    /**
	     * Unbind all events and nullify references
	     * @return void
	     */

	  }, {
	    key: "remove",
	    value: function remove() {
	      var _this = this;

	      this._events = this._events.filter(function (event) {
	        return (event.el || _this.dom.el).removeEventListener(event.name, event.fn, true);
	      });
	      this.dom.el.parentNode.removeChild(this.dom.el);
	      this.dom = this.options = null;
	    }
	    /**
	     * Query the element in the DOM if its a string
	     * @param {Element|String} el
	     * @return {Element|null}
	     * @protected
	     */

	  }, {
	    key: "_setElement",
	    value: function _setElement(el) {
	      if (!el && !el.nodeType && typeof el !== 'string') {
	        throw new Error('Wrong element type provided!');
	      }

	      if (el.nodeType) return el;
	      return (this.options.parent || d).querySelector(el);
	    }
	    /**
	     * Communicate changes
	     * @param {String} name
	     * @param {Object|null} detail
	     * @protected
	     */

	  }, {
	    key: "_trigger",
	    value: function _trigger(name) {
	      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var event;

	      if (typeof CustomEvent === 'function') {
	        event = new CustomEvent(name, {
	          detail: detail,
	          bubbles: true,
	          cancelable: true
	        });
	      } else {
	        event = d.createEvent('Event');
	        event.initEvent(name, true, true);
	      }

	      this.dom.el.dispatchEvent(event);
	    }
	  }]);

	  return DomComponent;
	}();

	var defaults = {
	  parent: null,
	  items: [],
	  current: null,
	  allowAdd: true,
	  proposal: 'Add {X} to the list?',
	  notFound: '{X} not present in the list',
	  allowRemove: true,
	  removalIcon: '&times;',
	  placeHolder: 'Type to search',
	  sort: true,
	  order: 'desc',
	  maxHeight: 0,
	  onDelete: null,
	  onCreate: null,
	  valueKey: 'value',
	  textKey: 'value'
	};

	var d$1 = document;

	var SelectInput =
	/*#__PURE__*/
	function (_DomHelper) {
	  _inherits(SelectInput, _DomHelper);

	  function SelectInput(element) {
	    var _this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, SelectInput);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectInput).call(this, element, options, defaults));
	    var current = options.current ? _this._convertItem(options.current) : null;
	    _this.options.items = _this._convertItems(options.items);
	    _this.current = current ? _this.findItem(_this._getItemProp(current)) : null; // search result caching

	    _this.__found = null;
	    if (_this.options.sort) _this._sortItems();

	    _this._renderInit();

	    _this._bindEvents();

	    if (current) {
	      _this._setInputValue(current);
	    }

	    return _this;
	  }
	  /**
	   * Bind all (delegated) DOM events
	   * @private
	   */


	  _createClass(SelectInput, [{
	    key: "_bindEvents",
	    value: function _bindEvents() {
	      var _this2 = this;

	      var closeOnEvent = function closeOnEvent(e) {
	        if (e.key === 'Escape' || e.keyCode === 27 || !_this2.dom.el.contains(e.target)) {
	          _this2.toggle(false);
	        }
	      };

	      this.on('input', this._search);
	      this.on('click', this._handleClick);
	      this.on('keyup', this._handleKey);
	      this.on('focusin', function () {
	        return _this2._renderListItems().toggle(true);
	      }, this.dom.input); // Close the list on `Escape` or on a click outside the main element

	      this.on('keyup', closeOnEvent, d$1);
	      this.on('click', closeOnEvent, d$1);
	    }
	    /**
	     * Store the deletion callback
	     * @param {Function} fn
	     * @return SelectInput
	     */

	  }, {
	    key: "onDelete",
	    value: function onDelete(fn) {
	      this.options.onDelete = fn;
	      return this;
	    }
	    /**
	     * Store the creation callback
	     * @param {Function} fn
	     * @return SelectInput
	     */

	  }, {
	    key: "onCreate",
	    value: function onCreate(fn) {
	      this.options.onCreate = fn;
	      return this;
	    }
	    /**
	     * Show/hide the dropdown
	     * @param {Boolean} show
	     * @return DomHelper
	     */

	  }, {
	    key: "toggle",
	    value: function toggle() {
	      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      this.dom.el.firstElementChild.classList[show ? 'remove' : 'add']('si-hide');
	      if (!show) this.dom.input.blur();
	      return this;
	    }
	    /**
	     * Get all items in the list
	     * @return {Object[]}
	     */

	  }, {
	    key: "getItems",
	    value: function getItems() {
	      return this.options.items;
	    }
	    /**
	     * Return the current field value object
	     * @return {{value: String|Number}|null}
	     */

	  }, {
	    key: "getCurrent",
	    value: function getCurrent() {
	      var current = Object.assign({}, this.current);
	      delete current._lc_value;
	      delete current._lc_text;
	      return current;
	    }
	    /**
	     * Clear the current value
	     * @return void
	     * @private
	     */

	  }, {
	    key: "clearCurrent",
	    value: function clearCurrent() {
	      this.current = null;
	      this.dom.input.value = '';

	      this._clearSelected();
	    }
	    /**
	     * Find an item in the list
	     * @param {EventTarget|HTMLElement|String|Number} value
	     * @return {{}}
	     */

	  }, {
	    key: "findItem",
	    value: function findItem(value) {
	      var _this3 = this;

	      value = value.nodeName ? value.dataset.value : value;
	      return this.options.items.find(function (item) {
	        return _this3._getItemProp(item) === value;
	      });
	    }
	    /**
	     * Set the current value by its string
	     * @param {String|undefined} value
	     * @return SelectInput
	     */

	  }, {
	    key: "setCurrent",
	    value: function setCurrent(value) {
	      this._setCurrent(value ? this.findItem(value) : null);

	      return this;
	    }
	    /**
	     * Set the current value of the field
	     * @param {EventTarget|null} el
	     * @param {Object|null} item
	     * @return SelectInput
	     * @private
	     */

	  }, {
	    key: "_setCurrent",
	    value: function _setCurrent(item) {
	      var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	      this._setInputValue(item);

	      if (item) {
	        this.current = item;

	        this._setSelected(item, el);
	      } else {
	        this.current = null;

	        this._clearSelected();
	      }

	      return this;
	    }
	    /**
	     * Set the HTML input field
	     * @param {Object} item
	     * @return void
	     * @private
	     */

	  }, {
	    key: "_setInputValue",
	    value: function _setInputValue(item) {
	      this.dom.input.value = item ? this._getItemProp(item, 'text').toString() : '';
	    }
	    /**
	     * Updated selected item in the html list
	     * @param {Object} item
	     * @param {EventTarget|HTMLElement|null} el
	     * @private
	     */

	  }, {
	    key: "_setSelected",
	    value: function _setSelected(item) {
	      var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	      this._clearSelected();

	      el = el ? el : this.dom.list.querySelector("li[data-value=\"".concat(this._getItemProp(item), "\"]"));
	      if (el) el.classList.add('si-current');
	    }
	    /**
	     * Remove the classname of current `<li>`
	     * @private
	     */

	  }, {
	    key: "_clearSelected",
	    value: function _clearSelected() {
	      var current = this.dom.list.querySelector('.si-current');
	      if (current) current.classList.remove('si-current');
	    }
	    /**
	     * Make an array of objects
	     * @param {Array} items
	     * @return {Object[]}
	     * @private
	     */

	  }, {
	    key: "_convertItems",
	    value: function _convertItems() {
	      var _this4 = this;

	      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	      return items.map(function (item) {
	        return _this4._convertItem(item);
	      });
	    }
	    /**
	     * Normalize an item as an usable object
	     * @param {String|Number|{value: String|Number, _lc_value: String, _lc_text: String}} item
	     * @return {{value: String|Number, _lc_value: String, _lc_text: String}}
	     * @private
	     */

	  }, {
	    key: "_convertItem",
	    value: function _convertItem(item) {
	      var _ref;

	      var opt = this.options;
	      item = _typeof(item) !== 'object' ? (_ref = {}, _defineProperty(_ref, opt.valueKey, item), _defineProperty(_ref, opt.textKey, item), _ref) : item;
	      item._lc_value = this._makeSearchString(this._getItemProp(item));
	      item._lc_text = this._makeSearchString(this._getItemProp(item, 'text'));
	      return item;
	    }
	    /**
	     * Format all searchable strings
	     * @param {String} value
	     * @return {String}
	     * @private
	     */

	  }, {
	    key: "_makeSearchString",
	    value: function _makeSearchString(value) {
	      return value.toString().toLowerCase().replace(/\s+/g, '-');
	    }
	    /**
	     * Return the value of one of the custom named properties
	     * @param {Object} item
	     * @param {String} prop
	     * @return {String|Number}
	     * @private
	     */

	  }, {
	    key: "_getItemProp",
	    value: function _getItemProp(item) {
	      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
	      return item ? item[this.options["".concat(prop, "Key")]] : null;
	    }
	    /**
	     * Create the HTML upon instantiation
	     * @return {Node}
	     * @private
	     */

	  }, {
	    key: "_renderInit",
	    value: function _renderInit() {
	      var wrap = d$1.createElement('div');
	      wrap.className = 'si-wrap si-hide';
	      this.dom.input = wrap.appendChild(this._renderInput()).firstChild;
	      this.dom.list = wrap.appendChild(this._renderList()).firstChild;
	      return this.dom.el.appendChild(wrap);
	    }
	    /**
	     * Create the input element
	     * @return {HTMLDivElement}
	     * @private
	     */

	  }, {
	    key: "_renderInput",
	    value: function _renderInput() {
	      var wrap = d$1.createElement('div'),
	          el = d$1.createElement('input');
	      wrap.className = 'si-input';
	      el.type = 'text';
	      el.autocomplete = 'false';
	      el.spellcheck = false;
	      el.placeholder = this.options.placeHolder;
	      wrap.appendChild(el);
	      return wrap;
	    }
	    /**
	     * Create the list element
	     * @return {HTMLDivElement}
	     * @private
	     */

	  }, {
	    key: "_renderList",
	    value: function _renderList() {
	      var wrap = d$1.createElement('div'),
	          el = d$1.createElement('ul'),
	          maxHeight = this.options.maxHeight;
	      wrap.className = 'si-list';
	      if (maxHeight) wrap.style.maxHeight = maxHeight + 'px';
	      wrap.appendChild(el);
	      return wrap;
	    }
	    /**
	     * Create the list items
	     * @param {Object[]} items
	     * @return {String}
	     * @private
	     */

	  }, {
	    key: "_createListItems",
	    value: function _createListItems() {
	      var _this5 = this;

	      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      var list = '',
	          opt = this.options,
	          currentValue = this._getItemProp(this.current),
	          selected = '',
	          button = opt.allowRemove ? this._createRemovalButton() : '',
	          value = '',
	          text = '';

	      items.forEach(function (item) {
	        value = _this5._getItemProp(item);
	        text = _this5._getItemProp(item, 'text');
	        selected = currentValue && value === currentValue ? ' si-current' : '';
	        list += "<li class=\"si-item".concat(selected, "\" data-value=\"").concat(value, "\">").concat(text + button, "</li>");
	      });
	      return list;
	    }
	    /**
	     * Insert the set of li's in the DOM
	     * @param html
	     * @return SelectInput
	     * @private
	     */

	  }, {
	    key: "_renderListItems",
	    value: function _renderListItems() {
	      var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      this.dom.list.innerHTML = html || this._createListItems(this.options.items);
	      return this;
	    }
	    /**
	     * Item removal button template
	     * @return {String}
	     * @private
	     */

	  }, {
	    key: "_createRemovalButton",
	    value: function _createRemovalButton() {
	      return "<button type=\"button\" class=\"si-removal\">".concat(this.options.removalIcon, "</button>");
	    }
	    /**
	     * Search and update the list upon typing
	     * @param {KeyboardEvent} e
	     * @private
	     */

	  }, {
	    key: "_search",
	    value: function _search(e) {
	      var options = this.options,
	          term = e.target.value,
	          termLc = this._makeSearchString(term),
	          list = this._searchItem(termLc),
	          html = list || options.allowAdd ? this._createListItems(list) : '',
	          first = list[0],
	          len = list.length;

	      if (len === 1) {
	        this.__found = first;
	      }

	      if (len !== 1 || !term) {
	        this.__found = null;
	      }

	      if (options.allowAdd && term && (!first || termLc !== first._lc_text && termLc !== first._lc_value)) {
	        html += this._proposeItem(term);
	      } else if (!options.allowAdd) {
	        html += this._notFoundItem(term);
	      }

	      this._renderListItems(html);
	    }
	    /**
	     * Filter the list of available items
	     * @param {String} str
	     * @return {[]}
	     * @private
	     */

	  }, {
	    key: "_searchItem",
	    value: function _searchItem(str) {
	      return this.options.items.filter(function (item) {
	        return item._lc_value.indexOf(str) !== -1 || item._lc_text.indexOf(str) !== -1;
	      });
	    }
	    /**
	     * Create the item creation list item
	     * @param {String} term
	     * @return {String}
	     * @private
	     */

	  }, {
	    key: "_proposeItem",
	    value: function _proposeItem(term) {
	      var proposal = this.options.proposal.replace('{X}', "<span>".concat(term, "</span>"));
	      return "<li class=\"si-item si-append si-proposal\" data-term=\"".concat(term, "\">").concat(proposal, "</li>");
	    }
	    /**
	     * Create a 'not found' message as a list item
	     * @param {String} term
	     * @return {String}
	     * @private
	     */

	  }, {
	    key: "_notFoundItem",
	    value: function _notFoundItem(term) {
	      var txt = this.options.notFound.replace('{X}', "<span>".concat(term, "</span>"));
	      return "<li class=\"si-item si-append si-not-found\">".concat(txt, "</li>");
	    }
	    /**
	     * Decide what to do when user clicks inside the component
	     * @param {MouseEvent} e
	     * @private
	     */

	  }, {
	    key: "_handleClick",
	    value: function _handleClick(e) {
	      var el = e.target,
	          classList = el.classList;

	      if (this.options.allowAdd && classList.contains('si-proposal')) {
	        if (this._tryCreateItem(el.dataset.term)) {
	          this.toggle()._trigger('created', this.current);
	        }

	        return;
	      }

	      if (classList.contains('si-item')) {
	        this._setCurrent(this.findItem(el), el).toggle()._trigger('selected', this.current);

	        return;
	      }

	      if (this.options.allowRemove && classList.contains('si-removal')) {
	        el = el.parentNode;

	        if (this._fireCallback('onDelete', this.findItem(el))) {
	          this._trigger('removed', this._sliceItem(el));
	        }
	      }
	    }
	    /**
	     * The `onCreate` and `onDelete` callbacks allow to prevent their respective actions
	     * @param {String} name
	     * @param {Object} item
	     * @return {Boolean}
	     * @private
	     */

	  }, {
	    key: "_fireCallback",
	    value: function _fireCallback(name, item) {
	      if (typeof this.options[name] === 'function') {
	        return this.options[name](item);
	      }

	      return true;
	    }
	    /**
	     * Handle `Enter` when there is a value in the field
	     * @param {KeyboardEvent} e
	     * @private
	     */

	  }, {
	    key: "_handleKey",
	    value: function _handleKey(e) {
	      var value = e.target.value,
	          item = this.__found,
	          event;

	      if (!!value && (e.keyCode !== 13 || e.key !== 'Enter')) {
	        return;
	      }

	      if (!item && value && this.options.allowAdd) {
	        event = this._tryCreateItem(value) ? 'created' : null;
	      } else if (item) {
	        event = 'selected';

	        this._setCurrent(item);
	      }

	      if (event) this.toggle()._trigger(event, this.current);
	    }
	    /**
	     * If the value doesn't exist and the callback returns true, create and set as current
	     * @param value
	     * @return {boolean}
	     * @private
	     */

	  }, {
	    key: "_tryCreateItem",
	    value: function _tryCreateItem(value) {
	      var item = this._convertItem(value.trim());

	      if (!this.findItem(value) && this._fireCallback('onCreate', item)) {
	        this._setCurrent(this._insertItem(item));

	        return true;
	      }

	      return false;
	    }
	    /**
	     * Insert a new item in the list
	     * @param {{value: String|Number, _lc_value: String, _lc_text: String}} item
	     * @return {{value: String|Number, _lc_value: String, _lc_text: String}}
	     * @private
	     */

	  }, {
	    key: "_insertItem",
	    value: function _insertItem(item) {
	      this.options.items.push(item);
	      if (this.options.sort) this._sortItems();
	      return item;
	    }
	    /**
	     * Rearrange the list
	     * @private
	     */

	  }, {
	    key: "_sortItems",
	    value: function _sortItems() {
	      var order = this.options.order === 'desc' ? 1 : -1;
	      this.options.items.sort(function (a, b) {
	        if (a._lc_text < b._lc_text) return -order;
	        if (a._lc_text > b._lc_text) return order;
	        return 0;
	      });
	    }
	    /**
	     * Remove an item from the list
	     * @param {HTMLElement|Node} el
	     * @return {{value: String|Number, _lc_value: String, _lc_text: String}}
	     * @private
	     */

	  }, {
	    key: "_sliceItem",
	    value: function _sliceItem(el) {
	      var items = this.options.items,
	          needle = el.dataset.value.toLowerCase(),
	          current = this.current,
	          item;
	      this.dom.list.removeChild(el);
	      item = items.splice(items.findIndex(function (item) {
	        return item._lc_value === needle;
	      }), 1).shift();
	      if (current && item._lc_value === current._lc_value) this.clearCurrent();
	      return item;
	    }
	  }]);

	  return SelectInput;
	}(DomComponent);

	return SelectInput;

}));
