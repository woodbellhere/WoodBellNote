# 二分搜索的大于小于和等于

## 以大于等于 x 为基准情况

常见的说法就是第一个位置，经典题就是 leetcode 35

```js
let findBound = function (nums, target) {
  let left = 0;
  let right = nums.length;
  let mid;
  while (left < right) {
    mid = left + ((right - left) >> 1);
    if (nums[mid] >= target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  // 在循环结束后，左闭右开区间是空的，L和R相等,都是大于等于值，但也有一些琐碎结论，比如左边那个数肯定是小于值
  // 然后参数target+1的话，左边那个数就是小于target+1，也就是小于等于target自己了
  return right;
};
```

## 大于 x 可以转化为 大于等于 x+1

这个其实也很直观，大于等于 x 的情况下，没有办法通过指定左移或者右移几个数来排除等于，比如要参数本身变化

## 小于 x 可以转化为 (大于等于 x ) -1（左边那个数）

leetcode 69 算数平方根就是典型例子

## 小于等于 x 可以转化为 (大于 x) -1（左边那个数），也就是(大于等于 x+1)-1

这个常见的说法就是最后一个位置，这个非常直观
这个只需要稍微绕一步，解这种问题手头画个数列比划一下就很轻松
例题是 leetcode 34 的“最后一个位置”

## 其实还有更简单的变体

比如 leetcode 367，完全平放式
标准大于等于，最后判断 true false 完事
