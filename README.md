# 樊师傅 (Fan Shifu) – Full Stack F&B Website

## Table of Contents
- [Overview](#overview)
- [Purpose and Target Users](#purpose-and-target-users)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [Hosting](#hosting)
- [My Role](#my-role)
- [Use of Artificial Intelligence (AI)](#use-of-artificial-intelligence-ai)
- [Future Improvements](#future-improvements)
- [Installation and Setup (For Development)](#installation-and-setup-for-development)
- [License](#license)

---

## Overview

**樊师傅 (Fan Shifu)** is a full stack food and beverage (F&B) website built for my family business.  
The website helps customers learn about our food offerings and place orders by redirecting them to WhatsApp with pre-filled order details.

This project serves both as a real-world business website and a portfolio project to demonstrate my technical and problem-solving skills.

---

## Purpose and Target Users

### Purpose
- Increase online visibility for the family business
- Provide clear product information
- Simplify the ordering process through WhatsApp

### Target Users
- Customers looking to browse products and place food orders

---

## Key Features

- Product Listing  
  Displays available food items with prices and descriptions

- Informational Pages  
  Provides background information about the business and offerings

- WhatsApp Ordering System  
  Redirects customers to WhatsApp with pre-filled order details, including:
  - Selected products
  - Quantity
  - Total price
  - Collection time
  - Collection location

- Responsive Design  
  Optimized for both desktop and mobile devices

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- HTML, CSS, JavaScript
- ESLint

**Vite and React Setup**
- Fast development with Hot Module Replacement (HMR)
- Uses official Vite React plugins:
  - `@vitejs/plugin-react`
  - `@vitejs/plugin-react-swc`

> The React Compiler is not enabled due to its impact on development and build performance.

---

### Backend
- Node.js
- Express.js
- JavaScript

> Backend logic is lightweight as order handling is performed via WhatsApp redirection.

---

### Database
- Not implemented  
- A database was not required for the current business scope.

---

### Hosting
- Planned deployment: Vercel  
- Currently not hosted

---

## My Role

- Built entirely solo
- Responsible for:
  - Project planning and concept development
  - Frontend development
  - Backend setup
  - WhatsApp ordering integration
  - Overall system design

---

## Use of Artificial Intelligence (AI)

AI tools were used throughout the development process to improve productivity and learning:

- Antigravity  
  Assisted with frontend implementation and function design

- ChatGPT  
  Used for debugging, problem solving, and code explanations

- Google Gemini  
  Assisted with image generation and visual ideation

> Although AI tools were used extensively, all ideas, architecture decisions, and final implementations were directed, reviewed, and understood by me.

---

## Future Improvements

- Deploy the website to Vercel
- Add an admin panel for product management
- Introduce a database if order tracking or analytics become necessary
- Improve accessibility and user experience

---

## Installation and Setup (For Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
