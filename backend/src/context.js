import { mockDeep, mockReset } from "jest-mock-extended";

// Export the mock but don't call jest.mock here as this is a module, not a test
export const prismaMock = mockDeep();

export const resetPrismaMock = () => {
  mockReset(prismaMock);
};
