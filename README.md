# Shadcn Table Wizard

**Shadcn Table Wizard** is an interactive tool designed to streamline the creation of dynamic, customizable tables using [Shadcn UI](https://ui.shadcn.com/) and [TanStack Table](https://tanstack.com/table). It guides developers through a step-by-step process to define table columns, data types, and rendering options, ultimately generating the necessary configuration and code snippets for seamless integration into projects.

## ✨ Features

- **Dynamic Column Configuration**: Specify the number of columns and define each column's properties, including data type and rendering options.
- **Support for Various Data Types**:
  - **Text**: Standard string values.
  - **Number**: Numeric values with optional formatting.
  - **Price**: Monetary values with currency symbols.
  - **Enum**: Predefined options displayed as badges.
  - **Auto ID**: Automatically generated unique identifiers.
  - **Action**: Interactive elements like edit or delete buttons.
- **Live Preview**: Visualize the table structure and data as you configure it.
- **Code Generation**: Automatically generate React components and configuration files for immediate use.
- **Responsive Design**: Optimized for various screen sizes and devices.

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Tomilola-ng/shadcn-table-wizard.git
   cd shadcn-table-wizard
   ```


2. **Install Dependencies**:

   Using npm:

   ```bash
   npm install
   ```


   Or using Yarn:

   ```bash
   yarn install
   ```


3. **Start the Development Server**:

   Using npm:

   ```bash
   npm run dev
   ```


   Or using Yarn:

   ```bash
   yarn dev
   ```


   The application will be available at `http://localhost:5173/`.

## 📦 Project Structure


```plaintext
shadcn-table-wizard/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   ├── pages/              # Application pages
│   ├── utils/              # Utility functions
│   └── App.tsx             # Root component
├── .gitignore              # Git ignore rules
├── index.html              # HTML template
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```


## 🧩 Usage

1. **Specify Columns**: Input the desired number of columns for your table.
2. **Define Column Properties**: For each column, select the data type and configure additional options as needed.
3. **Preview Table**: View a live preview of your configured table.
4. **Generate Code**: Obtain the generated code snippets for integration into your project. ([shadcn-wizard/README.md at main - GitHub](https://github.com/sohanemon/shadcn-wizard/blob/main/README.md?utm_source=chatgpt.com))

## 🚀 Deployment

To build the application for production:

Using npm:


```bash
npm run build
```


Using Yarn:


```bash
yarn build
```


The optimized files will be in the `dist/` directory, ready for deployment.

## 🧪 Technologies Used

- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Table Management**: [TanStack Table](https://tanstack.com/table) ([Table - Shadcn UI](https://ui.shadcn.com/docs/components/table?utm_source=chatgpt.com), [Building a Google Sheets–Like Table Component with TanStack ...](https://dev.to/jacksonkasi/building-a-google-sheets-like-table-component-with-tanstack-table-zod-and-shadcnui-1ped?utm_source=chatgpt.com))

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

- Inspired by the need for dynamic and customizable table generation in React applications.
- Utilizes open-source libraries and tools to enhance development efficiency.

---

Feel free to customize this README further to align with any additional features or changes in your project. If you need assistance with specific sections or further customization, don't hesitate to ask! 
