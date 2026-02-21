import moment from "moment-timezone";
import { testData } from "../fixtures/testData";

/**
 * Generates a birthdate relative to a reference date (insurance start date or today).
 *
 * @param {Object} params
 * @param {number} params.yearsAgo - Number of years to subtract from the reference date
 * @param {number} [params.daysOffset=0] - Additional day offset (+/-)
 * @param {string|Date|moment.Moment} [params.startDate] - Reference date (e.g. insurance start date). Defaults to today.
 * @param {string} [params.timeZone="Europe/Berlin"] - Time zone for date calculations
 *
 * @returns {{ day: string, month: string, year: string }} Birthdate parts formatted for UI inputs
 */
const getBirthdate = ({ yearsAgo, daysOffset = 0, startDate, timeZone = "Europe/Berlin" } = {}) => {
  const base = startDate
    ? moment(startDate, ["DD.MM.YYYY", "YYYY-MM-DD", moment.ISO_8601]).tz(timeZone)
    : moment().tz(timeZone);

  const date = base.subtract(yearsAgo, "year").add(daysOffset, "day");

  return {
    day: date.format("DD"),
    month: date.format("MM"),
    year: date.format("YYYY"),
  };
};

const insuranceStart = testData.startInsuranceDate.firstJune26;

export const almost16 = getBirthdate({ yearsAgo: 16, daysOffset: 1, startDate: insuranceStart });
export const almost18 = getBirthdate({ yearsAgo: 18, daysOffset: 1, startDate: insuranceStart });
export const justOver18 = getBirthdate({ yearsAgo: 18, daysOffset: -1, startDate: insuranceStart });
export const over101 = getBirthdate({
  yearsAgo: 102,
  startDate: testData.startInsuranceDate.firstJune26,
});
export const futureBirthdate = getBirthdate({
  yearsAgo: 0,
  daysOffset: 1,
  startDate: testData.startInsuranceDate.firstJune26,
});
