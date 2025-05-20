import { setupServer } from "msw/node";
import { handlers } from "./handlers/handlers";

const server = setupServer(...handlers);

export * from "msw";
export { server };
