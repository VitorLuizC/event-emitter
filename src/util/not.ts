/**
 * A curry that check if values are not equal.
 * @param {T} valueA
 * @returns {function(T):boolean}
 * @template T
 */
function not<T>(valueA: T) {
  return (valueB: T) => valueA !== valueB;
}


export default not;
