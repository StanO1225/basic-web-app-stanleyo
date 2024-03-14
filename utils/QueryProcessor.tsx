export default function QueryProcessor(query: string): string {
  // Regular expression to match the format "What is [integer] plus [integer]?"
  const sumRegex = /What is (\d+) plus (\d+)\?/;
  
  // Regular expression to match the format "Which of the following numbers is the largest: [comma-separated numbers]?"
  const largestRegex = /Which of the following numbers is the largest: ((\d+)(, \d+)*)\?/;
  
  // Regular expression to match the format "Which of the following numbers is both a square and a cube: [comma-separated numbers]?"
  const squareAndCubeRegex = /Which of the following numbers is both a square and a cube: ((\d+)(, \d+)*)\?/;
  
  // Regular expression to match the format "What is [integer] multiplied by [integer]?"
  const productRegex = /What is (\d+) multiplied by (\d+)\?/;

  const minusRegex = /(\d+) minus (\d+)/;
  
  // Check if the query matches the sum format
  const sumMatch = query.match(sumRegex);
  
  // Check if the query matches the largest number format
  const largestMatch = query.match(largestRegex);

  // Check if the query matches the square and cube format
  const squareAndCubeMatch = query.match(squareAndCubeRegex);

  // Check if the query matches the product format
  const productMatch = query.match(productRegex);

  const minusMatch = query.match(minusRegex);

  const powerMatch = query.match(/(\d+) to the power of (\d+)/)

  if (powerMatch !== null) {
    const firstInteger = parseInt(powerMatch[1])
    const secondInteger = parseInt(powerMatch[2]);
    return (Math.pow(firstInteger, secondInteger)).toString();
  }

  if (minusMatch !== null) {
    const firstInteger = parseInt(minusMatch[1])
    const secondInteger = parseInt(minusMatch[2]);
    return (firstInteger - secondInteger).toString();
  }

  // If the query matches the sum format, extract the integers and calculate the sum
  if (sumMatch !== null) {
    const firstInteger = parseInt(sumMatch[1]);
    const secondInteger = parseInt(sumMatch[2]);
    const sum = firstInteger + secondInteger;
    return sum.toString();
  }

  // If the query matches the largest number format, extract the numbers and find the largest one
  if (largestMatch !== null) {
    // Extract numbers from the matched string
    const numbers = largestMatch[1].split(', ').map(Number);
    
    // Find the largest number
    const largest = Math.max(...numbers);
    
    return largest.toString();
  }

  // If the query matches the square and cube format, identify numbers that are both squares and cubes
  if (squareAndCubeMatch !== null) {
    const numbers = squareAndCubeMatch[1].split(', ').map(Number);
    const squareAndCubeNumbers = numbers.filter(num => Math.sqrt(num) % 1 === 0 && Math.cbrt(num) % 1 === 0);
    return squareAndCubeNumbers.join(', ');
  }

  // If the query matches the product format, extract the integers and calculate the product
  if (productMatch !== null) {
    const firstInteger = parseInt(productMatch[1]);
    const secondInteger = parseInt(productMatch[2]);
    const product = firstInteger * secondInteger;
    return product.toString();
  }

  // If the query contains "shakespeare", return information about Shakespeare
  if (query.toLowerCase().includes("shakespeare")) {
    return "William Shakespeare";
  }
  
  // If the query contains "Which", return "Stanley"
  if (query.toLowerCase().includes("Which")) {
    return "Stanley";
  }

  // If the query does not match any specific format, return an empty string
  return "";
}
