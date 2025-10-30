import { render,screen } from "@testing-library/react"
import NotFound from '../../src/pages/NotFound'
import "@testing-library/jest-dom";

describe('Not Found',() => {
    it('should render Not Found Component',() => { 
     render(<NotFound/>)   
      
    const notFound = screen.getByText("NotFound");
    expect(notFound).toHaveTextContent("NotFound");
    })
})