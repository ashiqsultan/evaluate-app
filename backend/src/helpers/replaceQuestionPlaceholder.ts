import { RequestSchema } from '../db/schema';

const replaceQuestionPlaceholder = (
  request: RequestSchema,
  questionText: string
): RequestSchema => {
  const placeholder = '{{question}}';

  // Replace {{question}} placeholder in query params
  const queryParams = request.queryParams;
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      const newQuery = value.replace(placeholder, questionText);
      queryParams[key] = newQuery;
    }
    request.queryParams = queryParams;
  }

  // Replace {{question}} placeholder in request body
  const body = request.body;
  if (body) {
    const bodyString = JSON.stringify(body);
    const newBody = bodyString.replace(placeholder, questionText);
    request.body = JSON.parse(newBody);
  }
  return request;
};

export default replaceQuestionPlaceholder;
