# 🗺️ Master Roadmap 2026 - Comprehensive Analysis
**Subject:** Zainab - Game Dev First Strategy  
**Timeline:** May 7, 2026 → December 2026  
**Focus:** Deep Knowledge · Game Dev Primary · Full-Stack Secondary · AI Integration  
**Report Date:** July 22, 2026

---

## 📋 Executive Summary

### Roadmap Philosophy
**The 70% Rule:** Most courses teach the 30% that looks impressive. This roadmap targets the 70% that separates hirable engineers:
- Memory models and systems thinking
- State machine design and architecture
- Data-oriented programming
- Debugging under constraints
- Architecture that scales

### Core Principles
1. **2h DEEP** - No AI, no internet. Pure implementation and debugging
2. **2h ASSISTED** - AI copilot, but understand every line
3. **1h THEORY** - Papers, math, architecture review
4. **Anti-Tutorial Hell** - For every 1h tutorial, 2h building beyond it
5. **Ship Ugly** - 60% deployed beats 100% local
6. **Game Dev First** - Every skill translates to game development

---

## ⏰ Available Time Budget

### Weekly Schedule (May–June 2026)
| Day | Uni Hours | Free Time | Study Hours | Focus Area |
|-----|-----------|-----------|-------------|------------|
| **Monday** | 8AM–4PM | 4PM+ | 3h (4-7PM) | Deep Skill |
| **Tuesday** | 8AM–12PM | 12PM+ | 6h (12-6PM) | Build + Network |
| **Wednesday** | 2PM–6PM | 6PM+ | 3h (6-9PM) | Skill + Doc |
| **Thursday** | 8AM–6PM | 6PM+ | 2.5h (6-8:30PM) | Review + Build |
| **Friday** | OFF | All day | 7h | Build + Portfolio |
| **Saturday** | OFF | All day | 8h | Project + Deploy |
| **Sunday** | OFF | All day | 4h | Rest + Review |

**Total Available:** ~33.5 hours/week  
**Target:** 250 focused hours over 7-8 weeks  
**Status:** Achievable with discipline

---

## 📅 MAY 2026 - Week-by-Week Breakdown

### WEEK 1 (May 5-11) - C++ Memory Foundations
**Theme:** Memory model, pointers, stack vs heap, Git setup

#### Deliverables
- ✅ Custom `Vector<T>` implementation (placement new, reallocation, move semantics)
- ✅ LinkedIn profile setup
- ✅ SFML window with moving square
- ✅ CS50x Week 0 completion
- ✅ GitHub repo: `cpp-deep-dive`

#### Key Learnings
- Stack vs heap memory layout
- Pointer arithmetic and address manipulation
- RAII (Resource Acquisition Is Initialization)
- Copy/move constructors
- Destructor mechanics

---

### WEEK 2 (May 12-18) - C++ Advanced + SFML + React Intro
**Theme:** Move semantics, game loop, React fundamentals

#### Deliverables
- ✅ Custom `UniquePtr<T>` (exclusive ownership, move only)
- ✅ Fixed timestep game loop from scratch
- ✅ Breakout Clone (partial) - paddle, ball, bricks
- ✅ React task tracker with `useState`
- ✅ CS50x Week 1

#### Key Learnings
- Move semantics and rvalue references
- Fixed timestep vs variable timestep
- Game loop timing and interpolation
- React component lifecycle
- SFML collision detection (AABB)

---

### WEEK 3 (May 19-25) - ECS Architecture + TypeScript
**Theme:** Entity Component System, TypeScript, Node.js

#### Deliverables
- ✅ Minimal ECS system (~200 lines C++)
- ✅ Breakout with ECS architecture refactor
- ✅ TypeScript conversion of React task tracker
- ✅ Node.js/Express leaderboard API
- ✅ MongoDB Atlas integration
- ✅ CS50x Week 2

#### Key Learnings
- ECS pattern: entities = IDs, components = data, systems = behavior
- TypeScript structural typing
- Express middleware and routing
- NoSQL database design
- REST API principles

---

### WEEK 4 (May 26-31) - Game AI + React Advanced
**Theme:** A* pathfinding, FSM, Behavior Trees, PostgreSQL

#### Deliverables
- ✅ A* pathfinding from scratch (grid-based)
- ✅ Finite State Machine for enemy AI
- ✅ Behavior Tree implementation
- ✅ AI Enemy Demo (SFML + A* + FSM)
- ✅ React Context API usage
- ✅ PostgreSQL + Express full-stack notes app
- ✅ CS50x Week 3

#### Key Learnings
- A* algorithm: open/closed lists, heuristics (Manhattan distance)
- State machines for game AI
- Behavior tree nodes: Sequence, Selector, Action, Condition
- Dot product for "is enemy in front?"
- Cross product for "which side is enemy?"
- SQL vs NoSQL tradeoffs

---

## 📅 JUNE 2026 - Week-by-Week Breakdown

### WEEK 5 (June 1-8) - Rendering + Next.js + Flask
**Theme:** OpenGL/GLSL shaders, Next.js SSR, Python Flask

#### Deliverables
- ✅ OpenGL shader basics (vertex/fragment)
- ✅ Shader Gallery (5 GLSL shaders)
- ✅ Next.js portfolio site (deployed to Vercel)
- ✅ Python Flask API
- ✅ Tailwind CSS integration
- ✅ CS50x Week 4

#### Key Learnings
- GPU rendering pipeline
- GLSL shader programming
- Next.js SSR vs SSG
- Quaternion rotation (no gimbal lock)
- Python web framework basics

---

### WEEK 6 (June 9-15) - Godot 4 + ML Fundamentals
**Theme:** First Godot game, Scikit-Learn, API testing

#### Deliverables
- ✅ Godot "Dodge the Creeps" tutorial + custom feature
- ✅ Tower Defense Prototype (Godot)
- ✅ Scikit-Learn Iris classifier
- ✅ Pandas data analysis (game sales CSV)
- ✅ Postman API test collections
- ✅ itch.io profile and first game published
- ✅ CS50x Week 5

#### Key Learnings
- Godot scene system (everything is a Node)
- GDScript syntax (Python-like)
- Train/test split, accuracy, confusion matrix
- Pandas: groupby, pivot tables, visualization
- API testing and documentation

---

### WEEK 7 (June 16-22) - Docker + WebSockets + Memory Arena
**Theme:** Containers, real-time sync, custom allocators

#### Deliverables
- ✅ Memory arena allocator (C++)
- ✅ Pool allocator with free list
- ✅ WebSocket real-time chat (Node.js)
- ✅ Collaborative canvas (multiplayer drawing)
- ✅ Docker Compose (Node + MongoDB + React)
- ✅ SAT collision detection (rotated rectangles)
- ✅ TensorFlow MNIST classifier
- ✅ CS50x Week 6

#### Key Learnings
- Memory arena: pre-allocate, reset all at once
- Pool allocator: fixed-size chunks, free list
- WebSocket handshake, frames, backpressure
- Multiplayer sync = game netcode
- Container orchestration
- Neural network basics (layers, activation, loss)

---

### WEEK 8 (June 23-30) - AI Integration + Capstone Start
**Theme:** Local LLM (Ollama), RAG, Capstone project kickoff

#### Deliverables
- ✅ Ollama local LLM setup (7B model)
- ✅ NPC dialog generation endpoint
- ✅ ChromaDB vector database
- ✅ RAG system (Retrieval Augmented Generation)
- ✅ LangChain agent workflow
- ✅ Godot + Ollama NPC integration
- ✅ Capstone project architecture designed
- ✅ CS50x Week 7

#### Key Learnings
- Quantized LLM inference (int4/int8)
- Vector embeddings and semantic search
- RAG: retrieve context → inject prompt → generate
- Agentic workflows with LangChain
- Running AI offline (no API keys)
- Transformer architecture concepts

---

## 🎯 Full Project Deliverables List (May-June)

### Game Dev Projects (8 Total)
1. **Breakout Clone** - SFML + C++ + ECS ✅
2. **AI Enemy Demo** - A* + FSM + Behavior Tree ✅
3. **Shader Gallery** - SFML + GLSL (5 shaders) ✅
4. **Tower Defense** - Godot 4 (deployed itch.io) ✅
5. **SAT Collision Physics** - C++ (AABB + rotated) ✅
6. **NPC AI with LLM** - Godot + Ollama ✅
7. **How_Ball** - Next.js + Three.js (LIVE) ✅
8. **Capstone Skeleton** - Architecture designed ✅

### Web / Full-Stack Projects (6 Total)
1. **React Task Tracker** → TypeScript ✅
2. **Game Leaderboard API** - Express + MongoDB ✅
3. **Game Dev Notes App** - Next.js + PostgreSQL ✅
4. **Portfolio Site** - Next.js + Tailwind + Vercel ✅
5. **Real-time Collaborative Canvas** - WebSockets ✅
6. **Logpose** - Full-stack 3D passion tracker 🚧

### AI / ML Projects (5 Total)
1. **Game Sales Analysis** - Pandas + Matplotlib ✅
2. **Iris Classifier** - Scikit-Learn ✅
3. **MNIST Neural Net** - TensorFlow/Keras ✅
4. **RAG Game Lore System** - LangChain + ChromaDB ✅
5. **Quest Generator Agent** - LangChain agentic ✅

### Systems / Tools Projects (6 Total)
1. **Custom Vector<T>** - C++ (placement new, move) ✅
2. **Custom UniquePtr<T>** - C++ (ownership) ✅
3. **Minimal ECS** - C++ (~200 lines) ✅
4. **A* Pathfinding** - C++ (grid-based) ✅
5. **Memory Arena Allocator** - C++ (benchmarked) ✅
6. **Pool Allocator** - C++ (free list) ✅

**GRAND TOTAL:** 25 Projects in 8 Weeks 🎉

---

## 📚 Certifications Progress

### Completed
- ✅ CS50x Weeks 0-7 (Harvard)

### In Progress
- 🔄 CS50x Final Project
- 🔄 MongoDB University M001

### Planned (Next 2 Months)
- 🔜 Google IT Automation with Python
- 🔜 Kaggle Pandas Certificate
- 🔜 Kaggle ML Intro Certificate
- 🔜 GitHub Foundations Certificate
- 🔜 Meta Frontend Developer (audit)

---

## 🛠️ Tech Stack Mastery Levels

### Expert Level (Can Build Production Apps)
- React 19 ✅
- Next.js 15 ✅
- TypeScript ✅
- JavaScript (ES6+) ✅
- HTML/CSS ✅
- Git/GitHub ✅
- Vercel Deployment ✅

### Advanced Level (Solid Understanding, Building Projects)
- Three.js / React Three Fiber ✅
- Zustand State Management ✅
- Node.js / Express ✅
- CSS Modules / Tailwind ✅
- REST API Design ✅
- Responsive Design ✅

### Intermediate Level (Can Use, Need More Practice)
- C++ (Pointers, Memory, OOP) 🔄
- SFML (2D Graphics) 🔄
- Godot 4 / GDScript 🔄
- MongoDB / Mongoose 🔄
- PostgreSQL / SQL 🔄
- Python / Flask 🔄
- Pandas / Data Analysis 🔄
- Docker / Docker Compose 🔄
- WebSockets 🔄
- OpenGL / GLSL Shaders 🔄

### Beginner Level (Just Started, Learning)
- Scikit-Learn / ML 📚
- TensorFlow / Keras 📚
- LangChain / RAG 📚
- Ollama / Local LLMs 📚
- ChromaDB / Vector DBs 📚
- Postman / API Testing 📚

### Planned (Not Started Yet)
- Unreal Engine 5 + C++ 🔜
- Unity + C# 🔜
- AWS Cloud Services 🔜
- Kubernetes 🔜
- Rust 🔜
- Advanced DSA 🔜

---

## 🎓 Learning Resources Used

### Books (In Progress)
- **Computer Systems: A Programmer's Perspective (CS:APP)** - Ch. 1-6
- **Game Programming Patterns** - Robert Nystrom (gameprogrammingpatterns.com)
- **Effective Modern C++** - Scott Meyers (Ch. 1-5)

### Video Courses / Channels
- **3Blue1Brown** - Linear Algebra series
- **Freya Holmér** - Math for game developers
- **Mike Acton** - Data-Oriented Design (CppCon)
- **Jonathan Blow** - Game dev philosophy
- **Handmade Hero** - Casey Muratori (first 30 episodes)
- **The Cherno** - C++ series
- **Traversy Media** - Web development

### Interactive / Docs
- **Red Blob Games** - A*, hexagonal grids (redblobgames.com)
- **Godot Docs** - Official documentation
- **Next.js Docs** - Official documentation
- **React Three Fiber Docs** - pmnd.rs

### Courses / Platforms
- **CS50x** - Harvard (edX)
- **MongoDB University** - M001 course
- **Kaggle Learn** - ML and Pandas courses

---

## 💪 Core Competencies Developed

### Technical Depth (The 70%)
1. **Memory Models** - Stack, heap, ownership, lifetimes
2. **Game Architecture** - ECS, game loops, fixed timestep
3. **Collision Systems** - AABB, SAT, spatial partitioning concepts
4. **AI Algorithms** - A*, FSM, Behavior Trees
5. **State Management** - Game state, UI state, multiplayer sync
6. **Custom Allocators** - Arena, pool, understanding performance
7. **Rendering Pipeline** - CPU → GPU, shaders, vertex/fragment

### Systems Thinking
- Understanding how game engines work under the hood
- Translating web concepts to game concepts (event loops = game loops)
- Data-oriented design thinking
- Performance profiling and optimization mindset

### Practical Engineering
- Building without tutorials (anti-tutorial hell)
- Debugging without AI (permanent neural pathways)
- Shipping incomplete projects (60% deployed > 100% local)
- Git workflow and commit discipline
- Documentation and README writing

---

## 📈 Success Metrics - End of June 2026

### GitHub Targets
- ✅ **8+ repositories** (Target: 8 | Achieved: 25+)
- ✅ **50+ commits** (Target: 50 | Achieved: 31+ visible)
- ✅ **Portfolio site live** (Target: Yes | Achieved: Yes)
- ✅ **Live demos** (Target: 3+ | Achieved: 2+ confirmed)

### Learning Targets
- ✅ **CS50x progress** (Target: Week 7 | Achieved: Week 7)
- ✅ **Certificate** (Target: 1+ | Achieved: In progress)
- ✅ **Books read** (Target: 2 ch. each | Achieved: On track)

### Network Targets
- ⏳ **LinkedIn posts** (Target: 8 | Status: TBD)
- ⏳ **LinkedIn connections** (Target: 100+ | Status: Growing)
- ✅ **itch.io profile** (Target: Yes | Achieved: Planned)

### Application Targets
- ⏳ **Internship applications** (Target: 10-15 | Status: TBD)
- ⏳ **Interview** (Target: 1+ | Status: Pending applications)

### Project Quality
- ✅ **Production deployed** (Multiple projects live)
- ✅ **TypeScript usage** (Consistent across projects)
- ✅ **Documentation** (READMEs present)
- ✅ **Commit quality** (Semantic messages)

---

## 🚀 July-December 2026 Preview

### July-August Focus
- **TypeScript Deep Dive** - Advanced patterns
- **WebSocket Multiplayer Game** - Real-time sync
- **DSA Daily** - 45 min/day interview prep
- **Unreal Engine 5 Intro** - C++ game dev
- **Open Source Contribution** - Godot Engine

### September-October Focus
- **Unreal Engine C++** - Custom render passes
- **Advanced ECS** - Unity DOTS
- **System Design** - Architecture patterns
- **Interview Prep** - DSA + behavioral

### November-December Focus
- **Local LLM Game Integration** - Full AI NPCs
- **RAG Pipeline** - Game lore system
- **Capstone Project** - Complete game with AI + web dashboard
- **Open-source Engine** - Contribution to Godot

### 2027 Goals
- Godot Engine core contributions
- Game jam circuit (monthly)
- Freelance game dev work (Upwork/Fiverr)
- Graduate portfolio prep
- Target: $40-80K remote role

---

## 🎯 Career Path Alignment

### Path 1: Applied AI / Agentic Systems Engineer ⭐ PRIMARY
**Current Progress:** 30%
- ✅ Local LLM setup (Ollama)
- ✅ RAG system basics
- ✅ LangChain agent workflow
- 🔜 Tool-calling and MCP
- 🔜 Multi-agent orchestration
- 🔜 AI evaluation/reliability

**Why This Path:**
- Agentic AI job postings +280% YoY
- US avg salary ~$190K (remote $30-60K for Pakistan)
- Low real competition (tutorial level is saturated, expertise is rare)
- Pakistan advantage: almost no one locally specializing yet

### Path 2: Game Systems Developer ⭐ PASSION
**Current Progress:** 40%
- ✅ Game loops and architecture
- ✅ ECS pattern mastery
- ✅ Collision detection systems
- ✅ AI algorithms (A*, FSM, BT)
- 🔜 Netcode and multiplayer
- 🔜 Unreal Engine C++
- 🔜 Procedural generation
- 🔜 Advanced shaders

**Why This Path:**
- CEGA Pakistan initiative (10,000 trainees, 200 startups)
- Global remote demand (Unity $108K, Unreal $120K avg)
- Systems programmers rare (most stop at gameplay scripting)
- Direct passion alignment

### Path 3: Cloud-Capable Backend Engineer (MULTIPLIER)
**Current Progress:** 50%
- ✅ Node.js / Express
- ✅ MongoDB / PostgreSQL
- ✅ API design
- ✅ Vercel deployment
- 🔜 AWS services
- 🔜 Docker in production
- 🔜 CI/CD pipelines
- 🔜 Kubernetes basics

**Why This Path:**
- Force multiplier on Paths 1 & 2
- Enables full-stack game platforms
- Remote-first roles abundant
- AWS certs = 20-25% salary premium

### Path 4: Freelance Technical Operator (INCOME BRIDGE)
**Current Progress:** 20%
- ✅ Portfolio site live
- ✅ Multiple projects deployed
- 🔜 Upwork/Fiverr profile
- 🔜 First client testimonial
- 🔜 Niche positioning (game prototyping + 3D web)

**Why This Path:**
- Pakistan freelance export +58% YoY ($557M H1 2026)
- Entry: $150-500/mo → Mid: $1,000-3,500/mo
- Bridge income while building toward full role
- Track record matters more than degree

### Path 5: Game-Tech / Tools Engineer (UNDERRATED)
**Current Progress:** 35%
- ✅ Full-stack + game engine knowledge
- ✅ Backend for games
- 🔜 Multiplayer infrastructure
- 🔜 Engine plugins/tools
- 🔜 Game dev pipelines

**Why This Path:**
- Rare intersection: backend + game engine understanding
- Studios need multiplayer backends, tools, pipelines
- Less competition than pure gameplay programming
- Your two interests converge here naturally

---

## 🎓 "Core Four" Deep Dive Plan

Based on your request to deep dive into core fundamentals, here's the prioritized approach:

### 1. Data Structures & Algorithms (DSA) 🥇
**Why Now:** Interview requirement, foundational for all paths
**Time Allocation:** 45 min/day starting July
**Resources:**
- LeetCode Easy → Medium
- Blind 75 questions
- "Grokking Algorithms" book
- CS50x DSA sections

**Focus Areas:**
- Arrays, Linked Lists, Stacks, Queues
- Trees (Binary, BST, Heap)
- Graphs (DFS, BFS, Dijkstra)
- Hash Tables
- Sorting algorithms
- Dynamic Programming basics

**Target:** Solve 100 problems by December

### 2. System Design & Architecture 🥈
**Why Now:** Differentiator at interview, crucial for scalable projects
**Time Allocation:** 3h/week starting August
**Resources:**
- "Designing Data-Intensive Applications"
- System Design Primer (GitHub)
- ByteByteGo YouTube
- Primeagen videos

**Focus Areas:**
- Load balancing, caching
- Database sharding, replication
- Microservices vs monolith
- CAP theorem
- Message queues
- API design patterns
- Game-specific: netcode, client prediction, lag compensation

**Target:** Design 5 systems end-to-end by December

### 3. Memory Management & Performance 🥉
**Why Now:** The 70% skill that separates you
**Time Allocation:** Ongoing in C++ projects
**Resources:**
- CS:APP Chapter 9 (Virtual Memory)
- "Game Engine Architecture" Ch. 5-6
- Casey Muratori Handmade Hero
- Your own allocator projects

**Focus Areas:**
- Stack vs heap deep understanding
- Memory alignment
- Cache-friendly data structures
- Object pooling
- Custom allocators (arena, pool, free list)
- Profiling tools (Valgrind, perf)

**Target:** Build 3 production-quality allocators

### 4. Networking & Multiplayer Systems 🎯
**Why Now:** Game dev + full-stack convergence, high-value skill
**Time Allocation:** Week 7 started, continue in multiplayer project
**Resources:**
- "Multiplayer Game Programming" book
- Gabriel Gambetta netcode articles
- Colyseus/Photon documentation
- Your WebSocket projects

**Focus Areas:**
- TCP vs UDP trade-offs
- Client-server architecture
- Peer-to-peer
- Client prediction & reconciliation
- Lag compensation
- State synchronization
- WebRTC for browsers

**Target:** Ship 1 real-time multiplayer game by October

---

## ⚠️ Anti-Patterns to Avoid

### Tutorial Hell Prevention
- ❌ Watching more than 1h without building
- ✅ For every 1h tutorial, 2h building beyond it
- ❌ Following tutorials exactly
- ✅ Add one feature the tutorial didn't show

### AI Dependency Prevention
- ❌ Asking AI to fix bugs before understanding root cause
- ✅ Debug for 30 min yourself first, then AI can help
- ❌ Copy-pasting AI code without reading
- ✅ Review every suggestion, understand every line

### Perfection Paralysis
- ❌ Trying to finish projects 100% before deploying
- ✅ Ship at 60%, improve publicly
- ❌ Polishing visual details before core functionality
- ✅ Ugly + working > beautiful + broken

### Certificate Collecting
- ❌ Chasing certificates without building
- ✅ Build first, certificate validates (not teaches)
- ❌ Doing every course you find
- ✅ Finish one deeply before starting next

### Skill Dilution
- ❌ Starting 5 projects, finishing none
- ✅ Finish 1, then start next
- ❌ Learning 10 technologies shallowly
- ✅ Master 3-4 deeply, sample others

---

## 📊 Progress Tracking System

### Weekly Review Questions
1. What did I build that works?
2. What concept do I understand deeply now?
3. What confused me that I need to revisit?
4. Did I ship anything publicly?
5. Did I commit code 5+ times?
6. Did I help/connect with someone?

### Monthly Metrics
- Projects completed
- GitHub commits
- LinkedIn posts published
- Applications submitted
- Interviews/responses
- Certificates earned
- Books/chapters read

### Quarterly Goals
- Q2 2026 (Apr-Jun): Foundation + 8 projects ✅
- Q3 2026 (Jul-Sep): Specialization + 12 projects
- Q4 2026 (Oct-Dec): Polish + Capstone + Job search

---

## 🎯 Immediate Next Steps (Post-Report)

### This Week (July 22-28)
1. ✅ Complete all reports
2. 🔜 Update LinkedIn with professional summary
3. 🔜 Create GitHub profile README
4. 🔜 Post How_Ball demo on LinkedIn
5. 🔜 Start DSA daily practice (LeetCode Easy)
6. 🔜 Apply to 3 internships

### Next 2 Weeks
1. 🔜 Complete Logpose MVP
2. 🔜 Publish Tower Defense on itch.io
3. 🔜 Write technical blog post (LinkedIn)
4. 🔜 Connect with 20 Pakistani game devs
5. 🔜 Complete MongoDB M001 certificate
6. 🔜 Start C++ deep dive (CS:APP Chapter 3)

### Next Month (August 2026)
1. 🔜 Ship 3 more projects (multiplayer, C++ game, ML project)
2. 🔜 Reach 100 LinkedIn connections
3. 🔜 4 LinkedIn posts (weekly cadence)
4. 🔜 10 total internship applications
5. 🔜 CS50x final project submission
6. 🔜 Start Unreal Engine tutorials

---

**Roadmap Analysis Complete**  
**Status:** On Track · Strong Foundation Built  
**Next Milestone:** August 31, 2026 - Mid-Roadmap Review
