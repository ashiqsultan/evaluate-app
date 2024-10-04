export interface IConditionItem {
  id: string;
  conditionText: string;
}
export interface ITestData {
  questionId: string;
  questionText: string;
  responseBody: string;
  conditions: IConditionItem[];
}
