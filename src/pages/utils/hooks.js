const hookStates = [];
let hookIndex = 0;

function useState(initialValue) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialValue;

  const currentIndex = hookIndex;
  function setState(newState) {
    if (typeof newState === 'function') {
      newState = newState(hookStates[hookIndex]);
    }

    hookStates[currentIndex] = newState;

    // render();
  }

  hookIndex += 1;
  return [hookStates[hookIndex], setState];
}

export { useState };
