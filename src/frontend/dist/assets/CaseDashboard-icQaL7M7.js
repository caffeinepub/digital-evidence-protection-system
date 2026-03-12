var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { B as Subscribable, D as shallowEqualObjects, E as hashKey, G as getDefaultState, I as notifyManager, J as useQueryClient, h as reactExports, K as noop, N as shouldThrowError, c as createLucideIcon, x as useLang, O as useActor, P as useQuery, o as jsxRuntimeExports, R as RedRotation3DBG, q as motion, S as Shield, A as Search, Q as Input, T as LoaderCircle, V as Button, W as ChevronDown, X as formatTimestamp, Y as Label, Z as Textarea, F as Footer, _ as ue } from "./index-BTordXxQ.js";
import { B as Badge } from "./badge-DaeUkO8a.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BnTu0WVt.js";
import { M as MOCK_CASES } from "./mockData-Daz8u9K8.js";
import { L as Lock } from "./lock-iS1mP3rv.js";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(RedRotation3DBG, {}),
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
