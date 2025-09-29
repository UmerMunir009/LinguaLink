# LinguaLink

A modern full-stack **PERN (PostgreSQL, Express.js, React, Node.js)** web application that serves as a **language exchange platform**.
Users across the globe can register, connect with friends, and interact through cultural posts where they can upload post,like post and save the  post as a memory, chatting, and video meetings.

---

## Features

### Authentication & Authorization

* Secure user login and signup with **JWT-based authentication**.
* Route-level authorization for protected resources.

### Friend Request System

* Send, accept, or reject friend requests.

### Real-Time Chat & Video Meetings

* **One-to-one** powered by **Stream Chat**.
* **Global state management** with **Zustand** for active chats and app-wide state.
* **Video meeting support** for global interactions.

### Posting System

* Create and share posts.
* **Like, share, save, and unsave posts** with interactive UI.


### System Notifications

* Firebase Cloud Messaging (FCM) used for system-wide notifications.
* Instant alerts for friend requests, post uploads and post interactions.

### Media Handling

* Multer for handling file uploads on the backend.
* Cloudinary for secure media storage and optimized delivery.



### Global Connections

* Connect with users from around the world.
* Build your language-learning network.

---

## Tech Stack

| Tech                  | Role                                        |
| --------------------- | ------------------------------------------- |
| PostgreSQL            | Database                                    |
| Express.js            | Backend framework                           |
| React + Vite          | Frontend                                    |
| Node.js               | Runtime environment                         |
| Stream Chat           | Real-time messaging and chat infrastructure |
| Sequelize             | ORM for PostgreSQL                          |
| Zustand               | Global state management                     |
| TailwindCSS           | UI styling                                  |
| JWT                   | Authentication and Authorization            |

---

## Upcoming Features

* Voice & Video Calling (with Stream integration)
* Group Video Meetings
* Community/Group Posts
* Multilingual Support
