export default class DateUtils {
  public getYear(): number {
    return new Date().getFullYear();
  }

  public getTodayDate(): Date {
    return new Date();
  }
}
