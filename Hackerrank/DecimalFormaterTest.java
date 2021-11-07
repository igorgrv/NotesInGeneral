import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

/* 
  Given an array of integers, calculate the ratios of its elements that are positive, negative, and zero. Print the decimal value of each fraction on a new line with  places after the decimal.

  Note: This challenge introduces precision problems. The test cases are scaled to six decimal places, though answers with absolute error of up to  are acceptable.

  Example: given → [-4, -3, 0, 1, 1]

  There are  5 elements, two positive, two negative and one zero. Their ratios are 2/6, 2/6 and 1/6 . Results are printed as: 0.000000
*/
public class DecimalFormaterTest {

  public static void main(String args[]) {
    List<Integer> arr = Arrays.asList(-4, 3, -9, 0, 4, 1);
    Integer arrSize = arr.size();

    float numPositives = 0;
    float numNegatives = 0;
    float zeros = 0;

    for (Integer num : arr) {
      if (num.intValue() == 0)
        zeros++;
      if (num.intValue() > 0)
        numPositives++;
      if (num.intValue() < 0)
        // numNegatives = numNegatives + 1;
        numNegatives++;
    }

    DecimalFormat df = new DecimalFormat();
    df.setMaximumFractionDigits(6);

    System.out.println(df.format(numPositives / arrSize));
    System.out.println(df.format(numNegatives / arrSize));
    System.out.println(df.format(zeros / arrSize));

    // or

    System.out.printf("%1.6f\n", numPositives / arrSize);
    System.out.printf("%1.6f\n", numNegatives / arrSize);
    System.out.printf("%1.6f\n", zeros / arrSize);

    //  or

    Stream.<Predicate<Integer>>of(i -> i > 0, i -> i < 0, i -> i == 0)
        .map(tests -> (double) arr.stream().filter(tests).count() / arr.size())
        .forEach(num -> System.out.printf("%1.6f\n", num));
  }
}
