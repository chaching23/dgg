module.exports = {
  flushSync: (fn) => {
    if (typeof fn === "function") return fn();
    return undefined;
  },
};
