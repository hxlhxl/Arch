/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "db9ce6e754786d5bf3e0";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "db9ce6e754786d5bf3e0";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: [],
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/build/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./app/index.ts")(__webpack_require__.s = "./app/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.ts":
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-route */ \"./node_modules/angular-route/index.js\");\n/* harmony import */ var angular_route__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_route__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _core_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/core */ \"./app/core/core.ts\");\n/* harmony import */ var _routes_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/routes */ \"./app/routes/routes.ts\");\n\r\n\r\n\r\n // bilibili.core\r\n\r\nvar App = /** @class */ (function () {\r\n    function App() {\r\n        this.ngModuleDependecies = [\r\n            'bilibili.core',\r\n            'ngRoute',\r\n            'bilibili'\r\n        ];\r\n    }\r\n    App.prototype.init = function () {\r\n        var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('bilibili', []);\r\n        // app.config();\r\n        // app.constant()\r\n        app.controller('IndexCtrl', ['$scope', function ($scope) {\r\n                $scope.name = \"World!\";\r\n            }]);\r\n        app.controller('ErrorCtrl', ['$scope', function ($scope) {\r\n                $scope.status = '404 Not Found';\r\n            }]);\r\n        _core_core__WEBPACK_IMPORTED_MODULE_2__[\"coreModule\"].config(_routes_routes__WEBPACK_IMPORTED_MODULE_3__[\"setupNgRoutes\"]);\r\n        angular__WEBPACK_IMPORTED_MODULE_0___default.a.bootstrap(document, this.ngModuleDependecies);\r\n    };\r\n    return App;\r\n}());\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (new App());\r\n\n\n//# sourceURL=webpack:///./app/app.ts?");

/***/ }),

/***/ "./app/core/core.ts":
/*!**************************!*\
  !*** ./app/core/core.ts ***!
  \**************************/
/*! exports provided: coreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_module */ \"./app/core/core_module.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"coreModule\", function() { return _core_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\r\n\r\n\n\n//# sourceURL=webpack:///./app/core/core.ts?");

/***/ }),

/***/ "./app/core/core_module.ts":
/*!*********************************!*\
  !*** ./app/core/core_module.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('bilibili.core', ['ngRoute']));\r\n\n\n//# sourceURL=webpack:///./app/core/core_module.ts?");

/***/ }),

/***/ "./app/index.ts":
/*!**********************!*\
  !*** ./app/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./app/app.ts\");\n\r\n_app__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\r\n\n\n//# sourceURL=webpack:///./app/index.ts?");

/***/ }),

/***/ "./app/routes/routes.ts":
/*!******************************!*\
  !*** ./app/routes/routes.ts ***!
  \******************************/
/*! exports provided: setupNgRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupNgRoutes\", function() { return setupNgRoutes; });\nfunction setupNgRoutes($routeProvider, $locationProvider) {\r\n    $locationProvider.html5Mode(true);\r\n    $routeProvider\r\n        .when('/', {\r\n        templateUrl: 'app/partials/index.html',\r\n        controller: 'IndexCtrl',\r\n    })\r\n        .otherwise({\r\n        templateUrl: 'app/partials/error.html',\r\n        controller: 'ErrorCtrl'\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./app/routes/routes.ts?");

/***/ }),

/***/ "./node_modules/angular-route/angular-route.js":
/*!*****************************************************!*\
  !*** ./node_modules/angular-route/angular-route.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @license AngularJS v1.7.2\n * (c) 2010-2018 Google, Inc. http://angularjs.org\n * License: MIT\n */\n(function(window, angular) {'use strict';\n\n/* global shallowCopy: true */\n\n/**\n * Creates a shallow copy of an object, an array or a primitive.\n *\n * Assumes that there are no proto properties for objects.\n */\nfunction shallowCopy(src, dst) {\n  if (isArray(src)) {\n    dst = dst || [];\n\n    for (var i = 0, ii = src.length; i < ii; i++) {\n      dst[i] = src[i];\n    }\n  } else if (isObject(src)) {\n    dst = dst || {};\n\n    for (var key in src) {\n      if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {\n        dst[key] = src[key];\n      }\n    }\n  }\n\n  return dst || src;\n}\n\n/* global shallowCopy: false */\n\n// `isArray` and `isObject` are necessary for `shallowCopy()` (included via `src/shallowCopy.js`).\n// They are initialized inside the `$RouteProvider`, to ensure `window.angular` is available.\nvar isArray;\nvar isObject;\nvar isDefined;\nvar noop;\n\n/**\n * @ngdoc module\n * @name ngRoute\n * @description\n *\n * The `ngRoute` module provides routing and deeplinking services and directives for AngularJS apps.\n *\n * ## Example\n * See {@link ngRoute.$route#examples $route} for an example of configuring and using `ngRoute`.\n *\n */\n/* global -ngRouteModule */\nvar ngRouteModule = angular.\n  module('ngRoute', []).\n  info({ angularVersion: '1.7.2' }).\n  provider('$route', $RouteProvider).\n  // Ensure `$route` will be instantiated in time to capture the initial `$locationChangeSuccess`\n  // event (unless explicitly disabled). This is necessary in case `ngView` is included in an\n  // asynchronously loaded template.\n  run(instantiateRoute);\nvar $routeMinErr = angular.$$minErr('ngRoute');\nvar isEagerInstantiationEnabled;\n\n\n/**\n * @ngdoc provider\n * @name $routeProvider\n * @this\n *\n * @description\n *\n * Used for configuring routes.\n *\n * ## Example\n * See {@link ngRoute.$route#examples $route} for an example of configuring and using `ngRoute`.\n *\n * ## Dependencies\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n */\nfunction $RouteProvider() {\n  isArray = angular.isArray;\n  isObject = angular.isObject;\n  isDefined = angular.isDefined;\n  noop = angular.noop;\n\n  function inherit(parent, extra) {\n    return angular.extend(Object.create(parent), extra);\n  }\n\n  var routes = {};\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#when\n   *\n   * @param {string} path Route path (matched against `$location.path`). If `$location.path`\n   *    contains redundant trailing slash or is missing one, the route will still match and the\n   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the\n   *    route definition.\n   *\n   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up\n   *        to the next slash are matched and stored in `$routeParams` under the given `name`\n   *        when the route matches.\n   *    * `path` can contain named groups starting with a colon and ending with a star:\n   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`\n   *        when the route matches.\n   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.\n   *\n   *    For example, routes like `/color/:color/largecode/:largecode*\\/edit` will match\n   *    `/color/brown/largecode/code/with/slashes/edit` and extract:\n   *\n   *    * `color: brown`\n   *    * `largecode: code/with/slashes`.\n   *\n   *\n   * @param {Object} route Mapping information to be assigned to `$route.current` on route\n   *    match.\n   *\n   *    Object properties:\n   *\n   *    - `controller` – `{(string|Function)=}` – Controller fn that should be associated with\n   *      newly created scope or the name of a {@link angular.Module#controller registered\n   *      controller} if passed as a string.\n   *    - `controllerAs` – `{string=}` – An identifier name for a reference to the controller.\n   *      If present, the controller will be published to scope under the `controllerAs` name.\n   *    - `template` – `{(string|Function)=}` – html template as a string or a function that\n   *      returns an html template as a string which should be used by {@link\n   *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.\n   *      This property takes precedence over `templateUrl`.\n   *\n   *      If `template` is a function, it will be called with the following parameters:\n   *\n   *      - `{Array.<Object>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route\n   *\n   *      One of `template` or `templateUrl` is required.\n   *\n   *    - `templateUrl` – `{(string|Function)=}` – path or function that returns a path to an html\n   *      template that should be used by {@link ngRoute.directive:ngView ngView}.\n   *\n   *      If `templateUrl` is a function, it will be called with the following parameters:\n   *\n   *      - `{Array.<Object>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route\n   *\n   *      One of `templateUrl` or `template` is required.\n   *\n   *    - `resolve` - `{Object.<string, Function>=}` - An optional map of dependencies which should\n   *      be injected into the controller. If any of these dependencies are promises, the router\n   *      will wait for them all to be resolved or one to be rejected before the controller is\n   *      instantiated.\n   *      If all the promises are resolved successfully, the values of the resolved promises are\n   *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess} event is\n   *      fired. If any of the promises are rejected the\n   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event is fired.\n   *      For easier access to the resolved dependencies from the template, the `resolve` map will\n   *      be available on the scope of the route, under `$resolve` (by default) or a custom name\n   *      specified by the `resolveAs` property (see below). This can be particularly useful, when\n   *      working with {@link angular.Module#component components} as route templates.<br />\n   *      <div class=\"alert alert-warning\">\n   *        **Note:** If your scope already contains a property with this name, it will be hidden\n   *        or overwritten. Make sure, you specify an appropriate name for this property, that\n   *        does not collide with other properties on the scope.\n   *      </div>\n   *      The map object is:\n   *\n   *      - `key` – `{string}`: a name of a dependency to be injected into the controller.\n   *      - `factory` - `{string|Function}`: If `string` then it is an alias for a service.\n   *        Otherwise if function, then it is {@link auto.$injector#invoke injected}\n   *        and the return value is treated as the dependency. If the result is a promise, it is\n   *        resolved before its value is injected into the controller. Be aware that\n   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve\n   *        functions.  Use `$route.current.params` to access the new route parameters, instead.\n   *\n   *    - `resolveAs` - `{string=}` - The name under which the `resolve` map will be available on\n   *      the scope of the route. If omitted, defaults to `$resolve`.\n   *\n   *    - `redirectTo` – `{(string|Function)=}` – value to update\n   *      {@link ng.$location $location} path with and trigger route redirection.\n   *\n   *      If `redirectTo` is a function, it will be called with the following parameters:\n   *\n   *      - `{Object.<string>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route templateUrl.\n   *      - `{string}` - current `$location.path()`\n   *      - `{Object}` - current `$location.search()`\n   *\n   *      The custom `redirectTo` function is expected to return a string which will be used\n   *      to update `$location.url()`. If the function throws an error, no further processing will\n   *      take place and the {@link ngRoute.$route#$routeChangeError $routeChangeError} event will\n   *      be fired.\n   *\n   *      Routes that specify `redirectTo` will not have their controllers, template functions\n   *      or resolves called, the `$location` will be changed to the redirect url and route\n   *      processing will stop. The exception to this is if the `redirectTo` is a function that\n   *      returns `undefined`. In this case the route transition occurs as though there was no\n   *      redirection.\n   *\n   *    - `resolveRedirectTo` – `{Function=}` – a function that will (eventually) return the value\n   *      to update {@link ng.$location $location} URL with and trigger route redirection. In\n   *      contrast to `redirectTo`, dependencies can be injected into `resolveRedirectTo` and the\n   *      return value can be either a string or a promise that will be resolved to a string.\n   *\n   *      Similar to `redirectTo`, if the return value is `undefined` (or a promise that gets\n   *      resolved to `undefined`), no redirection takes place and the route transition occurs as\n   *      though there was no redirection.\n   *\n   *      If the function throws an error or the returned promise gets rejected, no further\n   *      processing will take place and the\n   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event will be fired.\n   *\n   *      `redirectTo` takes precedence over `resolveRedirectTo`, so specifying both on the same\n   *      route definition, will cause the latter to be ignored.\n   *\n   *    - `[reloadOnUrl=true]` - `{boolean=}` - reload route when any part of the URL changes\n   *      (inluding the path) even if the new URL maps to the same route.\n   *\n   *      If the option is set to `false` and the URL in the browser changes, but the new URL maps\n   *      to the same route, then a `$routeUpdate` event is broadcasted on the root scope (without\n   *      reloading the route).\n   *\n   *    - `[reloadOnSearch=true]` - `{boolean=}` - reload route when only `$location.search()`\n   *      or `$location.hash()` changes.\n   *\n   *      If the option is set to `false` and the URL in the browser changes, then a `$routeUpdate`\n   *      event is broadcasted on the root scope (without reloading the route).\n   *\n   *      <div class=\"alert alert-warning\">\n   *        **Note:** This option has no effect if `reloadOnUrl` is set to `false`.\n   *      </div>\n   *\n   *    - `[caseInsensitiveMatch=false]` - `{boolean=}` - match routes without being case sensitive\n   *\n   *      If the option is set to `true`, then the particular route can be matched without being\n   *      case sensitive\n   *\n   * @returns {Object} self\n   *\n   * @description\n   * Adds a new route definition to the `$route` service.\n   */\n  this.when = function(path, route) {\n    //copy original route object to preserve params inherited from proto chain\n    var routeCopy = shallowCopy(route);\n    if (angular.isUndefined(routeCopy.reloadOnUrl)) {\n      routeCopy.reloadOnUrl = true;\n    }\n    if (angular.isUndefined(routeCopy.reloadOnSearch)) {\n      routeCopy.reloadOnSearch = true;\n    }\n    if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {\n      routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;\n    }\n    routes[path] = angular.extend(\n      routeCopy,\n      path && pathRegExp(path, routeCopy)\n    );\n\n    // create redirection for trailing slashes\n    if (path) {\n      var redirectPath = (path[path.length - 1] === '/')\n            ? path.substr(0, path.length - 1)\n            : path + '/';\n\n      routes[redirectPath] = angular.extend(\n        {redirectTo: path},\n        pathRegExp(redirectPath, routeCopy)\n      );\n    }\n\n    return this;\n  };\n\n  /**\n   * @ngdoc property\n   * @name $routeProvider#caseInsensitiveMatch\n   * @description\n   *\n   * A boolean property indicating if routes defined\n   * using this provider should be matched using a case insensitive\n   * algorithm. Defaults to `false`.\n   */\n  this.caseInsensitiveMatch = false;\n\n   /**\n    * @param path {string} path\n    * @param opts {Object} options\n    * @return {?Object}\n    *\n    * @description\n    * Normalizes the given path, returning a regular expression\n    * and the original path.\n    *\n    * Inspired by pathRexp in visionmedia/express/lib/utils.js.\n    */\n  function pathRegExp(path, opts) {\n    var insensitive = opts.caseInsensitiveMatch,\n        ret = {\n          originalPath: path,\n          regexp: path\n        },\n        keys = ret.keys = [];\n\n    path = path\n      .replace(/([().])/g, '\\\\$1')\n      .replace(/(\\/)?:(\\w+)(\\*\\?|[?*])?/g, function(_, slash, key, option) {\n        var optional = (option === '?' || option === '*?') ? '?' : null;\n        var star = (option === '*' || option === '*?') ? '*' : null;\n        keys.push({ name: key, optional: !!optional });\n        slash = slash || '';\n        return ''\n          + (optional ? '' : slash)\n          + '(?:'\n          + (optional ? slash : '')\n          + (star && '(.+?)' || '([^/]+)')\n          + (optional || '')\n          + ')'\n          + (optional || '');\n      })\n      .replace(/([/$*])/g, '\\\\$1');\n\n    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');\n    return ret;\n  }\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#otherwise\n   *\n   * @description\n   * Sets route definition that will be used on route change when no other route definition\n   * is matched.\n   *\n   * @param {Object|string} params Mapping information to be assigned to `$route.current`.\n   * If called with a string, the value maps to `redirectTo`.\n   * @returns {Object} self\n   */\n  this.otherwise = function(params) {\n    if (typeof params === 'string') {\n      params = {redirectTo: params};\n    }\n    this.when(null, params);\n    return this;\n  };\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#eagerInstantiationEnabled\n   * @kind function\n   *\n   * @description\n   * Call this method as a setter to enable/disable eager instantiation of the\n   * {@link ngRoute.$route $route} service upon application bootstrap. You can also call it as a\n   * getter (i.e. without any arguments) to get the current value of the\n   * `eagerInstantiationEnabled` flag.\n   *\n   * Instantiating `$route` early is necessary for capturing the initial\n   * {@link ng.$location#$locationChangeStart $locationChangeStart} event and navigating to the\n   * appropriate route. Usually, `$route` is instantiated in time by the\n   * {@link ngRoute.ngView ngView} directive. Yet, in cases where `ngView` is included in an\n   * asynchronously loaded template (e.g. in another directive's template), the directive factory\n   * might not be called soon enough for `$route` to be instantiated _before_ the initial\n   * `$locationChangeSuccess` event is fired. Eager instantiation ensures that `$route` is always\n   * instantiated in time, regardless of when `ngView` will be loaded.\n   *\n   * The default value is true.\n   *\n   * **Note**:<br />\n   * You may want to disable the default behavior when unit-testing modules that depend on\n   * `ngRoute`, in order to avoid an unexpected request for the default route's template.\n   *\n   * @param {boolean=} enabled - If provided, update the internal `eagerInstantiationEnabled` flag.\n   *\n   * @returns {*} The current value of the `eagerInstantiationEnabled` flag if used as a getter or\n   *     itself (for chaining) if used as a setter.\n   */\n  isEagerInstantiationEnabled = true;\n  this.eagerInstantiationEnabled = function eagerInstantiationEnabled(enabled) {\n    if (isDefined(enabled)) {\n      isEagerInstantiationEnabled = enabled;\n      return this;\n    }\n\n    return isEagerInstantiationEnabled;\n  };\n\n\n  this.$get = ['$rootScope',\n               '$location',\n               '$routeParams',\n               '$q',\n               '$injector',\n               '$templateRequest',\n               '$sce',\n               '$browser',\n      function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce, $browser) {\n\n    /**\n     * @ngdoc service\n     * @name $route\n     * @requires $location\n     * @requires $routeParams\n     *\n     * @property {Object} current Reference to the current route definition.\n     * The route definition contains:\n     *\n     *   - `controller`: The controller constructor as defined in the route definition.\n     *   - `locals`: A map of locals which is used by {@link ng.$controller $controller} service for\n     *     controller instantiation. The `locals` contain\n     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:\n     *\n     *     - `$scope` - The current route scope.\n     *     - `$template` - The current route template HTML.\n     *\n     *     The `locals` will be assigned to the route scope's `$resolve` property. You can override\n     *     the property name, using `resolveAs` in the route definition. See\n     *     {@link ngRoute.$routeProvider $routeProvider} for more info.\n     *\n     * @property {Object} routes Object with all route configuration Objects as its properties.\n     *\n     * @description\n     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).\n     * It watches `$location.url()` and tries to map the path to an existing route definition.\n     *\n     * Requires the {@link ngRoute `ngRoute`} module to be installed.\n     *\n     * You can define routes through {@link ngRoute.$routeProvider $routeProvider}'s API.\n     *\n     * The `$route` service is typically used in conjunction with the\n     * {@link ngRoute.directive:ngView `ngView`} directive and the\n     * {@link ngRoute.$routeParams `$routeParams`} service.\n     *\n     * @example\n     * This example shows how changing the URL hash causes the `$route` to match a route against the\n     * URL, and the `ngView` pulls in the partial.\n     *\n     * <example name=\"$route-service\" module=\"ngRouteExample\"\n     *          deps=\"angular-route.js\" fixBase=\"true\">\n     *   <file name=\"index.html\">\n     *     <div ng-controller=\"MainController\">\n     *       Choose:\n     *       <a href=\"Book/Moby\">Moby</a> |\n     *       <a href=\"Book/Moby/ch/1\">Moby: Ch1</a> |\n     *       <a href=\"Book/Gatsby\">Gatsby</a> |\n     *       <a href=\"Book/Gatsby/ch/4?key=value\">Gatsby: Ch4</a> |\n     *       <a href=\"Book/Scarlet\">Scarlet Letter</a><br/>\n     *\n     *       <div ng-view></div>\n     *\n     *       <hr />\n     *\n     *       <pre>$location.path() = {{$location.path()}}</pre>\n     *       <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>\n     *       <pre>$route.current.params = {{$route.current.params}}</pre>\n     *       <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>\n     *       <pre>$routeParams = {{$routeParams}}</pre>\n     *     </div>\n     *   </file>\n     *\n     *   <file name=\"book.html\">\n     *     controller: {{name}}<br />\n     *     Book Id: {{params.bookId}}<br />\n     *   </file>\n     *\n     *   <file name=\"chapter.html\">\n     *     controller: {{name}}<br />\n     *     Book Id: {{params.bookId}}<br />\n     *     Chapter Id: {{params.chapterId}}\n     *   </file>\n     *\n     *   <file name=\"script.js\">\n     *     angular.module('ngRouteExample', ['ngRoute'])\n     *\n     *      .controller('MainController', function($scope, $route, $routeParams, $location) {\n     *          $scope.$route = $route;\n     *          $scope.$location = $location;\n     *          $scope.$routeParams = $routeParams;\n     *      })\n     *\n     *      .controller('BookController', function($scope, $routeParams) {\n     *          $scope.name = 'BookController';\n     *          $scope.params = $routeParams;\n     *      })\n     *\n     *      .controller('ChapterController', function($scope, $routeParams) {\n     *          $scope.name = 'ChapterController';\n     *          $scope.params = $routeParams;\n     *      })\n     *\n     *     .config(function($routeProvider, $locationProvider) {\n     *       $routeProvider\n     *        .when('/Book/:bookId', {\n     *         templateUrl: 'book.html',\n     *         controller: 'BookController',\n     *         resolve: {\n     *           // I will cause a 1 second delay\n     *           delay: function($q, $timeout) {\n     *             var delay = $q.defer();\n     *             $timeout(delay.resolve, 1000);\n     *             return delay.promise;\n     *           }\n     *         }\n     *       })\n     *       .when('/Book/:bookId/ch/:chapterId', {\n     *         templateUrl: 'chapter.html',\n     *         controller: 'ChapterController'\n     *       });\n     *\n     *       // configure html5 to get links working on jsfiddle\n     *       $locationProvider.html5Mode(true);\n     *     });\n     *\n     *   </file>\n     *\n     *   <file name=\"protractor.js\" type=\"protractor\">\n     *     it('should load and compile correct template', function() {\n     *       element(by.linkText('Moby: Ch1')).click();\n     *       var content = element(by.css('[ng-view]')).getText();\n     *       expect(content).toMatch(/controller: ChapterController/);\n     *       expect(content).toMatch(/Book Id: Moby/);\n     *       expect(content).toMatch(/Chapter Id: 1/);\n     *\n     *       element(by.partialLinkText('Scarlet')).click();\n     *\n     *       content = element(by.css('[ng-view]')).getText();\n     *       expect(content).toMatch(/controller: BookController/);\n     *       expect(content).toMatch(/Book Id: Scarlet/);\n     *     });\n     *   </file>\n     * </example>\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeStart\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted before a route change. At this  point the route services starts\n     * resolving all of the dependencies needed for the route change to occur.\n     * Typically this involves fetching the view template as well as any dependencies\n     * defined in `resolve` route property. Once  all of the dependencies are resolved\n     * `$routeChangeSuccess` is fired.\n     *\n     * The route change (and the `$location` change that triggered it) can be prevented\n     * by calling `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on}\n     * for more details about event object.\n     *\n     * @param {Object} angularEvent Synthetic event object.\n     * @param {Route} next Future route information.\n     * @param {Route} current Current route information.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeSuccess\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted after a route change has happened successfully.\n     * The `resolve` dependencies are now available in the `current.locals` property.\n     *\n     * {@link ngRoute.directive:ngView ngView} listens for the directive\n     * to instantiate the controller and render the view.\n     *\n     * @param {Object} angularEvent Synthetic event object.\n     * @param {Route} current Current route information.\n     * @param {Route|Undefined} previous Previous route information, or undefined if current is\n     * first route entered.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeError\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted if a redirection function fails or any redirection or resolve promises are\n     * rejected.\n     *\n     * @param {Object} angularEvent Synthetic event object\n     * @param {Route} current Current route information.\n     * @param {Route} previous Previous route information.\n     * @param {Route} rejection The thrown error or the rejection reason of the promise. Usually\n     * the rejection reason is the error that caused the promise to get rejected.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeUpdate\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted if the same instance of a route (including template, controller instance,\n     * resolved dependencies, etc.) is being reused. This can happen if either `reloadOnSearch` or\n     * `reloadOnUrl` has been set to `false`.\n     *\n     * @param {Object} angularEvent Synthetic event object\n     * @param {Route} current Current/previous route information.\n     */\n\n    var forceReload = false,\n        preparedRoute,\n        preparedRouteIsUpdateOnly,\n        $route = {\n          routes: routes,\n\n          /**\n           * @ngdoc method\n           * @name $route#reload\n           *\n           * @description\n           * Causes `$route` service to reload the current route even if\n           * {@link ng.$location $location} hasn't changed.\n           *\n           * As a result of that, {@link ngRoute.directive:ngView ngView}\n           * creates new scope and reinstantiates the controller.\n           */\n          reload: function() {\n            forceReload = true;\n\n            var fakeLocationEvent = {\n              defaultPrevented: false,\n              preventDefault: function fakePreventDefault() {\n                this.defaultPrevented = true;\n                forceReload = false;\n              }\n            };\n\n            $rootScope.$evalAsync(function() {\n              prepareRoute(fakeLocationEvent);\n              if (!fakeLocationEvent.defaultPrevented) commitRoute();\n            });\n          },\n\n          /**\n           * @ngdoc method\n           * @name $route#updateParams\n           *\n           * @description\n           * Causes `$route` service to update the current URL, replacing\n           * current route parameters with those specified in `newParams`.\n           * Provided property names that match the route's path segment\n           * definitions will be interpolated into the location's path, while\n           * remaining properties will be treated as query params.\n           *\n           * @param {!Object<string, string>} newParams mapping of URL parameter names to values\n           */\n          updateParams: function(newParams) {\n            if (this.current && this.current.$$route) {\n              newParams = angular.extend({}, this.current.params, newParams);\n              $location.path(interpolate(this.current.$$route.originalPath, newParams));\n              // interpolate modifies newParams, only query params are left\n              $location.search(newParams);\n            } else {\n              throw $routeMinErr('norout', 'Tried updating route with no current route');\n            }\n          }\n        };\n\n    $rootScope.$on('$locationChangeStart', prepareRoute);\n    $rootScope.$on('$locationChangeSuccess', commitRoute);\n\n    return $route;\n\n    /////////////////////////////////////////////////////\n\n    /**\n     * @param on {string} current url\n     * @param route {Object} route regexp to match the url against\n     * @return {?Object}\n     *\n     * @description\n     * Check if the route matches the current url.\n     *\n     * Inspired by match in\n     * visionmedia/express/lib/router/router.js.\n     */\n    function switchRouteMatcher(on, route) {\n      var keys = route.keys,\n          params = {};\n\n      if (!route.regexp) return null;\n\n      var m = route.regexp.exec(on);\n      if (!m) return null;\n\n      for (var i = 1, len = m.length; i < len; ++i) {\n        var key = keys[i - 1];\n\n        var val = m[i];\n\n        if (key && val) {\n          params[key.name] = val;\n        }\n      }\n      return params;\n    }\n\n    function prepareRoute($locationEvent) {\n      var lastRoute = $route.current;\n\n      preparedRoute = parseRoute();\n      preparedRouteIsUpdateOnly = isNavigationUpdateOnly(preparedRoute, lastRoute);\n\n      if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {\n        if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {\n          if ($locationEvent) {\n            $locationEvent.preventDefault();\n          }\n        }\n      }\n    }\n\n    function commitRoute() {\n      var lastRoute = $route.current;\n      var nextRoute = preparedRoute;\n\n      if (preparedRouteIsUpdateOnly) {\n        lastRoute.params = nextRoute.params;\n        angular.copy(lastRoute.params, $routeParams);\n        $rootScope.$broadcast('$routeUpdate', lastRoute);\n      } else if (nextRoute || lastRoute) {\n        forceReload = false;\n        $route.current = nextRoute;\n\n        var nextRoutePromise = $q.resolve(nextRoute);\n\n        $browser.$$incOutstandingRequestCount();\n\n        nextRoutePromise.\n          then(getRedirectionData).\n          then(handlePossibleRedirection).\n          then(function(keepProcessingRoute) {\n            return keepProcessingRoute && nextRoutePromise.\n              then(resolveLocals).\n              then(function(locals) {\n                // after route change\n                if (nextRoute === $route.current) {\n                  if (nextRoute) {\n                    nextRoute.locals = locals;\n                    angular.copy(nextRoute.params, $routeParams);\n                  }\n                  $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);\n                }\n              });\n          }).catch(function(error) {\n            if (nextRoute === $route.current) {\n              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);\n            }\n          }).finally(function() {\n            // Because `commitRoute()` is called from a `$rootScope.$evalAsync` block (see\n            // `$locationWatch`), this `$$completeOutstandingRequest()` call will not cause\n            // `outstandingRequestCount` to hit zero.  This is important in case we are redirecting\n            // to a new route which also requires some asynchronous work.\n\n            $browser.$$completeOutstandingRequest(noop);\n          });\n      }\n    }\n\n    function getRedirectionData(route) {\n      var data = {\n        route: route,\n        hasRedirection: false\n      };\n\n      if (route) {\n        if (route.redirectTo) {\n          if (angular.isString(route.redirectTo)) {\n            data.path = interpolate(route.redirectTo, route.params);\n            data.search = route.params;\n            data.hasRedirection = true;\n          } else {\n            var oldPath = $location.path();\n            var oldSearch = $location.search();\n            var newUrl = route.redirectTo(route.pathParams, oldPath, oldSearch);\n\n            if (angular.isDefined(newUrl)) {\n              data.url = newUrl;\n              data.hasRedirection = true;\n            }\n          }\n        } else if (route.resolveRedirectTo) {\n          return $q.\n            resolve($injector.invoke(route.resolveRedirectTo)).\n            then(function(newUrl) {\n              if (angular.isDefined(newUrl)) {\n                data.url = newUrl;\n                data.hasRedirection = true;\n              }\n\n              return data;\n            });\n        }\n      }\n\n      return data;\n    }\n\n    function handlePossibleRedirection(data) {\n      var keepProcessingRoute = true;\n\n      if (data.route !== $route.current) {\n        keepProcessingRoute = false;\n      } else if (data.hasRedirection) {\n        var oldUrl = $location.url();\n        var newUrl = data.url;\n\n        if (newUrl) {\n          $location.\n            url(newUrl).\n            replace();\n        } else {\n          newUrl = $location.\n            path(data.path).\n            search(data.search).\n            replace().\n            url();\n        }\n\n        if (newUrl !== oldUrl) {\n          // Exit out and don't process current next value,\n          // wait for next location change from redirect\n          keepProcessingRoute = false;\n        }\n      }\n\n      return keepProcessingRoute;\n    }\n\n    function resolveLocals(route) {\n      if (route) {\n        var locals = angular.extend({}, route.resolve);\n        angular.forEach(locals, function(value, key) {\n          locals[key] = angular.isString(value) ?\n              $injector.get(value) :\n              $injector.invoke(value, null, null, key);\n        });\n        var template = getTemplateFor(route);\n        if (angular.isDefined(template)) {\n          locals['$template'] = template;\n        }\n        return $q.all(locals);\n      }\n    }\n\n    function getTemplateFor(route) {\n      var template, templateUrl;\n      if (angular.isDefined(template = route.template)) {\n        if (angular.isFunction(template)) {\n          template = template(route.params);\n        }\n      } else if (angular.isDefined(templateUrl = route.templateUrl)) {\n        if (angular.isFunction(templateUrl)) {\n          templateUrl = templateUrl(route.params);\n        }\n        if (angular.isDefined(templateUrl)) {\n          route.loadedTemplateUrl = $sce.valueOf(templateUrl);\n          template = $templateRequest(templateUrl);\n        }\n      }\n      return template;\n    }\n\n    /**\n     * @returns {Object} the current active route, by matching it against the URL\n     */\n    function parseRoute() {\n      // Match a route\n      var params, match;\n      angular.forEach(routes, function(route, path) {\n        if (!match && (params = switchRouteMatcher($location.path(), route))) {\n          match = inherit(route, {\n            params: angular.extend({}, $location.search(), params),\n            pathParams: params});\n          match.$$route = route;\n        }\n      });\n      // No route matched; fallback to \"otherwise\" route\n      return match || routes[null] && inherit(routes[null], {params: {}, pathParams:{}});\n    }\n\n    /**\n     * @param {Object} newRoute - The new route configuration (as returned by `parseRoute()`).\n     * @param {Object} oldRoute - The previous route configuration (as returned by `parseRoute()`).\n     * @returns {boolean} Whether this is an \"update-only\" navigation, i.e. the URL maps to the same\n     *                    route and it can be reused (based on the config and the type of change).\n     */\n    function isNavigationUpdateOnly(newRoute, oldRoute) {\n      // IF this is not a forced reload\n      return !forceReload\n          // AND both `newRoute`/`oldRoute` are defined\n          && newRoute && oldRoute\n          // AND they map to the same Route Definition Object\n          && (newRoute.$$route === oldRoute.$$route)\n          // AND `reloadOnUrl` is disabled\n          && (!newRoute.reloadOnUrl\n              // OR `reloadOnSearch` is disabled\n              || (!newRoute.reloadOnSearch\n                  // AND both routes have the same path params\n                  && angular.equals(newRoute.pathParams, oldRoute.pathParams)\n              )\n          );\n    }\n\n    /**\n     * @returns {string} interpolation of the redirect path with the parameters\n     */\n    function interpolate(string, params) {\n      var result = [];\n      angular.forEach((string || '').split(':'), function(segment, i) {\n        if (i === 0) {\n          result.push(segment);\n        } else {\n          var segmentMatch = segment.match(/(\\w+)(?:[?*])?(.*)/);\n          var key = segmentMatch[1];\n          result.push(params[key]);\n          result.push(segmentMatch[2] || '');\n          delete params[key];\n        }\n      });\n      return result.join('');\n    }\n  }];\n}\n\ninstantiateRoute.$inject = ['$injector'];\nfunction instantiateRoute($injector) {\n  if (isEagerInstantiationEnabled) {\n    // Instantiate `$route`\n    $injector.get('$route');\n  }\n}\n\nngRouteModule.provider('$routeParams', $RouteParamsProvider);\n\n\n/**\n * @ngdoc service\n * @name $routeParams\n * @requires $route\n * @this\n *\n * @description\n * The `$routeParams` service allows you to retrieve the current set of route parameters.\n *\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n *\n * The route parameters are a combination of {@link ng.$location `$location`}'s\n * {@link ng.$location#search `search()`} and {@link ng.$location#path `path()`}.\n * The `path` parameters are extracted when the {@link ngRoute.$route `$route`} path is matched.\n *\n * In case of parameter name collision, `path` params take precedence over `search` params.\n *\n * The service guarantees that the identity of the `$routeParams` object will remain unchanged\n * (but its properties will likely change) even when a route change occurs.\n *\n * Note that the `$routeParams` are only updated *after* a route change completes successfully.\n * This means that you cannot rely on `$routeParams` being correct in route resolve functions.\n * Instead you can use `$route.current.params` to access the new route's parameters.\n *\n * @example\n * ```js\n *  // Given:\n *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby\n *  // Route: /Chapter/:chapterId/Section/:sectionId\n *  //\n *  // Then\n *  $routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}\n * ```\n */\nfunction $RouteParamsProvider() {\n  this.$get = function() { return {}; };\n}\n\nngRouteModule.directive('ngView', ngViewFactory);\nngRouteModule.directive('ngView', ngViewFillContentFactory);\n\n\n/**\n * @ngdoc directive\n * @name ngView\n * @restrict ECA\n *\n * @description\n * `ngView` is a directive that complements the {@link ngRoute.$route $route} service by\n * including the rendered template of the current route into the main layout (`index.html`) file.\n * Every time the current route changes, the included view changes with it according to the\n * configuration of the `$route` service.\n *\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n *\n * @animations\n * | Animation                        | Occurs                              |\n * |----------------------------------|-------------------------------------|\n * | {@link ng.$animate#enter enter}  | when the new element is inserted to the DOM |\n * | {@link ng.$animate#leave leave}  | when the old element is removed from to the DOM  |\n *\n * The enter and leave animation occur concurrently.\n *\n * @scope\n * @priority 400\n * @param {string=} onload Expression to evaluate whenever the view updates.\n *\n * @param {string=} autoscroll Whether `ngView` should call {@link ng.$anchorScroll\n *                  $anchorScroll} to scroll the viewport after the view is updated.\n *\n *                  - If the attribute is not set, disable scrolling.\n *                  - If the attribute is set without value, enable scrolling.\n *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated\n *                    as an expression yields a truthy value.\n * @example\n    <example name=\"ngView-directive\" module=\"ngViewExample\"\n             deps=\"angular-route.js;angular-animate.js\"\n             animations=\"true\" fixBase=\"true\">\n      <file name=\"index.html\">\n        <div ng-controller=\"MainCtrl as main\">\n          Choose:\n          <a href=\"Book/Moby\">Moby</a> |\n          <a href=\"Book/Moby/ch/1\">Moby: Ch1</a> |\n          <a href=\"Book/Gatsby\">Gatsby</a> |\n          <a href=\"Book/Gatsby/ch/4?key=value\">Gatsby: Ch4</a> |\n          <a href=\"Book/Scarlet\">Scarlet Letter</a><br/>\n\n          <div class=\"view-animate-container\">\n            <div ng-view class=\"view-animate\"></div>\n          </div>\n          <hr />\n\n          <pre>$location.path() = {{main.$location.path()}}</pre>\n          <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>\n          <pre>$route.current.params = {{main.$route.current.params}}</pre>\n          <pre>$routeParams = {{main.$routeParams}}</pre>\n        </div>\n      </file>\n\n      <file name=\"book.html\">\n        <div>\n          controller: {{book.name}}<br />\n          Book Id: {{book.params.bookId}}<br />\n        </div>\n      </file>\n\n      <file name=\"chapter.html\">\n        <div>\n          controller: {{chapter.name}}<br />\n          Book Id: {{chapter.params.bookId}}<br />\n          Chapter Id: {{chapter.params.chapterId}}\n        </div>\n      </file>\n\n      <file name=\"animations.css\">\n        .view-animate-container {\n          position:relative;\n          height:100px!important;\n          background:white;\n          border:1px solid black;\n          height:40px;\n          overflow:hidden;\n        }\n\n        .view-animate {\n          padding:10px;\n        }\n\n        .view-animate.ng-enter, .view-animate.ng-leave {\n          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;\n\n          display:block;\n          width:100%;\n          border-left:1px solid black;\n\n          position:absolute;\n          top:0;\n          left:0;\n          right:0;\n          bottom:0;\n          padding:10px;\n        }\n\n        .view-animate.ng-enter {\n          left:100%;\n        }\n        .view-animate.ng-enter.ng-enter-active {\n          left:0;\n        }\n        .view-animate.ng-leave.ng-leave-active {\n          left:-100%;\n        }\n      </file>\n\n      <file name=\"script.js\">\n        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])\n          .config(['$routeProvider', '$locationProvider',\n            function($routeProvider, $locationProvider) {\n              $routeProvider\n                .when('/Book/:bookId', {\n                  templateUrl: 'book.html',\n                  controller: 'BookCtrl',\n                  controllerAs: 'book'\n                })\n                .when('/Book/:bookId/ch/:chapterId', {\n                  templateUrl: 'chapter.html',\n                  controller: 'ChapterCtrl',\n                  controllerAs: 'chapter'\n                });\n\n              $locationProvider.html5Mode(true);\n          }])\n          .controller('MainCtrl', ['$route', '$routeParams', '$location',\n            function MainCtrl($route, $routeParams, $location) {\n              this.$route = $route;\n              this.$location = $location;\n              this.$routeParams = $routeParams;\n          }])\n          .controller('BookCtrl', ['$routeParams', function BookCtrl($routeParams) {\n            this.name = 'BookCtrl';\n            this.params = $routeParams;\n          }])\n          .controller('ChapterCtrl', ['$routeParams', function ChapterCtrl($routeParams) {\n            this.name = 'ChapterCtrl';\n            this.params = $routeParams;\n          }]);\n\n      </file>\n\n      <file name=\"protractor.js\" type=\"protractor\">\n        it('should load and compile correct template', function() {\n          element(by.linkText('Moby: Ch1')).click();\n          var content = element(by.css('[ng-view]')).getText();\n          expect(content).toMatch(/controller: ChapterCtrl/);\n          expect(content).toMatch(/Book Id: Moby/);\n          expect(content).toMatch(/Chapter Id: 1/);\n\n          element(by.partialLinkText('Scarlet')).click();\n\n          content = element(by.css('[ng-view]')).getText();\n          expect(content).toMatch(/controller: BookCtrl/);\n          expect(content).toMatch(/Book Id: Scarlet/);\n        });\n      </file>\n    </example>\n */\n\n\n/**\n * @ngdoc event\n * @name ngView#$viewContentLoaded\n * @eventType emit on the current ngView scope\n * @description\n * Emitted every time the ngView content is reloaded.\n */\nngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];\nfunction ngViewFactory($route, $anchorScroll, $animate) {\n  return {\n    restrict: 'ECA',\n    terminal: true,\n    priority: 400,\n    transclude: 'element',\n    link: function(scope, $element, attr, ctrl, $transclude) {\n        var currentScope,\n            currentElement,\n            previousLeaveAnimation,\n            autoScrollExp = attr.autoscroll,\n            onloadExp = attr.onload || '';\n\n        scope.$on('$routeChangeSuccess', update);\n        update();\n\n        function cleanupLastView() {\n          if (previousLeaveAnimation) {\n            $animate.cancel(previousLeaveAnimation);\n            previousLeaveAnimation = null;\n          }\n\n          if (currentScope) {\n            currentScope.$destroy();\n            currentScope = null;\n          }\n          if (currentElement) {\n            previousLeaveAnimation = $animate.leave(currentElement);\n            previousLeaveAnimation.done(function(response) {\n              if (response !== false) previousLeaveAnimation = null;\n            });\n            currentElement = null;\n          }\n        }\n\n        function update() {\n          var locals = $route.current && $route.current.locals,\n              template = locals && locals.$template;\n\n          if (angular.isDefined(template)) {\n            var newScope = scope.$new();\n            var current = $route.current;\n\n            // Note: This will also link all children of ng-view that were contained in the original\n            // html. If that content contains controllers, ... they could pollute/change the scope.\n            // However, using ng-view on an element with additional content does not make sense...\n            // Note: We can't remove them in the cloneAttchFn of $transclude as that\n            // function is called before linking the content, which would apply child\n            // directives to non existing elements.\n            var clone = $transclude(newScope, function(clone) {\n              $animate.enter(clone, null, currentElement || $element).done(function onNgViewEnter(response) {\n                if (response !== false && angular.isDefined(autoScrollExp)\n                  && (!autoScrollExp || scope.$eval(autoScrollExp))) {\n                  $anchorScroll();\n                }\n              });\n              cleanupLastView();\n            });\n\n            currentElement = clone;\n            currentScope = current.scope = newScope;\n            currentScope.$emit('$viewContentLoaded');\n            currentScope.$eval(onloadExp);\n          } else {\n            cleanupLastView();\n          }\n        }\n    }\n  };\n}\n\n// This directive is called during the $transclude call of the first `ngView` directive.\n// It will replace and compile the content of the element with the loaded template.\n// We need this directive so that the element content is already filled when\n// the link function of another directive on the same element as ngView\n// is called.\nngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];\nfunction ngViewFillContentFactory($compile, $controller, $route) {\n  return {\n    restrict: 'ECA',\n    priority: -400,\n    link: function(scope, $element) {\n      var current = $route.current,\n          locals = current.locals;\n\n      $element.html(locals.$template);\n\n      var link = $compile($element.contents());\n\n      if (current.controller) {\n        locals.$scope = scope;\n        var controller = $controller(current.controller, locals);\n        if (current.controllerAs) {\n          scope[current.controllerAs] = controller;\n        }\n        $element.data('$ngControllerController', controller);\n        $element.children().data('$ngControllerController', controller);\n      }\n      scope[current.resolveAs || '$resolve'] = locals;\n\n      link(scope);\n    }\n  };\n}\n\n\n})(window, window.angular);\n\n\n//# sourceURL=webpack:///./node_modules/angular-route/angular-route.js?");

/***/ }),

/***/ "./node_modules/angular-route/index.js":
/*!*********************************************!*\
  !*** ./node_modules/angular-route/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./angular-route */ \"./node_modules/angular-route/angular-route.js\");\nmodule.exports = 'ngRoute';\n\n\n//# sourceURL=webpack:///./node_modules/angular-route/index.js?");

/***/ }),

/***/ "./node_modules/angular/angular.js":
/*!*****************************************!*\
  !*** ./node_modules/angular/angular.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/***/ }),

/***/ "./node_modules/angular/index.js":
/*!***************************************!*\
  !*** ./node_modules/angular/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./angular */ \"./node_modules/angular/angular.js\");\nmodule.exports = angular;\n\n\n//# sourceURL=webpack:///./node_modules/angular/index.js?");

/***/ })

/******/ });