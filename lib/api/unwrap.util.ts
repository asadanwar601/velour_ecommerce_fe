/**
 * Safely unwrap API response payload from backend standard envelope
 */
export function unwrapApiResponse<T>(response: any): T {
  if (response && response.data && response.data.data !== undefined) {
    return response.data.data;
  }
  if (response && response.data !== undefined) {
    return response.data;
  }
  return response;
}
