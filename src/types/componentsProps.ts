import React from "react";
import { Food } from "./foot";
import { IconType } from "react-icons";
import { Booking } from "../pages/dashPage/DashPage";
import { Any } from "./all";
import { string } from "prop-types";

export interface ProductCardProps  {
    id: number;
    name: string;
    description: string;
    type:string,
    price: number,
    availableOn: [],
    // isAvailabe: boolean,
    // resturant : string,
    addToCard: (items:{name:string, image: string,id: number,price: number, quantity:number, resturant: string, type:string}) => void,
    selectRes: (e:React.ChangeEvent<HTMLSelectElement>) => void;
    increase: () => void;
    decrease: () => void;
    quantity: number;
    image: string;
    actualPrice?: number
}

export interface addToCardCardProps {
    deleteFromCart : (id: number) => void;
}


export interface LoginComponentProps {
    onEmailChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    login: (e:React.MouseEvent<HTMLButtonElement>) => void;
    emailText:  string,
    passwordText: string;

}


export interface DeliveryFormProps {
    onFormSubmit: (e:React.MouseEvent<HTMLFormElement>) => void;
    userName: string;
    phoneNumber: string;
    address: string;
    onUserNameChange: (e:React.ChangeEvent<HTMLInputElement >) => void;
    onNumberChange: (e:React.ChangeEvent<HTMLInputElement >) => void;
    onAddressChange: (e:React.ChangeEvent<HTMLInputElement >) => void;

}


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?:string;
    text?: string;
    icon?: IconType | string;
}


export interface dashBoardProps {
    orderDone: (id:string) => void;
    cancelOrder: (id:string) => void;
    bookings : Booking[];
    loading: boolean;
    loadBookings: (what:string) => void;
    userType: string;
    totalPag: number
}

export interface ConfirmationModel {
    show:boolean, onConfirm: () => void, onCancel :() => void;

}


export interface dashBoardNavProps {
    getRemovedOrder?: (what:string) => void;
    getSuccessOrder?: (what:string) => void;
}


export interface reviewBoxProps extends Any {
    $createdAt: string;
}


export interface Pagination  {
    breakLabel: string;
    nextLabel:string;
    onPageChange: () => void;
    pageRangeDisplayed: number;
    pageCount: number;
    previousLabel: string;
    renderOnZeroPageCount: any;


}