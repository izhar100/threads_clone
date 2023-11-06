import { atom } from "recoil";

export const conversationsAtom=atom({
    key:"conversationAtom",
    default:[]
})

export const selectedConversationAtom=atom({
    key:'selectedConversationAtom',
    default:JSON.parse(localStorage.getItem("selectedConversation"))||{
        _id:"",
        userId:"",
        username:"",
        name:"",
        userProfilePic:""
    }
})