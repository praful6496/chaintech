## React Product Management Assignment

## 🎯 Overview
Build a product management interface with admin and user roles that allows CRUD operations on products. This assignment tests fundamental React skills, state management concepts, and role-based access control.

## 🔍 Task Description
* View products in a grid/table layout
* Add new products via a form (Admin only)
* Edit existing products (Admin only)
* Delete products (Admin only)
* Filter products by name
* Sort products by price

## 👥 User Roles
* Admin
  * Full access to all CRUD operations
  * Access to admin dashboard
  * Can manage product inventory
  * Can view sales analytics
* Regular User
  * Can view products
  * Can filter and sort products
  * Can view product details

## 📝 Product Data Structure
```javascript
{
  id: string,
  name: string,
  price: number,
  category: string,
  description: string,
  stockQuantity: number,
  createdBy: string,
  lastModified: Date
}
```

## ✨ Core Requirements
* Use functional components and hooks
* Implement state management using any of the following:
  * Redux
  * Redux Toolkit
  * React Context API
* Implement role-based authentication:
  * Login/Logout functionality
  * Protected routes for admin features
  * Role-based component rendering
* Handle loading and error states
* Create responsive design
* Include basic form validation

## 🔐 Admin Features
* Dashboard with overview statistics
* Product management interface
* Inventory management
* Basic analytics view

## 🎖 Evaluation Criteria
* Component structure and organization
* State management implementation (Redux/Redux Toolkit/Context API):
  * Store/Context configuration
  * State organization
  * State updates and actions
  * Data flow management
* Authentication and Authorization:
  * Role-based access control
  * Protected routes implementation
  * Security considerations
* Error handling
* Code quality and organization
* Basic styling and responsiveness
* Overall user experience

## 💫 Bonus Points (Optional)
* Add simple animations/transitions
* Implement data persistence using localStorage
* Add search functionality with debouncing
* Include basic unit tests
* Add admin activity logs
* Implement bulk product actions
* Add user session management

## 🚀 Getting Started
1. Fork this repository
2. Create a new React project using Create React App or Vite
3. Implement the required features
4. Create a GitHub Repo
5. Commit your code to the branch and push it to your GitHub Repo
6. Submit a link of your GitHub repository to Google Form which was send to your along with the test link

## 📋 Submission Guidelines
* Ensure your code is well-commented
* Include a brief description of your implementation choices
* Make sure the application runs without errors
* Verify all core features are working

## 💡 Tips
* Focus on functionality over complex styling
* Use React Router for navigation
* Implement proper auth guards
* Keep components modular and reusable
* Handle edge cases appropriately

## ❓ FAQ
Have questions? Please send your question to your hiring manager with respective medium of contact

---
Good luck with your implementation! 🚀