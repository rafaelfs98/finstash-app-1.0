# FINSTASH - Personal Finance Management App

## Overview

Welcome to FINSTASH, your Personal Finance Management App! Developed with Vite, React, and TypeScript, and enhanced with MantineUI for an elegant and responsive user interface. This app is designed to help you efficiently manage your personal finances, allowing you to track income and expenses, categorize transactions, and even attach photos of receipts. With multi-user support, shopping lists, reminders, and email notifications for overdue expenses, FINSTASH is your comprehensive solution for financial management.

## Features

### 1. Dashboard Overview

Get a quick snapshot of your financial health with an intuitive dashboard. View your total income, expenses, and balance at a glance.

### 2. Income and Expense Tracking

Record your financial transactions with ease. Categorize income and expenses, and add relevant tags for detailed insights into your spending habits.

### 3. Receipt Attachment

Keep your financial records organized by attaching photos of receipts to your expense transactions. A picture is worth a thousand words, especially when it comes to managing your expenses.

### 4. Multi-User Support

Perfect for families or shared households, the app supports multiple users with individual profiles and secure access.

### 5. Shopping List

Plan your shopping efficiently with a built-in shopping list feature. Easily add items, mark them off as you shop, and streamline your grocery trips.

### 6. Reminders and Notifications

Never miss a due date again. Set reminders for upcoming expenses and receive notifications via email to stay on top of your financial commitments.

## Technologies Used

- **Vite**: Lightning-fast build tool that enhances the development experience.
- **React**: A popular JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to your JavaScript code for improved development efficiency.
- **MantineUI**: A React component library for building modern and accessible user interfaces.
- **React Router Dom**: Declarative routing for React applications.
- **PostCSS**: A tool for transforming styles with JavaScript plugins, required for MantineUI.
- **Day.js**: A minimalist JavaScript library for handling dates and times.
- **ESLint**: A pluggable and configurable linter tool for identifying and fixing problems in your code.
- **SWR**: A library for remote data management, ensuring that data is always up-to-date.
- **[Other Technologies]**: FINSTASH is modular, allowing for the easy addition of other technologies as needed to meet your specific requirements.

## Backend Structure

Currently, the backend of FINSTASH is built on the [Supabase](https://supabase.io/) framework, a database-as-a-service platform that provides a powerful and user-friendly PostgreSQL API. Supabase simplifies database management and offers a robust API seamlessly integrated with the frontend of this application.

We are planning to establish an official backend using [Spring Boot](https://spring.io/projects/spring-boot) in the future to provide even more flexibility and control over business logic. The migration to Spring Boot is on our roadmap to ensure scalability and cater to the specific needs of the project.

### Database Diagram

![Alt text](/public/bd.png)


## Getting Started

To get started with FINSTASH, follow these steps:

1. Clone the repository: `git clone https://github.com/rafaelfs98/finstash-app-1.0.git`
2. Install dependencies: `yarn install`
3. Run the app: `yarn dev`
4. Open your browser and navigate to `http://localhost:5173/`

Feel free to explore FINSTASH, customize it according to your needs, and take control of your finances!

## Contributions

We welcome contributions from the community. If you find a bug, have a feature request, or want to contribute in any way, please open an issue or submit a pull request.

Happy financial management with FINSTASH! 🚀
