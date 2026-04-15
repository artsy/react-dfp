"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Context = void 0;

var _react = _interopRequireDefault(require("react"));

var _manager = _interopRequireDefault(require("./manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// React.createContext is undefined for React < 16.3
var Context = _react.default.createContext ? _react.default.createContext({
  dfpNetworkId: null,
  dfpAdUnit: null,
  dfpSizeMapping: null,
  dfpTargetingArguments: null,
  newSlotCallback: null,
  releaseSlotCallback: null
}) : null;
/**
 * @typedef {Object} AutoReloadConfig
 * @property {boolean} [dfpNetworkId]
 * @property {boolean} [personalizedAds]
 * @property {boolean} [cookieOption]
 * @property {boolean} [singleRequest]
 * @property {boolean} [disableInitialLoad]
 * @property {boolean} [adUnit]
 * @property {boolean} [sizeMapping]
 * @property {boolean} [adSenseAttributes]
 * @property {boolean} [targetingArguments]
 * @property {boolean} [collapseEmptyDivs]
 * @property {boolean} [lazyLoad]
 */

/**
 * @typedef {Object} LazyLoadConfig
 * @property {number} [fetchMarginPercent]
 * @property {number} [renderMarginPercent]
 * @property {number} [mobileScaling]
 */

/**
 * @typedef {import('react').ReactNode} ReactNode
 */

/**
 * @typedef {Object} DFPSlotsProviderProps
 * @property {ReactNode} children
 * @property {boolean} [autoLoad]
 * @property {AutoReloadConfig} [autoReload]
 * @property {string} dfpNetworkId
 * @property {boolean} [personalizedAds]
 * @property {boolean} [cookieOption]
 * @property {boolean} [singleRequest]
 * @property {boolean} [disableInitialLoad]
 * @property {string} [adUnit]
 * @property {object[]} [sizeMapping]
 * @property {Object} [adSenseAttributes]
 * @property {Object} [targetingArguments]
 * @property {boolean} [collapseEmptyDivs]
 * @property {Object} [adSenseAttrs]
 * @property {boolean | LazyLoadConfig} [lazyLoad]
 * @property {boolean} [limitedAds]
 */

/**
 * @extends {React.Component<DFPSlotsProviderProps>}
 */

exports.Context = Context;

var DFPSlotsProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DFPSlotsProvider, _React$Component);

  function DFPSlotsProvider(props) {
    var _this;

    _classCallCheck(this, DFPSlotsProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DFPSlotsProvider).call(this, props));
    _this.loadAdsIfPossible = _this.loadAdsIfPossible.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.newSlotCallback = _this.newSlotCallback.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.applyConfigs = _this.applyConfigs.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.shouldReloadConfig = _this.shouldReloadConfig.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.attachLoadCallback = _this.attachLoadCallback.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getContextValue = _this.getContextValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.releaseSlotCallback = _this.releaseSlotCallback.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.loadAlreadyCalled = false;
    _this.loadCallbackAttached = false;
    _this.shouldReloadAds = false;
    _this.totalSlots = 0;
    _this.contextValue = {};

    if (Context === null) {
      _this.getChildContext = function () {
        return _this.getContextValue();
      };
    }

    return _this;
  }

  _createClass(DFPSlotsProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.applyConfigs();

      if (this.props.autoLoad && !this.loadAdsIfPossible()) {
        this.attachLoadCallback();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      this.shouldReloadAds = this.shouldReloadConfig(nextProps);

      if (nextProps.children !== this.props.children) {
        return true;
      }

      if (nextProps.autoLoad && !this.props.autoLoad) {
        return true;
      }

      return this.shouldReloadAds;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.applyConfigs();

      if (this.props.autoLoad) {
        if (this.loadAlreadyCalled) {
          if (this.shouldReloadAds) {
            _manager.default.reload();
          }
        } else if (!this.loadAdsIfPossible()) {
          this.attachLoadCallback();
        }
      }

      this.shouldReloadAds = false;
    }
  }, {
    key: "getContextValue",
    value: function getContextValue() {
      var _this$props = this.props,
          dfpNetworkId = _this$props.dfpNetworkId,
          dfpAdUnit = _this$props.adUnit,
          dfpSizeMapping = _this$props.sizeMapping,
          dfpTargetingArguments = _this$props.targetingArguments,
          _this$contextValue = this.contextValue,
          ctxDfpNetworkId = _this$contextValue.dfpNetworkId,
          ctxDfpAdUnit = _this$contextValue.adUnit,
          ctxDfpSizeMapping = _this$contextValue.sizeMapping,
          ctxDfpTargetingArguments = _this$contextValue.targetingArguments; // performance: update context value object only when any of its
      // props is updated.

      if (dfpNetworkId !== ctxDfpNetworkId || dfpAdUnit !== ctxDfpAdUnit || dfpSizeMapping !== ctxDfpSizeMapping || dfpTargetingArguments !== ctxDfpTargetingArguments) {
        this.contextValue = {
          dfpNetworkId: dfpNetworkId,
          dfpAdUnit: dfpAdUnit,
          dfpSizeMapping: dfpSizeMapping,
          dfpTargetingArguments: dfpTargetingArguments,
          newSlotCallback: this.newSlotCallback,
          releaseSlotCallback: this.releaseSlotCallback
        };
      }

      return this.contextValue;
    }
  }, {
    key: "applyConfigs",
    value: function applyConfigs() {
      _manager.default.configurePersonalizedAds(this.props.personalizedAds);

      _manager.default.configureCookieOption(this.props.cookieOption);

      _manager.default.configureSingleRequest(this.props.singleRequest);

      _manager.default.configureDisableInitialLoad(this.props.disableInitialLoad);

      _manager.default.configureLazyLoad(!!this.props.lazyLoad, typeof this.props.lazyLoad === 'boolean' ? null : this.props.lazyLoad);

      _manager.default.setAdSenseAttributes(this.props.adSenseAttributes);

      _manager.default.setCollapseEmptyDivs(this.props.collapseEmptyDivs);

      _manager.default.configureLimitedAds(this.props.limitedAds);
    }
  }, {
    key: "attachLoadCallback",
    value: function attachLoadCallback() {
      if (this.loadCallbackAttached === false) {
        _manager.default.on('slotRegistered', this.loadAdsIfPossible);

        this.loadCallbackAttached = true;
        return true;
      }

      return false;
    } // pretty strait-forward interface that children ad slots use to register
    // with their DFPSlotProvider parent node.

  }, {
    key: "newSlotCallback",
    value: function newSlotCallback() {
      this.totalSlots++;
    }
    /** Pairs with {@link #newSlotCallback} when a slot unmounts (e.g. React Strict Mode). */

  }, {
    key: "releaseSlotCallback",
    value: function releaseSlotCallback() {
      this.totalSlots = Math.max(0, this.totalSlots - 1);
    } // Checks all the mounted children ads have been already registered
    // in the DFPManager before trying to call the gpt load scripts.
    // This is helpful when trying to fetch ads with a single request.
    //
    // Require totalSlots > 0 so we never fire load() when registeredSlots === 0
    // and totalSlots === 0 (the old condition `>=` was true for 0 >= 0), which
    // called enableServices() before any slot was defined and broke multi-slot
    // pages.

  }, {
    key: "loadAdsIfPossible",
    value: function loadAdsIfPossible() {
      var r = false;
      var registeredCount = Object.keys(_manager.default.getRegisteredSlots()).length;

      if (this.totalSlots > 0 && registeredCount >= this.totalSlots) {
        _manager.default.removeListener('slotRegistered', this.loadAdsIfPossible);

        _manager.default.load();

        this.loadAlreadyCalled = true;
        this.loadCallbackAttached = false;
        r = true;
      }

      return r;
    }
  }, {
    key: "shouldReloadConfig",
    value: function shouldReloadConfig(nextProps) {
      var reloadConfig = nextProps.autoReload || this.props.autoReload;

      if (this.props.autoLoad || nextProps.autoLoad) {
        if (_typeof(reloadConfig) === 'object') {
          var attrs = Object.keys(reloadConfig); // eslint-disable-next-line guard-for-in, no-restricted-syntax

          for (var i in attrs) {
            var propName = attrs[i]; // eslint-disable-next-line

            if (reloadConfig[propName] === true && this.props[propName] !== nextProps[propName]) {
              return true;
            }
          }
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;

      if (Context === null) {
        return children;
      }

      return _react.default.createElement(Context.Provider, {
        value: this.getContextValue()
      }, children);
    }
  }]);

  return DFPSlotsProvider;
}(_react.default.Component);

exports.default = DFPSlotsProvider;

_defineProperty(DFPSlotsProvider, "defaultProps", {
  autoLoad: true,
  autoReload: {
    dfpNetworkId: false,
    personalizedAds: false,
    cookieOption: false,
    singleRequest: false,
    disableInitialLoad: false,
    adUnit: false,
    sizeMapping: false,
    adSenseAttributes: false,
    targetingArguments: false,
    collapseEmptyDivs: false,
    lazyLoad: false
  },
  personalizedAds: true,
  cookieOption: true,
  singleRequest: true,
  disableInitialLoad: false,
  collapseEmptyDivs: null,
  lazyLoad: false,
  limitedAds: false
});

if (Context === null) {
  // React < 16.3
  DFPSlotsProvider.childContextTypes = {
    dfpNetworkId: function dfpNetworkId() {},
    dfpAdUnit: function dfpAdUnit() {},
    dfpSizeMapping: function dfpSizeMapping() {},
    dfpTargetingArguments: function dfpTargetingArguments() {},
    newSlotCallback: function newSlotCallback() {},
    releaseSlotCallback: function releaseSlotCallback() {}
  };
}