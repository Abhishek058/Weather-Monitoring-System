import { checkAlertThreshold } from '../components/Dashboard';

test('Alert threshold check', () => {
  expect(checkAlertThreshold(30, 35)).toBe(false);
  expect(checkAlertThreshold(40, 35)).toBe(true);
  expect(checkAlertThreshold(35, 35)).toBe(false);
});