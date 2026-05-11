export const hapticTap = () => {

  if (
    navigator.vibrate
  ) {

    navigator.vibrate(12);
  }
};

export const hapticSuccess =
  () => {

    if (
      navigator.vibrate
    ) {

      navigator.vibrate([
        40,
        30,
        40,
      ]);
    }
};