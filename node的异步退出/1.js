async function add() {
  let b = 0
  try {
    setInterval(data => {
      b++
      console.log(2);
      if (b == 5) {
          console.log(b);
          console.log(1, a);
      }
    }, 1000)
    
  } catch (error) {
    
  }
}
add()