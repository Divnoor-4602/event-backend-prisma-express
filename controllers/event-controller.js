import { prisma } from "../index.js";

// CRUD

const createEvent = async (req, res) => {
  const { title, description, userId } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      eventCreatorId: user.id,
    },
  });

  res.status(200).json({ message: "Event created successfully", event: event });
};

const updateEvent = async (req, res) => {
  const { id } = req.params;

  const { title, description } = req.body;

  const eventUpdate = await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
    },
  });

  res.status(200).json({
    message: "Event updated successfully",
    event: eventUpdate,
  });
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  const eventDelete = await prisma.event.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json({
    message: "Event deleted successfully",
    event: eventDelete,
  });
};

const getEvents = async (req, res) => {
  const events = await prisma.event.findMany({
    include: {
      eventCreator: true,
    },
  });

  res.status(200).json({ events: events });
};

export { createEvent, updateEvent, deleteEvent, getEvents };
