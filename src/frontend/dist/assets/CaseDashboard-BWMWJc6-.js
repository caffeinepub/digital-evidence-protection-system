var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { B as Subscribable, D as shallowEqualObjects, E as hashKey, G as getDefaultState, I as notifyManager, J as useQueryClient, h as reactExports, K as noop, N as shouldThrowError, c as createLucideIcon, O as createContextScope, P as createCollection, o as jsxRuntimeExports, Q as useId, R as Primitive, V as composeEventHandlers, W as useComposedRefs, X as useDirection, Y as useControllableState, Z as useCallbackRef, _ as useLayoutEffect2, $ as cn, x as useLang, a0 as useActor, a1 as useQuery, a2 as PageAnimBG, q as motion, S as Shield, A as Search, a3 as Input, a4 as LoaderCircle, a5 as Button, a6 as ChevronDown, a7 as formatTimestamp, a8 as Label, a9 as Textarea, F as Footer, aa as ue } from "./index-Ceaj9_Tu.js";
import { B as Badge } from "./badge-kKMoMb_P.js";
import { L as Lock } from "./lock-cJpStAWd.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
          _a2,
          action.data,
          variables,
          onMutateResult,
          context
        );
        (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
          _c,
          action.data,
          null,
          variables,
          onMutateResult,
          context
        );
      } else if ((action == null ? void 0 : action.type) === "error") {
        (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
          _e,
          action.error,
          variables,
          onMutateResult,
          context
        );
        (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
          _g,
          void 0,
          action.error,
          variables,
          onMutateResult,
          context
        );
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return (styles == null ? void 0 : styles.animationName) || "none";
}
function getElementRef(element) {
  var _a2, _b;
  let getter = (_a2 = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a2.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const fakePrincipal = (name) => name;
const fakeStatus = (s) => s;
const fakeEvidenceStatus = (s) => s;
const d = (dateStr) => BigInt(new Date(dateStr).getTime());
const MOCK_CASES = [
  {
    caseId: BigInt(1),
    title: "Operation CyberShield — Phishing Attack",
    description: "Coordinated phishing campaign targeting SBI and HDFC banking customers across 5 states. Victims received fake OTP requests via SMS and email.",
    status: fakeStatus("open"),
    createdAt: d("2024-01-15"),
    createdBy: fakePrincipal("Rajesh Kumar"),
    evidenceIds: [BigInt(1), BigInt(2), BigInt(3)]
  },
  {
    caseId: BigInt(2),
    title: "Financial Fraud — Fake Investment App",
    description: "Fraudulent mobile application mimicking a SEBI-registered broker, luring victims into depositing funds. Over ₹42 lakh collected from 87 victims.",
    status: fakeStatus("open"),
    createdAt: d("2024-02-03"),
    createdBy: fakePrincipal("Priya Sharma"),
    evidenceIds: [BigInt(4), BigInt(5)]
  },
  {
    caseId: BigInt(3),
    title: "Identity Theft — Aadhaar Misuse",
    description: "Stolen Aadhaar and PAN card data used to open 12 fraudulent bank accounts and apply for instant personal loans totalling ₹18.5 lakh.",
    status: fakeStatus("closed"),
    createdAt: d("2024-02-20"),
    createdBy: fakePrincipal("Amit Singh"),
    evidenceIds: [BigInt(6)]
  },
  {
    caseId: BigInt(4),
    title: "Online Shopping Scam — Fake E-commerce Site",
    description: "Cloned Flipkart-style storefront collecting payments for electronics that were never delivered. 214 complaints received from 9 districts.",
    status: fakeStatus("open"),
    createdAt: d("2024-03-08"),
    createdBy: fakePrincipal("Sunita Verma"),
    evidenceIds: [BigInt(7), BigInt(8), BigInt(9)]
  },
  {
    caseId: BigInt(5),
    title: "Job Fraud — Fake Placement Agency",
    description: "Fraudulent consultancy charging ₹8,000–₹25,000 per candidate for fake IT job placements in Bangalore and Hyderabad. 63 victims identified.",
    status: fakeStatus("closed"),
    createdAt: d("2024-03-22"),
    createdBy: fakePrincipal("Vikram Patel"),
    evidenceIds: [BigInt(10)]
  },
  {
    caseId: BigInt(6),
    title: "Ransomware Attack — Hospital Network",
    description: "LockBit 3.0 variant encrypted patient records at Shivaji Medical College. Attackers demanded $35,000 in Bitcoin. Decryption keys partially recovered.",
    status: fakeStatus("open"),
    createdAt: d("2024-04-10"),
    createdBy: fakePrincipal("Ananya Reddy"),
    evidenceIds: [BigInt(11), BigInt(12)]
  },
  {
    caseId: BigInt(7),
    title: "Romance Scam — International Network",
    description: "Multi-country romance fraud network posing as US Army officers. Victims manipulated into sending ₹3–15 lakh each. 9 victims in Maharashtra alone.",
    status: fakeStatus("closed"),
    createdAt: d("2024-05-01"),
    createdBy: fakePrincipal("Deepak Nair"),
    evidenceIds: [BigInt(13)]
  },
  {
    caseId: BigInt(8),
    title: "Investment Scam — Crypto Ponzi Scheme",
    description: "Unregistered crypto exchange promising 40% monthly returns. ₹2.3 crore collected from 182 investors before site went offline. Blockchain trace ongoing.",
    status: fakeStatus("open"),
    createdAt: d("2024-05-18"),
    createdBy: fakePrincipal("Meena Joshi"),
    evidenceIds: [BigInt(14), BigInt(15)]
  },
  {
    caseId: BigInt(9),
    title: "Cyber Bullying — Social Media Harassment",
    description: "Systematic harassment campaign across Instagram and WhatsApp targeting a minor. 47 fake accounts identified; defamatory deepfake images circulated.",
    status: fakeStatus("closed"),
    createdAt: d("2024-06-05"),
    createdBy: fakePrincipal("Ravi Yadav"),
    evidenceIds: [BigInt(16), BigInt(17)]
  },
  {
    caseId: BigInt(10),
    title: "Lottery Scam — KBC Fraud",
    description: "Fraudsters impersonating Kaun Banega Crorepati officials contacting victims by phone and WhatsApp, demanding ₹5,500–₹50,000 in processing fees.",
    status: fakeStatus("open"),
    createdAt: d("2024-06-20"),
    createdBy: fakePrincipal("Pooja Gupta"),
    evidenceIds: [BigInt(18)]
  },
  {
    caseId: BigInt(11),
    title: "Phishing — Tax Refund Scam",
    description: "Fake Income Tax Department portal harvesting PAN, Aadhaar, and net-banking credentials under guise of processing ₹12,000–₹85,000 refunds.",
    status: fakeStatus("closed"),
    createdAt: d("2024-07-04"),
    createdBy: fakePrincipal("Suresh Iyer"),
    evidenceIds: [BigInt(19), BigInt(20)]
  },
  {
    caseId: BigInt(12),
    title: "Financial Fraud — SIM Swap Attack",
    description: "Fraudulent SIM swap executed on 14 victims by bribing telecom employees. ₹68 lakh siphoned from linked bank accounts within hours of porting.",
    status: fakeStatus("open"),
    createdAt: d("2024-07-22"),
    createdBy: fakePrincipal("Kavitha Menon"),
    evidenceIds: [BigInt(21), BigInt(22), BigInt(23)]
  }
];
[
  {
    evidenceId: BigInt(1),
    fileName: "phishing_email_screenshot.png",
    fileType: "image/png",
    fileSize: BigInt(284671),
    sha256Hash: "a3f9d8e1b2c4f7a9d3e5b8c2f1a4d7e9b6c3f0a8d5e2b9c6f3a0d7e4b1c8f5a2",
    description: "Screenshot of phishing email impersonating SBI with fake login link.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-01-16"),
    caseId: BigInt(1),
    uploadedBy: fakePrincipal("Rajesh Kumar"),
    fileReference: null
  },
  {
    evidenceId: BigInt(2),
    fileName: "network_traffic_log.pcap",
    fileType: "application/octet-stream",
    fileSize: BigInt(1458290),
    sha256Hash: "b7e2a1c5f8d4b9e3a6c2f5d8b1e4a7c3f0b8d5e2c9f6a3d0e7b4c1f8a5d2e9b6",
    description: "Wireshark capture showing DNS spoofing and data exfiltration to C2 server.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-01-17"),
    caseId: BigInt(1),
    uploadedBy: fakePrincipal("Rajesh Kumar"),
    fileReference: null
  },
  {
    evidenceId: BigInt(3),
    fileName: "victim_statement_001.pdf",
    fileType: "application/pdf",
    fileSize: BigInt(193450),
    sha256Hash: "c1d4e7b9f2a5c8e1d4b7f3a6c9e2b5d8f1c4e7b0f3a6c9d2e5b8c1f4a7d0e3b6",
    description: "Signed affidavit from victim detailing financial loss and transaction history.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-01-18"),
    caseId: BigInt(1),
    uploadedBy: fakePrincipal("Priya Sharma"),
    fileReference: null
  },
  {
    evidenceId: BigInt(4),
    fileName: "fraud_app_apk_sample.apk",
    fileType: "application/vnd.android.package-archive",
    fileSize: BigInt(8745236),
    sha256Hash: "d5e8b2c6f9a3d7e1b5c9f2a6d0e4b8c3f7a1d5e9b3c7f1a5d9e2b6c0f4a8d2e6",
    description: "Malicious APK file of fake investment app extracted from victim device.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-02-04"),
    caseId: BigInt(2),
    uploadedBy: fakePrincipal("Amit Singh"),
    fileReference: null
  },
  {
    evidenceId: BigInt(5),
    fileName: "bank_transaction_record.xlsx",
    fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileSize: BigInt(67890),
    sha256Hash: "e9c3f7b1d5a8e2c6f0b4d8a2c6f0b4d8e2c6f0b4d8a2c6f0b4d8e2c6f0b4d8a2",
    description: "Bank statement showing 87 fraudulent transactions totalling ₹42.3 lakh.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-02-06"),
    caseId: BigInt(2),
    uploadedBy: fakePrincipal("Priya Sharma"),
    fileReference: null
  },
  {
    evidenceId: BigInt(6),
    fileName: "aadhaar_misuse_docs.pdf",
    fileType: "application/pdf",
    fileSize: BigInt(345120),
    sha256Hash: "f2a6d0e4b8c3f7a1d5e9b3c7f1a5d9e2b6c0f4a8d2e6b0c4f8a2d6e0b4c8f2a6",
    description: "Scanned copies of fraudulently opened bank account documents using stolen identity.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-02-22"),
    caseId: BigInt(3),
    uploadedBy: fakePrincipal("Amit Singh"),
    fileReference: null
  },
  {
    evidenceId: BigInt(7),
    fileName: "fake_ecommerce_website_backup.zip",
    fileType: "application/zip",
    fileSize: BigInt(23456789),
    sha256Hash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    description: "Full website backup of cloned Flipkart portal including payment gateway scripts.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-03-09"),
    caseId: BigInt(4),
    uploadedBy: fakePrincipal("Sunita Verma"),
    fileReference: null
  },
  {
    evidenceId: BigInt(8),
    fileName: "payment_gateway_logs.txt",
    fileType: "text/plain",
    fileSize: BigInt(89034),
    sha256Hash: "b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
    description: "Server access logs showing fraudulent transactions and attacker IP addresses.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-03-10"),
    caseId: BigInt(4),
    uploadedBy: fakePrincipal("Vikram Patel"),
    fileReference: null
  },
  {
    evidenceId: BigInt(9),
    fileName: "victim_chat_screenshots.mp4",
    fileType: "video/mp4",
    fileSize: BigInt(1567e5),
    sha256Hash: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    description: "Screen recording of fraudulent purchase flow and fake order confirmation.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-03-11"),
    caseId: BigInt(4),
    uploadedBy: fakePrincipal("Sunita Verma"),
    fileReference: null
  },
  {
    evidenceId: BigInt(10),
    fileName: "placement_agency_contract.pdf",
    fileType: "application/pdf",
    fileSize: BigInt(178230),
    sha256Hash: "d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8",
    description: "Forged service agreement contract used to collect fees from job seekers.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-03-24"),
    caseId: BigInt(5),
    uploadedBy: fakePrincipal("Vikram Patel"),
    fileReference: null
  },
  {
    evidenceId: BigInt(11),
    fileName: "ransomware_binary_sample.exe",
    fileType: "application/octet-stream",
    fileSize: BigInt(2345678),
    sha256Hash: "e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
    description: "Isolated ransomware binary for forensic analysis. LockBit 3.0 variant.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-04-11"),
    caseId: BigInt(6),
    uploadedBy: fakePrincipal("Ananya Reddy"),
    fileReference: null
  },
  {
    evidenceId: BigInt(12),
    fileName: "encrypted_hospital_records.db",
    fileType: "application/octet-stream",
    fileSize: BigInt(45678900),
    sha256Hash: "f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    description: "Sample of encrypted patient database files for decryption analysis.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-04-12"),
    caseId: BigInt(6),
    uploadedBy: fakePrincipal("Deepak Nair"),
    fileReference: null
  },
  {
    evidenceId: BigInt(13),
    fileName: "romance_scam_chat_export.json",
    fileType: "application/json",
    fileSize: BigInt(456780),
    sha256Hash: "a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9",
    description: "WhatsApp and Telegram chat export showing manipulation tactics and money requests.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-05-03"),
    caseId: BigInt(7),
    uploadedBy: fakePrincipal("Meena Joshi"),
    fileReference: null
  },
  {
    evidenceId: BigInt(14),
    fileName: "crypto_wallet_transactions.csv",
    fileType: "text/csv",
    fileSize: BigInt(123450),
    sha256Hash: "b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
    description: "On-chain transaction records tracing fraudulent crypto flows through 14 wallets.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-05-20"),
    caseId: BigInt(8),
    uploadedBy: fakePrincipal("Ravi Yadav"),
    fileReference: null
  },
  {
    evidenceId: BigInt(15),
    fileName: "ponzi_website_archive.html",
    fileType: "text/html",
    fileSize: BigInt(345670),
    sha256Hash: "c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3",
    description: "Archived HTML of fraudulent crypto exchange site before it went offline.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-05-22"),
    caseId: BigInt(8),
    uploadedBy: fakePrincipal("Pooja Gupta"),
    fileReference: null
  },
  {
    evidenceId: BigInt(16),
    fileName: "harassment_posts_archive.zip",
    fileType: "application/zip",
    fileSize: BigInt(5678900),
    sha256Hash: "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
    description: "Archived screenshots of all 47 fake social media profiles and their posts.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-06-07"),
    caseId: BigInt(9),
    uploadedBy: fakePrincipal("Suresh Iyer"),
    fileReference: null
  },
  {
    evidenceId: BigInt(17),
    fileName: "deepfake_image_samples.zip",
    fileType: "application/zip",
    fileSize: BigInt(12345670),
    sha256Hash: "e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7",
    description: "Deepfake images circulated on social media — hash-verified for chain of custody.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-06-08"),
    caseId: BigInt(9),
    uploadedBy: fakePrincipal("Kavitha Menon"),
    fileReference: null
  },
  {
    evidenceId: BigInt(18),
    fileName: "lottery_fraud_call_recording.mp3",
    fileType: "audio/mpeg",
    fileSize: BigInt(8901230),
    sha256Hash: "f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    description: "Audio recording of fraudster impersonating KBC team demanding processing fee.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-06-22"),
    caseId: BigInt(10),
    uploadedBy: fakePrincipal("Rajesh Kumar"),
    fileReference: null
  },
  {
    evidenceId: BigInt(19),
    fileName: "fake_incometax_portal.html",
    fileType: "text/html",
    fileSize: BigInt(234560),
    sha256Hash: "a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1",
    description: "Source code of fake Income Tax refund portal used to harvest credentials.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-07-06"),
    caseId: BigInt(11),
    uploadedBy: fakePrincipal("Ananya Reddy"),
    fileReference: null
  },
  {
    evidenceId: BigInt(20),
    fileName: "phishing_sms_bulk_list.csv",
    fileType: "text/csv",
    fileSize: BigInt(56780),
    sha256Hash: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
    description: "CSV of 12,400 victim phone numbers used in bulk SMS phishing campaign.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-07-07"),
    caseId: BigInt(11),
    uploadedBy: fakePrincipal("Deepak Nair"),
    fileReference: null
  },
  {
    evidenceId: BigInt(21),
    fileName: "sim_swap_telecom_records.pdf",
    fileType: "application/pdf",
    fileSize: BigInt(289450),
    sha256Hash: "c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5",
    description: "Official telecom operator records showing fraudulent SIM port requests.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-07-23"),
    caseId: BigInt(12),
    uploadedBy: fakePrincipal("Meena Joshi"),
    fileReference: null
  },
  {
    evidenceId: BigInt(22),
    fileName: "bank_account_drain_logs.xlsx",
    fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileSize: BigInt(134560),
    sha256Hash: "d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    description: "Consolidated transaction log from 14 victim accounts showing rapid fund transfers.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-07-24"),
    caseId: BigInt(12),
    uploadedBy: fakePrincipal("Ravi Yadav"),
    fileReference: null
  },
  {
    evidenceId: BigInt(23),
    fileName: "suspect_phone_forensics.tar",
    fileType: "application/x-tar",
    fileSize: BigInt(345678900),
    sha256Hash: "e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    description: "Full forensic dump from suspect mobile device including deleted messages.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-07-25"),
    caseId: BigInt(12),
    uploadedBy: fakePrincipal("Kavitha Menon"),
    fileReference: null
  }
];
function CaseDashboard() {
  const { t } = useLang();
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();
  const [title, setTitle] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [expanded, setExpanded] = reactExports.useState(null);
  const { data: cases = [], isLoading } = useQuery({
    queryKey: ["allCases"],
    queryFn: async () => {
      const result = actor ? await actor.getAllCases() : [];
      return result.length > 0 ? result : MOCK_CASES;
    },
    enabled: !!actor && !isFetching
  });
  const createMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.createCase(title, desc, null);
    },
    onSuccess: () => {
      ue.success("Case created successfully!");
      setTitle("");
      setDesc("");
      qc.invalidateQueries({ queryKey: ["allCases"] });
    },
    onError: () => ue.error("Failed to create case")
  });
  const sealMut = useMutation({
    mutationFn: async (caseId) => {
      if (!actor) throw new Error("Not connected");
      return actor.sealCase(caseId);
    },
    onSuccess: () => {
      ue.success("Case sealed!");
      qc.invalidateQueries({ queryKey: ["allCases"] });
    }
  });
  const filtered = cases.filter(
    (c) => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.caseId.toString().includes(search)
  );
  const open = cases.filter((c) => c.status === "open").length;
  const closed = cases.length - open;
  const openPct = cases.length > 0 ? open / cases.length * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: "#0a0a0f",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageAnimBG, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                className: "mb-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "section-heading text-3xl md:text-4xl mb-2",
                      style: { color: "#f0f0f0" },
                      children: t("dashboard")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "rgba(240,240,240,0.5)" }, children: "Manage cases and evidence records." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
              { label: t("allCases"), value: cases.length, icon: FolderOpen },
              { label: t("openCases"), value: open, icon: Clock },
              {
                label: t("totalEvidence"),
                value: cases.reduce((a, c) => a + c.evidenceIds.length, 0),
                icon: Shield
              },
              {
                label: t("recentActivity"),
                value: cases.slice(0, 5).length,
                icon: Clock
              }
            ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.08 },
                whileHover: { scale: 1.03, transition: { duration: 0.15 } },
                className: "glass p-5 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    s.icon,
                    {
                      className: "mx-auto mb-2 w-6 h-6",
                      style: { color: "#DC2626" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-display font-bold text-2xl",
                      style: { color: "#f0f0f0" },
                      children: s.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-xs mt-0.5",
                      style: { color: "rgba(240,240,240,0.45)" },
                      children: s.label
                    }
                  )
                ]
              },
              s.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.35 },
                className: "glass p-5 mb-8",
                style: {
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(220,38,38,0.15)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-mono uppercase tracking-wider",
                        style: { color: "rgba(240,240,240,0.5)" },
                        children: "Case Status Breakdown"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "flex items-center gap-1.5 text-xs",
                          style: { color: "#16A34A" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "w-2 h-2 rounded-full",
                                style: { background: "#16A34A" }
                              }
                            ),
                            "Open: ",
                            open
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "flex items-center gap-1.5 text-xs",
                          style: { color: "#DC2626" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "w-2 h-2 rounded-full",
                                style: { background: "#DC2626" }
                              }
                            ),
                            "Closed: ",
                            closed
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "relative h-3 rounded-full overflow-hidden",
                      style: { background: "rgba(220,38,38,0.18)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "absolute left-0 top-0 h-full rounded-full",
                          style: {
                            background: "linear-gradient(90deg, #16A34A, #22c55e)"
                          },
                          initial: { width: 0 },
                          animate: { width: `${openPct}%` },
                          transition: {
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.5
                          }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between mt-1.5 text-xs font-mono",
                      style: { color: "rgba(240,240,240,0.3)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0%" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          Math.round(openPct),
                          "% open"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100%" })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "cases", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsList,
                {
                  className: "mb-6",
                  style: {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(220,38,38,0.2)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TabsTrigger,
                      {
                        value: "cases",
                        "data-ocid": "case.tab",
                        style: { color: "rgba(240,240,240,0.7)" },
                        children: t("cases")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TabsTrigger,
                      {
                        value: "create",
                        "data-ocid": "case.tab",
                        style: { color: "rgba(240,240,240,0.7)" },
                        children: t("createCase")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TabsTrigger,
                      {
                        value: "log",
                        "data-ocid": "case.tab",
                        style: { color: "rgba(240,240,240,0.7)" },
                        children: t("activityLog")
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "cases", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Search,
                    {
                      className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                      style: { color: "rgba(220,38,38,0.6)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "case.search_input",
                      value: search,
                      onChange: (e) => setSearch(e.target.value),
                      placeholder: t("searchEvidence"),
                      className: "pl-9",
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(220,38,38,0.25)",
                        color: "#f0f0f0"
                      }
                    }
                  )
                ] }) }),
                isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex justify-center py-12",
                    "data-ocid": "case.loading_state",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      LoaderCircle,
                      {
                        className: "w-8 h-8 animate-spin",
                        style: { color: "#DC2626" }
                      }
                    )
                  }
                ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass text-center py-12",
                    "data-ocid": "case.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FolderOpen,
                        {
                          className: "mx-auto mb-3 w-10 h-10",
                          style: { color: "rgba(220,38,38,0.4)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "rgba(240,240,240,0.45)" }, children: "No cases found." })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -12 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: idx * 0.05 },
                    className: "glass",
                    "data-ocid": `case.item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-4 p-4 cursor-pointer",
                          onClick: () => setExpanded(
                            expanded === c.caseId.toString() ? null : c.caseId.toString()
                          ),
                          onKeyDown: (e) => {
                            if (e.key === "Enter" || e.key === " ")
                              setExpanded(
                                expanded === c.caseId.toString() ? null : c.caseId.toString()
                              );
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                style: { background: "rgba(220,38,38,0.1)" },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  FolderOpen,
                                  {
                                    className: "w-4 h-4",
                                    style: { color: "#DC2626" }
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "font-semibold truncate",
                                  style: { color: "#f0f0f0" },
                                  children: c.title
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "text-xs font-mono",
                                  style: { color: "rgba(240,240,240,0.4)" },
                                  children: [
                                    "ID: ",
                                    c.caseId.toString(),
                                    " · Evidence:",
                                    " ",
                                    c.evidenceIds.length
                                  ]
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                style: {
                                  background: c.status === "open" ? "rgba(22,163,74,0.15)" : "rgba(220,38,38,0.15)",
                                  color: c.status === "open" ? "#16A34A" : "#DC2626",
                                  border: `1px solid ${c.status === "open" ? "rgba(22,163,74,0.3)" : "rgba(220,38,38,0.3)"}`
                                },
                                children: c.status
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                size: "sm",
                                "data-ocid": `case.delete_button.${idx + 1}`,
                                onClick: (e) => {
                                  e.stopPropagation();
                                  sealMut.mutate(c.caseId);
                                },
                                disabled: c.status === "closed" || sealMut.isPending,
                                className: "text-xs",
                                style: {
                                  background: "transparent",
                                  border: "1px solid rgba(220,38,38,0.3)",
                                  color: "#DC2626"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 mr-1" }),
                                  t("sealCase")
                                ]
                              }
                            ),
                            expanded === c.caseId.toString() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                              ChevronDown,
                              {
                                className: "w-4 h-4 flex-shrink-0",
                                style: { color: "rgba(240,240,240,0.4)" }
                              }
                            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                              ChevronRight,
                              {
                                className: "w-4 h-4 flex-shrink-0",
                                style: { color: "rgba(240,240,240,0.4)" }
                              }
                            )
                          ]
                        }
                      ),
                      expanded === c.caseId.toString() && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "px-4 pb-4",
                          style: {
                            borderTop: "1px solid rgba(220,38,38,0.1)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm mt-3 mb-2",
                                style: { color: "rgba(240,240,240,0.6)" },
                                children: c.description || "No description provided."
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "text-xs font-mono",
                                style: { color: "rgba(240,240,240,0.35)" },
                                children: [
                                  "Created: ",
                                  formatTimestamp(c.createdAt)
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "text-xs font-semibold mb-2",
                                  style: { color: "rgba(220,38,38,0.8)" },
                                  children: [
                                    "Evidence IDs (",
                                    c.evidenceIds.length,
                                    ")"
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: c.evidenceIds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs",
                                  style: { color: "rgba(240,240,240,0.35)" },
                                  children: "No evidence attached."
                                }
                              ) : c.evidenceIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  className: "font-mono text-xs px-2 py-0.5 rounded",
                                  style: {
                                    background: "rgba(220,38,38,0.1)",
                                    color: "rgba(220,38,38,0.8)"
                                  },
                                  children: [
                                    "#",
                                    id.toString()
                                  ]
                                },
                                id.toString()
                              )) })
                            ] })
                          ]
                        }
                      )
                    ]
                  },
                  c.caseId.toString()
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "create", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-8 max-w-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display font-semibold text-lg mb-6",
                    style: { color: "#f0f0f0" },
                    children: t("createCase")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { style: { color: "rgba(240,240,240,0.7)" }, children: "Case Title" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "case.input",
                        value: title,
                        onChange: (e) => setTitle(e.target.value),
                        placeholder: "e.g. Operation Cyber Shield 2024",
                        className: "mt-1.5",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(220,38,38,0.25)",
                          color: "#f0f0f0"
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { style: { color: "rgba(240,240,240,0.7)" }, children: t("description") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        value: desc,
                        onChange: (e) => setDesc(e.target.value),
                        placeholder: "Case description, objectives, and relevant details...",
                        rows: 4,
                        className: "mt-1.5",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(220,38,38,0.25)",
                          color: "#f0f0f0"
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "data-ocid": "case.submit_button",
                      onClick: () => createMut.mutate(),
                      disabled: !title || createMut.isPending,
                      className: "w-full h-11",
                      style: {
                        background: "#DC2626",
                        color: "#fff",
                        border: "none"
                      },
                      children: createMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 w-4 h-4 animate-spin" }),
                        " ",
                        "Creating..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 w-4 h-4" }),
                        " ",
                        t("createCase")
                      ] })
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "log", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display font-semibold mb-4",
                    style: { color: "#DC2626" },
                    children: t("activityLog")
                  }
                ),
                cases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm",
                    style: { color: "rgba(240,240,240,0.4)" },
                    children: "No activity yet."
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: cases.slice(0, 20).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 py-2",
                    style: {
                      borderBottom: "1px solid rgba(240,240,240,0.05)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-2 h-2 rounded-full flex-shrink-0",
                          style: {
                            background: c.status === "open" ? "#16A34A" : "#DC2626"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-sm flex-1",
                          style: { color: "rgba(240,240,240,0.7)" },
                          children: [
                            "Case",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "font-mono text-xs",
                                style: { color: "#DC2626" },
                                children: [
                                  "#",
                                  c.caseId.toString()
                                ]
                              }
                            ),
                            " ",
                            '"',
                            c.title,
                            '" — ',
                            c.status
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-mono text-xs",
                          style: { color: "rgba(240,240,240,0.3)" },
                          children: formatTimestamp(c.createdAt)
                        }
                      )
                    ]
                  },
                  c.caseId.toString()
                )) })
              ] }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
        ] })
      ]
    }
  );
}
export {
  CaseDashboard as default
};
