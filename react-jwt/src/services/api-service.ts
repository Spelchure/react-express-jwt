import axios, {AxiosError} from 'axios';

const APIURL = `http://${process.env.REACT_APP_APIURL}/api`;

export namespace ApiService {
  export const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(APIURL + '/auth/login', {
        email,
        password,
      });
      return response;
    } catch (err) {
      console.error('some error :', err);
    }
  };
  export const signUp = async (email: string, password: string) => {
    try {
      const response = await axios.post(APIURL + '/auth/signup', {
        email,
        password,
      });
      return response;
    } catch (err) {
      console.error('some error :', err);
    }
  };
  export const getProtected = async (
    token: string
  ): Promise<{email: string} | {status?: number; message?: string} | 'ok'> => {
    try {
      const response = await axios.get(APIURL + '/protected', {
        headers: {
          Authorization: `Baerer ${token}`,
        },
      });
      return response.data as {email: string};
    } catch (err: unknown | AxiosError) {
      //throws on http status code errors.
      if (axios.isAxiosError(err)) {
        return {
          status: err.response?.status,
          message: (err.response?.data as any).message,
        };
      }
      if (err instanceof Error) {
        console.log('someke: ', err);
      }
      return 'ok';
    }
  };
}
