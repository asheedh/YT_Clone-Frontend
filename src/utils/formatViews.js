// function to format numbers 
const formatViews = (count) => {
    if (count < 1000) {
        return count.toString(); // Return as-is for count less than 1000
    } else if (count >= 1000 && count < 1_000_000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'; // Convert to 'k' format
    } else if (count >= 1_000_000 && count < 1_000_000_000) {
        return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'; // Convert to 'M' format
    } else if (count >= 1_000_000_000) {
        return (count / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'; // Convert to 'B' format
    }
  
  }
  
  export default formatViews;