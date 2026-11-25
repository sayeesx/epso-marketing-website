import { handleAdminRequest, type AdminEnv } from '../../src/lib/adminServer';

interface PagesContext {
  request: Request;
  env: AdminEnv;
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  return handleAdminRequest(context.request, context.env);
};
