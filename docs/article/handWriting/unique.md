# 数组去重

## 直接 set

似乎无法去重引用类型

```js
function setUnique(arr) {
  return [...new Set(arr)];
}
// 生成新数组也可以用专门的from
function setUnique2(arr) {
  return Array.from(new Set(arr));
}
```

## 使用 map

```js
function mapUnique(arr) {
  let result = new Map();
  return arr.filter((item) => {
    if (!result.has(item)) {
      result.push(item);
    }
  });
}
```

## 使用 obj 键值对

```js
function objUnique(arr) {
  let obj = {};
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!obj.hasOwnProperty([arr[i]])) {
      obj[arr[i]] = i;
      result.push(arr[i]);
    }
  }
  return result;
}
```

## 使用 indexOf

```js
function indexOfUnique(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i] === -1)) {
      result.push(arr[i]);
    }
  }
  // arr.forEach((item) => {
  //   if (result.indexOf(item) === -1) {
  //     result.push(item);
  //   }
  // });
  return result;
}
```

## 使用 filter+indexOf

```js
function filterUnique(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
```

## 使用 includes

```js
function includesUnique(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}
```

## 使用 reduce

这个看别人写的感觉啰嗦，自己暂时没啥想法，先空着

## 经典老番 嗯循环

我怎么觉得这个写循环最难理解？

```js
function loopUnique(arr) {
  let result = [];
  let isRepeated;

  for (let i = 0; i < arr.length; i++) {
    isRepeated = false;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        isRepeated = true;
        break;
      }
    }
    if (!isRepeated) {
      result.push(arr[i]);
    }
  }
  return result;
}
```
