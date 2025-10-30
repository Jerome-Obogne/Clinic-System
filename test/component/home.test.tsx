import { expect, describe,it, vi } from 'vitest';
import {render,screen} from '@testing-library/react'
import {loginUser} from '../../src/services/api/firebaseAuth'
import Home from '../../src/pages/sections/Home'
import "@testing-library/jest-dom";

/** Pattern when creating unit Test  
 *  Success
 *  Invalid
 * Empty
 * */ 

describe("Home Component",() => {
  it("should render Home component",() => {
    render(<Home />); 

    const HeroSection = screen.getByTestId('heading-content')
    const MainFeatureSection  = screen.getByTestId('main-feature-section')

    expect(HeroSection).toBeInTheDocument(); 
    expect(MainFeatureSection).toBeInTheDocument();
  })
})



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

