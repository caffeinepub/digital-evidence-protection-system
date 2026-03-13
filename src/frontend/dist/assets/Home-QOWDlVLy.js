import { c as createLucideIcon, f as frame, a as cancelFrame, i as interpolate, p as progress, v as velocityPerSecond, b as isHTMLElement, d as defaultOffset$1, e as clamp, n as noop, r as resize, g as frameData, s as supportsScrollTimeline, u as useConstant, h as reactExports, j as useIsomorphicLayoutEffect, k as invariant, m as motionValue, M as MotionConfigContext, l as collectMotionValues, o as jsxRuntimeExports, q as motion, C as Canvas, t as useFrame, w as useLang, S as Shield, H as Hash, x as MeshPhysicalMaterial, y as CircleCheckBig, U as Users, z as Upload, L as Link, A as Search, F as Footer } from "./index-dk1lR00N.js";
import { L as Lock } from "./lock-dcTPXr09.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode);
function observeTimeline(update, timeline) {
  let prevProgress;
  const onFrame = () => {
    const { currentTime } = timeline;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress2 = percentage / 100;
    if (prevProgress !== progress2) {
      update(progress2);
    }
    prevProgress = progress2;
  };
  frame.preUpdate(onFrame, true);
  return () => cancelFrame(onFrame);
}
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time) {
  const axis = info[axisName];
  const { length, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = element[`scroll${position}`];
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress(0, axis.scrollLength, axis.current);
  const elapsed = time - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
  updateAxisInfo(element, "x", info, time);
  updateAxisInfo(element, "y", info, time);
  info.time = time;
}
function calcInset(element, container) {
  const inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (isHTMLElement(current)) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current.tagName === "svg") {
      const svgBoundingBox = current.getBoundingClientRect();
      current = current.parentElement;
      const parentBoundingBox = current.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current instanceof SVGGraphicsElement) {
      const { x, y } = current.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current.parentNode;
      }
      current = svg;
    } else {
      break;
    }
  }
  return inset;
}
const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  if (typeof edge === "string") {
    const asNumber = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber;
    } else if (edge.endsWith("%")) {
      edge = asNumber / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber;
    }
  }
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
const ScrollOffset = {
  All: [
    [0, 0],
    [1, 1]
  ]
};
const point = { x: 0, y: 0 };
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
  const { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged) {
    info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: (time) => {
      measure(element, options.target, info);
      updateScrollInfo(element, info, time);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const scrollSize = /* @__PURE__ */ new WeakMap();
const dimensionCheckProcesses = /* @__PURE__ */ new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, trackContentSize = false, ...options } = {}) {
  if (!container)
    return noop;
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers) {
        handler.measure(frameData.timestamp);
      }
      frame.preUpdate(notifyAll);
    };
    const notifyAll = () => {
      for (const handler of containerHandlers) {
        handler.notify();
      }
    };
    const listener2 = () => frame.read(measureAll);
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2);
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2);
    listener2();
  }
  if (trackContentSize && !dimensionCheckProcesses.has(container)) {
    const listener2 = scrollListeners.get(container);
    const size = {
      width: container.scrollWidth,
      height: container.scrollHeight
    };
    scrollSize.set(container, size);
    const checkScrollDimensions = () => {
      const newWidth = container.scrollWidth;
      const newHeight = container.scrollHeight;
      if (size.width !== newWidth || size.height !== newHeight) {
        listener2();
        size.width = newWidth;
        size.height = newHeight;
      }
    };
    const dimensionCheckProcess = frame.read(checkScrollDimensions, true);
    dimensionCheckProcesses.set(container, dimensionCheckProcess);
  }
  const listener = scrollListeners.get(container);
  frame.read(listener, false, true);
  return () => {
    var _a;
    cancelFrame(listener);
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers)
      return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size)
      return;
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      (_a = resizeListeners.get(container)) == null ? void 0 : _a();
      window.removeEventListener("resize", scrollListener);
    }
    const dimensionCheckProcess = dimensionCheckProcesses.get(container);
    if (dimensionCheckProcess) {
      cancelFrame(dimensionCheckProcess);
      dimensionCheckProcesses.delete(container);
    }
    scrollSize.delete(container);
  };
}
function canUseNativeTimeline(target) {
  return typeof window !== "undefined" && !target && supportsScrollTimeline();
}
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[options.axis].progress * 100;
  }, options);
  return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
  const { axis } = options;
  if (source)
    container = source;
  const containerCache = timelineCache.get(container) ?? /* @__PURE__ */ new Map();
  timelineCache.set(container, containerCache);
  const targetKey = options.target ?? "self";
  const targetCache = containerCache.get(targetKey) ?? {};
  const axisKey = axis + (options.offset ?? []).join(",");
  if (!targetCache[axisKey]) {
    targetCache[axisKey] = canUseNativeTimeline(options.target) ? new ScrollTimeline({ source: container, axis }) : scrollTimelineFallback({ container, ...options });
  }
  return targetCache[axisKey];
}
function attachToAnimation(animation, options) {
  const timeline = getTimeline(options);
  return animation.attachTimeline({
    timeline: options.target ? void 0 : timeline,
    observe: (valueAnimation) => {
      valueAnimation.pause();
      return observeTimeline((progress2) => {
        valueAnimation.time = valueAnimation.iterationDuration * progress2;
      }, timeline);
    }
  });
}
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  const optionsWithDefaults = { axis, container, ...options };
  return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
const createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
});
const isRefPending = (ref) => {
  if (!ref)
    return false;
  return !ref.current;
};
function makeAccelerateConfig(axis, options, container) {
  return {
    factory: (animation) => scroll(animation, { ...options, axis, container }),
    times: [0, 1],
    keyframes: [0, 1],
    ease: (v) => v,
    duration: 1
  };
}
function useScroll({ container, target, ...options } = {}) {
  const values = useConstant(createScrollMotionValues);
  if (!target && canUseNativeTimeline()) {
    const resolvedContainer = (container == null ? void 0 : container.current) || void 0;
    values.scrollXProgress.accelerate = makeAccelerateConfig("x", options, resolvedContainer);
    values.scrollYProgress.accelerate = makeAccelerateConfig("y", options, resolvedContainer);
  }
  const scrollAnimation = reactExports.useRef(null);
  const needsStart = reactExports.useRef(false);
  const start = reactExports.useCallback(() => {
    scrollAnimation.current = scroll((_progress, { x, y }) => {
      values.scrollX.set(x.current);
      values.scrollXProgress.set(x.progress);
      values.scrollY.set(y.current);
      values.scrollYProgress.set(y.progress);
    }, {
      ...options,
      container: (container == null ? void 0 : container.current) || void 0,
      target: (target == null ? void 0 : target.current) || void 0
    });
    return () => {
      var _a;
      (_a = scrollAnimation.current) == null ? void 0 : _a.call(scrollAnimation);
    };
  }, [container, target, JSON.stringify(options.offset)]);
  useIsomorphicLayoutEffect(() => {
    needsStart.current = false;
    if (isRefPending(container) || isRefPending(target)) {
      needsStart.current = true;
      return;
    } else {
      return start();
    }
  }, [start]);
  reactExports.useEffect(() => {
    if (needsStart.current) {
      invariant(!isRefPending(container));
      invariant(!isRefPending(target));
      return start();
    } else {
      return;
    }
  }, [start]);
  return values;
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const isOutputMap = outputRangeOrMap !== void 0 && !Array.isArray(outputRangeOrMap) && typeof inputRangeOrTransformer !== "function";
  if (isOutputMap) {
    return useMapTransform(input, inputRangeOrTransformer, outputRangeOrMap, options);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useMapTransform(inputValue, inputRange, outputMap, options) {
  const keys2 = useConstant(() => Object.keys(outputMap));
  const output = useConstant(() => ({}));
  for (const key of keys2) {
    output[key] = useTransform(inputValue, inputRange, outputMap[key], options);
  }
  return output;
}
function getGraphemeClusters(text) {
  try {
    const segmenter = new Intl.Segmenter(void 0, {
      granularity: "grapheme"
    });
    return [...segmenter.segment(text)].map((s) => s.segment);
  } catch {
    return [...text];
  }
}
function CharSplitHeading({
  text,
  className,
  style
}) {
  const chars = getGraphemeClusters(text).map((char, i) => ({
    char,
    key: `char-pos-${i}`
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      className,
      style: { display: "inline-block", ...style },
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: false, amount: 0.5 },
      variants: {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.03 }
        }
      },
      children: chars.map(({ char, key }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          style: { display: "inline-block", whiteSpace: "pre" },
          variants: {
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.35, ease: "easeOut" }
            }
          },
          children: char
        },
        key
      ))
    },
    text
  );
}
class WebGLEB extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
function GalaxyParticles() {
  const ref = reactExports.useRef(null);
  const count = 180;
  const positions = reactExports.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 14;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = Math.sin(angle) * radius - 10;
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("bufferGeometry", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointsMaterial",
      {
        size: 0.06,
        color: "#DC2626",
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true
      }
    )
  ] });
}
function OrbitRing({
  posY,
  speed,
  opacity
}) {
  const ref = reactExports.useRef(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
      ref.current.rotation.x = clock.getElapsedTime() * speed * 0.4;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, position: [0, posY, -12], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [6, 0.04, 8, 80] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#DC2626", transparent: true, opacity })
  ] });
}
function WireDodeca() {
  const ref = reactExports.useRef(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.x = t * 0.05;
      ref.current.rotation.y = t * 0.08;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, position: [0, 0, -14], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dodecahedronGeometry", { args: [7, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#b91c1c", wireframe: true, transparent: true, opacity: 0.09 })
  ] });
}
function WireTetra() {
  const ref = reactExports.useRef(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.x = t * 0.07;
      ref.current.rotation.z = t * 0.04;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, position: [0, 0, -10], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("tetrahedronGeometry", { args: [9, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#16A34A", wireframe: true, transparent: true, opacity: 0.06 })
  ] });
}
function HomeExtraBG() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(WebGLEB, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Canvas,
        {
          camera: { position: [0, 0, 10], fov: 70 },
          dpr: Math.min(
            typeof window !== "undefined" ? window.devicePixelRatio : 1,
            1.5
          ),
          gl: { antialias: false, alpha: true },
          style: { background: "transparent", width: "100%", height: "100%" },
          performance: { min: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GalaxyParticles, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(WireDodeca, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(WireTetra, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitRing, { posY: 3, speed: 0.06, opacity: 0.18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitRing, { posY: -3, speed: 0.04, opacity: 0.12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitRing, { posY: 0, speed: 0.03, opacity: 0.08 })
          ]
        }
      ) })
    }
  );
}
function ScrollytellingSection() {
  const containerRef = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const { lang } = useLang();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const panels = [
    {
      id: "panel-1",
      icon: Shield,
      title: lang === "hi" ? "साक्ष्य" : "Evidence",
      subtitle: lang === "hi" ? "सुरक्षित" : "SECURED",
      desc: lang === "hi" ? "हर डिजिटल साक्ष्य को एन्क्रिप्ट, टाइमस्टैम्प और अपरिवर्तनीय क्रिप्टोग्राफिक प्रमाण से सील किया जाता है। कोई छेड़छाड़ नहीं। कोई संदेह नहीं। सदा के लिए सुरक्षित।" : "Every digital artifact is encrypted, timestamped, and sealed with immutable cryptographic proof. No tampering. No doubt. Forever preserved on-chain.",
      glowColor: "rgba(220,38,38,0.6)",
      textColor: "#DC2626",
      bgGlow: "radial-gradient(ellipse at center, rgba(220,38,38,0.12) 0%, transparent 70%)"
    },
    {
      id: "panel-2",
      icon: Hash,
      title: lang === "hi" ? "हैश" : "Hash",
      subtitle: lang === "hi" ? "सत्यापित" : "VERIFIED",
      desc: lang === "hi" ? "SHA-256 फिंगरप्रिंट क्लाइंट-साइड पर कंप्यूट किए जाते हैं और स्थायी रूप से लॉक होते हैं। कोई भी बाइट-स्तरीय बदलाव तुरंत पकड़ा जाता है — अखंडता जो न्यायिक जांच में भी खरी उतरती है।" : "SHA-256 fingerprints computed client-side and locked permanently. Any byte-level modification is instantly detectable — integrity that withstands judicial scrutiny.",
      glowColor: "rgba(22,163,74,0.6)",
      textColor: "#16A34A",
      bgGlow: "radial-gradient(ellipse at center, rgba(22,163,74,0.12) 0%, transparent 70%)"
    },
    {
      id: "panel-3",
      icon: Link2,
      title: lang === "hi" ? "श्रृंखला" : "Chain",
      subtitle: lang === "hi" ? "लॉक्ड" : "LOCKED",
      desc: lang === "hi" ? "अटूट अभिरक्षा श्रृंखला। हर ट्रांसफर, एक्सेस और बदलाव — कब, किसने और क्यों — सब दर्ज। साक्ष्य संग्रह से कोर्टरूम तक पूर्ण ऑडिट ट्रेल।" : "An unbreakable chain of custody. Every transfer, access, and modification recorded with who, when, and why. Complete audit trail from evidence collection to courtroom.",
      glowColor: "rgba(59,130,246,0.6)",
      textColor: "#3B82F6",
      bgGlow: "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: containerRef,
      style: {
        position: "relative",
        height: "300vh"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#06060b"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                style: {
                  position: "absolute",
                  inset: "-20% 0",
                  backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(22,163,74,0.04) 0%, transparent 50%)",
                  translateY: parallaxY
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                  opacity: 0.5
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  top: 32,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  color: "rgba(220,38,38,0.6)",
                  zIndex: 20
                },
                children: lang === "hi" ? "▶ डिजिटल साक्ष्य जीवनचक्र" : "▶ SCROLLYTELLING — DIGITAL EVIDENCE LIFECYCLE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgressBeam, { scrollYProgress }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollPanels, { scrollYProgress, panels })
          ]
        }
      )
    }
  );
}
function ScrollProgressBeam({
  scrollYProgress
}) {
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        position: "absolute",
        right: 40,
        top: 0,
        bottom: 0,
        width: 2,
        background: "rgba(240,240,240,0.05)",
        zIndex: 10
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom, #DC2626, #16A34A, #3B82F6)",
              scaleY,
              transformOrigin: "top",
              filter: "blur(1px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            style: {
              position: "absolute",
              left: "50%",
              top: dotTop,
              x: "-50%",
              y: "-50%",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#DC2626",
              boxShadow: "0 0 12px rgba(220,38,38,0.8), 0 0 24px rgba(220,38,38,0.4)"
            }
          }
        )
      ]
    }
  );
}
function ScrollPanels({
  scrollYProgress,
  panels
}) {
  const p1Opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.28, 0.33],
    [1, 1, 1, 0]
  );
  const p1Y = useTransform(scrollYProgress, [0.28, 0.4], ["0%", "-15%"]);
  const p1Scale = useTransform(scrollYProgress, [0.28, 0.4], [1, 0.93]);
  const p2Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.61, 0.68],
    [0, 1, 1, 0]
  );
  const p2Y = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.61, 0.68],
    ["15%", "0%", "0%", "-15%"]
  );
  const p3Opacity = useTransform(scrollYProgress, [0.61, 0.72, 1], [0, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.61, 0.72], ["15%", "0%"]);
  const panelMotions = [
    { panel: panels[0], opacity: p1Opacity, y: p1Y, scale: p1Scale },
    { panel: panels[1], opacity: p2Opacity, y: p2Y, scale: void 0 },
    { panel: panels[2], opacity: p3Opacity, y: p3Y, scale: void 0 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: panelMotions.map(({ panel, opacity, y, scale }) => {
    const PIcon = panel.icon;
    const colorR = panel.textColor === "#DC2626" ? "220,38,38" : panel.textColor === "#16A34A" ? "22,163,74" : "59,130,246";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        style: {
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
          y,
          scale
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                background: panel.bgGlow
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                maxWidth: 700,
                padding: "0 2rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: `rgba(${colorR}, 0.12)`,
                      border: `2px solid ${panel.glowColor}`,
                      boxShadow: `0 0 40px ${panel.glowColor}, 0 0 80px ${panel.glowColor.replace("0.6", "0.2")}`,
                      marginBottom: 32
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      PIcon,
                      {
                        className: "w-12 h-12",
                        style: {
                          color: panel.textColor,
                          filter: `drop-shadow(0 0 12px ${panel.glowColor})`
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: "clamp(3rem, 8vw, 7rem)",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "#f0f0f0",
                      marginBottom: 8,
                      letterSpacing: "-0.02em"
                    },
                    children: panel.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "clamp(1rem, 3vw, 2rem)",
                      fontWeight: 700,
                      color: panel.textColor,
                      letterSpacing: "0.25em",
                      marginBottom: 24,
                      textShadow: `0 0 20px ${panel.glowColor}`
                    },
                    children: panel.subtitle
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
                      color: "rgba(240,240,240,0.65)",
                      lineHeight: 1.8,
                      maxWidth: 560,
                      margin: "0 auto"
                    },
                    children: panel.desc
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                      marginTop: 40
                    },
                    children: panels.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          width: p.id === panel.id ? 32 : 8,
                          height: 8,
                          borderRadius: 4,
                          background: p.id === panel.id ? panel.textColor : "rgba(240,240,240,0.2)",
                          transition: "all 0.3s ease"
                        }
                      },
                      p.id
                    ))
                  }
                )
              ]
            }
          )
        ]
      },
      panel.id
    );
  }) });
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
var distort = "#define GLSLIFY 1\nvec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}";
class DistortMaterialImpl extends MeshPhysicalMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
    this._time = {
      value: 0
    };
    this._distort = {
      value: 0.4
    };
    this._radius = {
      value: 1
    };
  }
  // FIXME Use `THREE.WebGLProgramParametersWithUniforms` type when able to target @types/three@0.160.0
  onBeforeCompile(shader) {
    shader.uniforms.time = this._time;
    shader.uniforms.radius = this._radius;
    shader.uniforms.distort = this._distort;
    shader.vertexShader = `
      uniform float time;
      uniform float radius;
      uniform float distort;
      ${distort}
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `);
  }
  get time() {
    return this._time.value;
  }
  set time(v) {
    this._time.value = v;
  }
  get distort() {
    return this._distort.value;
  }
  set distort(v) {
    this._distort.value = v;
  }
  get radius() {
    return this._radius.value;
  }
  set radius(v) {
    this._radius.value = v;
  }
}
const MeshDistortMaterial = /* @__PURE__ */ reactExports.forwardRef(({
  speed = 1,
  ...props
}, ref) => {
  const [material] = reactExports.useState(() => new DistortMaterialImpl());
  useFrame((state) => material && (material.time = state.clock.elapsedTime * speed));
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: material,
    ref,
    attach: "material"
  }, props));
});
function GlowingSphere() {
  const ref = reactExports.useRef(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 4e-3;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.8, 64, 64] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MeshDistortMaterial,
      {
        color: "#DC2626",
        distort: 0.4,
        speed: 2,
        metalness: 0.8,
        roughness: 0.2,
        emissive: "#DC2626",
        emissiveIntensity: 0.3
      }
    )
  ] });
}
function RotatingIco() {
  const ref = reactExports.useRef(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x += delta * 0.1;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [1.8, 1] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#DC2626", wireframe: true, opacity: 0.3, transparent: true })
  ] });
}
function RotatingOcta() {
  const ref = reactExports.useRef(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.18;
      ref.current.rotation.x += delta * 0.1;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [2.8, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#16A34A", wireframe: true, opacity: 0.18, transparent: true })
  ] });
}
function OrbitingLights() {
  const redRef = reactExports.useRef(null);
  const greenRef = reactExports.useRef(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const r = 3.5;
    if (redRef.current) {
      redRef.current.position.x = Math.cos(t * 0.6) * r;
      redRef.current.position.z = Math.sin(t * 0.6) * r;
      redRef.current.position.y = Math.sin(t * 0.4) * 1.5;
    }
    if (greenRef.current) {
      greenRef.current.position.x = Math.cos(t * 0.6 + Math.PI) * r;
      greenRef.current.position.z = Math.sin(t * 0.6 + Math.PI) * r;
      greenRef.current.position.y = Math.sin(t * 0.4 + Math.PI) * 1.5;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { ref: redRef, color: "#DC2626", intensity: 2, distance: 8 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { ref: greenRef, color: "#16A34A", intensity: 1.5, distance: 8 })
  ] });
}
function DNAHelix() {
  const groupRef = reactExports.useRef(null);
  const count = 20;
  const helixData = reactExports.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = i / count * Math.PI * 4;
      const y = i / count * 6 - 3;
      const radius = 2.2;
      return {
        id: `helix-${i}`,
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
        rotX: angle,
        color: i % 2 === 0 ? "#DC2626" : "#16A34A"
      };
    });
  }, []);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: groupRef, children: helixData.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [d.x, d.y, d.z], rotation: [d.rotX, 0, 0], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.12, 0.03, 8, 16] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color: d.color,
        emissive: d.color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.7
      }
    )
  ] }, d.id)) });
}
function FloatingSpheres() {
  const count = 60;
  const spheres = reactExports.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: `sp-${i}`,
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ],
      color: i % 3 === 0 ? "#DC2626" : i % 3 === 1 ? "#16A34A" : "#3B82F6",
      speed: 0.2 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2
    }));
  }, []);
  const refs = reactExports.useRef([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y = spheres[i].position[1] + Math.sin(t * spheres[i].speed + spheres[i].offset) * 0.4;
      }
    });
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: spheres.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "mesh",
    {
      ref: (el) => {
        refs.current[i] = el;
      },
      position: s.position,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.05, 8, 8] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: s.color, opacity: 0.6, transparent: true })
      ]
    },
    s.id
  )) });
}
function ThreeScene() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 7], fov: 50 },
      style: { background: "transparent" },
      gl: { alpha: true, antialias: true },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitingLights, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlowingSphere, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotatingIco, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotatingOcta, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DNAHelix, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingSpheres, {})
      ] })
    }
  );
}
function AnimatedCounter({
  target,
  suffix = ""
}) {
  const [count, setCount] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  const started = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now) => {
            const progress2 = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - progress2) ** 3;
            setCount(Math.floor(eased * target));
            if (progress2 < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, children: [
    count.toLocaleString(),
    suffix
  ] });
}
function PulsingStepCircle({ icon: Icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16 mx-auto mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute inset-0 rounded-full",
        style: { border: "2px solid rgba(220,38,38,0.3)" },
        animate: { scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] },
        transition: {
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute inset-0 rounded-full",
        style: { border: "1px solid rgba(220,38,38,0.15)" },
        animate: { scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] },
        transition: {
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.4
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 rounded-full flex items-center justify-center",
        style: {
          background: "rgba(220,38,38,0.1)",
          border: "2px solid rgba(220,38,38,0.4)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7", style: { color: "#DC2626" } })
      }
    )
  ] });
}
const coreCapabilitiesSquares = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 4 + Math.floor(Math.random() * 13),
  opacity: 0.08 + Math.random() * 0.22,
  duration: 6 + Math.random() * 10,
  delay: Math.random() * 8,
  rotate: Math.random() * 360
}));
function CoreCapabilitiesBG() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0
      },
      children: coreCapabilitiesSquares.map((sq) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: sq.left,
            top: sq.top,
            width: sq.size,
            height: sq.size,
            background: "#DC2626",
            opacity: sq.opacity,
            borderRadius: 1,
            animation: `floatUpSquare ${sq.duration}s ${sq.delay}s linear infinite`,
            transform: `rotate(${sq.rotate}deg)`
          }
        },
        sq.id
      ))
    }
  );
}
function Home() {
  const { t } = useLang();
  const heroRef = reactExports.useRef(null);
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 500], [0, 150]);
  const stats = [
    { label: t("evidenceSecured"), value: 1e4, suffix: "+", icon: Shield },
    { label: t("casesSolved"), value: 2400, suffix: "+", icon: CircleCheckBig },
    { label: t("agencies"), value: 150, suffix: "+", icon: Building2 },
    { label: t("uptime"), value: 99, suffix: ".9%", icon: Lock }
  ];
  const features = [
    {
      icon: Shield,
      title: t("secureStorage"),
      desc: t("secureStorageDesc")
    },
    {
      icon: Hash,
      title: t("hashIntegrity"),
      desc: t("hashIntegrityDesc")
    },
    {
      icon: Users,
      title: t("roleAccess"),
      desc: t("roleAccessDesc")
    },
    {
      icon: Link2,
      title: t("chainCustody"),
      desc: t("chainCustodyDesc")
    },
    {
      icon: CircleCheckBig,
      title: t("realTimeVerify"),
      desc: t("realTimeVerifyDesc")
    },
    {
      icon: Building2,
      title: t("multiAgency"),
      desc: t("multiAgencyDesc")
    }
  ];
  const steps = [
    { num: "01", title: t("step1"), desc: t("step1Desc"), icon: Upload },
    { num: "02", title: t("step2"), desc: t("step2Desc"), icon: Hash },
    { num: "03", title: t("step3"), desc: t("step3Desc"), icon: CircleCheckBig }
  ];
  const titleWords = t("appName").split(" ");
  const redWords = /* @__PURE__ */ new Set([
    "Digital",
    "Evidence",
    "ࠡिजिटल",
    "साक्ष्य"
  ]);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  const statsContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };
  const statCard = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  const featureHover = {
    scale: 1.02,
    y: -4,
    boxShadow: "0 0 24px rgba(220,38,38,0.18), 0 8px 32px rgba(0,0,0,0.4)",
    borderColor: "rgba(220,38,38,0.45)",
    transition: { duration: 0.2 }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#0a0a0f", position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HomeExtraBG, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: heroRef,
        style: {
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              style: {
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.2)",
                zIndex: 0,
                translateY: heroBgY
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              style: {
                position: "absolute",
                top: "15%",
                left: "8%",
                width: 320,
                height: 320,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
                zIndex: 0,
                filter: "blur(40px)"
              },
              animate: { y: [0, -24, 0], x: [0, 12, 0] },
              transition: {
                duration: 9,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              style: {
                position: "absolute",
                bottom: "20%",
                right: "6%",
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)",
                zIndex: 0,
                filter: "blur(32px)"
              },
              animate: { y: [0, 18, 0], x: [0, -10, 0] },
              transition: {
                duration: 11,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1.5
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              style: {
                position: "absolute",
                top: "50%",
                right: "20%",
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)",
                zIndex: 0,
                filter: "blur(24px)"
              },
              animate: { y: [0, -14, 0] },
              transition: {
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.8
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "cyber-grid",
              style: { position: "absolute", inset: 0, zIndex: 0, opacity: 0.5 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)",
                animation: "scanLine 6s linear infinite",
                zIndex: 2
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 680,
                height: 680,
                maxWidth: "90vw",
                maxHeight: "90vw",
                zIndex: 1,
                pointerEvents: "none",
                opacity: 0.55
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThreeScene, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative text-center px-4 max-w-5xl mx-auto",
              style: { zIndex: 3 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5 },
                    className: "inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-mono",
                    style: {
                      background: "rgba(220,38,38,0.1)",
                      border: "1px solid rgba(220,38,38,0.35)",
                      color: "#DC2626"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          className: "w-1.5 h-1.5 rounded-full bg-green-500",
                          animate: { opacity: [1, 0.3, 1] },
                          transition: { duration: 1.4, repeat: Number.POSITIVE_INFINITY }
                        }
                      ),
                      "SYSTEM ONLINE — SECURE CONNECTION ESTABLISHED"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.h1,
                  {
                    variants: containerVariants,
                    initial: "hidden",
                    animate: "visible",
                    className: "font-display font-bold mb-6 leading-tight",
                    style: { fontSize: "clamp(2rem, 5vw, 4rem)", color: "#f0f0f0" },
                    children: titleWords.map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        variants: wordVariants,
                        style: {
                          display: "inline-block",
                          marginRight: "0.3em",
                          color: redWords.has(word) ? "#DC2626" : "#f0f0f0"
                        },
                        children: word
                      },
                      word + String(i)
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: {
                      duration: 0.6,
                      delay: 0.35 + titleWords.length * 0.1
                    },
                    className: "text-lg mb-10 max-w-2xl mx-auto",
                    style: { color: "rgba(240,240,240,0.65)", lineHeight: 1.7 },
                    children: t("heroSubtitle")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, delay: 0.5 + titleWords.length * 0.1 },
                    className: "flex flex-wrap justify-center gap-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          className: "btn-primary flex items-center gap-2 text-base px-6 py-3",
                          "data-ocid": "hero.upload_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                            t("uploadEvidence")
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/verify", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          className: "btn-outline flex items-center gap-2 text-base px-6 py-3",
                          "data-ocid": "hero.verify_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                            t("verifyEvidence")
                          ]
                        }
                      ) })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "linear-gradient(to bottom, transparent, #0a0a0f)",
                zIndex: 2
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 px-4",
        style: { position: "relative", zIndex: 1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid grid-cols-2 md:grid-cols-4 gap-6",
            variants: statsContainer,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.3 },
            children: stats.map((s) => {
              const StatIcon = s.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: statCard,
                  whileHover: {
                    scale: 1.04,
                    boxShadow: "0 0 20px rgba(220,38,38,0.15)",
                    transition: { duration: 0.2 }
                  },
                  className: "glass text-center p-6 cursor-default",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        animate: { rotate: [0, 8, -8, 0] },
                        transition: {
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          StatIcon,
                          {
                            className: "mx-auto mb-3 w-7 h-7",
                            style: { color: "#DC2626" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "font-display font-bold text-3xl mb-1",
                        style: { color: "#f0f0f0" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: s.value, suffix: s.suffix })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-sm",
                        style: { color: "rgba(240,240,240,0.5)" },
                        children: s.label
                      }
                    )
                  ]
                },
                s.label
              );
            })
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 px-4 cyber-grid",
        style: { position: "relative", zIndex: 1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoreCapabilitiesBG, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "max-w-6xl mx-auto",
              style: { position: "relative", zIndex: 1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    className: "text-center mb-14",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h2",
                        {
                          className: "section-heading text-3xl md:text-4xl mb-4",
                          style: { color: "#f0f0f0" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CharSplitHeading, { text: t("coreCapabilitiesTitle1") }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#DC2626" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CharSplitHeading, { text: t("coreCapabilitiesTitle2") }) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "rgba(240,240,240,0.5)" }, children: t("coreCapabilitiesSubtitle") })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: features.map((f, i) => {
                  const FIcon = f.icon;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 24 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { delay: i * 0.07 },
                      whileHover: featureHover,
                      className: "glass p-6",
                      style: { cursor: "default" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            className: "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
                            style: { background: "rgba(220,38,38,0.12)" },
                            whileHover: { rotate: 6, scale: 1.1 },
                            transition: { duration: 0.2 },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FIcon, { className: "w-5 h-5", style: { color: "#DC2626" } })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            className: "font-display font-semibold text-base mb-2",
                            style: { color: "#f0f0f0" },
                            children: f.title
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm",
                            style: { color: "rgba(240,240,240,0.5)" },
                            children: f.desc
                          }
                        )
                      ]
                    },
                    f.title
                  );
                }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollytellingSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 px-4",
        style: { position: "relative", zIndex: 1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-14",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "section-heading text-3xl md:text-4xl mb-4",
                  style: { color: "#f0f0f0" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CharSplitHeading, { text: t("howItWorks") })
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.2 },
              className: "relative text-center",
              children: [
                i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "hidden md:block absolute top-8 left-[60%] w-[80%] h-px",
                    style: {
                      background: "linear-gradient(90deg, rgba(220,38,38,0.4), rgba(220,38,38,0.1))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PulsingStepCircle, { icon: s.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "font-mono text-xs mb-2",
                    style: { color: "rgba(220,38,38,0.7)" },
                    children: [
                      t("stepLabel"),
                      " ",
                      s.num
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display font-semibold text-lg mb-2",
                    style: { color: "#f0f0f0" },
                    children: s.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm",
                    style: { color: "rgba(240,240,240,0.5)" },
                    children: s.desc
                  }
                )
              ]
            },
            s.num
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mt-14",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-primary flex items-center gap-2 mx-auto text-base px-8 py-3",
                  children: [
                    t("getStarted"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ) })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Home as default
};
