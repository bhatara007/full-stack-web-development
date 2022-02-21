

// TODO: Persist in database
let todos: Todo[] = [];

export const api = (request , data?: Todo) => {
  let body = {};
  let status = 500

  switch (request.request.method.toUpperCase()) {
    case "GET":
      body = todos;
      status = 200;
      break;
    case "POST":
      todos.push(data);
      body = todos
      status = 201
      break;
    case "DELETE":
      status = 200;
      todos = todos.filter(todo => todo.uid != request.params.uid)
    default:
      break;
  }

  if (request.request.method.toUpperCase() !== "GET") {
    return {
      status: 303,
      headers: {
        location: "/"
      }
    };
  }

  return {
    status,
    body
  }
} 