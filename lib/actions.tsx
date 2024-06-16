'use server';

import { saveTodo } from "./todsservice";

export async function handleSaveTodoForm(formdata){
    console.log('Controller: handleSaveTodoForm called....');
    console.log(formdata);
    var todoData = {
        title: formdata.get('title')
    }    
    return {
        title: formdata.get('title'),
        description: `From Server: ${formdata.get('title')}`,
        key:Math.floor(Math.random()*1000)
    }
}

