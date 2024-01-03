# 节流函数

- 规定的时间段内只会触发固定/一次，无论实际监听到多少次
- 或者说只认第一次

## 节流场景

- 监听页面滚动
- 鼠标移动
- 用户频繁点击按钮
- 游戏中的某些设计

  - 发射子弹的频率是固定的

- 防抖中的搜索框如果持续输入就永远不会触发请求
- 节流中的搜索框会（在开始输入后）按照固定频率，比如两秒，请求一次

## 实现节流

```js
// 和防抖一样，想象一条时间轴，其上有不断的触发信号，以及固定间隔的实际触发
function throttle(fn, interval) {
  // 保存（每轮）第一次/上次触发的时间
  let last = 0;
  const _throttle = function () {
    // 保存本次触发时间
    const nowTime = new Date().getTime();
    // 计算距离第一次触发的时间
    // 在距离第一次触发已经满足固定间隔的要求后开始执行
    if (nowTime - last >= waitTime) {
      fn();
      last = nowTime;
    }
  };
  return _throttle;
}
```

## 考虑 this 和原有参数的的写法

```js
function throttle(fn, interval) {
  let last = 0;
  const _throttle = function (...args) {
    const nowTime = new Date().getTime();
    if (nowTime - last >= interval) {
      // 也是注意这里的函数不是箭头函数
      fn.apply(this.args);
      last = nowTime;
    }
  };
  return _throttle;
}
```

## 考虑防抖的立即执行

```js
function throttle(fn, interval, immediate = true) {
  let last = 0;
  const _throttle = function (...args) {
    const nowTime = new Date().getTime();
    // 节流其实默认立即执行
    if (!immediate && last === 0) {
      last = nowTime;
    }
    const waitTime = interval - (nowTime - last);
    if (waitTime <= 0) {
      fn(this, args);
      last = nowTime;
    }
  };
  return _throttle;
}
```

## 考虑最后一次执行（先开个坑）
