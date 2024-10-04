import { ITestData } from '../types/ITestData';
function validateTestData(data: ITestData): string[] {
  const errors: string[] = [];

  // Check for missing or null fields
  if (!data.questionId) errors.push('questionId is missing');
  if (!data.questionText) errors.push('questionText is missing');
  if (!data.responseBody) errors.push('responseBody is missing');

  // Check for missing or null conditions
  if (Array.isArray(data.conditions) && data.conditions.length > 0) {
    let isInvalidCondition = false;
    // Check for missing or null conditionText or id
    for (const condition of data.conditions) {
      // console.log('condition', condition);
      if (!condition.conditionText || !condition.id) {
        isInvalidCondition = true;
        break;
      }
    }
    if (isInvalidCondition) {
      errors.push('Some conditions are invalid strings');
    }
  } else {
    errors.push('conditions are missing');
  }
  return errors;
}

export default validateTestData;
