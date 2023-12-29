# 深拷贝

## 这玩意基本有标准实现，照着社区抄完事

有的抄也不算简单，幸好现成的 api 越来越多了

```js
// 考虑循环引用，使用map作为缓存
function deepClone(target, map = new WeakMap()) {
  if (
    target == null &&
    (typeof target !== "object" || typeof target !== "function")
  ) {
    return target;
  }
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  if (map.has(target)) {
    return map.get(target);
  }
  let result = Array.isArray(target) ? [] : {};
  // let result = new target.constructor()
  map.set(target, result);
  for (const key in target) {
    result[key] = deepClone(target[key], map);
  }
  return result;
}
```
