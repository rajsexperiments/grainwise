# Grainwise: Digital Ecosystem for a Modern Food Business

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rajsexperiments/grainwise)

Grainwise is a comprehensive, two-part digital ecosystem designed for a modern, health-focused food business specializing in millet-based meals. It consists of a visually stunning, public-facing marketing website to attract customers and corporate partners, and a secure, unified internal operations platform to manage every aspect of the business, from order fulfillment and inventory to client management and financial reporting. This dual-platform approach ensures a seamless experience for external stakeholders and maximum efficiency for internal operations.

## Key Features

### Public-Facing Website
*   **Captivating Homepage:** Hero section, mission statement, and offerings.
*   **Corporate Wellness Section:** Dedicated area for B2B partnerships.
*   **Full Menu Page:** A beautifully designed, filterable menu with high-quality images and detailed dish information.
*   **Brand Story:** An "About Us" page detailing the brand's origins and commitment to sustainability.
*   **Contact & Lead Generation:** A clean contact page with a functional form for inquiries.

### Unified Business Operations Platform (Internal)
*   **Role-Based Access Control:** Secure logins for Administrators, Kitchen Managers, Corporate Clients, and Finance Managers.
*   **Central Dashboard:** At-a-glance metrics for daily orders, sales, and top-selling items.
*   **Order Management System:** A real-time, Kanban-style board to track order statuses.
*   **Menu & Recipe Management:** A digital recipe book with cost and analytics tools.
*   **Inventory & Supply Chain:** Real-time stock tracking, supplier database, and low-stock alerts.
*   **Corporate Client Portal:** A secure portal for partners to manage meal plans and view reports.
*   **Financial Module:** Detailed sales reports, expense tracking, and profitability analysis.

## Technology Stack

*   **Frontend:** React, Vite, React Router, Tailwind CSS, shadcn/ui
*   **Backend:** Hono on Cloudflare Workers
*   **State Management:** Zustand
*   **Animations:** Framer Motion
*   **Database:** Cloudflare Durable Objects
*   **Language:** TypeScript
*   **Tooling:** Bun, Wrangler CLI

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for Cloudflare Workers development and deployment.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/grainwise.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd grainwise
    ```

3.  **Install dependencies using Bun:**
    ```bash
    bun install
    ```

### Running the Development Server

To start the local development server, which includes both the Vite frontend and the Hono backend on Cloudflare Workers, run:

```bash
bun dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## Project Structure

*   `src/`: Contains the frontend React application (pages, components, hooks, etc.).
*   `worker/`: Contains the backend Hono application running on Cloudflare Workers (routes, entities, core utilities).
*   `shared/`: Contains shared code, primarily TypeScript types, used by both the frontend and backend.
*   `public/`: Static assets for the frontend.

## Development

### Frontend

*   **Pages:** New pages can be created in the `src/pages` directory.
*   **Components:** Reusable components are located in `src/components`. We use `shadcn/ui` for our component library.
*   **Routing:** The application uses React Router. Routes are configured in `src/main.tsx`.

### Backend

*   **API Routes:** Add new API endpoints in `worker/user-routes.ts`. The file follows the Hono routing syntax.
*   **Data Entities:** Define new data models (entities) in `worker/entities.ts`. These classes extend the `IndexedEntity` base class to interact with the Durable Object storage.
*   **Shared Types:** Ensure any new data structures are typed in `shared/types.ts` to maintain type safety between the client and server.

## Deployment

This project is designed for seamless deployment to Cloudflare's global network.

1.  **Build the application:**
    ```bash
    bun build
    ```

2.  **Deploy to Cloudflare:**
    Make sure you are logged in to your Cloudflare account via the Wrangler CLI (`wrangler login`). Then, run the deploy command:
    ```bash
    bun deploy
    ```

Wrangler will handle the process of uploading your static assets and your Worker code.

Alternatively, you can deploy directly from your GitHub repository:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rajsexperiments/grainwise)

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.