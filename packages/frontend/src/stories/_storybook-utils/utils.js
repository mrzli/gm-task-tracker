export function disableArg() {
  return { table: { disable: true } };
}

export function onSubmit(value) {
  console.log('Submitted:', value);
}
