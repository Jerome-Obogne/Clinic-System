import { expect, describe,it, vi } from "vitest";
import {loginUser} from '../../src/services/api/firebaseAuth'


/** Pattern when creating unit Test  
 *  Success
 *  Invalid
 * Empty
 * */ 
describe("User Login Implementation", () => {
  it("should not run the firebase login api for invalid credential", async () => {
    const mockFirebase = vi.fn(loginUser)
    const inputData = {
      email: "jerome@gmail.com",
      password: "sdasddsadas",
    };
    const response = await mockFirebase(inputData);
    expect(response.success).toBe(false);
     
  });  
   
  

});

