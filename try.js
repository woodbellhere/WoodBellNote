function bubbleSort(arr) {
  let len = arr.length;
  // 外层控制排序轮数，一共n-1轮，实际上不涉及具体操作
  for (let i = 1; i < n; i++) {
    // 内层进行实际比较，每轮省略已经排序过的数字
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 两两比较，大的放后面
      }
    }
  }
}

function bubbleSort(arr) {
  let len = arr.length;
  // 外层控制排序轮数，一共n-1轮，实际上不涉及具体操作
  for (let i = 1; i < n; i++) {
    // 内层进行实际比较，每轮省略已经排序过的数字
    let hasSort = true;
    // 排序标记
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 两两比较，大的放后面
        hasSort = false;
      }
    }
    if (hasSort) break;
  }
}

function selectSort(arr) {
  let n = arr.length;
  // 每轮找最小值放到数组最前面
  for (let i = 0; i < n; i++) {
    // 也由于每轮最小的数都要放在前面
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        // 遇到更小值就保存新索引
      }
    }
    // 并且每轮确保把最小值放前面
    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
}

function quickSort(arr, left, right) {
  if (left < right) {
    // 随意取一个数
    let index = partition(arr, left, right);
    // 左边数组递归排序，直到只有一个
    quickSort(arr, left, index - 1);
    // 右边数组递归排序，直到只有一个
    quickSort(arr, index + 1, right);
  }
}
// 选中一个值，确保将元素分为左右两半
// 左右指针法
function partition(arr, left, right) {
  // 随意挑选一个值，一般是首尾值，然后保存值和索引
  let pivot = arr[right];
  let pivotIndex = right;
  // 当两指针没碰到时
  while (left < right) {
    // 左指针右移到比选定值大的地方停止
    while (left < right && arr[left] <= pivot) {
      left++;
    }
    // 右指针左移到比选定值小的地方停止
    while (left < right && arr[right] >= pivot) {
      right--;
    }
    // 交换元素，确保快排的“左边都比它小，右边都比它大”
    [arr[left], arr[right]] = [arr[right], arr[left]];
  }
  // 当左右指针相遇时，这一轮排序完事，把pivot丢中间,
  [arr[left], arr[pivotIndex]] = [arr[pivotIndex], arr[left]];
  // 返回pivot索引
  return left;
}

// 挖坑法
// 随意选取一个数作为后续填入其他数的坑位
function partition2(arr, left, right) {
  let pivot = arr[right];
  while (left < right) {
    // 左指针发现发现比坑位数大的数时，占坑/切换坑位
    while (left < right && arr[left] <= pivot) {
      left++;
    }
    arr[right] = arr[left];
    // 右指针发现比坑位数小的数时，占坑
    while (left < right && arr[right] >= pivot) {
      right--;
    }
    arr[left] = arr[right];
  }
  // 指针相遇时排序结束，把pivot放入最后坑位，并返回坑位的索引
  arr[right] = pivot;
  return left;
}

function QuickSort(arr) {
  quickSort(arr, 0, arr.length - 1);
  return arr;
}
