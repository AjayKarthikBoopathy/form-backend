import { ObjectId } from "bson";
import { client } from "../db.js";

//separate functions for queries
export function getAllUsers(req){
    return client
    .db("tasks")
    .collection("users")
    .find(req.query)
    .toArray();
}

export function getUserById(id){
    return client
    .db("tasks")
    .collection("users")
    .findOne({_id: new ObjectId(id)})  
}

export function addUserData(data){
  return client
  .db("tasks")
  .collection("users")
  .insertOne(data)
}

export function updateUserData(id, updatedData){
    return client
    .db("tasks")
    .collection("users")
    .findOneAndUpdate({_id: new ObjectId(id)},{$set:updatedData})
}

export function deleteUserData(id){
    return client
  .db("tasks")
  .collection("users")
  .deleteOne({_id: new ObjectId(id)})
}