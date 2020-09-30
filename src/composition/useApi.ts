import axios from 'axios';

const user: {sessionId?: string} = {};

export default (baseUrl: string) => {

  const get = async (res: string) => await axios.get(`${baseUrl}/${res}`);
  const auth = async (user: string) => await get(`auth/${user}`);
  
  return {
    get,
    auth,
    user,
  };
};
