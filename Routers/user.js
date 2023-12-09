import express from "express";
import {
  addUserData,
  deleteUserData,
  getAllUsers,
  getUserById,
  updateUserData,
} from "../Controllers/user.js";


const router = express.Router();


router.get("/all", async (req, res) => {
  try {
    const users = await getAllUsers(req);
    if (users.length <= 0) {
      res.status(400).json({ data: "User Not found" });
      return;
    }
    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server Error" });
  }
});

//using query params (ObjectId)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await getUserById(id);
    if (!users) {
      res.status(400).json({ data: "User Not found" });
      return;
    }
    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server Error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newUser = req.body;
    if (!newUser) {
      return res.status(400).json({ data: "No details provided" });
    }
    const result = await addUserData(newUser);
    res
      .status(200)
      .json({ data: { result: result, message: "Added Sucessfully" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server Error" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (!id || !updatedData) {
      return res.status(400).json({ data: "Wrong Request" });
    }
    const result = await updateUserData(id, updatedData);
    res
      .status(200)
      .json({ data: { result: result, message: "Updated Sucessfully" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ data: "Wrong Request" });
    }
    const result = await deleteUserData(id);
    res
      .status(200)
      .json({ data: { result: result, message: "Deleted Sucessfully" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server Error" });
  }
});

export const usersRouter = router;
