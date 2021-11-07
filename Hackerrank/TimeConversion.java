import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

/*
  Given a time in 12-hour AM/PM format, convert it to military (24-hour) time.

  Note: - 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
        - 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.

  Example:
    s = '12:01:00PM' → return '12:01:00'
    s = '12:01:00AM' → return '00:01:00'

  Complete the timeConversion function in the editor below. It should return a new string representing the input time in 24 hour format.
*/
public class TimeConversion {

  public static void main(String args[]) {
    String timeConversion = timeConversion("12:00:00AM");
    System.out.println(timeConversion);
  }

  public static String timeConversion(String s) {
    // First the time will be formated then from the string it will become Localtime
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:m:sa");
    LocalTime timeParsed = LocalTime.parse(s, formatter);

    return timeParsed.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
  }
}
