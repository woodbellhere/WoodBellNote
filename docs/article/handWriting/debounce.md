# debounce 防抖

- 事件被触发时等待一段时间才执行回调
- 也就是说，时间被密集/频繁触发时，函数执行会整体忽略这些触发，延迟执行
- 只认一段时间内的最后一次

## 防抖场景

- 输入框的频繁输入，搜索或者表单提交
  - 搜索框实际上会发送网络请求
- 频繁点击按钮
- 监听浏览器滚动
- 用户缩放浏览器的 resize

## 实现防抖

- 应该说核心实现就是控制触发时间
- 具体实现就是每次触发时检查并取消原有计时器，然后重新设置新定时器
- 就算控制触发时间了

```js
function debounce(fn, delay) {
  // 这个timer作为一个定时器占位符
  let timer = null;
  // 但核心实现会推迟每次触发的函数，而不是推迟触发本身，所以需要每次取消再重设定时器
  const _debounce = () => {
    if (timer) {
      clearTimeout(timer);
    }
    // 核心就这两段，推迟函数执行
    timer = setTimeout(() => {
      fn();
      // 保险的复位操作
      timer = null;
    }, delay);
  };
  return _debounce;
}

let counter = 1;
inputEl.addEventListener(
  "input",
  debounce(function () {
    console.log(`发送请求${counter++}`);
  })
);
```

## 考虑 this 和原有参数的的写法

```js
function debounce(fn, delay) {
  let timer = null;
  // 箭头函数的this表现不符合预期，改成普通表达式
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    // 这里利用箭头函数找外层的this，也就是——debounce的this，也就是事件绑定元素的this
    timer = setTimeout(() => {
      // 这里绑定的this就是事件元素的
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
  return _debounce;
}
```

## 考虑防抖的取消

```js
function debounce(fn, delay) {
  let timer = null;
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
  // 就是新增加一个取消函数，内容是清除防抖操作-也就是定时器
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
  };

  return _debounce;
}

let counter = 1;
const debounceFn = debounce(function (event) {
  console.log("xxx", this, event);
}, 2000);
inputEl.addEventListener("input", debounceFn);
cancelBtn.addEventListener("click", debounceFn.cancel);
```

## 考虑防抖的立即执行

```js
// 传一个自定义决定是否立即执行的参数
function debounce(fn, delay, immediate = false) {
  let timer = null;
  // 搞个变量存一下
  let isInvoke = false;

  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    // 如果设置立即执行且是第一次执行
    if (immediate && !isInvoke) {
      fn.apply(this.args);
      // 标记执行过了
      isInvoke = true;
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
      // 相应的复位
      isInvoke = false;
    }, delay);
  };
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
    // 相应的复位
    timer = null;
    isInvoke = false;
  };

  return _debounce;
}
```

## 考虑防抖函数要获取返回值（先开坑）
