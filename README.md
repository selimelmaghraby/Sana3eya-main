# [Sana3eya]

**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa

---

## 1. Team Members

_List all team members (5-6 students) below._

| Name                   | Student ID | Tutorial Group | GitHub Username         |
| :---------------       | :--------- | :------------- | :--------------         |
| [Abdulrahman Mohamed ] | [13004274] | [T2]           | [@Abdulrahman-Mohamed11]|
| [Ziad Deifallah]       | [13006806] | [T2]           | [@ziadeif]             |
| [Omar Ismail] | [13006148]          | [T5]           | [@8c6qrt7jnd-lgtm]      |
| [Selim omar] | [13001408]           | [T7]           | [@selimelmaghraby]      |
| [Abdulrahman Teleb] | [13006669]    | [T7]           | [@AbdelrahmanTeleb]     |


---

## 2. Project Description

Sana3eya is a fintech platform designed to support Egypt’s blue-collar workforce by addressing their recurring cash flow challenges. In trades like carpentry, plumbing, or electrical work, workers and small contractors often face financial pressure when they must pay laborers and buy materials upfront but only get paid after completing the job. Saneya bridges this liquidity gap by connecting clients with trusted workers and enabling secure, fair financial transactions. Through an escrow-based system, the client’s payment is safely held and partially released to the worker at the start of the job, ensuring they have the funds needed to begin work. Once the project is completed and verified, the remaining balance is released. This approach reduces financial stress, builds trust between workers and clients, and promotes financial inclusion for Egypt’s informal labor sector by introducing transparent, technology-driven financial support.

- **Concept:** [Brief Summary]
- **Link to Fin-Tech Course Document:** https://docs.google.com/presentation/d/1i1f-YsJ7CAwvNzX9kfuLohLev9rPY6EE/edit?usp=sharing&ouid=106941197861635824637&rtpof=true&sd=true

---

## 3. Feature Breakdown

### 3.1 Full Scope 

_List ALL potential features/user stories envisioned for the complete product (beyond just this course)._

- Job Posting & Matching System]
- Escrow Payment Module (Simulated)
- Project Tracking Dashboard
- Ratings & Reviews System
- Admin Panel
- Digital Wallet System
- Notifications & Alerts
- Dispute Resolution Center
- Verification & KYC Module
- Multi-Language Support
- Messaging System
- Search & Filtering
- Favorites & Saved Jobs
- Transaction History & Receipts
- ...

### 3.2 Selected MVP Use Cases (Course Scope)


1.  **User Authentication** (Registration/Login)
2. [Job Posting & Matching System]
3. [Favorites & Saved Jobs]
4. [Project Tracking Dashboard]
5. [Ratings & Reviews System]

---

## 4. Feature Assignments (Accountability)

_Assign one distinct use case from Section 3.2 to each team member. This member is responsible for the full-stack implementation of this feature._

| Team Member | Assigned Use Case       | Brief Description of Responsibility              |
| :---------- | :---------------------- | :----------------------------------------------- |
| [Ziad Deifallah] | **User Authentication** | Register, Login, JWT handling, Password Hashing. |
| [Abdulrahman Mohamed] | [Job Posting & Matching System]| [Clients can post jobs, and workers can browse, apply, or be matched automatically based on skills and location.]|
| [Omar Ismail] | [Favorites & Saved Jobs] | [Users can save jobs or favorite workers/clients for future collaboration.] |
| [Abdulrahman Teleb] | [Project Tracking Dashboard]  | [Displays job progress, milestones, and status updates visible to both clients and workers.]                     |
| [Selim Omar] | [Ratings & Reviews System] | [After each project, users can leave feedback that contributes to trust and credibility.]                                    |

---

## 5. Data Model (Initial Schemas)

_Define the initial Mongoose Schemas for your application’s main data models (User, Transaction, Account, etc.). You may use code blocks or pseudo-code._

### User Schema

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['worker', 'client', 'admin'], default: 'worker' },
  phone: String,
  profileImage: String,
  dateJoined: { type: Date, default: Date.now }
});
```

### [Job] Schema

```javascript
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  budget: Number,
  location: String,
  status: { type: String, enum: ['open', 'in_progress', 'completed'], default: 'open' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});
```

### [Favorites] Schema

```javascript
const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  savedWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
```

### [Project tracking] Schema

```javascript
const projectTrackingSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  milestones: [{
    title: String,
    completed: { type: Boolean, default: false },
    completionDate: Date
  }],
  progress: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});
```

### [Review] Schema

```javascript
const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
```
