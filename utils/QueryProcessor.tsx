export default function QueryProcessor(query: string): string {
  // Regular expression to match the format "What is [integer] plus [integer]?"
  const sumRegex = /What is (\d+) plus (\d+)\?/;
  
  // Regular expression to match the format "Which of the following numbers is the largest: [comma-separated numbers]?"
  const largestRegex = /Which of the following numbers is the largest: ((\d+)(, \d+)*)\?/;
  
  // Check if the query matches the sum format
  const sumMatch = query.match(sumRegex);
  
  // Check if the query matches the largest number format
  const largestMatch = query.match(largestRegex);

  // If the query matches the sum format, extract the integers and calculate the sum
  if (sumMatch !== null) {
    const firstInteger = parseInt(sumMatch[1]);
    const secondInteger = parseInt(sumMatch[2]);
    const sum = firstInteger + secondInteger;
    return `The sum of ${firstInteger} and ${secondInteger} is ${sum}.`;
  }

  // If the query matches the largest number format, extract the numbers and find the largest one
  if (largestMatch !== null) {
    // Extract numbers from the matched string
    const numbers = largestMatch[1].split(', ').map(Number);
    
    // Find the largest number
    const largest = Math.max(...numbers);
    
    return `The largest number is ${largest}.`;
  }

  // If the query contains "shakespeare", return information about Shakespeare
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }
  
  // If the query contains "Which", return "Stanley"
  if (query.toLowerCase().includes("name")) {
    return "Stanley";
  }

  // If the query does not match any specific format, return an empty string
  return "";
}
