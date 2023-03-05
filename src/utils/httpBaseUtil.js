import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../app/slice/userSlice'
import { GUARDIAN_NEWS_API, GUARDIAN_NEWS_API_KEY, NEWS_API_KEY, NEWS_API_URL } from './constants'

export const useCurrentApi = () => {
    const { newsDataSource } = useSelector(userData)
    const apiDetails = {};

    const getApiDetails = useCallback(() => {
        switch (newsDataSource.id) {
            case "openNewsAPI":
                apiDetails['apiUrl'] = NEWS_API_URL;
                apiDetails['apiKey'] = NEWS_API_KEY;
                break;
            case "guardianAPI":
                apiDetails['apiUrl'] = GUARDIAN_NEWS_API;
                apiDetails['apiKey'] = GUARDIAN_NEWS_API_KEY;
                break;
            default:
                break;
        }
        return apiDetails
    }, [newsDataSource])
    useEffect(() => { getApiDetails() }, [newsDataSource])

    return [getApiDetails]
}

export const httpBase = (apiUrl = GUARDIAN_NEWS_API, token) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    } else {
        delete headers['Authorization']
    }
    const api = axios.create({
        baseURL: `${apiUrl}`,
        headers: headers,
        responseType: 'json'
    })

    api.interceptors.response.use((response) => {
        return response;
    }, error => {
        return error.response
    })

    return api
}