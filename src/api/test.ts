import { $get } from '@/http/http';

export function httpGetTest(params: any) {
  return $get('/test', params);
}
