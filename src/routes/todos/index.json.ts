import type { RequestHandler } from "@sveltejs/kit";
// import { api } from "./_api";

let todos = [];

export const get: RequestHandler = (request) => {
  return {
      status: 200,
      body: todos
  }
}

export const post: RequestHandler = async ({request}) => {
  const text = await request.formData()
  todos.push( {
      create_at: new Date(),
      text: text.get("text"),
      done: false
    })
  
  return {
      status: 303,
      headers: {
          location: "/"
      }
  }
}