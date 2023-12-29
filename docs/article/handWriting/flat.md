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

## 循环实现

```js
function loopFlat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```

## 更繁琐的一般写法

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
