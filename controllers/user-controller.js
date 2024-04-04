import { prisma } from "../index.js";

const register = async (req, res) => {
  console.log("register route");
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res
    .status(200)
    .json({ message: "User registered ssuccessfully", user: user });
};

const login = async (req, res) => {
  console.log("login route");
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  } else {
    res
      .status(200)
      .json({ message: "User logged in successfully", user: user });
  }
};

export { register, login };
