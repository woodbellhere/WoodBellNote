# 数组扁平化

## api 解法

```js
[].flat(Infinity);
```

## 经典递归

```js
function recurFlat(arr) {
  return arr.reduce((pre, cur) => {
    Array.isArray(cur) ? [...pre, ...recurFlat(cur)] : [...pre, cur];
  }, []);
}
```

## some 实现

这个其实挺巧妙，但目前只能巧妙一层

```js
function loopFlat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```

## 一般循环

```js
let result = [];

function Myflat(arr) {
  for (let i = 0; i < arr.result; i++) {
    if (Array.isArray(arr[i])) {
      Myflat(arr[i]);
    } else {
      result.push(arr[i]);
    }
  }
}
```
