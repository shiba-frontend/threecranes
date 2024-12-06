
export const getToken = () => {

    if (typeof window !== 'undefined') {
      return  localStorage.getItem('threecranes_access_token');
    }
    return null;
  };