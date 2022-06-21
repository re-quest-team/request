/** Randomize elements in the array
 * @author https://stackoverflow.com/a/2450976 */
const randomize = <T>(list: T[]) => {
  let shuffled = list
  let currentIndex = shuffled.length,
    randomIndex
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    // And swap it with the current element.
    ;[shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ]
  }
  return shuffled
}

export default randomize
