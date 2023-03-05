import toast from 'react-hot-toast';
import { addNewsDataSource, addUserDetails } from '../app/slice/userSlice';
import { NEWS_DATA_SOURCE, SERVER_API } from './constants';
import { fetch } from './httpUtil';


export const toaster = (type, msg) => {
    if (type === 'success') {
        return toast.success(msg)
    } else if (type === 'error') {
        return toast.error(msg)
    }
}

export const fetchUserDetails = (token) => async (dispatch) => {
    const { data } = await fetch(SERVER_API, "get-details", null, token);
    const { data: response } = data;
    const source = NEWS_DATA_SOURCE.find(
        (el) => el.id === response?.news_feed?.news_source
    );
    // console.log(data)
    dispatch(addNewsDataSource({
        id: source?.id,
        txt: source?.txt,
        category: response?.news_feed?.category,
        author: response?.news_feed?.author,
    }));
    dispatch(addUserDetails({ email: response.email, name: response.name }))
};