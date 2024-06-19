//import Axios, { AxiosResponse } from "axios";
import { AxiosResponse } from "axios";
import { Person } from "../models/person";
import axiosInstance from "../config/axiosconfig";

export function getPeople(): Promise<AxiosResponse<Person[]>> {
    return axiosInstance.get<Person[]>('')
}

export function getPerson(id: number): Promise<AxiosResponse<Person>> {
    return axiosInstance.get<Person>(`${id}`)
}


export function deletePerson(id: number): Promise<AxiosResponse<Person>> {
    return axiosInstance.delete<Person>(`${id}`)
}

export function updatePerson(id: number, p: Person): Promise<AxiosResponse<Person>> {
    return axiosInstance.put<Person>(`${id}`, p)
}

export function addPerson(p: Person): Promise<AxiosResponse<Person>> {
    return axiosInstance.post<Person>('', p)
}
