# Promise 系列

## 先来个小工具 wait

动机好像是很多语言里都有一个类似的 sleep 函数专门用来阻塞线程？

```js
// MDN中的wait函数，意思是专门搞一个用于等待的promise，妙啊
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

// sleep函数,setTimeout实现
const sleep = (fun, time) => {
  setTimeout(fun(), time);
};
sleep(fun, 2000);

// sleep函数promise实现
const sleep2 = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
sleep2(2000).then(fn);

// sleep函数async实现
async function sleep3(time) {
  await sleep2(time);
  fun();
}
sleep3(2000);
```

## 经久不衰的 promise.all

从 MDN 文档看，promise.all 接收一个可迭代的容器（可以当作是数组），返回一个新的 promise 实例
数组中每个 promise 实例都 resolve 才 resolve，有一个 reject 就全部 reject

```js
Promise.Myall = function (promiseArr) {
  let resultArr = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      // 统一resolve一下保证全是promise
      Promise.resolve(item).then((res) => {
        resultArr[index] = res;
        count++;
        // 全部resolve就整体resolve
        if (count === promiseArr.length) {
          resolve(resultArr);
        }
      });
    });
  });
};
```

## promise.race

输入输出是类似的
逻辑上 race 中只要有任意 promise 实例 settle，就返回最快 settle 的

```js
Promise.Myrace = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item) => {
      // 有任意promise项resolve或者reject都直接返回
      Promise.resolve(item).then(resolve).catch(reject);
    });
  });
};
```

## promise.any

和 any 是一对，只要有一个 promise resolve 就整体 resolve，且返回最快 resolve 的，全部 reject 才 reject

```js
Promise.Myany = function (promiseArr) {
  let Arr = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      Promise.resolve(item).then(resolve, (err) => {
        // 这里reject结果需要具体一点标明状态
        Arr[index] = { status: "rejected", val: err };
        count++;
        if (count === promiseArr.length) {
          reject(new Error("all promise rejected"));
        }
      });
    });
  });
};
```

## promise.allSettled 我全都要

这个逻辑就是等所有 promise 都 settle 了再全部返回结果

```js
Promise.MyallSettled = function (promiseArr) {
  let resultArr = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      Promise.resolve(item)
        .then((resolve) => {
          // 最大的区别就是都要具体写状态
          resultArr[index] = { status: "fulfilled", val: resolve };
          count++;
          if (count === promiseArr.length) {
            resolve(resultArr);
          }
        })
        .catch((err) => {
          resultArr[index] = { status: "rejected", val: err };
          count++;
          if (count === promiseArr.length) {
            resolve(resultArr);
          }
        });
    });
  });
};
```

## resolve 和 reject

resolve 如果不涉及值的转换，那么基本上就是直接 resolve 一下，涉及值转换的话，主要区分 promise 实例和其他
reject 就更单纯了，直接 reject 包装一层完事

```js
Promise.MyResolve = function (value) {
  // 以下情况为promise实例，直接返回
  if (value && typeof value === "object" && value instanceof Promise) {
    return value;
  }
  // 其他值需要手动包装一下
  return new Promise((resolve) => {
    resolve(value);
  });
};

Promise.MyReject = function (value) {
  return new Promise(_, (reject) => {
    reject(value);
  });
};
```
