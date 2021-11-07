import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/*
  Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. Then print the respective minimum and maximum values as a single line of two space-separated long integers.

  Example: given [1, 3, 5, 7, 9]
    The minimum sum is  1 + 3 + 5 + 7 = 16, and the maximum sum is 3 + 5 + 7 + 9 = 24. The function prints "16 24"
*/
public class MinMaxSum {

  public static void main(String args[]) {
    List<Integer> arr = Arrays.asList(1, 2, 3, 4, 5);
    long minSum = 0l;
    long maxSum = 0l;

    Collections.sort(arr);
    minSum = arr.subList(0, 4).stream().mapToLong(num -> (long) num.intValue()).sum();

    Collections.reverse(arr);
    maxSum = arr.subList(0, 4).stream().mapToLong(num -> (long) num.intValue()).sum();

    System.out.println(minSum + " " + maxSum);

    // or

    Collections.sort(arr);
    long maxSum2 = (long) (arr.get(4) + arr.get(3) + arr.get(2) + arr.get(1));
    long minSum2 = (long) (arr.get(0) + arr.get(1) + arr.get(2) + arr.get(3));

    System.out.println(minSum2 + " " + maxSum2);
  }

}
