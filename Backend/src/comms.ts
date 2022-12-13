import e from "cors";
import mongoose from "mongoose";
import { Socket } from "socket.io";
import { NewUser, Task, User, userLogin, UserModel } from "./schemasAndTypes";



const communications = async (task: Task, socket: Socket, onlineUsers: string[]): Promise<void> => {

  const emittingError = async (error: unknown) => {
    const err = error as Error;
    console.log(err);
    socket.emit('error', err);
  }

  await mongoose.connect('mongodb+srv://MyName:Greitakojis13@cluster1.cfh9fmu.mongodb.net/test');
  mongoose.set('strictQuery', false);

  switch (task.action) {
    case 'newUser':
      const newUser = task.data as NewUser;
      console.log('contact', task.action, ' ', task.data);

      try {
        const checkUsr = await UserModel.findOne({ username: newUser.username as String })
        console.log('checkUsr ===', checkUsr === null);
        if (checkUsr === null) {
          const newUser = new UserModel({ ...task.data } as NewUser);
          newUser.save((err) => {
            if (err) throw err
          });
          socket.emit('registered', true);
        }
        else throw new Error('username already exists');
      } catch (error) {
        emittingError(error);
      }
      break;
    case 'loginUser':
      try {
        const userLogin = task.data as userLogin
        const uObj = await UserModel.findOne({ username: userLogin.username, password: userLogin.password })
        if (uObj !== null) {
          socket.emit('loggedIn', uObj);
          onlineUsers.push(uObj.username);
        }
        else throw new Error('username or password is incorect');
      } catch (error) {
        console.log(error);
        emittingError(error);
      }

    case 'logout':
      const uObj = task.data as User
      onlineUsers.splice(onlineUsers.indexOf(uObj.username), 1)
    default:
      break;
  }
};

export default communications 