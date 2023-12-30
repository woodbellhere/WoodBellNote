# 二分搜索的要点

- 注意自己定义的区间到底是什么
- 如果是左闭右开的[,)这种风格，那么就要明确记得左区间真的取得到，右区间真的取不到
  - 你非要写左开右闭也行
- 或者说始终记得维持一个左闭右开区间
- 所以在每次二分更新判断大小的时候也要注意
  - 如果 middle 值大于 target，因为 middle 值取不到，右区间更新为 middle 即可，因为右区间本身也取不到，下一个区间不会在意 middle 处的值
  - 如果 middle 值小于 target，由于 middle 值取得到，为了下一个区间不重复搜索，就要把左区间+1

## 实现 704

```js
let search = function (nums, target) {
  let left = 0;
  let right = nums.length;
  // 这里选择左闭右开的写法，主要是因为个人觉得编成语言取数基本都是这个风格
  // 所以这里的left不可能等于right
  while (left < right) {
    let middle = left + ((right - left) >> 1);
    if (nums[middle] > target) {
      // 直接更新右区间为middle是因为右区间是开区间，本身取不到，middle值也取不到
      right = middle;
    } else if (nums[middle] < target) {
      // 但左区间取得到，下一个区间不应包含middle
      left = middle + 1;
    } else {
      return middle;
    }
  }
  return -1;
};
```
