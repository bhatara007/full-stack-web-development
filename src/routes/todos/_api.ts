

// TODO: Persist in database
let todos: Todo[] = [];

export const api = (request , data?: Record<string, unknown>) => {
  let body = {};
  let status = 500




  switch (request.request.method.toUpperCase()) {
    case "GET":
      body = todos;
      status = 200;
      break;
    case "POST":
      console.log(data.text)
      todos.push(data as Todo);
      body = todos
      status = 201
      break;
    case "DELETE":
      status = 200;
      todos = todos.filter(todo => todo.uid != request.params.uid)
    case "PATCH":
      todos = todos.map(todo => {
        if (todo.uid === request.params.uid) {
          if (data.text) todo.text = data.text as string;
          else todo.done = data.done as boolean;
        }
        return todo;
      });
      status = 200;
      body = todos.find(todo => todo.uid === request.params.uid);
    break;
    default:
      break;
  }

  if (request.request.method.toUpperCase() !== "GET" && request.request.headers.get("accept") !== "application/json") {
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