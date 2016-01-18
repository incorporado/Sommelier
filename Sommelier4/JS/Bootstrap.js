﻿(function ensightenInit() {
    var ensightenOptions = {
        client: "momondo",
        clientId: 614,
        publishPath: "prod",
        isPublic: 1,
        serverComponentLocation: "nexus.ensighten.com/momondo/prod/serverComponent.php",
        staticJavascriptPath: "nexus.ensighten.com/momondo/prod/code/",
        ns: 'Bootstrapper',
        nexus: "nexus.ensighten.com",
        scUseCacheBuster: "true",
        enableTagAuditBeacon: "true",
        enablePagePerfBeacon: "true",
        registryNs: "ensBootstraps",
        generatedOn: "Fri Jan 15 12:23:52 GMT 2016",
        beaconSamplingSeedValue: 11
    };
    if (!window[ensightenOptions.ns]) {
        window[ensightenOptions.registryNs] || (window[ensightenOptions.registryNs] = {});
        window[ensightenOptions.registryNs][ensightenOptions.ns] = window[ensightenOptions.ns] = function (f) {
            function m(a) {
                this.name = "DependencyNotAvailableException";
                this.message = "Dependency with id " + a + "is missing"
            }

            function n(a) {
                this.name = "BeaconException";
                this.message = "There was an error durring beacon initialization";
                a = a || {};
                this.lineNumber = a.lineNumber || a.line;
                this.fileName = a.fileName
            }

            function p() {
                for (var a = b.dataDefinitionIds.length, e = !0, d = 0; d < a; d++) {
                    var c = b.dataDefinitions[b.dataDefinitionIds[d]];
                    if (!c ||
                        null == c.endRegistration) {
                        e = !1;
                        break
                    }
                }
                e && b.callOnDataDefintionComplete()
            }
            var c = {},
                b = {};
            b.ensightenOptions = ensightenOptions;
            b.scDataObj = {};
            c.version = "1.26.0";
            c.nexus = f.nexus || "nexus.ensighten.com";
            c.rand = -1;
            c.currSec = (new Date)
                .getSeconds();
            c.options = {
                interval: f.interval || 100,
                erLoc: f.errorLocation || c.nexus + "/error/e.gif",
                scLoc: f.serverComponentLocation || c.nexus + "/" + f.client + "/serverComponent.php",
                sjPath: f.staticJavascriptPath || c.nexus + "/" + f.client + "/code/",
                alLoc: f.alertLocation || c.nexus + "/alerts/a.gif",
                publishPath: f.publishPath,
                isPublic: f.isPublic,
                client: f.client,
                clientId: f.clientId,
                enableTagAuditBeacon: f.enableTagAuditBeacon,
                scUseCacheBuster: f.scUseCacheBuster,
                beaconSamplingSeedValue: f.beaconSamplingSeedValue || -1
            };
            c.ruleList = [];
            c.allDeploymentIds = [];
            c.runDeploymentIds = [];
            c.exceptionList = [];
            c.ensightenVariables = {};
            c.test = function (a) {
                if (!(a.executionData.hasRun || a.executionData.runTime && 0 < a.executionData.runTime.length)) {
                    for (var b = 0; b < a.dependencies.length; b++)
                        if (!1 ===
                            a.dependencies[b]()) return;
                    a.execute()
                }
            };
            m.prototype = Error();
            m.prototype || (m.prototype = {});
            m.prototype.constructor = m;
            c.DependencyNotAvailableException = m;
            n.prototype = Error();
            n.prototype || (n.prototype = {});
            n.prototype.constructor = n;
            c.BeaconException = n;
            c.checkForInvalidDependencies = function (a, e, d, l) {
                for (a = 0; a < d.length; a++)
                    if ("DEPENDENCYNEVERAVAILABLE" === d[a]) return b.currentRuleId = this.id, b.currentDeploymentId = this.deploymentId, b.reportException(new c.DependencyNotAvailableException(l[a])), e && -1 !== e &&
                        c.allDeploymentIds.push(e), !0;
                return !1
            };
            b.currentRuleId = -1;
            b.currentDeploymentId = -1;
            b.reportedErrors = [];
            b.reportedAlerts = [];
            b.AF = [];
            b._serverTime = "";
            b._clientIP = "";
            b.sampleBeacon = function () {
                var a = !1;
                try {
                    var b = (c.currSec || 0) % 20,
                        d = c.options.beaconSamplingSeedValue; -1 === d ? a = !0 : 0 !== b && 0 === d % b && (a = !0)
                } catch (l) { }
                return a
            };
            b.getServerComponent = function (a) {
                b.callOnGetServerComponent();
                b.insertScript(window.location.protocol + "//" + c.options.scLoc, !1, a || !0, c.options.scUseCacheBuster)
            };
            b.setVariable = function (a,
                b) {
                c.ensightenVariables[a] = b
            };
            b.getVariable = function (a) {
                return a in c.ensightenVariables ? c.ensightenVariables[a] : null
            };
            b.testAll = function () {
                for (var a = 0; a < c.ruleList.length; a++) c.test(c.ruleList[a])
            };
            b.executionState = {
                DOMParsed: !1,
                DOMLoaded: !1,
                dataDefinitionComplete: !1,
                conditionalRules: !1,
                readyForServerComponent: !1
            };
            b.reportException = function (a) {
                a.timestamp = (new Date)
                    .getTime();
                c.exceptionList.push(a);
                a = window.location.protocol + "//" + c.options.erLoc + "?msg=" + encodeURIComponent(a.message || "") + "&lnn=" +
                    encodeURIComponent(a.lineNumber || a.line || -1) + "&fn=" + encodeURIComponent(a.fileName || "") + "&cid=" + encodeURIComponent(c.options.clientId || -1) + "&client=" + encodeURIComponent(c.options.client || "") + "&publishPath=" + encodeURIComponent(c.options.publishPath || "") + "&rid=" + encodeURIComponent(b.currentRuleId || -1) + "&did=" + encodeURIComponent(b.currentDeploymentId || -1) + "&errorName=" + encodeURIComponent(a.name || "");
                a = b.imageRequest(a);
                a.timestamp = (new Date)
                    .getTime();
                this.reportedErrors.push(a)
            };
            b.Rule = function (a) {
                this.execute =
                    function () {
                        this.executionData.runTime.push(new Date);
                        b.currentRuleId = this.id;
                        b.currentDeploymentId = this.deploymentId;
                        try {
                            this.code()
                        } catch (a) {
                            window[ensightenOptions.ns].reportException(a)
                        } finally {
                            this.executionData.hasRun = !0, -1 !== this.deploymentId && c.runDeploymentIds.push(this.deploymentId), b.testAll()
                        }
                    };
                this.id = a.id;
                this.deploymentId = a.deploymentId;
                this.dependencies = a.dependencies || [];
                this.code = a.code;
                this.executionData = {
                    hasRun: !1,
                    runTime: []
                }
            };
            b.registerRule = function (a) {
                if (b.getRule(a.id) && -1 !==
                    a.id) return !1;
                c.ruleList.push(a); -1 !== a.deploymentId && c.allDeploymentIds.push(a.deploymentId);
                b.testAll();
                return !0
            };
            b.getRule = function (a) {
                for (var b = 0; b < c.ruleList.length; b++)
                    if (c.ruleList[b].id === a) return c.ruleList[b];
                return !1
            };

            b.getAllDeploymentIds = function () {
                return c.allDeploymentIds
            };
            b.getRunDeploymentIds = function () {
                return c.runDeploymentIds
            };
            b.hasRuleRun = function (a) {
                return (a = b.getRule(a)) ? a.executionData.hasRun :
                    !1
            };
            c.toTwoChar = function (a) {
                return (2 === a.toString()
                    .length ? "" : "0") + a
            };
            b.Alert = function (a) {
                var b = new Date,
                    b = b.getFullYear() + "-" + c.toTwoChar(b.getMonth()) + "-" + c.toTwoChar(b.getDate()) + " " + c.toTwoChar(b.getHours()) + ":" + c.toTwoChar(b.getMinutes()) + ":" + c.toTwoChar(b.getSeconds());
                this.severity = a.severity || 1;
                this.subject = a.subject || "";
                this.type = a.type || 1;
                this.ruleId = a.ruleId || -1;
                this.severity = encodeURIComponent(this.severity);
                this.date = encodeURIComponent(b);
                this.subject = encodeURIComponent(this.subject);
                this.type = encodeURIComponent(this.type)
            };
            b.generateAlert = function (a) {
                a = b.imageRequest(window.location.protocol + "//" + c.options.alLoc + "?d=" + a.date + "&su=" + a.subject + "&se=" + a.severity + "&t=" + a.type + "&cid=" + c.options.clientId + "&client=" + c.options.client + "&publishPath=" + c.options.publishPath + "&rid=" + b.currentRuleId + "&did=" + b.currentDeploymentId);
                a.timestamp = (new Date)
                    .getTime();
                this.reportedAlerts.push(a)
            };
            b.imageRequest = function (a) {
                var b = new Image(0, 0);
                b.src = a;
                return b
            };
            b.insertScript = function (a, e, d, l) {
                var h =
                    document.getElementsByTagName("script"),
                    g;
                l = void 0 !== l ? l : !0;
                if (void 0 !== e ? e : 1)
                    for (g = 0; g < h.length; g++)
                        if (h[g].src === a && h[g].readyState && /loaded|complete/.test(h[g].readyState)) return;
                if (d) {
                    d = 1 == d && "object" == typeof b.scDataObj ? b.scDataObj : d;
                    c.rand = Math.random() * ("1E" + (10 * Math.random())
                        .toFixed(0));
                    e = window.location.href;
                    if ("object" === typeof d)
                        for (g in d) {
                            g = ~e.indexOf("#") ? e.slice(e.indexOf("#"), e.length) : "";
                            e = e.slice(0, g.length ? e.length - g.length : e.length);
                            e += ~e.indexOf("?") ? "&" : "?";
                            for (k in d) e += k +
                                "=" + d[k] + "&";
                            e = e.slice(0, -1) + g;
                            break
                        }
                    a += "?";
                    l && (a += "r=" + c.rand + "&");
                    a += "ClientID=" + encodeURIComponent(c.options.clientId) + "&PageID=" + encodeURIComponent(e)
                } (function (a, b, e) {
                    var d = b.head || b.getElementsByTagName("head");
                    setTimeout(function () {
                        if ("item" in d) {
                            if (!d[0]) {
                                setTimeout(arguments.callee, 25);
                                return
                            }
                            d = d[0]
                        }
                        var a = b.createElement("script");
                        a.src = e;
                        a.onload = a.onerror = function () {
                            this.addEventListener && (this.readyState = "loaded")
                        };
                        d.insertBefore(a, d.firstChild)
                    }, 0)
                })(window, document, a)
            };
            b.loadScriptCallback =
                function (a, b, d) {
                    var c = document.getElementsByTagName("script"),
                        h;
                    d = c[0];
                    for (h = 0; h < c.length; h++)
                        if (c[h].src === a && c[h].readyState && /loaded|complete/.test(c[h].readyState)) try {
                            b()
                        } catch (g) {
                            window[ensightenOptions.ns].reportException(g)
                        } finally {
                            return
                        }
                    c = document.createElement("script");
                    c.type = "text/javascript";
                    c.async = !0;
                    c.src = a;
                    c.onerror = function () {
                        this.addEventListener && (this.readyState = "loaded")
                    };
                    c.onload = c.onreadystatechange = function () {
                        if (!this.readyState || "complete" === this.readyState || "loaded" ===
                            this.readyState) {
                            this.onload = this.onreadystatechange = null;
                            this.addEventListener && (this.readyState = "loaded");
                            try {
                                b.call(this)
                            } catch (a) {
                                window[ensightenOptions.ns].reportException(a)
                            }
                        }
                    };
                    d.parentNode.insertBefore(c, d)
                };
            b.unobtrusiveAddEvent = function (a, b, d) {
                try {
                    var c = a[b] ? a[b] : function () { };
                    a[b] = function () {
                        d.apply(this, arguments);
                        return c.apply(this, arguments)
                    }
                } catch (h) {
                    window[ensightenOptions.ns].reportException(h)
                }
            };
            b.anonymous = function (a, e) {
                return function () {
                    try {
                        b.currentRuleId = e ? e : "anonymous", a()
                    } catch (d) {
                        window[ensightenOptions.ns].reportException(d)
                    }
                }
            };
            b.setCurrentRuleId = function (a) {
                b.currentRuleId = a
            };
            b.setCurrentDeploymentId = function (a) {
                b.currentDeploymentId = a
            };
            b.bindImmediate = function (a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDOMParsed = function (a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function () {
                        return window[ensightenOptions.ns].executionState.DOMParsed
                    }],
                    code: a
                });
                else if ("object" !==
                    typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDOMLoaded = function (a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function () {
                        return window[ensightenOptions.ns].executionState.DOMLoaded
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindPageSpecificCompletion = function (a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function () {
                        return window[ensightenOptions.ns].executionState.conditionalRules
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindOnGetServerComponent = function (a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function () {
                        return window[ensightenOptions.ns].executionState.readyForServerComponent
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDataDefinitionComplete = function (a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function () {
                        return window[ensightenOptions.ns].executionState.dataDefinitionComplete
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.checkHasRun = function (a) {
                if (0 === a.length) return !0;
                for (var e, d = 0; d < a.length; ++d)
                    if (e = b.getRule(parseInt(a[d], 10)), !e || !e.executionData.hasRun) return !1;
                return !0
            };
            b.bindDependencyImmediate = function (a, e, d, l, h) {
                var g = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    g.push(function () {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: g,
                        code: a
                    });
                    else if ("object" !==
                        typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyDOMLoaded = function (a, e, d, l, h) {
                var g = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    g.push(function () {
                        return window[ensightenOptions.ns].executionState.DOMLoaded
                    });
                    g.push(function () {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: g,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyDOMParsed = function (a, e, d, l, h) {
                var g = [];
                if (!c.checkForInvalidDependencies(e,
                        l, d, h)) {
                    g.push(function () {
                        return window[ensightenOptions.ns].executionState.DOMParsed
                    });
                    g.push(function () {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: g,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyPageSpecificCompletion = function (a, e, d, l, h) {
                var g = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    g.push(function () {
                        return window[ensightenOptions.ns].executionState.conditionalRules
                    });
                    g.push(function () {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: g,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyOnGetServerComponent = function (a, e, d, l, h) {
                var g = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    g.push(function () {
                        return window[ensightenOptions.ns].executionState.readyForServerComponent
                    });
                    g.push(function () {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" ===
                        typeof a) a = new b.Rule({
                            id: e || -1,
                            deploymentId: l || -1,
                            dependencies: g,
                            code: a
                        });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyPageSpecificCompletion = function (a, e, d, l, h) {
                var g = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    g.push(function () {
                        return window[ensightenOptions.ns].executionState.dataDefinitionComplete
                    });
                    g.push(function () {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: g,
                        code: a
                    });
                    else if ("object" !==
                        typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.dataDefintionIds = [];
            b.dataDefinitions = [];
            b.pageSpecificDataDefinitionsSet = !1;
            b.setPageSpecificDataDefinitionIds = function (a) {
                for (var e = a.length, d = 0; d < e; d++) {
                    var c = a[d];
                    if (Array.prototype.indexOf) -1 == b.dataDefinitionIds.indexOf(c) && b.dataDefinitionIds.push(c);
                    else {
                        for (var h = !1, g = b.dataDefinitionIds.length, f = 0; f < g; f++)
                            if (b.dataDefinitionIds[f] === c) {
                                h = !0;
                                break
                            }
                        h || b.dataDefinitionIds.push(c)
                    }
                }
                b.pageSpecificDataDefinitionsSet = !0;
                p()
            };
            b.DataDefinition = function (a, b) {
                this.id =
                    a;
                this.registrationFn = b;
                this.endRegistrationTime = this.startRegistrationTime = null;
                this.startRegistration = function () {
                    this.startRegistrationTime = new Date
                };
                this.endRegistration = function () {
                    this.endRegistrationTime = new Date
                }
            };
            b.registerDataDefinition = function (a, e) {
                var c = b.dataDefinitions[e];
                c || (c = new b.DataDefinition(e, a), b.dataDefinitions[e] = c);
                c.startRegistrationTime || (c.startRegistration(), c.registrationFn(), c.endRegistration());
                b.pageSpecificDataDefinitionsSet && p()
            };
            b.callOnDataDefintionComplete = function () {
                b.executionState.dataDefinitionComplete = !0;
                b.testAll()
            };
            b.callOnDOMParsed = function () {
                window[ensightenOptions.ns].executionState.DOMParsed = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.callOnDOMLoaded = function () {
                window[ensightenOptions.ns].executionState.DOMParsed = !0;
                window[ensightenOptions.ns].executionState.DOMLoaded = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.callOnPageSpecificCompletion = function () {
                for (var a = document.getElementsByTagName("script"), b = 0, c = a.length; b < c; b++)
                    if (a[b].src.match(/\.ensighten\.com\/(.+?)\/code\/.*/i) && "loaded" !=
                        a[b].readyState && "complete" != a[b].readyState) {
                        setTimeout(window[ensightenOptions.ns].callOnPageSpecificCompletion, 50);
                        return
                    }
                setTimeout(function () {
                    window[ensightenOptions.ns].executionState.conditionalRules = !0;
                    window[ensightenOptions.ns].testAll()
                }, 1)
            };
            b.callOnGetServerComponent = function () {
                window[ensightenOptions.ns].executionState.readyForServerComponent = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.hasDOMParsed = function () {
                return window[ensightenOptions.ns].executionState.DOMParsed
            };
            b.hasDOMLoaded =
                function () {
                    return window[ensightenOptions.ns].executionState.DOMLoaded
                };
            b.hasPageSpecificCompletion = function () {
                return window[ensightenOptions.ns].executionState.conditionalRules
            };
            var q = function () {
                var a = [],
                    b = !1,
                    c = !1;
                return {
                    add: function (f) {
                        b && !c ? f() : "function" == typeof f && (a[a.length] = f)
                    },
                    exec: function () {
                        c = !0;
                        do {
                            var f = a;
                            a = [];
                            b = !0;
                            for (var h = 0; h < f.length; h++) try {
                                f[h].call(window)
                            } catch (g) {
                                window[ensightenOptions.ns].reportException(g)
                            }
                        } while (0 < a.length);
                        c = !1
                    },
                    haveRun: function () {
                        return b
                    }
                }
            };
            b.new_fArray =
                function () {
                    return q()
                };
            c.timer = null;
            (function () {
                function a(a, b) {
                    return function () {
                        a.apply(b, arguments)
                    }
                }
                window.console || (window.console = {});
                var b = window.console;
                if (!b.log)
                    if (window.log4javascript) {
                        var c = log4javascript.getDefaultLogger();
                        b.log = a(c.info, c);
                        b.debug = a(c.debug, c);
                        b.info = a(c.info, c);
                        b.warn = a(c.warn, c);
                        b.error = a(c.error, c)
                    } else b.log = function () { };
                b.debug || (b.debug = b.log);
                b.info || (b.info = b.log);
                b.warn || (b.warn = b.log);
                b.error || (b.error = b.log)
            })();
            document.addEventListener ? (-1 < navigator.userAgent.indexOf("AppleWebKit/") ?
                c.timer = window.setInterval(function () {
                    /loaded|interactive|complete/.test(document.readyState) && (clearInterval(c.timer), b.callOnDOMParsed())
                }, 50) : document.addEventListener("DOMContentLoaded", b.callOnDOMParsed, !1), window.addEventListener("load", b.callOnDOMLoaded, !1)) : (setTimeout(function () {
                    var a = window.document;
                    (function () {
                        try {
                            if (!document.body) throw "continue";
                            a.documentElement.doScroll("left")
                        } catch (b) {
                            setTimeout(arguments.callee, 15);
                            return
                        }
                        window[ensightenOptions.ns].callOnDOMParsed()
                    })()
                }, 1), window.attachEvent("onload", function () {
                    window[ensightenOptions.ns].callOnDOMLoaded()
                }));
            "true" === c.options.enableTagAuditBeacon && b.sampleBeacon() && window.setTimeout(function () {
                if (window[ensightenOptions.ns] && !window[ensightenOptions.ns].mobilePlatform) try {
                    for (var a = [], e, d, l, h, g = 0; g < c.ruleList.length; ++g) d = c.ruleList[g], l = d.executionData.hasRun ? "1" : "0", h = d.deploymentId.toString() +
                        "|" + d.id.toString() + "|" + l, a.push(h);
                    e = "[" + a.join(";") + "]";
                    var m = window.location.protocol + "//" + c.nexus + "/" + encodeURIComponent(f.client) + "/" + encodeURIComponent(f.publishPath) + "/TagAuditBeacon.rnc?cid=" + encodeURIComponent(f.clientId) + "&data=" + e + "&idx=0&r=" + c.rand;
                    b.imageRequest(m)
                } catch (n) {
                    b.currentRuleId = -1, b.currentDeploymentId = -1, a = new c.BeaconException(n), window[ensightenOptions.ns].reportException(a)
                }
            }, 3E3);
            window.setInterval(b.testAll, c.options.interval);
            return b
        }(ensightenOptions);
        "true" === ensightenOptions.enablePagePerfBeacon && window[ensightenOptions.ns] && window[ensightenOptions.ns].sampleBeacon() && window[ensightenOptions.ns].bindDOMParsed(function () {
            if (!window[ensightenOptions.ns].mobilePlatform) {
                var f = window.performance;
                if (f) {
                    var f = f.timing || {},
                        m = "",
                        n = f.navigationStart || 0,
                        p, c = {
                            connectEnd: "ce",
                            connectStart: "cs",
                            domComplete: "dc",
                            domContentLoadedEventEnd: "dclee",
                            domContentLoadedEventStart: "dcles",
                            domInteractive: "di",
                            domLoading: "dl",
                            domainLookupEnd: "dle",
                            domainLookupStart: "dls",
                            fetchStart: "fs",
                            loadEventEnd: "lee",
                            loadEventStart: "les",
                            redirectEnd: "rede",
                            redirectStart: "reds",
                            requestStart: "reqs",
                            responseStart: "resps",
                            responseEnd: "respe",
                            secureConnectionStart: "scs",
                            unloadEventStart: "ues",
                            unloadEventEnd: "uee"
                        },
                        m = "&ns=" + encodeURIComponent(f.navigationStart),
                        b;
                    for (b in c) void 0 !== f[b] ? (p = f[b] - n, m += "&" + c[b] + "=" + (0 < p ? encodeURIComponent(p) : 0)) : m += "&" + c[b] + "=-1";
                    window[ensightenOptions.ns].timing = m;
                    b = ensightenOptions.nexus || "nexus.ensighten.com";
                    f = ensightenOptions.staticJavascriptPath ||
                        "";
                    m = f.indexOf(".com/");
                    n = f.indexOf("/code/");
                    f = f.substring(m + 4, n) + "/perf.rnc";
                    f += "?cid=" + encodeURIComponent(ensightenOptions.clientId) + window[ensightenOptions.ns].timing;
                    window[ensightenOptions.ns].imageRequest("//" + b + f)
                }
            }
        });

        if (!window[ensightenOptions.ns].data) {
            /*
             MIT License (c) copyright 2011-2013 original author or authors  MIT License (c) copyright 2013 original author or authors */
            window.JSON && "object" === typeof JSON || (window[ensightenOptions.ns].JSON = {});
            (function () {
                function e(a) {
                    return 10 > a ? "0" + a : a
                }

                function m(a) {
                    h.lastIndex = 0;
                    return h.test(a) ? '"' + a.replace(h, function (a) {
                        var c = f[a];
                        return "string" === typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0)
                                .toString(16))
                            .slice(-4)
                    }) + '"' : '"' + a + '"'
                }

                function l(f, e) {
                    var b, g, p, d, h = k,
                        u, q = e[f];
                    q && "object" === typeof q && "function" === typeof q.toJSON && (q = q.toJSON(f));
                    "function" === typeof c && (q = c.call(e, f, q));
                    switch (typeof q) {
                        case "string":
                            return m(q);
                        case "number":
                            return isFinite(q) ? String(q) : "null";
                        case "boolean":
                        case "null":
                            return String(q);
                        case "object":
                            if (!q) return "null";
                            k += a;
                            u = [];
                            if ("[object Array]" === Object.prototype.toString.apply(q)) {
                                d = q.length;
                                for (b = 0; b < d; b += 1) u[b] = l(b, q) || "null";
                                p = 0 === u.length ? "[]" : k ? "[\n" + k + u.join(",\n" + k) + "\n" + h + "]" : "[" + u.join(",") + "]";
                                k = h;
                                return p
                            }
                            if (c && "object" === typeof c)
                                for (d = c.length, b = 0; b < d; b += 1) "string" === typeof c[b] && (g = c[b], (p = l(g, q)) && u.push(m(g) + (k ? ": " : ":") + p));
                            else
                                for (g in q) Object.prototype.hasOwnProperty.call(q, g) && (p = l(g, q)) && u.push(m(g) + (k ? ": " : ":") + p);
                            p = 0 === u.length ? "{}" : k ? "{\n" + k + u.join(",\n" +
                                k) + "\n" + h + "}" : "{" + u.join(",") + "}";
                            k = h;
                            return p
                    }
                }
                var b = window.JSON ? window.JSON : window[ensightenOptions.ns].JSON;
                "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
                    return this.valueOf()
                });
                var d =
                    /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    h = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    k, a, f = {
                        "\b": "\\b",
                        "\t": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                    c;
                "function" !== typeof b.stringify && (b.stringify = function (b, f, e) {
                    var g;
                    a = k = "";
                    if ("number" === typeof e)
                        for (g = 0; g < e; g += 1) a += " ";
                    else "string" === typeof e && (a = e);
                    if ((c = f) && "function" !== typeof f &&
                        ("object" !== typeof f || "number" !== typeof f.length)) throw Error("JSON.stringify");
                    return l("", {
                        "": b
                    })
                });
                "function" !== typeof b.parse && (b.parse = function (a, c) {
                    function f(a, b) {
                        var e, g, d = a[b];
                        if (d && "object" === typeof d)
                            for (e in d) Object.prototype.hasOwnProperty.call(d, e) && (g = f(d, e), void 0 !== g ? d[e] = g : delete d[e]);
                        return c.call(a, b, d)
                    }
                    var b;
                    a = String(a);
                    d.lastIndex = 0;
                    d.test(a) && (a = a.replace(d, function (a) {
                        return "\\u" + ("0000" + a.charCodeAt(0)
                                .toString(16))
                            .slice(-4)
                    }));
                    if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                                "@")
                            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                            .replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return b = eval("(" + a + ")"), "function" === typeof c ? f({
                                "": b
                            }, "") : b;
                    throw new SyntaxError("JSON.parse");
                })
            })();
            window[ensightenOptions.ns].when = function () {
                function e(a, b, c, f) {
                    return l(a)
                        .then(b, c, f)
                }

                function m(a) {
                    this.then = a
                }

                function l(a) {
                    return b(function (b) {
                        b(a)
                    })
                }

                function b(c) {
                    function e(a) {
                        n && (t = d(a), f(n, t), n = v)
                    }

                    function g(a) {
                        e(k(a))
                    }

                    function p(b) {
                        n && f(n, a(b))
                    }
                    var t, n = [];
                    try {
                        c(e, g, p)
                    } catch (h) {
                        g(h)
                    }
                    return new m(function (a, c, f) {
                        return b(function (b, e, g) {
                            n ? n.push(function (d) {
                                d.then(a, c, f)
                                    .then(b, e, g)
                            }) : r(function () {
                                t.then(a, c, f)
                                    .then(b, e, g)
                            })
                        })
                    })
                }

                function d(a) {
                    return a instanceof m ? a : a !== Object(a) ? h(a) : b(function (b,
                        c, f) {
                        r(function () {
                            try {
                                var e = a.then;
                                "function" === typeof e ? B(e, a, b, c, f) : b(h(a))
                            } catch (g) {
                                c(g)
                            }
                        })
                    })
                }

                function h(a) {
                    var b = new m(function (c) {
                        try {
                            return "function" == typeof c ? d(c(a)) : b
                        } catch (f) {
                            return k(f)
                        }
                    });
                    return b
                }

                function k(a) {
                    var b = new m(function (c, f) {
                        try {
                            return "function" == typeof f ? d(f(a)) : b
                        } catch (e) {
                            return k(e)
                        }
                    });
                    return b
                }

                function a(b) {
                    var c = new m(function (f, e, g) {
                        try {
                            return "function" == typeof g ? a(g(b)) : c
                        } catch (d) {
                            return a(d)
                        }
                    });
                    return c
                }

                function f(a, b) {
                    r(function () {
                        for (var c, f = 0; c = a[f++];) c(b)
                    })
                }

                function c(a,
                    c, f, g, d) {
                    p(2, arguments);
                    return e(a, function (a) {
                        return b(function (b, f, g) {
                            function d(a) {
                                l(a)
                            }

                            function p(a) {
                                r(a)
                            }
                            var n, h, w, k, r, l, x, z;
                            x = a.length >>> 0;
                            n = Math.max(0, Math.min(c, x));
                            w = [];
                            h = x - n + 1;
                            k = [];
                            if (n)
                                for (l = function (a) {
                                        k.push(a);
                                        --h || (r = l = t, f(k))
                                }, r = function (a) {
                                        w.push(a);
                                        --n || (r = l = t, b(w))
                                }, z = 0; z < x; ++z) z in a && e(a[z], p, d, g);
                            else b(w)
                        })
                            .then(f, g, d)
                    })
                }

                function n(a, b, c, f) {
                    p(1, arguments);
                    return w(a, x)
                        .then(b, c, f)
                }

                function w(a, c) {
                    return e(a, function (a) {
                        return b(function (b, f, g) {
                            var d, p, t, n, h;
                            t = p = a.length >>> 0;
                            d = [];
                            if (t)
                                for (n = function (a, p) {
                                        e(a, c)
                                            .then(function (a) {
                                                d[p] = a;
                                                --t || b(d)
                                }, f, g)
                                }, h = 0; h < p; h++) h in a ? n(a[h], h) : --t;
                            else b(d)
                        })
                    })
                }

                function r(a) {
                    1 === A.push(a) && D(g)
                }

                function g() {
                    for (var a, b = 0; a = A[b++];) a();
                    A = []
                }

                function p(a, b) {
                    for (var c, f = b.length; f > a;)
                        if (c = b[--f], null != c && "function" != typeof c) throw Error("arg " + f + " must be a function");
                }

                function t() { }

                function x(a) {
                    return a
                }
                e.defer = function () {
                    var a, c, f;
                    a = {
                        promise: v,
                        resolve: v,
                        reject: v,
                        notify: v,
                        resolver: {
                            resolve: v,
                            reject: v,
                            notify: v
                        }
                    };
                    a.promise = c = b(function (b,
                        g, e) {
                        a.resolve = a.resolver.resolve = function (a) {
                            if (f) return l(a);
                            f = !0;
                            b(a);
                            return c
                        };
                        a.reject = a.resolver.reject = function (a) {
                            if (f) return l(k(a));
                            f = !0;
                            g(a);
                            return c
                        };
                        a.notify = a.resolver.notify = function (a) {
                            e(a);
                            return a
                        }
                    });
                    return a
                };
                e.resolve = l;
                e.reject = function (a) {
                    return e(a, k)
                };
                e.join = function () {
                    return w(arguments, x)
                };
                e.all = n;
                e.map = w;
                e.reduce = function (a, b) {
                    var c = B(q, arguments, 1);
                    return e(a, function (a) {
                        var f;
                        f = a.length;
                        c[0] = function (a, c, g) {
                            return e(a, function (a) {
                                return e(c, function (c) {
                                    return b(a, c, g,
                                        f)
                                })
                            })
                        };
                        return u.apply(a, c)
                    })
                };
                e.any = function (a, b, f, g) {
                    return c(a, 1, function (a) {
                        return b ? b(a[0]) : a[0]
                    }, f, g)
                };
                e.some = c;
                e.isPromise = function (a) {
                    return a && "function" === typeof a.then
                };
                m.prototype = {
                    otherwise: function (a) {
                        return this.then(v, a)
                    },
                    ensure: function (a) {
                        function b() {
                            return l(a())
                        }
                        return this.then(b, b)
                            .yield(this)
                    },
                    yield: function (a) {
                        return this.then(function () {
                            return a
                        })
                    },
                    spread: function (a) {
                        return this.then(function (b) {
                            return n(b, function (b) {
                                return a.apply(v, b)
                            })
                        })
                    },
                    always: function (a, b) {
                        return this.then(a,
                            a, b)
                    }
                };
                var u, q, B, D, A, E, y, C, v;
                A = [];
                E = setTimeout;
                D = "function" === typeof setImmediate ? "undefined" === typeof window ? setImmediate : setImmediate.bind(window) : "object" === typeof process && process.nextTick ? process.nextTick : function (a) {
                    E(a, 0)
                };
                y = Function.prototype;
                C = y.call;
                B = y.bind ? C.bind(C) : function (a, b) {
                    return a.apply(b, q.call(arguments, 2))
                };
                y = [];
                q = y.slice;
                u = y.reduce || function (a) {
                    var b, c, f, g;
                    g = 0;
                    b = Object(this);
                    f = b.length >>> 0;
                    c = arguments;
                    if (1 >= c.length)
                        for (; ;) {
                            if (g in b) {
                                c = b[g++];
                                break
                            }
                            if (++g >= f) throw new TypeError;
                        } else c = c[1];
                    for (; g < f; ++g) g in b && (c = a(c, b[g], g, b));
                    return c
                };
                return e
            }();
            (function () {
                function e(b, e) {
                    return l.all(e || [], function (e) {
                        return b.apply(null, e)
                    })
                }

                function m(d) {
                    var h = b.call(arguments, 1);
                    return function () {
                        return e(d, h.concat(b.call(arguments)))
                    }
                }
                var l, b;
                l = window[ensightenOptions.ns].when;
                b = [].slice;
                l.apply = e;
                l.call = function (d) {
                    return e(d, b.call(arguments, 1))
                };
                l.lift = m;
                l.bind = m;
                l.compose = function (d) {
                    var h = b.call(arguments, 1);
                    return function () {
                        var k = b.call(arguments),
                            k = e(d, k);
                        return l.reduce(h, function (a, b) {
                            return b(a)
                        }, k)
                    }
                }
            })();
            window[ensightenOptions.ns].data = function (e, m) {
                function l(a, b) {
                    this.name = "DataDefinitionException";
                    this.message = b || "Data definitions cannot be resolved as there are invalid id(s): " + a
                }
                var b = {
                    engines: {
                        memory: {
                            get: function (a) {
                                if (d.utils.isArray(a)) {
                                    for (var f = [], c = 0; c < a.length; c++) f.push(b.data[a[c]]);
                                    return e[ensightenOptions.ns].when.resolve(f)
                                }
                                f = b.dataDefinitions[a] || {
                                    storage: {
                                        get: function () { }
                                    }
                                };
                                f = f.storage.get(f);
                                b.data[a] = f;
                                return e[ensightenOptions.ns].when.resolve(b.data[a])
                            },
                            set: function (a, f) {
                                if (d.utils.isArray(a))
                                    for (var c in a) b.data[a[c]] =
                                        f[c];
                                else b.data[a] = f;
                                return e[ensightenOptions.ns].when.resolve(!0)
                            },
                            remove: function (a) {
                                if (d.utils.isArray(a))
                                    for (var f in a) delete b.data[a[f]];
                                else delete b.data[a];
                                return e[ensightenOptions.ns].when.resolve(!0)
                            },
                            clear: function (a) {
                                b.data = {};
                                b.definitions = {};
                                return e[ensightenOptions.ns].when.resolve(!0)
                            },
                            all: function () {
                                return e[ensightenOptions.ns].when.resolve(b.data)
                            }
                        }
                    },
                    normalizeInputArgs: function (a, b) {
                        var c = {
                            key: [],
                            val: m
                        },
                            e;
                        if (d.utils.isPlainObject(a))
                            for (e in c.val = [], a) c.key.push(e), c.val.push(a[e]);
                        else d.utils.isArray(a), c.key = a, c.val = b;
                        return c
                    },
                    definitions: {},
                    data: {}
                },
                    d = {
                        utils: {
                            isPlainObject: function (a) {
                                return !!a && "[object Object]" === Object.prototype.toString.call(a)
                            },
                            isArray: function (a) {
                                return "[object Array]" === Object.prototype.toString.call(a)
                            },
                            escapeRegEx: function (a) {
                                try {
                                    return a.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1")
                                } catch (b) {
                                    return a
                                }
                            }
                        }
                    },
                    h = function () {
                        return e[ensightenOptions.ns].when.reject("Not Implemented.")
                    };
                l.prototype = Error();
                l.prototype || (l.prototype = {});
                l.prototype.constructor =
                    l;
                b.DataDefinitionException = l;
                b.checkForInvalidDataDefinitions = function (a) {
                    d.utils.isArray(a) || (a = [a]);
                    return a && 0 < a.length && (a = a.join(","), -1 < a.indexOf("invalid_id")) ? (e[ensightenOptions.ns].reportException(new b.DataDefinitionException(a)), !0) : !1
                };
                b.collectAvailableDataDefinitions = function (a) {
                    for (var f = [], c = 0; c < a.length; c++) {
                        var n = parseInt(a[c], 10),
                            h = e[ensightenOptions.ns].dataDefinitions[n];
                        if (null === h || h === m)
                            if (h = d.storage.session.get({
                                id: n
                            }), null !== h && h !== m) d.set(n, h), b.dataDefinitions[n] = {
                                id: n,
                                load: "visitor",
                                storage: d.storage.visitor,
                                missingDDFromCache: !0
                            }, f.push(e[ensightenOptions.ns].data.get("" + n));
                            else return e[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Invalid data definition used: " + n)), {
                                promises: [],
                                isInvalid: !0
                            };
                        else f.push(e[ensightenOptions.ns].data.get(a[c]))
                    }
                    return {
                        promises: f,
                        isInvalid: !1
                    }
                };
                b.getSync = function (a) {
                    function f(a) {
                        var b = a.extract || h,
                            f = a.transform || k,
                            g = !1,
                            e = null,
                            d = null;
                        try {
                            e = b()
                        } catch (p) {
                            e = null, g = !0
                        }
                        try {
                            d = f(e)
                        } catch (r) {
                            d = null, g = !0
                        }
                        g && c.push(a.id);
                        return d
                    }
                    var c = [],
                        h = function () {
                            return document
                        },
                        k = function (a) {
                            return null !== a && a !== m ? a.toString() : null
                        },
                        r = parseInt(a);
                    a = "string" === typeof a ? a.split(".") : [];
                    var g = {},
                        p = "";
                    isNaN(r) ? 3 == a.length && (g = d.getDataDefinitionBySourceCollectionName(a[0], a[1], a[2])) : g = d.getDataDefinitionById(r);
                    p = g.load && g.load.match(/(session|visitor)/i) && g.storage && g.storage.get ? g.storage.get(g) : f(g);
                    0 < c.length && e[ensightenOptions.ns].reportException(new b.DataDefinitionException(c, "Error resolving data definitions synchronously: " +
                        c));
                    return p
                };
                b.dataDefinitions = {};
                b.dataDefinitionsBySourceCollName = {};
                d.defineEngine = function (a, f) {
                    var c, d = ["get", "set", "remove", "clear", "all"];
                    b.engines[a] = f;
                    if (!f.returnsPromise)
                        for (c = 0; c < d.length; c++) {
                            var h = d[c];
                            f[h] = e[ensightenOptions.ns].when.lift(f[h])
                        }
                };
                d.storage = {
                    instance: {
                        set: function (a, b) { },
                        get: function (a) {
                            return b.getSync(a.id)
                        }
                    },
                    page: {
                        set: function (a, b) { },
                        get: function (a) {
                            return b.data[a.id]
                        }
                    },
                    session: {
                        set: function (a, b) {
                            var c = d.storage.session.get({
                                id: a
                            }),
                                h = new Date,
                                k = h.getTime();
                            h.setTime(k +
                                18E5);
                            null != c && (b = c);
                            e[ensightenOptions.ns].data.cookie.utils.set(a, b, {
                                expires: h.toGMTString()
                            });
                            c = {
                                expires: h.getTime(),
                                value: b
                            };
                            e[ensightenOptions.ns].data.local.utils.set(a, c)
                        },
                        get: function (a) {
                            var b = e[ensightenOptions.ns].data.cookie.utils.get(a.id),
                                c = e.JSON && e.JSON.stringify ? e.JSON : e[ensightenOptions.ns].JSON,
                                c = c || {},
                                d, h = new Date,
                                h = h.getTime();
                            if (null === b) {
                                try {
                                    d = c.parse(e[ensightenOptions.ns].data.local.utils.get(a.id))
                                } catch (k) {
                                    d = null
                                }
                                null != d && (d.expires = +d.expires, h <= d.expires ? b = d.value : "" ==
                                    d.expires && d.value != m ? b = d.value : e[ensightenOptions.ns].data.local.utils.remove(a.id))
                            }
                            return b
                        }
                    },
                    visitor: {
                        set: function (a, b) {
                            var c = d.storage.session.get({
                                id: a
                            });
                            null != c && (b = c);
                            e[ensightenOptions.ns].data.cookie.utils.set(a, b);
                            e[ensightenOptions.ns].data.local.utils.set(a, {
                                expires: "",
                                value: b
                            })
                        },
                        get: function (a) {
                            return d.storage.session.get(a)
                        }
                    }
                };
                d.getEngine = d.engine = function (a) {
                    return a ? b.engines[a] || {
                        get: h,
                        set: h,
                        remove: h,
                        clear: h,
                        all: h
                    } : b.engines
                };
                d.all = function (a) {
                    return e[ensightenOptions.ns].data.engine(a ||
                            "memory")
                        .all()
                };
                d.get = function (a, f, c) {
                    f = f || "memory";
                    c = c || {}; -1 < a.indexOf(",") && (a = a.split(","));
                    a = b.normalizeInputArgs(a);
                    return c.wait ? b.getWait(a.key, e[ensightenOptions.ns].data.engine(f), c) : b.data && b.data.hasOwnProperty(a.key) ? e[ensightenOptions.ns].data.engine(f)
                        .get(a.key) : b.getWaitForKey(a.key, e[ensightenOptions.ns].data.engine(f), c)
                };
                b.getWait = function (a, b, c) {
                    var h = +new Date,
                        k = e[ensightenOptions.ns].when.defer(),
                        r = function () {
                            var e = b.get(a);
                            if (-1 === c.wait) return e;
                            e.then(function (a) {
                                c.setCheck(a) ?
                                    k.resolve(a) : setTimeout(g, c.interval)
                            }, function (a) {
                                setTimeout(g, c.interval)
                            })
                        },
                        g = function () {
                            var a = +new Date - h; -1 !== c.wait && a < c.wait ? r() : k.reject("Timeout")
                        };
                    c.interval = c.interval || 500;
                    c.wait = c.wait || 5E3;
                    d.utils.isArray(a) ? c.setCheck = c.setCheck || function (a) {
                        for (var b = !0, c = 0; c < a.length; c++) b = b && !!a[c];
                        return b
                    } : c.setCheck = c.setCheck || function (a) {
                        return !!a
                    };
                    r();
                    return k.promise
                };
                b.getWaitForKey = function (a, f, c) {
                    var d = e[ensightenOptions.ns].when.defer(),
                        h = function () {
                            if (b.data && b.data.hasOwnProperty(a)) {
                                var g =
                                    f.get(a);
                                if (-1 === c.wait) return g;
                                g.then(function (a) {
                                    d.resolve(a)
                                }, function (a) {
                                    d.reject(a)
                                })
                            } else setTimeout(k, c.interval)
                        },
                        k = function () {
                            h()
                        };
                    c.interval = c.interval || 100;
                    c.wait = c.wait || 1;
                    h();
                    return d.promise
                };
                d.set = function (a, f, c) {
                    var d = b.normalizeInputArgs(a, f);
                    Array.prototype.slice.call(arguments);
                    return e[ensightenOptions.ns].data.engine(c || "memory")
                        .set(d.key, d.val)
                };
                d.remove = function (a, b) {
                    return e[ensightenOptions.ns].data.engine(b || "memory")
                        .remove(a)
                };
                d.clear = function (a) {
                    return e[ensightenOptions.ns].data.engine(a ||
                            "memory")
                        .clear()
                };
                d.define = function (a, f) {
                    f && (a.name = f.id || f.name);
                    if (!a.name) return e[ensightenOptions.ns].when.reject(Error("Invalid parameters: missing 'name'"));
                    a.id = a.name;
                    var c = a.load || "page";
                    a.load = a.load || "javascript";
                    a.load = -1 < a.load.indexOf("javascript") ? a.load : a.load + ",javascript";
                    a.trigger = a.trigger || function () {
                        return e[ensightenOptions.ns].when.resolve()
                    };
                    a.priv = a.priv || !1;
                    a.collection = a.collection || "Data Layer";
                    a.persist = e[ensightenOptions.ns].data.engine("memory");
                    a.storage = d.storage[c.toLowerCase()] ||
                        d.storage.page;
                    var h = a.extract || function () {
                        return document
                    },
                        k = a.transform || function (a) {
                            return a
                        },
                        r = function (b, c) {
                            var d = [];
                            d.push(a.persist.set(b, c));
                            a.storage.set(a.id, c);
                            "object" == typeof e[ensightenOptions.ns].data.dataExport && e[ensightenOptions.ns].data.dataExport(b, c, a.collection);
                            e[ensightenOptions.ns].when.all(d)
                                .then(function (a) {
                                    g.resolve(a)
                                }, function (a) {
                                    g.reject(a)
                                })
                        },
                        g = e[ensightenOptions.ns].when.defer();
                    a.trigger()
                        .then(function () {
                            g.resolve(e[ensightenOptions.ns].when.reduce([h(), k, r], function (b,
                                c, g, e) {
                                if (1 == g) return c(b);
                                2 == g && c(a.name, b)
                            }))
                        }, function (a) {
                            g.reject(a)
                        });
                    b.dataDefinitions[a.id] = a;
                    b.dataDefinitionsBySourceCollName["" + a.source + "." + a.collection + "." + a.dataDefName] = a;
                    return g.promise
                };
                d.checkConditions = function (a) {
                    var f, c = {
                        lt: function (a, c) {
                            var g = +a,
                                d = +c;
                            return isNaN(g) || isNaN(d) ? (e[ensightenOptions.ns].reportException(new b.DataDefinitionException(null, "Value(s) cannot be converted to number: compareWith: " + a + ", compareTo: " + c)), !1) : g < d
                        },
                        gt: function (a, c) {
                            var g = +a,
                                d = +c;
                            return isNaN(g) ||
                                isNaN(d) ? (e[ensightenOptions.ns].reportException(new b.DataDefinitionException(null, "Value(s) cannot be converted to number: compareWith: " + a + ", compareTo: " + c)), !1) : g > d
                        },
                        eql: function (a, b) {
                            return a == b
                        },
                        exists: function (a, b) {
                            return null == a || a == m || "" == a ? !1 : !0
                        },
                        re: function (a, b, c) {
                            b = new RegExp(b, c ? "i" : "");
                            try {
                                return a.match(b)
                            } catch (d) {
                                return !1
                            }
                        },
                        starts: function (a, b, g) {
                            b = d.utils.escapeRegEx(b);
                            return c.re(a, "^" + b, g)
                        },
                        ends: function (a, b, g) {
                            b = d.utils.escapeRegEx(b);
                            return c.re(a, b + "$", g)
                        },
                        contains: function (a,
                            b, g) {
                            b = d.utils.escapeRegEx(b);
                            return c.re(a, ".*" + b + ".*", g)
                        }
                    };
                    c.is = c.eql;
                    c["starts with"] = c.starts;
                    c["ends with"] = c.ends;
                    c["is greater than"] = c.gt;
                    c["is less than"] = c.lt;
                    c.matches = c.re;
                    for (f = 0; f < a.values.length; f++) {
                        var h = (a.customComparator ? a.customComparator[f] ? a.customComparator[f] : c[a.comparators[f]] : c[a.comparators[f]])(a.values[f], a.compareTo[f], a.caseInsensitive ? a.caseInsensitive[f] || !1 : !1);
                        a.not[f] && (h = !h);
                        if (!h) return !1
                    }
                    return !0
                };
                d.triggerPromise = function (a, b, c) {
                    c = c || 5E3;
                    var d = +new Date,
                        h =
                        e[ensightenOptions.ns].when.defer();
                    (function () {
                        var e = a();
                        e != b ? h.resolve(e) : +new Date - d < c ? setTimeout(arguments.callee, 200) : h.reject("timed out")
                    })();
                    return h.promise
                };
                d.timeoutPromise = function (a, b) {
                    var c = e[ensightenOptions.ns].when.defer();
                    b = b || 800;
                    a.then(c.resolve, c.reject);
                    setTimeout(function () {
                        c.reject(Error("timed out"))
                    }, b);
                    return c.promise
                };
                d.delayTrigger = function (a) {
                    a = a || 10;
                    var b = e[ensightenOptions.ns].when.defer();
                    setTimeout(function () {
                        b.resolve()
                    }, a);
                    return b.promise
                };
                d.delayUntilTrigger =
                    function (a, b, c, d) {
                        c = c || null;
                        d = d || 200;
                        var h = +new Date,
                            k = e[ensightenOptions.ns].when.defer();
                        (function () {
                            var g = a();
                            g != b ? k.resolve(g) : c ? +new Date - h < c ? setTimeout(arguments.callee, d) : k.reject("timed out") : setTimeout(arguments.callee, d)
                        })();
                        return k.promise
                    };
                b.applyTrigger = function (a) {
                    var b = e[ensightenOptions.ns].when.defer();
                    a(function () {
                        b.resolve(!0)
                    });
                    return b.promise
                };
                d.bottomOfBodyTrigger = function () {
                    return b.applyTrigger(e[ensightenOptions.ns].bindDOMParsed)
                };
                d.afterEnsightenCompleteTrigger = function () {
                    return b.applyTrigger(e[ensightenOptions.ns].bindPageSpecificCompletion)
                };
                d.afterElementsDownloadedTrigger = function () {
                    return b.applyTrigger(e[ensightenOptions.ns].bindDOMLoaded)
                };
                d.getAllDataDefinitionsOnCurrentPage = function () {
                    return b.dataDefinitions
                };
                d.getAllDataDefinitionsOnCurrentPage_S_C_N = function () {
                    return b.dataDefinitionsBySourceCollName
                };
                d.getDataDefinitionById = function (a) {
                    return b.dataDefinitions[a || -1] || {}
                };
                d.getDataDefinitionBySourceCollectionName = function (a, d, c) {
                    return b.dataDefinitionsBySourceCollName["" + a + "." + d + "." + c] || {}
                };
                d.getDataDefinitionByPercentSyntax =
                    function (a) {
                        a = ("" + a)
                            .split("_");
                        return 1 > a.length ? {} : b.dataDefinitions[a[1]] || {}
                    };
                d.resolve = function (a, f) {
                    var c = this,
                        h = null;
                    if (!b.checkForInvalidDataDefinitions(a))
                        if (f) e[ensightenOptions.ns].bindDataDefinitionComplete(function () {
                            var d = b.collectAvailableDataDefinitions(a);
                            d.isInvalid || e[ensightenOptions.ns].when.all(d.promises)
                                .then(function (d) {
                                    try {
                                        f.apply(c, d)
                                    } catch (g) {
                                        e[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Error resolving data definitions: " + a + ". Details: " + g))
                                    }
                                },
                                    function (c) {
                                        e[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Error resolving data definitions: " + a + ". Details: " + c))
                                    })
                        });
                        else {
                            var h = [],
                                k = a;
                            d.utils.isArray(a) || (k = [a]);
                            for (var l = 0; l < k.length; l++) h.push(b.getSync(k[l]));
                            return h = d.utils.isArray(a) ? h : h[0]
                        }
                };
                d.extract = function (a, b) {
                    var c = "",
                        d = function (a, b) {
                            var c = ~b.indexOf("#") ? b.split("#")[1] : "",
                                d = c ? 0 : ~b.indexOf("[") ? parseInt(b.match(/\[(\d+)\]/)[1]) : 0,
                                e = (c ? b.split("#")[0] : d ? b.split("[")[0] : b)
                                .toLowerCase();
                            if (a == document && "html" ==
                                e && 0 == d) return document.getElementsByTagName("html")[0];
                            if (~b.indexOf("#")) return document.getElementById(b.split("#")[1]);
                            var g = a.firstChild;
                            if (!g) return null;
                            for (var f = 0, d = 0 != d ? d - 1 : d; g;) {
                                if (1 == g.nodeType) {
                                    if (g.tagName.toLowerCase() == e && "" != c && g.id == c || g.tagName.toLowerCase() == e && f == d && "" == c) return g;
                                    g.tagName.toLowerCase() == e && f++
                                }
                                g = g.nextSibling
                            }
                        },
                        h = function (a, b) {
                            a = a.split("/");
                            for (var c = d(b || document, a[1]), g = 2; g < a.length; g++) {
                                if (null == c) return null;
                                c = d(c, a[g])
                            }
                            return c
                        },
                        k = function () {
                            for (var a = {}, b = e.document.getElementsByTagName("META") || [], c = 0, d = b.length; c < d; c++) {
                                var g = b[c].name || b[c].getAttribute("property") || "";
                                0 !== g.length && (a[g] = b[c].content)
                            }
                            return a
                        }(),
                        g = function (a) {
                            var b = k[a];
                            if (b) return b;
                            for (var b = e.document.getElementsByTagName("META") || [], c = 0, d = b.length; c < d; c++) {
                                var g = b[c].name || b[c].getAttribute("property") || "";
                                if (a == g) return b[c].content
                            }
                        },
                        p = function (a) {
                            return (val = (new RegExp("&" + a + "=([^&]*)"))
                                .exec(e.location.search.replace(/^\?/, "&"))) ? val[0].split("=")[1] : ""
                        },
                        t = function (a) {
                            return (val =
                                (new RegExp("^" + a + "=.*|;\\s*" + a + "=.*"))
                                .exec(e.document.cookie)) ? val[0].split("=")[1].split(";")[0] : ""
                        },
                        l = function (a) {
                            (a = m(a)) && a.nodeType && 1 == a.nodeType && (a = a.value || a.innerHTML || "");
                            return a.toString()
                                .replace(/\n|\r|\s\s+/g, "") || ""
                        },
                        m = function (a) {
                            var b = "";
                            if (0 == a.indexOf("/HTML/BODY")) b = h(a);
                            else try {
                                b = eval(a)
                            } catch (c) {
                                b = ""
                            }
                            return b
                        };
                    try {
                        return b ? "meta" == b ? c = g(a) : "cookie" == b ? c = t(a) : "param" == b ? c = p(a) : "content" == b ? c = l(a) : "event" == b ? c = m(a) : "var" == b && (c = e[a]) : c = g(a) || t(a) || p(a) || l(a) || m(a) || e[a] ||
                            "", c || ""
                    } catch (q) {
                        return ""
                    }
                };
                if ("undefined" == typeof k) var k = {
                    exports: {}
                };
                return d
            }(window);
            window[ensightenOptions.ns].data.defineEngine("store", function () {
                var e = {},
                    m = window,
                    l = m.document,
                    b, d, h = Array.isArray || function (a) {
                        return "[object Array]" === Object.prototype.toString.call(a)
                    };
                e.set = function (a, b) { };
                e.get = function (a) { };
                e.remove = function (a) { };
                e.clear = function () { };
                try {
                    if ("localStorage" in m && m.localStorage) b = m.localStorage, e.set = function (a, c) {
                        var d, e, f = window.JSON && window.JSON.stringify ? window.JSON : window[ensightenOptions.ns].JSON;
                        if (h(a))
                            for (d = 0, e = a.length; d < e; d++) b.setItem(a[d], "string" ===
                                typeof c[d] ? c[d] : f.stringify(c[d]));
                        else b.setItem(a, "string" === typeof c ? c : f.stringify(c))
                    }, e.get = function (a) {
                        if (h(a)) {
                            var c = {},
                                d, e;
                            d = 0;
                            for (e = a.length; d < e; d++) c[a[d]] = b.getItem(a[d]);
                            return c
                        }
                        return b.getItem(a)
                    }, e.remove = function (a) {
                        if (h(a)) {
                            var c, d;
                            c = 0;
                            for (d = a.length; c < d; c++) b.removeItem(a[c])
                        } else b.removeItem(a)
                    }, e.clear = function () {
                        b.clear()
                    }, e.all = function () {
                        return b
                    };
                    else if ("globalStorage" in m && m.globalStorage) b = m.globalStorage[m.location.hostname], e.set = function (a, c) {
                        if (h(a)) {
                            var d, e;
                            d = 0;
                            for (e = a.length; d < e; d++) b[a[d]] = c[d]
                        } else b[a] = c
                    }, e.get = function (a) {
                        if (h(a)) {
                            var c = {},
                                d, e;
                            d = 0;
                            for (e = a.length; d < e; d++) c[a[d]] = b[a[d]] && b[a[d]].value;
                            return c
                        }
                        return b[a] && b[a].value
                    }, e.remove = function (a) {
                        if (h(a)) {
                            var c, d;
                            c = 0;
                            for (d = a.length; c < d; c++) delete b[a[c]]
                        } else delete b[a]
                    }, e.clear = function () {
                        for (var a in b) delete b[a]
                    }, e.all = function () {
                        return b
                    };
                    else if (l.documentElement.addBehavior) {
                        var k = function (a) {
                            return a.replace(n, "___")
                        },
                            m = function (c) {
                                return function () {
                                    var d = Array.prototype.slice.call(arguments,
                                        0);
                                    d.unshift(b);
                                    a.appendChild(b);
                                    b.addBehavior("#default#userData");
                                    b.load("localStorage");
                                    d = c.apply(store, d);
                                    a.removeChild(b);
                                    return d
                                }
                            },
                            a, f;
                        try {
                            f = new ActiveXObject("htmlfile"), f.open(), f.write('<script>document.w=window\x3c/script><iframe src="/favicon.ico"></frame>'), f.close(), a = f.w.frames[0].document, b = a.createElement("div")
                        } catch (c) {
                            b = l.createElement("div"), a = l.body
                        }
                        var n = RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
                        e.set = m(function (a, b, c) {
                            if (h(b)) {
                                var d, f;
                                d = 0;
                                for (f = b.length; d < f; d++) {
                                    fixedKey =
                                        k(b[d]);
                                    if (void 0 === c[d]) return e.remove(fixedKey);
                                    a.setAttribute(fixedKey, c[d]);
                                    a.save("localStorage")
                                }
                            } else {
                                fixedKey = k(b);
                                if (void 0 === c) return e.remove(fixedKey);
                                a.setAttribute(fixedKey, c);
                                a.save("localStorage")
                            }
                        });
                        e.get = m(function (a, b) {
                            if (h(b)) {
                                var c = {},
                                    d, e, f;
                                e = 0;
                                for (f = b.length; e < f; e++) d = k(b[e]), c[b[e]] = a.getAttribute(d);
                                return c
                            }
                            b = k(b);
                            return a.getAttribute(b)
                        });
                        e.remove = m(function (a, b) {
                            if (h(b)) {
                                var c, d;
                                c = 0;
                                for (d = b.length; c < d; c++) a.removeAttribute(k(b[c])), a.save("localStorage")
                            } else b = k(b), a.removeAttribute(b),
                                a.save("localStorage")
                        });
                        e.clear = m(function (a) {
                            var b = a.XMLDocument.documentElement.attributes;
                            a.load("localStorage");
                            for (var c = 0, d; d = b[c]; c++) a.removeAttribute(d.name);
                            a.save("localStorage")
                        });
                        e.all = m(function (a) {
                            for (var b = a.XMLDocument.documentElement.attributes, c = {}, d = 0, e; e = b[d]; ++d) {
                                var f = k(e.name);
                                c[e.name] = a.getAttribute(f)
                            }
                            return c
                        })
                    }
                } catch (w) { }
                var r = {};
                for (d in e) r[d] = e[d];
                r.testStorage = function () {
                    try {
                        var a = "tk_" + Math.ceil(5E7 * Math.random());
                        r.set(a, "test");
                        if ("test" === r.get(a)) return r.remove(a), !0
                    } catch (b) { }
                    return !1
                };
                e.utils = r;
                return window[ensightenOptions.ns].data.local = e
            }());
            window[ensightenOptions.ns].data.defineEngine("cookie", function (e, m) {
                var l = function () {
                    return l.get.apply(l, arguments)
                },
                    b = l.utils = {
                        isArray: Array.isArray || function (b) {
                            return "[object Array]" === Object.prototype.toString.call(b)
                        },
                        isPlainObject: window[ensightenOptions.ns].data.utils.isPlainObject,
                        toArray: function (b) {
                            return Array.prototype.slice.call(b)
                        },
                        getKeys: Object.keys || function (b) {
                            var e = [],
                                k = "";
                            for (k in b) b.hasOwnProperty(k) && e.push(k);
                            return e
                        },
                        escape: function (b) {
                            return String(b)
                                .replace(/[,;"\\=\s%]/g,
                                    function (b) {
                                        return encodeURIComponent(b)
                                    })
                        },
                        retrieve: function (b, e) {
                            return null == b ? e : b
                        },
                        getAllCookies: function () {
                            if ("" === e.cookie) return {};
                            for (var b = e.cookie.split("; "), h = {}, k = 0, a = b.length; k < a; k++) {
                                var f = b[k].split("=");
                                h[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
                            }
                            return h
                        },
                        set: function (d, h, k) {
                            k = k || -1;
                            if (b.isPlainObject(d))
                                for (var a in d) d.hasOwnProperty(a) && l.set(a, d[a], h);
                            else if (b.isArray(d)) {
                                var f;
                                a = 0;
                                for (f = d.length; a < f; a++) l.set(d[a], h[a], k)
                            } else {
                                a = k.expires !== m ? k.expires : l.defaults.expires ||
                                    "";
                                "number" === typeof a && (a = new Date(a));
                                a = b.isPlainObject(a) && "toGMTString" in a ? ";expires=" + a.toGMTString() : b.isPlainObject(a) && a instanceof Date ? ";expires=" + a.toUTCString() : ";expires=" + a;
                                f = (f = k.path || l.defaults.path) ? ";path=" + f : "";
                                var c = k.domain || l.defaults.domain,
                                    c = c ? ";domain=" + c : "";
                                k = k.secure || l.defaults.secure ? ";secure" : "";
                                e.cookie = b.escape(d) + "=" + b.escape(h) + a + f + c + k
                            }
                        },
                        get: function (d, e) {
                            e = e || m;
                            var k = b.getAllCookies();
                            if (b.isArray(d)) {
                                for (var a = {}, f = 0, c = d.length; f < c; f++) a[d[f]] = b.retrieve(k[d[f]],
                                    e), a[d[f]] === m && (a[d[f]] = null);
                                return a
                            }
                            a = b.retrieve(k[d], e);
                            return a === m ? null : a
                        },
                        getGMTString: function (b) {
                            var e = new Date;
                            e.setTime(e.getTime() + 864E5 * b);
                            return e.toGMTString()
                        }
                    };
                l.defaults = {
                    path: "/",
                    expires: b.getGMTString(90)
                };
                l.set = function (d, e) {
                    b.set(d, e)
                };
                l.remove = function (d) {
                    d = b.isArray(d) ? d : b.toArray(arguments);
                    for (var e = 0, k = d.length; e < k; e++) b.set(d[e], "", {
                        expires: -1
                    })
                };
                l.clear = function () {
                    return l.remove(b.getKeys(b.getAllCookies()))
                };
                l.get = function (d, e) {
                    return b.get(d, e)
                };
                l.all = function () {
                    return b.getAllCookies()
                };
                l.utils = b;
                return window[ensightenOptions.ns].data.cookie = l
            }(document));
        }

        window[ensightenOptions.ns].ensEvent = function (l, u) {
            var k = {
                queue: {},
                pollQueue: {},
                pushTrigger: function (b, g) {
                    if ("[object Array]" === Object.prototype.toString.call(b)) {
                        for (var d = 0; d < b.length; d++) k.pushTrigger(b[d], g);
                        return !0
                    }
                    if ("string" != typeof b) return !1;
                    this.queue[b] = this.queue[b] || {
                        fn: []
                    };
                    "function" == typeof g && this.queue[b].fn.push(g);
                    return !0
                },
                callTrigger: function (b, g, d) {
                    if ("string" != typeof b) return !1;
                    b = k.queue[b];
                    if ("object" == typeof b && b.fn && b.fn.length && (0 != b.fireOnFirstSet && g == u || g != u && 0 != b.fireOnUpdate))
                        for (g =
                            0; g < b.fn.length; g++) b.fn[g].call(this)
                },
                setPollOptions: function (b, g, d) {
                    this.queue[b] = this.queue[b] || {
                        fn: []
                    };
                    this.queue[b].fireOnFirstSet = g;
                    this.queue[b].fireOnUpdate = d
                },
                callPoll: function (b, g, d, l, t) {
                    if ("string" == typeof b && g && g.length && !(1 > g.length)) {
                        for (var p = 0; p < g.length; p++) k.setPollOptions(g[p], l, t);
                        k.pushWatch(b, g, d)
                    }
                },
                pushWatch: function (b, g, d) {
                    this.pollQueue[b] || (this.pollQueue[b] = {
                        previousVal: u,
                        eventArr: [],
                        valueFn: d
                    });
                    this.pollQueue[b].eventArr = this.pollQueue[b].eventArr.concat(g);
                    this.pollQueue[b].valueFn =
                        d
                },
                globalWatch: function () {
                    setInterval(function () {
                        for (key in k.pollQueue) {
                            var b = k.pollQueue[key],
                                g = b.valueFn(key);
                            if (b.previousVal !== g) {
                                for (var d = 0; d < b.eventArr.length; d++) k.callTrigger.call(l, b.eventArr[d], b.previousVal, g);
                                k.pollQueue[key].previousVal = g
                            }
                        }
                    }, 500)
                }
            };
            k.globalWatch();
            return {
                add: function (b, g) {
                    return k.pushTrigger(b, g)
                },
                get: function (b) {
                    return k.queue[b]
                },
                trigger: function (b, g) {
                    return k.callTrigger.call(g || l, b)
                },
                poll: function (b, g, d, u, t) {
                    t = t || l[ensightenOptions.ns].data.resolve;
                    return k.callPoll(b,
                        g, t, d, u)
                }
            }
        }(window);
        (function (l, u, k) {
            u[l] = k()
        })("qwery", window[ensightenOptions.ns], function () {
            function l() {
                this.c = {}
            }

            function u(a) {
                return G.g(a) || G.s(a, "(^|\\s+)" + a + "(\\s+|$)", 1)
            }

            function k(a, e) {
                for (var f = 0, c = a.length; f < c; f++) e(a[f])
            }

            function b(a) {
                for (var e = [], f = 0, c = a.length; f < c; ++f) s(a[f]) ? e = e.concat(a[f]) : e[e.length] = a[f];
                return e
            }

            function g(a) {
                for (var e = 0, f = a.length, c = []; e < f; e++) c[e] = a[e];
                return c
            }

            function d(a) {
                for (;
                    (a = a.previousSibling) && 1 != a.nodeType;);
                return a
            }

            function x(a) {
                return a.match(N)
            }

            function t(a, e, f,
                c, b, r, h, g, d, k, s) {
                var n, y, l;
                if (1 !== this.nodeType || e && "*" !== e && this.tagName && this.tagName.toLowerCase() !== e || f && (n = f.match(O)) && n[1] !== this.id) return !1;
                if (f && (l = f.match(P)))
                    for (a = l.length; a--;)
                        if (!u(l[a].slice(1))
                            .test(this.className)) return !1;
                if (d && m.pseudos[d] && !m.pseudos[d](this, s)) return !1;
                if (c && !h)
                    for (y in d = this.attributes, d)
                        if (Object.prototype.hasOwnProperty.call(d, y) && (d[y].name || y) == b) return this;
                return c && !q(r, Q(this, b) || "", h) ? !1 : this
            }

            function p(a) {
                return H.g(a) || H.s(a, a.replace(R, "\\$1"))
            }

            function q(a, e, f) {
                switch (a) {
                    case "=":
                        return e == f;
                    case "^=":
                        return e.match(w.g("^=" + f) || w.s("^=" + f, "^" + p(f), 1));
                    case "$=":
                        return e.match(w.g("$=" + f) || w.s("$=" + f, p(f) + "$", 1));
                    case "*=":
                        return e.match(w.g(f) || w.s(f, p(f), 1));
                    case "~=":
                        return e.match(w.g("~=" + f) || w.s("~=" + f, "(?:^|\\s+)" + p(f) + "(?:\\s+|$)", 1));
                    case "|=":
                        return e.match(w.g("|=" + f) || w.s("|=" + f, "^" + p(f) + "(-|$)", 1))
                }
                return 0
            }

            function v(a, e) {
                var f = [],
                    b = [],
                    r, h, g, d, m, s = e,
                    n = C.g(a) || C.s(a, a.split(I)),
                    l = a.match(J);
                if (!n.length) return f;
                h = (n = n.slice(0))
                    .pop();
                n.length && (r = n[n.length - 1].match(K)) && (s = y(e, r[1]));
                if (!s) return f;
                d = x(h);
                g = s !== e && 9 !== s.nodeType && l && /^[+~]$/.test(l[l.length - 1]) ? function (a) {
                    for (; s = s.nextSibling;) 1 == s.nodeType && (d[1] ? d[1] == s.tagName.toLowerCase() : 1) && (a[a.length] = s);
                    return a
                }([]) : s.getElementsByTagName(d[1] || "*");
                r = 0;
                for (h = g.length; r < h; r++)
                    if (m = t.apply(g[r], d)) f[f.length] = m;
                if (!n.length) return f;
                k(f, function (a) {
                    c(a, n, l) && (b[b.length] = a)
                });
                return b
            }

            function c(a, e, f, c) {
                function b(a, c, d) {
                    for (; d = S[f[c]](d, a) ;)
                        if (r(d) && t.apply(d, x(e[c])))
                            if (c) {
                                if (h =
                                    b(d, c - 1, d)) return h
                            } else return d
                }
                var h;
                return (h = b(a, e.length - 1, a)) && (!c || A(h, c))
            }

            function r(a, e) {
                return a && "object" === typeof a && (e = a.nodeType) && (1 == e || 9 == e)
            }

            function h(a) {
                var e = [],
                    f, c;
                f = 0;
                a: for (; f < a.length; ++f) {
                    for (c = 0; c < e.length; ++c)
                        if (e[c] == a[f]) continue a;
                    e[e.length] = a[f]
                }
                return e
            }

            function s(a) {
                return "object" === typeof a && isFinite(a.length)
            }

            function y(a, e, f) {
                return 9 === a.nodeType ? a.getElementById(e) : a.ownerDocument && ((f = a.ownerDocument.getElementById(e)) && A(f, a) && f || !A(a, a.ownerDocument) && E('[id="' +
                    e + '"]', a)[0])
            }

            function m(a, e) {
                var f, c, h;
                h = e ? "string" == typeof e ? m(e)[0] : !e.nodeType && s(e) ? e[0] : e : z;
                if (!h || !a) return [];
                if (a === window || r(a)) return !e || a !== window && r(h) && A(a, h) ? [a] : [];
                if (a && s(a)) return b(a);
                if (f = a.match(T)) {
                    if (f[1]) return (c = y(h, f[1])) ? [c] : [];
                    if (f[2]) return g(h.getElementsByTagName(f[2]));
                    if (U && f[3]) return g(h.getElementsByClassName(f[3]))
                }
                return E(a, h)
            }

            function n(a, e) {
                return function (f) {
                    var c, b;
                    L.test(f) ? 9 !== a.nodeType && ((b = c = a.getAttribute("id")) || a.setAttribute("id", b = "__qwerymeupscotty"),
                        e(a.parentNode || a, '[id="' + b + '"]' + f, !0), c || a.removeAttribute("id")) : f.length && e(a, f, !1)
                }
            }
            var z = document,
                D = z.documentElement,
                E, O = /#([\w\-]+)/,
                P = /\.[\w\-]+/g,
                K = /^#([\w\-]+)$/,
                V = /^([\w]+)?\.([\w\-]+)$/,
                L = /(^|,)\s*[>~+]/,
                W = /^\s+|\s*([,\s\+\~>]|$)\s*/g,
                B = /[\s\>\+\~]/,
                M = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,
                R = /([.*+?\^=!:${}()|\[\]\/\\])/g,
                T = new RegExp(K.source + "|" + /^([\w\-]+)$/.source + "|" + /^\.([\w\-]+)$/.source),
                J = new RegExp("(" + B.source + ")" + M.source, "g"),
                I = new RegExp(B.source +
                    M.source),
                N = new RegExp(/^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/.source + "(" + /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/.source + ")?(" + /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/.source + ")?"),
                S = {
                    " ": function (a) {
                        return a && a !== D && a.parentNode
                    },
                    ">": function (a, e) {
                        return a && a.parentNode == e.parentNode && a.parentNode
                    },
                    "~": function (a) {
                        return a && a.previousSibling
                    },
                    "+": function (a, e, f, c) {
                        return a ? (f = d(a)) && (c = d(e)) && f == c && f : !1
                    }
                };
            l.prototype = {
                g: function (a) {
                    return this.c[a] ||
                        void 0
                },
                s: function (a, e, f) {
                    e = f ? new RegExp(e) : e;
                    return this.c[a] = e
                }
            };
            var G = new l,
                H = new l,
                w = new l,
                C = new l,
                A = "compareDocumentPosition" in D ? function (a, e) {
                    return 16 == (e.compareDocumentPosition(a) & 16)
                } : "contains" in D ? function (a, e) {
                    e = 9 === e.nodeType || e == window ? D : e;
                    return e !== a && e.contains(a)
                } : function (a, e) {
                    for (; a = a.parentNode;)
                        if (a === e) return 1;
                    return 0
                },
                Q = function () {
                    var a = z.createElement("p");
                    return (a.innerHTML = '<a href="#x">x</a>', "#x" != a.firstChild.getAttribute("href")) ? function (a, f) {
                        return "class" === f ?
                            a.className : "href" === f || "src" === f ? a.getAttribute(f, 2) : a.getAttribute(f)
                    } : function (a, f) {
                        return a.getAttribute(f)
                    }
                }(),
                U = !!z.getElementsByClassName,
                X = z.querySelector && z.querySelectorAll,
                Y = function (a, e) {
                    var f = [],
                        c, b;
                    try {
                        if (9 === e.nodeType || !L.test(a)) return g(e.querySelectorAll(a));
                        k(c = a.split(","), n(e, function (a, e) {
                            b = a.querySelectorAll(e);
                            1 == b.length ? f[f.length] = b.item(0) : b.length && (f = f.concat(g(b)))
                        }));
                        return 1 < c.length && 1 < f.length ? h(f) : f
                    } catch (r) { }
                    return F(a, e)
                },
                F = function (a, e) {
                    var f = [],
                        c, b, r, d;
                    a = a.replace(W,
                        "$1");
                    if (c = a.match(V)) {
                        d = u(c[2]);
                        c = e.getElementsByTagName(c[1] || "*");
                        b = 0;
                        for (r = c.length; b < r; b++) d.test(c[b].className) && (f[f.length] = c[b]);
                        return f
                    }
                    k(c = a.split(","), n(e, function (a, c, h) {
                        d = v(c, a);
                        b = 0;
                        for (r = d.length; b < r; b++)
                            if (9 === a.nodeType || h || A(d[b], e)) f[f.length] = d[b]
                    }));
                    return 1 < c.length && 1 < f.length ? h(f) : f
                },
                B = function (a) {
                    "undefined" !== typeof a.useNativeQSA && (E = a.useNativeQSA ? X ? Y : F : F)
                };
            B({
                useNativeQSA: !0
            });
            m.configure = B;
            m.uniq = h;
            m.is = function (a, e, f) {
                if (r(e)) return a == e;
                if (s(e)) return !!~b(e)
                    .indexOf(a);
                for (var h = e.split(","), d; e = h.pop() ;)
                    if (d = C.g(e) || C.s(e, e.split(I)), e = e.match(J), d = d.slice(0), t.apply(a, x(d.pop())) && (!d.length || c(a, d, e, f))) return !0;
                return !1
            };
            m.pseudos = {};
            return m
        });
        (function () {
            function l(c, b, h) {
                var d;
                x || (x = window[ensightenOptions.ns].qwery);
                d = x;
                if ((d = d.call(h, b, h)) && 0 < d.length) {
                    if ("_root" == b) c = h;
                    else if (c === h) c = void 0;
                    else {
                        b: {
                            for (var g = d.length, m = 0; m < g; m++)
                                if (c === d[m]) {
                                    d = !0;
                                    break b
                                }
                            d = !1
                        }
                        d || (c.parentNode ? (t++, c = l(c.parentNode, b, h)) : c = void 0)
                    }
                    return c
                }
                return !1
            }

            function u(c, b, d, g) {
                q[c.id] || (q[c.id] = {});
                q[c.id][b] || (q[c.id][b] = {});
                q[c.id][b][d] || (q[c.id][b][d] = []);
                q[c.id][b][d].push(g)
            }

            function k(c, b, d, g) {
                if (g || d)
                    if (g)
                        for (var k = 0; k < q[c.id][b][d].length; k++) {
                            if (q[c.id][b][d][k] ===
                                g) {
                                q[c.id][b][d].pop(k, 1);
                                break
                            }
                        } else delete q[c.id][b][d];
                else q[c.id][b] = {}
            }

            function b(c, b, h) {
                if (q[c][h]) {
                    var g = b.target || b.srcElement,
                        k, m, n = {},
                        p = m = 0;
                    t = 0;
                    for (k in q[c][h]) q[c][h].hasOwnProperty(k) && (m = l(g, k, v[c].element)) && d.matchesEvent(h, v[c].element, m, "_root" == k, b) && (t++, q[c][h][k].match = m, n[t] = q[c][h][k]);
                    b.stopPropagation = function () {
                        b.cancelBubble = !0
                    };
                    for (m = 0; m <= t; m++)
                        if (n[m])
                            for (p = 0; p < n[m].length; p++) {
                                if (!1 === n[m][p].call(n[m].match, b)) {
                                    d.cancel(b);
                                    return
                                }
                                if (b.cancelBubble) return
                            }
                }
            }

            function g(c,
                g, h, l) {
                function p(c) {
                    return function (d) {
                        b(m, d, c)
                    }
                }
                c instanceof Array || (c = [c]);
                h || "function" != typeof g || (h = g, g = "_root");
                var m = this.id,
                    n;
                for (n = 0; n < c.length; n++) q[m] && q[m][c[n]] || d.addEvent(this, c[n], p(c[n])), l ? k(this, c[n], g, h) : u(this, c[n], g, h);
                return this
            }

            function d(b, g, h, k) {
                if ("string" == typeof b && "function" == typeof g || "string" == typeof g) d(document)
                    .on(b, g, h, k || !1);
                if (!(this instanceof d)) {
                    for (var l in v)
                        if (v[l].element === b) return v[l];
                    p++;
                    v[p] = new d(b, p);
                    v[p]._on = v[p].on;
                    v[p].on = function (b, c, d, g) {
                        var h =
                            "function" == typeof c ? c : d;
                        if ("function" == typeof c ? d : g) b = [b], "string" == typeof c && b.push(c), b.push(function (b) {
                            return function (c) {
                                c.defaultPrevented || window[ensightenOptions.ns].Delegate.load(this);
                                if (this.nodeName && "a" != this.nodeName.toLowerCase()) return b.call(this);
                                "undefined" != typeof c.preventDefault ? c.preventDefault() : c.returnValue = !1;
                                b.call(this)
                            }
                        }(h)), this._on.apply(this, b);
                        else return this._on.call(this, b, c, d)
                    };
                    return v[p]
                }
                this.element = b;
                this.id = g
            }
            var x, t = 0,
                p = 0,
                q = {},
                v = {};
            d.prototype.on = function (b,
                d, h) {
                return g.call(this, b, d, h)
            };
            d.prototype.off = function (b, d, h) {
                return g.call(this, b, d, h, !0)
            };
            d.cancel = function (b) {
                b.preventDefault();
                b.stopPropagation()
            };
            d.addEvent = function (b, d, g) {
                b.element.addEventListener(d, g, "blur" == d || "focus" == d)
            };
            d.matchesEvent = function () {
                return !0
            };
            d.load = function (b) {
                setTimeout(function (b, c) {
                    return function () {
                        if (b.nodeName && "a" == b.nodeName.toLowerCase()) {
                            if (c && /^javascript\s*\:/.test(c)) return (new Function(unescape(c)))
                                .call(window);
                            c && (window.location.href = c)
                        }
                    }
                }(b, b.href ||
                    ""), 750)
            };
            window[ensightenOptions.ns].Delegate = d
        })();
        (function (l) {
            var u = l.addEvent;
            l.addEvent = function (k, b, g) {
                if (k.element.addEventListener) return u(k, b, g);
                "focus" == b && (b = "focusin");
                "blur" == b && (b = "focusout");
                k.element.attachEvent("on" + b, g)
            };
            l.cancel = function (k) {
                k.preventDefault && k.preventDefault();
                k.stopPropagation && k.stopPropagation();
                k.returnValue = !1;
                k.cancelBubble = !0
            }
        })(window[ensightenOptions.ns].Delegate);
        window[ensightenOptions.ns].on = window[ensightenOptions.ns].Delegate;
        Bootstrapper.dataDefinitionIds = [3553, 3521, 3554, 1059, 5861, 3561, 3529, 15370, 15371, 15372, 15373, 6258, 2194, 16406, 11191, 6137, 6138, 11261, 3165, 3519];
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return Bootstrapper.data.extract("WT.dc", "meta")
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "ClientType",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "5861"
                })
            }, 5861)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return Bootstrapper.data.extract("WT.cg_n", "meta")
                        } catch (e) {
                            return "error"
                        }
                    },
                    transform: function (v) {
                        return v
                    },
                    load: "page",
                    dataDefName: "cg_n",
                    collection: "MetaTags",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "16406"
                })
            }, 16406)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return pageData.siteCulture
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "siteCulture",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "3561"
                })
            }, 3561)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return pageData.userVisitorType
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "userVisitorType",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "6138"
                })
            }, 6138)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.getElementXPath = function (e) {
                var n = e;
                var p = "";
                while (n != document.getElementsByTagName("html")[0]) {
                    var t = "/" + n.tagName;
                    if (n.id != "") {
                        t += "#" + n.id;
                        p = t + p
                    } else {
                        var c = 1;
                        _n = n.previousSibling;
                        while (_n != null) {
                            if (n.tagName == _n.tagName) c++;
                            _n = _n.previousSibling
                        }
                        p = t + (c != 1 ? "[" + c + "]" : "") + p
                    }
                    n = n.parentNode
                }
                return Bootstrapper.getMinXPath("/HTML" + p)
            };
            Bootstrapper.getMinXPath = function (path) {
                var p =
                    path.split("/"),
                    lastId = 0;
                for (var i = 0; i < p.length; i++)
                    if (~p[i].indexOf("#")) lastId = i;
                for (var i = lastId; i > 0; i--)
                    if (!~p[i].indexOf("#") && !p[i].match(/^(html|body)/i)) p.splice(i, 1);
                return p.join("/")
            };
            Bootstrapper.getElementByXPathStep = function (d, a) {
                var c = ~a.indexOf("#") ? a.split("#")[1] : "",
                    e = c ? 0 : ~a.indexOf("[") ? parseInt(a.match(/\[(\d+)\]/)[1]) : 0,
                    f = (c ? a.split("#")[0] : e ? a.split("[")[0] : a)
                    .toLowerCase();
                if (d == document && f == "html" && e == 0) return document.getElementsByTagName("html")[0];
                if (~a.indexOf("#")) return document.getElementById(a.split("#")[1]);
                var b = d.firstChild;
                if (!b) return null;
                for (var g = 0, e = e != 0 ? e - 1 : e; b;) {
                    if (b.nodeType == 1)
                        if (b.tagName.toLowerCase() == f && c != "" && b.id == c) return b;
                        else if (b.tagName.toLowerCase() == f && g == e && c == "") return b;
                        else b.tagName.toLowerCase() == f && g++;
                    b = b.nextSibling
                }
            };
            Bootstrapper.getElementByXPath = function (d, n) {
                for (var d = d.split("/"), a = Bootstrapper.getElementByXPathStep(n || document, d[1]), c = 2; c < d.length; c++) {
                    if (a == null) return null;
                    a = Bootstrapper.getElementByXPathStep(a, d[c])
                }
                return a
            };
            Bootstrapper.dataManager = function () {
                var _private = {
                    data: {},
                    add: function (o) {
                        if (typeof o == "object" && o.id) {
                            o.get = function (e) {
                                return Bootstrapper.dataManager.getDataElement(this.id, e)
                            };
                            this.data[o.id] = o
                        }
                    },
                    getObj: function (i) {
                        if (i) return _private.data[i];
                        return _private.data
                    },
                    getDataElement: function (i, e) {
                        if (typeof this.data[i] == "undefined") return "";
                        var dataObj = this.data[i].data,
                            retVal;
                        if (typeof dataObj == "object") {
                            if (typeof dataObj[e] == "undefined") return "";
                            dataObj = dataObj[e];
                            if (typeof dataObj.get == "string") {
                                var d = eval(dataObj.get);
                                if (typeof dataObj.mod ==
                                    "string" && dataObj.mod !== "") {
                                    var m = "(function(){ return " + (dataObj.mod === "" ? "this" : dataObj.mod) + ";})";
                                    retVal = eval(m)
                                        .call(d)
                                } else if (typeof dataObj.mod == "function") retVal = dataObj.mod.call(d, d);
                                else retVal = d
                            } else if (typeof dataObj.get == "function") {
                                var d = dataObj.get.call(this.data[i]);
                                if (typeof dataObj.mod == "string" && dataObj.mod !== "") {
                                    var m = "(function(){ return " + (dataObj.mod === "" ? "this" : dataObj.mod) + ";})";
                                    retVal = eval(m)
                                        .call(d)
                                } else if (typeof dataObj.mod == "function") retVal = dataObj.mod.call(d, d);
                                else retVal =
                                    d
                            }
                            return retVal
                        }
                    },
                    getDataLayer: function (i) {
                        var retObj = {};
                        var dataObj = this.data[i].data;
                        for (key in dataObj) try {
                            retObj[key] = this.getDataElement(i, key)
                        } catch (e) {
                            retObj[key] = null
                        }
                        return retObj
                    },
                    getAllData: function () {
                        var data = this.data,
                            retObj = {
                                _d: {}
                            };
                        for (var key in data) {
                            retObj._d[key] = {};
                            var d = this.getDataLayer(key);
                            for (var k in d) {
                                retObj[k] = d[k];
                                retObj._d[key][k] = d[k]
                            }
                        }
                        return retObj
                    },
                    getData: function (i) {
                        if (i) return this.getDataLayer(i);
                        else return this.getAllData()
                    },
                    addDataElement: function (layerId, name,
                        o) {
                        if (typeof this.data[layerId] == "object" && typeof name == "string" && typeof o == "object") {
                            var d = this.data[layerId];
                            d.data[name] = o
                        }
                    }
                },
                    _public = {
                        push: function (dl) {
                            _private.add(dl)
                        },
                        getObj: function (i) {
                            return _private.getObj(i)
                        },
                        getData: function (i) {
                            return _private.getData(i)
                        },
                        getDataElement: function (i, e) {
                            return _private.getDataElement(i, e)
                        },
                        addDataElement: function (layerId, name, o) {
                            return _private.addDataElement(layerId, name, o)
                        }
                    };
                return _public
            }();
            Bootstrapper.eventManager = function () {
                var _private = {
                    events: {},
                    pushTrack: function (name, fn) {
                        if (typeof name != "string") return false;
                        this.events[name] = this.events[name] || [];
                        if (typeof fn == "function") this.events[name].push(fn);
                        return true
                    },
                    callTrack: function (name) {
                        if (typeof name != "string") return false;
                        var l = _private.events[name];
                        if (typeof l == "object" && l.length)
                            for (var i = 0; i < l.length; i++) l[i].call(this)
                    },
                    bind: function (layer, name, fn) {
                        var node = Bootstrapper.dataManager.getDataElement(layer, name),
                            event = name.split("#")[1],
                            name = name.split("#")[0],
                            bound = typeof this.events[name] !=
                            "undefined" ? true : false;
                        if (typeof node.nodeName != "undefined") {
                            this.pushTrack(name, fn);
                            if (!bound)
                                if ((event == "onelementvisible" || event == "onelementexists") && typeof Bootstrapper.propertyWatcher != "undefined") {
                                    Bootstrapper.eventManager.watch = Bootstrapper.eventManager.watch || {};
                                    if (~event.indexOf("vis")) {
                                        Bootstrapper.eventManager.watch[name] = Bootstrapper.propertyWatcher.create(function () {
                                            return node
                                        }, ["style", "display"]);
                                        Bootstrapper.eventManager.watch[name].change = function (p, o, n) {
                                            if (n != "none") Bootstrapper.eventManager.track(name,
                                                this)
                                        }
                                    } else {
                                        Bootstrapper.eventManager.watch[name] = Bootstrapper.propertyWatcher.create(function () {
                                            return node
                                        }, ["style", "display"]);
                                        Bootstrapper.eventManager.watch[name].change = function (p, o, n) {
                                            if (o == "undefined") Bootstrapper.eventManager.track(name, this)
                                        }
                                    }
                                } else Bootstrapper.unobtrusiveAddEvent(node, event, function () {
                                    Bootstrapper.eventManager.track(name, this)
                                })
                        } else if (typeof node == "object" && typeof node.length != "undefined") {
                            this.pushTrack(name, fn);
                            if (!bound)
                                for (i = 0, l = node.length; i < l; i++) Bootstrapper.unobtrusiveAddEvent(node[i],
                                    event,
                                    function () {
                                        Bootstrapper.eventManager.track(name, this)
                                    })
                        }
                    },
                    debug: function (name, ref) {
                        if (~window.location.search.indexOf("ensightenDebug")) console.log("::eventManager - Name:" + name + " ::eventManager - Scope:" + ref)
                    }
                },
                    _public = {
                        bindTracker: function (layer, name, fn) {
                            return _private.bind(layer, name, fn)
                        },
                        getEvent: function (name) {
                            return _private.events[name]
                        },
                        getAll: function () {
                            return _private.events
                        },
                        track: function (name, ref) {
                            var $this = ref || window;
                            _private.debug(name, $this);
                            return _private.callTrack.call($this,
                                name)
                        }
                    };
                return _public
            }();
            Bootstrapper.dataManager.map = function () {
                var _private = {
                    gD: {},
                    mD: function (g) {
                        var e = window.document.getElementsByTagName("META") || [];
                        for (var m = 0, l = e.length; m < l; m++) {
                            var n = e[m].name || e[m].getAttribute("property") || "";
                            if (n == g) return e[m].content
                        }
                    },
                    gP: function (p) {
                        var s;
                        return (s = (new RegExp("\x26" + p + "\x3d([^\x26]*)"))
                            .exec(window.location.search.replace(/^\?/, "\x26"))) ? s[0].split("\x3d")[1] : ""
                    },
                    gC: function (c) {
                        var v;
                        return (v = (new RegExp("^" + c + "\x3d.*|;\\s*" + c + "\x3d.*"))
                                .exec(window.document.cookie)) ?
                            v[0].split("\x3d")[1].split(";")[0] : ""
                    },
                    gT: function (g) {
                        try {
                            return this.mD(g) || this.gC(g) || this.gP(g) || window[g] || ""
                        } catch (e) {
                            return ""
                        }
                    },
                    dF: function (n, d) {
                        this.gD = {};
                        for (i in d) {
                            var val = typeof d[i] == "string" ? this.gT(d[i]) : d[i]();
                            if (~window.location.href.indexOf("ensightenDebug")) console.log(i + ": " + val);
                            this.gD[i] = {
                                name: i,
                                get: '(function(){return("' + val + '")})()'
                            }
                        }
                        Bootstrapper.dataManager.push({
                            name: n,
                            id: n,
                            data: this.gD
                        })
                    }
                },
                    _public = {
                        define: function (n, d) {
                            _private.dF(n, d)
                        },
                        get: function (g) {
                            return _private.gT(g)
                        }
                    };
                return _public
            }();
            window.$data = function (n, d) {
                try {
                    return Bootstrapper.dataManager.getDataElement(n, d)
                } catch (e) {
                    return ""
                }
            };
            window.$getData = function (d) {
                return Bootstrapper.dataManager.map.get(d)
            };
            Bootstrapper.dataManager.dataImport = function (O, N, T) {
                var DM = Bootstrapper.dataManager;
                if (typeof DM.getObj()[N] == "undefined") DM.push({
                    name: N,
                    id: N,
                    data: {}
                });
                for (i in O)
                    if (T != "simple" && typeof O[i] == "object") {
                        DM.dataImport(O[i], T == "flattened" ? N : i, T);
                        console.log(T)
                    } else if (typeof O[i] != "object" || O[i] == null) try {
                        eval('Bootstrapper.dataManager.addDataElement(N,i,{name:i,get:function(){try{return "' +
                            O[i] + "\"}catch(e){return'error'}}})")
                    } catch (e) { }
            };
            Bootstrapper.targetingExtension = function () {
                var o = ensightenOptions,
                    DL = typeof Bootstrapper.dataManager != "undefined" ? Bootstrapper.dataManager.getData() : false;
                if (DL) delete DL["_d"];
                if (~document.cookie.indexOf("VTP:enabled")) {
                    if (!DL) DL = {};
                    DL["ensightenVT"] = 1
                }
                if (typeof Bootstrapper.getExtraParams != "undefined") {
                    var p = Bootstrapper.getExtraParams();
                    if (typeof p == "object") {
                        if (!DL) DL = {};
                        for (i in p) DL[i] = p[i]
                    }
                }
                Bootstrapper.insertScript("//" + (typeof ensightenOptions.serverComponentLocation !=
                    "undefined" ? ensightenOptions.serverComponentLocation : o.nexus + "/" + o.client + "/serverComponent.php"), false, DL)
            };
            if (typeof Bootstrapper._getServerComponent != "undefined") Bootstrapper._getServerComponent = Bootstrapper.targetingExtension;
            else Bootstrapper.getServerComponent = Bootstrapper.targetingExtension;
            Bootstrapper.propertyWatcher = function (f) {
                var g = {
                    watchers: []
                },
                    p = {};
                g.options = f || {};
                g.options.interval = g.options.interval || 50;
                g.Watcher = function (c, d) {
                    var e = {};
                    e.propertyFn = c;
                    e.lastValue = undefined;
                    e.options =
                        d;
                    e.change = function (a, b) { };
                    return e
                };
                g.doChecks = function () {
                    for (var i = 0; i < g.watchers.length; i++) {
                        var w = g.watchers[i],
                            p = w.propertyFn ? w.propertyFn() : null;
                        if (w.lastValue != p) {
                            w.change(w.lastValue, p);
                            w.lastValue = p
                        }
                    }
                    g.resetTimer()
                };
                g.resetTimer = function () {
                    window.setTimeout(function () {
                        g.doChecks()
                    }, g.options.interval)
                };
                g.addWatcher = function (a, b) {
                    var w = g.Watcher(a, b);
                    g.watchers.push(w);
                    return w
                };
                p = {
                    create: g.addWatcher
                };
                g.doChecks();
                return p
            }();
            Bootstrapper.VTconfig = Bootstrapper.VTconfig || {};
            Bootstrapper.VTconfig["DM"] =
                this.deploymentId;
            Bootstrapper.Cookies = function () {
                return {
                    domain: "" || location.hostname,
                    get: function (k, d) {
                        var c = document.cookie.split(";");
                        for (var i = 0; i < c.length; i++) {
                            var _c = c[i].replace(/^\s+/, "")
                                .split("\x3d");
                            if (_c[0] == k) return !d ? decodeURIComponent(_c[1]) : _c[1]
                        }
                        return ""
                    },
                    set: function (k, v, e) {
                        var domain = this.domain;
                        document.cookie = k + "\x3d" + encodeURIComponent(v) + (e ? ";expires\x3d" + e : "") + ";path\x3d/;domain\x3d" + this.domain;
                        return this.get(k) == v
                    },
                    test: function (k) {
                        return this.get(k) ? true : false
                    }
                }
            }();
            Bootstrapper.getElementsByClassName =
                function () {
                    var root = document,
                        className = "",
                        partial = false;
                    for (var i = 0; i < arguments.length; i++)
                        if (typeof arguments[i] == "object") root = arguments[i];
                        else if (typeof arguments[i] == "string") className = arguments[i];
                        else partial = arguments[i];
                    var elements = root.getElementsByTagName("*");
                    var retElements = [],
                        needle = partial ? new RegExp(className) : new RegExp("^" + className + "$");
                    for (var i = 0; i < elements.length; i++)
                        if (typeof elements[i].className == "string") {
                            var tempClass = elements[i].className || "";
                            if (tempClass.match(needle)) retElements.push(elements[i])
                        }
                    return retElements
                };
            Bootstrapper.unobtrusiveMultiAddEvent = function (n, e, f) {
                var n = eval(n),
                    l = n.length || 1,
                    m = typeof n == "object" && typeof n.length != "undefined" ? 1 : 0;
                for (i = 0; i < l; i++) {
                    var m = m ? n[i] : n;
                    if (typeof m.nodeName != "undefined") Bootstrapper.unobtrusiveAddEvent(m, e, f)
                }
            }
        }, 398401, 181892);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return navigator.userAgent
                        } catch (e) {
                            return undefined
                        }
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "userAgent",
                    collection: "Other",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "11261"
                })
            }, 11261)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return window.pageData.urlHost
                        } catch (e) {
                            return ""
                        }
                    },
                    transform: function (v) {
                        return v.replace("www.", "")
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "pageUrl",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "3529"
                })
            }, 3529)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return Bootstrapper.data.extract("momondo-route-name", "meta")
                        } catch (e) {
                            return "error"
                        }
                    },
                    transform: function (v) {
                        return v
                    },
                    load: "page",
                    dataDefName: "momondoroutename",
                    collection: "MetaTags",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "11191"
                })
            }, 11191)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return pageData.userVisitCount
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "userVisitCount",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "6137"
                })
            },
                6137)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return window.pageData.userType
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "UserType",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "15373"
                })
            }, 15373)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return pageData.pageType
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "pageType",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "1059"
                })
            }, 1059)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return window.pageData.siteMachineName
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "SiteMachineName",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "15372"
                })
            },
                15372)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return pageData.siteCountry
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "siteCountry",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "6258"
                })
            }, 6258)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return pageData.pageName
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "pageName",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "3519"
                })
            }, 3519)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return window.pageData.siteEnvironmentName
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "SiteEnvironmentName",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "15371"
                })
            }, 15371)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return document.location.host.split(".")[0]
                        } catch (e) {
                            return ""
                        }
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "subDomain",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "3553"
                })
            }, 3553)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return Bootstrapper.data.extract("[Xx][Rr][Ee][Ff]", "param")
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "XRef",
                    collection: "CrossPromo",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "3521"
                })
            }, 3521)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            document._write = document.write;
            document.write = function (x) {
                if (Bootstrapper.hasDOMParsed()) {
                    var d = document.createElement("div");
                    x = x.split(/\<script/i);
                    var scripts = [];
                    var repSpans = [];
                    var repScripts = [];
                    if (x[0] == "") x.shift();
                    for (var i = 0; i < x.length; i++) {
                        x[i] = x[i].split(/\/script\>/i);
                        if (x[i][0].indexOf("\x3c")) {
                            scripts.push("\x3cscript" + x[i][0] + "/script\x3e");
                            x[i][0] = "\x3cspan name\x3d'ensScript'\x3e\x3c/span\x3e"
                        }
                        x[i] =
                            x[i].join("")
                    }
                    x = x.join("");
                    d.innerHTML = x;
                    var spans = d.getElementsByTagName("span");
                    for (var i = 0; i < spans.length; i++)
                        if (spans[i].getAttribute("name") == "ensScript") {
                            var s = scripts.shift();
                            s = s.replace(/\<\/script\>/i, "");
                            s = s.split("\x3e");
                            var attr = s[0].split(" ");
                            var script = document.createElement("script");
                            for (var j = 1; j < attr.length; j++) {
                                attr[j] = attr[j].split("\x3d");
                                var attrName = attr[j].shift();
                                attr[j] = attr[j].join("\x3d");
                                if (attr[j].match(/^(\'|\")/)) {
                                    var wrapper = attr[j].slice(0, 1);
                                    attr[j] = attr[j].slice(1,
                                        attr[j].length);
                                    attr[j] = attr[j].slice(0, attr[j].lastIndexOf(wrapper))
                                }
                                script.setAttribute(attrName, attr[j]);
                                script.text = s[1]
                            }
                            repSpans.push(spans[i]);
                            repScripts.push(script)
                        }
                    for (var i = repSpans.length - 1; i >= 0; i--) d.replaceChild(repScripts[i], repSpans[i]);
                    document.body.appendChild(d)
                } else document._write(x)
            };
            document._writeln = document.writeln;
            document.writeln = function (x) {
                if (Bootstrapper.hasDOMParsed()) {
                    var d = document.createElement("div");
                    x = x.split(/\<script/i);
                    var scripts = [];
                    var repSpans = [];
                    var repScripts = [];
                    if (x[0] == "") x.shift();
                    for (var i = 0; i < x.length; i++) {
                        x[i] = x[i].split(/\/script\>/i);
                        if (x[i][0].indexOf("\x3c")) {
                            scripts.push("\x3cscript" + x[i][0] + "/script\x3e");
                            x[i][0] = "\x3cspan name\x3d'ensScript'\x3e\x3c/span\x3e"
                        }
                        x[i] = x[i].join("")
                    }
                    x = x.join("");
                    d.innerHTML = x;
                    var spans = d.getElementsByTagName("span");
                    for (var i = 0; i < spans.length; i++)
                        if (spans[i].getAttribute("name") == "ensScript") {
                            var s = scripts.shift();
                            s = s.replace(/\<\/script\>/i, "");
                            s = s.split("\x3e");
                            var attr = s[0].split(" ");
                            var script = document.createElement("script");
                            for (var j = 1; j < attr.length; j++) {
                                attr[j] = attr[j].split("\x3d");
                                var attrName = attr[j].shift();
                                attr[j] = attr[j].join("\x3d");
                                if (attr[j].match(/^(\'|\")/)) {
                                    var wrapper = attr[j].slice(0, 1);
                                    attr[j] = attr[j].slice(1, attr[j].length);
                                    attr[j] = attr[j].slice(0, attr[j].lastIndexOf(wrapper))
                                }
                                script.setAttribute(attrName, attr[j]);
                                script.text = s[1]
                            }
                            repSpans.push(spans[i]);
                            repScripts.push(script)
                        }
                    for (var i = repSpans.length - 1; i >= 0; i--) d.replaceChild(repScripts[i], repSpans[i]);
                    document.body.appendChild(d)
                } else document._writeln(x)
            }
        },
            231680, 181893);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.ajaxListener = function () {
                var listeners = {},
                    listener = function (a, b) {
                        var detected = [],
                            selector = a || function () { },
                            attach = b || function (node) { };
                        return function () {
                            if (typeof selector == "function" && typeof attach == "function") {
                                var n = selector();
                                if (typeof n == "object")
                                    if (typeof n.length != "undefined") {
                                        n = Array.prototype.slice.call(n, 0);
                                        for (var i = n.length - 1; i >= 0; i--)
                                            for (var j = 0; j <
                                                detected.length; j++)
                                                if (n[i] == detected[j]) n.splice(i, 1);
                                        for (var i = 0; i < n.length; detected.push(n[i++]));
                                        for (var i = 0; i < n.length; attach.call(n[i], n[i++]));
                                    } else {
                                        for (var i = 0; i < detected.length; i++)
                                            if (n == detected[i]) return;
                                        detected.push(n);
                                        attach.call(n, n)
                                    }
                            }
                        }
                    },
                    _public = {
                        create: function (x, y) {
                            do var a = parseInt(Math.random() * 1E5) + ""; while (listeners[a]);
                            listeners[a] = listener(x, y)
                        }
                    };
                setInterval(function () {
                    for (key in listeners) listeners[key]()
                }, 500);
                return _public
            }();
            Bootstrapper.Cookies = function () {
                return {
                    domain: "" ||
                        location.hostname,
                    get: function (a, c) {
                        for (var b = document.cookie.split(";"), d = 0; d < b.length; d++) {
                            var e = b[d].replace(/^\s+/, "")
                                .split("\x3d");
                            if (e[0] == a) return c ? e[1] : decodeURIComponent(e[1])
                        }
                        return ""
                    },
                    set: function (a, c, b) {
                        document.cookie = a + "\x3d" + encodeURIComponent(c) + (b ? ";expires\x3d" + b : "") + ";path\x3d/;domain\x3d" + this.domain;
                        return this.get(a) == c
                    },
                    test: function (a) {
                        return this.get(a) ? !0 : !1
                    }
                }
            }();
            Bootstrapper.dataManager = function () {
                var _private = {
                    data: {},
                    add: function (o) {
                        if (typeof o == "object" && o.id) {
                            o.get =
                                function (e) {
                                    return Bootstrapper.dataManager.getDataElement(this.id, e)
                                };
                            this.data[o.id] = o
                        }
                    },
                    getObj: function (i) {
                        if (i) return _private.data[i];
                        return _private.data
                    },
                    getDataElement: function (i, e) {
                        if (typeof this.data[i] == "undefined") return "";
                        var dataObj = this.data[i].data,
                            retVal;
                        if (typeof dataObj == "object") {
                            if (typeof dataObj[e] == "undefined") return "";
                            dataObj = dataObj[e];
                            if (typeof dataObj.get == "string") {
                                var d = eval(dataObj.get);
                                if (typeof dataObj.mod == "string" && dataObj.mod !== "") {
                                    var m = "(function(){ return " + (dataObj.mod ===
                                        "" ? "this" : dataObj.mod) + ";})";
                                    retVal = eval(m)
                                        .call(d)
                                } else if (typeof dataObj.mod == "function") retVal = dataObj.mod.call(d, d);
                                else retVal = d
                            } else if (typeof dataObj.get == "function") {
                                var d = dataObj.get.call(this.data[i]);
                                if (typeof dataObj.mod == "string" && dataObj.mod !== "") {
                                    var m = "(function(){ return " + (dataObj.mod === "" ? "this" : dataObj.mod) + ";})";
                                    retVal = eval(m)
                                        .call(d)
                                } else if (typeof dataObj.mod == "function") retVal = dataObj.mod.call(d, d);
                                else retVal = d
                            }
                            return retVal
                        }
                    },
                    getDataLayer: function (i) {
                        var retObj = {};
                        var dataObj =
                            this.data[i].data;
                        for (key in dataObj) try {
                            retObj[key] = this.getDataElement(i, key)
                        } catch (e) {
                            retObj[key] = null
                        }
                        return retObj
                    },
                    getAllData: function () {
                        var data = this.data,
                            retObj = {
                                _d: {}
                            };
                        for (var key in data) {
                            retObj._d[key] = {};
                            var d = this.getDataLayer(key);
                            for (var k in d) {
                                retObj[k] = d[k];
                                retObj._d[key][k] = d[k]
                            }
                        }
                        return retObj
                    },
                    getData: function (i) {
                        if (i) return this.getDataLayer(i);
                        else return this.getAllData()
                    },
                    addDataElement: function (layerId, name, o) {
                        if (typeof this.data[layerId] == "object" && typeof name == "string" &&
                            typeof o == "object") {
                            var d = this.data[layerId];
                            d.data[name] = o
                        }
                    }
                },
                    _public = {
                        push: function (dl) {
                            _private.add(dl)
                        },
                        getObj: function (i) {
                            return _private.getObj(i)
                        },
                        getData: function (i) {
                            return _private.getData(i)
                        },
                        getDataElement: function (i, e) {
                            return _private.getDataElement(i, e)
                        },
                        addDataElement: function (layerId, name, o) {
                            return _private.addDataElement(layerId, name, o)
                        }
                    };
                return _public
            }();
            Bootstrapper.dataManager.map = function () {
                return {
                    define: function (n, d) {
                        if (Bootstrapper.data)
                            for (i in d) {
                                var v = typeof d[i] == "string" ?
                                    Bootstrapper.data.extract(d[i]) : d[i]();
                                Bootstrapper.data.dataManagerPush(i, v, n)
                            }
                    }
                }
            }();
            window.$data = function (a, b) {
                if (typeof b == "string") try {
                    return Bootstrapper.dataManager.getDataElement(a, b)
                } catch (e) { } else if (typeof a == "string") return Bootstrapper.dataManager.getData()[a] || "";
                return ""
            };
            Bootstrapper.bindOnGetServerComponent(function () {
                var DL = Bootstrapper.dataManager && Bootstrapper.targetingExtension ? Bootstrapper.dataManager.getData() : {};
                if (~document.cookie.indexOf("VTP:enabled")) DL["ensightenVT"] = 1;
                if (Bootstrapper.scDataObj)
                    for (i in DL) Bootstrapper.scDataObj[i] = DL[i]
            });
            var ns = window[ensightenOptions.ns];
            ns.VTconfig = ns.VTconfig || {};
            ns.VTconfig["DM"] = this.deploymentId;
            Bootstrapper.dataManager.pushObject = function (obj, id, name) {
                Bootstrapper.dataManager.push({
                    name: name || id,
                    id: id,
                    data: {}
                });
                for (var k in obj)
                    if (obj[k] && typeof obj[k] !== "function") Bootstrapper.dataManager.addDataElement(id, k, {
                        name: k,
                        get: function (o, key) {
                            return function () {
                                return o[key]
                            }
                        }(obj, k)
                    })
            };
            (function () {
                function s(e, t, n) {
                    var r = t ==
                        "blur" || t == "focus";
                    e.element.addEventListener(t, n, r)
                }

                function o(e) {
                    e.preventDefault();
                    e.stopPropagation()
                }

                function u(t) {
                    if (e) return e;
                    if (t.matches) e = t.matches;
                    if (t.webkitMatchesSelector) e = t.webkitMatchesSelector;
                    if (t.mozMatchesSelector) e = t.mozMatchesSelector;
                    if (t.msMatchesSelector) e = t.msMatchesSelector;
                    if (t.oMatchesSelector) e = t.oMatchesSelector;
                    if (!e) e = p.matchesSelector;
                    return e
                }

                function a(e, n, r) {
                    if (n == "_root") return r;
                    if (e === r) return;
                    if (u(e)
                        .call(e, n)) return e;
                    if (e.parentNode) {
                        t++;
                        return a(e.parentNode,
                            n, r)
                    }
                }

                function f(e, t, n, i) {
                    if (!r[e.id]) r[e.id] = {};
                    if (!r[e.id][t]) r[e.id][t] = {};
                    if (!r[e.id][t][n]) r[e.id][t][n] = [];
                    r[e.id][t][n].push(i)
                }

                function l(e, t, n, i) {
                    if (!i && !n) {
                        r[e.id][t] = {};
                        return
                    }
                    if (!i) {
                        delete r[e.id][t][n];
                        return
                    }
                    for (var s = 0; s < r[e.id][t][n].length; s++)
                        if (r[e.id][t][n][s] === i) {
                            r[e.id][t][n].pop(s, 1);
                            break
                        }
                }

                function c(e, n, s) {
                    if (!r[e][s]) return;
                    var o = n.target || n.srcElement,
                        u, f, l = {},
                        c = 0,
                        h = 0;
                    t = 0;
                    for (u in r[e][s])
                        if (r[e][s].hasOwnProperty(u)) {
                            f = a(o, u, i[e].element);
                            if (f && p.matchesEvent(s, i[e].element,
                                    f, u == "_root", n)) {
                                t++;
                                r[e][s][u].match = f;
                                l[t] = r[e][s][u]
                            }
                        }
                    n.stopPropagation = function () {
                        n.cancelBubble = true
                    };
                    for (c = 0; c <= t; c++)
                        if (l[c])
                            for (h = 0; h < l[c].length; h++) {
                                if (l[c][h].call(l[c].match, n) === false) {
                                    p.cancel(n);
                                    return
                                }
                                if (n.cancelBubble) return
                            }
                }

                function h(e, t, n, i) {
                    function u(e) {
                        return function (t) {
                            c(s, t, e)
                        }
                    }
                    if (!(e instanceof Array)) e = [e];
                    if (!n && typeof t == "function") {
                        n = t;
                        t = "_root"
                    }
                    var s = this.id,
                        o;
                    for (o = 0; o < e.length; o++) {
                        if (!r[s] || !r[s][e[o]]) p.addEvent(this, e[o], u(e[o]));
                        if (i) {
                            l(this, e[o], t, n);
                            continue
                        }
                        f(this,
                            e[o], t, n)
                    }
                    return this
                }

                function p(e, t) {
                    if (typeof e == "string" && typeof t == "function" || typeof t == "string") p(document)
                        .on(arguments[0], arguments[1], arguments[2], arguments[3] || false);
                    if (!(this instanceof p)) {
                        for (var r in i)
                            if (i[r].element === e) return i[r];
                        n++;
                        i[n] = new p(e, n);
                        i[n]._on = i[n].on;
                        i[n].on = function (e, t, n, r) {
                            var i = typeof t == "function" ? t : n,
                                s = typeof t == "function" ? n || false : r || false;
                            if (!s) return this._on.call(this, e, t, n);
                            else {
                                var o = [e];
                                if (typeof t == "string") o.push(t);
                                o.push(function (e) {
                                    return function (t) {
                                        if (!t.defaultPrevented) Bootstrapper.Delegate.load(this,
                                            s);
                                        if (typeof t.preventDefault != "undefined") t.preventDefault();
                                        else t.returnValue = false;
                                        e.call(this)
                                    }
                                }(i));
                                this._on.apply(this, o)
                            }
                        };
                        return i[n]
                    }
                    this.element = e;
                    this.id = t
                }
                var e, t = 0,
                    n = 0,
                    r = {},
                    i = {};
                _delay = 750;
                p.prototype.on = function (e, t, n) {
                    return h.call(this, e, t, n)
                };
                p.prototype.off = function (e, t, n) {
                    return h.call(this, e, t, n, true)
                };
                p.matchesSelector = function () { };
                p.cancel = o;
                p.addEvent = s;
                p.matchesEvent = function () {
                    return true
                };
                p.load = function (e, t) {
                    var n = typeof t == "number" ? parseInt(t) : 750;
                    setTimeout(function (e,
                        t) {
                        return function () {
                            if (e.nodeName && "a" == e.nodeName.toLowerCase()) {
                                if (t && /^javascript\s*\:/.test(t)) return (new Function(unescape(t)))
                                    .call(window);
                                else if (e.target && /_blank|_new/i.test(e.target)) return true;
                                if (t) window.location.href = t
                            }
                        }
                    }(e, e.href || ""), n)
                };
                window.Bootstrapper.Delegate = p
            })();
            (function (e) {
                var t = e.addEvent;
                e.addEvent = function (e, n, r) {
                    if (e.element.addEventListener) return t(e, n, r);
                    if (n == "focus") n = "focusin";
                    if (n == "blur") n = "focusout";
                    e.element.attachEvent("on" + n, r)
                };
                e.simpleMatchesSelector =
                    function (e) {
                        if (e.charAt(0) === ".") return (" " + this.className + " ")
                            .indexOf(" " + e.slice(1) + " ") > -1;
                        if (e.charAt(0) === "#") return this.id === e.slice(1);
                        return this.tagName.toUpperCase() === e.toUpperCase()
                    };
                e.matchesSelector = function (t) {
                    if (!~t.indexOf(" ") && !~t.indexOf("\x3e")) return e.simpleMatchesSelector.call(this, t);
                    else {
                        var n = this,
                            r = t.split(" ")
                            .reverse();
                        while (r.length) {
                            var i = r.shift();
                            if (~i.indexOf("\x3e")) {
                                i = i.split("\x3e")
                                    .reverse();
                                while (i.length) {
                                    tempSel = i.shift();
                                    if (e.simpleMatchesSelector.call(n,
                                            tempSel)) n = n.parentNode;
                                    else return false
                                }
                                if (!r.length) return true
                            } else
                                while (n != document) {
                                    var s = e.simpleMatchesSelector.call(n, i);
                                    n = n.parentNode;
                                    if (s) {
                                        if (!r.length) return true;
                                        break
                                    }
                                }
                        }
                        return false
                    }
                };
                e.cancel = function (e) {
                    if (e.preventDefault) e.preventDefault();
                    if (e.stopPropagation) e.stopPropagation();
                    e.returnValue = false;
                    e.cancelBubble = true
                }
            })(window.Bootstrapper.Delegate);
            Bootstrapper.on = Bootstrapper.Delegate;
            document.getElementsByClassName = document.getElementsByClassName || function (b) {
                var c = this.all ||
                    this.getElementsByTagName("*"),
                    d = [];
                b = RegExp("(?:^|\\s)" + b + "(?:\\s|$)");
                for (var a = 0; a < c.length; a++) b.test(c[a].className) && d.push(c[a]);
                return d
            };
            Bootstrapper.getQueryParam = function (key, loc) {
                if (!this.params || loc) {
                    var search = loc || window.location.search;
                    var params = search.replace(/^\?/, ""),
                        paramObj = {};
                    params = params.split("\x26");
                    for (var i = 0; i < params.length; i++) {
                        var t = params[i].split("\x3d");
                        paramObj[t[0]] = t[1]
                    }
                    if (!loc) this.params = paramObj;
                    else return paramObj[key] || ""
                }
                return this.params[key] || ""
            };
            Bootstrapper.propertyWatcher =
                function (options) {
                    var _private = {
                        watchers: []
                    },
                        _public = {};
                    _private.options = options || {};
                    _private.options.interval = _private.options.interval || 50;
                    _private.Watcher = function (propertyFn, options) {
                        var _public = {};
                        _public.propertyFn = propertyFn;
                        _public.lastValue = undefined;
                        _public.options = options;
                        _public.change = function (oldVal, newVal) { };
                        return _public
                    };
                    _private.doChecks = function () {
                        for (var i = 0; i < _private.watchers.length; i++) {
                            var w = _private.watchers[i],
                                p = w.propertyFn ? w.propertyFn() : null;
                            if (w.lastValue != p) {
                                w.change(w.lastValue,
                                    p);
                                w.lastValue = p
                            }
                        }
                        _private.resetTimer()
                    };
                    _private.resetTimer = function () {
                        window.setTimeout(function () {
                            _private.doChecks()
                        }, _private.options.interval)
                    };
                    _private.addWatcher = function (fn, options) {
                        var w = _private.Watcher(fn, options);
                        _private.watchers.push(w);
                        return w
                    };
                    _public = {
                        create: _private.addWatcher
                    };
                    _private.doChecks();
                    return _public
                }();
            Bootstrapper.getDataSafe = function (id) {
                return Bootstrapper.data.resolve(id) == "[object HTMLDocument]" ? undefined : Bootstrapper.data.resolve(id)
            }
        }, 629217, 260038);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return Bootstrapper.data.extract("[Rr][Ii][Ii][Dd]", "param")
                        } catch (e) {
                            return null
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "riid",
                    collection: "Responsys",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "2194"
                })
            }, 2194)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return window.pageData.siteId
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "siteId",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "3165"
                })
            }, 3165)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return pageData.siteCode
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "siteCode",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "3554"
                })
            }, 3554)
        }, -1, -1);
        Bootstrapper.bindImmediate(function () {
            var Bootstrapper = window["Bootstrapper"];
            var ensightenOptions = Bootstrapper.ensightenOptions;
            Bootstrapper.registerDataDefinition(function () {
                Bootstrapper.data.define({
                    extract: function () {
                        try {
                            return window.pageData.siteApplicationVersion
                        } catch (e) {
                            return undefined
                        }
                    },
                    transform: function (val) {
                        if (val) return val;
                        else return undefined
                    },
                    load: "page",
                    trigger: Bootstrapper.data.bottomOfBodyTrigger,
                    dataDefName: "SiteApplicationVersion",
                    collection: "pageData",
                    source: "Manage",
                    priv: "false"
                }, {
                    id: "15370"
                })
            }, 15370)
        }, -1, -1);
        Bootstrapper.getServerComponent(Bootstrapper.getExtraParams ? Bootstrapper.getExtraParams() : undefined);
    }
})();
