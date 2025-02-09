import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://api.navigateobscurity.com'
  // baseURL:  'http://localhost:5000'
});

export const apiGetComments = async (pageID:number) => {
  try {
    let res = await axiosInstance('/comments/' + pageID)
    return res.data;
  } catch (error:any) {
    throw(error);
  }
}
export const apiPostComment = async (pageID:number, name:string, message: string) => {
  try {
    let now = new Date().toISOString();
    let date = now.slice(0,10);
    let time = now.slice(11,23);
    let timestamp = date + ' '+ time + '000';

  let res = await axiosInstance({
      method: 'post',
      url: '/addComment',
      data: {
        "author": name,
        "message": message,
        "created_date": timestamp,
        "approved_comment": 0,
        "page_id": pageID
      }
    });
    return res.data;
  } catch (error:any) {
    throw(error);
  }
}

