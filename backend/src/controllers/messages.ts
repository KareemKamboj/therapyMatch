import { Response } from 'express';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Send a message
export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const { receiver, content } = req.body;
    const sender = req.user._id;

    // Check if receiver exists
    const receiverExists = await User.findById(receiver);
    if (!receiverExists) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const message = await Message.create({
      sender,
      receiver,
      content,
    });

    await message.populate('sender', 'name email');
    await message.populate('receiver', 'name email');

    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get conversation with another user
export const getConversation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const { userId } = req.params;
    const currentUser = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: currentUser, receiver: userId },
        { sender: userId, receiver: currentUser },
      ],
    })
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);

    // Mark messages as read
    await Message.updateMany(
      {
        sender: userId,
        receiver: currentUser,
        read: false,
      },
      { read: true }
    );

    res.json(messages);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's conversations
export const getConversations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const userId = req.user._id;

    // Get the last message from each conversation
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', userId] },
              '$receiver',
              '$sender',
            ],
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiver', userId] },
                    { $eq: ['$read', false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: { 'lastMessage.createdAt': -1 },
      },
    ]);

    // Populate user details
    const populatedConversations = await User.populate(conversations, {
      path: '_id',
      select: 'name email role',
    });

    res.json(populatedConversations);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get unread message count
export const getUnreadCount = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const userId = req.user._id;

    const count = await Message.countDocuments({
      receiver: userId,
      read: false,
    });

    res.json({ count });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 