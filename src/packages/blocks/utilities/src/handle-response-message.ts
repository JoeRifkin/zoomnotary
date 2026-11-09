export function handleResponseMessage(input: {
  responseJson: any;
  errorJson?: any;
  onSuccess: () => void;
  onFail: () => void;
}) {
  const { responseJson, onSuccess, onFail, errorJson } = input;

  if (responseJson && !responseJson.error && !responseJson.errors) {
    onSuccess();
  }

  if (responseJson?.error || errorJson || responseJson.errors) {
    onFail();
  }
}
