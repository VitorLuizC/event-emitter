/**
 * Wait determined time to resolve returned `Promise`.
 * @param {number} time - Time in milliseconds waited to resolve `Promise`.
 * @returns {Promise.<void>}
 */
function wait(time: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });
}

export default wait;
