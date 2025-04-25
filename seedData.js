import mongoose from 'mongoose';
import Comment from './models/comment-model.js';
import Post from './models/post-model.js';
import User from './models/user-model.js';
import './db/database.js'

const seedData = async () => {
  try {
    // Clear existing data
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await User.deleteMany({});

    // Seed Posts 
    const posts = await Post.insertMany([
      { Pid: 1, title: 'Why Engineering Matters' },
      { Pid: 2, title: 'HR Tips for Onboarding' },
      { Pid: 3, title: 'Understanding Financial Statements' },
      { Pid: 4, title: 'How to Build a Marketing Strategy' },
      { Pid: 5, title: 'Streamlining Operations' },
      { Pid: 6, title: 'Sales Techniques That Work' },
      { Pid: 7, title: 'Troubleshooting IT Issues' },
      { Pid: 8, title: 'Legal Compliance Basics' },
      { Pid: 9, title: 'How to Handle Customer Complaints' },
      { Pid: 10, title: 'R&D and Product Innovation' },
    ]);

    // Seed Comments 
    const comments = await Comment.insertMany([
      { Cid: 1, body: 'Great post!' },
      { Cid: 2, body: 'Needs more detail on methodology.' },
      { Cid: 3, body: 'Helpful and concise.' },
      { Cid: 4, body: 'Would love sources for the stats.' },
      { Cid: 5, body: 'This could use visuals.' },
      { Cid: 6, body: 'Very informative.' },
      { Cid: 7, body: 'Could be shorter.' },
      { Cid: 8, body: 'Excellent insights!' },
      { Cid: 9, body: 'Too technical for general readers.' },
      { Cid: 10, body: 'Spot on!' },
    ]);

    // Seed Users 
    const users = await User.insertMany([
      { 
        Uid: 101, 
        firstName: 'Alice', 
        lastName: 'Johnson', 
        comment: comments[0]._id, 
        post: posts[0]._id, 
        email: 'alice@example.com', 
        password: 'hashedPassword1', 
        dob: '1990-07-15', 
        joined: '2023-04-01' 
      },
      { 
        Uid: 102, 
        firstName: 'Bob', 
        lastName: 'Smith', 
        comment: comments[1]._id, 
        post: posts[1]._id, 
        email: 'bob@example.com', 
        password: 'hashedPassword2', 
        dob: '1985-05-20', 
        joined: '2023-03-01' 
      },
      { 
        Uid: 103, 
        firstName: 'Charlie', 
        lastName: 'Brown', 
        comment: comments[2]._id, 
        post: posts[2]._id, 
        email: 'charlie@example.com', 
        password: 'hashedPassword3', 
        dob: '1992-11-12', 
        joined: '2022-08-15' 
      },
      { 
        Uid: 104, 
        firstName: 'Diana', 
        lastName: 'Miller', 
        comment: comments[3]._id, 
        post: posts[3]._id, 
        email: 'diana@example.com', 
        password: 'hashedPassword4', 
        dob: '1994-03-25', 
        joined: '2022-01-20' 
      },
      { 
        Uid: 105, 
        firstName: 'Ethan', 
        lastName: 'Hunt', 
        comment: comments[4]._id, 
        post: posts[4]._id, 
        email: 'ethan@example.com', 
        password: 'hashedPassword5', 
        dob: '1988-10-30', 
        joined: '2021-07-10' 
      },
      { 
        Uid: 106, 
        firstName: 'Fiona', 
        lastName: 'Scott', 
        comment: comments[5]._id, 
        post: posts[5]._id, 
        email: 'fiona@example.com', 
        password: 'hashedPassword6', 
        dob: '1989-12-12', 
        joined: '2021-09-15' 
      },
      { 
        Uid: 107, 
        firstName: 'George', 
        lastName: 'Lee', 
        comment: comments[6]._id, 
        post: posts[6]._id, 
        email: 'george@example.com', 
        password: 'hashedPassword7', 
        dob: '1991-02-20', 
        joined: '2021-05-10' 
      },
      { 
        Uid: 108, 
        firstName: 'Hannah', 
        lastName: 'Adams', 
        comment: comments[7]._id, 
        post: posts[7]._id, 
        email: 'hannah@example.com', 
        password: 'hashedPassword8', 
        dob: '1987-03-18', 
        joined: '2020-07-20' 
      },
      { 
        Uid: 109, 
        firstName: 'Ian', 
        lastName: 'Carter', 
        comment: comments[8]._id, 
        post: posts[8]._id, 
        email: 'ian@example.com', 
        password: 'hashedPassword9', 
        dob: '1995-01-15', 
        joined: '2020-12-01' 
      },
      { 
        Uid: 110, 
        firstName: 'Jenna', 
        lastName: 'Bishop', 
        comment: comments[9]._id, 
        post: posts[9]._id, 
        email: 'jenna@example.com', 
        password: 'hashedPassword10', 
        dob: '1984-09-14', 
        joined: '2019-10-01' 
      },
    ]);

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close()
  }
  
};

seedData();
